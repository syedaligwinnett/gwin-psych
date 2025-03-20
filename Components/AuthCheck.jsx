import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

export default function AuthCheck({ children }) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div className="p-6 font-medium text-sm min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-6 font-medium text-sm">
        <p>Error occurred. Contact administrator.</p>
      </div>
    );
  }
  if (user) {
    return <>{children}</>;
  }
  return <ShowLoginMessage />;
}

function ShowLoginMessage() {
  return (
    <>
      <Head>
        <title>Sign in | Gwinnett Psychiatry</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex mx-auto items-center justify-center">
              <Image
                className="mx-auto w-auto"
                src="/assets/logo-dark-1.svg"
                alt="Gwinnett Psychiatry"
                width={173}
                height={121}
                priority
              />
            </div>
            <p className="my-8">You must be signed in to access this page!</p>
            <button className="bg-indigo-700 rounded px-4 py-3.5 text-sm font-medium text-white">
              <Link href={`/login`}>Sign In</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
