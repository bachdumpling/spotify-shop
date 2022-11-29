import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import PlaylistScreen from "./PlaylistScreen";

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [AllPlaylist, SetAllPlaylist] = useState("");
  console.log(spotifyApi.getAccessToken());

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/me/playlists?limit=20`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }, [session]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide pb-36 bg-black">
      {/* <div  className="flex-grow"> */}
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-[#1A1A1A] space-x-3 cursor-pointer rounded-full p-1 pr-2 text-white">
          <img className="rounded-full h-7 w-7" src={session?.user.image} />
          <h2 className="hidden md:flex font-semibold text-sm">
            {session?.user.name}
          </h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>


      <PlaylistScreen />
    </div>
  );
}

export default Center;
