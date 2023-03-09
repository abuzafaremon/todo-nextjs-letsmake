import Link from "next/link"

const HomePage = () => {
  return (
    <div>
      <h2>HomePage</h2>
      <Link href='/posts'>Posts</Link>
    </div>
  )
}

export default HomePage