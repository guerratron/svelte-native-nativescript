<script>
  import { toggleDrawer } from "./Nav.ts";
  import { isAndroid } from "@nativescript/core";
  export let title = "";
</script>

<actionBar {title}>
  {#if isAndroid}
    <navigationButton icon="font://\uf119;" on:tap={toggleDrawer} />
  {:else}
    <actionItem
      icon="font://\uf119;"
      ios.position="left"
      on:tap={toggleDrawer}
    />
  {/if}
  <slot></slot>
</actionBar>
