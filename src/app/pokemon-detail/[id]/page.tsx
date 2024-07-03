import { Params, Pokemon } from "@/types/pokemon.type";
import BackButton from "@/components/BackButton";
import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const generateMetadata = async ({ params }: Params) => {
  const { id } = params;
  const { data: monsterInfo } = await axios.get<Pokemon>(
    `http://localhost:3000/api/pokemons/${id}`
  );

  return {
    title: monsterInfo.korean_name + " | Pokémon Book",
  };
};

// 서버 컴포넌트에서 파라미터 가져오는 방법
const PokemonDetail = async ({ params }: Params) => {
  const { id } = params;
  const { data: monsterInfo } = await axios.get<Pokemon>(
    `http://localhost:3000/api/pokemons/${id}`
  );

  return (
    <div className="w-full  flex justify-center mt-[50px]">
      <div className="w-[900px] mb-[100px] flex flex-col justify-between items-center rounded-lg bg-gray-100 shadow-[1px_1px_10px_0px_rgb(0,0,0,0.2)] ">
        <div className="w-[900px] h-[100px] flex flex-col justify-center items-center rounded bg-orange-300">
          <h1 className="text-[25px] font-bold">{monsterInfo.korean_name}</h1>
          <p className="text-[18px]">No. {id.padStart(4, "0")}</p>
        </div>
        <div className="flex">
          <div className="w-[450px] flex flex-col justify-center items-center">
            <Image
              src={monsterInfo.sprites.front_default}
              width={180}
              height={180}
              alt="포켓몬 이미지"
              priority
              className="mt-5"
            />
            <div>
              <p className="text-[20px]">이름: {monsterInfo.korean_name}</p>
              <p className="text-[20px]">
                키: {(monsterInfo.height / 10).toFixed(1)}m
              </p>
              <p className="text-[20px]">
                무게: {(monsterInfo.weight / 10).toFixed(1)}kg
              </p>
              <ul className="flex items-center text-[20px]">
                타입:{" "}
                {monsterInfo.types.map((monster) => (
                  <li
                    key={monster.type.korean_name}
                    className=" h-[30px] flex justify-center items-center p-1 ml-2 text-[18px] rounded-lg bg-red-400 text-white "
                  >
                    {monster.type.korean_name}
                  </li>
                ))}
              </ul>
              <ul className="flex items-center text-[20px]">
                특성:{" "}
                {monsterInfo.abilities.map((monster) => (
                  <li
                    key={monster.ability.korean_name}
                    className=" h-[30px] flex justify-center items-center p-1 mt-1 ml-2 text-[18px] rounded-lg bg-green-500 text-white "
                  >
                    {monster.ability.korean_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="w-[440px] mr-[40px] flex flex-col flex-wrap gap-5 ">
            <p className="flex text-[20px] font-bold mt-8">기술</p>
            <p className="flex text-[17px] break-keep">
              {/**p태그에만 먹히는건지 찾아보기 */}
              {monsterInfo.moves.map(
                (monster) => monster.move.korean_name + " "
              )}{" "}
            </p>
          </ul>
        </div>
        <BackButton />
      </div>
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
