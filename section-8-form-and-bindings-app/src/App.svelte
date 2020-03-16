<script>
  import CustomInput from './CustomInput.svelte';
  import Toggle from './Toggle.svelte';
  let val = 'Max';
  let selectedOption = 1;

  $: console.log(val);
  $: console.log(selectedOption);
</script>

<input type="text" bind:value={val}>
<CustomInput bind:val={val} />
<Toggle bind:chosenOption={selectedOption}/>