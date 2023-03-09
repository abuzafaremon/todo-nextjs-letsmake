import Link from 'next/link';
const NewsPage = ({ posts }) => {
  return (
    <div>
      <h2>This is NewsPage {posts?.length}</h2>
      <Link href="/">Home</Link>
      <div>
        {
          posts.map(post => <div key={post.id} style={{ border: "1px solid", margin: "5px", padding: "5px" }}>
            <h2>{post?.title}</h2>
            <Link href={`/posts/${post.id}`}>Details</Link>
          </div>
          )
        }
      </div>
    </div>
  )
}
export default NewsPage;

export const getServerSideProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return {
    props: {
      posts: data,
    }
  }
}