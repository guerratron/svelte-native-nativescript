    <!--gridLayout>
        <label class="text-xl align-middle text-center text-gray-500" text="{message}" />
    </gridLayout-->
<!-- app/pages/Home.svelte -->
<page>
  <actionBar title="NativeFlix2" />
  <stackLayout height="100%">
    <!-- add itemTap 👇 -->
    <!--label class="text-xl align-middle text-center text-gray-500" text="{message}" /-->
    <listView
      height="100%"
      separatorColor="transparent"
      items="{flicks}"
      on:itemTap="{onFlickTap}"
    >
      <Template let:item>
        <gridLayout
          height="280"
          borderRadius="10"
          class="bg-secondary"
          rows="*, auto, auto"
          columns="*"
          margin="5 10"
          padding="0"
        >
          <image row="0" margin="0" stretch="aspectFill" src="{item.image}" />
          <label
            row="1"
            margin="10 10 0 10"
            fontWeight="700"
            class="text-primary"
            fontSize="18"
            text="{item.title}"
          />
          <label
            row="2"
            margin="0 10 10 10"
            class="text-secondary"
            fontSize="14"
            textWrap="true"
            text="{item.description}"
          />
        </gridLayout>
      </Template>
    </listView>
  </stackLayout>

  	<tabView>
				<tabViewItem title="To Do">
					
<gridLayout columns="*,120" rows="70,*">
		<!-- Configures the text field and ensures that pressing Return on the keyboard
				produces the same result as tapping the button. -->
		<textField col="0" row="0" bind:text="{textFieldValue}" hint="Type new task..." editable="true"
				on:returnPress="{onButtonTap}" />
		<button col="1" row="0" text="Add task" on:tap="{onButtonTap}" />

		<listView items="{todos}" on:itemTap="{onItemTap}" row="1" colSpan="2">
				<Template let:item>
						<label text="{item.name}" textWrap="true" />
				</Template>
		</listView>
</gridLayout>

				</tabViewItem>
				<tabViewItem title="Completed">
                    <listView items="{dones}" on:itemTap="{onDoneTap}">
                        <Template let:item>
                            <label text="{item.name}" textWrap="true" />
                        </Template>
                    </listView>
				</tabViewItem>
		</tabView>
</page>

<script>
  import { navigate } from 'svelte-native'
  import { Template } from 'svelte-native/components'
  import { FlickService } from '../services/FlickService'
  import Details from './../pages/Details.svelte'

  let flicks = FlickService.getInstance().getFlicks()

  let message = "message";

  function onFlickTap(event) {
    navigate({
      page: Details,
      props: { flickId: flicks[event.index].id }
    })
  }


  		let todos = []
		let textFieldValue = ""

async function onItemTap(args) {
		let result = await action("What do you want to do with this task?", "Cancel", [
				"Mark completed",
				"Delete forever"
		]);

		console.log(result); // Logs the selected option for debugging.
		let item = todos[args.index]
		switch (result) {
				case "Mark completed":
						dones = addToList(dones, item) // Places the tapped active task at the top of the completed tasks.
						todos = removeFromList(todos, item) // Removes the tapped active task.
						break;
				case "Delete forever":
						todos = removeFromList(todos, item) // Removes the tapped active task.
						break;
				case "Cancel" || undefined: // Dismisses the dialog
						break;
		}
	}

		function onButtonTap() {
			if (textFieldValue === "") return; // Prevents users from entering an empty string.
			console.log("New task added: " + textFieldValue + "."); // Logs the newly added task in the console for debugging.
			todos = [{ name: textFieldValue }, ...todos] // Adds tasks in the ToDo array. Newly added tasks are immediately shown on the screen.
			textFieldValue = ""; // Clears the text field so that users can start adding new tasks immediately.
		}

        	let dones=[] //completed items go here
		const removeFromList = (list, item) => list.filter(t => t !== item);
		const addToList = (list, item) => [item, ...list]

    async function onDoneTap(args) {
        let result = await action("What do you want to do with this task?", "Cancel", [
            "Mark To Do",
            "Delete forever"
        ]);
        console.log(result); // Logs the selected option for debugging.
        let item = dones[args.index]
        switch (result) {
            case "Mark To Do":
            todos = addToList(todos, item) 
            dones = removeFromList(dones, item) // Removes the tapped active task.
            break;
            case "Delete forever":
            dones = removeFromList(dones, item)
            break;
            case "Cancel" || undefined: // Dismisses the dialog
            break;
        }
    }
</script>