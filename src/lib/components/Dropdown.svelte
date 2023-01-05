<script>
	let isNavVisible = false;

	export let menuItems = [{ name: 'Empty' }];

	let dropdownNav;

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
				console.log('destroy');
				document.removeEventListener('click', handleClick, true);
			}
		};
	};
</script>

<div class="dropdown">
	<button class="toggle" on:click|self={showNav}>...</button>
	{#if isNavVisible}
		<nav use:clickOutside on:outsideclick={hideNav}>
			<ul>
				{#each menuItems as menuItem}
					<li on:click={menuItem.onclick} aria-hidden="true" class:danger={menuItem.danger}>
						<span>{menuItem.name}</span>
					</li>
				{/each}
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
    ul
      list-style: none
      li
        display: flex
        align-items: center
        justify-content: flex-start
        height: vars.$size-2
        font-size: 14px
        border-radius: vars.$misc-borderRadius
        padding: 10px 12px
        transition: background 60ms linear
        &.danger
          color: vars.$color-red
          &:hover
            background: transparentize(vars.$color-red, 0.9)
        &:hover
          background: vars.$color-dark-5
        span

</style>
