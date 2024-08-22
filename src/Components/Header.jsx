import { Search, Settings, Share, User2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ onSearch }) {
  const [searchQuery,setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/"); 
  };

   const handleSearch = () =>{
    if(onSearch){
      onSearch(searchQuery);
    }
   }
  return (
    <div className="px-4 py-4 h-24 flex items-center justify-between bg-gray-600">
      <div className="flex items-center gap-4">
        <div className="h-24 w-26 sm:h-20 sm:w-18 hidden sm:block">
          <img src="/image/logo.jpg" alt="Logo" className="h-full w-full" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative gap-2">
          <div className="hover:cursor-pointer">
            <Search
              onClick={handleSearch}
              width={30}
              className="absolute left-2 top-1/2 -translate-y-[50%] text-white"
            />
          </div>
            
          <input
          name="search"
          value={searchQuery}
          onChange={(e)=> setSearchQuery(e.target.value)}
            placeholder="Tìm Kiếm Câu Hỏi ?"
            className="pl-8 rounded-3xl py-2 w-48 sm:w-96 bg-[#25222a3a] text-white ml-2"
          />
        </div>
        <div className="flex bg-[#58565a] text-white w-16 sm:w-20 h-10 sm:h-12 items-center justify-center rounded-md sm:rounded-[10%] hidden sm:flex">
          <Share />
          <span>Share</span>
        </div>
        <button className="rounded-full bg-[#58565a] font-bold w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center">
          <Settings width={20} className="text-white" />
        </button>
        <button
            className="rounded-full bg-[#413d47] font-bold w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <User2 width={20} className="text-white" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg" style={{top: '70px'}}>
              <ul className="py-1">
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          )}
      </div>
    </div>
  );
}
