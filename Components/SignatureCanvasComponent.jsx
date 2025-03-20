import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignatureCanvasComponent = ({ setFieldValue }) => {
  const canvasRef = useRef(null);

  const handleClear = () => {
    canvasRef.current.clear();
    setFieldValue("patientSignature1", "");
  };

  const handleSave = () => {
    if (canvasRef.current.isEmpty()) {
      return;
    }
    setFieldValue("patientSignature1", canvasRef.current.toDataURL());
  };

  return (
    <div>
      <SignatureCanvas
        ref={canvasRef}
        canvasProps={{
          width: 500,
          height: 200,
          className: "signatureCanvas mb-4",
        }}
      />
      <div className="flex gap-4 mb-4">
        <button
          className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
          type="button"
          onClick={handleClear}
        >
          Clear
        </button>
        <button
          className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
          type="button"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SignatureCanvasComponent;
