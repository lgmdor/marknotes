<script>
	import Select from './Select.svelte';
	import SelectItem from './SelectItem.svelte';
	import MultiselectItem from './MultiselectItem.svelte';
	import { setContext, createEventDispatcher, onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let items;
	export let itemKeyName;
	export let itemTextName;
	export let addItem;
	export let currSelected = [];

	const selectedItems = writable([]);

	const deselect = (item) => {
		selectedItems.update(($selectedItems) =>
			$selectedItems.filter((itemFilter) => itemFilter != item)
		);
	};

	setContext('lgmui_multiselect', {
		selectedItems,
		itemTextName,
		addItem: (item) => addItem(item),
		select: (item) => selectedItems.update(($items) => [...$items, item]),
		deselect
	});

	const clickOutside = (node) => {
		const handleClick = (e) => {
			if (!node.contains(e.target)) {
				node.dispatchEvent(new CustomEvent('outsideclick'));
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	};

	let isSelectVisible = false;

	const showSelect = () => (isSelectVisible = true);
	const hideSelect = () => (isSelectVisible = false);

	const dispatch = createEventDispatcher();

	$: $selectedItems, dispatch('selectionchange', { selectedItems: $selectedItems });

	onMount(() => {
		if (currSelected.length) {
			selectedItems.update((items) => [...currSelected]);
		}
	});
</script>

<div
	class="multiselect"
	on:click|stopPropagation={showSelect}
	aria-hidden="true"
	use:clickOutside
	on:outsideclick={hideSelect}
>
	{#if $items}
		<ul class="multiselect-items">
			{#each $selectedItems as selectedItem}
				<MultiselectItem text={selectedItem} />
			{/each}
		</ul>
		<div class="more">
			<span>2 more</span>
		</div>
		<div class="wrap">
			{#if isSelectVisible && $items}
				<Select>
					<ul>
						{#each $items as item (item[`${itemKeyName}`])}
							<SelectItem text={item[`${itemTextName}`]} />
						{/each}
					</ul>
				</Select>
			{/if}
		</div>
	{/if}
</div>

<style lang="sass">
  @use '../../vars'

.multiselect
  height: vars.$size-2
  width: vars.$size-24
  border-radius: vars.$misc-borderRadius
  border: vars.$misc-border-default
  background: vars.$color-dark-6
  position: relative
  .multiselect-items
    list-style: none
    display: flex
    align-items: center
    height: 100%
    padding: 0 12px
    cursor: pointer
  .more
    position: absolute
    margin-left: 12px
    right: 12px
    top: 0
    bottom: 0
    display: flex
    align-items: center
    justify-content: center
    font-size: 12px
    text-transform: uppercase
    color: vars.$color-text-3
    user-select: none
  .wrap
    width: 100%
    position: absolute
    bottom: calc(vars.$size-2 + 6px)
</style>
