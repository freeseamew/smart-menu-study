<script>
  import { Route } from 'tinro/cmp/index.js';
  import Menu from './pages/menu.svelte';
  import Login from './pages/login.svelte';
  import Register from './pages/register.svelte';
  import Users from './pages/users.svelte';
</script>

<Route path="/"><Menu /></Route>
<Route path="/login"><Login /></Route>
<Route path="/register"><Register /></Route>
<Route path="/menu"><Menu /></Route>
<Route path="/users"><Users /></Route>