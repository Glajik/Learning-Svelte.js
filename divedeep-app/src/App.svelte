<script>
	import Product from './Product.svelte';
	import Modal from './Modal.svelte';
	
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

	let modalVisible = false;
	let modalCloseable = false; 

	const addToCart = (e) => {
		alert('Added to cart!')
	}

	const deleteProduct = (e) => {
		alert(`Product ${e.detail.id} deleted!`);
	}

	const showModal = () => modalVisible = true;
	const hideModal = () => modalVisible = false;
</script>

{#each products as product}
	<Product
		{...product}
		on:add-to-cart={addToCart}
		on:delete={deleteProduct}
	/>
{/each}

<button on:click={showModal}>Show modal</button>

{#if modalVisible}
	<Modal on:close={hideModal} on:cancel={hideModal} let:didAgree={modalCloseable}>
		<p>This works!</p>
		<h1 slot="header">Hello!</h1>
		<button slot="footer" on:click={hideModal} disabled={!modalCloseable}>Confirm</button>
	</Modal>
{/if}