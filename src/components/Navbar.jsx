'use client'
import Link from "next/link";
import { useVotingSystemStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Navbar() {
  useEffect(() => {
    useVotingSystemStore.persist.rehydrate();
  }, []);
  const { isLoggedIn, logout, role } = useVotingSystemStore();
  const router = useRouter();
  const HandleLogout = () => {
    logout();
    router.push('/login');

  }
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, []);
  return (
    <nav className="bg-zinc-900 text-white py-3 mb-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h3 className="text-3xl">Voting System</h3>
        </Link>
        <ul className="flex gap-3">
          { isLoggedIn && (role === 'admin' || role === 'operator') &&
          <li className={`text-white hover:text-sky-400 border-solid border-red-600 border-2 p-3`}>
            <Link href="/user/[id]/register" as='/user/1/register' className={`text-white hover:text-sky-400`}>
              Registrar Acta
            </Link>
          </li> }
          { isLoggedIn && (role === 'admin' || role === 'operator' || role==='report') &&
          <li className={`text-sky-500 hover:text-sky-400 border-solid border-red-600 border-2 p-3`}>
            <Link href="/dashboard/presidente" className={`text-white hover:text-sky-400`}>
              Presidente/a
            </Link>
          </li> }
          { !isLoggedIn &&
          <li className="border-solid border-red-600 border-2 p-3">
            <Link href="/login" className="text-white hover:text-sky-400 ">
              Login
            </Link>
          </li>}
          { isLoggedIn &&
          <li className={`text-sky-500 hover:text-sky-400 border-solid border-red-600 border-2 p-3`}>
            <button onClick={HandleLogout} className="text-white hover:text-sky-400">Cerrar sesión</button>
          </li> }
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;