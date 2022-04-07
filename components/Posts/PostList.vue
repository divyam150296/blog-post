<template>
  <div>
    <PostPreview
      v-for="post in postList"
      :key="post.id"
      class="featured-posts" 
      :id="post.id"
      :isAdmin="isAdmin"
      :title="post.title"
      :previewText="post.previewText"
      :thumbnailLink="post.thumbnailLink" />
  </div>
</template>

<script>
import PostPreview from '~/components/Posts/PostPreview'

export default {
  components: {
    // PostPreview,
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    postList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    'isAdmin' (value) {
    }
  }
}
</script>


<style scoped>

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  /* height: auto; */
}
</style>