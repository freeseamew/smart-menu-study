<script>
  import { fly, fade } from 'svelte/transition';
  export let modalActive = false;
  const closeModal = () => modalActive = false;
</script>

{#if modalActive}
  <div class="modal-bg" class:show={modalActive === true} in:fade={{duration:300}} out:fade={{delay:300, duration:500}} >
    <div class="custom-modal" class:show={modalActive === true} in:fly={{delay:300, duration: 500, y:-30}} out:fly={{duration:300, y:-30}} >
      <div class="modal-dialog"  >

        <div class="modal-content">
          <div class="modal-header">
            <slot name="modal-title"></slot>
            <button type="button" class="btn-close" on:click={closeModal} ></button>
          </div>
          <slot name="modal-body"></slot>
          <slot name="modal-footer"></slot>
        </div>

      </div>
    </div>  
  </div>
{/if}

