<script>
  import { createEventDispatcher } from 'svelte';
  import TextInput from '../UI/TextInput.svelte';
  import Button from '../UI/Button.svelte';
  import Modal from '../UI/Modal.svelte';
  import { isEmpty, isUrl, isEmail } from '../helpers/validation.js';

  let title = '';
  let titleValid = false;
  let subtitle = '';
  let subtitleValid = false;
  let description = '';
  let descriptionValid = false;
  let imageUrl = '';
  let imageUrlValid = false;
  let address = '';
  let addressValid = false;
  let contactEmail = '';
  let contactEmailValid = false;

  let formIsValid = false;

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = isUrl(imageUrl);
  $: addressValid = !isEmpty(address);
  $: contactEmailValid = isEmail(contactEmail);
  $: formIsValid = titleValid
    && subtitleValid
    && descriptionValid
    && imageUrlValid
    && addressValid
    && contactEmailValid;

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
      valid={subtitleValid}
      validityMessage="Please enter valid subtitle"
      value={subtitle}
      on:input={(e) => subtitle = e.target.value}
    />
    <TextInput
      label="Description"
      id="description"
      valid={descriptionValid}
      validityMessage="Please enter valid description"
      value={description}
      rows="3"
      on:input={(e) => description = e.target.value}
    />
    <TextInput
      label="Address"
      id="address"
      valid={addressValid}
      validityMessage="Please enter valid address"
      value={address}
      on:input={(e) => address = e.target.value}
    />
    <TextInput
      label="Image URL"
      id="imageUrl"
      valid={imageUrlValid}
      validityMessage="Please enter valid url"
      value={imageUrl}
      on:input={(e) => imageUrl = e.target.value}
    />
    <TextInput
      label="E-Mail"
      type="email"
      id="contactEmail"
      valid={contactEmailValid}
      validityMessage="Please enter valid email"
      value={contactEmail}
      on:input={(e) => contactEmail = e.target.value}
    />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={closeModal}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!formIsValid}>Save</Button>
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>