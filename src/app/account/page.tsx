"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useLocalStorage } from "../../../helpers";
import { json } from "stream/consumers";

const AccountPage = () => {
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return (
      <div>
        <h1>You are not logged in</h1>
        <Link href='/api/auth/signin?callbackUrl=/account'>Log in</Link>
      </div>
    );
  }

  const logout = () => {
    localStorage.clear();
    signOut();
  };

  if (session && session.user) {
    return (
      <div>
        <p>{JSON.stringify(session)}</p>
        <h2>Welcome, {session.user.name}!</h2>
        <p>Email: {session.user.email}</p>
        <Image
          width={100}
          height={150}
          src={
            session.user.image ||
            "/https://t3.ftcdn.net/jpg/01/25/10/18/360_F_125101851_t1FDeoRLxPvetgF9ai2x6Ucu379FIXs2.jpg"
          }
          alt='Profile picture'
        />
        <button
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => logout()}
          aria-label='Sign out'
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Unable to load user data.</h2>
    </div>
  );
};

export default AccountPage;
