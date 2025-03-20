import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Field, Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import React from "react";
import { object, string } from "yup";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  // const router = useRouter();

  if (loading) {
    return (
      <>
        <Head>
          <title>Gwinnett Psychiatry</title>
        </Head>
        <div className="p-6 font-medium text-sm">
          <p>Initializing...</p>
        </div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Head>
          <title>Gwinnett Psychiatry</title>
        </Head>
        <div className="p-6 font-medium text-sm">
          <p>Error occurred. Contact administrator.</p>
        </div>
      </>
    );
  }
  if (user) {
    return (
      <>
        <Head>
          <title>Gwinnett Psychiatry</title>
        </Head>
        <UserSignedIn user={user} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Sign in | Gwinnett Psychiatry</title>
      </Head>
      <LogInForm />
    </>
  );
};

export default Dashboard;

const LogInForm = () => {
  const initialValues = {
    email: "",
    password: "",
    remember_me: true,
  };

  const router = useRouter();

  const validationSchema = object({
    email: string().required("Required").email(),
    password: string().required("Required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    if (values.remember_me) {
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
              setSubmitting(false);
              toast.success("Logged in successfully.");
              router.push("/dashboard/patients");
            })
            .catch((error) => {
              setSubmitting(false);
              console.log(error.code);
              console.log(error.message);
              toast.error("Invalid credentials.");
              signOut(auth);
            });
        })
        .catch((error) => {
          setSubmitting(false);
          console.log(error.code);
          console.log(error.message);
        });
    } else {
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
              setSubmitting(false);
              toast.success("Logged in successfully.");
              router.push("/dashboard/patients");
            })
            .catch((error) => {
              setSubmitting(false);
              console.log(error.code);
              console.log(error.message);
              toast.error("Invalid credentials.");
              signOut(auth);
            });
        })
        .catch((error) => {
          setSubmitting(false);
          console.log(error.code);
          console.log(error.message);
        });
    }
    setTimeout(() => {
      setSubmitting(false);
    }, 2000);
  };

  return (
    <main className="flex items-center justify-center h-screen bg-slate-50">
      <div className="bg-white p-12 w-1/4 shadow-[0px_8px_16px_#1E293B1A] rounded">
        <h2 className="text-slate-900 font-bold text-2xl mb-7">Sign In</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col gap-2.5 mb-6">
                <label
                  htmlFor="email"
                  className="text-sm text-slate-700 font-medium"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full border-slate-300 rounded placeholder:text-slate-400 placeholder:text-sm"
                  placeholder="Eg. john@gmail.com"
                  required
                />
              </div>
              <div className="flex flex-col gap-2.5 mb-8">
                <label
                  htmlFor="password"
                  className="text-sm text-slate-700 font-medium"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full border-slate-300 rounded placeholder:text-slate-400 placeholder:text-sm"
                  placeholder="******"
                  required
                />
              </div>

              <div className="flex items-center justify-between mb-9">
                <div className="flex items-center">
                  <Field
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded inline-block cursor-pointer"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-slate-500 font-medium cursor-pointer"
                  >
                    Remember me for 30 days
                  </label>
                </div>

                {/* <a
                  href="#"
                  className="text-xs text-indigo-700 hover:text-indigo-800"
                >
                  Forgot your password?
                </a> */}
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-indigo-700 rounded w-full py-3.5 text-sm font-medium text-white"
                  disabled={isSubmitting}
                >
                  Sign in
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

function UserSignedIn({ user }) {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
        <div className="max-w-sm w-full">
          <div className="mt-8 bg-white p-10 shadow-[0px_8px_16px_#1E293B1A] rounded">
            <div className="text-center">
              <p className="text-sm ">You are signed in as {user?.email}.</p>
              <button className="mt-4 text-blue-600 text-sm font-medium">
                <Link href="/dashboard/patients">Go to Dashboard &rarr;</Link>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
