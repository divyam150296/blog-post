<template>
  <div>
    <NuxtLink :to="postLink" :style="{backgroundImage: `url(${thumbnailLink})`}" class="post-preview">
      <article>
        <div class="post-thumbnail">
          <div class="post-content">
            <h1>{{ title }}</h1>
            <h1>Admin Status: {{ isAdmin }} </h1>
            <p>{{ previewText }}</p>
          </div>
        </div>
      </article>
    </NuxtLink>
    <!-- <NuxtLink :to="'/posts/' + 2" style="background-image: url(https://png.pngtree.com/background/20210709/original/pngtree-creative-simple-background-wall-picture-image_371930.jpg)" class="post-preview">
      <article>
        <div class="post-thumbnail">
          <div class="post-content">
            <h1>Post Title</h1>
            <p>Preview Text</p> 
          </div>
        </div>
      </article>
    </NuxtLink> -->
  </div>
</template>

<script>
export default {
  // id, title, thumbnail, title, previewText
  props: {
    id: {
      type: String, 
      required: true
    },
    title: {
      type: String,
      required: true
    },
    previewText: {
      type: String,
      required: true
    },
    thumbnailLink: {
      type: String,
      required: true
    },
    isAdmin: {
      type:Boolean,
      required: true
    }
  },
  computed: {
   postLink () {
     return this.isAdmin ? `/admin/${this.id}` :  `/posts/${this.id}`
   }
  }
}
</script>


<style scoped>
.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 90%;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.post-content {
  padding: 10px;
  text-align: center;
}

a:hover .post-content,
a:active .post-content {
  background-color: #ccc;
}
</style>