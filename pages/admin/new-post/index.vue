<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm :post="postData" @submitData="submitData"/>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import AdminPostForm from '~/components/Admin/AdminPostForm'

export default {

  layout: 'admin',
  middleware: [ 'verify-user', 'auth'],
  components: {
   AdminPostForm
  },
  data() {
    return {
      postData: {
        author: '',
        title: '',
        thumbnailLink: '',
        content: ''
      }
    }
  },
  methods: {
    async submitData (value) {
      await this.$store.dispatch('addPost', {...value, updatedDate: new Date()})
      .then(() => {
        this.$router.push('/admin')
      })
      .catch((err)=> console.log(err))
    },
  }
}
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>