<script>
  import Modal from '../common/modal.svelte';
  import { modalActiveCategory } from '../../stores';
  import { GET_CATEGORIES, ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from '../../apollo/query';
  import { query, mutation } from 'svelte-apollo';
  import { categoryValidateSchema } from '/imports/utils/validates';
  import notyf from '/imports/utils/notyfConfig';

  const categories = query(GET_CATEGORIES);
  const addCategory = mutation(ADD_CATEGORY);
  const deleteCategory = mutation(DELETE_CATEGORY);
  const updateCategory = mutation(UPDATE_CATEGORY);

  let addValues = {
    categoryName: ''
  }

  let updateValues = {
    _id: '',
    categoryName: '',
  }

  const onAddCategory = () => {
    try {
      addCategory({variables: addValues});
      clearCategoryForm();
    }
    catch(error) {
      console.log(`add cateogry error ${error.message}`);
    }
  }

  const clearCategoryForm = () => {
    categories.refetch();
    addValues.categoryName = '';
    updateValues._id = '';
    updateValues.categoryName = '';
  }

  const onDeleteCategory = async(_id) => {
    const deleteCategoryValue = {
      _id: _id
    }

    if(confirm('해당 카테고리를 삭제하겠습니까?')) {
      try {
        await deleteCategory({variables: deleteCategoryValue});
        clearCategoryForm();
      }
      catch(error) {
        console.log(`delete category error: ${error.message}`)
      }
    }
  }

  const onEditMode = (category) => {
    updateValues._id = category._id;
    updateValues.categoryName = category.categoryName;
  }

  const onUpdateCategory = async () => {
    try {
      await updateCategory({variables: updateValues});
      clearCategoryForm();
    }
    catch(error) {
      console.log(`update category error: ${error.message}`)
    }
  }

  const onSubmitAddCategory = async () => {
    try {
      await categoryValidateSchema.validate(addValues, {abortEarly: false});
      onAddCategory();
    }
    catch(error) {
      // alert(error.message);
      notyf.error(error.message);
    }
  }

  const onSubmitUpdateCategory = async () => {
    try {
      await categoryValidateSchema.validate(updateValues, {abortEarly: false});
      onUpdateCategory();
    }
    catch(error) {
      // alert(error.message);
      notyf.error(error.message);
    }
  }

</script>

<Modal bind:modalActive={$modalActiveCategory}>
  <!-- slot modal-header start -->
  <h4 slot="modal-title">메뉴 추가</h4>
  <!-- slot modal-header end -->

  <!-- slot modal-body start -->
  <div class="modal-body" slot="modal-body">
    <h5 class="mb-3">카테고리 목록</h5>
    
    <ul class="category-list">
      {#if $categories.loading}
        <li class="mb-3 d-flex justify-content-between">
          <p>Loading</p>
        </li>                   
      {:else}
        {#each $categories.data.categories as category (category._id)}
          {#if updateValues._id !== category._id}
            <li class="mb-3 d-flex justify-content-between">
              <p>{category.categoryName}</p> 
              <div class="edit-box">
                <a href="#null" class="link"><i class='bx bxs-pencil' on:click={() => onEditMode(category)} ></i></a>
                <a href="#null" class="link"><i class='bx bxs-trash' on:click={() => onDeleteCategory(category._id)} ></i></a>
              </div>
            </li>           
          {:else}
            <li class="mb-3 d-flex justify-content-between">
              <input type="text" class="form-control border-line" bind:value={updateValues.categoryName} on:focusout={onSubmitUpdateCategory}>
            </li>
          {/if}
        {/each}
      {/if}
    </ul>
  </div>
  <!-- slot modal-body end -->

  <!-- slot modal-footer start -->
  <div class="modal-footer d-flex flex-column align-items-stretch" slot="modal-footer">
    <div class="input-group">
      <input type="text" class="form-control border-line" bind:value={addValues.categoryName}>
      <button class="btn btn-primary" on:click={onSubmitAddCategory}>등록</button>
    </div>
  </div>     
  <!-- slot modal-footer end -->
</Modal>
