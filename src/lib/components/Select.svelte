<script>
	import { getContext } from 'svelte';

	const ctx = getContext('lgmui_multiselect');

	let input;

	const addItem = () => {
		if (isInputValid) {
			ctx.addItem(input);
			ctx.select(input);
			input = '';
		}
	};

	$: isInputValid = input?.length > 2;
</script>

<div class="select">
	<slot />
	{#if true}
		<div class="separator" />
	{/if}
	<div class="wrap">
		<input type="text" class="add-input" placeholder="New tag..." bind:value={input} />
		{#if isInputValid}
			<button class="add-btn" on:click={addItem}>Add</button>
		{/if}
	</div>
</div>

<style lang="sass">
  @use '../../vars'

.select
  background: vars.$color-dark-6
  min-width: vars.$size-12
  border-radius: vars.$misc-borderRadius
  border: vars.$misc-border-default
  user-select: none
  min-height: vars.$size-2
  padding: 4px
  .separator
    border-top: vars.$misc-border-default
    margin: 4px 0
  .wrap
    display: flex
    align-items: center
    justify-content: space-between
    position: relative
    .add-input
      height: vars.$size-2
      border-radius: vars.$misc-borderRadius
      background: transparent
      border: none
      outline: none
      width: 100%
      padding: 0 12px
      color: vars.$color-text-2
    .add-btn
      width: vars.$size-4
      border: none
      color: lighten(vars.$color-main, 30%)
      outline: none
      height: 24px
      border-radius: vars.$misc-borderRadius
      background: transparentize(vars.$color-main, 0.8)
      font-weight: bold
      font-size: 12px
      cursor: pointer
      transition: background 60ms linear
      &:hover
        background: transparentize(vars.$color-main, 0.7)
</style>
