export default function(context) {
  // console.log('auth')
  console.log('auth')
  if (!context.store.getters.authenticatedStatus) {
    console.log('auth')
    context.redirect('/admin/auth')
  }
}