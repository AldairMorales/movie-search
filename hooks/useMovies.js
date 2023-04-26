import { useState, useRef, useCallback } from 'react'
import { searchMovies } from '@/services/movies'

export function useMovies ( { search }) {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search)
    

    const getMovies = useCallback(async(search) => {
        if(search === previousSearch.current) return

        try {
            setIsLoading(true)
            setError(null)
            previousSearch.current = search
            const newMovies = await searchMovies({ search })
            setMovies(newMovies)
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    },[])
  
    return { movies, getMovies, isLoading }
  }