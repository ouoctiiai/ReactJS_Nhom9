import {
  Search,
  Settings,
  Share,
  User2,
} from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <div className="px-10 py-4 flex items-center justify-between bg-slate-500">
      <div className="flex items-center gap-4">
        <div>
          <img src="./image/logo.jpg" />
        </div>
      </div>
      <div className="flex items-center gap-2 ">
        <div className="relative">
          <Search
            width={20}
            className="absolute left-2 top-1/2 -translate-y-[50%] text-white"
          />
          <input
            placeholder="Tìm Kiếm Câu Hỏi ?"
            className="pl-8 rounded-3xl py-2 w-96 bg-[#25222a3a] text-white"
          />
        </div>
        <div className="flex bg-[#58565a] text-white w-20 h-12 items-center justify-center rounded-[10%]">
          <Share/>
          <span>Share</span>
        </div>
        <button className="rounded-full bg-[#58565a] font-bold w-10 h-10  flex justify-center items-center">
          <Settings width={20} className="text-white" />
        </button>
        <button className="rounded-full bg-[#413d47] font-bold w-10 h-10  flex justify-center items-center">
          <User2 width={20} className="text-white" />
        </button>
      </div>
    </div>
  );
}
