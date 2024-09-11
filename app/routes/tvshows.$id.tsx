import { useLoaderData } from 'react-router';
import { TiStarFullOutline } from 'react-icons/ti';

export async function loader({ params }) {
  const response = await fetch(`https://api.themoviedb.org/3/tv/${params.id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`
    }
  });

  const data = await response.json();
  console.log(data);
  return data;
}

export default function TVShowDetails() {
  const movie = useLoaderData();
  return (
    <>
      <div className="h-80 overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="space-y-2 w-1/2">
        <h1 className="text-2xl mt-8 font-bold">{movie.name}</h1>
        <p>
          Seasons: {movie.number_of_seasons} | Episodes:{' '}
          {movie.number_of_episodes}
        </p>
        <p></p>
        <p>
          <TiStarFullOutline className=" inline " /> {movie.vote_average} |{' '}
          {movie.vote_count} votes
        </p>
        <h2 className="text-xl font-bold">Overview</h2>
        <p>{movie.overview}</p>
      </div>
    </>
  );
}
