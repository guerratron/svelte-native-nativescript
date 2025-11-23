<script lang="ts">
  import { navigate } from "svelte-native";
  import localStorage from "@nativescript-use/nativescript-localstorage";
  import { onMount } from "svelte";
  import { demos } from "./install";
  import Login from "./Login.svelte";

  const goToDemo = (component: any) => {
    navigate({
      page: component,
      animated: true,
      transition: {
        name: "slideLeft",
        duration: 200,
        curve: "ease",
      },
    });
  };

  let user: any = null;

  const storedUser: any = localStorage.getItem("user");
  if (storedUser) {
    user = JSON.parse(storedUser);
  }

  onMount(() => {
    /*if (demoRedirect) {
            const Demo = demos.find(({ path }) => path === demoRedirect);
            if (Demo) {
                setTimeout(() => {
                    navigate({
                        //@ts-ignore
                        page: Demo.component,
                        animated: false
                    });
                }, 0);
            }
        }*/
  });
</script>

{#if user}
  <page>
    <actionBar title={"Svelte Demo"+user.name} />
    <scrollView>
      <stackLayout>
        {#each demos as demo}
          <button text={demo.name} on:tap={() => goToDemo(demo.component)} />
        {/each}
      </stackLayout>
    </scrollView>
  </page>
{:else}
  <Login />
{/if}
