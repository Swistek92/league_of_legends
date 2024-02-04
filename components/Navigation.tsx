"use client";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Navigation = () => {
  const { data } = useSession({
    required: false,
  });
  // console.log(data);
  {
    data && <p> {data?.user?.name}</p>;
  }

  return (
    <div>
      <ul className='flex justify-around bg-red-400 fixed bottom-0 w-full h-10 items-center'>
        <li>
          <Link className=' p-2 border-4 border-indigo-500 ' href={"/"}>
            home
          </Link>
        </li>
        <li>
          <Link className='p-2 border-4 border-indigo-500' href={"/stared"}>
            stared
          </Link>
        </li>
        <li>
          <Link className='p-2 border-4 border-indigo-500' href={"/war"}>
            War
          </Link>
        </li>
        <li>
          <Link className='p-2 border-4 border-indigo-500' href={"/account"}>
            MyAccount
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
