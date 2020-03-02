<script>
  import ContactCard from "./ContactCard.svelte";

  let name = "Max";
  let age = 30;
  let url = '';
  let title = '';
  let description = '';

  let defaults = undefined;

  // let uppercaseName; not required!

  $: uppercaseName = name.toUpperCase();

  $: console.log(name);

  $: if (name === "Maximilian") {
    console.log("It runs!");
    age = 31;
  }

  function incrementAge() {
    age += 1;
  }

  function changeName() {
    name = "Maximilian";
  }

  function nameInput(event) {
    const enteredValue = event.target.value;
    name = enteredValue;
  }
</script>

<h1>Hello {uppercaseName}, my age is {age}!</h1>
<button on:click={incrementAge}>Change Age</button>
<!-- <button on:click="{changeName}">Change Name</button> -->
<!-- <input type="text" value={name} on:input={nameInput} /> -->
<div>
  <span>Your name:</span>
  <input type="text" bind:value={name} />
</div>
<div>
  <span>Profile image url:</span>
  <input type="text" bind:value={url} />
</div>
<div>
  <span>Title:</span>
  <input type="text" bind:value={title} />
</div>
<div>
  <span>Description:</span>
  <textarea rows="3" bind:value={description} />
</div>

<ContactCard
  userName={name || defaults}
  profileImageUrl={url || defaults}
  jobTitle={title || defaults}
  description={description || defaults}
/>

<style>
  h1 {
    color: purple;
  }
</style>