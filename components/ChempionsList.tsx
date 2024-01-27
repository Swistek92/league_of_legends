"use client";
import { use, useEffect, useState } from "react";
import React from "react";
import { ChampionsType } from "../types";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserDocument } from "../models/user.model";
import { ChampionManager, useLocalStorage } from "../helpers";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

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
  // const [stared, setStared] = useState<string[]>([]);
  const [stared, setStared] = useLocalStorage<string[]>("stared", []);
  // session

  const session = useSession({
    required: false,
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectValue(event.target.value);
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFilterValue(event.target.value);

  const handleStared = (e: string) => {
    if (!session.data?.user) {
      return signIn();
    }

    if (stared.includes(e)) {
      setStared(stared.filter((item) => item !== e));
    } else {
      setStared([e, ...stared]);
    }
  };

  // use effect
  const sendData = async () => {
    const data = user;
    data!.stared = stared;
    console.log("data", data);
    try {
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
    } catch (error) {
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

  return (
    <div className=''>
      {/* FILTER */}
      <div className='z-30 flex items-center justify-center w-full bg-red-600 fixed top-0 h-10'>
        <button className='w-full' onClick={() => setShowFilter(!showFilter)}>
          {!showFilter ? "show filter" : "hide filter"}
        </button>
      </div>
      {showFilter && (
        <div className='fixed top-10 z-30 w-full bg-red-400 '>
          <div>
            <h5 className='flex justify-center text-black text-lg font-bold mb-1'>
              Select type
            </h5>
            <select
              value={select}
              onChange={handleSelectChange}
              className='bg-red-300 border border-red-200 text-black text-lg rounded-lg focus:ring-red-300 focus:border-red-500 block w-full p-1 '
            >
              {tags.map((e) => (
                <option
                  key={e}
                  value={e}
                  className='bg-red-300 flex text-center hover:bg-red-500'
                >
                  {e}
                </option>
              ))}
            </select>
            <h5 className='flex justify-center text-black text-lg font-bold mb-1'>
              Search...
            </h5>
            <input
              className='w-full p-1 rounded-lg border bg-red-300 border-red-400 focus:outline-none focus:border-red-500 text-black text-lg'
              type='text'
              placeholder='Search...'
              value={filterValue}
              onChange={handleFilterChange}
            />
          </div>
          {noChempions && (
            <div className='flex items-center justify-center'>
              <button
                onClick={() => {
                  setFilterValue("");
                  setSelectValue("All");
                }}
                className='w-full bg-red-900 hover:bg-red-800 h-36 animate-pulse'
              >
                restart filter
              </button>
            </div>
          )}
        </div>
      )}
      {/* CHEMPIONS LIST */}
      <div
        className={`flex flex-col items-center ${
          showFilter ? "mt-44" : "mt-20"
        }`}
      >
        {/* SAVE DATA */}
        {user?.stared !== stared && (
          <div
            className={`flex items-center justify-center w-full fixed  z-10 ${
              !showFilter ? "top-10" : "top-44"
            }`}
          >
            <button
              onClick={() => {
                sendData();
              }}
              className='w-full bg-red-900 hover:bg-red-800 h-10 '
            >
              save stared
            </button>
          </div>
        )}
        {filteredChampions.map((e) => {
          return (
            <div
              key={e.key}
              className={`relative  w-80 rounded-lg m-3 p-3 flex flex-col  items-center ${
                stared.includes(e.name) ? "bg-red-300" : "bg-yellow-700"
              }`}
            >
              <hr />
              <h1 className='text-4xl'>{e.id}</h1>
              <Image
                width={100}
                height={100}
                alt='champ'
                src={`http://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/${e.id}.png`}
              />
              {e.tags.map((e) => (
                <p key={e}>{e}</p>
              ))}
              <button
                onClick={() => handleStared(e.name)}
                className='absolute top-0 right-0 bg-yellow-400 p-5 rounded-bl-xl rounded-tr-lg hover:bg-yellow-500 '
              >
                stared
              </button>

              <Link
                href={`/details/${e.name}`}
                className='w-full bg-red-500 text-center rounded-2xl hover:bg-red-700'
              >
                details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChempionsList;
