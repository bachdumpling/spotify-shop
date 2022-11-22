import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((error) => console.log("Something went wrong!", error));
  }, [spotifyApi, playlistId]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide pb-36 bg-black">
      {/* <div  className="flex-grow"> */}
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-[#1A1A1A] space-x-3 cursor-pointer rounded-full p-1 pr-2 text-white">
          <img className="rounded-full h-7 w-7" src={session?.user.image} />
          <h2 className="hidden md:flex font-semibold text-sm">{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-96 text-white p-8`}
      >
        <img
          className="h-40 w-40 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div className="space-y-2">
          <p>PLAYLIST</p>
          <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold">
            {playlist?.name}
          </h1>
          <p>{playlist?.description}</p>
        </div>
      </section>

      <div className="flex flex-col">
        <div>

        </div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
