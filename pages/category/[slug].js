import { useRouter } from 'next/router'

const Category = () => {
  const router = useRouter()
  const { slug } = router.query

  return <p>Category: {slug}</p>
}

export default Category