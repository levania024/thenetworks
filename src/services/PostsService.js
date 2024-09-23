import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "@/models/Post.js"
import { AppState } from "@/AppState.js"

class PostsService{
    async changeProfilePage(PageNum, postPageNum) {
        const response = await api.get(`/api/posts=${postPageNum}&page=${PageNum}`)
        logger.log(response.data);
        this.handleResponseData(response.data)
    }

   async changePostPage(pageNumber) {
        const response = await api.get(`/api/posts?page=${pageNumber}`)
        logger.log(response.data);
        this.handleResponseData(response.data)
    }

    async deletePost(postId) {
        const response = await api.delete(`api/posts/${postId}`)
        logger.log(response.data)
        const postIndex = AppState.posts.findIndex(post => post.id == postId)
        AppState.posts.splice(postIndex, 1)
    }
   
    async createPost(formDate) {
        const response = await api.post('/api/posts', formDate)
        logger.log('created a post', response.data)
        const newPost = new Post(response.data)
        AppState.posts.push(newPost)
    }
    
    async changePageNum(PageNum,postPageNum) {
        const response = await api.get(`/api/posts?page=${PageNum}&query=${postPageNum}`);
        logger.log('load pages', response.data);
        
        this.handleResponseData(response.data);
    }
    
    async getPost() {
        const response = await api.get('/api/posts')
        logger.log(response.data)
        
        this.handleResponseData(response.data)
    }
    
    async searchPosts(query) {
        const response = await api.get(`/api/posts?query=${query}`);
        logger.log('load queried post',response.data)
        this.handleResponseData(response.data)
    }

    async toggleLike(postId) {
        const response = await api.post(`/api/posts/${postId}/like`);
        logger.log('Toggled like for post', response.data);
        const newPost = new Post(response.data)
        AppState.posts.push(newPost)
    }
    
    async getPostsByCreatorId(profileId) {
        AppState.posts = [];
        const response = await api.get(`/api/profiles/${profileId}/posts`);
        const newPosts = response.data.posts.map(postPOJO => new Post(postPOJO));
        AppState.posts = newPosts;
    }
    
    handleResponseData(responseData){
        const newPost = responseData.posts.map(postPOJO => new Post(postPOJO))
        AppState.posts = newPost
        AppState.currentPage = responseData.page
        AppState.totalPages = responseData.totalPages
    }
    
    clearPost() {
        AppState.posts = []
        AppState.currentPage = 0
        AppState.totalPages = 0
    }

    clearProfile() {
        AppState.postPageNum = ''
    }
}
export const postsService = new PostsService()