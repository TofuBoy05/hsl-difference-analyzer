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

export let name;
export let selected = false;
export let path;

let nameElement;
let previousName;

// function handleDoubleClick() {
//     previousName = name;
//     nameElement.contentEditable = true;
//     setTimeout(() => {
//         nameElement.focus();
//     }, 100)

//     nameElement.focus();
//     // Select the entire text
//     const range = document.createRange();
//     range.selectNodeContents(nameElement);
//     const sel = window.getSelection();
//     sel.removeAllRanges();
//     sel.addRange(range);
// }
// function validateRegex(str) {
//   // Create a RegExp object with the regex pattern
//   let regex = /^[\w\-. ]+$/;
//   // Test the string with the regex using the test method
//   const regexTest =  regex.test(str);

//   return regexTest
// }

// function fileNameExists(files, filename) {
//     // Extract an array of filenames using map()
//     const filenames = files.map(file => file.name);
    
//     // Check if the filename exists in the array of filenames
//     return filenames.includes(filename);
// }

// async function handleKeyDown(event) {
   
//     if (event.key === 'Enter') {
        
//         nameElement.blur();
//         if (!name) {
//             name = previousName;
//             nameElement.contentEditable = false;
//             return
//         }
//         if (!name.endsWith(".hsla")){
//             name = name + ".hsla"
//         }
        
//         nameElement.contentEditable = false;
//          getFiles()
//         if(validateRegex(name) && !fileNameExists($files, name)){
            
//             currentFile.set(name);
//             renameFile(path, await appDataDir() + "\\hsl-analyzer\\" + name)
//             name = name;
//             getFiles()
//         } else {
//             getFiles()
//             name = previousName;
//         }
//     }
// }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="flex w-full py-1 px-3 rounded-lg mt-2 shadow-sm border-[1px] hover:bg-gray-100 duration-100 active:bg-gray-200 border-gray-300 bg-white"
    on:click={() => currentFile.set(name)}

    >
    <p
        bind:this={nameElement}
        bind:innerHTML={name}
        contenteditable="false"
        class="text-gray-500 "
        style="color: {selected ? 'black' : ''}; font-weight: {selected ? '600' : ''}"
        ></p>

    <span
        class="text-gray-500"
        style="color: {selected ? 'black' : ''}; font-weight: {selected ? '600' : ''}"
        >
    </span>
</div>
