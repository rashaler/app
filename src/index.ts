// RESTFUL API package
import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Bun Dev, I am going to build RESTFUL APIs")
.state({
  id: 1,
  email: 'jane@gmail.com'
})
.decorate('getDate', () => Date.now())
.get('/post/:id', ({params: {id}}) => {return {id: id, title: 'Learn Bun'}})
.post('/post', ({body,set,store}) => {
  console.log(store)
  set.status = 201
  return body
})
.get('/track/*', () => {return 'Track Route'})
.get('/tracks', ({store, getDate}) => {
  console.log(store)
  console.log(getDate())
  return new Response(JSON.stringify({
    "tracks": [
      'Amazing Grace',
      'Without Him',
      'Where He Leads'
    ]
  }), {
    headers:{
      'Content-Type': 'application/json'
    }
  })
})
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
