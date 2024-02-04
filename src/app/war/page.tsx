"use client";
import { useState } from "react";
import { ChampionManager, useLocalStorage } from "../../../helpers";

const page = async () => {
  const [war, setWar] = useLocalStorage<string[]>("war", []);
  const [winningMsg, setWinningMsg] = useState<string>();
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json"
  );
  const { data } = await res.json();
  const championManager = new ChampionManager(data);

  const chempdata = championManager.getWarChampions(war);

  const onWar = () => {
    if (chempdata[0].stats.movespeed === chempdata[1].stats.movespeed) {
      localStorage.removeItem("war");
      setWinningMsg("remis");
    } else if (chempdata[0].stats.movespeed > chempdata[1].stats.movespeed) {
      localStorage.removeItem("war");
      setWinningMsg(`wygrywa ${chempdata[0].name}`);
    } else {
      setWinningMsg(`wygrywa ${chempdata[1].name}`);
    }
  };
  if (winningMsg) {
    localStorage.removeItem("war");

    return <div>{winningMsg}</div>;
  }
  return (
    <div className='p-4 bg-gray-900 text-white min-h-screen'>
      {winningMsg ? (
        <div className='text-center py-4 text-xl font-bold'>{winningMsg}</div>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {chempdata.map((champion) => (
              <div
                key={champion.id}
                className='max-w-sm rounded overflow-hidden shadow-lg bg-gray-800'
              >
                <img
                  className='w-full'
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
                  alt={champion.name}
                />
                <div className='px-6 py-4'>
                  <div className='font-bold text-xl mb-2'>{champion.name}</div>
                  <p className='text-gray-400 text-base'>{champion.title}</p>
                </div>
                <div className='px-6 pt-4 pb-2'>
                  {champion.tags.map((tag) => (
                    <span
                      key={tag}
                      className='inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={onWar}
            className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            WAR
          </button>
        </>
      )}
    </div>
  );
};

export default page;
