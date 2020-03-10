<script>
  import ContactCard from "./ContactCard.svelte";

  let name = "Max";
  let image = '';
  let title = '';
  let description = '';

  let formState = 'empty';

  const isEmpty = value => value ? value.trim().length === 0 : true;

  const isValid = (...args) => !args.map(isEmpty).includes(true);
  
  $: formState = isValid(name, image, title, description) ? 'valid' : 'invalid';

  const addContact = () => {
    if (formState === 'valid') {
      formState = 'done';
    }
  }

</script>

<div id="form">
  <div class="form-control">
    <label for="userName">User Name</label>
    <input type="text" bind:value={name} id="userName" />
  </div>
  <div class="form-control">
    <label for="jobTitle">Job Title</label>
    <input type="text" bind:value={title} id="jobTitle" />
  </div>
  <div class="form-control">
    <label for="image">Image URL</label>
    <input type="text" bind:value={image} id="image" />
  </div>
  <div class="form-control">
    <label for="desc">Description</label>
    <textarea rows="3" bind:value={description} id="desc" />
  </div>
</div>

<button on:click={addContact}>Add contact card</button>

{#if formState === 'done'}
  <ContactCard userName={name} jobTitle={title} {description} userImage={image} />
{/if}
{#if formState === 'invalid'}
  <p>Invalid input.</p>
{/if}

<style>
  #form {
    width: 30rem;
    max-width: 100%;
  }
</style>