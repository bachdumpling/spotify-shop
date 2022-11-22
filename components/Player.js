import { VolumeUpIcon } from "@heroicons/react/outline";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
} from "@heroicons/react/solid";
import { RewindIcon, SwitchHorizontalIcon } from "@heroicons/react/solid";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("Now Playing: ", data.body?.item);
        setCurrentIdTrack(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  function handlePlayPause() {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdState, spotifyApi, session]);

  const debounceAdjustVolume = useCallback(() => {
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 100),
      [];
  });

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume]);

  return (
    <div className="h-24 bg-[#1A1A1A] text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8 border-t-2 border-[#1A1A1A]">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-14"
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
        <div>
          <h3 className="text-sm">{songInfo?.name}</h3>
          <p className="text-xs text-gray-400">{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="h-5 w-5 cursor-pointer text-gray-500 hover:text-white" />
        <RewindIcon className="h-5 w-5 cursor-pointer text-gray-500 hover:text-white" />
        {isPlaying ? (
          <PauseIcon
            onClick={handlePlayPause}
            className="h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
          />
        ) : (
          <PlayIcon
            onClick={handlePlayPause}
            className="h-10 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
          />
        )}

        <FastForwardIcon className="h-5 w-5 cursor-pointer text-gray-500 hover:text-white" />
        <ReplyIcon className="h-5 w-5 cursor-pointer text-gray-500 hover:text-white" />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeUpIcon
          onClick={() => setVolume(0)}
          className="h-5 w-5 cursor-pointer text-gray-500 hover:text-white"
        />
        <input
          className="w-24 md:w-28"
          onChange={(e) => {
            console.log(Number(e.target.value));
            setVolume(Number(e.target.value));
          }}
          type="range"
          value={volume}
          min={0}
          max={100}
        />
      </div>
    </div>
  );
}

export default Player;
