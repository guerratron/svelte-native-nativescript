<script lang="ts">
  import { Frame, topmost,getFrameById } from '@nativescript/core';
  import localStorage from '@nativescript-use/nativescript-localstorage';
/*
    import Home from './pages/Home.svelte'
    import Login from './pages/Login.svelte'

    $: if (localStorage.has('user')) {
        navigate({ page: Home, clearHistory: true });
    } else {
        //navigate({ moduleName: "pages/Login", clearHistory: true });
        navigate({ page: Login, clearHistory: true });
    }
*/
  // Check if user is logged in based on localStorage
  /*if (localStorage.has('user')) {
    topmost().navigate({
      moduleName: './pages/Home',
      clearHistory: true
    });
  } else {
    getFrameById('rootFrame').navigate({
      moduleName: './pages/Login',
      clearHistory: true
    });
  }*/
   $: if ($session) {
    navigateTo({ moduleName: "pages/Home", clearHistory: true });
  } else {
    navigateTo({ moduleName: "pages/Login", clearHistory: true });
  }
</script>

<Frame/>
<!--Page>
  <Frame id="rootFrame" />
</Page-->
