<script>
  import { query } from 'svelte-apollo';
  import { GET_CATEGORIES } from '../../apollo/query.js';
  import { modalActiveCategory, itemCategorySelected, isAdmin, itemMainLoading } from '../../stores';
  import { ALL } from '/imports/utils/constans.js';

  const categories = query(GET_CATEGORIES);

  const onOpenModalActiveCategory = () => modalActiveCategory.set(true);
  const onSelectCategory = (_id) => {
    if(!$itemMainLoading) itemCategorySelected.selectCategory(_id);
  }

</script>

<div class="header-box-bottom">
  <ul class="d-flex justify-content-start">
    <li>
      {#if $itemCategorySelected === ALL}
        <a href="#null" class="d-flex align-items-center" class:selected={$itemCategorySelected === ALL} >모두보기</a>   
      {:else}
        <!-- <a href="#null" class="d-flex align-items-center" class:disableClick={$itemMainLoading} on:click={() => onSelectCategory(ALL)} >모두보기</a>  -->
        <a href="#null" class="d-flex align-items-center" on:click={() => onSelectCategory(ALL)} >모두보기</a> 
      {/if}
      
    </li>
    {#if $categories.loading}
      <li>
        <a  href="#null" class="d-flex align-items-center ">Loading</a>
      </li>                  
    {:else}
      {#each $categories.data.categories as category (category._id)}
        <li>
          {#if $itemCategorySelected === category._id}
             <a href="#null" class="d-flex align-items-center" class:selected={$itemCategorySelected===category._id} >{category.categoryName}</a>
          {:else}
             <!-- <a href="#null" class="d-flex align-items-center" class:disableClick={$itemMainLoading} on:click={onSelectCategory(category._id)} >{category.categoryName}</a> -->
             <a href="#null" class="d-flex align-items-center" on:click={onSelectCategory(category._id)} >{category.categoryName}</a> 
          {/if}
        </li>
      {/each}
    {/if}
    {#if $isAdmin}
      <li>
        <a href="#null" class="d-flex align-items-center add" on:click={onOpenModalActiveCategory} >+관리</a>
      </li>               
    {/if}                                                                        
  </ul>
</div>