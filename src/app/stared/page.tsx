import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";

const page = async () => {
  const session = await getServerSession(options);
  

  if (!session) {
    return (
      <div>
        <h1>you are not loggin </h1>
        <Link href={"/api/auth/signin?callbackUrl=/stared"}>log in </Link>
      </div>
    );
  }

  return (
    <div>
      STARED CHEMPIONS
      <p>name</p>
      <p> {session.user?.name}</p>
      <Image src={session.user!.image!} alt='asd' width={200} height={200} />
      <p>email</p>
      <p> {session.user?.email}</p>
    </div>
  );
};

export default page;
