/* eslint-disable react-refresh/only-export-components */
import { withAuth } from "@/hooks/withAuth"

const Home = () => {
  return <h1>Home</h1>
}

export default withAuth(Home)