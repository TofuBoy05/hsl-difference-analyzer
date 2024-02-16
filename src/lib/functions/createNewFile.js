import { appDataDir } from '@tauri-apps/api/path';
import { writeTextFile } from '@tauri-apps/api/fs';
import { getFiles } from '$lib/functions/getFiles';
import { files } from '$lib/stores/filesStore.js';
import { get } from 'svelte/store';
import { currentFile } from '$lib/stores/currentFileStore.js';

export async function createNewFile(filename) {
	const appDataDirPath = await appDataDir();
	const path = appDataDirPath + 'hsl-analyzer';
	const savePath = path + `\\${filename}.hsla`;

	let jsonData = {
		images: {
			beforeImages: [],
			afterImages: []
		},
		colorData: {
			beforeImagesRawHSL: [],
			afterImagesRawHSL: [],

			beforeImagesBlurredHSL: [],
			afterImagesBlurredHSL: [],

			beforeImagesRawMean: null,
			beforeImagesBlurredMean: null,

			afterImagesRawMean: null,
			afterImagesBlurredMean: null,

			RawDifference: null,
			afterDifference: null
		}
	};
	if(filename){
		// check if filename + ".hsla" already exists in $files store
		const filesArray = get(files);
		let names = filesArray.map(obj => obj.name);
		if(!names.includes(filename + ".hsla")){
			writeTextFile(savePath, JSON.stringify(jsonData));
			getFiles();
			currentFile.set(filename + '.hsla');
		}

	}

}
