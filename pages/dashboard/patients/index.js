import Layout from "@/Components/Layout";
import { db } from "@/lib/firebase";
import { format } from "date-fns";
import {
  collection,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const Patients = () => {
  const [lastVisible, setLastVisible] = useState(null);
  const [dataList, setDataList] = useState();
  const [loadingList, setLoadingList] = useState();
  const [count, setCount] = useState(0);

  const queryRef = query(
    collection(db, "patientDetails"),
    orderBy("createdAt", "desc"),
    limit(10),
    startAfter(lastVisible ? lastVisible : "")
  );

  const [dataSnapshot, loading, error] = useCollection(queryRef);

  useEffect(() => {
    if (loading) {
      setLoadingList(true);
    }
    if (dataSnapshot) {
      setDataList(dataSnapshot);
      setLoadingList(false);
    }
  }, [dataSnapshot]);

  if (loadingList) {
    return (
      <Layout>
        <Head>
          <title>Patients | Gwinnett Psychiatry</title>
        </Head>
        <div className="h-full max-w-screen-xl mx-auto my-10 px-12 2xl:px-0">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Head>
          <title>Patients | Gwinnett Psychiatry</title>
        </Head>
        <div className="h-full max-w-screen-xl mx-auto my-10 px-12 2xl:px-0">
          <p>Some error occured...</p>
        </div>
      </Layout>
    );
  }

  if (dataSnapshot) {
    const handleNextPage = () => {
      if (dataList && dataList.docs.length > 0) {
        const lastDoc = dataList.docs[dataList.docs.length - 1];
        setLastVisible(lastDoc);
        setCount(count + 1);
      }
    };

    const handlePreviousPage = async () => {
      if (dataList && dataList.docs.length > 0) {
        setLoadingList(true);
        const firstDoc = dataList.docs[0];
        console.log("First Doc: ", firstDoc.id);
        // console.log("Last 8 -", dataSnapshot.docs.length - 7);

        const prevQueryRef = query(
          collection(db, "patientDetails"),
          orderBy("createdAt", "desc"),
          limitToLast(10),
          // startAfter(dataSnapshot?.docs[dataSnapshot.docs.length - 6]),
          endBefore(firstDoc)
        );

        const querySnapshot = await getDocs(prevQueryRef);
        console.log("Query Snapshot -", querySnapshot.docs);
        setDataList(querySnapshot);
        setLoadingList(false);
        if (querySnapshot) {
          setCount(count - 1);
        }

        // const prevData = useCollectionOnce(prevQueryRef);
        // if (querySnapshot && querySnapshot.docs.length > 0) {
        //   setLastVisible(querySnapshot.docs[0]);
        // }
      }
    };

    return (
      <Layout>
        <Head>
          <title>Patients | Gwinnett Psychiatry</title>
        </Head>
        <div className="max-w-screen-xl mx-auto my-10 px-12 2xl:px-0">
          <table className="text-sm w-full table-auto border-separate border-spacing-0 rounded overflow-y-auto bg-white border border-slate-200">
            <thead className="text-slate-500 text-left">
              <tr className="bg-slate-100 h-12">
                <th className="border-b border-slate-100 pl-8">Patient Name</th>
                <th className="border-b border-slate-100">Form type</th>
                <th className="border-b border-slate-100">Submission Date</th>
                <th className="border-b border-slate-100">Gender</th>
                <th className="border-b border-slate-100">DOB</th>
                <th className="border-b border-slate-100">Phone number</th>
                <th className="border-b border-slate-100">Email</th>
                <th className="border-b border-slate-100">City</th>
              </tr>
            </thead>
            <tbody className="text-slate-900">
              {dataList?.docs.map((doc) => (
                <tr
                  className="h-16 hover:bg-slate-50 cursor-pointer relative"
                  key={doc.id}
                >
                  <td className="border-b border-slate-100 pl-8">
                    {doc.data()?.formType === "Adult" && (
                      <>
                        {doc.data()?.patientRegistrationAdult?.patientFirstName}{" "}
                        {doc.data()?.patientRegistrationAdult?.patientLastName}{" "}
                        <Link href={`/dashboard/patients/${doc.id}`}>
                          <span className="absolute top-0 left-0 h-full w-full"></span>
                        </Link>
                      </>
                    )}
                    {doc.data()?.formType === "Child" && (
                      <>
                        {
                          doc.data()?.patientRegistrationChild
                            ?.patientChildFirstName
                        }{" "}
                        {
                          doc.data()?.patientRegistrationChild
                            ?.patientChildLastName
                        }{" "}
                        <Link href={`/dashboard/patients/${doc.id}`}>
                          <span className="absolute top-0 left-0 h-full w-full"></span>
                        </Link>
                      </>
                    )}
                  </td>
                  <td className="border-b border-slate-100">
                    <span
                      className={`${
                        doc.data()?.formType === "Child"
                          ? "bg-amber-100"
                          : "bg-cyan-100"
                      }  px-2 py-1`}
                    >
                      {doc.data()?.formType}
                    </span>
                  </td>
                  <td className="border-b border-slate-100">
                    {doc.data().formType === "Adult" && (
                      <>{format(doc.data().createdAt.toDate(), "MM/dd/yyyy")}</>
                    )}
                    {doc.data().formType === "Child" && (
                      <>{format(doc.data().createdAt.toDate(), "MM/dd/yyyy")}</>
                    )}
                  </td>
                  <td className="border-b border-slate-100">
                    {doc.data().formType === "Adult" && (
                      <>{doc.data()?.patientRegistrationAdult?.patientGender}</>
                    )}
                    {doc.data().formType === "Child" && (
                      <>{doc.data()?.patientRegistrationChild?.patientGender}</>
                    )}
                  </td>
                  <td className="border-b border-slate-100">
                    {doc.data().formType === "Adult" && (
                      <>
                        {doc.data()?.patientRegistrationAdult?.patientDOB &&
                          doc.data()?.patientRegistrationAdult?.patientDOB}
                      </>
                    )}
                    {doc.data().formType === "Child" && (
                      <>
                        {doc.data()?.patientRegistrationChild
                          ?.patientChildDOB &&
                          doc.data()?.patientRegistrationChild?.patientChildDOB}
                      </>
                    )}
                  </td>
                  <td className="border-b border-slate-100">
                    {doc.data().formType === "Adult" && (
                      <>
                        {doc.data()?.patientRegistrationAdult?.patientHomePhone}
                      </>
                    )}
                    {doc.data().formType === "Child" && (
                      <>{doc.data()?.patientRegistrationChild?.patientNumber}</>
                    )}
                  </td>
                  <td className="border-b border-slate-100">
                    {doc.data().formType === "Adult" && (
                      <>
                        {
                          doc.data()?.demographicAdult
                            ?.patientpersonalInformationEmail
                        }
                      </>
                    )}
                    {doc.data().formType === "Child" && (
                      <>
                        {
                          doc.data()?.demographicChild
                            ?.patientpersonalInformationEmail
                        }
                      </>
                    )}
                  </td>
                  <td className="border-b border-slate-100">
                    {doc.data().formType === "Adult" && (
                      <>{doc.data()?.patientRegistrationAdult?.patientCity}</>
                    )}
                    {doc.data().formType === "Child" && (
                      <>
                        {
                          doc.data()?.patientRegistrationChild
                            ?.patientAddressCity
                        }
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right text-sm font-medium space-x-3.5 mt-6">
            <button
              className="bg-white py-2.5 px-4 border border-slate-300 rounded text-indigo-950 hover:bg-indigo-100 transition-all ease-in-out disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
              onClick={handlePreviousPage}
              // disabled={disablePrev}
              disabled={count == 0 ? true : false}
            >
              Previous
            </button>

            <button
              className="bg-indigo-700 py-2.5 px-4 rounded text-white hover:bg-indigo-800 transition-all ease-in-out disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-indigo-700"
              onClick={handleNextPage}
              // disabled={disableNext}
              disabled={dataList?.docs?.length < 10 ? true : false}
            >
              Next
            </button>
          </div>
        </div>
      </Layout>
    );
  }
};

export default Patients;
