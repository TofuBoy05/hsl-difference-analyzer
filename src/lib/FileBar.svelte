<script>
import {
    currentFile,
} from '$lib/stores/currentFileStore'
import {
    renameFile
} from '@tauri-apps/api/fs'
import { appDataDir } from '@tauri-apps/api/path';
import { files } from '$lib/stores/filesStore.js'
import { getFiles } from '$lib/functions/getFiles.js'
import { onMount } from 'svelte';
import { onDestroy } from 'svelte';
import { removeFile } from '@tauri-apps/api/fs'

export let name;
export let selected = false;
export let path;

let myMenu;

let nameElement;
let contextElement;
let contextMenuListener;

let fileDelete;

</script>



<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
    class="group relative flex w-full py-1 px-3 rounded-lg mt-2 shadow-sm border-[1px] hover:bg-gray-100 duration-100 active:bg-gray-200 border-gray-300 bg-white"
    on:click={() => currentFile.set(name)}
    >
    <p
        bind:this={nameElement}
        bind:innerHTML={name}
        contenteditable="false"
        class="text-gray-500 unselectable"
        style="color: {selected ? 'black' : ''}; font-weight: {selected ? '600' : ''}"
        ></p>

    <span
        class="text-gray-500"
        style="color: {selected ? 'black' : ''}; font-weight: {selected ? '600' : ''}"
        >
    </span>
    <div class="flex-grow flex justify-end text-gray-400">
        <button class="group-hover:block hidden m-0 p-0" on:click={() => {fileDelete.showModal()}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </button>
    </div>
    
</div>

<dialog id="fileDelete" class="modal" bind:this={fileDelete}>
  <div class="modal-box rounded-lg">
    <h3 class="font-bold text-lg">Delete file</h3>
    <p class="py-4">Are you sure you want to delete this file?</p>
    <div class="flex justify-end gap-1">
        <button class="btn rounded-md btn-sm" on:click={() => {
            fileDelete.close()
        }}>Cancel</button>
        <button class="btn bg-red-600 hover:bg-red-700 active:bg-red-700 text-white rounded-md btn-sm" on:click={() => {
            removeFile(path);
            getFiles();
            currentFile.set(null)
        }}>Yes</button>
    </div>
  </div>
</dialog>

<style>
    /* Make text unselectable */
    .unselectable {
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE 10+ */
        user-select: none; /* Standard syntax */
    }
</style>