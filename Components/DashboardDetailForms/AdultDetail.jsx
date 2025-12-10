import React from "react";
import Link from "next/link";
import { format } from "date-fns";

function AdultDetail({ section, dataSnapshot }) {
  switch (section) {
    case 1:
      return (
        <>
          <TermsAndCondtion />
          <PatientRegistration
            patientData={dataSnapshot.data()?.patientRegistrationAdult}
          />
          <PatientConsentForm
            patientData={dataSnapshot.data()?.patientConsentAdult}
          />
          <PrivacyPolicy
            patientData={dataSnapshot.data()?.privacyPolicyAdult}
          />
          <Responsibility
            patientData={dataSnapshot.data()?.responsibilityStmtAdult}
          />
          <FeeShcedule patientData={dataSnapshot.data()?.feeScheduleAdult} />
          <CancellationPolicy
            patientData={dataSnapshot.data()?.cancellationPolicyAdult}
          />
        </>
      );
      break;

    case 2:
      return (
        <Demographic patientData={dataSnapshot.data()?.demographicAdult} />
      );
      break;

    case 3:
      return (
        <Telepsychiatry
          patientData={dataSnapshot.data()?.telepsychiatryAdult}
        />
      );
      break;

    case 4:
      return (
        <Questionnaire patientData={dataSnapshot.data()?.questionaireAdult} />
      );
      break;

    case 5:
      return (
        <InsuranceCard
          patientData={dataSnapshot.data()?.insuranceCardDocument}
        />
      );
      break;

    case 6:
      return (
        <DrivingLicense
          patientData={dataSnapshot.data()?.drivingLicenseDocument}
        />
      );
      break;

    default:
      break;
  }
}

export default AdultDetail;

const TermsAndCondtion = () => {
  return (
    <>
      <h1 className="text-slate-900 text-xl font-semibold mb-2.5">
        Gwinnett Psychiatry, PC
      </h1>
      <div className="text-slate-700 text-xs mb-5">
        <span className="block">170 Camden Hill Road, Suite F</span>
        <span>Lawrenceville, GA 30046</span>
      </div>
      <div className="max-w-lg mx-auto flex items-center justify-between text-slate-700 text-xs font-medium mb-9">
        <span>Phone: (678) 226-2295</span>
        <span>
          <Link href={"https://gwinnettpsychiatry.com"}>
            www.gwinnettpsychiatry.com
          </Link>
        </span>
        <span>Fax: (678) 226-2296</span>
      </div>
      <h2 className="text-slate-900 font-bold mb-8 underline underline-offset-2">
        Terms and Conditions for Office & Tele-Medicine VISIT
      </h2>
      <article className="prose-sm text-left prose-ul:list-disc">
        <p>
          To ensure the safety and privacy of our patients, we are updating our
          policies:
        </p>
        <ul>
          <li>
            Patient required to return the “New Patient Paperwork”, along with
            the governmental picture ID and the picture of Insurance card(Front
            & Back), both picture ID and Insurance card must be emailed to the
            email address listed on the bottom of the last page of this
            paperwork. The rest of the paperwork can be sent to us by
            EMAIL/FAX/US MAIL. Once we receive the entire paperwork, we will
            call you to schedule.
          </li>
          <li>As for SELF PAY Patients, only picture ID is required</li>
          <li>Picture(s) of the paperwork is not ACCEPTED</li>
          <li>Two sided print out not accepted as well</li>
          <li>
            Patient must be present for every visit/session(insurance
            requirement)
          </li>
          <li>
            Patient(s) can <strong>NOT</strong> be in a public place. Its
            recommended that the patient be in a private place during the
            session to ensure the privacy and comfort.
          </li>
          <li>Patient must be properly dressed</li>
          <li>
            Patient(s) under the age of 17 must be accompanied with a
            parent/guardian. The parent/guardian must be on the patient(s)
            registration forms.
          </li>
          <li>
            Patient can <strong>NOT</strong> be driving or in a moving vehicle
          </li>
        </ul>
        <p>
          If these conditions are not met, the patient(s) will have to
          reschedule his/her appointment(s) for another day when the above
          requirements can be met. We can provide a work/school excuses and fax
          or email it if necessary. Please make sure prior to your appointment
          that you have a good WIFI/Internet connection and your device is set
          to access your camera and microphone.
        </p>
        <p>
          Please keep in mind that there is a $50 no-show fee for each missed
          appointment, cancelled within 24 hours. Please be prepared to pay any
          co-pay and balance before the appointment. Please check our website
          for more information at www.gwinnettpsychiatry.com.
        </p>
        <p>
          Thank You! <span className="block">Office Manager</span>
        </p>
      </article>
    </>
  );
};

