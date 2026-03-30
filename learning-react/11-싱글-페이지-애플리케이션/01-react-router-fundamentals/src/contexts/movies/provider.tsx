import type React from "react";
import { MoviesContext } from "./context";
import { useState } from "react";
import { DUMMY_MOVIES, type Movie } from "@/db/movies";

export function MoviesProvider(props: React.PropsWithChildren) {
  const [movies] = useState<Movie[]>(DUMMY_MOVIES);

  const moviesContextValue = { movies };
  return <MoviesContext value={moviesContextValue} {...props} />;
}
