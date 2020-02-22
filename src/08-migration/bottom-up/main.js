async function main() {
  const {greet} = await import('./greet.mjs')

  console.log(greet('world'))
}
main()
