<script>
  import { query } from 'svelte-apollo';
  import { GET_ITEMS } from '/imports/ui/apollo/query';
  import Item from './item.svelte';
  import { modalActiveItem, itemPage, itemPageLock, itemFormMode, itemCategorySelected, itemSearch, isAdmin, itemMainLoading, itemPageLoading } from '/imports/ui/stores';
  import ItemLoading from './itemLoading.svelte';

  let component;
  let elementScroll;

  const items =query(GET_ITEMS);

  const onOpenModalItemForm = () => {
    modalActiveItem.openModal();
    itemFormMode.onAddMode();
  }

  const onScroll = (e) => {
    const scrollHeight = e.target.scrollHeight;
    const clientHeight = e.target.clientHeight;
    const scrollTop = e.target.scrollTop;
    const realHeight = scrollHeight - clientHeight;
    const triggerHeight = realHeight * 0.7;

    const triggerComputed = () => scrollTop > triggerHeight;
    const scrollTrigger = () => triggerComputed() && !$itemPageLock;
    const countCheck = () => $items.data.itemPageCount <= $itemPage.pageNumber

    if(countCheck()) {
      itemPageLock.set(true);
    }

    if(scrollTrigger()) {
      console.log('next')
      itemPage.nextPage();
    }
  }

  $: {
    if(component || elementScroll) {
      const element = elementScroll ? elementScroll : component.parentNode;

      element.addEventListener('scroll', onScroll);
      element.addEventListener('resize', onScroll);
    }

    items.fetchMore({
      variables: {
        pageNumber: $itemPage.pageNumber,
        itemCategoryId: $itemCategorySelected,
        search: $itemSearch,
      },
    }).then((result) => {
      itemPageLock.set(false);
      itemMainLoading.set(false);
      itemPageLoading.set(false);
    });
  }

</script>

<div class="row row-cols-4 g-4 pl-3 pr-3 pt-2 pb-4 list-bg-shadow" bind:this={component}>
  
  {#if $items.loading || $itemMainLoading}
    <ItemLoading />
  {:else}
    {#if $isAdmin}
      <div class="col mb-2">
        <span class="btn-add-modal-show" on:click={onOpenModalItemForm} >
          <div class="card menu-add-box h-100 d-flex justify-content-center align-items-center">
            <i class='bx bx-plus bx-md' ></i>
          </div>
        </span>
      </div>                               
    {/if}
    {#each $items.data.items as item, index}
       <Item item={item} />
    {/each}
    {#if $itemPageLoading}
      <ItemLoading />
    {/if}
  {/if}
  <!-- Loading-box start-->

  <!-- Loading-box end-->
</div>