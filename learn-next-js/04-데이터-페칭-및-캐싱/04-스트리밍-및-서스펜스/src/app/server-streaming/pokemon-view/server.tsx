import { Pokemon } from '@/types/pokemon'
import { PokemonList } from '../_resources/pokemon-list'

interface Props {
  pokemonsPromise: Promise<Pokemon[]>
}

export default async function PokemonView({ pokemonsPromise }: Props) {
  const pokemons = await pokemonsPromise
  // 이미 pookemonsPromise가 데이터를 받아 객체 형태이므로, 함수의 형태로 실행할 수 없다.
  return (
    <>
      <PokemonList data={pokemons} />
    </>
  )
}
