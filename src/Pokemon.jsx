import { useEffect, useState } from 'react'
import './index.css'
import { PokemonCards } from './Components/PokemonCards';

export const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    const [number, setNumber] = useState();

    const API = `https://pokeapi.co/api/v2/pokemon?limit=${number}`;

    const fetchPokemon = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            // console.log(data);

            const pokemonDetailedData = data.results.map(async (currPokemon) => {
                // console.log(currPokemon.url);
                const res = await fetch(currPokemon.url);
                const data = await res.json();
                return data;
            })

            const detailedResponses = await Promise.all(pokemonDetailedData);
            console.log(detailedResponses);
            setPokemon(detailedResponses);
            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(error);
        }
    }

    useEffect(() => {
        fetchPokemon();
    }, [number]);

    if (loading) {
        return <div><h1>Loading..</h1></div>
    }

    if (error) {
        return <div>
            <h1>{error.message}</h1>
        </div>
    }

    const searchData = pokemon.filter((curPokemon) =>
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <>
            <section className='container'>
                <header>
                    <h1>Pokemon : Gotta catch them All !</h1>
                </header>
                <div className="pokemon-search">
                    <input type="text" placeholder='Search Pokemon' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <input type="number" placeholder='Number of Pokemon Cards: ' value={number} onChange={(e) => setNumber(e.target.value)} className='numberToShow' />
                </div>

                <div>
                    <ul className="cards">
                        {/* {pokemon.map((curPokemon) => { */}
                        {searchData.map((curPokemon) => {
                            return <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
                        })}
                    </ul>
                </div>
            </section>
        </>
    )
}