import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";

function Homepage() {
  const { data } = useSession();

  console.log(data)

  return (
    <div>home</div>
  )
}

export default Homepage;