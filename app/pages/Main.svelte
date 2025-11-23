<script lang="ts">
  import { onMount } from "svelte";
  import * as nav from "../Nav";
  import Home from "./Home.svelte";
  import { Frame } from "@nativescript/core";
  import ListViewPage from "./ListViewPage.svelte";
  import Login from "./Login.svelte";

  let user: any = null;

  const storedUser: any = localStorage.getItem("user2");
  if (storedUser) {
    user = JSON.parse(storedUser);
  }

  function gotoPage(page: any) {
    drawer.closeDrawer();
    nav.goto(page, {});
  }

  let drawer: any;
  let current_page = nav.current_page;

  onMount(() => {
    if (user)
      nav.init(Frame.getFrameById("navframe") as any, drawer, ListViewPage);
  });
</script>

{#if user}
  <radSideDrawer bind:this={drawer}>
    <radSideDrawer.drawerContent>
      <gridLayout rows="auto, *">
        <label row="0" padding="10" class="h2" horizontalAlignment="left"
          >Examples</label
        >
        <label
          row="0"
          class="fas h2"
          text="&#xf00d;"
          padding="10"
          horizontalAlignment="right"
          on:tap={() => drawer.closeDrawer()}
        />
        <scrollView row="1">
          <stackLayout>
            <label
              text="List View"
              class:current={$current_page == ListViewPage}
              padding="10"
              on:tap={() => gotoPage(ListViewPage)}
            />
          </stackLayout>
        </scrollView>
      </gridLayout>
    </radSideDrawer.drawerContent>
    <radSideDrawer.mainContent>
      <frame id="navframe" defaultPage={ListViewPage}></frame>
    </radSideDrawer.mainContent>
  </radSideDrawer>
{:else}
  <frame> <Login /></frame>
{/if}

<style>
  .current {
    font-weight: bold;
  }
</style>
