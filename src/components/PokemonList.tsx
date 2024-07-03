"use client";

import { Pokemon } from "@/app/types/pokemon.type";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Loading from "./Loading";
import Error from "./Error";
import Link from "next/link";

// 스탠다드 7월 1일 강의 보기
const PokemonList = () => {
  const {
    data: pokemonData,
    isPending,
    isError,
  } = useQuery<Pokemon[], AxiosError>({
    queryKey: ["pokemonData"],
    queryFn: async (): Promise<Pokemon[]> => {
      const { data } = await axios.get<Pokemon[]>("/api/pokemons");
      return data;
    },
  });

  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <div className="w-full h-full flex items-center justify-center ">
      <ul className="w-[1440px] h-screen flex flex-wrap items-center justify-center gap-[30px] mb-10">
        {pokemonData.map((data) => {
          return (
            <Link key={data.id} href={`/pokemon-detail/${data.id}`}>
              <li
                key={data.id}
                className="w-[200px] h-[200px] flex flex-col justify-center items-center shadow-[1px_1px_10px_1px_rgb(0,0,0,0.2)] rounded hover:cursor-pointer hover:shadow-[1px_1px_10px_1px_rgb(0,0,0,0.4)]"
              >
                <Image
                  src={data.sprites.front_default}
                  width={150}
                  height={150}
                  alt="pokemon-image"
                  priority
                />
                <h1 className="w-[180px] text-[18px] font-bold">
                  {data.korean_name}
                </h1>
                <p className="w-[180px] mb-2">도감번호: {data.id}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default PokemonList;
