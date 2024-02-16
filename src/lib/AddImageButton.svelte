<script>
    export let topSpace = false;
    export let kind;
    import { addImage } from '$lib/functions/addImage.js'
    
</script>

<button class="flex gap-5 w-full" style="margin-top: {topSpace ? '1.25rem' : '1.25rem'};" on:click={() => addImage(kind)}>
    <div class="w-1/2 rounded-xl bg-gray-200 hover:bg-gray-300 aspect-square bg-cover bg-center grid place-items-center text-gray-500">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/></svg></div>
</button>
<div class="pb-10">

</div>