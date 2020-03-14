<script>
	import Product from './Product.svelte';
	
	let products = [
		{
			id: "p1",
			title: "A book",
			price: 9.99,
		},
		{
			id: "p2",
			title: "A ball",
			price: 5.95,
			bestseller: true,
		}
	];

const addToCart = (e) => {
	alert('Added to cart!')
}

const deleteProduct = (e) => {
	alert(`Product ${e.detail.id} deleted!`);
}
</script>

{#each products as product}
	<Product
		{...product}
		on:add-to-cart={addToCart}
		on:delete={deleteProduct}
	/>
{/each}
