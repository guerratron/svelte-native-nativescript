<script lang="ts">
  import { onMount } from "svelte";
  import Home from "./pages/Home.svelte";
  import Login from "./pages/Login.svelte";
  import Main from "./pages/Main.svelte";
  import localStorage from "@nativescript-use/nativescript-localstorage";
  import { Frame } from "@nativescript/core";
    import Menu from "./pages/Menu.svelte";

  let user: any = null;

  const frame = Frame.topmost();

  //onMount(() => {
    const storedUser: any = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
    /*frame.navigate({
      moduleName: user?"./pages/Home.svelte":"./pages/Login.svelte",
      clearHistory: true,
    });*/
  //});
</script>

<!--frame /-->
<frame>
  {#if user}
    <Menu />
  {:else}
    <Login />
  {/if}
</frame>
