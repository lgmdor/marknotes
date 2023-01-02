<slot />

<style lang="sass">
@use '../vars'

:global(*)
  margin: 0
  padding: 0
  box-sizing: border-box

:global(body)
  background: vars.$color-dark-7
  height: 100vh
  width: 100%
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
</style>
