import React from "react";
import SignatureCanvas from "react-signature-canvas";

const SignatureField = ({ field, form }) => {
  const handleSignatureChange = (dataUrl) => {
    form.setFieldValue(field.name, dataUrl);
  };

  return (
    <div>
      <SignatureCanvas
        penColor="black"
        canvasProps={{ width: 400, height: 200, className: "signatureCanvas" }}
        onEnd={(data) => handleSignatureChange(data)}
      />
    </div>
  );
};

export default SignatureField;
