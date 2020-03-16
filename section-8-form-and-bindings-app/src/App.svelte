<script>
  import CustomInput from './CustomInput.svelte';
  import Toggle from './Toggle.svelte';
  let val = 'Max';
  let selectedOption = 1;
  let summ = 0;
  let number = 0;

  $: console.log(val);
  $: console.log(selectedOption);
  $: console.log(summ);
  $: summ += number;
</script>

<input type="text" bind:value={val}>
<CustomInput bind:val={val} />
<Toggle bind:chosenOption={selectedOption}/>
<input type="number" bind:value={number}>