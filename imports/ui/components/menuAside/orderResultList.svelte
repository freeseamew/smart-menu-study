<script>
  import { query, mutation } from 'svelte-apollo';
  import { GET_ORDERS, SUBSCRIBE_ORDER, CHECK_ORDER } from '/imports/ui/apollo/query';
  import { authToken } from '/imports/ui/stores';
  import notyf from '/imports/utils/notyfConfig';
  import { fade } from 'svelte/transition';

  const orders = query(GET_ORDERS);
  const checkOrder = mutation(CHECK_ORDER);

  // orders.startPolling(3000);
  
  orders.subscribeToMore({
    document: SUBSCRIBE_ORDER,
    variables: { authToken: $authToken },
    updateQuery: (prev, {subscriptionData}) => {
      if(!subscriptionData.data) return prev;
      const newOrder = subscriptionData.data.orderAdded;

      // alert(`주문이 추가 되었습니다. ${newOrder.orderDate}`);
      notyf.success(`주문이 추가 되었습니다. ${newOrder.orderDate}`);

      return {
        orders: [
          ...prev.orders,
          newOrder,
        ]
      }
    }
  });

  const onCheckOrder = async (_id, orderState) => {
    console.log(`_id: ${_id}, orderState: ${orderState}`)
    const values = {
      _id: _id,
      orderState: orderState,
    }

    try {
      await checkOrder({
        variables: values,
        update: (cache, {data: {checkOrder}}) => {
          const existingOrders = cache.readQuery({query: GET_ORDERS});
          const newOrders = existingOrders.orders.map(order => {
            if(order._id === checkOrder) {
              let newOrder = {...order}
              newOrder.orderState = !orderState;

              return newOrder;
            }
            return order;
          });

          cache.writeQuery({
            query: GET_ORDERS,
            data: {
              orders: newOrders,
            }
          });
        }
      });
    }
    catch(error) {
      console.log(error);
    }
  }

</script>
<!-- order results start -->
<ul>
  {#if $orders.loading}
     <li class="d-flex  flex-column p-4 order-result-list "><p>Loading...</p></li>
  {:else}
    {#each [...$orders.data.orders].reverse() as order (order._id)}
      <!-- order one start -->
      <li class="d-flex  flex-column p-4 order-result-list" in:fade={{delay:300, duration:500}} >
        <div class="d-flex justify-content-between ">
          <ul class="order-inner-list">
            <li class="d-flex justify-content-between date">
              <p class:orderChecked={order.orderState}>{order.orderDate}</p>
              {#if order.orderState}
                <p class="btnOrderCheck" on:click={() => onCheckOrder(order._id, order.orderState)}>취소</p>
              {:else}
                <p class="btnOrderCheck" on:click={() => onCheckOrder(order._id, order.orderState)} >확인</p>
              {/if}
              
            </li>        
            {#if order.orderItems}
              {#each order.orderItems as item}
                <li class="d-flex justify-content-between ">
                  <p class:orderChecked={order.orderState}>{item.itemName}</p>
                  <p class:orderChecked={order.orderState}>{item.itemCount}개</p>
                </li>   
                <li class="d-flex justify-content-between ">
                  <p class:orderChecked={order.orderState}>가격(개당: {item.itemPrice})</p>
                  <p class:orderChecked={order.orderState}>{item.itemPriceSum}</p>
                </li>                  
              {/each}
            {/if}
            <li class="d-flex justify-content-between total ">
              <p class:orderChecked={order.orderState}>개수합계</p>
              <p class:orderChecked={order.orderState}>{order.orderCount}</p>
            </li>                   
            <li class="d-flex justify-content-between total ">
              <p class:orderChecked={order.orderState}>가격합계</p>
              <p class:orderChecked={order.orderState}>{order.orderPriceSum}</p>
            </li>                                 
          </ul>
        </div>
      </li>
      <!-- order one end -->                                                                                           
    {/each}
  {/if}
</ul> 
<!-- order results end-->

<style>
  .orderChecked {
    text-decoration-line: line-through underLine;
  }
  .btnOrderCheck {
    cursor: pointer;
  }
</style>