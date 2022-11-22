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

  console.log(session);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  //   console.log(playlists);

  return (
    <div className="text-gray-400 p-5 border-r text-xs lg:text-sm overflow-y-scroll h-screen scroll-bar-hide border-gray-900 sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
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
        {playlists.map((playlist) => {
          return (
              <p
                key={playlist.id}
                className="cursor-pointer hover:text-white font-extralight"
                onClick={(e) => setPlaylistsId(playlist.id)}
              >
                {" "}
                {playlist.name}
              </p>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
