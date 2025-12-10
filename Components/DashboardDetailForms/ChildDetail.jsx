import React from "react";
import Link from "next/link";
import { format } from "date-fns";

const ChildDetail = ({ section, dataSnapshot }) => {
  switch (section) {
    case 1:
      return (
        <div>
          <TermsAndCondtion />
          <PatientRegistration
            patientData={dataSnapshot?.data()?.patientRegistrationChild}
          />
          <PatientConsentForm
            patientData={dataSnapshot?.data()?.patientConsentChild}
          />
          <PrivacyPolicy
            patientData={dataSnapshot?.data()?.privacyPolicyChild}
          />
          <Responsibility
            patientData={dataSnapshot?.data()?.responsibilityStmtChild}
          />
          <FeeShcedule patientData={dataSnapshot?.data()?.feeScheduleChild} />
          <CancellationPolicy
            patientData={dataSnapshot?.data()?.cancellationPolicyChild}
          />
        </div>
      );
      break;

    case 2:
      return (
        <Demographic patientData={dataSnapshot?.data()?.demographicChild} />
      );
      break;

    case 3:
      return (
        <Telepsychiatry
          patientData={dataSnapshot?.data()?.telepsychiatryChild}
        />
      );
      break;

    case 4:
      return <Questionnaire patientData={dataSnapshot?.data()?.historyChild} />;
      break;

    case 5:
      return (
        <InsuranceCard
          patientData={dataSnapshot?.data()?.insuranceCardDocument}
        />
      );
      break;

    case 6:
      return (
        <DrivingLicense
          patientData={dataSnapshot?.data()?.drivingLicenseDocument}
        />
      );
      break;

    case 7:
      return (
        <AdditionalDocuments patientData={dataSnapshot?.data()?.historyChild} />
      );
      break;

    default:
      break;
  }
};

