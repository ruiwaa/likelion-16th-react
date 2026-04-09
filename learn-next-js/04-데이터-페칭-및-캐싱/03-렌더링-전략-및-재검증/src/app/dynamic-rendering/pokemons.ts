import { Pokemon } from '@/types/pokemon'
import { cache } from 'react'
import 'server-only'

export const getCachedPokemons = cache(async (): Promise<Pokemon[]> => {
  const response = await fetch(`${process.env.MOCK_API_URL}/pokemon`)
  if (!response.ok) throw new Error('데이터를 불러오는데 실패했습니다.')
  const pokemons = (await response.json()) as Pokemon[]
  return pokemons
})
