<script>
	let password;

	let passwords = [];

	let formState = { init: true };

	const validate = (value) => {
		if (formState.init) {
			return { error: true, message: '' };
		}
		if (!value) {
			return { error: true, message: 'Field is empty' };
		}

		if (value.trim().length < 5) {
			return { error: true, message: 'Too short' };
		}

		if (value.trim().length > 10) {
			return { error: true, message: 'Too long' };
		}

		return { error: false, message: 'OK' };
	}

	$: formState = validate(password);

	const genId = () => Math.floor(Math.random() * 1000000);

	const addPassword = () => {
		if (!formState.error) {
			passwords = [...passwords, { id: genId(), password }];
			password = '';
			formState = { init: true };
		}
	}

	const removePassword = (id) => {
		passwords = passwords.filter(item => item.id !== id);
	}

</script>

<div class="passwordForm">
	<h2>Password Form:</h2>
	<label for="pwd">Enter password:</label>
	<input id="pwd" type="password" class="password-input" bind:value={password}>
	<button class="password-button" on:click={addPassword}>Add password</button>
	{#if !formState.error}
		<p>You typed: {password}</p>
	{:else}
		<p>{formState.message}</p>
	{/if}
</div>


<h2>Password List:</h2>

<ul class="pwd-list">
	{#each passwords as item}
		<li on:click={() => removePassword(item.id)}>{item.password}</li>
	{:else}
		<p>List is empty</p>
	{/each}
</ul>

<style>
	.passwordForm {
		max-width: 400px;
		margin-top: 50px;
		padding-bottom: 50px;
	}

	.pwd-list li {
		cursor: pointer;
	}
</style>