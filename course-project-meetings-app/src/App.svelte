<script>
  import Header from './UI/Header.svelte';
  import TextInput from './UI/TextInput.svelte';
  import Button from './UI/Button.svelte';
  import MeetupGrid from './Meetups/MeetupGrid.svelte';
  import EditMeetup from './Meetups/EditMeetup.svelte';
  
  let meetups = [
    {
      id: 'm1',
      title: 'Coding Bootcamp',
      subtitle: 'Learn to code in 2 hours',
      description: 'In this meetup, we will have some experts that teach you how to code!',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG',
      address: '27th Nerd Road, 32523 New York',
      contactEmail: 'code@test.com',
      isFavorite: false,
    },
    {
      id: 'm2',
      title: 'Swim Together',
      subtitle: 'Let\'s go for some swimming',
      description: 'We will simply swim some rounds!',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg',
      address: '27th Nerd Road, 32523 New York',
      contactEmail: 'swim@test.com',
      isFavorite: false,
    }
  ];

  let editMode;

  const getId = () => 'm'.concat(Math.floor(Math.random() * 1000000));

  function addMeetup(event) {
    const newMeetup = {
      id: getId(), ...event.detail,
    };

    meetups = [newMeetup, ...meetups];

    editMode = null;
  }

  function toggleFavorite(event) {
    meetups = meetups.map((meetup) => {
      if (meetup.id !== event.detail.id) {
        return meetup;
      }
      return { ...meetup, isFavorite: !meetup.isFavorite }
    });
  }
</script>

<Header />

<main>
  <div class="meetup-controls"></div>
  <Button on:click={() => editMode = 'add'}>New Meetup</Button>
  {#if editMode === 'add'}
    <EditMeetup on:save={addMeetup}/>
  {/if}
  <MeetupGrid {meetups} on:toggle-favorite={toggleFavorite}/>
</main>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
</style>