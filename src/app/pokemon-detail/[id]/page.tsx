import { Params, Pokemon } from "@/app/types/pokemon.type";
import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// 서버 컴포넌트에서 파라미터 가져오는 방법
const PokemonDetail = async ({ params }: Params) => {
  const { id } = params;
  const { data: monsterInfo } = await axios.get<Pokemon>(
    `http://localhost:3000/api/pokemons/${id}`
  );

  return (
    <div className="w-full h-screen flex justify-center mt-[70px]">
      <div className="w-[1000px] h-[600px] bg-fuchsia-200">
        <h1>{monsterInfo.korean_name}</h1>
        <p>No. {id}</p>
        <Image
          src={monsterInfo.sprites.front_default}
          width={150}
          height={150}
          alt="포켓몬 이미지"
          priority
        />
        <p>이름: {monsterInfo.korean_name}</p>
        <p>키: {(monsterInfo.height / 10).toFixed(1)}m</p>
        <p>무게: {(monsterInfo.weight / 10).toFixed(1)}kg</p>
        <p>
          타입: {monsterInfo.types.map((monster) => monster.type.korean_name)}
        </p>
        <p>
          특성:
          {monsterInfo.abilities.map((monster) => monster.ability.korean_name)}
        </p>
        <p>
          기술 <br />
          {monsterInfo.moves.map((monster) => monster.move.korean_name)}
        </p>
        <Link href={"/"}>
          <button>뒤로가기</button>
        </Link>
      </div>{" "}
    </div>
  );
};

export default PokemonDetail;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.params;
//   const { data: monsterInfo } = await axios.get<Pokemon>(
//     `http://localhost:3000/api/pokemons/${id}`
//   ); // 왤케 느리지

//   return {
//     props: {
//       // 데이터 객체
//       // ...
//       monsterInfo,
//     },
//   };
// };
