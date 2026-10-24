const BASE_URL = 'https://rickandmortyapi.com/api/character'

export async function getCharacters(page = 1) {
  const response = await fetch(`${BASE_URL}?page=${page}`)

  if (!response.ok) {
    throw new Error('Não foi possível carregar os personagens.')
  }

  return response.json()
}
