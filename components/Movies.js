import style from '../styles/Home.module.css'

function ListOfMovies ({ movies }) {
    return(
        <ul className={style.movies}>
            {
            movies.map(movie => (
              <li className={style.movie} key={movie.id}>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <img src={movie.image} alt={movie.title} />
              </li>
            ))
            }
        </ul>
    )
}

function NoMoviesResults() {
    return(
        <p>No movies found for this search. </p>
    )
}

export function Movies({ movies }) {
    const hasMovies = movies?.length > 0

    return( hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />)
}