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
      const response = await axios.get("http://localhost:3000/api/pokemons");
      return response; // 헐 대박 !!!!!!!!!1 감사해요 혜미님 ㅜㅜㅜㅜㅜㅜㅜ
    },
  });

  console.log(pokemonData);
  return <div>포켓몬리스트 컴포넌트입니다</div>;
};

export default PokemonList;
