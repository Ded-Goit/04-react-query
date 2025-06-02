import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleFormAction = async (query: string) => {
    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    setLoading(true);
    setError(false);
    setMovies([]);

    try {
      const movies = await fetchMovies(query);
      if (movies.length === 0) {
        toast.error("No movies found for your request.");
      } else {
        setMovies(movies);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.app}>
      <Toaster />
      <SearchBar onSubmit={handleFormAction} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
