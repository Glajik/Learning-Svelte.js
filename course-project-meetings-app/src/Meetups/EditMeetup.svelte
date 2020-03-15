<script>
  import { createEventDispatcher } from 'svelte';
  import TextInput from '../UI/TextInput.svelte';
  import Button from '../UI/Button.svelte';

  let title = '';
  let subtitle = '';
  let description = '';
  let imageUrl = '';
  let address = '';
  let contactEmail = '';

  const dispatch = createEventDispatcher();

  const submitForm = () => {
    dispatch('add-meetup', {
      title,
      subtitle,
      description,
      imageUrl,
      address,
      contactEmail,
    });
  }
</script>

<form on:submit|preventDefault={submitForm}>
  <TextInput
    label="Title"
    id="title"
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
  <Button type="submit" caption="Save"/>
</form>

<style>
  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>