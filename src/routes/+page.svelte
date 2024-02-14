<script>
    import { currentFile } from "$lib/stores/currentFileStore";
    import FileBar from '$lib/FileBar.svelte'
    import SideBar from "$lib/SideBar.svelte";
    import FileBarAdd from "$lib/FileBarAdd.svelte";

    

    let files = ['file1', 'file2', 'file3']
</script>


<div class="mt-9 flex">
    <SideBar />
    <div class="flex gap-3 w-full p-5">
        <div class="flex-grow">
            <p class="font-bold text-gray-600 text-2xl unselectable">Before</p>
        </div>
        
        <div class="flex-grow">
            <p class="font-bold text-gray-600 text-2xl unselectable">After</p>
        </div>
    </div>
</div>

<style>
.unselectable {
  user-select: none; /* Standard syntax */
  -webkit-user-select: none; /* Safari and Chrome */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE 10+ */
}
</style>