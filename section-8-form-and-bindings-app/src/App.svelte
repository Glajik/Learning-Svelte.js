<script>
  import CustomInput from './CustomInput.svelte';
  import Toggle from './Toggle.svelte';
  let val = 'Max';
  let selectedOption = 1;
  let summ = 0;
  let number = 0;
  let agreed = false;
  let favColor = 'green';
  let favMeal = [];
  let favCar;

  $: console.log(val);
  $: console.log(selectedOption);
  $: console.log(summ);
  $: summ += number;
  $: console.log(agreed);
  $: console.log(favColor);
  $: console.log(favMeal);
  $: console.log(favCar);
  
</script>

<input type="text" bind:value={val}>
<CustomInput bind:val={val} />
<Toggle bind:chosenOption={selectedOption}/>
<input type="number" bind:value={number}>

<label>
  <input type="checkbox" bind:checked={agreed}>
  Agree to terms?
</label>

<h1>Favorite Color?</h1>
<label>
  <input type="radio" name="color" value="red" bind:group={favColor}>
  Red
</label>
<label>
  <input type="radio" name="color" value="green" bind:group={favColor}>
  Green
</label>
<label>
  <input type="radio" name="color" value="orange" bind:group={favColor}>
  Orange
</label>

<h1>Favorite sweetness?</h1>
<label>
  <input type="checkbox" name="meal" value="chocolate" bind:group={favMeal}>
  Chocolate
</label>
<label>
  <input type="checkbox" name="meal" value="ice cream" bind:group={favMeal}>
  Ice cream
</label>
<label>
  <input type="checkbox" name="meal" value="eclair" bind:group={favMeal}>
  Eclair
</label>

<h1>Select car</h1>
<select bind:value={favCar}>
  <option value="aston-martin">
    Aston Martin
  </option>
  <option value="ferrari">
    Ferrari
  </option>
  <option value="porsche">
    Porsche
  </option>
</select>