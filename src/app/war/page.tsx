"use client";
import { useCallback, useEffect, useState } from "react";
import { ChampionManager, useLocalStorage } from "../../../helpers";
import Link from "next/link";
import { ChampionsType } from "../../../types";

const Page = () => {
  const [war, setWar] = useLocalStorage<string[]>("war", []);
  const [winningMsg, setWinningMsg] = useState<string>();
  const [levelFirstChampion, setlevelFirstChampion] = useState(1);
  const [levelSecondChampion, setlevelSecondChampion] = useState(1);

  const [chempdata, setChempdata] = useState<ChampionsType[]>([]);
  const [winData, setWinData] = useState<ChampionsType | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json"
      );
      const data = await res.json();
      const championManager = new ChampionManager(data.data);
      setChempdata(championManager.getWarChampions(war));
    };

    fetchData();
  }, [war]);

  const handleIncreaseLevel = (index: number) => {
    if (index === 0) {
      if (levelFirstChampion === 18) return;
      setlevelFirstChampion(levelFirstChampion + 1);
    } else {
      if (levelSecondChampion === 18) return;
      setlevelSecondChampion(levelSecondChampion + 1);
    }
  };

  const handleDecreaselevel = (index: number) => {
    if (index === 0) {
      if (levelFirstChampion === 1) return;
      setlevelFirstChampion(levelFirstChampion - 1);
    } else {
      if (levelSecondChampion === 1) return;
      setlevelSecondChampion(levelSecondChampion - 1);
    }
  };

  const onWar = () => {
    const {
      attack: attackFirstChampion = 26,
      defense: defenseFirstChampion = 12,
      magic: magicFirstChampion = 43,
    } = chempdata[0].info;
    const {
      attack: attackSecondChampion = 41,
      defense: defenseSecondChampion = 22,
      magic: magicSecondChampion = 10,
    } = chempdata[1].info;

    const value1 =
      attackFirstChampion * levelFirstChampion +
      magicFirstChampion * levelFirstChampion -
      defenseSecondChampion * levelSecondChampion;
    const value2 =
      attackSecondChampion * levelSecondChampion +
      magicSecondChampion * levelSecondChampion -
      defenseFirstChampion * levelFirstChampion;

    if (value1 === value2) {
      localStorage.removeItem("war");
      setWinData(undefined);
      setWinningMsg("Draw");
    } else if (value1 > value2) {
      localStorage.removeItem("war");
      setWinningMsg(`${chempdata[0].name} wins`);
      setWinData(chempdata[0]);
    } else {
      localStorage.removeItem("war");
      setWinData(chempdata[1]);

      setWinningMsg(`${chempdata[1].name} wins`);
    }
  };

  if (winningMsg) {
    localStorage.removeItem("war");
    return (
      <div className='flex justify-center items-center min-h-screen bg-gray-900'>
        <div className='text-center py-4 text-xl font-bold text-blue-400 w-full'>
          {winData ? (
            <>
              <img
                className='mx-auto'
                style={{ maxWidth: "90%", height: "auto" }}
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${winData.id}_0.jpg`}
                alt={winData.name}
              />
              <p>{winningMsg}</p>
              <div className='text-center mt-4 text-xl text-red-400 underline'>
                <Link href='/ '>walcz ponownie</Link>
              </div>
            </>
          ) : (
            <div className='flex flex-col justify-center items-center min-h-screen bg-gray-900'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                {" "}
                {chempdata.map((champion) => (
                  <div
                    key={champion.id}
                    className='max-w-sm mx-auto rounded overflow-hidden shadow-lg bg-gray-800'
                  >
                    <img
                      className='w-full object-cover'
                      src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
                      alt={champion.name}
                    />
                  </div>
                ))}
              </div>
              <div className='text-center text-xl text-red-400 underline'>
                <Link href='/ '>walcz ponownie</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // return <div></div>;
  return (
    <div className='p-4 bg-gray-900 text-white min-h-screen'>
      <>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {chempdata.map((champion, index) => (
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
                <div className='font-bold text-xl mb-2 text-blue-400'>
                  {champion.name}
                </div>
                <p className='text-gray-400 text-base'>{champion.title}</p>
              </div>
              <div className='px-6 pt-4 pb-2'>
                {champion.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className='inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 mb-2'
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {index === 0 ? (
                <div>
                  <div className='flex justify-between'>
                    <button
                      onClick={() => handleIncreaseLevel(index)}
                      disabled={levelFirstChampion === 18}
                      className={`bg-blue-400 hover:bg-blue-500 text-white font-semibold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2 ${
                        levelFirstChampion === 18 &&
                        "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      lvl up
                    </button>
                    <div className='text-white font-semibold mr-2'>
                      lvl {levelFirstChampion}
                    </div>
                    <button
                      onClick={() => handleDecreaselevel(index)}
                      disabled={levelFirstChampion === 1}
                      className={`bg-blue-400 hover:bg-blue-500 text-white font-semibold py-1 px-3 rounded focus:outline-none focus:shadow-outline ${
                        levelFirstChampion === 1 &&
                        "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      lvl down
                    </button>
                  </div>
                  <div className='flex justify-center pb-2'>
                    <ul>
                      <li>
                        attack:{champion.info.attack * levelFirstChampion}
                      </li>{" "}
                      <li>
                        defense:{champion.info.defense * levelFirstChampion}
                      </li>{" "}
                      <li>magic:{champion.info.magic * levelFirstChampion}</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div>
                  <div className='flex justify-between'>
                    <button
                      onClick={() => handleIncreaseLevel(index)}
                      disabled={levelSecondChampion === 18}
                      className={`bg-blue-400 hover:bg-blue-500 text-white font-semibold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2 ${
                        levelSecondChampion === 18 &&
                        "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      lvl up
                    </button>
                    <div> {levelSecondChampion}</div>

                    <button
                      onClick={() => handleDecreaselevel(index)}
                      disabled={levelSecondChampion === 1}
                      className={`bg-blue-400 hover:bg-blue-500 text-white font-semibold py-1 px-3 rounded focus:outline-none focus:shadow-outline ${
                        levelSecondChampion === 1 &&
                        "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      lvl down
                    </button>
                  </div>
                  <div className='flex justify-center pb-2'>
                    <ul>
                      <li>
                        attack:{champion.info.attack * levelSecondChampion}
                      </li>{" "}
                      <li>
                        defense:{champion.info.defense * levelSecondChampion}
                      </li>{" "}
                      <li>magic:{champion.info.magic * levelSecondChampion}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {war.length === 2 ? (
          <div className='flex justify-left mt-4 pb-10'>
            <button
              onClick={onWar}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              WAR
            </button>
          </div>
        ) : (
          <div className='text-center mt-4 text-xl text-red-400'>
            <Link href='/ '>Proszę wybrać dwóch championów do walki</Link>
          </div>
        )}
      </>
    </div>
  );
};

export default Page;
