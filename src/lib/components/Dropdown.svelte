<script>
	// @ts-ignore
	import IconDots from '$lib/assets/icon_dots.svg?component';

	let isNavVisible = false;

	const showNav = () => (isNavVisible = true);
	const hideNav = () => (isNavVisible = false);

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
</script>

<div class="dropdown">
	<button class="toggle" on:click={showNav}>
		<IconDots />
	</button>
	{#if isNavVisible}
		<nav use:clickOutside on:outsideclick={hideNav}>
			<ul>
				<slot />
			</ul>
		</nav>
	{/if}
</div>

<style lang="sass">
  @use './../../vars'

.dropdown
  position: relative
  user-select: none
  .toggle
    cursor: pointer
    height: vars.$misc-padding-big
    width: vars.$misc-padding-big
    background: transparent
    border: none
    outline: none
    color: vars.$color-text-2
    border-radius: vars.$misc-borderRadius
    font-weight: bold
    transition: background 60ms linear
    &:hover
      background: vars.$color-dark-6
    :global(svg)
      stroke: vars.$color-text-2
      height: 18px
      width: 18px
  nav
    cursor: pointer
    background: vars.$color-dark-6
    min-width: vars.$size-8
    min-height: vars.$size-2
    position: absolute
    right: 0
    top: calc(vars.$misc-padding-big + vars.$misc-padding-small)
    border-radius: vars.$misc-borderRadius
    border: vars.$misc-border-default
    padding: 4px
    box-shadow: vars.$misc-boxShadow
    z-index: 1
</style>
