<script>
  import CustomInput from './CustomInput.svelte';
  import Toggle from './Toggle.svelte';
  import { isValidEmail } from './validation';

  let val = 'Max';
  let selectedOption = 1;
  let summ = 0;
  let number = 0;
  let agreed = false;
  let favColor = 'green';
  let favMeal = [];
  let favCar;
  let usernameInput;
  let customInput;
  let email = '';
  let formIsValid = false;

  $: console.log(val);
  $: console.log(selectedOption);
  $: console.log(summ);
  $: summ += number;
  $: console.log(agreed);
  $: console.log(favColor);
  $: console.log(favMeal);
  $: console.log(favCar);
  
  const show = (event) => {
    // console.log(document.querySelector('#username').value);
    console.dir(usernameInput);
    console.dir(customInput);
  }

  const clearCustomInput = () => customInput.empty();

  $: formIsValid = isValidEmail(email);
</script>

<input type="text" bind:value={val}>
<CustomInput bind:val={val} bind:this={customInput}/>
<button on:click={clearCustomInput}>Clear Inputs</button>
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

<hr>

<input type="text" bind:this={usernameInput}>
<button on:click={show}>Show References</button>

<hr>

<form on:submit|preventDefault>
  <input type="email" bind:value={email} class={isValidEmail(email) ? '' : 'invalid'}/>
  <button type="submit" disabled={!formIsValid}>Submit</button>
</form>

<style>
  .invalid {
    border: 1px solid red;
  }
</style>