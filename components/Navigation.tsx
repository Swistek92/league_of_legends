"use client";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

const Navigation = () => {
  const { data } = useSession({
    required: false,
  });

  return (
    <div>
      <ul className='flex justify-around bg-blue-500 fixed bottom-0 w-full h-10 items-center text-white'>
        <li>
          <Link href='/'>
            <span className='p-2 hover:bg-blue-700 rounded'>Home</span>
          </Link>
        </li>
        <li>
          <Link href='/stared'>
            <span className='p-2 hover:bg-blue-700 rounded'>Stared</span>
          </Link>
        </li>
        <li>
          <Link href='/war'>
            <span className='p-2 hover:bg-blue-700 rounded'>War</span>
          </Link>
        </li>
        <li>
          <Link href='/account'>
            <span className='p-2 hover:bg-blue-700 rounded'>
              {data?.user?.name ? `${data.user?.name}` : "Account"}
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
