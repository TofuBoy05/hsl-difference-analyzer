<script>
import {currentFile } from "$lib/stores/currentFileStore";
import FileBar from '$lib/FileBar.svelte'
import SideBar from "$lib/SideBar.svelte";
import FileBarAdd from "$lib/FileBarAdd.svelte";
import { readTextFile } from "@tauri-apps/api/fs";
import { appDataDir } from "@tauri-apps/api/path";
import { onMount } from "svelte";
import AddImageButton from "$lib/AddImageButton.svelte";
import { fileData } from '$lib/stores/fileDataStore.js' 
import { writeTextFile } from "@tauri-apps/api/fs";
import { deleteImage } from '$lib/functions/addImage.js'
import { fadePercent } from '$lib/functions/getFadePercent.js'


$: if ($currentFile) {

    const setData = async () => {
        fileData.set(JSON.parse(await readTextFile(await appDataDir() + "\\hsl-analyzer\\" + $currentFile)))

    }

    setData()
}
</script>
<div class="flex flex-col w-full " style="min-height: 100vh;">
    <div class="grow grid">
        <div class="flex flex-nowrap gap-3 p-5 overflow-x-auto overflow-y-auto max-h-[100vh]">
            <div class="min-w-80">

                <p class=" font-bold text-gray-600 text-2xl unselectable">Before</p>
                {#if $currentFile && $fileData}
                {#each $fileData.images.beforeImages as image, index (index)}
                <div class="flex gap-5 mt-5">

                    <div class="w-1/2 rounded-xl bg-gray-200 aspect-square bg-cover bg-center" style="background-image: url({"data:image/png;base64," + image});">
                        <button class="group h-full w-full hover:bg-black/30 rounded-xl text-white grid place-items-center" on:click={() => deleteImage("before", index)}>
                            <svg class="invisible group-hover:visible" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>

                        </button>
                    </div>
                    <div class="text-slate-500 text-sm">
                        <p>Val Raw: {$fileData.colorData.beforeImagesRawHSL[index][2]}%</p>
                        <p class="mb-3">Val Blurred:{$fileData.colorData.beforeImagesBlurredHSL[index][2]}%</p>

                        <p>Sat Raw: {$fileData.colorData.beforeImagesRawHSL[index][1]}%</p>
                        <p class="mb-3">Sat Blurred: {$fileData.colorData.beforeImagesBlurredHSL[index][1]}%</p>

                        <p>Hue Raw: {$fileData.colorData.beforeImagesRawHSL[index][0]}°</p>
                        <p class="">Hue Blurred:{$fileData.colorData.beforeImagesBlurredHSL[index][0]}°</p>
                    </div>
                </div>
                {/each}
                <AddImageButton kind="before" topSpace={$fileData.images.beforeImages.length > 0} />
                {/if}
            </div>

            <div class="divider h-full  border-l-[1px] border-gray-300">
            </div>

            <div class="min-w-80">
                <p class=" font-bold text-gray-600 text-2xl unselectable">After</p>
                {#if $currentFile && $fileData}
                {#each $fileData.images.afterImages as image, index (index)}
                <div class=" flex gap-5 mt-5">
                    

                    <div class="w-1/2 rounded-xl bg-gray-200 aspect-square bg-cover bg-center" style="background-image: url({"data:image/png;base64," + image});">
                        <button class="group h-full w-full hover:bg-black/30 rounded-xl text-white grid place-items-center"on:click={() => deleteImage("after", index)}>
                            <svg class="invisible group-hover:visible" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>

                        </button>
                    </div>
                    <div class="text-slate-500 text-sm">
                        <p>Val Raw: {$fileData.colorData.afterImagesRawHSL[index][2]}%</p>
                        <p class="mb-3">Val Blurred:{$fileData.colorData.afterImagesBlurredHSL[index][2]}%</p>

                        <p>Sat Raw: {$fileData.colorData.afterImagesRawHSL[index][1]}%</p>
                        <p class="mb-3">Sat Blurred: {$fileData.colorData.afterImagesBlurredHSL[index][1]}%</p>

                        
                        <p>Hue Raw: {$fileData.colorData.afterImagesRawHSL[index][0]}°</p>
                        <p class="">Hue Blurred:{$fileData.colorData.afterImagesBlurredHSL[index][0]}°</p>
                    </div>
                </div>
                {/each}
                <AddImageButton kind="after" topSpace={$fileData.images.afterImages.length > 0} />
                {/if}
            </div>

            <div class="divider h-full border-l-[1px] border-gray-300">
            </div>
            
            <div class="min-w-44">
                <p class=" font-bold text-gray-600 text-2xl unselectable">Difference (%)</p>
                <div class="text-slate-500 text-sm">

                    {#if $currentFile && $fileData}
                    {#if $fileData.colorData.beforeImagesRawHSL.length == $fileData.colorData.afterImagesRawHSL.length}
                    {#each $fileData.colorData.beforeImagesRawHSL as data, index (index)}
                    <div>
                        <p class="mt-5">Val Raw: {$fileData.colorData.afterImagesRawHSL[index][2] - $fileData.colorData.beforeImagesRawHSL[index][2]}%</p>
                        <p class="mb-3">Val Blurred:{$fileData.colorData.afterImagesBlurredHSL[index][2] - $fileData.colorData.beforeImagesBlurredHSL[index][2]}%</p>
        
                        <p>Sat Raw: {$fileData.colorData.afterImagesRawHSL[index][1] - $fileData.colorData.beforeImagesRawHSL[index][1]}%</p>
                        <p class="mb-3">Sat Blurred: {$fileData.colorData.afterImagesBlurredHSL[index][1] - $fileData.colorData.beforeImagesBlurredHSL[index][1]}%</p>
        
                        
                        <p>Hue Raw: {$fileData.colorData.afterImagesRawHSL[index][0] - $fileData.colorData.beforeImagesRawHSL[index][0]}°</p>
                        <p class="pb-4">Hue Blurred:{$fileData.colorData.afterImagesBlurredHSL[index][0] - $fileData.colorData.beforeImagesBlurredHSL[index][0]}°</p>
                    </div>
    
    
                    {/each}
                    {/if}
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* Firefox (uncomment to work in Firefox, although other properties will not work!)  */
/** {
  scrollbar-width: thin;
  scrollbar-color: #C7C7C7 #F5F5F5;
}*/

/* Chrome, Edge and Safari */
*::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}
*::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #F5F5F5;
}

*::-webkit-scrollbar-track:hover {
  background-color: #E7E7E7;
}

*::-webkit-scrollbar-track:active {
  background-color: #E7E7E7;
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #C7C7C7;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: #B6B6B6;
}

*::-webkit-scrollbar-thumb:active {
  background-color: #B6B6B6;
}
.divider {
        position: sticky;
        top: 0;
        height: 95%;
        z-index: 10; /* Ensure dividers stay above other content */
    }
</style>