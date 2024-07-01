"use client";

import { GET } from "@/app/api/pokemons/route";
import { Pokemon } from "@/app/types/pokemon.type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
      return data; // 헐 대박 !!!!!!!!!1 감사해요 혜미님 ㅜㅜㅜㅜㅜㅜㅜ
    },
  });

  if (isPending) {
    return <>로딩중~</>;
  }
  if (isError) {
    return <>데이터 조회 중 에러 발생~</>;
  }

  console.log(pokemonData);
  return (
    <ul>
      {pokemonData.map((data) => {
        return (
          <li key={data.id}>
            <h1>{data.korean_name}</h1>
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonList;
