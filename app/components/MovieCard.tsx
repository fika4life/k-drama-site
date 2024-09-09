import { TiStarFullOutline } from 'react-icons/ti';
export default function MovieCard({ movie }) {
  const { name, overview, poster_path, vote_average, vote_count } = movie;
  return (
    <div className="relative mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
      <div>
        <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          className="w-full object-cover"
          alt=""
        />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black"></div>
      <div className="absolute inset-x-0 bottom-0 z-20 p-4">
        <p className="mb-1 text-sm text-white text-opacity-80 align-text-top">
          <TiStarFullOutline className="inline mr-1 " />
          {vote_average}• {vote_count} votes
        </p>
        <h3 className="text-xl font-medium text-white">{name}</h3>
        <p className="mt-1 text-white text-opacity-80 line-clamp-4">
          {overview}
        </p>
      </div>
    </div>
  );
}
