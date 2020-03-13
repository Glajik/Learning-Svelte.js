<script>
  import Header from './UI/Header.svelte';
  import TextInput from './UI/TextInput.svelte';
  import Button from './UI/Button.svelte';
  import MeetupGrid from './Meetups/MeetupGrid.svelte';

  let title = '';
  let subtitle = '';
  let description = '';
  let imageUrl = '';
  let address = '';
  let contactEmail = '';
  
  let meetups = [
    {
      id: 'm1',
      title: 'Coding Bootcamp',
      subtitle: 'Learn to code in 2 hours',
      description: 'In this meetup, we will have some experts that teach you how to code!',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG',
      address: '27th Nerd Road, 32523 New York',
      contactEmail: 'code@test.com',
    },
    {
      id: 'm2',
      title: 'Swim Together',
      subtitle: 'Let\'s go for some swimming',
      description: 'We will simply swim some rounds!',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg',
      address: '27th Nerd Road, 32523 New York',
      contactEmail: 'swim@test.com',
    }
  ];

  const getId = () => 'm'.concat(Math.floor(Math.random() * 1000000));

  function addMeetup() {
    const newMeetup = {
      id: getId(), title, subtitle, description, imageUrl, address, contactEmail,
    };

    meetups = [newMeetup, ...meetups];
  }
</script>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
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

  <MeetupGrid {meetups} />
</main>

<style>
  main {
    margin-top: 4rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>