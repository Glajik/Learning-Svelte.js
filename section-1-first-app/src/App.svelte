<script>
  import ContactCard from "./ContactCard.svelte";

  let userName = '';
  let userImage = '';
  let jobTitle = '';
  let description = '';

  let formState = 'empty';

  let contacts = [];
  
  const isEmpty = value => value ? value.trim().length === 0 : true;

  const isValid = (...args) => !args.map(isEmpty).includes(true);

  const addContact = () => {
    if (isValid(userName, userImage, jobTitle, description)) {

      // Add new contact to contacts
      contacts = [
        ...contacts,
        { id: Math.random(), userName, jobTitle, userImage, description }
      ];

      formState = 'empty';
      userName = '';
      userImage = '';
      jobTitle = '';
      description = '';
      return
    }
    formState = 'invalid';
  }
</script>

<form id="form">
  <div class="form-control">
    <label for="userName">User Name</label>
    <input type="text" bind:value={userName} id="userName" />
  </div>
  <div class="form-control">
    <label for="jobTitle">Job Title</label>
    <input type="text" bind:value={jobTitle} id="jobTitle" />
  </div>
  <div class="form-control">
    <label for="userImage">Image URL</label>
    <input type="text" bind:value={userImage} id="userImage" />
  </div>
  <div class="form-control">
    <label for="desc">Description</label>
    <textarea rows="3" bind:value={description} id="description" />
  </div>
  <button type="submit" on:click|preventDefault={addContact}>Add contact card</button>
</form>

<button on:click={() => contacts = contacts.slice(1)}>Delete First</button>
<button on:click={() => contacts = contacts.slice(0, -1)}>Delete Last</button>

  {#if formState === 'invalid'}
    <p>Invalid input.</p>
  {:else}
    <p>Please enter some data and hit the button!</p>
  {/if}

{#each contacts as contact, index (contact.id)}
  <h2># {index + 1}</h2>
  <ContactCard
    userName={contact.userName}
    jobTitle={contact.jobTitle}
    description={contact.description}
    userImage={contact.userImage} />
{:else}
  <p>No any contact found.</p>
{/each}

<style>
  #form {
    width: 30rem;
    max-width: 100%;
    margin: 1rem 0;
  }
</style>