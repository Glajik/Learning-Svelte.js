<script>
  export let text = '';
  $: containsExclamations = /!/.test(text);
</script>

<h1 class:highlight={containsExclamations}>{text}</h1>

<style>
  .highlight {
    color: red;
  }
</style>