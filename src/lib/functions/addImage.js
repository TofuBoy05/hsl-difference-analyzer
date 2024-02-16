import { open } from "@tauri-apps/api/dialog";
import { readBinaryFile } from "@tauri-apps/api/fs";
import { fileData } from '$lib/stores/fileDataStore.js'
import { writeTextFile } from "@tauri-apps/api/fs";
import { get } from 'svelte/store';
import { currentFile } from '$lib/stores/currentFileStore';
import { appDataDir } from '@tauri-apps/api/path';
import pica from 'pica'
import glur from 'glur'

const resizer = pica();

async function addImageToFileDataArray(place, base64Image) {
    const resized = await resizeImage(base64Image)
    const blurred = await blurImage(resized, 20)
    
    const hslRaw = await getMiddlePixelHSL(resized)
    const hslBlurred = await getMiddlePixelHSL(blurred)

	const currentData = get(fileData);
    if (place === 'before'){

        currentData.images.beforeImages.push(resized);
        currentData.colorData.beforeImagesRawHSL.push(hslRaw)
        currentData.colorData.beforeImagesBlurredHSL.push(hslBlurred)
        fileData.set(currentData);
    } else {
        currentData.images.afterImages.push(resized);
        currentData.colorData.afterImagesRawHSL.push(hslRaw)
        currentData.colorData.afterImagesBlurredHSL.push(hslBlurred)
        fileData.set(currentData);
    }
    writeTextFile(await appDataDir() + "\\hsl-analyzer\\" + get(currentFile), JSON.stringify(currentData))

}

async function getMiddlePixelHSL(base64) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = async function () {
			const canvas = document.createElement('canvas');
			canvas.width = 200;
			canvas.height = 200;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0, 200, 200);
			const imageData = ctx.getImageData(100, 100, 1, 1).data; // get the middle pixel data
			const r = imageData[0] / 255;
			const g = imageData[1] / 255;
			const b = imageData[2] / 255;
			const max = Math.max(r, g, b),
				min = Math.min(r, g, b);
			let h,
				s,
				l = (max + min) / 2;
			if (max == min) {
				h = s = 0; // achromatic
			} else {
				let d = max - min;
				s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
				switch (max) {
					case r:
						h = (g - b) / d + (g < b ? 6 : 0);
						break;
					case g:
						h = (b - r) / d + 2;
						break;
					case b:
						h = (r - g) / d + 4;
						break;
				}
				h /= 6;
			}
			resolve([Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]); // resolve the promise with the HSL value
		};
		img.onerror = reject; // reject the promise if there's an error
		img.src = 'data:image/png;base64,' + base64;
        return 
	});
}



async function resizeImage(base64) {
	const img = new Image();
	img.src = 'data:image/png;base64,' + base64;
	const canvas = document.createElement('canvas');
	canvas.width = 200;
	// wrap the img.onload event in a promise
	const base64result = await new Promise((resolve) => {
		img.onload = async function () {
			canvas.height = (img.height * 200) / img.width;
			// resize the image to the canvas
			const result = await resizer.resize(img, canvas);
			const base64result = result.toDataURL('image/png');
			// do something with the base64 string
			resolve(base64result); // resolve the promise with the base64 string
		};
	});
	// now the parent function will wait for the promise to resolve
	return base64result.replace(/^data:image\/\w+;base64,/, ''); // return the base64 string
}


function arrayBufferToBase64(buffer) {
	let binary = '';
	let bytes = new Uint8Array(buffer);
	let len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
}

export async function deleteImage(place, index){
    const currentData = get(fileData);
    if (place === 'before'){
        currentData.images.beforeImages.splice(index, 1);
        currentData.colorData.beforeImagesRawHSL.splice(index, 1);
        currentData.colorData.beforeImagesBlurredHSL.splice(index, 1);
        fileData.set(currentData);
    } else {
        currentData.images.afterImages.splice(index, 1);
        currentData.colorData.afterImagesRawHSL.splice(index, 1);
        currentData.colorData.afterImagesBlurredHSL.splice(index, 1);
        fileData.set(currentData);
    }
    writeTextFile(await appDataDir() + "\\hsl-analyzer\\" + get(currentFile), JSON.stringify(currentData))

}

async function blurImage(base64, radius) {
	// create an image object from the base64 string
	const img = new Image();
	img.src = 'data:image/png;base64,' + base64;

	// create a canvas element to draw the image
	const canvas = document.createElement('canvas');

	// wrap the img.onload event in a promise
	const base64result = await new Promise((resolve) => {
		img.onload = async function () {
			// set the canvas dimensions to match the image
			canvas.width = img.width;
			canvas.height = img.height;

			// get the canvas context to access the image data
			const ctx = canvas.getContext('2d');

			// draw the image on the canvas
			ctx.drawImage(img, 0, 0);

			// get the image data as an array of pixels
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			const pixels = imageData.data;

			// apply the gaussian blur to the pixels using glur
			// the radius parameter controls the amount of blur
			glur(pixels, canvas.width, canvas.height, radius);

			// put the blurred pixels back on the canvas
			ctx.putImageData(imageData, 0, 0);

			// convert the canvas to a base64 string
			const base64result = canvas.toDataURL('image/png');

			// do something with the base64 string
			resolve(base64result); // resolve the promise with the base64 string
		};
	});

	// now the parent function will wait for the promise to resolve
	return base64result.replace(/^data:image\/\w+;base64,/, ''); // return the base64 string
}


export async function addImage(place){
    try {
        const selectedPath = await open({
            multiple: true,
            title: "Import Images"
        })

        if(selectedPath){
            // convert each image to base64
            // for each image
            selectedPath.forEach(async imagePath => {
                const binary = await readBinaryFile(imagePath)
                const base64Data = arrayBufferToBase64(binary);
                
                addImageToFileDataArray(place, base64Data)
                
            });
        }


    } catch (error) {
        console.log(error)
    }
}