<script>
  import { onDestroy } from 'svelte';
  import CartItem from "./CartItem.svelte";
  import cartItems from "./cartStore.js"
  import timer from "../UI/timerStore.js";

  const unsubscribe = timer.subscribe(
    count => console.log("Cart %s", count)
  )
  // let items;

  // const unsubscribe = cartStore.subscribe(
  //   data => items = data
  // );

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

</script>

<style>
  section {
    width: 30rem;
    max-width: 90%;
    margin: 2rem auto;
    border-bottom: 2px solid #ccc;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

<section>
  <h1>Cart</h1>
  <ul>
    {#each $cartItems as item (item.id)}
      <CartItem id={item.id} title={item.title} price={item.price} />
    {:else}
      <p>No items in cart yet!</p>
    {/each}
  </ul>
</section>
