<script>
	// @ts-ignore
	import IconX from '$lib/assets/icon_x.svg?component';
	import { getContext } from 'svelte';

	export let text;

	const ctx = getContext('lgmui_multiselect');

	const deselect = () => {
		ctx.deselect(text);
	};
</script>

<li class="multiselect-item">
	<span>{text}</span>
	<div class="wrap" on:click={deselect} aria-hidden="true">
		<IconX />
	</div>
</li>

<style lang="sass">
  @use '../../vars'

.multiselect-item
  height: 22px
  background: vars.$color-dark-7
  font-size: 12px
  display: flex
  align-items: center
  justify-content: center
  font-weight: bold
  padding-left: 12px
  padding-right: 6px
  color: vars.$color-text-2
  border-radius: vars.$misc-borderRadius
  cursor: default
  .wrap
    cursor: pointer
    display: flex
    align-items: center
    justify-content: flex-end
  &:not(:last-child)
    margin-right: 12px
  :global(svg)
    height: 12px
    width: 12px
    stroke: vars.$color-text-1
    margin-left: 6px
</style>
