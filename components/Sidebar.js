import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  ShoppingBagIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistsId] = useRecoilState(playlistIdState);
  
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  //   console.log(playlists);

  return (
    <div className="text-gray-400 p-5 border-r text-xs lg:text-sm overflow-y-scroll h-screen scroll-bar-hide border-gray-900 sm:max-w-xs lg:max-w-sm w-92 hidden md:inline-flex mb-96 pb-96">
      <div className="space-y-4 mb-96 pb-96">
        <div className="space-y-5">
          <img
            className="w-32"
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          />

          {/* <HomeIcon Icon className="h-5 w-5" /> */}
          <button className="btn-sidebar pt-2">
            <HomeIcon Icon className="w-7" />
            <p>Home</p>
          </button>
          <button className="btn-sidebar">
            <SearchIcon className="w-7" />
            <p>Search</p>
          </button>
          <button className="btn-sidebar">
            <ShoppingBagIcon Icon className="w-7" />
            <p>Shop</p>
          </button>
        </div>

        {/* <button className="btn-sidebar">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button> */}

        {/* <hr className="border-t-[0.1px] border-gray-900" /> */}

        <button className="btn-sidebar pt-5">
          <PlusCircleIcon className="w-7" />
          <p>Create Playlist</p>
        </button>

        <button className="btn-sidebar">
          <HeartIcon Icon className="w-7" />
          <p>Liked Songs</p>
        </button>
        <button
          className="btn-sidebar"
          onClick={() => {
            signOut();
          }}
        >
          <p>Log Out</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlist */}
        {/* <div> */}

        {playlists.map((playlist) => {
          return (
            <p
            key={playlist.id}
            className="cursor-pointer hover:text-white text-sm font-extralight"
            onClick={(e) => setPlaylistsId(playlist.id)}
            >
                {" "}
                {playlist.name}
              </p>
          );
        })}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Sidebar;
