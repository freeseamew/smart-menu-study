<script>
  import { orders, modalActiveComplateOrder } from '/imports/ui/stores';

  const onAddOrder = () => {
    modalActiveComplateOrder.set(true);
  }
</script>
<div class="side-bottom-header d-flex align-items-center justify-content-center">
  <p>
    <span class="total-count">{$orders.orderCount}</span>개 
    <span class="total-price">{$orders.orderPriceSum}</span>원 선택
  </p>
</div>
<div class="side-bottom-button-box d-flex flex-column pl-4 pr-4 pb-4 " >
  <button class="btn btn-primary h-100" on:click={onAddOrder} >주문하기</button>
</div>