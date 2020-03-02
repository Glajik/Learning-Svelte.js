import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world',
		age: 45
	}
});

export default app;