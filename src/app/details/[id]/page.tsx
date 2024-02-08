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

  const {
    name,
    title,
    image,
    lore,
    allytips,
    enemytips,
    info: { attack, defense, magic, difficulty },
    spells,
  } = chempionsData;

  return (
    <div className='bg-blue-100 p-6 rounded-lg shadow-lg'>
      <h1 className='text-3xl font-semibold text-blue-700 mb-4'>
        {name || "Unknown Champion"}
      </h1>
      <p className='text-xl text-blue-600 mb-4'>
        {title || "No Title Available"}
      </p>
      {image?.full ? (
        <Image
          className='w-64 h-64 mx-auto rounded-full'
          src={`https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/${image.full}`}
          alt={name || "Champion Image"}
          width={256}
          height={256}
        />
      ) : (
        <Image
          className='w-64 h-64 mx-auto rounded-full'
          src={`https://www.gameinformer.com/sites/default/files/styles/full/public/2020/11/23/493ebb8f/rell_11.jpg`}
          alt={name || "Champion Image"}
          width={256}
          height={256}
        />
      )}
      <p className='text-blue-800 text-lg my-4'>
        {lore || "No lore available."}
      </p>
      <div>
        <h2 className='text-2xl font-semibold text-blue-700 my-4'>Ally Tips</h2>
        <ul className='list-disc list-inside text-blue-800'>
          {allytips && allytips.length > 0 ? (
            allytips.map((tip, index) => <li key={index}>{tip}</li>)
          ) : (
            <>
              <li>
                Maximize your use of ability for wave clear in the early game,
                allowing you to roam and support your team.
              </li>
              <li>
                Your ultimate can turn the tide of team fights. Look for
                opportunities to catch multiple enemies within its effect.
              </li>
              <li>
                {name}'s passive gives you an edge in prolonged fights. Engage
                when you can sustain the battle and utilize this advantage.
              </li>
              <li>
                Build Items early to enhance your specific ability damage,
                making you a significant threat during skirmishes.
              </li>
              <li>
                Pay close attention to enemy cooldowns; your Ability is perfect
                for punishing mispositioned foes.
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        <h2 className='text-2xl font-semibold text-blue-700 my-4'>
          Enemy Tips
        </h2>
        <ul className='list-disc list-inside text-blue-800'>
          {enemytips?.length ? (
            enemytips.map((tip, index) => <li key={index}>{tip}</li>)
          ) : (
            <>
              <li>
                Watch for the champion's key ability cooldowns; engage when
                their crucial abilities are on cooldown.
              </li>
              <li>
                Champions with strong ultimates may look to team fight when it's
                available. Try to spread out to minimize its impact.
              </li>
              <li>
                Many champions have a weaker early game. Apply pressure early to
                delay their power spikes.
              </li>
              <li>
                Warding their jungle and keeping track of their jungler can
                prevent successful ganks and secure objectives.
              </li>
              <li>
                When a champion relies heavily on combos, dodging their initial
                ability can significantly reduce their damage output.
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        <h2 className='text-2xl font-semibold text-blue-700 my-4'>Stats</h2>
        <p className='text-blue-800'>Attack: {attack || "73"}</p>
        <p className='text-blue-800'>Defense: {defense || "17"}</p>
        <p className='text-blue-800'>Magic: {magic || "47"}</p>
        <p className='text-blue-800'>Difficulty: {difficulty || "3"}</p>
      </div>
      <div>
        <h2 className='text-2xl font-semibold text-blue-700 my-4'>Abilities</h2>
        {spells?.length ? (
          spells.map((spell) => (
            <div key={spell.id} className='mb-4'>
              <h3 className='text-xl font-semibold text-blue-700'>
                {spell.name || "infernal Chains"}
              </h3>
              <p className='text-blue-800'>
                {spell.description ||
                  "mashes the ground in front of him, sending out a chain that damages the first enemy hit. If the target is a champion or a large monster, they are tethered to the impact area. If the tethered enemy fails to move out of the impact area quickly, they are dragged back into the center, taking additional damage and becoming briefly immobilized."}
              </p>
              <p className='text-blue-800'>
                Cooldown: {spell.cooldownBurn || "42"}
              </p>
              <p className='text-blue-800'>Cost: {spell.costBurn || "52"}</p>
            </div>
          ))
        ) : (
          <p>No abilities information available.</p>
        )}
      </div>
    </div>
  );
};

export default page;
