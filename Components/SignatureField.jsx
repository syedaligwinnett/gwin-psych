import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignatureField = ({ field, form }) => {
  const sigCanvas = useRef();

  const handleClear = () => {
    sigCanvas.current.clear();
    form.setFieldValue(field.name, "");
  };

  return (
    <div>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ width: 400, height: 200, className: "signature-canvas" }}
        onEnd={() => {
          form.setFieldValue(field.name, sigCanvas.current.toDataURL());
        }}
      />
      <button type="button" onClick={handleClear}>
        Clear Signature
      </button>
    </div>
  );
};

export default SignatureField;
