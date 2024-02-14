import { appDataDir } from '@tauri-apps/api/path';
import { createDir, readDir } from '@tauri-apps/api/fs';
import { files } from '$lib/stores/filesStore.js'

export async function getFiles() {
	const appDataDirPath = await appDataDir();
	const path = appDataDirPath + 'hsl-analyzer';
	try {
		const filesList = await readDir(path);
		files.set(filesList)
	} catch (err) {
		await createDir(path, { recursive: true });
		const filesList = await readDir(path);
		files.set(filesList)
	}
}
