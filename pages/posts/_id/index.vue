<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">Title of the post{{singlePostData.title}}</h1>
      <div class="post-details">
        <div class="post-detail">Last Updated on: {{ singlePostData.updatedDate | date}}</div>
        <div class="post-detail">Written by{{singlePostData.author}}</div>
      </div>
      <p class="post-content">{{singlePostData.content}}</p>
    </section>
    <section class="post-feedback">
      <p>{{  singlePostData.previewText}}</p>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  asyncData(context) {
    return axios.get('https://blog-nuxtjs-be190-default-rtdb.firebaseio.com/posts/' + context.route.params.id + '.json')
    .then((response)=> {
      return {
        singlePostData: response.data
      }
    })
    .catch((err)=> context.error(err))
  }
}
</script>


<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>