const PatientRegistration = ({ patientData }) => {
  return (
    <>
      <div className="mt-20 print:mt-40 flex items-start justify-end gap-10 mb-7 print:mb-2">
        <h2 className="text-lg text-slate-900 font-semibold mb-8">
          PATIENT REGISTRATION
        </h2>
        <div className="text-right text-slate-700 text-xs">
          <strong>
            <p>Gwinnett Psychiatry, PC</p>
            <p>170 Camden Hill RD, Suite F</p>
            <p>Lawrenceville, GA 30046</p>
            <p>Office: (678) 226-2295 Fax: (678) 226-2296</p>
          </strong>
        </div>
      </div>
      <div className="grid grid-cols-4 text-slate-800 text-xs gap-5 print:gap-0.5">
        <div className="col-span-4 flex items-center border-b border-b-slate-300">
          <p className="font-semibold">Patient Name:</p>
          <p className="flex-auto flex items-center justify-around">
            <span>{patientData?.patientLastName ?? "-"}</span>
            <span>{patientData?.patientFirstName ?? "-"}</span>
            <span>{patientData?.patientMiddleName ?? "-"}</span>
          </p>
        </div>

        <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Address:</p>
          <p>{patientData?.patientAddress ?? "-"}</p>
        </div>

        <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Home Phone:</p>
          <p>{patientData?.patientHomePhone ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">City, State, Zip:</p>
          <p>
            {patientData?.patientCity ?? "-"},{" "}
            {patientData?.patientState ?? "-"}, {patientData?.patientZip ?? "-"}
          </p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Cell:</p>
          <p>{patientData?.patientCell ?? "-"}</p>
        </div>

        <div className="flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Sex:</p>
          <p>{patientData?.patientGender ?? "-"}</p>
        </div>

        <div className="flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Age:</p>
          <p>{patientData?.patientAge ?? "-"}</p>
        </div>

        <div className="flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Race:</p>
          <p>{patientData?.patientRace ?? "-"}</p>
        </div>

        <div className="flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">DOB:</p>
          <p>{patientData?.patientDOB ? patientData.patientDOB : "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Marital Status:</p>
          <p>{patientData?.patientMaritalStatus ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Social Security No.:</p>
          <p>{patientData?.patientSocialSecurity ?? "-"}</p>
        </div>

        <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Employer’s Name:</p>
          <p>{patientData?.patientEmployersName ?? "-"}</p>
        </div>

        <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Employer’s Address:</p>
          <p>{patientData?.patientEmployersAddress ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Employer’s Phone No.:</p>
          <p>{patientData?.patientEmployersPhoneNo ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Occupation:</p>
          <p>{patientData?.patientEmployersOccupation ?? "-"}</p>
        </div>

        <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Employment Status:</p>
          <p>{patientData?.patientEmploymentStatus ?? "-"}</p>
        </div>

        <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Spouse’s Name:</p>
          <p>{patientData?.spousesName ?? "-"}</p>
        </div>

        <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Spouse’s employer’s Name:</p>
          <p>{patientData?.spousesEmployerName ?? "-"}</p>
        </div>

        <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Employer’s Address:</p>
          <p>{patientData?.spousesEmployerAddress ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Employer’s Phone No.:</p>
          <p>{patientData?.spousesEmployersPhoneNo ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Occupation:</p>
          <p>{patientData?.spousesOccupation ?? "-"}</p>
        </div>

        <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Employment Status:</p>
          <p>{patientData?.spousesEmploymentStatus ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Emergency Contact:</p>
          <p>{patientData?.patientEmergencyContact ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Phone:</p>
          <p>{patientData?.patientEmergencyContactPhone ?? "-"}</p>
        </div>

        <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Relationship:</p>
          <p>{patientData?.patientEmergencyReleationship ?? "-"}</p>
        </div>

        <h3 className="col-span-4 text-left mt-2 font-semibold py-1 px-2.5 bg-slate-200 print:py-0 print:px-0">
          PERSON RESPONSIBLE FOR PAYMENT IF DIFFERENT THAN ABOVE
        </h3>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Name:</p>
          <p>{patientData?.otherPaymentPersonName ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Home Phone No.:</p>
          <p>{patientData?.otherPaymentPersonHomePhone ?? "-"}</p>
        </div>

        <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Address:</p>
          <p>{patientData?.otherPaymentPersonAddress ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">City, State, Zip:</p>
          <p>
            {patientData?.otherPaymentPersonCity ?? "-"},{" "}
            {patientData?.otherPaymentPersonState ?? "-"},{" "}
            {patientData?.otherPaymentPersonZip ?? "-"}
          </p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Social Security No.:</p>
          <p>{patientData?.otherPaymentPersonSocialSecurity ?? "-"}</p>
        </div>

        <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Relationship to Patient:</p>
          <p>{patientData?.otherPaymentPersonReleationship ?? "-"}</p>
        </div>

        <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Employer’s Name:</p>
          <p>{patientData?.otherPaymentPersonEmployersName ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Employer’s Phone No.:</p>
          <p>{patientData?.otherPaymentPersonEmployersPhoneNo ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Occupation:</p>
          <p>{patientData?.otherPaymentPersonOccupation ?? "-"}</p>
        </div>

        <h3 className="col-span-4 text-left mt-2 font-semibold py-1 px-2.5 bg-slate-200 print:py-0 print:px-0">
          INSURANCE INFORMATION
        </h3>

        <p className="col-span-4 text-left mt-2 py-1 px-2.5  print:py-0 print:px-0">
          <strong>Do you have any primary insurance?:</strong>{" "}
          {patientData?.doYouHaveInsurance1 ?? "-"}
        </p>
        {patientData?.doYouHaveInsurance1 === "Yes" ? (
          <>
            <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
              <p className="font-semibold">1. Insurance Company:</p>
              <p>{patientData?.insuranceCompany1 ?? "-"}</p>
            </div>

            <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
              <p className="font-semibold">Address:</p>
              <p>{patientData?.insuranceCompanyAddress1 ?? "-"}</p>
            </div>

            <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
              <p className="font-semibold">City, State, Zip:</p>
              <p>
                {patientData?.insuranceCompanyCity1 ?? "-"},{" "}
                {patientData?.insuranceCompanyState1 ?? "-"},{" "}
                {patientData?.insuranceCompanyZip1 ?? "-"}
              </p>
            </div>

            <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
              <p className="font-semibold">Member ID No.:</p>
              <p>{patientData?.insuranceCompanyID1 ?? "-"}</p>
            </div>

            <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
              <p className="font-semibold">Subscriber:</p>
              <p>{patientData?.insuranceCompanySubscriber1 ?? "-"}</p>
            </div>

            <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
              <p className="font-semibold">Relationship to Patient:</p>
              <p>
                {patientData?.insuranceCompanyRelationshiptoPatient1 ?? "-"}
              </p>
            </div>

            <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
              <p className="font-semibold">D.O.B.:</p>
              <p>
                {patientData?.insuranceCompanyDOB1
                  ? patientData.insuranceCompanyDOB1
                  : "-"}
              </p>
            </div>

            <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
              <p className="font-semibold">Social Security No.:</p>
              <p>{patientData?.insuranceCompanySocialSecurityNo1 ?? "-"}</p>
            </div>
          </>
        ) : null}

        <p className="col-span-4 text-left mt-2 py-1 px-2.5 print:py-0 print:px-0">
          <strong>Do you have secondary insurance?:</strong>{" "}
          {patientData?.doYouHaveInsurance2 ?? "-"}
        </p>
        {patientData?.doYouHaveInsurance2 === "Yes" ? (
          <>
            <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5 mt-2">
              <p className="font-semibold">2. Insurance Company:</p>
              <p>{patientData?.insuranceCompany2 ?? "-"}</p>
            </div>

            <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
              <p className="font-semibold">Address:</p>
              <p>{patientData?.insuranceCompanyAddress2 ?? "-"}</p>
            </div>

            <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
              <p className="font-semibold">City, State, Zip:</p>
              <p>
                {patientData?.insuranceCompanyCity2 ?? "-"},{" "}
                {patientData?.insuranceCompanyState2 ?? "-"},{" "}
                {patientData?.insuranceCompanyZip2 ?? "-"}
              </p>
            </div>

            <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
              <p className="font-semibold">Member ID No.:</p>
              <p>{patientData?.insuranceCompanyID2 ?? "-"}</p>
            </div>

            <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
              <p className="font-semibold">Subscriber:</p>
              <p>{patientData?.insuranceCompanySubscriber2 ?? "-"}</p>
            </div>

            <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
              <p className="font-semibold">Relationship to Patient:</p>
              <p>
                {patientData?.insuranceCompanyRelationshiptoPatient2 ?? "-"}
              </p>
            </div>

            <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
              <p className="font-semibold">D.O.B.:</p>
              <p>
                {patientData?.insuranceCompanyDOB2
                  ? patientData.insuranceCompanyDOB2
                  : "-"}
              </p>
            </div>

            <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
              <p className="font-semibold">Social Security No.:</p>
              <p>{patientData?.insuranceCompanySocialSecurityNo2 ?? "-"}</p>
            </div>
          </>
        ) : null}

        <p className="col-span-4 text-left mt-2 py-1 px-2.5 print:py-0 print:px-0">
          <strong>Do you have Medicaid?:</strong>{" "}
          {patientData?.doYouHaveMedicaid ?? "-"}
        </p>

        {patientData?.doYouHaveMedicaid === "Yes" ? (
          <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5 mt-2">
            <p className="font-semibold">3. Medicaid No.:</p>
            <p>{patientData?.medicaidNo ?? "-"}</p>
          </div>
        ) : null}

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5 mt-2">
          <p className="font-semibold">Referred by:</p>
          <p>{patientData?.referredBy ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Phone:</p>
          <p>{patientData?.referredByPhone ?? "-"}</p>
        </div>

        <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Address:</p>
          <p>{patientData?.officeAddress ?? "-"}</p>
        </div>

        <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">City, State, Zip:</p>
          <p>
            {patientData?.officeCity ?? "-"}, {patientData?.officeState ?? "-"},{" "}
            {patientData?.officeZip ?? "-"}
          </p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Primary/Personal Physician:</p>
          <p>{patientData?.primaryPersonalPhysician ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Phone:</p>
          <p>{patientData?.primaryPersonalPhysicianHomePhone ?? "-"}</p>
        </div>
      </div>
    </>
  );
};

const PatientConsentForm = ({ patientData }) => {
  const timestamp = patientData?.todayDate;
  const formattedDate = timestamp
    ? format(timestamp.toDate(), "MM/dd/yyyy")
    : "-";
  return (
    <>
      <h1 className="mt-20 print:mt-96 text-slate-900 text-xl font-semibold mb-2.5 print:mb-1">
        Gwinnett Psychiatry, PC
      </h1>
      <h2 className="text-lg text-slate-900 font-semibold mb-8">
        PATIENT CONSENT FORM
      </h2>
      <article className="prose-sm text-left prose-ul:list-disc print:prose-p:mb-1 print:prose-p:mt-1 print:prose-p:leading-tight print:prose-li:leading-tight">
        <p>
          <strong className="underline">MEDICAL CONSENT:</strong> I request and
          authorize my provider(s), their associates and assistants and
          employees to provide and perform such medical care, tests, procedures,
          drugs and other services and supplies as are considered advisable by
          my provider for my health, and well-being. This may include pathology,
          radiology, emergency services, and other special services and tests
          ordered by my provider(s). I acknowledge that no representations,
          warranties, or guaranties as to result or cures have been made to or
          relied upon by me.
        </p>
        <p>
          <strong className="underline">CONFIDENTIALITY:</strong> The law
          protects the privacy of communication between a client and Dr Rubina.
          In most situations, we can only release information about your
          treatment to others if you sign a written Authorization form that
          meets certain legal requirements imposed by HIPPA. Your signature on
          this Agreement provides consent to the following activities:
        </p>
        <p>
          I further authorize Doctor Rubina, her associates and assistants and
          employees to provide and perform such medical care:
        </p>
        <ul>
          <li>
            If a patient threatens to harm himself/herself, I may be obligated
            to seek hospitalization for him/her or to contact family members or
            others who can help provide protection.
          </li>
        </ul>
        <p>
          There are some situations in which the doctor is legally obligated to
          take actions, which I believe are necessary to attempt to protect
          others from harm and doctor may have to reveal some information about
          a client’s treatment. If doctor has a reason to believe that a child
          has been abused, the law requires that doctor file a report with
          DFACS. Once a report is filed, I may be required to provide additional
          information
        </p>
        <ul>
          <li>
            If I have reasonable cause to believe that a disabled adult or elder
            person has been abused, I am required to report that to the
            appropriate agency. Once a report is filed, I may be required to
            provide additional information.
          </li>
          <li>
            If I determine that a client presents a serious danger of violence
            to another, I may be required to take protective actions. These
            actions may include notifying the potential victim, and/or
            contacting the police, and/or seeking hospitalization for the
            client.
          </li>
        </ul>
        <p>
          If such a situation arises, I will make every effort to fully discuss
          it with you before taking any action and I will limit my disclosure to
          what is necessary. Please feel free to discuss any concerns or
          questions you may have about confidentiality.
        </p>
        <p>
          <strong className="underline">RELEASE OF INFORMATION:</strong> I
          hereby authorize the above provider(s) to release any medical
          information concerning my care, including copies of medical records,
          and/or billing information pertaining to my medical care to
          individuals or representatives of agencies or organizations or the
          insurer in connection with obtaining payment for the medical services
          rendered to me and/or independent contractors engaged by them.
        </p>
        <p>
          <strong className="underline">
            ASSIGNMENT OF INSURANCE BENEFITS:
          </strong>{" "}
          In consideration of any and all medical services, care, drugs,
          supplies, equipment and facilities forwarded by the above providers, I
          hereby irrevocably transfer to said provider(s) all insurance benefits
          now due and payable to me or to become due and payable to me under any
          insurance policy or policies, or any replacement policies thereof that
          might be applicable.
        </p>
        <p>
          I understand that my obligation to pay all charges is not affected by
          the fact that I have insurance benefits, and if my insurance company
          fails to pay all or any portion of these charges for any reason, I
          will be responsible for all sums due and owing above provider(s).
        </p>
        <p>
          The above provider(s) and the patient or patient’s representative
          hereby enter into the above agreements. The patient or patient’s
          representative certifies that he/she has read and accepted the above,
          where applicable to the patient’s condition and status and further
          certified that he/she is the patient, or is duly authorized on behalf
          of the patient to execute such an agreement.
        </p>
        <div className="flex items-center justify-between">
          <div>
            <img
              src={patientData?.patientSignature1 ?? "-"}
              alt="Patient Signature"
              height={100}
              width={100}
            />
            <p>
              Patient’s Signature/Person Authorized to Consent(Relationship)
            </p>
          </div>

          <p>
            <strong>Date:</strong> {formattedDate}
          </p>
        </div>
      </article>
    </>
  );
};

const PrivacyPolicy = ({ patientData }) => {
  const timestamp = patientData?.todayDate;
  const formattedDate = timestamp
    ? format(timestamp.toDate(), "MM/dd/yyyy")
    : "-";
  return (
    <>
      <h1 className="mt-20 text-slate-900 text-xl font-semibold mb-2.5">
        Gwinnett Psychiatry, PC
      </h1>
      <h2 className="text-base text-slate-900 font-semibold mb-8">
        PRIVACY POLICY ACKNOWLEDGEMENT STATEMENT
      </h2>
      <article className="prose-sm text-left print:mb-72">
        <p>
          I hereby acknowledge that I have been made aware that Gwinnett
          Psychiatry, P.C. has a Privacy Policy in place in accordance with the
          Health Insurance Portability and Accountability Act of 1996(HIPAA).
        </p>
        <p>
          As a patient of Gwinnett Psychiatry, P.C., I understand and
          acknowledge the
        </p>
        <p>
          following: Gwinnett Psychiatry, P.C. has a privacy policy in effect in
          their office.
        </p>
        <p>
          Gwinnett Psychiatry, P.C. has made this policy available to me for
          review, by placing a complete version in a binder that resides in the
          waiting room and/or by placing a poster version of this policy in the
          waiting room or similar common area with patient access.
        </p>
        <p>
          Gwinnett Psychiatry, P.C. has made me aware, that as a patient I am
          entitled to a copy of this Privacy Policy if I desire a copy for my
          personal file.
        </p>
        <p>
          Upon your review of the above statements, please sign at the bottom,
          acknowledging that you have been advised of the privacy policy
          implemented by Gwinnett Psychiatry, P.C.
        </p>
        <p>
          I have read and understand the acknowledgment form. If you desire a
          copy of the Privacy Policy, please request one at this time.
        </p>

        {patientData?.acknowledgePrivacyPolicyExists === "Yes" ? (
          <div>
            <p>
              <strong>Yes</strong>,{" "}
              <span className="underline underline-offset-2">
                I do want a copy
              </span>{" "}
              of the Privacy Policy
            </p>
          </div>
        ) : (
          <div>
            <p>
              <strong>No</strong>,{" "}
              <span className="underline underline-offset-2">
                I do not want a copy
              </span>{" "}
              but I acknowledge the Privacy Policy exists
            </p>
          </div>
        )}

        <p>
          <strong>Patient’s Name:</strong>
          {patientData?.patientPrivacyLastName ?? "-"}{" "}
          {patientData?.patientPrivacyFirstName ?? "-"}{" "}
          {patientData?.patientPrivacyMiddleName ?? "-"}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <img
              src={patientData?.Patientsignature2 ?? "-"}
              alt="Patient Signature"
              height={100}
              width={100}
            />
            <p>
              Patient’s Signature/Person Authorized to Consent (Relationship)
            </p>
          </div>
          <p>
            <strong>Date:</strong>

            {formattedDate}
          </p>
        </div>
        <p>
          <strong>
            <i>For more information contact the</i>
          </strong>{" "}
          Gwinnett Psychiatry, P.C.{" "}
          <strong>
            <i>at (678) 226-2295</i>
          </strong>
        </p>
      </article>
    </>
  );
};

const Responsibility = ({ patientData }) => {
  const timestamp = patientData?.todayDate;
  const formattedDate = timestamp
    ? format(timestamp.toDate(), "MM/dd/yyyy")
    : "-";
  return (
    <>
      <h1 className="mt-20 print:mb-1 text-slate-900 text-xl font-semibold mb-2.5">
        Gwinnett Psychiatry, PC
      </h1>
      <h2 className="text-base text-slate-900 font-semibold mb-8">
        STATEMENT OF RESPONSIBILITY
      </h2>
      <article className="prose-sm text-left prose-ul:list-disc print:prose-p:mb-2.5 print:prose-p:mt-2.5 print:prose-p:leading-snug print:prose-li:leading-snug print:mb-40">
        <p>
          The coverage your insurance program provides is calculated based on
          their allowed amount, minus any deductibles, co-payments and/or
          coinsurance amounts. These amounts are your share of the cost.
        </p>
        <p>
          <strong>Pre-certification:</strong> or certification is obtained from
          your insurance company. If you do not obtain certification when
          required, your benefits will be reduced or denied. Your insurance
          certification of your care does not guarantee coverage.
        </p>
        <p>
          <strong>Pre-Existing:</strong> Your insurance might have a
          pre-existing condition clause. Any condition that existed on or before
          your effective date may be considered pre-existing. These conditions
          may be excluded for a period of time.
        </p>
        <p>
          <strong>Responsibility:</strong> The amount your insurance will pay is
          determined by them and is the amount they determine to be appropriate
          for the service rendered. They have the sole discretion to determine
          the allowed amount. Your insurance company has the sole discretion to
          determine whether care is medically necessary. They will not cover
          care they feel it is not medically necessary. Therefore, it is your
          responsibility to cover any and all charges not paid by your insurance
          company.
        </p>
        <p>
          <strong>Prescription Refills: </strong> Please allow 48 hours for all
          prescription refills, providing the patient account is paid in full.
          Prescription refills requested on Friday will be called in on Monday
          before noon. All controlled substance prescriptions will be issued
          only if the patient is present.
        </p>
        <p>
          <strong>Unpaid Visits: </strong> If your insurance company has not
          paid for two prior visits, we will reschedule your appointment after
          payment has been received. You can continue to see the doctor if you
          agree to pay half of the actual fee, not contracted fee up front which
          will be reimbursed upon receiving payment from your insurance company.
        </p>
        <p>
          <strong>Telephone Calls: </strong> Non-emergency telephone messages
          may be left with front office or voicemail. We will return your call
          as soon as possible. There is no charge for brief calls (less than 5
          minutes). Calls of longer duration will be billed at the usual
          professional rate $300 per hour. Please understand that health
          insurance companies do not pay for telephone calls, but are provided
          to you as a convenience to you in your care.
        </p>
        <p>
          <strong>Litigation cases: </strong> We do not accept new patient(s)
          involved in litigation such as child custody, divorce case & etc. As
          for established patient(s), all litigation cases must be paid in full
          before the services are rendered, since insurance companies do not
          reimburse for litigation cases(s). For more details please see the
          “fee schedule.
        </p>
        <p>
          <strong>
            Medicare: We are not a Medicare provider therefore if you have
            Medicare or a Medicare Supplement plan through a commercial
            insurance, please notify us prior to being seen by the doctor
            otherwise you would be liable for all of the charges, including
            collection and attorney fees.
          </strong>
        </p>
        <p>
          Gwinnett Psychiatry, P.C. will expect all payment of charges on the
          day services are rendered. Please come prepared to pay deductible
          amount not yet satisfied, charges not covered by your insurance, and
          co-payments. Patients are not allowed to discuss any financial
          matter(s) with the doctor.
        </p>
        <p>
          I,{" "}
          <strong>
            {" "}
            {patientData?.patientResponsibleLastName ?? "-"}{" "}
            {patientData?.patientResponsibleFirstName ?? "-"}{" "}
            {patientData?.patientResponsibleMiddleName ?? "-"}
          </strong>
          , understand that I am responsible to pay my financial obligation in
          full. If for some reason, I am unable to pay this obligation in full
          when the balance is due, I will be held accountable for any and all
          late fees, collection fees, interest or finance charges, etc. that may
          accrue.
        </p>
        <div className="flex items-center justify-between">
          <div>
            <img
              src={patientData?.Patientsignature3 ?? "-"}
              alt="Patient Signature"
              height={100}
              width={100}
            />
            <p>Signature of patient or Parent/ Guardian</p>
          </div>
          <p>
            <strong>Date:</strong> {formattedDate}
          </p>
        </div>
      </article>
    </>
  );
};

const FeeShcedule = ({ patientData }) => {
  const timestamp = patientData?.todayDate;
  const formattedDate = timestamp
    ? format(timestamp.toDate(), "MM/dd/yyyy")
    : "-";
  return (
    <>
      <h1 className="mt-20 print:mb-1 text-slate-900 text-xl font-semibold mb-2.5">
        Gwinnett Psychiatry, PC
      </h1>
      <h2 className="text-base text-slate-900 font-semibold mb-8 print:mb-3">
        Fee Schedule
      </h2>
      <article className="prose-sm text-left prose-ul:list-disc prose-td:py-1 print:prose-td:py-0 print:prose-p:mb-2 print:prose-p:mt-2 prose-ul:my-0 print:prose-p:leading-snug print:prose-li:leading-snug">
        <p>
          All litigation cases must be scheduled at least a month in advance so
          the doctor can schedule patients accordingly. The Commercial or
          Medicaid insurances <strong>DO NOT</strong> pay for any Litigation or
          Legal Consultation services provided by the doctor. A typical case
          incurs the following out of pocket charges:
        </p>
        <table>
          <tbody>
            <tr>
              <td>
                <ul>
                  <li>
                    Consultation with patient & parent(s) in office or on the
                    phone
                  </li>
                </ul>
              </td>
              <td>$500/HR (1 hour min)</td>
            </tr>
            <tr>
              <td>
                <ul>
                  <li>
                    Consultation with attorney on the phone or in the office.
                  </li>
                </ul>
              </td>
              <td>$500/HR (1hour min)</td>
            </tr>
            <tr>
              <td>
                <ul>
                  <li>
                    Any Disability Form/letter/Report written to any
                    agency/institution
                  </li>
                </ul>
              </td>
              <td>$500 each</td>
            </tr>
            <tr>
              <td>
                <ul>
                  <li>
                    Deposition in the office, plus min one hour case preparation
                    $500
                  </li>
                </ul>
              </td>
              <td>$500 per hour (min two hours)</td>
            </tr>
            <tr>
              <td>
                <ul>
                  <li>
                    Deposition other than Doctor Rubina&apos;s office, within 50
                    miles
                  </li>
                </ul>
              </td>
              <td>$600 per hour (min two hours)</td>
            </tr>
            <tr>
              <td>
                <ul>
                  <li>
                    Court appearance, plus min one hour case preparation $500
                  </li>
                </ul>
              </td>
              <td>$600 per hour (min two hour)</td>
            </tr>
            <tr>
              <td>
                <ul>
                  <li>Commute between office & court & back to office</li>
                </ul>
              </td>
              <td>$600 per hour (min one hour)</td>
            </tr>
            <tr>
              <td>
                <ul>
                  <li>Out of state Case(s)</li>
                </ul>
              </td>
              <td>$800 hour, plus Travel expenses</td>
            </tr>
          </tbody>
        </table>
        <p className="text-center">
          <strong>
            ALL ADDITIONAL TIME IS CHARGED IN 15 MINUTES INCREMENTS
          </strong>
        </p>
        <table>
          <tbody>
            <tr>
              <td>
                <ul className="!list-none">
                  <li>
                    <strong>No Animal Support Letter</strong>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                <ul>
                  <li>Diagnosis letter</li>
                </ul>
              </td>
              <td>free of charge</td>
            </tr>
            <tr>
              <td>
                <ul>
                  <li>Accommodation Letter</li>
                </ul>
              </td>
              <td>$50</td>
            </tr>
            <tr>
              <td>
                <ul>
                  <li>School Medical Forms</li>
                </ul>
              </td>
              <td>$30</td>
            </tr>
            <tr>
              <td>
                <ul>
                  <li>Homebound Forms</li>
                </ul>
              </td>
              <td>$75</td>
            </tr>
            <tr>
              <td>
                <ul>
                  <li>Medical Records and Processing Fee</li>
                </ul>
              </td>
              <td>$25</td>
            </tr>
            <tr>
              <td>
                <ul>
                  <li>Returned check fee</li>
                </ul>
              </td>
              <td>$50 (thereafter, cash/credit)</td>
            </tr>
            <tr>
              <td>
                <ul>
                  <li>
                    Any non –legal letter ( School forms, Katie Beckett & etc)
                  </li>
                </ul>
              </td>
              <td>$50 per letter</td>
            </tr>
          </tbody>
        </table>
        <p>
          For all depositions and court appearances must be scheduled at least
          two weeks in advance, please schedule the doctor for maximum estimated
          time or schedule the doctor for the entire day (eight hours). Please
          bear in mind that the doctor will have patients scheduled for the rest
          of the day. Therefore, the doctor will leave right after your
          estimated scheduled time.
        </p>
        <p>
          The estimated fees should be paid in full seven days before the
          services are rendered, unless the patient’s attorney is guaranteed to
          pay on behalf of the patient. If the patient requires more time than
          estimated time, the balance should be paid right after the services
          are rendered.
        </p>
        <p>
          In case of any court/deposition cancellation, please notify the office
          seven days in advance, otherwise you would be charged $500 per hour
          times the estimated time the doctor has allocated for you. The
          over-paid balance will be refunded to the patient within ten business
          days. The above services are only provided to the established
          patients, whose accounts are paid in full at the time the services are
          requested.
        </p>
        <p className="underline underline-offset-2">
          <strong>Subpoena:</strong> If a patient / patients attorney issues a
          subpoena to the doctor without paying the consultation fee in advanced
          then the patient will be dismissed immediately from the practice.
        </p>
        <p>
          I,{" "}
          <strong>
            {" "}
            {patientData?.patientFeeLastName ?? "-"}{" "}
            {patientData?.patientFeeFirstName ?? "-"}{" "}
            {patientData?.patientFeeMiddleName ?? "-"}
          </strong>{" "}
          HAVE READ THE ABOVE POLICY AND UNDERSTAND IT FULLY.
        </p>
        <div className="flex items-center justify-between">
          <div>
            <img
              src={patientData?.PatientParentsignature ?? "-"}
              alt="Patient Signature"
              height={100}
              width={100}
            />
            <p>Signature of patient or Parent/ Guardian</p>
          </div>
          <p>
            <strong>Date:</strong>

            {formattedDate}
          </p>
        </div>
        <p className="text-center underline underline-offset-2">
          <strong>
            <i>
              Please be advised, all fees are subject to change without notice.
            </i>
          </strong>
        </p>
      </article>
    </>
  );
};

const CancellationPolicy = ({ patientData }) => {
  const timestamp = patientData?.todayDate;
  const formattedDate = timestamp
    ? format(timestamp.toDate(), "MM/dd/yyyy")
    : "-";
  return (
    <>
      <div className="mt-20 text-slate-700 text-xs mb-7">
        <p>
          <strong>Gwinnett Psychiatry, PC</strong>
        </p>
        <p>170 Camden Hill RD, Suite F</p>
        <p>Lawrenceville, GA 30046</p>
        <p className="font-medium">
          <i>Phone: (678) 226-2295 / Fax: (678) 226-2296</i>
        </p>
      </div>

      <h2 className="text-base text-slate-900 font-semibold mb-8 underline underline-offset-2">
        Cancellation Policy
      </h2>
      <article className="prose-sm text-left prose-ul:list-disc prose-td:py-1 prose-ul:my-0">
        <p>
          In today&apos;s hectic world unplanned issues come up for all of us.
          We recognize this fact, but we respectfully request that you cancel
          your scheduled appointment by phone a{" "}
          <strong>minimum of 24 hours</strong> in advance. That way the open
          slot can be filled with someone needing an appointment.
        </p>
        <p>
          <strong className="block">
            Patients with Commercial Insurance(s):
          </strong>{" "}
          If you do not cancel by the deadline, you will be assessed a $50.00
          missed appointment fee. This fee is not covered by any insurance
          company and will be your responsibility to pay before your next visit.
          Most of the time we remind our patients a day before their
          appointments but we are not obligated. Therefore, this is patient’s
          responsibility to keep track of his/her appointment.
        </p>
        <p>
          <strong className="block">
            Patients with Medicaid Insurance(s):
          </strong>{" "}
          As of July 01, 2021 we must notify you that we are unable to
          reschedule an appointment if you have two no show appointments without
          proper 24 hour notice you will be discharged from the practice.
        </p>
        <p>
          I,{" "}
          <strong>
            {" "}
            {patientData?.patientCancellationLastName ?? "-"}{" "}
            {patientData?.patientCancellationFirstName ?? "-"}{" "}
            {patientData?.patientCancellationMiddleName ?? "-"}
          </strong>{" "}
          HAVE READ THE ABOVE POLICY AND UNDERSTAND IT FULLY.
        </p>
        <div className="flex items-center justify-between">
          <div>
            <img
              src={patientData?.PatientParentsignature1 ?? "-"}
              alt="Patient Signature"
              height={100}
              width={100}
            />
            <p>Signature of patient or Parent/ Guardian</p>
          </div>
          <p>
            <strong>Date:</strong>

            {formattedDate}
          </p>
        </div>
      </article>
    </>
  );
};

const Demographic = ({ patientData }) => {
  return (
    <>
      <div className="text-slate-700 text-xs mb-7">
        <strong>
          <p>Gwinnett Psychiatry, PC</p>
          <p>170 Camden Hill RD, Suite F</p>
          <p>Lawrenceville, GA 30046</p>
          <p>Office: 678-226-2295. Fax: 678-226-2296</p>
          <p>
            <Link href={"https://gwinnettpsychiatry.com"}>
              www.gwinnettpsychiatry.com
            </Link>
          </p>
        </strong>
      </div>
      <h2 className="text-lg text-slate-900 font-semibold mb-8 underline underline-offset-2">
        Patient Demographic for E-Prescribe
      </h2>
      <h2 className="text-lg text-slate-900 font-semibold mb-8 underline underline-offset-2">
        Personal Information
      </h2>
      <div className="text-xs text-slate-700 grid grid-cols-2 gap-5">
        <div className="text-left space-x-3 border-b border-b-slate-300">
          <span className="font-semibold">Name:</span>
          <span> {patientData?.patientpersonalInformationName ?? "-"}</span>
        </div>

        <div className="text-left space-x-3 border-b border-b-slate-300">
          <span className="font-semibold">DOB:</span>
          <span>{patientData?.patientDOB ? patientData.patientDOB : "-"}</span>
        </div>

        <div className="col-span-2 text-left space-x-3 border-b border-b-slate-300">
          <span className="font-semibold">Address:</span>
          <span>{patientData?.patientAddress ?? "-"}</span>
        </div>

        <div className="col-span-2 text-left space-x-3 border-b border-b-slate-300">
          <span className="font-semibold">Phone:</span>
          <span>{patientData?.patientpersonalInformationPhone ?? "-"}</span>
        </div>

        <div className="col-span-2 text-left space-x-3 border-b border-b-slate-300">
          <span className="font-semibold">Email:</span>
          <span>{patientData?.patientpersonalInformationEmail ?? "-"}</span>
        </div>
      </div>
      <h2 className="text-lg text-slate-900 font-semibold my-8 underline underline-offset-2">
        Pharmacy Information
      </h2>
      <div className="text-xs text-slate-700 grid grid-cols-2 gap-5">
        <div className="text-left space-x-3 border-b border-b-slate-300">
          <span className="font-semibold">Name:</span>
          <span>{patientData?.patientpharmacyName ?? "-"}</span>
        </div>

        <div className="text-left space-x-3 border-b border-b-slate-300">
          <span className="font-semibold">Phone:</span>
          <span>{patientData?.patientpharmacyPhone ?? "-"}</span>
        </div>

        <div className="col-span-2 text-left space-x-3 border-b border-b-slate-300">
          <span className="font-semibold">Address:</span>
          <span>{patientData?.patientpharmacyAddress ?? "-"}</span>
        </div>

        <div className="col-span-2 text-left space-x-3 border-b border-b-slate-300">
          <span className="font-semibold">
            Please List Allergies and Side Effects:
          </span>
          <span>{patientData?.patientListAllergies ?? "-"}</span>
        </div>
      </div>
    </>
  );
};

const Telepsychiatry = ({ patientData }) => {
  const timestamp = patientData?.todayDate;
  const formattedDate = timestamp
    ? format(timestamp.toDate(), "MM/dd/yyyy")
    : "-";
  return (
    <>
      <div className="text-slate-700 text-xs">
        <strong>
          <p className="text-sm underline underline-offset-2">
            Gwinnett Psychiatry, PC
          </p>
          <p>170 Camden Hill RD, Suite F</p>
          <p>Lawrenceville, GA 30046</p>
          <p>
            Office: (678) 226-2295{" "}
            <span className="ml-8">Fax: (678) 226-2296</span>
          </p>
          <p>
            <Link href={"https://gwinnettpsychiatry.com"}>
              www.gwinnettpsychiatry.com
            </Link>
          </p>
        </strong>
      </div>
      <div className="h-0.5 w-full bg-slate-700 my-4"></div>
      <h2 className="text-lg text-center text-slate-900 font-semibold mb-8 underline underline-offset-2">
        CONSENT FOR TELEPSYCHIATRY
      </h2>
      <article className="prose-sm text-left prose-ul:list-disc">
        <p>
          <strong className="block">
            <i>Introduction</i>
          </strong>{" "}
          Tele-psychiatry is the delivery of psychiatric services using
          interactive audio and visual electronic systems between a provider and
          a patient that are not in the same physical location. The interactive
          electronic system used in Telepsychiatry incorporate network and
          software security protocols to protect the confidentiality of patient
          information and audio and visual data. These protocols include
          measures to safeguard the data and to aid in protecting against
          intentional or unintentional corruption.
        </p>
        <p>
          <strong>
            <i>Potential Benefits</i>
          </strong>
        </p>
        <ul>
          <li>Increased accessibility to psychiatric care.</li>
          <li>Patient convenience.</li>
        </ul>
        <p>
          <strong className="block">
            <i>Potential Risks</i>
          </strong>
          As with any medical procedure, there may be potential risks associated
          with the use of Tele-psychiatry. These risks include, but may not be
          limited to:
        </p>
        <ul>
          <li>
            Information transmitted may not be sufficient (e.g., poor resolution
            of video) to allow for appropriate decision-making by your provider.
          </li>
          <li>
            Your provider may not be able to provide medical treatment using
            interactive electronic equipment nor provide for or arrange for
            emergency care that you may require.
          </li>
          <li>
            Delays in medical evaluation and treatment may occur due to
            deficiencies or failures of the equipment.
          </li>
          <li>
            Security protocols can fail, causing a breach of privacy of
            confidential health information.
          </li>
          <li>
            A lack of access to all the information that might be available in a
            face to face visit, but not in a Tele-Psychiatry session, may result
            in errors injudgment.
          </li>
        </ul>
        <p>
          <strong>
            <i>Alternatives to the Use of Tele-psychiatry</i>
          </strong>
        </p>
        <ul>
          <li>
            Traditional face-to-face sessions in your provider&apos;s office.
          </li>
        </ul>
        <p>
          <strong>
            <i>Patient&apos;s Rights</i>
          </strong>
        </p>
        <ul>
          <li>
            I understand that the laws that protect the privacy and
            confidentiality of medical information also apply to
            Tele-psychiatry.
          </li>
          <li>
            I have the right to withhold or withdraw my consent to the use of
            Tele-psychiatry during the course of my care at any time. I
            understand that my withdrawal of consent will not affect any future
            care or treatment.
          </li>
          <li>
            I have the right to inspect all medical information that includes
            the Tele-psychiatry visit. I may obtain copies of this medical
            record information for a reasonable fee
          </li>
          <li>
            I understand that my provider has the right to withhold or withdraw
            consent for the use of Telepsychiatry during the course of my care
            at any time.
          </li>
          <li>
            I understand that the laws that protect the privacy and
            confidentiality of medical information also apply to
            Tele-psychiatry.
          </li>
          <li>
            I understand that all the rules and regulations that apply to the
            provision of healthcare services in the State of Georgia also apply
            to Tele-psychiatry.
          </li>
        </ul>
        <p>
          <strong>
            <i>Patient&apos;s Responsibilities</i>
          </strong>
        </p>
        <ul>
          <li>
            I will not record any Tele-psychiatry sessions without written
            consent from my provider. I understand that my provider will not
            record any of our Tele-psychiatry session without my written
            consent.
          </li>
          <li>
            I will inform my provider if any other person can hear or see any
            part of our session before the session begins. The provider will
            inform me if any other person can hear or see any part of our
            session before the session begins.
          </li>
          <li>
            I understand that I, not my provider, am responsible for the
            configuration of an electronic equipment used on my computer which
            is used for Tele-psychiatry. I understand that it is my
            responsibility to ensure the proper functioning of all electronic
            equipment before my session begins. I understand that I must be a
            resident of the State of Georgia to be eligible for Telepsychiatry
            services from my provider.
          </li>
          <li>
            I understand that my initial evaluation will not be done
            Tele-psychiatry except in special circumstances under which I will
            be required to verify my identity.
          </li>
        </ul>
        <p>
          <strong className="block">
            <i>Patient Consent To The Use of Tele-psychiatry</i>
          </strong>{" "}
          I have read and understood the information provided above regarding
          Tele-psychiatry. I have discussed it with my provider and all of my
          questions have been answered to my satisfaction. I hereby give my
          informed consent for the use of Tele-psychiatry in my health care and
          authorize my provider to use Tele-psychiatry in the course of my
          diagnosis and treatment.
        </p>
        <p>
          <span className="mr-1">Patient Name:</span>{" "}
          {patientData?.patientTelepsychiatryLastName ?? "-"}{" "}
          {patientData?.patientTelepsychiatryFirstName ?? "-"}{" "}
          {patientData?.patientTelepsychiatryMiddleName ?? "-"}
        </p>
        <p>
          <span className="mr-1">Patient Date of Birth :</span>{" "}
          {patientData?.patientDOB ? patientData.patientDOB : "-"}
        </p>
        <p className="text-center">
          <strong>
            Note: Parent/Guardian signature required if patient is under 18
          </strong>
        </p>

        <div className="flex items-center justify-between">
          <div>
            <img
              src={patientData?.PatientParentsignature2 ?? "-"}
              alt="Patient Signature"
              height={100}
              width={100}
            />
            <p>Patient/Parent/Guardian Signature:</p>
          </div>
          <p>
            <strong>Date:</strong>

            {formattedDate}
          </p>
        </div>
      </article>
    </>
  );
};

const Questionnaire = ({ patientData }) => {
  return (
    <div>
      <h2 className="text-center text-lg text-slate-900 font-semibold underline underline-offset-2">
        ADULT PSYCHIATRIC QUESTIONNAIRE
      </h2>
      <p className="mb-6">
        <strong>Gwinnett Psychiatry, PC</strong>
      </p>
      <p className="mb-5">
        <i className="underline underline-offset-2 text-sm">Dear Patients:</i>{" "}
        Please carefully fill in this form prior to your first appointment in
        order to help us reduce the time and cost of gathering this information
        at our office. We appreciate your cooperation and patience.
      </p>
      <article className="prose-sm text-left prose-table:text-sm prose-th:px-0 prose-table:border prose-th:border prose-td:border prose-thead:bg-slate-200 prose-table:border-collapse prose-th:border-slate-500 prose-td:border-slate-500 prose-table:w-full prose-table:table-fixed prose-td:px-1 prose-h2:text-lg prose-h2:text-slate-900 prose-h2:font-semibold prose-h2:underline prose-h2:underline-offset-2 prose-ul:grid prose-ul:grid-cols-2 prose-ul:list-decimal">
        <p>
          <strong>Patient&apos;s Name:</strong>{" "}
          {patientData?.patientName ?? "-"}
        </p>

        <span>
          <strong>DOB:</strong>{" "}
          {patientData?.patientDOB ? patientData.patientDOB : "-"}
        </span>

        <span className="mx-10">
          <strong>Patient&apos;s Birthplace:</strong>{" "}
          {patientData?.patientBirthplace ?? "-"}
        </span>

        <span>
          <strong>Sex:</strong> {patientData?.patientGender ?? "-"}
        </span>

        <p>
          <strong>Race:</strong> {patientData?.patientRace ?? "-"}
        </p>

        <p>
          <strong>• Who referred you to our practice?:</strong>{" "}
          {patientData?.whoReferredOurPractice ?? "-"}
        </p>

        <p>
          <strong>
            • Please briefly describe the problem(s) for which you are seeking
            help:
          </strong>{" "}
          {patientData?.brieflyDescribeProblem ?? "-"}
        </p>

        <p>
          <strong>• Proximately when did the problem(s) begin?:</strong>{" "}
          {patientData?.whenProblemBegin ?? "-"}
        </p>

        <p>
          <strong>
            • Any known stress cause or contribute to the problem(s)?:
          </strong>{" "}
          {patientData?.stressCauseContributeToProblem ?? "-"}
        </p>

        {patientData?.stressCauseContributeToProblem === "Yes" ? (
          <p>{patientData?.stressCauseDescription ?? "-"}</p>
        ) : null}

        <p>
          <strong>
            • Have you ever received outpatient mental health treatment?:
          </strong>{" "}
          {patientData?.everReceivedOutPatientMentalHealthTreatment ?? "-"}
        </p>

        {patientData?.everReceivedOutPatientMentalHealthTreatment === "Yes" ? (
          <table>
            <thead className="text-center">
              <tr>
                <th>Clinician/ Doctor</th>
                <th>Date(s) of Evaluation or Treatment</th>
                <th>Type of Evaluation or Treatment</th>
                <th>Frequency of visits</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {patientData?.psychologicalOrIQTesting.map((doc, index) => (
                <tr className="h-16 relative" key={index}>
                  <td className="border-b border-slate-100">
                    {doc?.psychologicalOrIQTesting_clinicianOrDoctor}
                  </td>

                  <td className="border-b border-slate-100">
                    {doc?.psychologicalOrIQTesting_dateOfEvaluationOrTreatment
                      ? format(
                          new Date(
                            doc.psychologicalOrIQTesting_dateOfEvaluationOrTreatment
                          ),
                          "MM/dd/yyyy"
                        )
                      : "-"}
                  </td>
                  <td className="border-b border-slate-100">
                    {doc?.psychologicalOrIQTesting_typeOfEvaluationOrTreatment}
                  </td>
                  <td className="border-b border-slate-100">
                    {doc?.psychologicalOrIQTesting_frequencyOfVisits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        <p>
          <strong>
            • Have you ever received inpatient mental health treatment?:
          </strong>{" "}
          {patientData?.everReceivedOutPatientMentalHealthTreatment ?? "-"}
        </p>

        {patientData?.everReceivedOutPatientMentalHealthTreatment === "Yes" ? (
          <table>
            <thead className="text-center">
              <tr>
                <th>Hospital Name</th>
                <th>Dates of Treatment</th>
                <th>Reason for hospitalization</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {patientData?.inpatientOrOutpatientSubstanceAbuse.map(
                (doc, index) => (
                  <tr className="h-16 relative" key={index}>
                    <td className="border-b border-slate-100">
                      {
                        doc?.inpatientOrOutpatientSubstanceAbuse_hospitalDoctorName
                      }
                    </td>

                    <td className="border-b border-slate-100">
                      {doc?.inpatientOrOutpatientSubstanceAbuse_datesOfTreatment
                        ? format(
                            new Date(
                              doc.inpatientOrOutpatientSubstanceAbuse_datesOfTreatment
                            ),
                            "MM/dd/yyyy"
                          )
                        : "-"}
                    </td>
                    <td className="border-b border-slate-100">
                      {
                        doc?.inpatientOrOutpatientSubstanceAbuse_detoxRehabOrAANA
                      }
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : null}

        <p>
          <strong>• Have you ever taken psychiatric medications?:</strong>
          {patientData?.everTakenPsychiatricMedications ?? "-"}
        </p>

        {patientData?.everTakenPsychiatricMedications === "Applicable" ? (
          <table>
            <thead className="text-center">
              <tr>
                <th>Rx Name</th>
                <th>Reason Given</th>
                <th>Highest Dose </th>
                <th>% Improvement </th>
                <th>Side-effects </th>
                <th>Dates Taken </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {patientData?.listEverTakenPsychiatricMedications.map(
                (doc, index) => (
                  <tr className="h-16 relative" key={index}>
                    <td className="border-b border-slate-100">
                      {doc?.listEverTakenPsychiatricMedications_rxName}
                    </td>
                    <td className="border-b border-slate-100">
                      {doc?.listEverTakenPsychiatricMedications_reasonGiven}
                    </td>
                    <td className="border-b border-slate-100">
                      {doc?.listEverTakenPsychiatricMedications_highestDose}
                    </td>
                    <td className="border-b border-slate-100">
                      {
                        doc?.listEverTakenPsychiatricMedications_percentImprovement
                      }
                    </td>
                    <td className="border-b border-slate-100">
                      {doc?.listEverTakenPsychiatricMedications_sideEffects}
                    </td>

                    <td className="border-b border-slate-100">
                      {doc?.listEverTakenPsychiatricMedications_datesTaken
                        ? format(
                            new Date(
                              doc.listEverTakenPsychiatricMedications_datesTaken
                            ),
                            "MM/dd/yyyy"
                          )
                        : "-"}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : null}

        <p>
          <strong>• Have you ever threatened or attempted suicide?:</strong>{" "}
          {patientData?.everThreatenedOrAttemptedSuicide ?? "-"}{" "}
          {patientData?.everThreatenedOrAttemptedSuicide === "Yes" ? (
            <span className="block">
              {patientData?.everThreatenedOrAttemptedSuicideDescription ?? "-"}
            </span>
          ) : null}
        </p>

        <p>
          <strong>
            • Have you ever had any brain imaging or functional studies? (MRI,
            CAT scan, EEG, etc.):
          </strong>{" "}
          {patientData?.anyBrainImagingOrFunctionalStudies ?? "-"}
        </p>

        <h2>Substance Use History</h2>

        <p>
          <strong>
            • Please describe your past or current use of any of the following
            substances:
          </strong>{" "}
          {patientData?.substanceUseHistory ?? "-"}
        </p>

        {patientData?.substanceUseHistory === "Yes" ? (
          <table>
            <thead className="text-center">
              <tr>
                <th className="w-32">Substance</th>
                <th>Age at 1st use</th>
                <th>Frequency of use</th>
                <th>Amount used</th>
                <th>Last use</th>
                <th>
                  Problems (physical, legal, occupation, relationships, etc.)
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>ALCOHOL</td>
                <td>{patientData?.alcohalAge ?? "-"}</td>
                <td>{patientData?.alcohalFrequency ?? "-"}</td>
                <td>{patientData?.alcohalAmountUsed ?? "-"}</td>
                <td>{patientData?.alcohalLastUse ?? "-"}</td>
                <td>{patientData?.alcohalProblems ?? "-"}</td>
              </tr>
              <tr>
                <td>TOBACCO</td>
                <td>{patientData?.tobaccoAge ?? "-"}</td>
                <td>{patientData?.tobaccoFrequency ?? "-"}</td>
                <td>{patientData?.tobaccoAmountUsed ?? "-"}</td>
                <td>{patientData?.tobaccoLastUse ?? "-"}</td>
                <td>{patientData?.tobaccoProblems ?? "-"}</td>
              </tr>
              <tr>
                <td>MARIJUANA</td>
                <td>{patientData?.marijuanaAge ?? "-"}</td>
                <td>{patientData?.marijuanaFrequency ?? "-"}</td>
                <td>{patientData?.marijuanaAmountUsed ?? "-"}</td>
                <td>{patientData?.marijuanaLastUse ?? "-"}</td>
                <td>{patientData?.marijuanaProblems ?? "-"}</td>
              </tr>
              <tr>
                <td>COCAINE</td>
                <td>{patientData?.cocaineAge ?? "-"}</td>
                <td>{patientData?.cocaineFrequency ?? "-"}</td>
                <td>{patientData?.cocaineAmountUsed ?? "-"}</td>
                <td>{patientData?.cocaineLastUse ?? "-"}</td>
                <td>{patientData?.cocaineProblems ?? "-"}</td>
              </tr>
              <tr>
                <td>AMPHETAMINE</td>
                <td>{patientData?.amphetamineAge ?? "-"}</td>
                <td>{patientData?.amphetamineFrequency ?? "-"}</td>
                <td>{patientData?.amphetamineAmountUsed ?? "-"}</td>
                <td>{patientData?.amphetamineLastUse ?? "-"}</td>
                <td>{patientData?.amphetamineProblems ?? "-"}</td>
              </tr>
              <tr>
                <td>ECSTACY</td>
                <td>{patientData?.ecstacyAge ?? "-"}</td>
                <td>{patientData?.ecstacyFrequency ?? "-"}</td>
                <td>{patientData?.ecstacyAmountUsed ?? "-"}</td>
                <td>{patientData?.ecstacyLastUse ?? "-"}</td>
                <td>{patientData?.ecstacyProblems ?? "-"}</td>
              </tr>
              <tr>
                <td>LSD/ ACID</td>
                <td>{patientData?.lsdAcidAge ?? "-"}</td>
                <td>{patientData?.lsdAcidFrequency ?? "-"}</td>
                <td>{patientData?.lsdAcidAmountUsed ?? "-"}</td>
                <td>{patientData?.lsdAcidLastUse ?? "-"}</td>
                <td>{patientData?.lsdAcidProblems ?? "-"}</td>
              </tr>
              <tr>
                <td>OPIATES</td>
                <td>{patientData?.opiatesAge ?? "-"}</td>
                <td>{patientData?.opiatesFrequency ?? "-"}</td>
                <td>{patientData?.opiatesAmountUsed ?? "-"}</td>
                <td>{patientData?.opiatesLastUse ?? "-"}</td>
                <td>{patientData?.opiatesProblems ?? "-"}</td>
              </tr>
              <tr>
                <td>INHALANTS</td>
                <td>{patientData?.inhalantsAge ?? "-"}</td>
                <td>{patientData?.inhalantsFrequency ?? "-"}</td>
                <td>{patientData?.inhalantsAmountUsed ?? "-"}</td>
                <td>{patientData?.inhalantsLastUse ?? "-"}</td>
                <td>{patientData?.inhalantsProblems ?? "-"}</td>
              </tr>
              <tr>
                <td>HALLUCINOGENS (mushrooms, PCP, etc)</td>
                <td>{patientData?.hallucinqgensAge ?? "-"}</td>
                <td>{patientData?.hallucinqgensFrequency ?? "-"}</td>
                <td>{patientData?.hallucinqgensAmountUsed ?? "-"}</td>
                <td>{patientData?.hallucinqgensLastUse ?? "-"}</td>
                <td>{patientData?.hallucinqgensProblems ?? "-"}</td>
              </tr>
            </tbody>
          </table>
        ) : null}

        <p>
          <strong>
            • Have you ever received inpatient or outpatient substance abuse
            treatment?:
          </strong>{" "}
          {patientData?.everReceivedInpatientOrOutpatientSubstanceAbuse ?? "-"}
        </p>
        {patientData?.everReceivedInpatientOrOutpatientSubstanceAbuse ===
        "Yes" ? (
          <table>
            <thead className="text-center">
              <tr>
                <th>Hospital/ Doctor Name</th>
                <th>Dates of Treatment</th>
                <th>Detox, Rehab, or AA/NA?</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {patientData?.inpatientOrOutpatientSubstanceAbuse.map(
                (doc, index) => (
                  <tr className="h-16 relative" key={index}>
                    <td className="border-b border-slate-100">
                      {
                        doc?.inpatientOrOutpatientSubstanceAbuse_hospitalDoctorName
                      }
                    </td>

                    <td className="border-b border-slate-100">
                      {doc?.inpatientOrOutpatientSubstanceAbuse_datesOfTreatment
                        ? format(
                            new Date(
                              doc.inpatientOrOutpatientSubstanceAbuse_datesOfTreatment
                            ),
                            "MM/dd/yyyy"
                          )
                        : "-"}
                    </td>
                    <td className="border-b border-slate-100">
                      {
                        doc?.inpatientOrOutpatientSubstanceAbuse_detoxRehabOrAANA
                      }
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : null}

        <h2>Family Psychiatric History:</h2>

        <p className="text-xs font-medium">
          (Please note ADHD, Learning Disorders, Depression, Bipolar Disorder,
          Anxiety Disorders, Obsessive-Compulsive Disorder, Tic/Tourette’s,
          Schizophrenia, Drug or Alcohol Abuse, Suicide attempts, or other
          Psychiatric Problems).
        </p>

        <p>
          <strong>• Are you adopted?:</strong>{" "}
          {patientData?.areYouAdopted ?? "-"}{" "}
          {patientData?.stressCauseContributeToProblem === "Yes" ? (
            <span className="block">
              {patientData?.areYouAdoptedDescription ?? "-"}
            </span>
          ) : null}
        </p>

        <p>
          <strong>
            • Is there a history of ADHD, mental illness, mental retardation,
            learning problems, alcohol or drug abuse in your grandparents,
            parents, siblings, or 1st cousins?:
          </strong>{" "}
          {patientData?.historyOfADHDMentalIllnessEtc ?? "-"}
        </p>
        {patientData?.historyOfADHDMentalIllnessEtc === "Yes" ? (
          <table>
            <thead className="text-center">
              <tr>
                <th>Affected Family Member</th>
                <th>Type of Mental Illness or SA</th>
                <th>Treatment (if any)</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {patientData?.listHistoryOfADHDMentalIllnessEtc.map(
                (doc, index) => (
                  <tr className="h-16 relative" key={index}>
                    <td className="border-b border-slate-100">
                      {
                        doc?.listHistoryOfADHDMentalIllnessEtc_affectedFamilyMember
                      }
                    </td>
                    <td className="border-b border-slate-100">
                      {
                        doc?.listHistoryOfADHDMentalIllnessEtc_typeOfMentalIllnessOrSA
                      }
                    </td>
                    <td className="border-b border-slate-100">
                      {doc?.listHistoryOfADHDMentalIllnessEtc_treatmentIfAny}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : null}

        <h2>Childhood Development:</h2>

        {/* <p className="underline underline-offset-2">
          <strong>Pregnancy -</strong> Followings are apply to patient with
          his/her mother&apos;s pregnancy.
        </p>

        <ul>
          {patientData?.anyThatApplyToYourMothersPregnancyWithYou ? (
            patientData.anyThatApplyToYourMothersPregnancyWithYou.map(
              (condition, index) => <li key={index}>{condition}</li>
            )
          ) : (
            <li>
              {patientData?.anyThatApplyToYourMothersPregnancyWithYou ?? "-"}
            </li>
          )}
        </ul> */}
        <p className="underline underline-offset-2">
          <strong>Pregnancy -</strong> Followings are apply to patient with
          his/her mother&apos;s pregnancy.
        </p>

        {patientData?.anyThatApplyToYourMothersPregnancyWithYou ? (
          <ul>
            {patientData.anyThatApplyToYourMothersPregnancyWithYou.map(
              (condition, index) => (
                <li key={index}>{condition}</li>
              )
            )}
          </ul>
        ) : null}

        <p className="underline underline-offset-2">
          <strong>Birth History:</strong>
        </p>

        <div className="flex items-center justify-between">
          <p>
            <strong>• Mother&apos;s age at time of birth: </strong>
            {patientData?.mothersAgeAtTimeOfBirth ?? "-"}
          </p>
          <p>
            <strong>• Father&apos;s age at time of birth: </strong>
            {patientData?.fathersAgeAtTimeOfBirth ?? "-"}
          </p>
        </div>

        <p>
          <strong>• Was mother given medication or anesthesia?: </strong>{" "}
          {patientData?.wasMotherGivenMedicationOrAnesthesia ?? "-"}
        </p>

        <p>
          <strong>• Delivery was: </strong> {patientData?.deliveryWas ?? "-"}
        </p>

        <p>
          <strong>• Any complications with labor or delivery?: </strong>{" "}
          {patientData?.anyComplicationsWithLabororDelivery ?? "-"}{" "}
          {patientData?.anyComplicationsWithLabororDelivery === "Yes" ? (
            <span className="block">
              {patientData?.anyComplicationsWithLabororDeliveryDescription ??
                "-"}
            </span>
          ) : null}
        </p>

        <p>
          <strong>• Were you premature?: </strong>{" "}
          {patientData?.wereYouPremature ?? "-"}{" "}
          {patientData?.anyComplicationsWithLabororDelivery === "Yes" ? (
            <span className="block">
              {patientData?.wereYouPrematureDescription ?? "-"}
            </span>
          ) : null}
        </p>

        <p>
          <strong>• Your birth weight: </strong>{" "}
          {patientData?.yourBirthWeightLBS ?? "-"}{" "}
          {patientData?.yourBirthWeightOZ ?? "-"}
        </p>

        <p>
          <strong>• Did you have any of the following:</strong>
        </p>

        <ul>
          <li>
            Breathing problems:{" "}
            <span className="underline underline-offset-2">
              {patientData?.breathingProblems ?? "-"}
            </span>
          </li>
          <li>
            Cord around the neck:{" "}
            <span className="underline underline-offset-2">
              {patientData?.cordAroundTheNeck ?? "-"}
            </span>
          </li>
          <li>
            Abnormal color:{" "}
            <span className="underline underline-offset-2">
              {patientData?.abnormalColor ?? "-"}
            </span>
          </li>
          <li>
            Abnormal tone:{" "}
            <span className="underline underline-offset-2">
              {patientData?.abnormalTone ?? "-"}
            </span>
          </li>
          <li>
            Meconium:{" "}
            <span className="underline underline-offset-2">
              {patientData?.meconium ?? "-"}
            </span>
          </li>
          <li>
            Failure to thrive:{" "}
            <span className="underline underline-offset-2">
              {patientData?.failureToThrive ?? "-"}
            </span>
          </li>
          <li>
            Jaundice:{" "}
            <span className="underline underline-offset-2">
              {patientData?.jaundice ?? "-"}
            </span>
          </li>
          <li>
            Infection:{" "}
            <span className="underline underline-offset-2">
              {patientData?.infection ?? "-"}
            </span>
          </li>
        </ul>

        <p className="underline underline-offset-2">
          <strong>Developmental Milestones:</strong>
        </p>

        <p>
          <strong>• Motor Development (sitting, crawling, walking):</strong>{" "}
          {patientData?.motorDevelopment ?? "-"}
        </p>

        <p>
          <strong>• Speech & Language:</strong>{" "}
          {patientData?.speechLanguage ?? "-"}
        </p>

        <p>
          <strong>
            • Self-help skills (dressing, brushing, toileting, hygiene):
          </strong>{" "}
          {patientData?.selfHelpSkills ?? "-"}
        </p>

        <p className="underline underline-offset-2">
          <strong>Childhood Home:</strong>
        </p>

        <p>
          <strong>• Primary Residence as a child: </strong>{" "}
          {patientData?.primaryResidenceAsChild ?? "-"}{" "}
          {patientData?.primaryResidenceAsChild === "Other" ? (
            <span className="block">
              {patientData?.primaryResidenceAsChildDescription ?? "-"}
            </span>
          ) : null}
        </p>

        {/* <p>
          <strong>
            • Check all that describe your home environment as a child:
          </strong>
        </p>

        <ul>
          {patientData?.describeYourHomeEnvironmentAsChild ? (
            patientData.describeYourHomeEnvironmentAsChild.map(
              (condition, index) => <li key={index}>{condition}</li>
            )
          ) : (
            <li>{patientData?.describeYourHomeEnvironmentAsChild ?? "-"}</li>
          )}
        </ul> */}

        <p>
          <strong>
            • Check all that describe your home environment as a child:
          </strong>
        </p>

        {patientData?.describeYourHomeEnvironmentAsChild ? (
          <ul>
            {patientData.describeYourHomeEnvironmentAsChild.map(
              (condition, index) => (
                <li key={index}>{condition}</li>
              )
            )}
          </ul>
        ) : null}

        <p>
          <strong>• Other applicable information:</strong>{" "}
          <span className="block">
            {patientData?.otherApplicableInformation ?? "-"}
          </span>
        </p>

        <h2>Medical History:</h2>

        <p>
          <strong>• Who is your Internist or Family Doctor?:</strong>{" "}
          {patientData?.whosYourFamilyDoctor ?? "-"}
        </p>

        <p>
          <strong>• When was your last physical examination?:</strong>{" "}
          {patientData?.yourLastPhysicalExamination ?? "-"}
        </p>

        <p>
          <strong>
            • Current Medications (include Over-the-counter meds, Vitamins,
            Herbs, or Supplements):
          </strong>{" "}
          {patientData?.currentMedications ?? "-"}
        </p>

        {patientData?.currentMedications === "Yes" ? (
          <table>
            <thead className="text-center">
              <tr>
                <th>Rx Name</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Prescribing M.D.</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {patientData?.listcurrentMedications.map((doc, index) => (
                <tr className="h-16 relative" key={index}>
                  <td className="border-b border-slate-100">
                    {doc?.listcurrentMedications_rxName}
                  </td>
                  <td className="border-b border-slate-100">
                    {doc?.listcurrentMedications_dosage}
                  </td>
                  <td className="border-b border-slate-100">
                    {doc?.listcurrentMedications_frequency}
                  </td>
                  <td className="border-b border-slate-100">
                    {doc?.listcurrentMedications_prescribingMD}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        <p>
          <strong>• Do you have any drug allergies?:</strong>{" "}
          {patientData?.anyDrugAllergies ?? "-"}{" "}
          {patientData?.anyDrugAllergies === "Yes" ? (
            <span className="block">
              {patientData?.anyDrugAllergiesDescription ?? "-"}
            </span>
          ) : null}
        </p>

        <p>
          <strong>• Do you have any current medical problems?:</strong>{" "}
          {patientData?.anyCurrentMedicalProblems ?? "-"}{" "}
          {patientData?.anyDrugAllergies === "Yes" ? (
            <span className="block">
              {patientData?.anyCurrentMedicalProblemsDescription ?? "-"}
            </span>
          ) : null}
        </p>

        {/* <p>
          <strong>
            • Please check & briefly describe if you have experienced any of the
            following conditions:
          </strong>
        </p>

        <ul>
          {patientData?.experiencedAnyOfTheFollowingConditions ? (
            patientData.experiencedAnyOfTheFollowingConditions.map(
              (condition, index) => <li key={index}>{condition}</li>
            )
          ) : (
            <li>
              {patientData?.experiencedAnyOfTheFollowingConditions ?? "-"}
            </li>
          )}
        </ul> */}

        <p>
          <strong>
            • Please check & briefly describe if you have experienced any of the
            following conditions:
          </strong>
        </p>

        {patientData?.experiencedAnyOfTheFollowingConditions ? (
          <ul>
            {patientData.experiencedAnyOfTheFollowingConditions.map(
              (condition, index) => (
                <li key={index}>{condition}</li>
              )
            )}
          </ul>
        ) : null}

        <h2>Social History:</h2>

        <p>
          <strong>• City of Residence:</strong>{" "}
          {patientData?.cityOfResidence ?? "-"}
        </p>

        <p>
          <strong>• Now Living with:</strong>{" "}
          {patientData?.nowLivingWith ?? "-"}{" "}
          {patientData?.nowLivingWith === "Other" ? (
            <span className="block">
              {patientData?.nowLivingWithOther ?? "-"}
            </span>
          ) : null}
        </p>

        <p>
          <strong>• Children in family:</strong>{" "}
          {patientData?.childrenInFamily ?? "-"}
        </p>

        {patientData?.childrenInFamily === "Applicable" ? (
          <table>
            <thead className="text-center">
              <tr>
                <th>Children Name</th>
                <th>Children Age</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {patientData?.childrenInFamilyDetails.map((doc, index) => (
                <tr className="h-16 relative" key={index}>
                  <td className="border-b border-slate-100">
                    {doc?.childrenInFamilyDetails_childrenName}
                  </td>
                  <td className="border-b border-slate-100">
                    {doc?.childrenInFamilyDetails_childrenAge}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        <p>
          <strong>• Marital status:</strong>{" "}
          {patientData?.patientMaritalStatuss ?? "-"}{" "}
          {patientData?.patientMaritalStatuss === "Married" ? (
            <span className="block">
              {" "}
              {patientData?.patientMaritalStatussDescription ?? "-"} years.
            </span>
          ) : null}
        </p>

        <p>
          <strong>
            • Have you ever experienced or witnessed any physical abuse, sexual
            abuse, or neglect?:
          </strong>{" "}
          {patientData?.everExperiencedAnyPhysicalAbuse ?? "-"}{" "}
          {patientData?.everExperiencedAnyPhysicalAbuse === "Applicable" ? (
            <span className="block">
              {patientData?.everExperiencedAnyPhysicalAbuseDescription ?? "-"}
            </span>
          ) : null}
        </p>

        <h2>Job History:</h2>

        <table>
          <thead className="text-center">
            <tr>
              <th>Position/ Job</th>
              <th>Name of Employer</th>
              <th>Dates of employment</th>
              <th>Reason for leaving job</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {patientData?.jobHistory.map((doc, index) => (
              <tr className="h-16 relative" key={index}>
                <td className="border-b border-slate-100">
                  {doc?.jobHistory_positionJob}
                </td>
                <td className="border-b border-slate-100">
                  {doc?.jobHistory_nameOfEmployer}
                </td>

                <td className="border-b border-slate-100">
                  {doc?.jobHistory_datesOfEmployment
                    ? format(
                        new Date(doc.jobHistory_datesOfEmployment),
                        "MM/dd/yyyy"
                      )
                    : "-"}
                </td>
                <td className="border-b border-slate-100">
                  {doc?.jobHistory_reasonForLeavingJob}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>
          <strong>
            • If currently employed, do you find satisfaction in your work?:
          </strong>{" "}
          {patientData?.doYouFindSatisfactionInYourWork ?? "-"}
        </p>

        <h2>School History:</h2>

        <div className="flex items-center justify-between">
          <p>
            <strong>• Highest grade level completed:</strong>{" "}
            {patientData?.highestGradeLevelCompleted ?? "-"}
          </p>
          <p>
            <strong>• Name of last school attended:</strong>{" "}
            {patientData?.nameOfLastSchoolAttended ?? "-"}
          </p>
        </div>

        <p>
          <strong>• Current Academic Performance:</strong>{" "}
          {patientData?.currentAcademicPerformance ?? "-"}
        </p>

        <p>
          <strong>• Past Academic Performance:</strong>{" "}
          {patientData?.pastAcademicPerformance ?? "-"}
        </p>

        <p>
          <strong>• Past Behavioral Performance:</strong>{" "}
          {patientData?.pastBehavioralPerformance ?? "-"}
        </p>

        <p>
          <strong>• Were you ever in any special education programs?:</strong>{" "}
          {patientData?.inAnySpecialEducationPrograms ?? "-"}{" "}
          {patientData?.inAnySpecialEducationPrograms === "Yes" ? (
            <span className="block">
              {patientData?.inAnySpecialEducationProgramsDescription ?? "-"}
            </span>
          ) : null}
        </p>

        <p>
          <strong>• Any known Learning Disabilities?:</strong>{" "}
          {patientData?.anyKnownLearningDisabilities ?? "-"}
        </p>

        <h2>Legal Problems:</h2>

        <p>
          <strong>• Have you ever been arrested or had legal charges?:</strong>{" "}
          {patientData?.everArrestedOrHadLegalCharges ?? "-"}{" "}
          {patientData?.everArrestedOrHadLegalCharges === "Yes" ? (
            <span className="block">
              {patientData?.everArrestedOrHadLegalChargesDescription ?? "-"}
            </span>
          ) : null}
        </p>

        <h2>Religious Beliefs:</h2>
        <p>
          <strong>• Religious Beliefs: </strong>{" "}
          {patientData?.religiousBeliefs ?? "-"}
        </p>

        {patientData?.religiousBeliefs === "Other" ? (
          <p>{patientData?.religiousBeliefsOther ?? "-"}</p>
        ) : patientData?.religiousBeliefs === "Christen" ? (
          <p>{patientData?.religiousBeliefsChristen ?? "-"}</p>
        ) : null}

        <p>
          <strong>• Actively involved in local church?: </strong>{" "}
          {patientData?.activelyInvolvedInLocalChurch ?? "-"}
        </p>

        <p>
          <strong>• Pray regularly?: </strong>{" "}
          {patientData?.prayRegularly ?? "-"}
        </p>

        <p>
          <strong>• In your home, the practice of your faith is: </strong>{" "}
          {patientData?.thePracticeOfYourFaith ?? "-"}
        </p>
      </article>
    </div>
  );
};

const InsuranceCard = ({ patientData }) => {
  const hasInsuranceCardFront = patientData?.insuranceCardFront;
  const hasInsuranceCardBack = patientData?.insuranceCardBack;

  return (
    <>
      {hasInsuranceCardFront || hasInsuranceCardBack ? (
        <>
          <p className="text-xl mb-10 underline underline-offset-2 font-bold">
            * Insurance Card *
          </p>{" "}
          {hasInsuranceCardFront && (
            <div>
              <p>Front:</p>
              <a
                href={patientData.insuranceCardFront}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline underline-offset-2 hover:text-blue-800"
              >
                Click here to open the front side of document
              </a>
            </div>
          )}
          {hasInsuranceCardBack && (
            <div>
              <p>Back:</p>
              <a
                href={patientData.insuranceCardBack}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline underline-offset-2 hover:text-blue-800"
              >
                Click here to open the back side of document
              </a>
            </div>
          )}
          {/* You can add code to display the images here if needed */}
        </>
      ) : (
        <>
          <p className="text-xl mb-10 underline underline-offset-2 font-bold">
            * Insurance Card *
          </p>{" "}
          <p>No Documents to show</p>
        </>
      )}
    </>
  );
};

const DrivingLicense = ({ patientData }) => {
  return (
    <>
      {patientData?.drivingLicense ? (
        <>
          <p className="text-xl mb-10 underline underline-offset-2 font-bold">
            * Driving Lincense *
          </p>{" "}
          <a
            href={patientData.drivingLicense}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline underline-offset-2 hover:text-blue-800"
          >
            Click here to open the document
          </a>
        </>
      ) : (
        <>
          <p className="text-xl mb-10 underline underline-offset-2 font-bold">
            * Driving Lincense *
          </p>{" "}
          <p>No Document to show</p>
        </>
      )}
    </>
  );
};
