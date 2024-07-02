"use client";

import { GET } from "@/app/api/pokemons/route";
import { Pokemon } from "@/app/types/pokemon.type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Loading from "./Loading";
import Error from "./Error";

const PokemonList = () => {
  const {
    data: pokemonData,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["pokemonData"],
    queryFn: async () => {
      const { data } = await axios.get<Pokemon[]>(
        "http://localhost:3000/api/pokemons"
      );
      return data;
    },
  });

  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  console.log(pokemonData);
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <ul className="w-[1440px] h-screen flex flex-wrap items-center justify-center gap-[30px] mb-10">
        {pokemonData.map((data) => {
          return (
            <li
              key={data.id}
              className="w-[200px] h-[200px] flex flex-col justify-center items-center shadow-md rounded hover:cursor-pointer  hover:shadow-lg "
            >
              <Image
                src={data.sprites.front_default}
                width={150}
                height={150}
                alt="pokemon-image"
              />
              <h1 className="w-[190px] text-[18px] font-bold">
                {data.korean_name}
              </h1>
              <p className="w-[190px]">도감번호: {data.id}</p>
            </li>
          );
        })}
      </ul>{" "}
    </div>
  );
};

export default PokemonList;
