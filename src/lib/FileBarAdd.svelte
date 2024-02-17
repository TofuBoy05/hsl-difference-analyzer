<script>
    import {currentFile} from '$lib/stores/currentFileStore.js'
    import { createNewFile } from '$lib/functions/createNewFile.js';

    let fileName;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="flex justify-center w-full py-1 px-3 rounded-lg mt-2 shadow-sm border-[1px] hover:bg-gray-100 duration-100 active:bg-gray-200 border-gray-300 bg-white"
    on:click={() => my_modal_1.showModal()}
>
<span class="text-gray-400">
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2"/></svg>
</span>
</div>

<dialog id="my_modal_1" class="modal">
  <div class="modal-box rounded-lg">
    <h3 class="font-bold text-lg">New File</h3>
    <p class="py-4">You cannot change the file name after this!</p>
    <div class="">
        <form method="dialog" on:submit={() => {createNewFile(fileName); fileName = ""}}>
          <input type="text" bind:value={fileName} placeholder="File name" class="rounded-sm input input-bordered w-full input-sm" />
        <!-- if there is a button in form, it will close the modal -->
        <div class="flex justify-end gap-2 mt-4">
            <button type="button" class="btn btn-sm rounded-md" on:click={() => {my_modal_1.close()}}>Close</button>
            <button type="submit" class="btn btn-sm btn-primary rounded-md">Create</button>
        </div>
      </form>
    </div>
  </div>
</dialog>

