<script>
import {
    currentFile
} from "$lib/stores/currentFileStore";
import FileBar from '$lib/FileBar.svelte'
import SideBar from "$lib/SideBar.svelte";
import FileBarAdd from "$lib/FileBarAdd.svelte";
import {
    readTextFile
} from "@tauri-apps/api/fs";
import {
    appDataDir
} from "@tauri-apps/api/path";
import {
    onMount
} from "svelte";
let fileData;

$: if ($currentFile) {
    const setData = async () => {
        fileData = JSON.parse(await readTextFile(await appDataDir() + "\\hsl-analyzer\\" + $currentFile))

    }

    setData()
}
</script>

<div class="flex flex-col " style="min-height: 100vh;">
    <div class="grow grid">
        <div class="flex flex-nowrap gap-3 p-5 overflow-x-auto">
            <div class="min-w-80">
                <p class="font-bold text-gray-600 text-2xl unselectable">Before</p>
                {#if $currentFile && fileData}
                <!-- {JSON.stringify(fileData.images)} -->
                {#each fileData.images.beforeImages as image (image)}
                <div class="p-5 flex gap-5">

                    <div class="w-1/2 rounded-xl bg-gray-200 aspect-square bg-cover bg-center" style="background-image: url({image});">
                        <div class="group h-full w-full hover:bg-black/30 rounded-xl text-white grid place-items-center">
                            <svg class="invisible group-hover:visible" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>

                        </div>
                    </div>
                    <div class="text-slate-500 text-sm">
                        <p>Val Raw:</p>
                        <p class="mb-3">Val Blurred:</p>

                        <p>Sat Raw:</p>
                        <p>Sat Blurred:</p>
                    </div>
                </div>
                {/each}
                <div class="px-5 flex gap-5" style="margin-top: {fileData.images.beforeImages.length == 0 ? '1.25rem' : '0'};">
                    <div class="w-1/2 rounded-xl bg-gray-200 hover:bg-gray-300 aspect-square bg-cover bg-center grid place-items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/></svg></div>

                </div>
                {/if}
            </div>

            <div class="h-full border-l-[1px] border-gray-300">
            </div>

            <div class="min-w-80">
                <p class="font-bold text-gray-600 text-2xl unselectable">After</p>
                {#if $currentFile && fileData}
                <!-- {JSON.stringify(fileData.images)} -->
                {#each fileData.images.afterImages as image (image)}
                <div class="p-5 flex gap-5">

                    <div class="w-1/2 rounded-xl bg-gray-200 aspect-square bg-cover bg-center" style="background-image: url({image});">
                        <div class="group h-full w-full hover:bg-black/30 rounded-xl text-white grid place-items-center">
                            <svg class="invisible group-hover:visible" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>

                        </div>
                    </div>
                    <div class="text-slate-500 text-sm">
                        <p>Val Raw:</p>
                        <p class="mb-3">Val Blurred:</p>

                        <p>Sat Raw:</p>
                        <p>Sat Blurred:</p>
                    </div>
                </div>
                {/each}
                <div class="px-5 flex gap-5" style="margin-top: {fileData.images.afterImages.length == 0 ? '1.25rem' : '0'};">
                    <div class="w-1/2 rounded-xl bg-gray-200 hover:bg-gray-300 aspect-square bg-cover bg-center grid place-items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/></svg></div>

                </div>
                {/if}
            </div>

            <div class="h-full border-l-[1px] border-gray-300">
            </div>

            <div class="min-w-60">
                <p class="font-bold text-gray-600 text-2xl unselectable">Difference (%)</p>
            </div>
        </div>
    </div>
</div>