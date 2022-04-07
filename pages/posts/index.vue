<template>
  <div class="posts-page">
    <PostList :post-list="postData"/>
  </div>
</template>

<script>
import PostList from '~/components/Posts/PostList'

export default {
  components: {
    PostList
  },
  computed: {
    postData () {
      return this.$store.getters.loadedPosts
    }
  }
}
</script>


<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>