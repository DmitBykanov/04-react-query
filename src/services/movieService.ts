import axios from "axios";
import type { Movie } from "../types/movie";

const Token = import.meta.env.VITE_TMDB_TOKEN;

interface MovieHttpResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const moviesInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/search",
  headers: {
    Authorization: `Bearer ${Token}`,
  },
});

const fetchMovies = async (
  movie: string,
  page: number
): Promise<MovieHttpResponse> => {
  if (!movie.trim()) {
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }

  const response = await moviesInstance.get<MovieHttpResponse>("/movie", {
    params: { query: movie, page },
  });

  return response.data;
};
export default fetchMovies;
