import type { MetaFunction } from '@remix-run/node';

import { useLoaderData } from '@remix-run/react';
import MovieCard from '../components/MovieCard';

export const meta: MetaFunction = () => {
  return [
    { title: 'Korean Drama Database App' },
    { name: 'description', content: 'Welcome to the Korean drama database' }
  ];
};

export const loader = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=ko`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`
      }
    }
  );

  const data = await response.json();

  return data;
};

export default function Index() {
  const { results: movies } = useLoaderData();

  return (
    <main className="my-8">
      <div className="text-4xl text-center font-bold mb-8">
        Trending Korean Dramas
      </div>
      <div className="grid grid-cols-3 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
