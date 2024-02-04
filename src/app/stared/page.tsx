"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { ChampionManager, useLocalStorage } from "../../../helpers";
import { ChampionsType } from "../../../types";
import { UserDocument } from "../../../types";

const Page = async () => {
  const [stared, setStared] = useLocalStorage<string[]>("stared", []);

  const session = useSession({
    required: false,
  });

  const allChempions: string = "All";
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json"
  );
  const { data } = await res.json();
  const championManager = new ChampionManager(data);

  const chempdata = championManager.getStaredChampions(stared);

  if (stared.length < 1) {
    return <h1>stared some chemp</h1>;
  }
  return (
    <div className='p-4'>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {chempdata.map((champion) => (
          <div
            key={champion.id}
            className='max-w-sm rounded overflow-hidden shadow-lg bg-white'
          >
            <img
              className='w-full'
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
              alt={champion.name}
            />
            <div className='px-6 py-4'>
              <div className='font-bold text-xl mb-2'>{champion.name}</div>
              <p className='text-gray-700 text-base'>{champion.title}</p>
            </div>
            <div className='px-6 pt-4 pb-2'>
              {champion.tags.map((tag) => (
                <span
                  key={tag}
                  className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
