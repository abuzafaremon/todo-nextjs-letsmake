import Link from 'next/link';
import { useRouter } from 'next/router';

const DetailsPage = ({ post }) => {
  return (
    <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Post {post.id} Details Page</h2>
      <p>{post.body}</p>
      <Link href='/posts'>Back</Link>
    </div>
  )
}
export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  const paths = posts?.map(post => {
    return {
      params: {
        postId: `${post.id}`
      }
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const { params } = context;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`);
  const data = await res.json();
  return {
    props: {
      post: data,
    }
  }
}

export default DetailsPage
