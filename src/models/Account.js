export class Account {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.picture = data.picture;
    // TODO add additional properties if needed
    this.bio = data.bio
    this.coverImg = data.coverImg
    this.github = data.github
    this.linkedin = data.linkedin
    this.resume = data.resume
    this.class = data.class
    this.graduated = data.graduated
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}

// const data ={
//   "_id": "6303ba27fb047e3d0d698660",
//   "subs": [
//       "auth0|6303ba26837b0d2b62e68435"
//   ],
//   "email": "jerms@jerms.jerms",
//   "name": "Big Goose!",
//   "picture": "https://images.unsplash.com/photo-1451493683580-9ec8db457610?q=80&w=2269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "bio": "I am so good at eating bread",
//   "coverImg": "https://plus.unsplash.com/premium_photo-1661897340844-3920b9894070?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "github": "https://www.youtube.com/watch?v=B-yUKS3O66A",
//   "linkedin": "https://www.youtube.com/watch?v=SIaFtAKnqBU",
//   "resume": "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3ZyOW9nM2R4eHhrM2Q0ajQ3dTEwMHY5Y3JpY3cyZXA4YXJ5cDE2OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AwNGX4XvvODO8/giphy.webp",
//   "class": "Fall 2021 (best class)",
//   "graduated": false,
//   "createdAt": "2023-06-01T15:20:58.001Z",
//   "updatedAt": "2024-07-23T16:59:07.844Z",
//   "__v": 0,
//   "id": "6303ba27fb047e3d0d698660"
// }