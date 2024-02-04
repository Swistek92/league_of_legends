"use client";
import { use, useEffect, useState } from "react";
import React from "react";
import { ChampionsType } from "../types";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserDocument } from "../types";
import { ChampionManager, useLocalStorage } from "../helpers";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
const ChempionsList = ({
  tags,
  champions,
}: {
  tags: string[];
  champions: ChampionsType[];
}) => {
  // states
  const [select, setSelectValue] = useState<string>(tags[0]);
  const [filterValue, setFilterValue] = useState<string>("");
  const [filteredChampions, setFilteredChmapions] =
    useState<ChampionsType[]>(champions);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [noChempions, setNoChempions] = useState(false);
  const [user, setUser] = useState<UserDocument | undefined>();
  const [stared, setStared] = useLocalStorage<string[]>("stared", []);
  const [war, setWar] = useLocalStorage<string[]>("war", []);

  const notify1 = () => toast("próba zapisu!");
  const notify2 = () => toast("dokonano zapisu!");
  const notify3 = () => toast("err!");
  const notifyWarErr = () => toast("liczba chempionow wieksza niz 2!");

  const session = useSession({
    required: false,
  });
  console.log(session);

  const handleSetWar = (e: any) => {
    console.log(war.length);
    if (war.includes(e)) {
      setWar(war.filter((b) => b !== e));
    }
    if (war.length > 1) {
      console.log("WAAAR    " + war);
      notifyWarErr();
    } else {
      setWar([...war, e]);
    }
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectValue(event.target.value);
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFilterValue(event.target.value);

  const handleStared = async (championName: string) => {
    if (!session.data?.user) {
      return signIn();
    }

    let updatedStared;
    if (stared.includes(championName)) {
      updatedStared = stared.filter((item) => item !== championName);
    } else {
      updatedStared = [championName, ...stared];
    }
    setStared(updatedStared);
    try {
      await sendData();
    } catch (error) {}
  };

  const sendData = async () => {
    const data = user;
    data!.stared = stared;
    try {
      notify1();
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      notify2(), console.log("response" + JSON.stringify(response));
    } catch (error) {
      notify3();
      console.log(error);
      console.log("err fetch");
    }
  };

  useEffect(() => {
    const filtered = champions.filter((champion) => {
      const matchesTag = select === "All" || champion.tags.includes(select);
      const matchesSearch =
        champion.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        champion.title.toLowerCase().includes(filterValue.toLowerCase());
      return matchesTag && matchesSearch;
    });

    setFilteredChmapions(filtered);
    if (filtered.length === 0) {
      setNoChempions(true);
    } else {
      setNoChempions(false);
    }

    if (session?.data) {
      const fetchData = async () => {
        try {
          console.log(process.env.NEXTAUTH_URL);
          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/user/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(session.data.user),
            }
          );
          const { user }: { user: UserDocument } = await response.json();
          setUser(user);

          if (user.stared && user.stared.length > 1) {
            const combined = stared.concat(user.stared);
            setStared([...new Set(combined)]);
            console.log("set stared");
          }
        } catch (error) {
          console.log(error);
          console.log("err fetch");
        }
      };

      fetchData();
      console.log("stared", stared);
    }
  }, [select, filterValue, champions, session]);

  const staredCHempions = filteredChampions.filter((e) =>
    stared.includes(e.name)
  );
  const noStaredCHempions = filteredChampions.filter(
    (e) => !stared.includes(e.name)
  );

  const sortedChemp = [...staredCHempions, ...noStaredCHempions];

  return (
    <div>
      <div className='z-30 flex items-center justify-center w-full bg-red-600 fixed top-0 h-10'>
        <button className='w-full' onClick={() => setShowFilter(!showFilter)}>
          {!showFilter ? "Show Filter" : "Hide Filter"}
        </button>
      </div>
      {/* filter */}
      {showFilter && (
        <div className='fixed top-10 z-30 w-full bg-red-400 p-4'>
          <div>
            <h5 className='flex justify-center text-black text-lg font-bold mb-1'>
              Select type
            </h5>
            <select
              value={select}
              onChange={handleSelectChange}
              className='bg-red-300 border border-red-200 text-black text-lg rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-2 mb-4'
            >
              {tags.map((e) => (
                <option
                  key={e}
                  value={e}
                  className='bg-red-300 text-center hover:bg-red-500'
                >
                  {e}
                </option>
              ))}
            </select>
            <h5 className='flex justify-center text-black text-lg font-bold mb-1'>
              Search...
            </h5>
            <input
              className='w-full p-2 rounded-lg border bg-red-300 border-red-400 focus:outline-none focus:border-red-500 text-black text-lg'
              type='text'
              placeholder='Search...'
              value={filterValue}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      )}
      {/* filter */}

      <div
        className={`flex flex-wrap justify-center ${
          showFilter ? "mt-44" : "mt-20"
        }`}
      >
        {sortedChemp.map((e) => (
          <div
            key={e.key}
            className={`relative w-80 rounded-lg m-3 p-3 flex flex-col items-center ${
              war.includes(e.name) ? "border-8 border-red-700 " : ""
            } ${stared.includes(e.name) ? "bg-red-300" : "bg-yellow-700"}`}
          >
            <hr />
            <h1 className='text-4xl'>{e.id}</h1>
            <Image
              width={100}
              height={100}
              alt='champ'
              src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/${e.id}.png`}
            />
            {e.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
            <button
              onClick={() => handleSetWar(e.name)}
              className='absolute top-0 right-0 bg-red-400 p-2 rounded-bl-xl rounded-tr-lg hover:bg-yellow-500'
            >
              War
            </button>
            <button
              onClick={() => handleStared(e.name)}
              className='absolute top-0 left-0 bg-yellow-400 p-2 rounded-bl-xl rounded-tr-lg hover:bg-yellow-500'
            >
              Star
            </button>
            <Link
              href={`/details/${e.name}`}
              className='w-full bg-red-500 text-center rounded-2xl hover:bg-red-700 p-2 mt-2 text-white'
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChempionsList;
