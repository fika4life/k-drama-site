import { Link } from '@remix-run/react';

export default function Navbar() {
  return (
    <nav className="my-4">
      <Link to="/" className="text-xl font-bold">
        K-drama <span className="text-sky-400">DB</span>
      </Link>
    </nav>
  );
}
