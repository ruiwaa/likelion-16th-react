'use client'

import { Pokemon } from '@/types/pokemon'
import { PokemonList } from '../_resources/pokemon-list'
import { use } from 'react'

interface Props {
  pokemonsPromise: Promise<Pokemon[]>
}

export default function PokemonView({ pokemonsPromise }: Props) {
  const pokemons = use(pokemonsPromise)
  return (
    <>
      <PokemonList data={pokemons} />
    </>
  )
}
