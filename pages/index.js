import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Gwinnett Psychiatry</title>
      </Head>
      <main className="w-full min-h-screen flex justify-center items-center">
        <Image
          className="mx-auto w-auto"
          src="/assets/logo-dark-1.svg"
          alt="Gwinnett Psychiatry"
          width={173}
          height={121}
          priority
        />
      </main>
    </>
  );
}
