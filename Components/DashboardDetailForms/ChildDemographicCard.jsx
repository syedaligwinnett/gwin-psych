import React from "react";

const ChildDemographicCard = ({ dataSnapshot }) => {
  return (
    <div className="text-slate-900 flex items-center justify-between mb-5">
      <h3 className="text-base font-semibold">
        {dataSnapshot.data()?.patientRegistrationChild?.patientChildFirstName ??
          "-"}{" "}
        {dataSnapshot.data()?.patientRegistrationChild?.patientChildLastName ??
          "-"}
      </h3>
      <span className="px-2 py-1 rounded-sm text-sm bg-amber-100">
        {dataSnapshot.data()?.formType ?? "-"}
      </span>
    </div>
  );
};

export default ChildDemographicCard;
