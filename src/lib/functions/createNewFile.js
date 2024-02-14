import { appDataDir } from '@tauri-apps/api/path';
import { writeTextFile } from '@tauri-apps/api/fs';
import { getFiles } from '$lib/functions/getFiles';

export async function createNewFile(filename) {
	const appDataDirPath = await appDataDir();
	const path = appDataDirPath + 'hsl-analyzer';
	const savePath = path + `\\${filename}.hsla`;

	let jsonData = {
		images: {
			beforeImages: [],
			afterImages: []
		},
		cachedData: {
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

	writeTextFile(savePath, JSON.stringify(jsonData));
	getFiles();
}
