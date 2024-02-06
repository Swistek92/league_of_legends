"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const AccountPage = () => {
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return (
      <div className='min-h-screen flex flex-col justify-center items-center bg-blue-50'>
        <h1 className='text-xl font-semibold text-blue-700 mb-4'>
          You are not logged in
        </h1>
        <Link href='/api/auth/signin?callbackUrl=/account'>
          <a className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Log in
          </a>
        </Link>
      </div>
    );
  }

  const logout = () => {
    localStorage.clear();
    signOut();
  };

  if (session && session.user) {
    return (
      <div className='min-h-screen bg-blue-50 flex flex-col items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-semibold text-blue-700'>
            Welcome, {session.user.name}!
          </h2>
          <p className='text-blue-600'>Email: {session.user.email}</p>
          <Image
            width={100}
            height={150}
            src={session.user.image || "/default-profile.png"} // Asumujemy, że "/default-profile.png" jest dostępnym obrazem
            alt='Profile picture'
            className='rounded-full'
          />
          <button
            className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => logout()}
            aria-label='Sign out'
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-blue-50'>
      <h2 className='text-xl font-semibold text-blue-700'>
        Unable to load user data.
      </h2>
    </div>
  );
};

export default AccountPage;
