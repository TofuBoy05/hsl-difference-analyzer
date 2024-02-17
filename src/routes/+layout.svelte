<script>
  import "../app.css";
  import { onMount } from "svelte";
  import { invoke } from "@tauri-apps/api/tauri";

    invoke("close_splashscreen");
    
</script>

<div class="flex flex-col" style="min-height: 100vh; min-height: 100svh;">
  <div class="grow grid">
    <slot />
  </div>
</div>