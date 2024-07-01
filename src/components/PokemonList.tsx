"use client";

import { GET } from "@/app/api/pokemons/route";
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
      const response = await fetch(``); // 직접 부르는건데 ..? 그러면 안 되는데
      return response.json();
    },
  });

  console.log(pokemonData);
  return <div>포켓몬리스트 컴포넌트입니다</div>;
};

export default PokemonList;
