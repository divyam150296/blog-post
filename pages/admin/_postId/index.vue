<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="postData" @submitData="submitData"/>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import AdminPostForm from '~/components/Admin/AdminPostForm'

export default {
  
  layout: 'admin',
  middleware: [ 'verify-user', 'auth' ],
  components: {
    AdminPostForm
  },
  asyncData(context) {
    return axios.get('https://blog-nuxtjs-be190-default-rtdb.firebaseio.com/posts/' + context.route.params.postId + '.json')
    .then((response)=> {
      return {
        postData: response.data,
        id: context.route.params.postId
      }
    })
    .catch((err)=> context.error(err)) 
  },
  methods: {
    submitData (value) {
      const newValue = value.id || this.$route.params.postId
      this.$store.dispatch('editPost', {...value, id: newValue} )
      .then((response)=> {
        this.$router.push('/admin')
      })
      .catch((e) => console.log(e))
    }
  }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
