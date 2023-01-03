<slot />

<style lang="sass">
@use '../vars'

:global(*)
  margin: 0
  padding: 0
  box-sizing: border-box

:global(body)
  padding: vars.$size-2 0
  background: vars.$color-dark-7
  min-height: 100vh
  width: 100%
  display: flex
  justify-content: flex-start
  align-items: center
  flex-direction: column
  font-family: "Roboto"
</style>
