<script>
  export let controlType = null;
  export let id;
  export let label;
  export let value;
  export let valid = true;
  export let validityMessage = '';
  export let rows = null;
  export let type = "text";
</script>

<div class="form-control">
  <label for="{id}">{label}</label>
  {#if controlType === 'textarea'}
    <textarea class:invalid={!valid} {id} {rows} {value} on:input />
  {:else}
    <input class:invalid={!valid} type="{type}" {id} {value} on:input />
  {/if}
  {#if validityMessage && !valid}
    <p class="error-message">{validityMessage}</p>
  {/if}
</div>

<style>
  .form-control {
    padding: 0.5rem 0;
    width: 100%;
    margin: 0.25rem 0;
  }
  
  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: white;
    padding: 0.15rem 0.25rem;
    transition: border-color 0.1s ease-out;
  }

  input:focus,
  textarea:focus {
    border-color: #e40763;
    outline: none;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .invalid {
    border-color: red;
    background: rgb(255, 194, 194);
  }

  .error-message {
    color: red;
    margin: 0.25rem 0;
  }
</style>