<script>
  import OrderList from './orderList.svelte';
  import OrderBottom from './orderBottom.svelte';
  import OrderResultList from './orderResultList.svelte';
  import OrderComplate from './orderComplate.svelte';
  import { authToken, auth, isAdmin } from '/imports/ui/stores';
  import { mutation } from 'svelte-apollo';
  import { LOGOUT } from '/imports/ui/apollo/query';
  import { router } from 'tinro/cmp/index.js';

  const logout = mutation(LOGOUT);
  
  const onLogout = async () => {
    try {
      await logout();
      authToken.removeAuthToken();
    }
    catch(error) {
      console.log(error);
    }
  }

  const goLogin = () => router.goto('/login');
</script>

<aside> <!-- aside start-->
  <div class="side-header">
    <div class="title-box d-flex align-items-center justify-content-between pl-4 pr-4 pt-4">
      <h2>주문내용</h2>
      <span>
        {#if $authToken}
          <a href="#null" on:click={onLogout}><i class='bx bx-log-out'></i></a>
          <a href="/users"><i class='bx bxs-cog'></i></a>
        {:else}
          <a href="#null" on:click={goLogin} ><i class='bx bx-log-in'></i></a>
        {/if}
      </span>
    </div>
    <div class="info-box d-flex justify-content-between align-items-center pl-4 pr-4">
      {#if $authToken}
        <p>{$auth.email} 로그인중</p>
      {:else}
        <p>상품 이름</p>
      {/if}
      <p>수량</p>
    </div>
  </div>
  <div class={$authToken ? "side-content-admin aside-box simplebar mt-auto" : "side-content aside-box simplebar mt-auto"}>
    {#if $isAdmin}
       <OrderResultList />
    {:else}
      <OrderList />
    {/if}
  </div>
  <div class={$authToken ? "side-bottom-admin d-flex flex-column justify-content-center align-items-center" : "side-bottom d-flex flex-column justify-content-center align-items-center" }>
    {#if !$authToken}
      <OrderBottom />
    {/if}
  </div>
</aside><!-- end aside -->   

<OrderComplate />