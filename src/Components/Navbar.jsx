import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 ">
            <div className="container mx-auto flex items-center justify-between">
               
                <button
                    onClick={toggleMenu}
                    className="text-white lg:hidden focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                <div className={`lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
                    <Link to="/home/mainbody" className="block no-underline  text-white px-4 py-2 hover:bg-gray-700 text- ">Home</Link>
                    <Link to="/home/filterquestion" className="block no-underline  text-white px-4 py-2 hover:bg-gray-700">Filter Question</Link>
                    <Link to="/home/yourquestion" className="block no-underline  text-white px-4 py-2 hover:bg-gray-700">Your Question</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
