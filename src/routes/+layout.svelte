<script>
  import "../app.css";
  import { onMount } from "svelte";
  import { invoke } from "@tauri-apps/api/tauri";
  import { getVersion } from "@tauri-apps/api/app";

  let updateModal;
  let latestVersion;
  let clientVersion;
  let needUpdate = false;

  function isClientAppOutdated(clientVersion, latestVersion) {
      const clientVersionParts = clientVersion.split('.').map(Number);
      const latestVersionParts = latestVersion.split('.').map(Number);

      for (let i = 0; i < latestVersionParts.length; i++) {
          if (clientVersionParts[i] < latestVersionParts[i]) {
              return true;
          } else if (clientVersionParts[i] > latestVersionParts[i]) {
              return false;
          }
      }

      return false;
  }
  
  onMount(async() => {
  clientVersion = await getVersion()
  const latest = await fetch('https://raw.githubusercontent.com/TofuBoy05/hsl-difference-analyzer/master/version_info.json')
  const response = await latest.json()
  latestVersion = response;
  console.log(response)

  if(isClientAppOutdated(clientVersion, response.version)){
    needUpdate = true;
    setTimeout(() => {
      updateModal.showModal()
    }, 100)
  }


  })
    
</script>

<div class="flex flex-col" style="min-height: 100vh; min-height: 100svh;">
  <div class="grow grid">
    <slot />
  </div>
</div>

{#if needUpdate}

<dialog id="updateModal" class="modal" bind:this={updateModal}>
  <div class="modal-box rounded-lg text-gray-500">
    <h3 class="font-bold text-lg">Update Available</h3>
    <p class="py-4">A new version is available!</p>
    <p><b>Current version:</b> {clientVersion}</p>
    <p class="mb-5"><b>Latest version:</b> {latestVersion.version}</p>
    <p>Message:</p>
    <p>{latestVersion.message}</p>
    <div class="flex justify-end gap-1">
        <button class="btn rounded-md btn-sm" on:click={() => {
            updateModal.close()
        }}>Later</button>
        <a class="btn btn-primary text-white rounded-md btn-sm" href="{latestVersion.url}" on:click={() => {
          updateModal.close()
        }}>Download</a>
    </div>
  </div>
</dialog>

{/if}