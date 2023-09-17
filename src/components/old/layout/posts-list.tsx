import { PostOutput } from '@/@types/post'
import { Post } from '../../note'

const getPosts = async (): Promise<PostOutput[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const response = await fetch(`${apiUrl}/external/api/posts`, {
    cache: 'no-cache',
  })
  const posts = await response.json()

  return posts
}

export const PostsList = async () => {
  const posts = await getPosts()
  return (
    <>
      {posts.map((post) => (
        <Post
          id={post.id}
          key={post.id}
          name={post.author.name}
          avatar={post.author.avatar}
          time={post.createdAt}
          content={post.content}
          likes={post.likes}
          comments={post.comments}
          shares={post.shares}
          media={post.media}
        />
      ))}
    </>
  )
}
