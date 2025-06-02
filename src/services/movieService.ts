import axios, { type AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = `https://api.themoviedb.org/3/search/movie`;
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  if (!query.trim()) return [];

  try {
    const response: AxiosResponse<FetchMoviesResponse> = await axios.get(
      BASE_URL,
      {
        params: { query },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("error", error);
    return [];
  }
};
