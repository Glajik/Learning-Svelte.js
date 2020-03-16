<script>
  import { createEventDispatcher } from 'svelte';
  import TextInput from '../UI/TextInput.svelte';
  import Button from '../UI/Button.svelte';
  import Modal from '../UI/Modal.svelte';
  import { isEmpty } from '../helpers/validation.js';

  let title = '';
  let titleValid = false;
  let subtitle = '';
  let description = '';
  let imageUrl = '';
  let address = '';
  let contactEmail = '';

  $: titleValid = !isEmpty(title);

  const dispatch = createEventDispatcher();

  const submitForm = () => {
    dispatch('save', {
      title,
      subtitle,
      description,
      imageUrl,
      address,
      contactEmail,
    });
  }

  const closeModal = () => dispatch('cancel');
</script>

<Modal title="Edit Meetup Data" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      label="Title"
      id="title"
      valid={titleValid}
      validityMessage="Please enter something"
      value={title}
      on:input={(e) => title = e.target.value}
    />
    <TextInput
      label="Subtitle"
      id="subtitle"
      value={subtitle}
      on:input={(e) => subtitle = e.target.value}
    />
    <TextInput
      label="Description"
      id="description"
      value={description}
      rows="3"
      on:input={(e) => description = e.target.value}
    />
    <TextInput
      label="Address"
      id="address"
      value={address}
      on:input={(e) => address = e.target.value}
    />
    <TextInput
      label="Image URL"
      id="imageUrl"
      value={imageUrl}
      on:input={(e) => imageUrl = e.target.value}
    />
    <TextInput
      label="E-Mail"
      type="email"
      id="contactEmail"
      value={contactEmail}
      on:input={(e) => contactEmail = e.target.value}
    />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={closeModal}>Cancel</Button>
    <Button type="button" on:click={submitForm}>Save</Button>
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>