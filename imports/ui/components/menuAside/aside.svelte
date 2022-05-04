<script>
  import OrderList from './orderList';
  import OrderBottom from './orderBottom';
</script>

<aside> <!-- aside start-->
  <div class="side-header">
    <div class="title-box d-flex align-items-center justify-content-between pl-4 pr-4 pt-4">
      <h2>주문내용</h2>
      <span>
        <a href="#null" ><i class='bx bx-log-in'></i></a>
        <a href="#null"><i class='bx bxs-cog'></i></a>
      </span>

    </div>
    <div class="info-box d-flex justify-content-between align-items-center pl-4 pr-4">
      <p>상품 이름</p>
      <p>수량</p>
    </div>
  </div>
  <div class="side-content aside-box simplebar mt-auto">
    <!-- orderList start-->
    <OrderList />
    <!-- orderList end-->
  </div>
  <div class="side-bottom d-flex flex-column justify-content-center align-items-center">
    <!-- order bottom start -->
    <OrderBottom />
    <!-- order bottom end -->
  </div>
</aside><!-- end aside -->   