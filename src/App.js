import { useEffect, useState } from 'react';
import { fetchPokemonData, fetchPokemons } from './api';
import { Loader } from './components/Loader';
import { PokedexView } from './components/PokedexView';
import './App.css';

function App()
{
	const [ pokemons, setPokemons ] = useState( [] );
	const [ isLoading, setIsLoading ] = useState( false );


	// load all pokemons on mount
	useEffect( () => {

		fillPokemonsArray();

	}, [] );


	// fetch all pokemons and push to array
	const fillPokemonsArray = () => {

		// set loading state and reset pokemons array
		setIsLoading( true );
		setPokemons( [] );

		// fetch first original 151 pokemons
		fetchPokemons( 151 ).then( async ({ results }) => {
	
			// iterate over each pokemon an add to array
			await Promise.all( results.map( async ( pokemon ) => {

				await fetchPokemonData( pokemon.name ).then( async ( json ) => {

					await setPokemons( prev => {
						
						let tmp = prev.slice();
						tmp[json.order] = json;
						return tmp;

					});

				});

			}));

			setIsLoading( false );
	
		});
		
	}


	// render
	return (
		<div className="pokedex-app">

			<h1>
				Pokedex
			</h1>

			{ isLoading 
				? <Loader />
				: <PokedexView pokemons={ pokemons } />
			}

		</div>
	);
}

export default App;