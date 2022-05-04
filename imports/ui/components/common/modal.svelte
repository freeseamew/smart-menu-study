<script>
  export let modalActive = false;
  const closeModal = () => modalActive = false;
</script>

{#if modalActive}
  <div class="modal-bg" class:show={modalActive === true} >
    <div class="custom-modal" class:show={modalActive === true} >
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
