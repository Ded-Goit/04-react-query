import axios, { type AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = `https://api.themoviedb.org/3/search/movie`;
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (
  query: string,
  page: number
): Promise<FetchMoviesResponse> => {
  if (!query.trim()) return { results: [], total_pages: 0 };

  try {
    const response: AxiosResponse<FetchMoviesResponse> = await axios.get(
      BASE_URL,
      {
        params: { query, page },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("error", error);
    return { results: [], total_pages: 0 };
  }
};
