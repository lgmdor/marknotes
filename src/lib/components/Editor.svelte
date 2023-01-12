<script>
	import { Editor, rootCtx, defaultValueCtx, editorViewOptionsCtx } from '@milkdown/core';
	import { gfm } from '@milkdown/preset-gfm';
	import { nord } from '@milkdown/theme-nord';
	import { history } from '@milkdown/plugin-history';
	import { indent } from '@milkdown/plugin-indent';
	import { prism } from '@milkdown/plugin-prism';
	import { clipboard } from '@milkdown/plugin-clipboard';
	import { math } from '@milkdown/plugin-math';
	import { listener, listenerCtx } from '@milkdown/plugin-listener';
	import { onMount } from 'svelte';

	export let input;
	export let output = '';

	let wrapper;
	let editorCurr;

	$: output, makeEditor();

	const makeEditor = async () => {
		if (wrapper) {
			if (editorCurr) {
				await editorCurr.destroy();
			}
			editorCurr = await Editor.make()
				.config((ctx) => {
					if (output.length > 0) {
						ctx.set(defaultValueCtx, output);
						ctx.set(editorViewOptionsCtx, { editable: () => false });
					} else {
						ctx.set(defaultValueCtx, $input);
					}

					ctx.set(rootCtx, wrapper);
					ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
						input.update((input) => markdown);
					});
				})
				.use(nord)
				.use(gfm)
				.use(history)
				.use(indent)
				.use(prism)
				.use(clipboard)
				.use(math)
				.use(listener)
				.create();
		}
		console.log(editorCurr);
	};

	onMount(() => {
		makeEditor();
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-material-oceanic.min.css"
	/>
</svelte:head>

<div bind:this={wrapper} class:transparentBg={output.length > 0} />

<style lang="sass">
@use '../../vars'

div
	height: 100%
	:global(.milkdown)
		height: 100%
		box-shadow: none
		:global(.editor)
			height: 100%
			outline: none
			border: none
			padding: 0
			background: vars.$color-dark-7
		:global(.editor>:first-child), :global(.editor>:last-child)
			margin: 0
		:global(.editor .paragraph)
			margin: 0
	&.transparentBg 
		:global(.milkdown)
			background: transparent
		:global(.editor)
			background: transparent
</style>
