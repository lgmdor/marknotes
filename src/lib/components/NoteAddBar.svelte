<div class="bar">
	<input type="text" placeholder="Add note..." />
</div>

<style lang="sass">
@use './../../vars'

.bar
  height: vars.$size-2
  width: 50vw
  border: 2px solid vars.$color-dark-4
  border-radius: vars.$misc-borderRadius
  input
    height: 100%
    outline: none
    border: none
    width: 80%
    background: transparent
    color: vars.$color-text-2
    padding: 0 vars.$misc-padding
</style>
