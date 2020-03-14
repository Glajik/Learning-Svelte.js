<script>
	import { tick } from 'svelte';
	import Product from './Product.svelte';
	import Modal from './Modal.svelte';

	let text = 'This is some dummy text';
	
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

	const transform = (e) => {
		if (e.which !== 9)  { // Ignore, if not TAB pressed
			return;
		}
		e.preventDefault();

		const { value, selectionStart, selectionEnd } = e.target;

		console.log('selectionStart: %s, selectionEnd: %s', selectionStart, selectionEnd);

		const before = value.slice(0, selectionStart);
		const selected = value.slice(selectionStart, selectionEnd);
		const after = value.slice(selectionEnd);
		
		const transformed = selected.toUpperCase();

		text = before.concat(transformed).concat(after);

		// Restore selection
		tick().then(() => {
			e.target.selectionStart = selectionStart;
			e.target.selectionEnd = selectionEnd;
		});
	}
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

<textarea rows="5" value={text} on:keydown={transform}/>