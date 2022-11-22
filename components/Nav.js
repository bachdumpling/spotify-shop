import { SearchIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";

function Nav() {
  const { data: session, status } = useSession();

  return (
    <div className="row-span-1 col-span-10 h-14 w-full">
      <div className="text-white h-8">
        {/* Center */}
        <div className="flex justify-center">
          
          <div className="flex items-center bg-gray-800 space-x-3 cursor-pointer rounded-full p-1 top-3 h-10 w-10 relative ">
            <HomeIcon className=" h-6 w-10 z-50" />
          </div>

          <div className="p-3 rounded-md top-0 relative">
            <div className="absolute z-50 inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              onChange={(e) => {}}
              value=""
              className="bg-gray-800 w-72 h-10 block pl-10 sm:text-sm border-none rounded-full"
              type="text"
              placeholder="What do you want to listen to?"
            />
          </div>
        </div>

        {/* Right */}
      </div>
    </div>
  );
}

export default Nav;
