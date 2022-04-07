export default function(context) {
  console.log('verified')
  if (process.client) {
    console.log("authorize user")
    context.store.dispatch('initiateValidation')
  }
}