<script>
	import Button from '$lib/components/Button.svelte';
	import { isEditorVisible } from './../../stores.js';

	const openEditor = (e) => {
		isEditorVisible.update((isEditorVisible) => true);
	};
</script>

<aside>
	<div class="logo">
		<h1>Marknotes</h1>
	</div>
	<div class="new">
		<Button text="New Note" onclick={openEditor} variant={'filled'} fullWidth={true} />
	</div>
</aside>

<style lang="sass">
  @use '../../vars'

aside
  width: vars.$size-16
  //flex: flex-grow
  background: vars.$color-dark-8
  padding: 0 vars.$misc-padding-default
  .new, .logo
    height: vars.$size-4
    display: flex
    align-items: center
  .new
    justify-content: center
  .logo
    justify-content: flex-start
    border-bottom: 1px solid vars.$color-dark-5
    h1
      color: vars.$color-text-2
      font-family: "Roboto Slab"
      font-weight: 400
      user-select: none
</style>
