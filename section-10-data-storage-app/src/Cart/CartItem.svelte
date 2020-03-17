
<script>
  import { onDestroy } from 'svelte';
  import cartItems from './cartStore.js';
  import products from '../Products/productStore.js';
  import Button from "../UI/Button.svelte";

  export let title;
  export let price;
  export let id;

  let showDescription = false;
  let description = 'Not available';
  let fetchedProducts = [];

  const unsubscribe = products.subscribe(
    items => fetchedProducts = items
  );

  onDestroy(
    () => typeof(unsubscribe) === 'function' && unsubscribe()
  );

  function displayDescription() {
    showDescription = !showDescription;
    const product = fetchedProducts.find(p => p.id === id);
    if (product && product.description) {
      description = product.description;
    }
  }

  function removeFromCart() {
    cartItems.update(
      items => items.filter(item => item.id !== id)
    );
  }
</script>

<style>
  li {
    margin: 1rem 0;
    border-radius: 5px;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
  }

  h1,
  h2 {
    font-size: 1rem;
    margin: 0;
  }

  h2 {
    color: #494949;
    margin-bottom: 1rem;
  }
</style>

<li>
  <h1>{title}</h1>
  <h2>{price}</h2>
  <Button mode="outline" on:click={displayDescription}>
    {showDescription ? 'Hide Description' : 'Show Description'}
  </Button>
  <Button on:click={removeFromCart}>Remove from Cart</Button>
  {#if showDescription}
    <p>{description}</p>
  {/if}
</li>
