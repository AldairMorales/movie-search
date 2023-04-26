import style from '../styles/Home.module.css'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Movies } from '@/components/Movies'
import { useMovies } from '@/hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch (){
  const [ search, updateSearch ] = useState('')
  const [ error, setError ] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {

    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('You cannot search for an empty movie.')
    }
    if (search.match(/\d+$/)) {
      setError('You cannot search for a movie with a number.')
    }
  },[search])

  return [ search, updateSearch, error]
}

export default function Home() {
  const [ search, updateSearch, error ] = useSearch()
  const { movies, isLoading, getMovies } = useMovies({search})

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies(search)
    }, 500)
  ,[getMovies])
  
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies(search)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
   debouncedGetMovies(newSearch)
  }

  return (
    <div className={style.page}>
      <header className={style.header}>
        <h1>Film search engine</h1>
        <form className={style.form} onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} placeholder='Advengers, Mario bross...'/>
          <button type="submit">Search</button>
        </form>
      </header>
      <main className={style.main}>
        {
          isLoading ? <p>Loading...</p> : <Movies  movies={movies}/>
        }
      </main>
    </div>
  )
}
