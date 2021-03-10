import React, { useEffect, useState, useReducer, useMemo, useRef, useCallback } from 'react';
import '../assets/styles/components/Characters.css'
import { useTheme } from '../context/ThemeContext';
import Search from './Search';

const initialState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITE':
      if (state.favorites.includes(action.payload)) {
        return {
          ...state,
          favorites: [...state.favorites]
        }
      } else {
        return {
          ...state,
          favorites: [...state.favorites, action.payload]
        }

      }
    case 'DELETE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.id !== action.payload)
      }
    default:
      return state;
  }
}

const Characters = () => {

  const [characters, setCharacters] = useState([]);
  // este favorites es en realidad este initialState que pasamos dsede arriba y dispatch son los reducers, que aqui vemos que osn favoriteReducer
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  const { darkmode } = useTheme();
  const API = 'https://rickandmortyapi.com/api/character'
  useEffect(() => {
    fetch(API)
    .then(response => response.json())
    .then(data => setCharacters(data.results))
  },[]);

  const handleClick = favorite => {
    dispatch({type: 'ADD_TO_FAVORITE', payload: favorite})
  }

  const removeFavorite = favorite => {
    dispatch({type: 'DELETE_FAVORITE', payload: favorite})
  }
  
  // sin CALLBACK
  // const handleSearch = () => {
  //   setSearch(searchInput.current.value)
  // }
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, [])
  

  // const filteredUsers = characters.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // })

  // con useMemo con state y ref
  // una indicamos la función y los valores que debe recordar
  // en este caso de characters, debe recordar el calor de serach
  const filteredUsers = useMemo(() => 
    characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
    }), [characters, search]
  )


  return (
    <>
    <h1>Favoritos</h1>
    <div className='characters'>
      {
        // aqui, del hook, pasamos favorites.favorites porque la variable donde guardamos el initialState es favorites y .favorites porque allí está la lista
        favorites.favorites.map(favorite => (
          // <li key={favorite.id}>
          //   {favorite.name}
          // </li>
          <div key={favorite.id} className='character_item'>
          <img src={favorite.image} alt=""/>
          <h3>{favorite.name}</h3>
          <p><b>Status:</b> 
            {favorite.status === 'Alive' ? 
            `😎  ${favorite.status}` : 
            favorite.status === 'Dead' ? 
            `👻  ${favorite.status}` : 
            `🤷🏻‍♂️  ${favorite.status}`  }
          </p>
          <p><b>Specie:</b> {favorite.species}</p>
          <p><b>Gender:</b> {favorite.gender}</p>
          <p><b>Location:</b> {favorite.location.name}</p>
          <button className={darkmode ? 'common-btn_dark' : 'common-btn'} type='button' onClick={() => {removeFavorite(favorite.id)}} >Eliminar de favoritos</button>
        </div>
        ))
      }
    <Search search={search} searchInput={searchInput} handleSearch={handleSearch}/>
    </div>
    <h1>Todos los personajes</h1>
    <div className='characters'>
      {/* cambiamos la estructura de characters a filteredUsers ya que aqui llamamos a los usuarios filtrados */}
      {
        // characters.map((character, key) => (
        filteredUsers.map((character, key) => (
          <div key={key} className='character_item'>
            <img src={character.image} alt=""/>
            <h3>{character.name}</h3>
            <p><b>Status:</b> 
              {character.status === 'Alive' ? 
              `😎  ${character.status}` : 
              character.status === 'Dead' ? 
              `👻  ${character.status}` : 
              `🤷🏻‍♂️  ${character.status}`  }
            </p>
            <p><b>Specie:</b> {character.species}</p>
            <p><b>Gender:</b> {character.gender}</p>
            <p><b>Location:</b> {character.location.name}</p>
            <button className={darkmode ? 'common-btn_dark' : 'common-btn'} type='button' onClick={() => {handleClick(character)}} >Agregar a Favoritos</button>
          </div>
        ))
      }
    </div>
    </>
  );
};

export default Characters;