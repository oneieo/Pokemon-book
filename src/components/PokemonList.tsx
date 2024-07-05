"use client";

import { InfiniteQueryData, Pokemon } from "@/types/pokemon.type";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Loading from "./Loading";
import Error from "./Error";
import Link from "next/link";
import { useEffect, useRef } from "react";

const PAGE_SIZE = 24;

const PokemonList = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const {
    data: pokemonData,
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<InfiniteQueryData, Error, Pokemon[], [string], number>({
    queryKey: ["pokemonData"],
    queryFn: async ({
      pageParam,
    }: QueryFunctionContext): Promise<InfiniteQueryData> => {
      const { data } = await axios.get<InfiniteQueryData>(`/api/pokemons`, {
        params: { offset: pageParam },
      });
      return data;
    },
    select: ({ pages }) => {
      return pages.map((page) => page.data).flat();
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < PAGE_SIZE) {
        return undefined; // 마지막 페이지에 도달하면 더 이상 요청하지 않음
      }
      return allPages.length + 1; // 다음 페이지의 페이지 번호 계산
    },
    staleTime: 600000,
    gcTime: 600000,
    initialPageParam: 1,
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
    <div className="w-full h-full flex flex-col items-center justify-center bg-[url('/pixel_nature.jpg')] bg-cover bg-fixed ">
      <div className="w-full h-full flex items-center justify-center">
        <ul className="w-[1440px] h-full flex flex-wrap items-center justify-center gap-[30px] mt-[50px] mb-10">
          {pokemonData.map((page) => (
            <Link key={page?.id} href={`/pokemon-detail/${page?.id}`}>
              <li className="w-[210px] h-[210px] flex flex-col justify-center items-center bg-white shadow-[1px_1px_10px_1px_rgb(0,0,0,0.2)] rounded hover:cursor-pointer hover:shadow-[1px_1px_10px_1px_rgb(0,0,0,0.4)] hover:bg-slate-200">
                <Image
                  src={page?.sprites?.front_default}
                  width={150}
                  height={150}
                  alt="pokemon-image"
                  priority
                />
                <h1 className="w-[180px] text-[18px] font-bold">
                  {page?.korean_name}
                </h1>
                <p className="w-[180px] mb-2">도감번호: {page?.id}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div
        className="w-full h-[50px] flex justify-center items-center text-[20px] pb-[30px] text-white bg-transparent"
        ref={loadMoreRef}
      >
        {isFetchingNextPage
          ? "더 많은 포켓몬을 데려오는 중입니다..."
          : hasNextPage
          ? "포켓몬을 더 데려올 수 있습니다."
          : "모든 포켓몬을 데려왔습니다!"}
      </div>
    </div>
  );
};

export default PokemonList;
