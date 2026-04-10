'use client'

import { Pokemon } from '@/types/pokemon'
import { PokemonList } from '../_resources/pokemon-list'
import { use } from 'react'

interface Props {
  pokemonsPromise: Promise<Pokemon[]>
}

export default function PokemonView({ pokemonsPromise }: Props) {
  const pokemons = use(pokemonsPromise) // 클라이언트 컴포넌트여서 비동기 사용할 수 없으므로, use함수 사용
  return (
    <>
      <PokemonList data={pokemons} />
    </>
  )
}
