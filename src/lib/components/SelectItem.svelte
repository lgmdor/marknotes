<script>
	// @ts-ignore
	import IconCheck from '$lib/assets/icon_check.svg?component';
	import { getContext } from 'svelte';

	export let text;

	const ctx = getContext('lgmui_multiselect');

	const selectedItems = ctx.selectedItems;

	$: isSelected = $selectedItems.some((item) => item === text);

	const toggleSelection = () => {
		if (isSelected) {
			ctx.deselect(text);
		} else {
			ctx.select(text);
		}
	};
</script>

<li class="select-item" on:click={toggleSelection} aria-hidden="true" class:isSelected>
	<span>{text}</span>
	{#if isSelected}
		<div class="wrap">
			<IconCheck />
		</div>
	{/if}
</li>

<style lang="sass">
  @use '../../vars'

.select-item
  width: 100%
  height: vars.$size-2
  display: flex
  align-items: center
  justify-content: space-between
  font-size: 14px
  border-radius: vars.$misc-borderRadius
  padding: 10px 12px
  transition: background 60ms linear
  cursor: pointer
  &:not(:first-child)
    margin-top: 6px
  &:hover
    background: vars.$color-dark-5
  &.isSelected
    color: vars.$color-main
    font-weight: bold
    &:hover
      background: transparentize(vars.$color-main, 0.9)
  :global(svg)
    height: 24px
    width: 24px
    stroke: vars.$color-main
</style>
