import AdultDemographicCard from "@/Components/DashboardDetailForms/AdultDemographicCard";
import AdultDetail from "@/Components/DashboardDetailForms/AdultDetail";
import ChildDemographicCard from "@/Components/DashboardDetailForms/ChildDemographicCard";
import ChildDetail from "@/Components/DashboardDetailForms/ChildDetail";
import Layout from "@/Components/Layout";
import { db } from "@/lib/firebase";
import { faArrowDownToLine } from "@fortawesome/pro-light-svg-icons";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { doc } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";

const PatientDetail = () => {
  const router = useRouter();
  const [section, setSection] = useState(1);
  const { id } = router.query;
  const docRef = doc(db, "patientDetails", `${id}`);
  const [dataSnapshot, loading, error] = useDocument(docRef);

  const PrintDiv = () => {
    var printContents = document?.getElementById(`PrintMe`)?.innerHTML;
    var originalContents = document.body.innerHTML;
    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
    router.reload();
  };

  if (loading) {
    return (
      <Layout>
        <Head>
          <title>Gwinnett Psychiatry</title>
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
          <title>Gwinnett Psychiatry</title>
        </Head>
        <div className="h-full max-w-screen-xl mx-auto my-10 px-12 2xl:px-0">
          <p>Some error occured...</p>
        </div>
      </Layout>
    );
  }

  if (dataSnapshot && dataSnapshot.data()) {
    console.log("Registration-", dataSnapshot.data().patientRegistrationAdult);
    console.log("patient Consent-", dataSnapshot.data().patientConsentAdult);
    console.log("privacy Policy-", dataSnapshot.data().privacyPolicyAdult);
    console.log(
      "responsibilityStmt-",
      dataSnapshot.data().responsibilityStmtAdult
    );
    console.log("feeSchedule-", dataSnapshot.data().feeScheduleAdult);
    console.log(
      "cancellation Policy-",
      dataSnapshot.data().cancellationPolicyAdult
    );
    console.log("demographic-", dataSnapshot.data().demographicAdult);
    console.log("telepsychiatry-", dataSnapshot.data().telepsychiatryAdult);
    console.log("questionaire-", dataSnapshot.data().questionaireAdult);
    return (
      <Layout>
        <Head>
          {dataSnapshot.data().formType === "Adult" && (
            <title>
              {dataSnapshot.data()?.patientRegistrationAdult?.patientFirstName}{" "}
              {dataSnapshot.data()?.patientRegistrationAdult?.patientLastName} |
              Gwinnett Psychiatry
            </title>
          )}

          {dataSnapshot.data().formType === "Child" && (
            <title>
              {
                dataSnapshot.data()?.patientRegistrationChild
                  ?.patientChildFirstName
              }{" "}
              {
                dataSnapshot.data()?.patientRegistrationChild
                  ?.patientChildLastName
              }{" "}
              | Gwinnett Psychiatry
            </title>
          )}
        </Head>
        <div className="max-w-screen-xl mx-auto my-10 px-12 2xl:px-0">
          <button
            className="text-slate-500 text-sm font-medium hover:text-slate-600"
            onClick={() => router.back()}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              size="sm"
              className="mr-1.5"
            />
            back to patient list
          </button>

          <div className="mt-7 w-full flex items-start gap-9">
            <div className="w-[340px] sticky top-5">
              <div className="bg-white border border-slate-200 rounded px-6 py-5 mb-3">
                {dataSnapshot.data().formType === "Adult" && (
                  <AdultDemographicCard dataSnapshot={dataSnapshot} />
                )}
                {dataSnapshot.data().formType === "Child" && (
                  <ChildDemographicCard dataSnapshot={dataSnapshot} />
                )}
                <table className="text-sm font-medium">
                  <tbody>
                    <tr>
                      <td className="text-slate-500 pb-4">Email ID:</td>
                      <td className="pl-10 pb-4">
                        {dataSnapshot.data().formType === "Adult" && (
                          <>
                            {
                              dataSnapshot.data()?.demographicAdult
                                ?.patientpersonalInformationEmail
                            }
                          </>
                        )}
                        {dataSnapshot.data().formType === "Child" && (
                          <>
                            {
                              dataSnapshot.data()?.demographicChild
                                ?.patientpersonalInformationEmail
                            }
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-500 pb-4">Phone No:</td>
                      <td className="pl-10 pb-4">
                        {dataSnapshot.data().formType === "Adult" && (
                          <>
                            {
                              dataSnapshot.data()?.patientRegistrationAdult
                                ?.patientHomePhone
                            }
                          </>
                        )}
                        {dataSnapshot.data().formType === "Child" && (
                          <>
                            {
                              dataSnapshot.data()?.patientRegistrationChild
                                ?.patientNumber
                            }
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-500 pb-4">DOB:</td>
                      <td className="pl-10 pb-4">
                        {dataSnapshot.data().formType === "Adult" && (
                          <>
                            {dataSnapshot.data()?.patientRegistrationAdult
                              ?.patientDOB &&
                              dataSnapshot.data()?.patientRegistrationAdult
                                ?.patientDOB}
                          </>
                        )}
                        {dataSnapshot.data().formType === "Child" && (
                          <>
                            {dataSnapshot.data()?.patientRegistrationChild
                              ?.patientChildDOB &&
                              dataSnapshot.data()?.patientRegistrationChild
                                ?.patientChildDOB}
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-500">City:</td>
                      <td className="pl-10">
                        {dataSnapshot.data().formType === "Adult" && (
                          <>
                            {
                              dataSnapshot.data()?.patientRegistrationAdult
                                ?.patientCity
                            }
                          </>
                        )}
                        {dataSnapshot.data().formType === "Child" && (
                          <>
                            {
                              dataSnapshot.data()?.patientRegistrationChild
                                ?.patientAddressCity
                            }
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-100 border border-slate-200 rounded overflow-hidden">
                <h4 className="text-sm font-semibold px-6 py-3.5 text-slate-800">
                  Table of content
                </h4>
                <div className="bg-white w-full h-full p-6 space-y-2.5 text-sm text-slate-500">
                  <button
                    className={`px-4 py-3.5 hover:bg-indigo-50 hover:text-slate-950 rounded w-full text-left transition-all ease-in-out ${
                      section === 1 ? "bg-indigo-50 text-slate-950" : ""
                    }`}
                    onClick={() => setSection(1)}
                  >
                    Registration
                  </button>
                  <button
                    className={`px-4 py-3.5 hover:bg-indigo-50 hover:text-slate-950 rounded w-full text-left transition-all ease-in-out ${
                      section === 2 ? "bg-indigo-50 text-slate-950" : ""
                    }`}
                    onClick={() => setSection(2)}
                  >
                    Patient E-Prescibe
                  </button>
                  <button
                    className={`px-4 py-3.5 hover:bg-indigo-50 hover:text-slate-950 rounded w-full text-left transition-all ease-in-out ${
                      section === 3 ? "bg-indigo-50 text-slate-950" : ""
                    }`}
                    onClick={() => setSection(3)}
                  >
                    Consent For Telepsychiatry
                  </button>
                  <button
                    className={`px-4 py-3.5 hover:bg-indigo-50 hover:text-slate-950 rounded w-full text-left transition-all ease-in-out ${
                      section === 4 ? "bg-indigo-50 text-slate-950" : ""
                    }`}
                    onClick={() => setSection(4)}
                  >
                    {dataSnapshot.data().formType === "Adult" &&
                      "Adult Questionaire"}
                    {dataSnapshot.data().formType === "Child" &&
                      "Child History"}
                  </button>
                  <button
                    className={`px-4 py-3.5 hover:bg-indigo-50 hover:text-slate-950 rounded w-full text-left transition-all ease-in-out ${
                      section === 5 ? "bg-indigo-50 text-slate-950" : ""
                    }`}
                    onClick={() => setSection(5)}
                  >
                    Insurance Card
                  </button>
                  <button
                    className={`px-4 py-3.5 hover:bg-indigo-50 hover:text-slate-950 rounded w-full text-left transition-all ease-in-out ${
                      section === 6 ? "bg-indigo-50 text-slate-950" : ""
                    }`}
                    onClick={() => setSection(6)}
                  >
                    Drivers License/ID
                  </button>
                  {dataSnapshot.data().formType === "Child" && (
                    <button
                      className={`px-4 py-3.5 hover:bg-indigo-50 hover:text-slate-950 rounded w-full text-left transition-all ease-in-out ${
                        section === 7 ? "bg-indigo-50 text-slate-950" : ""
                      }`}
                      onClick={() => setSection(7)}
                    >
                      Additional Documents
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div
              className="bg-white border border-slate-200 rounded py-8 flex-auto relative print:py-0"
              id="PrintMe"
            >
              <div className="max-w-2xl mx-auto text-center print:max-w-none">
                {dataSnapshot.data().formType === "Adult" && (
                  <AdultDetail section={section} dataSnapshot={dataSnapshot} />
                )}
                {dataSnapshot.data().formType === "Child" && (
                  <ChildDetail section={section} dataSnapshot={dataSnapshot} />
                )}
              </div>

              <div className="sticky bottom-12 mr-12 text-right print:hidden">
                <button
                  className="bg-indigo-700 h-9 w-9 rounded-full hover:bg-indigo-800 text-white"
                  onClick={PrintDiv}
                >
                  <FontAwesomeIcon icon={faArrowDownToLine} />
                </button>
              </div>
            </div>
          </div>

          <div className="text-right text-sm font-medium space-x-3.5 mt-6">
            <button
              className="bg-white py-2.5 px-4 border border-slate-300 rounded text-indigo-950 hover:bg-indigo-100 transition-all ease-in-out disabled:opacity-50 disabled:hover:bg-white disabled:cursor-not-allowed"
              onClick={() => setSection(section - 1)}
              disabled={section == 1 ? true : false}
            >
              Previous
            </button>
            {dataSnapshot.data().formType === "Child" && (
              <button
                className="bg-indigo-700 py-2.5 px-4 rounded text-white hover:bg-indigo-800 transition-all ease-in-out disabled:opacity-50 disabled:hover:bg-indigo-700 disabled:cursor-not-allowed"
                onClick={() => setSection(section + 1)}
                disabled={section == 7 ? true : false}
              >
                Next
              </button>
            )}
            {dataSnapshot.data().formType === "Adult" && (
              <button
                className="bg-indigo-700 py-2.5 px-4 rounded text-white hover:bg-indigo-800 transition-all ease-in-out disabled:opacity-50 disabled:hover:bg-indigo-700 disabled:cursor-not-allowed"
                onClick={() => setSection(section + 1)}
                disabled={section == 6 ? true : false}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </Layout>
    );
  }
  return <></>;
};

export default PatientDetail;
