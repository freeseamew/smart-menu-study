<script>
  import { itemSearch, itemPage, itemMainLoading } from '/imports/ui/stores';

  let itemSearchForm;

  const onSearch = (e) => {
    const keyCode = e.keyCode;

    if(keyCode === 13) {
      itemSearch.set(itemSearchForm);
      itemPage.resetPage();
      itemMainLoading.set(true);
    }
  }

</script>
<div class="header-box-top d-flex " >
  <h1>스마트 메뉴판</h1>
  <input type="text" class="form-control txt-search-menu border-line" placeholder="원하는 메뉴 이름을 입력해주세요." bind:value={itemSearchForm} on:keydown={onSearch} >
</div>