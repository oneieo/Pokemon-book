"use client";

import { Pokemon } from "@/types/pokemon.type";
import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Loading from "./Loading";
import Error from "./Error";
import Link from "next/link";
import { useEffect, useRef } from "react";

const PokemonList = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const {
    data: pokemonData,
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Pokemon[], AxiosError>({
    queryKey: ["pokemonData"],
    queryFn: async ({
      pageParam = 0,
    }: QueryFunctionContext): Promise<Pokemon[]> => {
      const { data } = await axios.get<Pokemon[]>("/api/pokemons", {
        params: { offset: pageParam, limit: 48 },
      });
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      console.log(lastPage.length);
      if (lastPage.length < 48) {
        return undefined; // 마지막 페이지에 도달하면 더 이상 요청하지 않음
      }
      return allPages.length * 48; // 다음 페이지의 offset 계산
    },
    staleTime: 600000,
    gcTime: 600000,
    initialPageParam: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <div className="w-full h-full flex items-center justify-center bg-[url('/pixel_nature.jpg')] bg-cover ">
        <ul className="w-[1440px] h-screen flex flex-wrap items-center justify-center gap-[30px] mt-[50px] mb-10">
          {pokemonData.map((data) => {
            return (
              <Link key={data.id} href={`/pokemon-detail/${data.id}`}>
                <li
                  key={data.id}
                  className="w-[200px] h-[200px] flex flex-col justify-center items-center bg-white shadow-[1px_1px_10px_1px_rgb(0,0,0,0.2)] rounded hover:cursor-pointer hover:shadow-[1px_1px_10px_1px_rgb(0,0,0,0.4)]"
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
      <div className="w-full text-center pb-[30px]" ref={loadMoreRef}></div>
    </>
  );
};

export default PokemonList;
