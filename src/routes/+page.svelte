<script>
    import { currentFile } from "$lib/stores/currentFileStore";
    import FileBar from '$lib/FileBar.svelte'
    import SideBar from "$lib/SideBar.svelte";
    import FileBarAdd from "$lib/FileBarAdd.svelte";
    import { readTextFile } from "@tauri-apps/api/fs";
    import { appDataDir } from "@tauri-apps/api/path";
	import { onMount } from "svelte";
	import Body from "$lib/Body.svelte";

    onMount(async () => {
        console.log(await appDataDir())
    })



</script>


<div class="flex w-full"> 
    <SideBar />
    <div class="overflow-hidden">
        <Body />
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