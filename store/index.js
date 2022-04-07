import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    getters: {
      loadedPosts: (state) => state.loadedPosts,
      token: (state) => state.token,
      authenticatedStatus: (state) => state.token != null
    },
    actions : {
      nuxtServerInit(vuexContext, context) {
        // return await new Promise ((resolve, reject) => {
           return context.app.$axios.get('https://blog-nuxtjs-be190-default-rtdb.firebaseio.com/posts.json')
           .then((response)=> {
             const postArray = []
             for(const key in response.data) {
               postArray.push({...response.data[key], id: key})
             }
             vuexContext.commit('SET_POSTS', postArray)
            //  resolve()
           })
           .catch((err)=> {
             context.error(err)
           })
        //  })
        // return new Promise ((resolve, reject) => {
        //   setTimeout(()=> {
        //     commit('SET_POSTS', [
        //       {
        //         id: '1',
        //         title: 'New Post',
        //         previewText: 'Preview Text',
        //         thumbnail: 'https://png.pngtree.com/background/20210709/original/pngtree-creative-simple-background-wall-picture-image_371930.jpg'
        //       },
        //       {
        //         id: '2',
        //         title: 'New Posts2',
        //         previewText: 'Preview Text2',
        //         thumbnail: 'https://png.pngtree.com/background/20210709/original/pngtree-creative-simple-background-wall-picture-image_371930.jpg'
        //       },
        //       {
        //         id: '3',
        //         title: 'New Post3',
        //         previewText: 'Preview Text3',
        //         thumbnail: 'https://png.pngtree.com/background/20210709/original/pngtree-creative-simple-background-wall-picture-image_371930.jpg'
        //       }
        //      ])
        //     resolve()
        //   }, 0)
        // })
      },
      setPosts(vuexContext, formdata) {
        vuexContext.commit('SET_POSTS', formdata)
      },
      async addPost(vuexContext, formdata) {
        console.log(formdata)
        console.log(vuexContext.rootState.token)
        return await this.$axios.$post(`https://blog-nuxtjs-be190-default-rtdb.firebaseio.com/posts.json?auth=${vuexContext.rootState.token}`, formdata)
        .then((data)=> {
          console.log(data, formdata)
          // const newData = { ...formdata, id: data.name }
          vuexContext.commit('ADD_POST', { ...formdata, id: data.name })
        })
        .catch((err)=> err)
      },
      editPost(vuexContext, formdata) {
        return this.$axios.$put(`https://blog-nuxtjs-be190-default-rtdb.firebaseio.com/posts/${formdata.id}.json?auth=${vuexContext.rootState.token}`, formdata)
        .then((data)=> {
          console.log(data)
          vuexContext.commit('EDIT_POST', data)
        })
        .catch((e) => console.log(e))
      },
      validateUser(vuexContext, formData) {
        console.log(vuexContext.rootState)
        //signin
        let authenticateUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.firebaseKey}`
        if (!formData.isLogin) {
        //signup
        authenticateUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.firebaseKey}`
        }
        return this.$axios.$post(authenticateUrl,
        {
          email: formData.email,
          password: formData.password,
          returnSecureToken: true
        })
        .then((data)=> {
          vuexContext.commit('SET_TOKEN', data.idToken)
          localStorage.setItem('token', data.idToken)
          localStorage.setItem('expirationTime', new Date().getTime + data.expiresIn * 1000)
          vuexContext.dispatch('setLogoutTimer', data.expiresIn * 1000)
        })
        .catch((err)=> console.log(err))
      },
      setLogoutTimer (vuexContext, duration) {
        console.log(duration)
        setTimeout(()=> {
          vuexContext.commit('SET_LOGOUT_TIMER')
        }, duration)
      },
      initiateValidation (vuexContext) {
        const token = localStorage.getItem('token')
        const expirationTime = localStorage.getItem('expirationTime')

        if ((new Date().getTime > +expirationTime) || !token) {
          return
        }
        vuexContext.dispatch('setLogoutTimer', +expirationTime - new Date().getTime)
        vuexContext.commit('SET_TOKEN', token)
      }
    },
    mutations: {
      SET_POSTS (state, data) {
        state.loadedPosts = data
      },
      ADD_POST (state, data) {
        console.log(data, 'Hello')
        state.loadedPosts.push(data)
      },
      EDIT_POST (state, data) {
        const position = state.loadedPosts.findIndex((post)=> post.id === data.id)
        if (position >= 0) {
          state.loadedPosts[position] = data
        }
      },
      SET_TOKEN (state, data) {
        console.log(data)
        state.token = data
      },
      SET_LOGOUT_TIMER (state) {
        console.log('clear it')
        state.token = null
      }
    }
  })
}

export default createStore