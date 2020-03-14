<script>
  import Title from './Title.svelte';
  let goal = '';
</script>

<span>Enter your course goal here:</span>
<input bind:value={goal}>
<Title text={goal} />