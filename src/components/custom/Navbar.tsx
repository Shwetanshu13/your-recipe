// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { signOut } from "next-auth/react";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex items-center justify-between mx-auto">
                <div className="flex items-center justify-between w-1/2">
                    <div>
                        <Link href="/home" className="text-white">
                            Home
                        </Link>
                    </div>
                    <div>
                        <Link href="/recipes" className="text-white">
                            Recipes
                        </Link>
                    </div>
                </div>
                <div className='w-1/4 flex'>
                    <button 
                        className="text-white bg-slate-600 px-3 py-1 rounded-lg hover:bg-slate-400 mx-auto"
                        onClick={() => signOut()}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
