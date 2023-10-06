import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-zinc-900 text-white py-3 mb-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h3 className="text-3xl">Voting System</h3>
        </Link>
        <ul className="flex gap-3">
          <li>
            <Link href="/login" className="text-sky-500 hover:text-sky-400">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="text-sky-500 hover:text-sky-400">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
