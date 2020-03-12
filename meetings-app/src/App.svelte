<script>
  import Header from './UI/Header.svelte';
  import MeetupItem from './Meetups/MeetupItem.svelte';
  
  const meetups = [
    {
      id: 'm1',
      title: 'Coding Bootcamp',
      subtitle: 'Learn to code in 2 hours',
      desctiption: 'In this meetup, we will some experts that teach you',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a',
      address: '27th Nerd Road, 123123 New Your',
      contactEmail: 'code@test.com',
    },
    {
      id: 'm2',
      title: 'Swim Together',
      subtitle: 'Learn to code in 2 hours',
      desctiption: 'In this meetup, we will some experts that teach you',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a',
      address: '27th Nerd Road, 123123 New Your',
      contactEmail: 'code@test.com',
    },
  ]
</script>

<Header />

{#each meetups as meetup}
  <MeetupItem />
{/each}