export default ChildDetail;

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
      <div className="grid grid-cols-4 text-slate-800 text-xs gap-3 print:gap-1">
        <div className="col-span-4 flex items-center border-b border-b-slate-300">
          <p className="font-semibold">Patient Name:</p>
          <p className="flex-auto flex items-center justify-around">
            <span>{patientData?.patientChildLastName ?? "-"}</span>
            <span>{patientData?.patientChildFirstName ?? "-"}</span>
            <span>{patientData?.patientChildMiddleName ?? "-"}</span>
          </p>
        </div>

        <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Address:</p>
          <p>{patientData?.child_address ?? "-"}</p>
        </div>

        <div className="col-span-4 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Home Phone:</p>
          <p>{patientData?.patientNumber ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">City, State, Zip:</p>
          <p>
            {patientData?.patientAddressCity ?? "-"}{" "}
            {patientData?.patientAddressState ?? "-"}{" "}
            {patientData?.patientAddressZip ?? "-"}{" "}
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
          <p className="font-semibold">Race:</p>
          <p>{patientData?.patientRace ?? "-"}</p>
        </div>

        <div className="flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">DOB:</p>
          <p>
            {patientData?.patientChildDOB ? patientData.patientChildDOB : "-"}
          </p>
        </div>

        <div className="flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">SSN:</p>
          <p>{patientData?.patientSsn ?? "-"}</p>
        </div>

        <div className="col-span-4 flex items-center gap-2.5">
          <p className="font-semibold">
            Patient School (Name / Address /Phone):
          </p>
          <p>{patientData?.patientSchool ?? "-"}</p>
        </div>

        <div className="col-span-4 border-b-2 border-black w-full my-2"></div>

        <div className="col-span-2 space-y-2 print:space-y-1">
          <h3 className="text-sm text-left font-bold">
            FATHER&apos;S NAME/OTHER LEGAL GUARDIAN
          </h3>
          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Father&apos;s Name:</p>
            <p>{patientData?.patientFatherName ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Father&apos;s Date of Birth:</p>
            <p>
              {patientData?.patientFatherDOB
                ? patientData.patientFatherDOB
                : "-"}
            </p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Home Address:</p>
            <p>{patientData?.patientFatherAddress ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">City/State/Zip:</p>
            <p>
              {patientData?.patientFatherAddressCity ?? "-"}{" "}
              {patientData?.patientFatherAddressState ?? "-"}{" "}
              {patientData?.patientFatherAddressZip ?? "-"}{" "}
            </p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Home Telephone:</p>
            <p>{patientData?.patientFatherTelePhone ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Employer:</p>
            <p>{patientData?.patientFatherEmployer ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Occupation:</p>
            <p>{patientData?.patientFatherOccupation ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Address:</p>
            <p>{patientData?.patientFatherOccupationAddress ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">City/State/Zip:</p>
            <p>
              {patientData?.patientFatherOccupationAddressCity ?? "-"}{" "}
              {patientData?.patientFatherOccupationAddressState ?? "-"}{" "}
              {patientData?.patientFatherOccupationAddressZip ?? "-"}{" "}
            </p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Work Telephone:</p>
            <p>{patientData?.patientFatherOccupationTelephone ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Social Security #:</p>
            <p>{patientData?.patientFatherScurity ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Marital Status:</p>
            <p>{patientData?.patientFatherMarried ?? "-"}</p>
          </div>
        </div>

        <div className="col-span-2 space-y-2 print:space-y-1">
          <h3 className="text-sm text-left font-bold">
            MOTHER&apos;S NAME/OTHER LEGALGUARDIAN
          </h3>
          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Mother&apos;s Name:</p>
            <p>{patientData?.patientMotherName ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Mother&apos;s Date of Birth:</p>
            <p>
              {patientData?.patientMotherDOB
                ? patientData.patientMotherDOB
                : "-"}
            </p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Home Address:</p>
            <p>{patientData?.patientMotherAddress ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">City/State/Zip:</p>
            <p>
              {patientData?.patientMotherAddressCity ?? "-"}{" "}
              {patientData?.patientMotherAddressState ?? "-"}{" "}
              {patientData?.patientMotherAddressZip ?? "-"}
            </p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Home Telephone:</p>
            <p>{patientData?.patientMotherTelePhone ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Employer:</p>
            <p>{patientData?.patientMotherEmployer ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Occupation:</p>
            <p>{patientData?.patientMotherOccupation ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Address:</p>
            <p>{patientData?.patientMotherOccupationAddress ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">City/State/Zip:</p>
            <p>
              {patientData?.patientMotherOccupationAddressCity ?? "-"}{" "}
              {patientData?.patientMotherOccupationAddressState ?? "-"}{" "}
              {patientData?.patientMotherOccupationAddressZip ?? "-"}{" "}
            </p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Work Telephone:</p>
            <p>{patientData?.patientMotherOccupationTelephone ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Social Security #:</p>
            <p>{patientData?.patientMotherScurity ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Marital Status:</p>
            <p>{patientData?.patientMotherMarried ?? "-"}</p>
          </div>
        </div>

        <h3 className="col-span-4 mt-2 text-sm text-left font-bold underline underline-offset-2">
          Insurance Information:
        </h3>

        <div className="col-span-2 space-y-2 print:space-y-1">
          <p className="col-span-4 text-left mt-2 py-1 px-2.5  print:py-0 print:px-0">
            <strong>Does father have any insurance?:</strong>{" "}
            {patientData?.doYouHaveInsuranceFather ?? "-"}
          </p>

          {patientData?.doYouHaveInsuranceFather === "Yes" ? (
            <>
              <div className="flex items-center border-b border-b-slate-300 gap-2.5">
                <p className="font-semibold">Father&apos;sInsurance:</p>
                <p>{patientData?.patientFatherInsurance ?? "-"}</p>
              </div>

              <div className="flex items-center border-b border-b-slate-300 gap-2.5">
                <p className="font-semibold">Insurance Address:</p>
                <p>{patientData?.patientFatherInsuranceAddress ?? "-"}</p>
              </div>

              <div className="flex items-center border-b border-b-slate-300 gap-2.5">
                <p className="font-semibold">Subscriber:</p>
                <p>{patientData?.patientFatherInsuranceSubscriber ?? "-"}</p>
              </div>

              <div className="flex items-center border-b border-b-slate-300 gap-2.5">
                <p className="font-semibold">Relationship to Patient:</p>
                <p>{patientData?.patientFatherInsuranceRelation ?? "-"}</p>
              </div>

              <div className="flex items-center border-b border-b-slate-300 gap-2.5">
                <p className="font-semibold">ID #:</p>
                <p>{patientData?.patientFatherInsuranceID ?? "-"}</p>
              </div>

              <div className="flex items-center border-b border-b-slate-300 gap-2.5">
                <p className="font-semibold">Effective Date :</p>
                <p>
                  {patientData?.patientFatherInsuranceDate
                    ? patientData.patientFatherInsuranceDate
                    : "-"}
                </p>
              </div>
            </>
          ) : null}
        </div>

        <div className="col-span-2 space-y-2 print:space-y-1">
          <p className="col-span-4 text-left mt-2 py-1 px-2.5  print:py-0 print:px-0">
            <strong>Does mother have any insurance?:</strong>{" "}
            {patientData?.doYouHaveInsuranceMother ?? "-"}
          </p>

          {patientData?.doYouHaveInsuranceMother === "Yes" ? (
            <>
              <div className="flex items-center border-b border-b-slate-300 gap-2.5">
                <p className="font-semibold">Mother&apos;s Insurance:</p>
                <p>{patientData?.patientMotherInsurance ?? "-"}</p>
              </div>

              <div className="flex items-center border-b border-b-slate-300 gap-2.5">
                <p className="font-semibold">Insurance Address:</p>
                <p>{patientData?.patientMotherInsuranceInsurance ?? "-"}</p>
              </div>

              <div className="flex items-center border-b border-b-slate-300 gap-2.5">
                <p className="font-semibold">Subscriber:</p>
                <p>{patientData?.patientMotherInsuranceSubscriber ?? "-"}</p>
              </div>

              <div className="flex items-center border-b border-b-slate-300 gap-2.5">
                <p className="font-semibold">Relationship to Patient:</p>
                <p>{patientData?.patientMotherInsuranceRelationShip ?? "-"}</p>
              </div>

              <div className="flex items-center border-b border-b-slate-300 gap-2.5">
                <p className="font-semibold">ID #:</p>
                <p>{patientData?.patientMotherInsuranceID ?? "-"}</p>
              </div>

              <div className="flex items-center border-b border-b-slate-300 gap-2.5">
                <p className="font-semibold">Effective Date :</p>
                <p>
                  {patientData?.patientMotherInsuranceDate
                    ? patientData.patientMotherInsuranceDate
                    : "-"}
                </p>
              </div>
            </>
          ) : null}
        </div>

        <h3 className="col-span-4 mt-2 text-sm text-left font-bold underline underline-offset-2">
          Other Coverage(through other Agencies):
        </h3>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Name of Organization:</p>
          <p>{patientData?.patientOrganization ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Identification:</p>
          <p>{patientData?.patientOrganizationidentification ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Address:</p>
          <p>{patientData?.patientOrganizationAddress ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Effective Date:</p>
          <p>
            {patientData?.patientOrganizationDate
              ? patientData.patientOrganizationDate
              : "-"}
          </p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">City/State/Zip:</p>
          <p>
            {patientData?.patientOrganizationCity ?? "-"}{" "}
            {patientData?.patientOrganizationState ?? "-"}{" "}
            {patientData?.patientOrganizationZip ?? "-"}
          </p>
        </div>

        <h3 className="col-span-4 mt-2 text-sm text-left font-bold underline underline-offset-2">
          Referring Physician OR Organization:
        </h3>

        <div className="col-span-2 space-y-2 print:space-y-1">
          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Full Name:</p>
            <p>{patientData?.referringPhysicianName ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Office Address:</p>
            <p>{patientData?.referringPhysicianAddress ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">City/State/Zip:</p>
            <p>
              {patientData?.referringPhysicianCity ?? "-"}{" "}
              {patientData?.referringPhysicianState ?? "-"}{" "}
              {patientData?.referringPhysicianZip ?? "-"}{" "}
            </p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Office Telephone No:</p>
            <p>{patientData?.referringPhysicianPhone ?? "-"}</p>
          </div>

          <div className="flex items-center border-b border-b-slate-300 gap-2.5">
            <p className="font-semibold">Specialty:</p>
            <p>{patientData?.referringPhysicianSpeciality ?? "-"}</p>
          </div>
        </div>

        <h3 className="col-span-4 mt-2 text-sm text-left font-bold underline underline-offset-2">
          Emergency Contact Information:
        </h3>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Name:</p>
          <p>
            {patientData?.patientChilEmergencyNameLast ?? "-"}{" "}
            {patientData?.patientChildEmergencyFirstName ?? "-"}{" "}
            {patientData?.patientChildMiddleEmergencyName ?? "-"}
          </p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Relationship:</p>
          <p>{patientData?.patientChildEmergencyRelationship ?? "-"}</p>
        </div>

        <div className="col-span-2 flex items-center border-b border-b-slate-300 gap-2.5">
          <p className="font-semibold">Phone:</p>
          <p>{patientData?.patientChildEmergencyRelationshipPhone ?? "-"}</p>
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
      <h1 className="mt-20 print:mt-60 text-slate-900 text-xl font-semibold mb-2.5 print:mb-1">
        Gwinnett Psychiatry, PC
      </h1>
      <h2 className="text-lg text-slate-900 font-semibold mb-8 print:mb-3">
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
          <p>{formattedDate}</p>
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
          <strong>Patient’s Name:</strong>{" "}
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
          <p>{formattedDate}</p>
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
      <h1 className="mt-20 text-slate-900 text-xl font-semibold mb-2.5 print:mb-1">
        Gwinnett Psychiatry, PC
      </h1>
      <h2 className="text-base text-slate-900 font-semibold mb-8 print:mb-3">
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
            <strong>Date:</strong>

            {formattedDate}
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
      <h1 className="mt-20 text-slate-900 text-xl font-semibold mb-2.5 print:mb-1">
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
              <td>$50</td>
            </tr>
            <tr>
              <td>
                <ul>
                  <li>Medical Records</li>
                </ul>
              </td>
              <td>$20</td>
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
          <p>{formattedDate}</p>
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
          If you do not cancel by the deadline,{" "}
          <strong>you will be assessed a $50.00 missed appointment fee</strong>.
          This fee is <strong>not</strong> covered by any insurance company and
          will be your responsibility to pay before your next visit. Most of the
          time we remind our patients a day before their appointments but we are
          not obligated. Therefore, this is patient’s responsibility to keep
          track of his/her appointment.
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
          <span>{patientData?.patientpersonalInformationName ?? "-"}</span>
        </div>

        <div className="text-left space-x-3 border-b border-b-slate-300">
          <span className="font-semibold">DOB:</span>
          <span>
            {" "}
            {patientData?.patientChildDOB ? patientData.patientChildDOB : "-"}
          </span>
        </div>

        <div className="col-span-2 text-left space-x-3 border-b border-b-slate-300">
          <span className="font-semibold">Address:</span>
          <span>{patientData?.patientpersonalInformationAddress ?? "-"}</span>
        </div>

        <div className="col-span-2 text-left space-x-3 border-b border-b-slate-300">
          <span className="font-semibold">Phone:</span>
          <span>
            {patientData?.patientChildEmergencyRelationshipPhone ?? "-"}
          </span>
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
            <span className="ml-2">Fax: (678) 226-2296</span>
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
          {patientData?.patientChildDOB ? patientData.patientChildDOB : "-"}
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
  const timestamp = patientData?.patientHistoryToday;
  const formattedDate = timestamp
    ? format(timestamp.toDate(), "MM/dd/yyyy")
    : "-";

  return (
    <div>
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
      <article className="prose-sm text-left prose-table:text-sm prose-th:px-0 prose-table:border prose-th:border prose-td:border prose-thead:bg-slate-200 prose-table:border-collapse prose-th:border-slate-500 prose-td:border-slate-500 prose-table:w-full prose-table:table-fixed prose-td:px-1 prose-h2:text-lg prose-h2:text-slate-900 prose-h2:font-semibold prose-h2:underline prose-h2:underline-offset-2 prose-ul:list-disc prose-ul:space-y-4">
        <h2 className="text-center mb-2">CHILD HISTORY FORM</h2>

        <div className="grid grid-cols-2 gap-x-5 max-w-lg mx-auto">
          <p className="col-span-2 border-b border-b-slate-400">
            <strong>Child&apos;s Name:</strong>{" "}
            {patientData?.childHistoryName ?? "-"}
          </p>

          <p className="border-b border-b-slate-400">
            <strong>Date of Birth:</strong>{" "}
            {patientData?.patientChildDOB ? patientData.patientChildDOB : "-"}
          </p>

          <p className="border-b border-b-slate-400">
            <strong>Today&apos;s Date:</strong> {formattedDate}
          </p>

          <p className="col-span-2 border-b border-b-slate-400">
            <strong>Completed by:</strong>{" "}
            {patientData?.childHistoryCompletedBy ?? "-"}
          </p>
        </div>

        <p>
          <strong>
            Please describe any medical difficulty experienced by you or your
            child during
          </strong>
        </p>

        <ul>
          <li>
            <strong>Pregnancy with This Child:</strong>{" "}
            <span className="ml-1">
              {patientData?.medicalDificultyatPregnancy ?? "-"}
            </span>
          </li>
          <li>
            <strong>Labor and Delivery:</strong>
            <span className="ml-1">
              {patientData?.medicalDificultyatDelivery ?? "-"}
            </span>
          </li>
          <p className="text-center space-x-4">
            <span>
              <strong>Birth weight:</strong>
            </span>{" "}
            <span>{patientData?.patientweightinPounds ?? "-"} </span>{" "}
            <span>{patientData?.patientweightinOunces ?? "-"} </span>
          </p>
          <li>
            <strong>Child in the First Days after Birth:</strong>
            <span className="ml-1">
              {patientData?.childafterbirthFirstday ?? "-"}
            </span>
          </li>
          <li>
            <strong>Child&apos;s First Year:</strong>
            <span className="ml-1">
              {patientData?.childafterbirthFirstYear ?? "-"}
            </span>
          </li>
        </ul>

        <p>
          <strong>
            Describe any current or ongoing medical problem and medication (or
            other form of treatment) for this child:
          </strong>
          <span className="ml-1">
            {patientData?.childCurrentongoingmedicalProblem ?? "-"}
          </span>
        </p>

        <p>
          <strong>Describe any eating problems your child has.</strong>
          <span className="ml-1">
            {patientData?.childCurrenteatingProblem ?? "-"}
          </span>
        </p>

        <p>
          <strong>Describe any sleeping problems your child has.</strong>
          <span className="ml-1">
            {patientData?.childCurrentongoingSleepingProblem ?? "-"}
          </span>
        </p>

        <p>
          <strong>
            Please rate your child&apos;s progress in the following areas of
            development
          </strong>
        </p>

        <table>
          <thead className="text-center">
            <tr>
              <th className="w-80">AREA OF DEVELOPMENT</th>
              <th>SLOW</th>
              <th>AVERAGE</th>
              <th>FAST</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td>
                <strong>Speech and Langauge</strong>
              </td>
              <td>
                {patientData?.patientSpeechDevelopment === "Slow" ? "✓" : "-"}
              </td>
              <td>
                {patientData?.patientSpeechDevelopment === "Average"
                  ? "✓"
                  : "-"}
              </td>
              <td>
                {patientData?.patientSpeechDevelopment === "Fast" ? "✓" : "-"}
              </td>
            </tr>
            <tr>
              <td>
                <strong>
                  Gross Coordination (running, walking and sports)
                </strong>
              </td>
              <td>
                {patientData?.patientGrossDevelopment === "Slow" ? "✓" : "-"}
              </td>
              <td>
                {patientData?.patientGrossDevelopment === "Average" ? "✓" : "-"}
              </td>
              <td>
                {patientData?.patientGrossDevelopment === "Fast" ? "✓" : "-"}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Fine Coordination (writing and drawing)</strong>
              </td>
              <td>
                {patientData?.patientCordinationDevelopment === "Slow"
                  ? "✓"
                  : "-"}
              </td>
              <td>
                {patientData?.patientCordinationDevelopment === "Average"
                  ? "✓"
                  : "-"}
              </td>
              <td>
                {patientData?.patientCordinationDevelopment === "Fast"
                  ? "✓"
                  : "-"}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Socializing</strong>
              </td>
              <td>
                {patientData?.patientSocializingDevelopment === "Slow"
                  ? "✓"
                  : "-"}
              </td>
              <td>
                {patientData?.patientSocializingDevelopment === "Average"
                  ? "✓"
                  : "-"}
              </td>
              <td>
                {patientData?.patientSocializingDevelopment === "Fast"
                  ? "✓"
                  : "-"}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Describe any concerns in this space or above.</strong>
              </td>
              <td>
                {patientData?.patientConcernsDevelopment === "Slow" ? "✓" : "-"}
              </td>
              <td>
                {patientData?.patientConcernsDevelopment === "Average"
                  ? "✓"
                  : "-"}
              </td>
              <td>
                {patientData?.patientConcernsDevelopment === "Fast" ? "✓" : "-"}
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>
            Past Milestones: At what age did your child achieve the following
            skills?
          </strong>
        </p>

        <table>
          <thead className="text-center">
            <tr>
              <th>AREA OF DEVELOPMENT</th>
              <th>AGE CHILD ACHIEVED SKILL</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td>
                <strong>
                  Experience feeding difficulties or colic - Describe.
                </strong>
              </td>
              <td>{patientData?.experienceFeedingDifFiculties ?? "-"}</td>
            </tr>
            <tr>
              <td>
                <strong>Sit Alone</strong>
              </td>
              <td>{patientData?.experienceSitAlone ?? "-"}</td>
            </tr>
            <tr>
              <td>
                <strong>Walk Alone</strong>
              </td>
              <td>{patientData?.experiencwalkalone ?? "-"}</td>
            </tr>
            <tr>
              <td>
                <strong>Speak Real Words</strong>
              </td>
              <td>{patientData?.experienceRealWords ?? "-"}</td>
            </tr>
            <tr>
              <td>
                <strong>Speak Real Sentences</strong>
              </td>
              <td>{patientData?.experienceRealSentences ?? "-"}</td>
            </tr>
            <tr>
              <td>
                <strong>Achieve Day and Night BowelTraining</strong>
              </td>
              <td>{patientData?.experienceAchieveBowltraining ?? "-"}</td>
            </tr>
            <tr>
              <td>
                <strong>Achieve Night Bladder Training</strong>
              </td>
              <td>{patientData?.nightBladdedTraining ?? "-"}</td>
            </tr>
            <tr>
              <td>
                <strong>Achieve Day Bladder Training</strong>
              </td>
              <td>{patientData?.dayBladderTraining ?? "-"}</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>
            Describe your child&apos;s past medical history concerning the
            following events.
          </strong>
        </p>

        <table>
          <thead className="text-center">
            <tr>
              <th>EVENT</th>
              <th>AGE</th>
              <th>REASON</th>
              <th>RESULT</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td>
                <strong>Hospitalization</strong>
              </td>
              <td>{patientData?.hospitalizationAge ?? "-"}</td>
              <td>{patientData?.hospitalizationReason ?? "-"}</td>
              <td>{patientData?.HospitalizationResult ?? "-"}</td>
            </tr>
            <tr>
              <td>
                <strong>Surgeries</strong>
              </td>
              <td>{patientData?.surgeriesAge ?? "-"}</td>
              <td>{patientData?.surgeriesReason ?? "-"}</td>
              <td>{patientData?.surgeriesResult ?? "-"}</td>
            </tr>
            <tr>
              <td>
                <strong>Seizures</strong>
              </td>
              <td>{patientData?.seizuresAge ?? "-"}</td>
              <td>{patientData?.seizuresReason ?? "-"}</td>
              <td>{patientData?.seizuresResult ?? "-"}</td>
            </tr>
            <tr>
              <td>
                <strong>Head Injuries</strong>
              </td>
              <td>{patientData?.headInjuriesAge ?? "-"}</td>
              <td>{patientData?.headInjuriesReason ?? "-"}</td>
              <td>{patientData?.headInjuriesResult ?? "-"}</td>
            </tr>
            <tr>
              <td>
                <strong>Lengthy Medical Problems</strong>
              </td>
              <td>{patientData?.MedicalProblemsAge ?? "-"}</td>
              <td>{patientData?.MedicalProblemsReason ?? "-"}</td>
              <td>{patientData?.MedicalProblemsResult ?? "-"}</td>
            </tr>
            <tr>
              <td>
                <strong>Medications Used for Long Periods of Time</strong>
              </td>
              <td>{patientData?.medicationsUsedage ?? "-"}</td>
              <td>{patientData?.medicationsUsedReason ?? "-"}</td>
              <td>{patientData?.medicationsUsedResult ?? "-"}</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>
            Describe any psychiatric evaluation or treatment your child has had
          </strong>
        </p>

        <table>
          <thead className="text-center">
            <tr>
              <th>AGE</th>
              <th>REASON</th>
              <th>WHERE</th>
              <th>RESULT</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {patientData?.evaluation.map((doc, index) => (
              <tr key={index}>
                <td>{doc?.evolationofAge}</td>
                <td>{doc?.evaluationofReason}</td>
                <td>{doc?.evaluationofWhere}</td>
                <td>{doc?.evaluationofResult}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p>
          <strong>
            Describe any psychiatric evaluation or treatment your child has had
          </strong>
        </p>

        <table>
          <thead className="text-center">
            <tr>
              <th>Vision</th>
              <th>Hearing</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td>{patientData?.childVision ?? "-"}</td>
              <td>{patientData?.childHearing ?? "-"}</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>
            Describe any problems your child is having now or has had in the
            past at school.
          </strong>
        </p>

        <table>
          <thead className="text-center">
            <tr>
              <th>Type of Problem</th>
              <th>Present</th>
              <th>Past</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td>
                <strong>Academic</strong>
              </td>
              <td>{patientData?.acadmicProblemsPresent ?? "-"}</td>
              <td>{patientData?.acadmicProblemsPast ?? "-"}</td>
            </tr>
            <tr>
              <td>
                <strong>Behavior</strong>
              </td>
              <td>{patientData?.behaviorProblemsPresent ?? "-"}</td>
              <td>{patientData?.behaviorProblemsPast ?? "-"}</td>
            </tr>
            <tr>
              <td>
                <strong>Peer Relations</strong>
              </td>
              <td>{patientData?.peerRelationsProblemsPresent ?? "-"}</td>
              <td>{patientData?.peerRelationsProblemsPast ?? "-"}</td>
            </tr>
            <tr>
              <td>
                <strong>Relationship to Teacher</strong>
              </td>
              <td>{patientData?.relationshipToTeacherPresent ?? "-"}</td>
              <td>{patientData?.relationshipToTeacherPast ?? "-"}</td>
            </tr>
            <tr>
              <td>
                <strong>Concerns</strong>
              </td>
              <td>{patientData?.concernsPresent ?? "-"}</td>
              <td>{patientData?.concernsPast ?? "-"}</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Where does your child attend school?:</strong>
          {patientData?.childAttendedschool ?? "-"}
        </p>

        <p>
          <strong>Grade:</strong>
          {patientData?.gradeOfSchool ?? "-"}
        </p>

        <p>
          <strong>Type of School:</strong>
          {patientData?.typeOfSchool ?? "-"}
        </p>

        <p>
          <strong>
            List the schools (day care and current) your child has attended.:
          </strong>{" "}
          <span>{patientData?.listTheSchools ?? "-"}</span>
        </p>

        <p>
          <strong>
            Describe any psychiatric evaluation or treatment your child has had
          </strong>
        </p>

        <table>
          <thead className="text-center">
            <tr>
              <th>SPECIAL CLASSES</th>
              <th>REPEATED GRADES</th>
              <th>OUTSIDE EDUCATIONAL HELP</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td>{patientData?.specialClasses ?? "-"}</td>
              <td>{patientData?.repeatedGrades ?? "-"}</td>
              <td>{patientData?.outsideEducationalHelp ?? "-"}</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Concerns:</strong>{" "}
          <span>{patientData?.describeAnyOtherConcerns ?? "-"}</span>
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

const AdditionalDocuments = ({ patientData }) => {
  return (
    <>
      {!patientData?.copiesOfEducationPlanImg &&
        !patientData?.copiesOfPsychologicalTestingImg &&
        !patientData?.childReportCardsImg && <p>No Document to show</p>}

      {patientData?.copiesOfEducationPlanImg && (
        <>
          <p className="text-xl mb-10 underline underline-offset-2 font-bold">
            * Copy of individual education plans (IEP) *
          </p>{" "}
          <a
            href={patientData.copiesOfEducationPlanImg}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline underline-offset-2 hover:text-blue-800"
          >
            Click here to open Copy of education plan
          </a>
        </>
      )}

      {patientData?.copiesOfPsychologicalTestingImg && (
        <>
          <p className="text-xl my-10 underline underline-offset-2 font-bold">
            * Copy of school psychological testing *
          </p>{" "}
          <a
            href={patientData.copiesOfPsychologicalTestingImg}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline underline-offset-2 hover:text-blue-800"
          >
            Click here to open Copy of school psychological testing
          </a>
        </>
      )}

      {patientData?.childReportCardsImg && (
        <>
          <p className="text-xl my-10 underline underline-offset-2 font-bold">
            * Your child&apos;s report cards *
          </p>{" "}
          <a
            href={patientData.childReportCardsImg}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline underline-offset-2 hover:text-blue-800"
          >
            Click here to open Child report card
          </a>
        </>
      )}
    </>
  );
};
