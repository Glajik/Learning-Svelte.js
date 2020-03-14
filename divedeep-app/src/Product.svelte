<script>
  import { createEventDispatcher } from 'svelte';
  
  export let id;
  export let title;
  export let price;
  export let bestseller = false;

  const dispatch = createEventDispatcher();

  const addToCart = () => dispatch('add-to-cart');
  const deleteProduct = () => dispatch('delete', { id });
</script>

<article>
  <h1>{title}</h1>
  <h2>$ {price}</h2>
  {#if bestseller}
    <h3>BESTSELLER</h3>
  {/if}
  <button on:click={addToCart}>Add to Cart</button>
  <button on:click={deleteProduct}>Delete</button>
</article>