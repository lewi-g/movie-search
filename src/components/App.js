import React, { useReducer, useEffect } from 'react'
import './App.css'
import Header from './header'
import Movie from './movie'

const MOVIE_API_URL = 'http://www.omdbapi.com/?s=woman&apikey=7b3030fb'

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null
      }
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload
      }
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.Error
      }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        jsonResponse.Search.forEach(movie => getMovieData(movie))
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: jsonResponse.Search
        })
      })
  }, [])

  const search = searchValue => {
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST'
    })

    fetch(
      `https://www.omdbapi.com/?apikey=7b3030fb&s=${searchValue}`
    )
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === 'True') {
          jsonResponse.Search.forEach(movie => getMovieData(movie))
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: jsonResponse.Search
          })
        } else {
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE',
            payload: jsonResponse.Error
          })
        }
      })
    }
  

  const getMovieData = movie => {
    fetch(`http://www.omdbapi.com/?apikey=7b3030fb&i=${movie.imdbID}`)
      .then(response => response.json())
      .then(jsonResponse => {
        movie.Plot = jsonResponse.Plot
        movie.Ratings = jsonResponse.Ratings
        movie.Runtime = jsonResponse.Runtime
      })
  }

  const { movies, errorMessage, loading } = state

  return (
    <div className="App">
      <Header text="Movie Search" search={search} />
      <p className="App-intro">WOOO! React Hooks! And Movies!</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading ...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  )
}

export default App
