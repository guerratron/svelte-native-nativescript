<script lang="typescript">
  import { Drawer } from "@nativescript-community/ui-drawer";
  import { navigate } from "svelte-native";
  import Login from "./Login.svelte";
  import localStorage from "@nativescript-use/nativescript-localstorage";

  let user = JSON.parse(localStorage.getItem("user"));

  let drawer: Drawer;

  const onOpenDrawer = () => {
    drawer.open();
  }

  const onCloseDrawer = () => {
    drawer.close();
  }

  const logoutOnTap = () => {
    localStorage.removeItem("user");
    navigate({ page: Login });
  }

</script>

<page>
  <actionBar title="Basic Drawer" />
  <drawer bind:this={drawer} class="drawer">
    <gridlayout
      prop:leftDrawer
      width="300"
      backgroundColor="white"
      rows="auto, *"
    >
      <stacklayout row="0">
        <stacklayout backgroundColor="#eeeeee" padding="25">
          <gridlayout columns="80, *" height="100">
            <stacklayout col="0" class="avatar">
              <label text="JS" />
            </stacklayout>
          </gridlayout>
          <stacklayout>
            <label text={user.fullName} fontWeight="bold" />
            <label text={user.email} />
          </stacklayout>
        </stacklayout>
        <stacklayout>
          <button text="My Profile" class="button" on:tap={onCloseDrawer} />
          <button text="Settings" class="button" on:tap={onCloseDrawer} />
          <button text="Rate Us" class="button" on:tap={onCloseDrawer} />
          <button text="Support" class="button" on:tap={onCloseDrawer} />
          <button text="Contact" class="button" on:tap={onCloseDrawer} />
          <button text="Logout" class="button" on:tap={logoutOnTap} />
        </stacklayout>
      </stacklayout>
    </gridlayout>

    <stacklayout prop:mainContent backgroundColor="white">
      <button
        on:tap={onOpenDrawer}
        text="Open Drawer"
        width="250"
        marginTop="25"
      />
    </stacklayout>
  </drawer>
</page>

<style>
  ActionBar {
    background-color: #b52e31;
    color: white;
  }
  .avatar {
    background-color: #b52e31;
    border-radius: 40;
    height: 80;
    vertical-align: middle;
  }
  .avatar Label {
    vertical-align: middle;
    horizontal-align: center;
    font-size: 30;
    color: white;
  }
  .drawer .button {
    background-color: transparent;
    margin: 0;
    padding: 0;
    border-color: #ccc;
    z-index: 0;
    border-width: 0 0 0.5 0;
    color: #222222;
    text-align: left;
    padding-left: 25;
    height: 50;
    font-size: 14;
  }
  .drawer .button:highlighted {
    background-color: #eeeeee;
    color: #222222;
  }
  Button {
    background-color: #b52e31;
    color: white;
  }
</style>
