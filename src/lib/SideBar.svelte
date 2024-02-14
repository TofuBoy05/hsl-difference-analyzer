<script lang="js">
	import FileBar from "./FileBar.svelte";
    import { readDir, createDir, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
    import { appDataDir } from '@tauri-apps/api/path';

    import { files } from '$lib/stores/filesStore.js'

    import { currentFile } from "$lib/stores/currentFileStore";
	import FileBarAdd from "./FileBarAdd.svelte";
	import { onMount } from "svelte";
    import { getFiles } from "$lib/functions/getFiles.js";
    let dragging = false;
    let sidebarWidth = 300


    onMount(async () => {
        getFiles()
    })

    document.addEventListener('mousemove', (e) => {
        if (dragging) {
            const main = document.getElementById('main');
            const newWidth = e.pageX * 2 - 150; // magic numbers, idk why but when there is content outside the sidebar, the resizing is weird and slower
            if(newWidth <= 600 && newWidth >= 300){
                sidebarWidth = newWidth;
            }
        }
    });

    document.addEventListener('mouseup', () => {
        if (dragging) {
            dragging = false;
        }
    });
</script>

<div class="mt-full bg-gray-200 relative px-3 py-5" style="width: {sidebarWidth}px;">
    <p class="text-2xl font-bold text-gray-700">Comparisons</p>
    {#each $files as file}
    <FileBar name={file.name} path={file.path} selected={$currentFile == file.name}/>
    {/each}
    <FileBarAdd />
    <div class="absolute w-1 h-full top-0 right-0 cursor-col-resize" on:mousedown={() => dragging = true}>
    </div>
</div>