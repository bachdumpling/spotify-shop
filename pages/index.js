import { getProviders } from "next-auth/react";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <div className=""></div>
      <main className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Center */}
        <Center />
        
      </main>
      <div className="bottom-0 sticky">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
