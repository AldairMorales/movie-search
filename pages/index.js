
import { Inter } from 'next/font/google'
import style from '../styles/Home.module.css'
import responseMovies from '../mocks/with-results.json'

import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const movies = responseMovies.Search
  const hasMovies = movies?.lenght > 0

  return (
    <div className={style.page}>
      <header className={style.header}>
        <h1>Buscador de imagenes</h1>
        <form className={style.form}>
          <input placeholder='Advengers, Mario bross...'/>
          <button>Search</button>
        </form>
      </header>
      <main className='main'>
        {
          
            <ul>
              {
                movies.map(movie => (
                  <l1 key={movie.imdbID}>
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                    <img src={movie.Poster} alt={movie.Title} />
                  </l1>
                ))
              }
            </ul>
        
        }
      </main>
    </div>
  )
}
