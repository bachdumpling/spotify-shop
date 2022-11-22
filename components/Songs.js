import { ClockIcon } from "@heroicons/react/outline";
import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

function Songs() {
  const playlist = useRecoilValue(playlistState);
  console.log(playlist);

  return (
    <div className="px-8 flex flex-col">
      <div className="grid grid-flow-col grid-col-2 py-2 px-6 text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="w-5">
            <p>#</p>
          </div>
          <p>TITLE</p>
        </div>
        <div className="flex items-center justify-between ml-auto md:ml-0">
          <p className="hidden md:inline">ALBUM</p>
          <ClockIcon className="w-5" />
        </div>
      </div>
      <hr className="border-t-[0.1px] border-gray-700 pb-5" />
      {playlist?.tracks.items.map((track, i) => {
        return <Song key={track.track.id} track={track} order={i} />;
      })}
    </div>
  );
}

export default Songs;
