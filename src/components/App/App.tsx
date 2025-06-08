import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/movieService";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import type { FetchMoviesResponse } from "../../services/movieService";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

type PageChangeEvent = { selected: number };
export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleFormAction = (newQuery: string) => {
    if (!newQuery) {
      toast.error("Please enter your search query.");
      return;
    }

    setQuery(newQuery);
    setPage(1);
  };
  const handlePageChange = ({ selected }: PageChangeEvent) => {
    setPage(selected + 1);
  };

  const { data, isLoading, isError, isSuccess } = useQuery<
    FetchMoviesResponse,
    Error
  >({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.length > 0,
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (isSuccess && data && data.results.length === 0) {
      toast("No movies found for your request.");
    }
  }, [isSuccess, data]);

  return (
    <div className={styles.app}>
      <Toaster />
      <SearchBar onSubmit={handleFormAction} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data && data.results.length > 0 && (
        <>
          {data.total_pages > 1 && (
            <ReactPaginate
              pageCount={data.total_pages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              forcePage={page - 1}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
          <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
        </>
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
