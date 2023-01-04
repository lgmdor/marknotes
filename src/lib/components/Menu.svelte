<script>
	import Button from '$lib/components/Button.svelte';
	import { isEditorVisible } from './../../stores.js';

	const openEditor = (e) => {
		isEditorVisible.update((isEditorVisible) => true);
	};
</script>

<aside>
	<div class="new">
		<Button text="New Note" onclick={openEditor} variant={'filled'} />
	</div>
</aside>

<style lang="sass">
  @use '../../vars'

aside
  width: vars.$size-16
  border-right: vars.$misc-border-dark
  //flex: flex-grow
  .new
    height: vars.$size-4
    border-bottom: vars.$misc-border-dark
    display: flex
    justify-content: center
    align-items: center
</style>
