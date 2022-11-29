import React from "react";
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

function PlaylistScreen() {
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
    <>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-[26rem] text-white p-8`}
      >
        <img
          className="h-56 w-56 shadow-2xl"
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
        <div></div>
        <Songs />
      </div>
    </>
  );
}

export default PlaylistScreen;
