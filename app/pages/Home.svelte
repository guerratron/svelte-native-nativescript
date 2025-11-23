<script lang="ts">
  import { navigate } from "svelte-native";
  import Login from "./Login.svelte";
  import localStorage from "@nativescript-use/nativescript-localstorage";

  let user = JSON.parse(localStorage.getItem("user"));

  function logout() {
    localStorage.removeItem("user");
    navigate({ page: Login });
  }
  let message: string = "Blank Svelte Native App";
</script>

<page>
  <actionBar title="Home" />
  <gridLayout rows="60,*" columns="*">
    <button text="Logout" on:tap={logout} column="0" row="0" />
    <label
      class="info"
      column="0"
      row="1"
      textWrap="true"
      textAlignment="center"
    >
      <formattedString>
        <span class="fas" text="&#xf135;" />
        <span text=" {message} Welcome {user.name}!" />
      </formattedString>
    </label>
  </gridLayout>
</page>

<style>
  .info .fas {
    color: #3a53ff;
  }

  .info {
    font-size: 20;
    horizontal-align: center;
    vertical-align: center;
  }
</style>
