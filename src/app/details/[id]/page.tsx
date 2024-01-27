import React from "react";
import { ChempionType } from "../../../../types";
import Image from "next/image";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const res = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/${id}.json`
  );
  const data: ChempionType = await res.json();
  const chempionsData = Object.values(data.data)[0];
  return (
    <div className='bg-red-100 p-6 rounded-lg shadow-lg'>
      <h1 className='text-3xl font-semibold text-red-700 mb-4'>
        {chempionsData.name}
      </h1>
      <p className='text-xl text-red-600 mb-4'>{chempionsData.title}</p>
      <img
        className='w-64 h-64 mx-auto rounded-full'
        src={`https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/${chempionsData.image.full}`}
        alt={chempionsData.name}
      />
      <p className='text-red-800 text-lg my-4'>{chempionsData.lore}</p>
      <h2 className='text-2xl font-semibold text-red-700 my-4'>Ally Tips</h2>
      <ul className='list-disc list-inside text-red-800'>
        {chempionsData.allytips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
      <h2 className='text-2xl font-semibold text-red-700 my-4'>Enemy Tips</h2>
      <ul className='list-disc list-inside text-red-800'>
        {chempionsData.enemytips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
      <h2 className='text-2xl font-semibold text-red-700 my-4'>Stats</h2>
      <p className='text-red-800'>Attack: {chempionsData.info.attack}</p>
      <p className='text-red-800'>Defense: {chempionsData.info.defense}</p>
      <p className='text-red-800'>Magic: {chempionsData.info.magic}</p>
      <p className='text-red-800'>
        Difficulty: {chempionsData.info.difficulty}
      </p>
      <h2 className='text-2xl font-semibold text-red-700 my-4'>Abilities</h2>
      {chempionsData.spells.map((spell) => (
        <div key={spell.id} className='mb-4'>
          <h3 className='text-xl font-semibold text-red-700'>{spell.name}</h3>
          <p className='text-red-800'>{spell.description}</p>
          <p className='text-red-800'>Cooldown: {spell.cooldownBurn}</p>
          <p className='text-red-800'>Cost: {spell.costBurn}</p>
        </div>
      ))}
    </div>
  );
};

export default page;
