import { db, storage } from "@/lib/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useRef, useState } from "react";
// import ReactSignatureCanvas from "react-signature-canvas";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "react-hot-toast";
import Dropzone from "react-dropzone";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { stateList } from "@/lib/select-options";
import Select from "react-select";
import { DocumentTextIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Head from "next/head";
import { format } from "date-fns";

const Child = () => {
  const [step, setStep] = useState(1);
  const canvasRef = useRef(null);
  const [sign, setSign] = useState();
  const [signData, setSignData] = useState();
  const [hand, setHand] = useState();
  const [handData, setHandData] = useState();
  const [mark, setMark] = useState();
  const [markData, setMarkData] = useState();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [copiesOfEducationPlan, setCopiesOfEducationPlan] = useState(0);
  const [copiesOfEducationPlanUploaded, setCopiesOfEducationPlanUploaded] =
    useState(false);
  const [copiesOfEducationPlanPath, setCopiesOfEducationPlanPath] =
    useState("");
  const [
    shouldDeleteCopiesOfEducationPlan,
    setShouldDeleteCopiesOfEducationPlan,
  ] = useState(false);

  const [copiesOfPsychologicalTesting, setCopiesOfPsychologicalTesting] =
    useState(0);
  const [
    copiesOfPsychologicalTestingUploaded,
    setCopiesOfPsychologicalTestingUploaded,
  ] = useState(false);
  const [
    copiesOfPsychologicalTestingPath,
    setCopiesOfPsychologicalTestingPath,
  ] = useState("");
  const [
    shouldDeleteCopiesOfPsychologicalTesting,
    setShouldDeleteCopiesOfPsychologicalTesting,
  ] = useState(false);

  const [childReportCards, setChildReportCards] = useState(0);
  const [childReportCardsUploaded, setChildReportCardsUploaded] =
    useState(false);
  const [childReportCardsPath, setChildReportCardsPath] = useState("");
  const [shouldDeleteChildReportCards, setShouldDeleteChildReportCards] =
    useState(false);

  const [dropError, setDropError] = useState(false);
  const [dragging, setDragging] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const [socialSecurity1, setSocialSecurity1] = useState("");
  const [socialSecurity1Error, setSocialSecurity1Error] = useState("");

  const [socialSecurity2, setSocialSecurity2] = useState("");
  const [socialSecurity2Error, setSocialSecurity2Error] = useState("");

  const [socialSecurity3, setSocialSecurity3] = useState("");
  const [socialSecurity3Error, setSocialSecurity3Error] = useState("");

  const [insuranceCardFrontImg, setInsuranceCardFrontImg] = useState(0);
  const [insuranceCardFrontImgPath, setInsuranceCardFrontImgPath] =
    useState("");
  const [insuranceCardFrontImgUploaded, setInsuranceCardFrontImgUploaded] =
    useState("");
  const [
    shouldDeleteInsuranceCardFrontImg,
    setShouldDeleteInsuranceCardFrontImg,
  ] = useState(false);
  const [insuranceCardBackImg, setInsuranceCardBackImg] = useState(0);
  const [insuranceCardBackImgPath, setInsuranceCardBackImgPath] = useState("");
  const [insuranceCardBackImgUploaded, setInsuranceCardBackImgUploaded] =
    useState("");
  const [
    shouldDeleteInsuranceCardBackImg,
    setShouldDeleteInsuranceCardBackImg,
  ] = useState(false);
  const [drivingLicenseImg, setDrivingLicenseImg] = useState(0);
  const [drivingLicenseImgPath, setDrivingLicenseImgPath] = useState("");
  const [drivingLicenseImgUploaded, setDrivingLicenseImgUploaded] =
    useState("");
  const [shouldDeleteDrivingLicenseImg, setShouldDeleteDrivingLicenseImg] =
    useState(false);

  const handleSocialSecurity1Change = (event) => {
    let inputValue = event.target.value;

    // Remove non-numeric characters and hyphens
    let formattedValue = inputValue.replace(/[\D-]/g, "");

    // Limit to a maximum of 9 characters
    const maxLength = 9;
    if (formattedValue.length > maxLength) {
      formattedValue = formattedValue.substring(0, maxLength);
    }

    if (formattedValue.length > 0) {
      const regex = /^(\d{0,3})(\d{0,2})(\d{0,4})$/;
      const match = formattedValue.match(regex);
      if (match) {
        const formattedSSN = `${match[1]}${match[2] ? "-" + match[2] : ""}${
          match[3] ? "-" + match[3] : ""
        }`;
        setSocialSecurity1(formattedSSN);
        setSocialSecurity1Error("");
      } else {
        setSocialSecurity1(formattedValue);
        setSocialSecurity1Error("Invalid format");
      }
    } else {
      setSocialSecurity1(formattedValue);
      setSocialSecurity1Error("");
    }
  };

  const handleSocialSecurity2Change = (event) => {
    let inputValue = event.target.value;

    // Remove non-numeric characters and hyphens
    let formattedValue = inputValue.replace(/[\D-]/g, "");

    // Limit to a maximum of 9 characters
    const maxLength = 9;
    if (formattedValue.length > maxLength) {
      formattedValue = formattedValue.substring(0, maxLength);
    }

    if (formattedValue.length > 0) {
      const regex = /^(\d{0,3})(\d{0,2})(\d{0,4})$/;
      const match = formattedValue.match(regex);
      if (match) {
        const formattedSSN = `${match[1]}${match[2] ? "-" + match[2] : ""}${
          match[3] ? "-" + match[3] : ""
        }`;
        setSocialSecurity2(formattedSSN);
        setSocialSecurity2Error("");
      } else {
        setSocialSecurity2(formattedValue);
        setSocialSecurity2Error("Invalid format");
      }
    } else {
      setSocialSecurity2(formattedValue);
      setSocialSecurity2Error("");
    }
  };

  const handleSocialSecurity3Change = (event) => {
    let inputValue = event.target.value;

    // Remove non-numeric characters and hyphens
    let formattedValue = inputValue.replace(/[\D-]/g, "");

    // Limit to a maximum of 9 characters
    const maxLength = 9;
    if (formattedValue.length > maxLength) {
      formattedValue = formattedValue.substring(0, maxLength);
    }

    if (formattedValue.length > 0) {
      const regex = /^(\d{0,3})(\d{0,2})(\d{0,4})$/;
      const match = formattedValue.match(regex);
      if (match) {
        const formattedSSN = `${match[1]}${match[2] ? "-" + match[2] : ""}${
          match[3] ? "-" + match[3] : ""
        }`;
        setSocialSecurity3(formattedSSN);
        setSocialSecurity3Error("");
      } else {
        setSocialSecurity3(formattedValue);
        setSocialSecurity3Error("Invalid format");
      }
    } else {
      setSocialSecurity3(formattedValue);
      setSocialSecurity3Error("");
    }
  };

  const acceptableFileTypes = {
    "application/pdf": [],
    "image/*": [],
    "application/msword": [],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      [],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      [],
    "text/csv": [],
  };

  const uploadInsuranceCardFrontImg = async (acceptedFiles) => {
    setInsuranceCardFrontImgUploaded(false);
    setInsuranceCardFrontImg(0);
    var d = new Date();
    var dFormat = `${d.getHours()}${d.getMinutes()}${d.getSeconds()}`;

    // Get file
    var file = acceptedFiles[0];
    // Create storage reference
    if (file) {
      var storageRef = ref(storage, `adult-docs/${dFormat}-${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setInsuranceCardFrontImg(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          setInsuranceCardFrontImgUploaded(true);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setInsuranceCardFrontImgPath(downloadURL);
          });
        }
      );
    }
  };

  const progressStyleInsuranceCardFrontImg = {
    width: insuranceCardFrontImg + "%",
  };

  const deleteInsuranceCardFrontImg = () => {
    if (shouldDeleteInsuranceCardFrontImg) {
      if (insuranceCardFrontImgPath) {
        console.log("Deleting file with path:", insuranceCardFrontImgPath); // Log the path for debugging
        const storageRef = ref(storage, insuranceCardFrontImgPath);
        deleteObject(storageRef)
          .then(() => {
            console.log("File deleted from the database");
            setInsuranceCardFrontImgPath(""); // Clear the path to indicate deletion
            setShouldDeleteInsuranceCardFrontImg(false); // Reset the delete state
          })
          .catch((error) => {
            console.error("Error deleting file from the database:", error);
          });
      } else {
        console.log(
          "InsuranceCardFrontImgPath is empty. Check if it has the correct value."
        );
      }
    } else {
      console.log(
        "shouldDeleteInsuranceCardFrontImg is not set to true. Check if the delete button is being clicked."
      );
    }
  };

  const uploadInsuranceCardBackImg = async (acceptedFiles) => {
    setInsuranceCardBackImgUploaded(false);
    setInsuranceCardBackImg(0);
    var d = new Date();
    var dFormat = `${d.getHours()}${d.getMinutes()}${d.getSeconds()}`;

    // Get file
    var file = acceptedFiles[0];
    // Create storage reference
    if (file) {
      var storageRef = ref(storage, `adult-docs/${dFormat}-${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setInsuranceCardBackImg(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          setInsuranceCardBackImgUploaded(true);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setInsuranceCardBackImgPath(downloadURL);
          });
        }
      );
    }
  };

  const progressStyleInsuranceCardBackImg = {
    width: insuranceCardBackImg + "%",
  };

  const deleteInsuranceCardBackImg = () => {
    if (shouldDeleteInsuranceCardBackImg) {
      if (insuranceCardBackImgPath) {
        console.log("Deleting file with path:", insuranceCardBackImgPath); // Log the path for debugging
        const storageRef = ref(storage, insuranceCardBackImgPath);
        deleteObject(storageRef)
          .then(() => {
            console.log("File deleted from the database");
            setInsuranceCardBackImgPath(""); // Clear the path to indicate deletion
            setShouldDeleteInsuranceCardBackImg(false); // Reset the delete state
          })
          .catch((error) => {
            console.error("Error deleting file from the database:", error);
          });
      } else {
        console.log(
          "InsuranceCardBackImgPath is empty. Check if it has the correct value."
        );
      }
    } else {
      console.log(
        "shouldDeleteInsuranceCardFrontImg is not set to true. Check if the delete button is being clicked."
      );
    }
  };

  const uploadDrivingLicenseImg = async (acceptedFiles) => {
    setDrivingLicenseImgUploaded(false);
    setDrivingLicenseImg(0);
    var d = new Date();
    var dFormat = `${d.getHours()}${d.getMinutes()}${d.getSeconds()}`;

    // Get file
    var file = acceptedFiles[0];
    // Create storage reference
    if (file) {
      var storageRef = ref(storage, `adult-docs/${dFormat}-${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setDrivingLicenseImg(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          setDrivingLicenseImgUploaded(true);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDrivingLicenseImgPath(downloadURL);
          });
        }
      );
    }
  };

  const progressStyleDrivingLicenseImg = {
    width: drivingLicenseImg + "%",
  };

  const deleteDrivingLicenseImg = () => {
    if (shouldDeleteDrivingLicenseImg) {
      if (drivingLicenseImgPath) {
        console.log("Deleting file with path:", drivingLicenseImgPath); // Log the path for debugging
        const storageRef = ref(storage, drivingLicenseImgPath);
        deleteObject(storageRef)
          .then(() => {
            console.log("File deleted from the database");
            setDrivingLicenseImgPath(""); // Clear the path to indicate deletion
            setShouldDeleteDrivingLicenseImg(false); // Reset the delete state
          })
          .catch((error) => {
            console.error("Error deleting file from the database:", error);
          });
      } else {
        console.log(
          "DrivingLicenseImgPath is empty. Check if it has the correct value."
        );
      }
    } else {
      console.log(
        "shouldDeleteDrivingLicenseImg is not set to true. Check if the delete button is being clicked."
      );
    }
  };

  const uploadCopiesOfEducationPlan = async (acceptedFiles) => {
    setCopiesOfEducationPlanUploaded(false);
    setCopiesOfEducationPlan(0);
    var d = new Date();
    var dFormat = `${d.getHours()}${d.getMinutes()}${d.getSeconds()}`;

    // Get file
    var file = acceptedFiles[0];
    // Create storage reference
    if (file) {
      var storageRef = ref(storage, `child-docs/${dFormat}-${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setCopiesOfEducationPlan(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          setCopiesOfEducationPlanUploaded(true);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setCopiesOfEducationPlanPath(downloadURL);
          });
        }
      );
    }
  };

  const progressStyleCopiesOfEducationPlan = {
    width: copiesOfEducationPlan + "%",
  };

  const deleteCopiesOfEducationPlan = () => {
    if (shouldDeleteCopiesOfEducationPlan) {
      if (copiesOfEducationPlanPath) {
        console.log("Deleting file with path:", copiesOfEducationPlanPath); // Log the path for debugging
        const storageRef = ref(storage, copiesOfEducationPlanPath);
        deleteObject(storageRef)
          .then(() => {
            console.log("File deleted from the database");
            setCopiesOfEducationPlanPath(""); // Clear the path to indicate deletion
            setShouldDeleteCopiesOfEducationPlan(false); // Reset the delete state
          })
          .catch((error) => {
            console.error("Error deleting file from the database:", error);
          });
      } else {
        console.log(
          "CopiesOfEducationPlanPath is empty. Check if it has the correct value."
        );
      }
    } else {
      console.log(
        "shouldDeleteDrivingLicenseImg is not set to true. Check if the delete button is being clicked."
      );
    }
  };

  const uploadCopiesOfPsychologicalTesting = async (acceptedFiles) => {
    setCopiesOfPsychologicalTestingUploaded(false);
    setCopiesOfPsychologicalTesting(0);
    var d = new Date();
    var dFormat = `${d.getHours()}${d.getMinutes()}${d.getSeconds()}`;

    // Get file
    var file = acceptedFiles[0];
    // Create storage reference
    if (file) {
      var storageRef = ref(storage, `child-docs/${dFormat}-${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setCopiesOfPsychologicalTesting(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          setCopiesOfPsychologicalTestingUploaded(true);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setCopiesOfPsychologicalTestingPath(downloadURL);
          });
        }
      );
    }
  };

  const progressStyleCopiesOfPsychologicalTesting = {
    width: copiesOfPsychologicalTesting + "%",
  };
  const deleteCopiesOfPsychologicalTesting = () => {
    if (shouldDeleteCopiesOfPsychologicalTesting) {
      if (copiesOfPsychologicalTestingPath) {
        console.log(
          "Deleting file with path:",
          copiesOfPsychologicalTestingPath
        ); // Log the path for debugging
        const storageRef = ref(storage, copiesOfPsychologicalTestingPath);
        deleteObject(storageRef)
          .then(() => {
            console.log("File deleted from the database");
            setCopiesOfPsychologicalTestingPath(""); // Clear the path to indicate deletion
            setShouldDeleteCopiesOfPsychologicalTesting(false); // Reset the delete state
          })
          .catch((error) => {
            console.error("Error deleting file from the database:", error);
          });
      } else {
        console.log(
          "CopiesOfPsychologicalTestingPath is empty. Check if it has the correct value."
        );
      }
    } else {
      console.log(
        "shouldDeleteDrivingLicenseImg is not set to true. Check if the delete button is being clicked."
      );
    }
  };

  const uploadChildReportCards = async (acceptedFiles) => {
    setChildReportCardsUploaded(false);
    setChildReportCards(0);
    var d = new Date();
    var dFormat = `${d.getHours()}${d.getMinutes()}${d.getSeconds()}`;

    // Get file
    var file = acceptedFiles[0];
    // Create storage reference
    if (file) {
      var storageRef = ref(storage, `child-docs/${dFormat}-${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setChildReportCards(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          setChildReportCardsUploaded(true);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setChildReportCardsPath(downloadURL);
          });
        }
      );
    }
  };

  const progressStyleChildReportCards = {
    width: childReportCards + "%",
  };

  const deleteChildReportCards = () => {
    if (shouldDeleteChildReportCards) {
      if (childReportCardsPath) {
        console.log("Deleting file with path:", childReportCardsPath); // Log the path for debugging
        const storageRef = ref(storage, childReportCardsPath);
        deleteObject(storageRef)
          .then(() => {
            console.log("File deleted from the database");
            setChildReportCardsPath(""); // Clear the path to indicate deletion
            setShouldDeleteChildReportCards(false); // Reset the delete state
          })
          .catch((error) => {
            console.error("Error deleting file from the database:", error);
          });
      } else {
        console.log(
          "childReportCardsPath is empty. Check if it has the correct value."
        );
      }
    } else {
      console.log(
        "shouldDeleteChildReportCards is not set to true. Check if the delete button is being clicked."
      );
    }
  };

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [dateOfBirthForDatabase, setDateOfBirthForDatabase] = useState("");
  const [yearEditedManually, setYearEditedManually] = useState(false);

  const [dateOfBirth1, setDateOfBirth1] = useState("");
  const [dateOfBirth1ForDatabase, setDateOfBirth1ForDatabase] = useState("");
  const [yearEditedManually1, setYearEditedManually1] = useState(false);

  const [dateOfBirth2, setDateOfBirth2] = useState("");
  const [dateOfBirth2ForDatabase, setDateOfBirth2ForDatabase] = useState("");
  const [yearEditedManually2, setYearEditedManually2] = useState(false);

  const [effectiveDate1, setEffectiveDate1] = useState("");
  const [effectiveDate1ForDatabase, setEffectiveDate1ForDatabase] =
    useState("");
  const [yearEditedManually3, setYearEditedManually3] = useState(false);

  const [effectiveDate2, setEffectiveDate2] = useState("");
  const [effectiveDate2ForDatabase, setEffectiveDate2ForDatabase] =
    useState("");
  const [yearEditedManually4, setYearEditedManually4] = useState(false);

  const [effectiveDate3, setEffectiveDate3] = useState("");
  const [effectiveDate3ForDatabase, setEffectiveDate3ForDatabase] =
    useState("");
  const [yearEditedManually5, setYearEditedManually5] = useState(false);

  const [expirationDate, setExpirationDate] = useState("");
  const [yearEditedManually6, setYearEditedManually6] = useState(false);

  const handleDateChange = (event) => {
    const { name, value } = event.target;

    const [year, month, day] = value.split("-");
    const formattedDateString = `${month}/${day}/${year}`;
    setDateOfBirthForDatabase(formattedDateString);

    setDateOfBirth(value);

    if (name === "patientChildDOB") {
      const year = parseInt(value.substring(0, 4), 10);
      const currentYear = new Date().getFullYear();

      if (
        value.length === 10 &&
        year >= 1000 &&
        year <= currentYear &&
        value.match(/^\d{4}-\d{2}-\d{2}$/)
      ) {
        setYearEditedManually(false);
      } else {
        setYearEditedManually(true);
      }
    }
  };

  const handleDateChange1 = (event) => {
    const { name, value } = event.target;

    const [year, month, day] = value.split("-");
    const formattedDateString = `${month}/${day}/${year}`;
    setDateOfBirth1ForDatabase(formattedDateString);

    setDateOfBirth1(value);

    if (name === "patientFatherDOB") {
      const year = parseInt(value.substring(0, 4), 10);
      const currentYear = new Date().getFullYear();

      if (
        value.length === 10 &&
        year >= 1000 &&
        year <= currentYear &&
        value.match(/^\d{4}-\d{2}-\d{2}$/)
      ) {
        setYearEditedManually1(false);
      } else {
        setYearEditedManually1(true);
      }
    }
  };

  const handleDateChange2 = (event) => {
    const { name, value } = event.target;

    const [year, month, day] = value.split("-");
    const formattedDateString = `${month}/${day}/${year}`;
    setDateOfBirth2ForDatabase(formattedDateString);

    setDateOfBirth2(value);

    if (name === "patientMotherDOB") {
      const year = parseInt(value.substring(0, 4), 10);
      const currentYear = new Date().getFullYear();

      if (
        value.length === 10 &&
        year >= 1000 &&
        year <= currentYear &&
        value.match(/^\d{4}-\d{2}-\d{2}$/)
      ) {
        setYearEditedManually2(false);
      } else {
        setYearEditedManually2(true);
      }
    }
  };

  const handleDateChange3 = (event) => {
    const { name, value } = event.target;

    const [year, month, day] = value.split("-");
    const formattedDateString = `${month}/${day}/${year}`;
    setEffectiveDate1ForDatabase(formattedDateString);

    setEffectiveDate1(value);

    if (name === "patientFatherInsuranceDate") {
      const year = parseInt(value.substring(0, 4), 10);
      const currentYear = new Date().getFullYear();

      if (
        value.length === 10 &&
        year >= 1000 &&
        year <= currentYear &&
        value.match(/^\d{4}-\d{2}-\d{2}$/)
      ) {
        setYearEditedManually3(false);
      } else {
        setYearEditedManually3(true);
      }
    }
  };

  const handleDateChange4 = (event) => {
    const { name, value } = event.target;

    const [year, month, day] = value.split("-");
    const formattedDateString = `${month}/${day}/${year}`;
    setEffectiveDate2ForDatabase(formattedDateString);

    setEffectiveDate2(value);

    if (name === "patientMotherInsuranceDate") {
      const year = parseInt(value.substring(0, 4), 10);
      const currentYear = new Date().getFullYear();

      if (
        value.length === 10 &&
        year >= 1000 &&
        year <= currentYear &&
        value.match(/^\d{4}-\d{2}-\d{2}$/)
      ) {
        setYearEditedManually4(false);
      } else {
        setYearEditedManually4(true);
      }
    }
  };

  const handleDateChange5 = (event) => {
    const { name, value } = event.target;

    const [year, month, day] = value.split("-");
    const formattedDateString = `${month}/${day}/${year}`;
    setEffectiveDate3ForDatabase(formattedDateString);

    setEffectiveDate3(value);

    if (name === "patientOrganizationDate") {
      const year = parseInt(value.substring(0, 4), 10);
      const currentYear = new Date().getFullYear();

      if (
        value.length === 10 &&
        year >= 1000 &&
        year <= currentYear &&
        value.match(/^\d{4}-\d{2}-\d{2}$/)
      ) {
        setYearEditedManually5(false);
      } else {
        setYearEditedManually5(true);
      }
    }
  };

  const handleDateChange6 = (event) => {
    const { name, value } = event.target;
    setExpirationDate(value);

    if (name === "patientOrganizationExpiration") {
      const year = parseInt(value.substring(0, 4), 10);
      const currentYear = new Date().getFullYear();

      if (
        value.length === 10 &&
        year >= 1000 &&
        year <= currentYear &&
        value.match(/^\d{4}-\d{2}-\d{2}$/)
      ) {
        setYearEditedManually6(false);
      } else {
        setYearEditedManually6(true);
      }
    }
  };

  const [patientNumberPhone, setPatientNumberPhone] = useState("");
  const [patientCellPhone, setPatientCellPhone] = useState("");
  const [patientFatherPhone, setPatientFatherPhone] = useState("");
  const [patientFatherOccupationPhone, setPatientFatherOccupationPhone] =
    useState("");
  const [patientMotherPhone, setPatientMotherPhone] = useState("");
  const [patientMotherOccupationPhone, setPatientMotherOccupationPhone] =
    useState("");
  const [patientEmergencyPhone, setPatientEmergencyPhone] = useState("");
  const [patientPhysicianPhone, setPatientPhysicianPhone] = useState("");
  const [patientOrganizationPhone, setPatientOrganizationPhone] = useState("");
  const [patientPersonalPhone, setPatientPersonalPhone] = useState("");
  const [patientPharmacyPhone, setPatientPharmacyPhone] = useState("");

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";

    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phoneNumber;
  };

  const handleNumberPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientNumberPhone(formattedNumber);
  };

  const handleCellPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientCellPhone(formattedNumber);
  };

  const handleFatherPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientFatherPhone(formattedNumber);
  };

  const handleFatherOccupationPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientFatherOccupationPhone(formattedNumber);
  };

  const handleMotherPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientMotherPhone(formattedNumber);
  };

  const handleMotherOccupationPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientMotherOccupationPhone(formattedNumber);
  };

  const handleEmergencyPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientEmergencyPhone(formattedNumber);
  };

  const handlePhysicianPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientPhysicianPhone(formattedNumber);
  };

  const handleOrganizationPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientOrganizationPhone(formattedNumber);
  };

  const handlePersonalPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientPersonalPhone(formattedNumber);
  };

  const handlePharmacyPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientPharmacyPhone(formattedNumber);
  };

  const initialValues = {
    // case 2
    formType: "Child",
    patientChildLastName: "",
    patientChildFirstName: "",
    patientChildMiddleName: "",
    patientAddressCity: "",
    todayDate: today,
    patientAddressState: "",
    patientAddressZip: "",
    child_address: "",
    patientNumber: "",
    patientCell: "",
    patientGender: "",
    patientRace: "",
    patientSsn: "",
    patientSchool: "",
    patientChildDOB: "",
    patientFatherName: "",
    patientFatherDOB: "",
    patientFatherAddress: "",
    patientFatherAddressCity: "",
    patientFatherAddressState: "",
    patientFatherAddressZip: "",
    patientFatherTelePhone: "",
    patientFatherEmployer: "",
    patientFatherOccupation: "",
    patientFatherOccupationAddress: "",
    patientFatherOccupationAddressCity: "",
    patientFatherOccupationAddressState: "",
    patientFatherOccupationAddressZip: "",
    patientFatherOccupationTelephone: "",
    patientFatherScurity: "",
    patientFatherMarried: "",
    patientMotherName: "",
    patientMotherDOB: "",
    patientMotherAddress: "",
    patientMotherMarried: "",
    patientMotherAddressCity: "",
    patientMotherAddressState: "",
    patientMotherAddressZip: "",
    patientMotherTelePhone: "",
    patientMotherEmployer: "",
    patientMotherOccupation: "",
    patientMotherOccupationAddress: "",
    patientMotherOccupationAddressCity: "",
    patientMotherOccupationAddressState: "",
    patientMotherOccupationAddressZip: "",
    doYouHaveInsuranceFather: "",
    doYouHaveInsuranceMother: "",
    patientFatherInsurance: "",
    patientFatherInsuranceHmo: "",
    patientFatherInsuranceAddress: "",
    patientFatherInsuranceSubscriber: "",
    patientFatherInsuranceRelation: "",
    patientFatherInsuranceID: "",
    patientFatherInsuranceDate: "",
    patientMotherInsurance: "",
    patientMotherScurity: "",
    patientMotherOccupationTelephone: "",
    patientMotherInsuranceHmo: "",
    patientMotherInsuranceInsurance: "",
    patientMotherInsuranceSubscriber: "",
    patientMotherInsuranceRelationShip: "",
    patientMotherInsuranceID: "",
    patientMotherInsuranceDate: "",
    patientOrganization: "",
    patientOrganizationidentification: "",
    patientOrganizationAddress: "",
    patientOrganizationCity: "",
    patientOrganizationState: "",
    patientOrganizationZip: "",
    patientOrganizationDate: "",
    patientOrganizationExpiration: "",
    patientChilEmergencyNameLast: "",
    patientChildEmergencyFirstName: "",
    patientChildMiddleEmergencyName: "",
    patientChildEmergencyRelationship: "",
    patientChildEmergencyRelationshipPhone: "",

    referringPhysicianName: "",
    referringPhysicianAddress: "",
    referringPhysicianCity: "",
    referringPhysicianState: "",
    referringPhysicianZip: "",
    referringPhysicianPhone: "",
    referringPhysicianSpeciality: "",

    referringOrganizationName: "",
    referringOrganizationAddress: "",
    referringOrganizationCity: "",
    referringOrganizationState: "",
    referringOrganizationZip: "",
    referringOrganizationPhone: "",

    // case 3

    todayDate: today,
    patientWitness: "",
    patientSignature1: "",

    // case 4

    todayDate: today,
    Patientsignature2: "",
    acknowledgePrivacyPolicyExists: "",
    patientPrivacyLastName: "",
    patientPrivacyFirstName: "",
    patientPrivacyMiddleName: "",

    // case 5

    todayDate: today,
    Patientsignature3: "",
    iAmResponsible: "False",
    patientResponsibleLastName: "",
    patientResponsibleFirstName: "",
    patientResponsibleMiddleName: "",

    // case 6

    todayDate: today,
    PatientParentsignature: "",
    iHaveRead: "False",
    patientFeeLastName: "",
    patientFeeFirstName: "",
    patientFeeMiddleName: "",

    // case 7

    todayDate: today,
    PatientParentsignature1: "",
    patientCancellationMiddleName: "",
    patientCancellationLastName: "",
    patientCancellationFirstName: "",

    // case 8
    patientpersonalInformationName: "",
    patientpersonalInformationEmail: "",
    patientChildDOB: "",
    patientpersonalInformationAddress: "",
    patientChildEmergencyRelationshipPhone: "",
    patientpharmacyName: "",
    patientpharmacyPhone: "",
    patientpharmacyAddress: "",
    patientListAllergies: "",

    // case 9
    todayDate: today,
    patientTelepsychiatryLastName: "",
    patientTelepsychiatryFirstName: "",
    patientTelepsychiatryMiddleName: "",
    PatientParentsignature2: "",
    patientChildDOB: "",

    // case 10
    childHistoryName: "",
    patientChildDOB: "",
    patientHistoryToday: today,
    childHistoryCompletedBy: "",
    medicalDificultyatPregnancy: "",
    medicalDificultyatDelivery: "",
    patientweightinPounds: "",
    patientweightinOunces: "",
    childafterbirthFirstday: "",
    childafterbirthFirstYear: "",
    childCurrentongoingmedicalProblem: "",
    childCurrenteatingProblem: "",
    childCurrentongoingSleepingProblem: "",
    patientSpeechDevelopment: "",
    patientGrossDevelopment: "",
    patientCordinationDevelopment: "",
    patientSocializingDevelopment: "",
    patientConcernsDevelopment: "",
    experienceFeedingDifFiculties: "",
    experienceSitAlone: "",
    experiencwalkalone: "",
    experienceRealWords: "",
    experienceRealSentences: "",
    experienceAchieveBowltraining: "",
    nightBladdedTraining: "",
    dayBladderTraining: "",
    hospitalizationAge: "",
    hospitalizationReason: "",
    HospitalizationResult: "",
    surgeriesAge: "",
    surgeriesReason: "",
    surgeriesResult: "",
    seizuresAge: "",
    seizuresReason: "",
    seizuresResult: "",
    headInjuriesAge: "",
    headInjuriesReason: "",
    headInjuriesResult: "",
    MedicalProblemsAge: "",
    MedicalProblemsReason: "",
    MedicalProblemsResult: "",
    medicationsUsedaAge: "",
    medicationsUsedReason: "",
    medicationsUsedResult: "",
    medicationsUsedage: "",

    childVision: "",
    childHearing: "",
    acadmicProblemsPresent: "",
    acadmicProblemsPast: "",
    behaviorProblemsPresent: "",
    behaviorProblemsPast: "",
    peerRelationsProblemsPresent: "",
    peerRelationsProblemsPast: "",
    relationshipToTeacherPresent: "",
    relationshipToTeacherPast: "",
    concernsPresent: "",
    concernsPast: "",
    childAttendedschool: "",
    typeOfSchool: "",
    gradeOfSchool: "",
    listTheSchools: "",
    specialClasses: "",
    repeatedGrades: "",
    outsideEducationalHelp: "",
    describeAnyOtherConcerns: "",

    copiesOfEducationPlanImg: "",
    copiesOfPsychologicalTestingImg: "",
    childReportCardsImg: "",

    evaluation: [
      {
        evolationofAge: "",
        evaluationofReason: "",
        evaluationofWhere: "",
        evaluationofResult: "",
      },
    ],

    insuranceCardFront: "",
    insuranceCardBack: "",
    drivingLicense: "",
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const myTimestamp = Timestamp.fromDate(new Date(values.todayDate));
    const myTimestamp1 = Timestamp.fromDate(
      new Date(values.patientHistoryToday)
    );

    const patientRegistrationChild = {
      patientChildLastName: values.patientChildLastName,
      patientChildFirstName: values.patientChildFirstName,
      patientChildMiddleName: values.patientChildMiddleName,
      patientAddressCity: values.patientAddressCity,
      todayDate: serverTimestamp(),
      patientAddressState: values.patientAddressState,
      patientAddressZip: values.patientAddressZip,
      child_address: values.child_address,
      patientNumber: patientNumberPhone,
      patientCell: patientCellPhone,
      patientGender: values.patientGender,
      patientRace: values.patientRace,
      patientSsn: socialSecurity1,
      patientSchool: values.patientSchool,
      patientChildDOB: dateOfBirthForDatabase,
      patientFatherName: values.patientFatherName,
      patientFatherDOB: dateOfBirth1ForDatabase,
      patientFatherAddress: values.patientFatherAddress,
      patientFatherAddressCity: values.patientFatherAddressCity,
      patientFatherAddressState: values.patientFatherAddressState,
      patientFatherAddressZip: values.patientFatherAddressZip,
      patientFatherTelePhone: patientFatherPhone,
      patientFatherEmployer: values.patientFatherEmployer,
      patientFatherOccupation: values.patientFatherOccupation,
      patientFatherOccupationAddress: values.patientFatherOccupationAddress,
      patientFatherOccupationAddressCity:
        values.patientFatherOccupationAddressCity,
      patientFatherOccupationAddressState:
        values.patientFatherOccupationAddressState,
      patientFatherOccupationAddressZip:
        values.patientFatherOccupationAddressZip,
      patientFatherOccupationTelephone: patientFatherOccupationPhone,
      patientFatherScurity: socialSecurity2,
      patientFatherMarried: values.patientFatherMarried,
      patientMotherName: values.patientMotherName,
      patientMotherDOB: dateOfBirth2ForDatabase,
      patientMotherAddress: values.patientMotherAddress,
      patientMotherScurity: socialSecurity3,
      patientMotherAddressCity: values.patientMotherAddressCity,
      patientMotherAddressState: values.patientMotherAddressState,
      patientMotherAddressZip: values.patientMotherAddressZip,
      patientMotherTelePhone: patientMotherPhone,
      patientMotherEmployer: values.patientMotherEmployer,
      patientMotherMarried: values.patientMotherMarried,
      patientMotherOccupation: values.patientMotherOccupation,
      patientMotherOccupationAddress: values.patientMotherOccupationAddress,
      patientMotherOccupationAddressCity:
        values.patientMotherOccupationAddressCity,
      patientMotherOccupationAddressState:
        values.patientMotherOccupationAddressState,
      patientMotherOccupationAddressZip:
        values.patientMotherOccupationAddressZip,
      doYouHaveInsuranceFather: values.doYouHaveInsuranceFather,
      doYouHaveInsuranceMother: values.doYouHaveInsuranceMother,
      patientFatherInsurance: values.patientFatherInsurance,
      patientFatherInsuranceHmo: values.patientFatherInsuranceHmo,
      patientFatherInsuranceAddress: values.patientFatherInsuranceAddress,
      patientFatherInsuranceSubscriber: values.patientFatherInsuranceSubscriber,
      patientFatherInsuranceRelation: values.patientFatherInsuranceRelation,
      patientFatherInsuranceID: values.patientFatherInsuranceID,
      patientFatherInsuranceDate: effectiveDate1ForDatabase,
      patientMotherInsurance: values.patientMotherInsurance,
      patientMotherOccupationTelephone: patientMotherOccupationPhone,
      patientMotherInsuranceHmo: values.patientMotherInsuranceHmo,
      patientMotherInsuranceInsurance: values.patientMotherInsuranceInsurance,
      patientMotherInsuranceSubscriber: values.patientMotherInsuranceSubscriber,
      patientMotherInsuranceRelationShip:
        values.patientMotherInsuranceRelationShip,
      patientMotherInsuranceID: values.patientMotherInsuranceID,
      patientMotherInsuranceDate: effectiveDate2ForDatabase,
      patientOrganization: values.patientOrganization,
      patientOrganizationidentification:
        values.patientOrganizationidentification,
      patientOrganizationAddress: values.patientOrganizationAddress,
      patientOrganizationCity: values.patientOrganizationCity,
      patientOrganizationState: values.patientOrganizationState,
      patientOrganizationZip: values.patientOrganizationZip,
      patientOrganizationDate: effectiveDate3ForDatabase,
      patientOrganizationExpiration: expirationDate,
      patientChilEmergencyNameLast: values.patientChilEmergencyNameLast,
      patientChildEmergencyFirstName: values.patientChildEmergencyFirstName,
      patientChildMiddleEmergencyName: values.patientChildMiddleEmergencyName,
      patientChildEmergencyRelationship:
        values.patientChildEmergencyRelationship,
      patientChildEmergencyRelationshipPhone: patientEmergencyPhone,
      referringPhysicianName: values.referringPhysicianName,
      referringPhysicianAddress: values.referringPhysicianAddress,
      referringPhysicianCity: values.referringPhysicianCity,
      referringPhysicianState: values.referringPhysicianState,
      referringPhysicianZip: values.referringPhysicianZip,
      referringPhysicianPhone: patientPhysicianPhone,
      referringPhysicianSpeciality: values.referringPhysicianSpeciality,

      referringOrganizationName: values.referringOrganizationName,
      referringOrganizationAddress: values.referringOrganizationAddress,
      referringOrganizationCity: values.referringOrganizationCity,
      referringOrganizationState: values.referringOrganizationState,
      referringOrganizationZip: values.referringOrganizationZip,
      referringOrganizationPhone: patientOrganizationPhone,
    };

    const patientConsentChild = {
      todayDate: serverTimestamp(),
      patientWitness: values.patientWitness,
      patientSignature1: sign,
    };

    const privacyPolicyChild = {
      todayDate: serverTimestamp(),
      Patientsignature2: signData,
      patientPrivacyLastName: values.patientPrivacyLastName,
      patientPrivacyFirstName: values.patientPrivacyFirstName,
      patientPrivacyMiddleName: values.patientPrivacyMiddleName,
      acknowledgePrivacyPolicyExists: values.acknowledgePrivacyPolicyExists,
    };

    const responsibilityStmtChild = {
      todayDate: serverTimestamp(),
      Patientsignature3: hand,
      iAmResponsible: values.iAmResponsible,
      patientResponsibleLastName: values.patientResponsibleLastName,
      patientResponsibleFirstName: values.patientResponsibleFirstName,
      patientResponsibleMiddleName: values.patientResponsibleMiddleName,
    };

    const feeScheduleChild = {
      todayDate: serverTimestamp(),
      PatientParentsignature: handData,
      iHaveRead: values.iHaveRead,
      patientFeeLastName: values.patientFeeLastName,
      patientFeeFirstName: values.patientFeeFirstName,
      patientFeeMiddleName: values.patientFeeMiddleName,
    };

    const cancellationPolicyChild = {
      todayDate: serverTimestamp(),
      PatientParentsignature1: mark,
      patientCancellationMiddleName: values.patientCancellationMiddleName,
      patientCancellationLastName: values.patientCancellationLastName,
      patientCancellationFirstName: values.patientCancellationFirstName,
    };

    const demographicChild = {
      patientpersonalInformationName: values.patientpersonalInformationName,
      patientChildEmergencyRelationshipPhone: patientPersonalPhone,
      patientpersonalInformationAddress:
        values.patientpersonalInformationAddress,
      patientChildDOB: dateOfBirthForDatabase,
      patientpersonalInformationEmail: values.patientpersonalInformationEmail,
      patientpharmacyName: values.patientpharmacyName,
      patientpharmacyPhone: patientPharmacyPhone,
      patientpharmacyAddress: values.patientpharmacyAddress,
      patientListAllergies: values.patientListAllergies,
    };

    const telepsychiatryChild = {
      todayDate: serverTimestamp(),
      patientChildDOB: dateOfBirthForDatabase,
      patientTelepsychiatryLastName: values.patientTelepsychiatryLastName,
      patientTelepsychiatryFirstName: values.patientTelepsychiatryFirstName,
      patientTelepsychiatryMiddleName: values.patientTelepsychiatryMiddleName,
      PatientParentsignature2: markData,
    };

    const historyChild = {
      childHistoryName: values.childHistoryName,
      patientChildDOB: dateOfBirthForDatabase,
      childHistoryCompletedBy: values.childHistoryCompletedBy,
      patientHistoryToday: serverTimestamp(),
      medicalDificultyatPregnancy: values.medicalDificultyatPregnancy,
      medicalDificultyatDelivery: values.medicalDificultyatDelivery,
      patientweightinPounds: values.patientweightinPounds,
      patientweightinOunces: values.patientweightinOunces,
      childafterbirthFirstday: values.childafterbirthFirstday,
      childafterbirthFirstYear: values.childafterbirthFirstYear,
      childCurrentongoingmedicalProblem:
        values.childCurrentongoingmedicalProblem,
      childCurrenteatingProblem: values.childCurrenteatingProblem,
      childCurrentongoingSleepingProblem:
        values.childCurrentongoingSleepingProblem,
      patientSpeechDevelopment: values.patientSpeechDevelopment,
      patientGrossDevelopment: values.patientGrossDevelopment,
      patientCordinationDevelopment: values.patientCordinationDevelopment,
      patientSocializingDevelopment: values.patientSocializingDevelopment,
      patientConcernsDevelopment: values.patientConcernsDevelopment,
      experienceFeedingDifFiculties: values.experienceFeedingDifFiculties,
      experienceSitAlone: values.experienceSitAlone,
      experiencwalkalone: values.experiencwalkalone,
      experienceRealWords: values.experienceRealWords,
      experienceRealSentences: values.experienceRealSentences,
      experienceAchieveBowltraining: values.experienceAchieveBowltraining,
      nightBladdedTraining: values.nightBladdedTraining,
      dayBladderTraining: values.dayBladderTraining,
      hospitalizationAge: values.hospitalizationAge,
      hospitalizationReason: values.hospitalizationReason,
      HospitalizationResult: values.HospitalizationResult,
      surgeriesAge: values.surgeriesAge,
      surgeriesReason: values.surgeriesReason,
      surgeriesResult: values.surgeriesResult,
      seizuresAge: values.seizuresAge,
      seizuresReason: values.seizuresReason,
      seizuresResult: values.seizuresResult,
      headInjuriesAge: values.headInjuriesAge,
      headInjuriesReason: values.headInjuriesReason,
      headInjuriesResult: values.headInjuriesResult,
      MedicalProblemsAge: values.MedicalProblemsAge,
      MedicalProblemsReason: values.MedicalProblemsReason,
      MedicalProblemsResult: values.MedicalProblemsResult,
      medicationsUsedage: values.medicationsUsedage,
      medicationsUsedReason: values.medicationsUsedReason,
      medicationsUsedResult: values.medicationsUsedResult,
      childVision: values.childVision,
      childHearing: values.childHearing,
      acadmicProblemsPresent: values.acadmicProblemsPresent,
      acadmicProblemsPast: values.acadmicProblemsPast,
      behaviorProblemsPresent: values.behaviorProblemsPresent,
      behaviorProblemsPast: values.behaviorProblemsPast,
      peerRelationsProblemsPresent: values.peerRelationsProblemsPresent,
      peerRelationsProblemsPast: values.peerRelationsProblemsPast,
      relationshipToTeacherPresent: values.relationshipToTeacherPresent,
      relationshipToTeacherPast: values.relationshipToTeacherPast,
      concernsPresent: values.concernsPresent,
      concernsPast: values.concernsPast,
      childAttendedschool: values.childAttendedschool,
      typeOfSchool: values.typeOfSchool,
      gradeOfSchool: values.gradeOfSchool,
      listTheSchools: values.listTheSchools,
      specialClasses: values.specialClasses,
      repeatedGrades: values.repeatedGrades,
      outsideEducationalHelp: values.outsideEducationalHelp,
      describeAnyOtherConcerns: values.describeAnyOtherConcerns,
      copiesOfEducationPlanImg: copiesOfEducationPlanPath,
      copiesOfPsychologicalTestingImg: copiesOfPsychologicalTestingPath,
      childReportCardsImg: childReportCardsPath,
      evaluation: values?.evaluation || [],
    };

    const insuranceCardDocument = {
      insuranceCardFront: insuranceCardFrontImgPath,
      insuranceCardBack: insuranceCardBackImgPath,
    };

    const drivingLicenseDocument = {
      drivingLicense: drivingLicenseImgPath,
    };

    console.log("patientRegistrationChild - ", patientRegistrationChild);
    console.log("patientConsentChild - ", patientConsentChild);
    console.log("privacyPolicyChild - ", privacyPolicyChild);
    console.log("responsibilityStmtChild - ", responsibilityStmtChild);
    console.log("feeScheduleChild - ", feeScheduleChild);
    console.log("cancellationPolicyChild - ", cancellationPolicyChild);
    console.log("demographicChild - ", demographicChild);
    console.log("telepsychiatryChild - ", telepsychiatryChild);
    console.log("historyChild - ", historyChild);

    const formData = {
      patientRegistrationChild,
      patientConsentChild,
      privacyPolicyChild,
      responsibilityStmtChild,
      feeScheduleChild,
      cancellationPolicyChild,
      demographicChild,
      telepsychiatryChild,
      historyChild,
      insuranceCardDocument,
      drivingLicenseDocument,
      createdAt: serverTimestamp(),
      formType: "Child",
    };

    setSubmitting(true);
    try {
      const newChildCollectionRef = collection(db, "patientDetails");
      const newDocumentRef = await addDoc(newChildCollectionRef, formData);

      const newDocumentId = newDocumentRef.id;
      console.log("Document ID:", newDocumentId);

      console.log("Form data submitted successfully!");
      toast.success("Form data submitted successfully.");
      setSubmitting(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        window.location.href = "https://gwinnettpsychiatry.com/";
      }, 1500);
    } catch (error) {
      console.error("Error adding documents: ", error);
      setSubmitting(false);
    }
  };

  const handleStep = (values, handleChange) => {
    switch (step) {
      case 1:
        return (
          <>
            <section className="max-w-screen-lg mx-auto px-6 py-12 bg-slate-100">
              <div className="px-4 xl:px-0">
                <h1 className="xl:text-3xl md:text-4xl text-2xl  font-bold text-center mb-3">
                  Gwinnett Psychiatry, PC
                </h1>
                <p className="xl:text-base text-center font-medium mb-1">
                  170 Camden Hill Road, Suite F
                </p>
                <p className="xl:text-base text-center font-medium mb-1">
                  Lawrenceville, GA 30046{" "}
                </p>

                <div className="flex flex-col md:flex-row gap-1 md:gap-6 items-center justify-center mb-4 md:mb-6">
                  <p className="xl:text-base text-center font-medium">
                    Phone: (678)226-2295
                  </p>
                  <p className="text-base text-center font-medium">
                    www.gwinnettpsychiatry.com
                  </p>
                  <p className="xl:text-base text-center font-medium">
                    Fax: (678) 226-2296
                  </p>
                </div>
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-center underline decoration-2 underline-offset-4 mb-4 md:mb-8">
                  Terms and Conditions for Office & Tele-Medicine VISIT
                </h3>
                <p className="font-medium xl:text-base mb-4 md:mb-6">
                  To ensure the safety and privacy of our patients, we are
                  updating our policies:
                </p>
                <div className="pl-6 md:pl-10 mb-4 md:mb-6">
                  <div className="flex gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-black mt-2"></div>
                    <p className="font-medium">
                      Patient required to return the &quot;New Patient
                      Paperwork&quot;, along with the governmental picture ID
                      and the picture of Insurance card (Front & Back), both
                      picture ID and Insurance card must be emailed to the email
                      address listed on the bottom of the last page of this
                      paperwork. The rest of the paperwork can be sent to us by
                      EMAIL/FAX/US MAIL. Once we receive the entire paperwork,
                      we will call you to schedule.
                    </p>
                  </div>

                  <div className="flex gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-black mt-2"></div>
                    <p className="font-medium">
                      As for SELF PAY Patients, only picture ID is required
                    </p>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-black mt-2"></div>
                    <p className="font-medium">
                      Picture(s) of the paperwork is not ACCEPTED
                    </p>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-black mt-2"></div>
                    <p className="font-medium">
                      Two sided print out not accepted as well
                    </p>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-black mt-2"></div>
                    <p className="font-medium">
                      Patient must be present for every visit/session (insurance
                      requirement)
                    </p>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-black mt-2"></div>
                    <p className="font-medium">
                      Patient(s) can NOT be in a public place. Its recommended
                      that the patient be in a private place during the session
                      to ensure the privacy and comfort.
                    </p>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-black mt-2"></div>
                    <p className="font-medium">
                      Patient must be properly dressed
                    </p>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-black mt-2"></div>
                    <p className="font-medium">
                      Patient(s) under the age of 17 must be accompanied with a
                      parent/guardian. The parent/guardian must be on the
                      patient(s) registration forms.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-black mt-2"></div>
                    <p className="font-medium">
                      Patient can{" "}
                      <span className="font-bold underline">NOT</span> be
                      driving or in a moving vehicle
                    </p>
                  </div>
                </div>
                <p className="font-medium xl:text-base mb-4 md:mb-6">
                  If these conditions are not met, the patient(s) will have to
                  reschedule his/her appointment(s) for another day when the
                  above requirements can be met. We can provide a work/school
                  excuses and fax or email it if necessary. Please make sure
                  prior to your appointment that you have a good WIFI/Internet
                  connection and your device is set to access your camera and
                  microphone.
                </p>
                <p className="font-medium xl:text-base mb-4 md:mb-6">
                  Please keep in mind that there is a $50 no-show fee for each
                  missed appointment, cancelled within 24 hours. Please be
                  prepared to pay any co-pay and balance before the appointment.
                  Please check our website for more information at
                  www.gwinnettpsychiatry.com.
                </p>
              </div>
              <div className="col-span-2">
                <div>
                  <button
                    onClick={() => setStep(step + 1)}
                    type="button"
                    className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                  >
                    Next
                  </button>
                </div>
              </div>
            </section>
          </>
        );
        break;

      case 2:
        return (
          <>
            <section className="max-w-screen-lg mx-auto px-6 py-12 bg-slate-100">
              <div>
                <div className=" mb-6  md:gap-6">
                  <div>
                    <h2 className="text-base md:text-lg xl:text-xl font-bold text-center underline decoration-2 underline-offset-4 mb-4 md:mb-8">
                      PATIENT REGISTRATION CHILD
                    </h2>
                  </div>
                </div>

                <h6 className="md:text-sm text-left font-medium italic mb-2 md:mb-8">
                  Note: Fields marked with * are mandatory.
                </h6>

                <div className="xlmb-12 mb-6 px-4 xl:px-0">
                  <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                    <div className="col-span-12 md:col-span-12 relative">
                      <div></div>

                      <label htmlFor="patientChildName">Patient Name</label>
                    </div>

                    <div className="col-span-12 gap-4 md:col-span-4 relative">
                      <label
                        htmlFor="patientChildLastName"
                        className="mb-2 md:mb-0"
                      >
                        Last
                      </label>
                      <Field
                        type="text"
                        name="patientChildLastName"
                        id="patientChildLastName"
                      />
                      <ErrorMessage
                        name="patientChildLastName"
                        component="p"
                        className="invalid"
                      />
                    </div>

                    <div className="col-span-12  gap-4 md:col-span-4 relative">
                      <label
                        htmlFor="patientChildFirstName"
                        className="mb-2 md:mb-0"
                      >
                        First
                      </label>
                      <Field
                        type="text"
                        name="patientChildFirstName"
                        id="patientChildFirstName"
                      />
                      <ErrorMessage
                        name="patientChildFirstName"
                        component="p"
                        className="invalid"
                      />
                    </div>

                    <div className="col-span-12 gap-4 md:col-span-4 relative">
                      <label
                        htmlFor="patientChildMiddleName"
                        className="mb-2 md:mb-0"
                      >
                        Middle
                      </label>
                      <Field
                        type="text"
                        name="patientChildMiddleName"
                        id="patientChildMiddleName"
                      />
                      <ErrorMessage
                        name="patientChildMiddleName"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label htmlFor="child_address" className="md:text-base">
                          Address
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="text"
                          name="child_address"
                          id="child_address"
                        />
                        <ErrorMessage
                          name="child_address"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label htmlFor="patientNumber" className="md:text-base">
                          Home Phone No. *
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="tel"
                          name="patientNumber"
                          id="patientNumber"
                          value={patientNumberPhone}
                          onChange={handleNumberPhoneChange}
                          maxLength="14" // Including formatting characters
                        />
                        <ErrorMessage
                          name="patientNumber"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                    <div className="col-span-12 gap-4 md:col-span-4 relative">
                      <label htmlFor="patientAddressCity">City</label>
                      <Field
                        type="text"
                        name="patientAddressCity"
                        id="patientAddressCity"
                      />
                      <ErrorMessage
                        name="patientAddressCity"
                        component="p"
                        className="invalid"
                      />
                    </div>

                    <div className="col-span-12  gap-4 md:col-span-4 relative">
                      <label htmlFor="patientAddressState">State</label>
                      <Select
                        name="patientAddressState"
                        id="patientAddressState"
                        options={stateList}
                        className="st-react-select"
                        classNamePrefix="react-select"
                        defaultValue={() => {
                          if (
                            initialValues.patientAddressState &&
                            initialValues.patientAddressState != ""
                          )
                            return {
                              value: initialValues.patientAddressState,
                              label: initialValues.patientAddressState,
                            };
                          else return "";
                        }}
                        onChange={(selectedOption) => {
                          handleChange("patientAddressState")(
                            selectedOption?.value
                          );
                        }}
                      />
                    </div>

                    <div className="col-span-12 gap-4 md:col-span-4 relative">
                      <label htmlFor="patientAddressZip"> Zip</label>
                      <Field
                        type="text"
                        min="0"
                        name="patientAddressZip"
                        id="patientAddressZip"
                      />
                      <ErrorMessage
                        name="patientAddressZip"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 gap-6 ">
                    <div className="relative gap-4 col-span-12 md:col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-6 col-span-12">
                        <label htmlFor="patientCell" className="md:text-base">
                          Cell Phone No. *
                        </label>
                      </div>
                      <div className="md:col-span-6 col-span-12">
                        <Field
                          type="tel"
                          name="patientCell"
                          id="patientCell"
                          value={patientCellPhone}
                          onChange={handleCellPhoneChange}
                          maxLength="14" // Including formatting characters
                        />
                        <ErrorMessage
                          name="patientCell"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                      <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-6">
                          <label htmlFor="patientGender">Sex *</label>
                        </div>

                        <div className="flex items-center gap-2 col-span-2">
                          <label>
                            <Field
                              type="radio"
                              value="Male"
                              name="patientGender"
                              className="mr-2"
                            />
                            Male
                          </label>
                        </div>

                        <div className="flex items-center gap-2 col-span-2">
                          <label>
                            <Field
                              type="radio"
                              value="Female"
                              name="patientGender"
                              className="mr-2"
                            />
                            Female
                          </label>
                        </div>
                        <div className="flex items-center gap-2 col-span-2">
                          <label>
                            <Field
                              type="radio"
                              value="Other"
                              name="patientGender"
                              className="mr-2"
                            />
                            Other
                          </label>
                        </div>
                        <ErrorMessage
                          name="patientGender"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 gap-6 ">
                    <div className="relative  col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-6 col-span-12">
                        <label htmlFor="patientRace" className="md:text-base">
                          Race
                        </label>
                      </div>
                      <div className="md:col-span-6 col-span-12">
                        <Field
                          type="text"
                          name="patientRace"
                          id="patientRace"
                        />
                        <ErrorMessage
                          name="patientRace"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>

                    <div className="relative col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-6 col-span-12">
                        <label htmlFor="patientSsn" className="md:text-base">
                          Social Security No.
                        </label>
                      </div>
                      <div className="md:col-span-6 col-span-12">
                        <input
                          type="text"
                          name="patientSsn"
                          id="patientSsn"
                          value={socialSecurity1}
                          onChange={handleSocialSecurity1Change}
                        />
                        {socialSecurity1Error && (
                          <p className="invalid">{socialSecurity1Error}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-12 gap-6 mb-4 md:mb-8">
                    <div className="col-span-6 relative ">
                      <div className="col-span-6 relative">
                        <div className="col-span-6">
                          <label htmlFor="patientChildDOB">
                            Date of Birth *
                          </label>
                        </div>
                        <div className="col-span-6">
                          <Field
                            type="date"
                            name="patientChildDOB"
                            id="patientChildDOB"
                            value={dateOfBirth}
                            onChange={handleDateChange}
                            max={`${new Date().getFullYear()}-12-31`} // Set max attribute to current year
                          />
                          {yearEditedManually && (
                            <p className="invalid">
                              Please enter a valid date with a 4-digit year.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="relative col-span-6 ">
                      <div className="md:col-span-4 col-span-12">
                        <label htmlFor="patientSchool" className="md:text-base">
                          Patient School (Name/Address/Phone)
                        </label>
                      </div>
                      <div className="md:col-span-8 col-span-12">
                        <Field
                          type="text"
                          name="patientSchool"
                          id="patientSchool"
                        />
                        <ErrorMessage
                          name="patientSchool"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-12 gap-6 mb-4 md:mb-8">
                    <div className="col-span-6">
                      <div
                        className="md:col-span-6
                      "
                      >
                        <h2 className="text-sm md:text-base  font-bold underline underline-offset-4 mb-2 md:mb-8">
                          FATHER&apos;S NAME/OTHER LEGAL GUARDIAN
                        </h2>
                      </div>
                      <div className="relative md:col-span-6 gap-4  mb-4 md:mb-6">
                        <div className="md:col-span-6 col-span-12">
                          <label
                            htmlFor="patientFatherName"
                            className="md:text-base"
                          >
                            Father&apos;s Name
                          </label>
                        </div>
                        <div className="md:col-span-6 col-span-12">
                          <Field
                            type="text"
                            name="patientFatherName"
                            id="patientFatherName"
                          />
                          <ErrorMessage
                            name="patientFatherName"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-6 col-span-12 relative mb-4 md:mb-6">
                        <div className="grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientFatherDOB">
                              Father&apos;s Date of Birth
                            </label>
                          </div>
                          <div className="col-span-12">
                            <Field
                              type="date"
                              name="patientFatherDOB"
                              id="patientFatherDOB"
                              value={dateOfBirth1}
                              onChange={handleDateChange1}
                              max={`${new Date().getFullYear()}-12-31`} // Set max attribute to current year
                            />
                            {yearEditedManually1 && (
                              <p className="invalid">
                                Please enter a valid date with a 4-digit year.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 relative mb-4 md:mb-6">
                        <div className="grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientFatherAddress">
                              Home Address
                            </label>
                          </div>
                          <div className="col-span-12">
                            <Field
                              type="text"
                              as="textarea"
                              rows="2"
                              name="patientFatherAddress"
                              id="patientFatherAddress"
                            />
                            <ErrorMessage
                              name="patientFatherAddress"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="col-span-12 gap-4 md:col-span-4 relative">
                          <label htmlFor="patientFatherAddressCity">City</label>
                          <Field
                            type="text"
                            name="patientFatherAddressCity"
                            id="patientFatherAddressCity"
                          />
                          <ErrorMessage
                            name="patientFatherAddressCity"
                            component="p"
                            className="invalid"
                          />
                        </div>

                        <div className="col-span-12  gap-4 md:col-span-4 relative">
                          <label htmlFor="patientFatherAddressState">
                            State
                          </label>
                          <Select
                            name="patientFatherAddressState"
                            id="patientFatherAddressState"
                            options={stateList}
                            className="st-react-select"
                            classNamePrefix="react-select"
                            defaultValue={() => {
                              if (
                                initialValues.patientFatherAddressState &&
                                initialValues.patientFatherAddressState != ""
                              )
                                return {
                                  value:
                                    initialValues.patientFatherAddressState,
                                  label:
                                    initialValues.patientFatherAddressState,
                                };
                              else return "";
                            }}
                            onChange={(selectedOption) => {
                              handleChange("patientFatherAddressState")(
                                selectedOption?.value
                              );
                            }}
                          />
                        </div>

                        <div className="col-span-12 gap-4 md:col-span-4 relative">
                          <label htmlFor="patientFatherAddressZip"> Zip</label>
                          <Field
                            type="text"
                            min="0"
                            name="patientFatherAddressZip"
                            id="patientFatherAddressZip"
                          />
                          <ErrorMessage
                            name="patientFatherAddressZip"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                      <div className="col-span-12 relative mb-4 md:mb-6">
                        <div className="grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientFatherTelePhone">
                              Home Telephone No.
                            </label>
                          </div>
                          <div className="col-span-12">
                            <Field
                              type="tel"
                              name="patientFatherTelePhone"
                              id="patientFatherTelePhone"
                              value={patientFatherPhone}
                              onChange={handleFatherPhoneChange}
                              maxLength="14" // Including formatting characters
                            />
                            <ErrorMessage
                              name="patientFatherTelePhone"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 relative mb-4 md:mb-6">
                        <div className="grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientFatherEmployer">
                              Employer
                            </label>
                          </div>
                          <div className="col-span-12">
                            <Field
                              type="text"
                              name="patientFatherEmployer"
                              id="patientFatherEmployer"
                            />
                            <ErrorMessage
                              name="patientFatherEmployer"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 relative mb-4 md:mb-6">
                        <div className="grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientFatherOccupation">
                              Occupation
                            </label>
                          </div>
                          <div className="col-span-12">
                            <Field
                              type="text"
                              name="patientFatherOccupation"
                              id="patientFatherOccupation"
                            />
                            <ErrorMessage
                              name="patientFatherOccupation"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 relative mb-4 md:mb-6">
                        <div className="grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientFatherOccupationAddress">
                              Address
                            </label>
                          </div>
                          <div className="col-span-12">
                            <Field
                              type="text"
                              as="textarea"
                              rows="2"
                              name="patientFatherOccupationAddress"
                              id="patientFatherOccupationAddress"
                            />
                            <ErrorMessage
                              name="patientFatherOccupationAddress"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="col-span-12 gap-4 md:col-span-4 relative">
                          <label htmlFor="patientFatherOccupationAddressCity">
                            City
                          </label>
                          <Field
                            type="text"
                            name="patientFatherOccupationAddressCity"
                            id="patientFatherOccupationAddressCity"
                          />
                          <ErrorMessage
                            name="patientFatherOccupationAddressCity"
                            component="p"
                            className="invalid"
                          />
                        </div>

                        <div className="col-span-12  gap-4 md:col-span-4 relative">
                          <label htmlFor="patientFatherOccupationAddressState">
                            State
                          </label>
                          <Select
                            name="patientFatherOccupationAddressState"
                            id="patientFatherOccupationAddressState"
                            options={stateList}
                            className="st-react-select"
                            classNamePrefix="react-select"
                            defaultValue={() => {
                              if (
                                initialValues.patientFatherOccupationAddressState &&
                                initialValues.patientFatherOccupationAddressState !=
                                  ""
                              )
                                return {
                                  value:
                                    initialValues.patientFatherOccupationAddressState,
                                  label:
                                    initialValues.patientFatherOccupationAddressState,
                                };
                              else return "";
                            }}
                            onChange={(selectedOption) => {
                              handleChange(
                                "patientFatherOccupationAddressState"
                              )(selectedOption?.value);
                            }}
                          />
                        </div>

                        <div className="col-span-12 gap-4 md:col-span-4 relative">
                          <label htmlFor="patientFatherOccupationAddressZip">
                            {" "}
                            Zip
                          </label>
                          <Field
                            type="text"
                            min="0"
                            name="patientFatherOccupationAddressZip"
                            id="patientFatherOccupationAddressZip"
                          />
                          <ErrorMessage
                            name="patientFatherOccupationAddressZip"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                      <div className="col-span-12 relative mb-4 md:mb-6">
                        <div className="grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientFatherOccupationTelephone">
                              Work Telephone No.
                            </label>
                          </div>
                          <div className="col-span-12">
                            <Field
                              type="tel"
                              name="patientFatherOccupationTelephone"
                              id="patientFatherOccupationTelephone"
                              value={patientFatherOccupationPhone}
                              onChange={handleFatherOccupationPhoneChange}
                              maxLength="14" // Including formatting characters
                            />
                            <ErrorMessage
                              name="patientFatherOccupationTelephone"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 relative mb-4 md:mb-6">
                        <div className="grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientFatherScurity">
                              Social Security No.
                            </label>
                          </div>
                          <div className="col-span-12">
                            <input
                              type="text"
                              name="patientFatherScurity"
                              id="patientFatherScurity"
                              value={socialSecurity2}
                              onChange={handleSocialSecurity2Change}
                            />
                            {socialSecurity2Error && (
                              <p className="invalid">{socialSecurity2Error}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 relative mb-4 md:mb-6">
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientFatherMarried">
                              Marital Status
                            </label>
                          </div>

                          <div className="flex items-center gap-2 col-span-2">
                            <label>
                              <Field
                                type="radio"
                                value="Single"
                                name="patientFatherMarried"
                                className="mr-2"
                              />
                              Single
                            </label>
                          </div>

                          <div className="flex items-center gap-2 col-span-2">
                            <label>
                              <Field
                                type="radio"
                                value="Married"
                                name="patientFatherMarried"
                                className="mr-2"
                              />
                              Married
                            </label>
                          </div>

                          <div className="flex items-center gap-2 col-span-2">
                            <label>
                              <Field
                                type="radio"
                                value="Separated"
                                name="patientFatherMarried"
                                className="mr-2"
                              />
                              Separated
                            </label>
                          </div>

                          <div className="flex items-center gap-2 col-span-2">
                            <label>
                              <Field
                                type="radio"
                                value="Divorced"
                                name="patientFatherMarried"
                                className="mr-2"
                              />
                              Divorced
                            </label>
                          </div>

                          <div className="flex items-center gap-2 col-span-2">
                            <label>
                              <Field
                                type="radio"
                                value="Widow"
                                name="patientFatherMarried"
                                className="mr-2"
                              />
                              Widow
                            </label>
                          </div>

                          <ErrorMessage
                            name="patientFatherMarried"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <div>
                        <h2 className="text-sm md:text-base  font-bold underline underline-offset-4 mb-2 md:mb-8">
                          MOTHER&apos;S NAME/OTHER LEGAL GUARDIAN
                        </h2>
                      </div>
                      <div className="relative  col-span-12 mb-4 md:mb-6">
                        <div className=" col-span-12">
                          <label
                            htmlFor="patientMotherName"
                            className="md:text-base"
                          >
                            Mother&apos;s Name
                          </label>
                        </div>
                        <div className="md:col-span-12 col-span-12">
                          <Field
                            type="text"
                            name="patientMotherName"
                            id="patientMotherName"
                          />
                          <ErrorMessage
                            name="patientMotherName"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                      <div className="col-span-12 relative mb-4 md:mb-6">
                        <div className="grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientMotherDOB">
                              Mother&apos;s Date of Birth
                            </label>
                          </div>
                          <div className="col-span-12">
                            <Field
                              type="date"
                              name="patientMotherDOB"
                              id="patientMotherDOB"
                              value={dateOfBirth2}
                              onChange={handleDateChange2}
                              max={`${new Date().getFullYear()}-12-31`} // Set max attribute to current year
                            />
                            {yearEditedManually2 && (
                              <p className="invalid">
                                Please enter a valid date with a 4-digit year.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 relative mb-4 md:mb-6">
                        <div className=" grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientMotherAddress">
                              Home Address
                            </label>
                          </div>
                          <div className="col-span-12">
                            <Field
                              type="text"
                              as="textarea"
                              rows="2"
                              name="patientMotherAddress"
                              id="patientMotherAddress"
                            />
                            <ErrorMessage
                              name="patientMotherAddress"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="col-span-12 gap-4 md:col-span-4 relative">
                          <label htmlFor="patientMotherAddressCity">City</label>
                          <Field
                            type="text"
                            name="patientMotherAddressCity"
                            id="patientMotherAddressCity"
                          />
                          <ErrorMessage
                            name="patientMotherAddressCity"
                            component="p"
                            className="invalid"
                          />
                        </div>

                        <div className="col-span-12  gap-4 md:col-span-4 relative">
                          <label htmlFor="patientMotherAddressState">
                            State
                          </label>
                          <Select
                            name="patientMotherAddressState"
                            id="patientMotherAddressState"
                            options={stateList}
                            className="st-react-select"
                            classNamePrefix="react-select"
                            defaultValue={() => {
                              if (
                                initialValues.patientMotherAddressState &&
                                initialValues.patientMotherAddressState != ""
                              )
                                return {
                                  value:
                                    initialValues.patientMotherAddressState,
                                  label:
                                    initialValues.patientMotherAddressState,
                                };
                              else return "";
                            }}
                            onChange={(selectedOption) => {
                              handleChange("patientMotherAddressState")(
                                selectedOption?.value
                              );
                            }}
                          />
                        </div>

                        <div className="col-span-12 gap-4 md:col-span-4 relative">
                          <label htmlFor="patientMotherAddressZip"> Zip</label>
                          <Field
                            type="text"
                            min="0"
                            name="patientMotherAddressZip"
                            id="patientMotherAddressZip"
                          />
                          <ErrorMessage
                            name="patientMotherAddressZip"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                      <div className="col-span-12 relative mb-4 md:mb-6">
                        <div className="grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientMotherTelePhone">
                              Home Telephone No.
                            </label>
                          </div>
                          <div className="col-span-12">
                            <Field
                              type="tel"
                              name="patientMotherTelePhone"
                              id="patientMotherTelePhone"
                              value={patientMotherPhone}
                              onChange={handleMotherPhoneChange}
                              maxLength="14" // Including formatting characters
                            />
                            <ErrorMessage
                              name="patientMotherTelePhone"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 relative mb-4 md:mb-6">
                        <div className="grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientMotherEmployer">
                              Employer
                            </label>
                          </div>
                          <div className="col-span-12">
                            <Field
                              type="text"
                              name="patientMotherEmployer"
                              id="patientMotherEmployer"
                            />
                            <ErrorMessage
                              name="patientMotherEmployer"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 relative mb-4 md:mb-6">
                        <div className="grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientMotherOccupation">
                              Occupation
                            </label>
                          </div>
                          <div className="col-span-12">
                            <Field
                              type="text"
                              name="patientMotherOccupation"
                              id="patientMotherOccupation"
                            />
                            <ErrorMessage
                              name="patientMotherOccupation"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 relative mb-4 md:mb-6">
                        <div className="grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientMotherOccupationAddress">
                              Address
                            </label>
                          </div>
                          <div className="col-span-12">
                            <Field
                              type="text"
                              as="textarea"
                              rows="2"
                              name="patientMotherOccupationAddress"
                              id="patientMotherOccupationAddress"
                            />
                            <ErrorMessage
                              name="patientMotherOccupationAddress"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="col-span-12 gap-4 md:col-span-4 relative">
                          <label htmlFor="patientMotherOccupationAddressCity">
                            City
                          </label>
                          <Field
                            type="text"
                            name="patientMotherOccupationAddressCity"
                            id="patientMotherOccupationAddressCity"
                          />
                          <ErrorMessage
                            name="patientMotherOccupationAddressCity"
                            component="p"
                            className="invalid"
                          />
                        </div>

                        <div className="col-span-12  gap-4 md:col-span-4 relative">
                          <label htmlFor="patientMotherOccupationAddressState">
                            State
                          </label>
                          <Select
                            name="patientMotherOccupationAddressState"
                            id="patientMotherOccupationAddressState"
                            options={stateList}
                            className="st-react-select"
                            classNamePrefix="react-select"
                            defaultValue={() => {
                              if (
                                initialValues.patientMotherOccupationAddressState &&
                                initialValues.patientMotherOccupationAddressState !=
                                  ""
                              )
                                return {
                                  value:
                                    initialValues.patientMotherOccupationAddressState,
                                  label:
                                    initialValues.patientMotherOccupationAddressState,
                                };
                              else return "";
                            }}
                            onChange={(selectedOption) => {
                              handleChange(
                                "patientMotherOccupationAddressState"
                              )(selectedOption?.value);
                            }}
                          />
                        </div>

                        <div className="col-span-12 gap-4 md:col-span-4 relative">
                          <label htmlFor="patientMotherOccupationAddressZip">
                            {" "}
                            Zip
                          </label>
                          <Field
                            type="text"
                            min="0"
                            name="patientMotherOccupationAddressZip"
                            id="patientMotherOccupationAddressZip"
                          />
                          <ErrorMessage
                            name="patientMotherOccupationAddressZip"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                      <div className="col-span-12 relative mb-4 md:mb-6">
                        <div className="grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientMotherOccupationTelephone">
                              Work Telephone No.
                            </label>
                          </div>
                          <div className="col-span-12">
                            <Field
                              type="tel"
                              name="patientMotherOccupationTelephone"
                              id="patientMotherOccupationTelephone"
                              value={patientMotherOccupationPhone}
                              onChange={handleMotherOccupationPhoneChange}
                              maxLength="14" // Including formatting characters
                            />
                            <ErrorMessage
                              name="patientMotherOccupationTelephone"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 relative mb-4 md:mb-6">
                        <div className="grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientMotherScurity">
                              Social Security No.
                            </label>
                          </div>
                          <div className="col-span-12">
                            <input
                              type="text"
                              name="patientMotherScurity"
                              id="patientMotherScurity"
                              value={socialSecurity3}
                              onChange={handleSocialSecurity3Change}
                            />
                            {socialSecurity3Error && (
                              <p className="invalid">{socialSecurity3Error}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-12 relative mb-4 md:mb-6">
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-12">
                            <label htmlFor="patientMotherMarried">
                              Marital Status
                            </label>
                          </div>

                          <div className="flex items-center gap-2 col-span-2">
                            <label>
                              <Field
                                type="radio"
                                value="Single"
                                name="patientMotherMarried"
                                className="mr-2"
                              />
                              Single
                            </label>
                          </div>

                          <div className="flex items-center gap-2 col-span-2">
                            <label>
                              <Field
                                type="radio"
                                value="Married"
                                name="patientMotherMarried"
                                className="mr-2"
                              />
                              Married
                            </label>
                          </div>

                          <div className="flex items-center gap-2 col-span-2">
                            <label>
                              <Field
                                type="radio"
                                value="Separated"
                                name="patientMotherMarried"
                                className="mr-2"
                              />
                              Separated
                            </label>
                          </div>

                          <div className="flex items-center gap-2 col-span-2">
                            <label>
                              <Field
                                type="radio"
                                value="Divorced"
                                name="patientMotherMarried"
                                className="mr-2"
                              />
                              Divorced
                            </label>
                          </div>

                          <div className="flex items-center gap-2 col-span-2">
                            <label>
                              <Field
                                type="radio"
                                value="Widow"
                                name="patientMotherMarried"
                                className="mr-2"
                              />
                              Widow
                            </label>
                          </div>

                          <ErrorMessage
                            name="patientMotherMarried"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-8 underline underline-offset-2">
                      Insurance Information
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-12 gap-6 mb-4 md:mb-8">
                    <div className="col-span-6">
                      <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                        <div className="grid grid-cols-6 gap-4">
                          <div className="col-span-6">
                            <label htmlFor="doYouHaveInsuranceFather">
                              Does father have any insurance? *
                            </label>
                          </div>

                          <div className="flex items-center gap-2 col-span-2">
                            <label>
                              <Field
                                type="radio"
                                value="Yes"
                                name="doYouHaveInsuranceFather"
                                className="mr-2"
                              />
                              Yes
                            </label>
                          </div>

                          <div className="flex items-center gap-2 col-span-2">
                            <label>
                              <Field
                                type="radio"
                                value="N/A"
                                name="doYouHaveInsuranceFather"
                                className="mr-2"
                              />
                              N/A
                            </label>
                          </div>
                          <div className="flex items-center gap-2 col-span-2">
                            <label>
                              <Field
                                type="radio"
                                value="Self Pay"
                                name="doYouHaveInsuranceFather"
                                className="mr-2"
                              />
                              Self Pay
                            </label>
                          </div>
                          <ErrorMessage
                            name="doYouHaveInsuranceFather"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>

                      {values.doYouHaveInsuranceFather === "Yes" && (
                        <>
                          <div className="col-span-12 relative mb-4 md:mb-6">
                            <div className="grid-cols-12 gap-4">
                              <div className="col-span-12">
                                <label htmlFor="patientFatherInsurance">
                                  Father&apos;s Insurance *
                                </label>
                              </div>
                              <div className="col-span-12">
                                <Field
                                  type="text"
                                  name="patientFatherInsurance"
                                  id="patientFatherInsurance"
                                />
                                <ErrorMessage
                                  name="patientFatherInsurance"
                                  component="p"
                                  className="invalid"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-span-12 relative mb-4 md:mb-6">
                            <div className="grid-cols-12 gap-4">
                              <div className="col-span-12">
                                <label htmlFor="patientFatherInsuranceAddress">
                                  Insurance Address
                                </label>
                              </div>
                              <div className="col-span-12">
                                <Field
                                  type="text"
                                  name="patientFatherInsuranceAddress"
                                  id="patientFatherInsuranceAddress"
                                />
                                <ErrorMessage
                                  name="patientFatherInsuranceAddress"
                                  component="p"
                                  className="invalid"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12 relative mb-4 md:mb-6">
                            <div className="grid-cols-12 gap-4">
                              <div className="col-span-12">
                                <label htmlFor="patientFatherInsuranceSubscriber">
                                  Subscriber *
                                </label>
                              </div>
                              <div className="col-span-12">
                                <Field
                                  type="text"
                                  name="patientFatherInsuranceSubscriber"
                                  id="patientFatherInsuranceSubscriber"
                                />
                                <ErrorMessage
                                  name="patientFatherInsuranceSubscriber"
                                  component="p"
                                  className="invalid"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12 relative mb-4 md:mb-6">
                            <div className="grid-cols-12 gap-4">
                              <div className="col-span-12">
                                <label htmlFor="patientFatherInsuranceRelation">
                                  Relationship to Patient *
                                </label>
                              </div>
                              <div className="col-span-12">
                                <Field
                                  type="text"
                                  name="patientFatherInsuranceRelation"
                                  id="patientFatherInsuranceRelation"
                                />
                                <ErrorMessage
                                  name="patientFatherInsuranceRelation"
                                  component="p"
                                  className="invalid"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12 relative mb-4 md:mb-6">
                            <div className="grid-cols-12 gap-4">
                              <div className="col-span-12">
                                <label htmlFor="patientFatherInsuranceID">
                                  Member ID No. *
                                </label>
                              </div>
                              <div className="col-span-12">
                                <Field
                                  type="text"
                                  name="patientFatherInsuranceID"
                                  id="patientFatherInsuranceID"
                                />
                                <ErrorMessage
                                  name="patientFatherInsuranceID"
                                  component="p"
                                  className="invalid"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12 relative mb-4 md:mb-6">
                            <div className="grid-cols-12 gap-4">
                              <div className="col-span-12">
                                <label htmlFor="patientFatherInsuranceDate">
                                  Effective Date
                                </label>
                              </div>
                              <div className="col-span-12">
                                <Field
                                  type="date"
                                  name="patientFatherInsuranceDate"
                                  id="patientFatherInsuranceDate"
                                  value={effectiveDate1}
                                  onChange={handleDateChange3}
                                  max={`${new Date().getFullYear()}-12-31`} // Set max attribute to current year
                                />
                                {yearEditedManually3 && (
                                  <p className="invalid">
                                    Please enter a valid date with a 4-digit
                                    year.
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="col-span-6">
                      <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                        <div className="grid grid-cols-6 gap-4">
                          <div className="col-span-6">
                            <label htmlFor="doYouHaveInsuranceMother">
                              Does mother have any insurance? *
                            </label>
                          </div>

                          <div className="flex items-center gap-2 col-span-2">
                            <label>
                              <Field
                                type="radio"
                                value="Yes"
                                name="doYouHaveInsuranceMother"
                                className="mr-2"
                              />
                              Yes
                            </label>
                          </div>

                          <div className="flex items-center gap-2 col-span-2">
                            <label>
                              <Field
                                type="radio"
                                value="N/A"
                                name="doYouHaveInsuranceMother"
                                className="mr-2"
                              />
                              N/A
                            </label>
                          </div>
                          <div className="flex items-center gap-2 col-span-2">
                            <label>
                              <Field
                                type="radio"
                                value="Self Pay"
                                name="doYouHaveInsuranceMother"
                                className="mr-2"
                              />
                              Self Pay
                            </label>
                          </div>
                          <ErrorMessage
                            name="doYouHaveInsuranceMother"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>

                      {values.doYouHaveInsuranceMother === "Yes" && (
                        <>
                          <div className="col-span-12 relative mb-4 md:mb-6">
                            <div className="grid-cols-12 gap-4">
                              <div className="col-span-12">
                                <label htmlFor="patientMotherInsurance">
                                  Mother&apos;s Insurance *
                                </label>
                              </div>
                              <div className="col-span-12">
                                <Field
                                  type="text"
                                  name="patientMotherInsurance"
                                  id="patientMotherInsurance"
                                />
                                <ErrorMessage
                                  name="patientMotherInsurance"
                                  component="p"
                                  className="invalid"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-span-12 relative mb-4 md:mb-6">
                            <div className="grid-cols-12 gap-4">
                              <div className="col-span-12">
                                <label htmlFor="patientMotherInsuranceInsurance">
                                  Insurance Address
                                </label>
                              </div>
                              <div className="col-span-12">
                                <Field
                                  type="text"
                                  name="patientMotherInsuranceInsurance"
                                  id="patientMotherInsuranceInsurance"
                                />
                                <ErrorMessage
                                  name="patientMotherInsuranceInsurance"
                                  component="p"
                                  className="invalid"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12 relative mb-4 md:mb-6">
                            <div className="grid-cols-12 gap-4">
                              <div className="col-span-12">
                                <label htmlFor="patientMotherInsuranceSubscriber">
                                  Subscriber *
                                </label>
                              </div>
                              <div className="col-span-12">
                                <Field
                                  type="text"
                                  name="patientMotherInsuranceSubscriber"
                                  id="patientMotherInsuranceSubscriber"
                                />
                                <ErrorMessage
                                  name="patientMotherInsuranceSubscriber"
                                  component="p"
                                  className="invalid"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12 relative mb-4 md:mb-6">
                            <div className="grid-cols-12 gap-4">
                              <div className="col-span-12">
                                <label htmlFor="patientMotherInsuranceRelationShip">
                                  Relationship to Patient *
                                </label>
                              </div>
                              <div className="col-span-12">
                                <Field
                                  type="text"
                                  name="patientMotherInsuranceRelationShip"
                                  id="patientMotherInsuranceRelationShip"
                                />
                                <ErrorMessage
                                  name="patientMotherInsuranceRelationShip"
                                  component="p"
                                  className="invalid"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12 relative mb-4 md:mb-6">
                            <div className="grid-cols-12 gap-4">
                              <div className="col-span-12">
                                <label htmlFor="patientMotherInsuranceID">
                                  Member ID No. *
                                </label>
                              </div>
                              <div className="col-span-12">
                                <Field
                                  type="text"
                                  name="patientMotherInsuranceID"
                                  id="patientMotherInsuranceID"
                                />
                                <ErrorMessage
                                  name="patientMotherInsuranceID"
                                  component="p"
                                  className="invalid"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12 relative mb-4 md:mb-6">
                            <div className="grid-cols-12 gap-4">
                              <div className="col-span-12">
                                <label htmlFor="patientMotherInsuranceDate">
                                  Effective Date
                                </label>
                              </div>
                              <div className="col-span-12">
                                <Field
                                  type="date"
                                  name="patientMotherInsuranceDate"
                                  id="patientMotherInsuranceDate"
                                  value={effectiveDate2}
                                  onChange={handleDateChange4}
                                  max={`${new Date().getFullYear()}-12-31`} // Set max attribute to current year
                                />
                                {yearEditedManually4 && (
                                  <p className="invalid">
                                    Please enter a valid date with a 4-digit
                                    year.
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-base md:text-lg  font-semibold mb-2 md:mb-8 underline underline-offset-4">
                      Other Coverage(through other Agencies)
                    </h2>
                  </div>

                  <div className="grid grid-cols-12 gap-4 mb-4 md:mb-6">
                    <div className="md:col-span-6 col-span-12 relative mb-4 md:mb-6">
                      <div className="md:grid-cols-6 grid-cols-12 gap-4">
                        <div className="md:col-span-12 col-span-12">
                          <label htmlFor="patientOrganization">
                            Name of Organization
                          </label>
                        </div>
                        <div className="md:col-span-12 col-span-12">
                          <Field
                            type="text"
                            name="patientOrganization"
                            id="patientOrganization"
                          />
                          <ErrorMessage
                            name="patientOrganization"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                      <div className="grid-cols-12 md:grid-cols-6 gap-4">
                        <div className="cols-span-12 md:col-span-12">
                          <label htmlFor="patientOrganizationidentification">
                            Identification No.
                          </label>
                        </div>
                        <div className="col-span-12 md:col-span-12">
                          <Field
                            type="text"
                            name="patientOrganizationidentification"
                            id="patientOrganizationidentification"
                          />
                          <ErrorMessage
                            name="patientOrganizationidentification"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4 mb-4 md:mb-6 items-end">
                    <div className="md:col-span-6 col-span-12 relative mb-4 md:mb-6">
                      <div className="md:grid-cols-6 grid-cols-12 gap-4">
                        <div className="md:col-span-12 col-span-12">
                          <label htmlFor="patientOrganizationAddress">
                            Address
                          </label>
                        </div>
                        <div className="md:col-span-12 col-span-12">
                          <Field
                            type="text"
                            name="patientOrganizationAddress"
                            id="patientOrganizationAddress"
                          />
                          <ErrorMessage
                            name="patientOrganizationAddress"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 md:col-span-6 col-span-12 mb-4 md:mb-6">
                      <div className="col-span-12  gap-4 md:col-span-4 relative">
                        <label htmlFor="patientOrganizationCity">City</label>
                        <Field
                          type="text"
                          name="patientOrganizationCity"
                          id="patientOrganizationCity"
                        />
                        <ErrorMessage
                          name="patientOrganizationCity"
                          component="p"
                          className="invalid"
                        />
                      </div>

                      <div className="col-span-12  gap-4 md:col-span-4 relative">
                        <label htmlFor="patientOrganizationState">State</label>
                        <Select
                          name="patientOrganizationState"
                          id="patientOrganizationState"
                          options={stateList}
                          className="st-react-select"
                          classNamePrefix="react-select"
                          defaultValue={() => {
                            if (
                              initialValues.patientOrganizationState &&
                              initialValues.patientOrganizationState != ""
                            )
                              return {
                                value: initialValues.patientOrganizationState,
                                label: initialValues.patientOrganizationState,
                              };
                            else return "";
                          }}
                          onChange={(selectedOption) => {
                            handleChange("patientOrganizationState")(
                              selectedOption?.value
                            );
                          }}
                        />
                      </div>

                      <div className="col-span-12 gap-4 md:col-span-4 relative">
                        <label htmlFor="patientOrganizationZip"> Zip</label>
                        <Field
                          type="text"
                          min="0"
                          name="patientOrganizationZip"
                          id="patientOrganizationZip"
                        />
                        <ErrorMessage
                          name="patientOrganizationZip"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 mb-4 md:mb-8">
                    <div className="md:col-span-6 col-span-12 relative mb-4 md:mb-6">
                      <div className="md:grid-cols-6 grid-cols-12 gap-4">
                        <div className="md:col-span-12 col-span-12">
                          <label htmlFor="patientOrganizationDate">
                            Effective Date
                          </label>
                        </div>
                        <div className="md:col-span-12 col-span-12">
                          <Field
                            type="date"
                            name="patientOrganizationDate"
                            id="patientOrganizationDate"
                            value={effectiveDate3}
                            onChange={handleDateChange5}
                            max={`${new Date().getFullYear()}-12-31`} // Set max attribute to current year
                          />
                          {yearEditedManually5 && (
                            <p className="invalid">
                              Please enter a valid date with a 4-digit year.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-base md:text-lg  font-semibold mb-2 md:mb-8 underline underline-offset-4">
                      Referring Physician:
                    </h2>
                  </div>

                  <div className="grid grid-cols-12 gap-4 mb-4 md:mb-6">
                    <div className="md:col-span-6 col-span-12 relative mb-4 md:mb-6">
                      <div className="md:grid-cols-6 grid-cols-12 gap-4">
                        <div className="md:col-span-12 col-span-12">
                          <label htmlFor="referringPhysicianName">
                            Full Name
                          </label>
                          <Field
                            name="referringPhysicianName"
                            id="referringPhysicianName"
                            type="text"
                          />
                          <ErrorMessage
                            name="referringPhysicianName"
                            component="div"
                            className="field-error"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                      <div className="grid-cols-12 md:grid-cols-6 gap-4">
                        <div className="cols-span-12 md:col-span-12">
                          <label htmlFor="referringPhysicianAddress">
                            Office Address
                          </label>
                          <Field
                            name="referringPhysicianAddress"
                            id="referringPhysicianAddress"
                            type="text"
                          />
                          <ErrorMessage
                            name="referringPhysicianAddress"
                            component="div"
                            className="field-error"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4 mb-4 md:mb-6 items-end">
                    <div className="md:col-span-6 col-span-12 relative mb-4 md:mb-6">
                      <div className="md:grid-cols-6 grid-cols-12 gap-4">
                        <div className="md:col-span-12 col-span-12">
                          <label htmlFor="referringPhysicianPhone">
                            Office Telephone No.
                          </label>
                          <Field
                            name="referringPhysicianPhone"
                            id="referringPhysicianPhone"
                            type="tel"
                            value={patientPhysicianPhone}
                            onChange={handlePhysicianPhoneChange}
                            maxLength="14" // Including formatting characters
                          />
                          <ErrorMessage
                            name="referringPhysicianPhone"
                            component="div"
                            className="field-error"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 md:col-span-6 col-span-12 mb-4 md:mb-6">
                      <div className="col-span-12  gap-4 md:col-span-4 relative">
                        <label htmlFor="referringPhysicianCity">City</label>
                        <Field
                          type="text"
                          name="referringPhysicianCity"
                          id="referringPhysicianCity"
                        />
                        <ErrorMessage
                          name="referringPhysicianCity"
                          component="p"
                          className="invalid"
                        />
                      </div>

                      <div className="col-span-12  gap-4 md:col-span-4 relative">
                        <label htmlFor="referringPhysicianState">State</label>
                        <Select
                          name="referringPhysicianState"
                          id="referringPhysicianState"
                          options={stateList}
                          className="st-react-select"
                          classNamePrefix="react-select"
                          defaultValue={() => {
                            if (
                              initialValues.referringPhysicianState &&
                              initialValues.referringPhysicianState != ""
                            )
                              return {
                                value: initialValues.referringPhysicianState,
                                label: initialValues.referringPhysicianState,
                              };
                            else return "";
                          }}
                          onChange={(selectedOption) => {
                            handleChange("referringPhysicianState")(
                              selectedOption?.value
                            );
                          }}
                        />
                      </div>

                      <div className="col-span-12 gap-4 md:col-span-4 relative">
                        <label htmlFor="referringPhysicianZip"> Zip</label>
                        <Field
                          type="text"
                          min="0"
                          name="referringPhysicianZip"
                          id="referringPhysicianZip"
                        />
                        <ErrorMessage
                          name="referringPhysicianZip"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 mb-4 md:mb-8">
                    <div className="md:col-span-6 col-span-12 relative mb-4 md:mb-6">
                      <div className="md:grid-cols-6 grid-cols-12 gap-4">
                        <div className="md:col-span-12 col-span-12">
                          <label htmlFor="referringPhysicianSpeciality">
                            Speciality
                          </label>
                          <Field
                            name="referringPhysicianSpeciality"
                            id="referringPhysicianSpeciality"
                            type="text"
                          />
                          <ErrorMessage
                            name="referringPhysicianSpeciality"
                            component="div"
                            className="field-error"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div></div>
                  <div>
                    <h2 className="text-base md:text-lg  font-semibold mb-2 md:mb-8 underline underline-offset-4">
                      Emergency Contact Information:
                    </h2>
                  </div>
                  <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                    <div className="col-span-12 md:col-span-12 relative">
                      <label htmlFor="patientChildEmergencyName">Name</label>
                    </div>

                    <div className="col-span-12 gap-4 md:col-span-4 relative">
                      <label htmlFor="patientChilEmergencyNameLast">
                        Last *
                      </label>
                      <Field
                        type="text"
                        name="patientChilEmergencyNameLast"
                        id="patientChilEmergencyNameLast"
                      />
                      <ErrorMessage
                        name="patientChilEmergencyNameLast"
                        component="p"
                        className="invalid"
                      />
                    </div>

                    <div className="col-span-12  gap-4 md:col-span-4 relative">
                      <label htmlFor="patientChildEmergencyFirstName">
                        First *
                      </label>
                      <Field
                        type="text"
                        min="0"
                        name="patientChildEmergencyFirstName"
                        id="patientChildEmergencyFirstName"
                      />
                      <ErrorMessage
                        name="patientChildEmergencyFirstName"
                        component="p"
                        className="invalid"
                      />
                    </div>

                    <div className="col-span-12 gap-4 md:col-span-4 relative">
                      <label htmlFor="patientChildMiddleEmergencyName">
                        Middle
                      </label>
                      <Field
                        type="text"
                        min="0"
                        name="patientChildMiddleEmergencyName"
                        id="patientChildMiddleEmergencyName"
                      />
                      <ErrorMessage
                        name="patientChildMiddleEmergencyName"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 mb-4 md:mb-8">
                    <div className="md:col-span-6 col-span-12 relative mb-4 md:mb-6">
                      <div className=" md:grid-cols-6 grid-cols-12 gap-4">
                        <div className="md:col-span-12 col-span-12">
                          <label htmlFor="patientChildEmergencyRelationship">
                            Relationship to Patient *
                          </label>
                        </div>
                        <div className="md:col-span-12 col-span-12">
                          <Field
                            type="text"
                            name="patientChildEmergencyRelationship"
                            id="patientChildEmergencyRelationship"
                          />
                          <ErrorMessage
                            name="patientChildEmergencyRelationship"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                      <div className="grid-cols-12 md:grid-cols-12 gap-4">
                        <div className="cols-span-12 md:col-span-12">
                          <label htmlFor="patientChildEmergencyRelationshipPhone">
                            Phone No. *
                          </label>
                        </div>
                        <div className="col-span-12 md:col-span-12">
                          <Field
                            type="tel"
                            name="patientChildEmergencyRelationshipPhone"
                            id="patientChildEmergencyRelationshipPhone"
                            value={patientEmergencyPhone}
                            onChange={handleEmergencyPhoneChange}
                            maxLength="14" // Including formatting characters
                          />
                          <ErrorMessage
                            name="patientChildEmergencyRelationshipPhone"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="col-span-12 flex gap-4 px-4 xl:px-0">
                  <div>
                    <button
                      onClick={() => setStep(step - 1)}
                      type="button"
                      className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                    >
                      Previous
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => setStep(step + 1)}
                      type="button"
                      className="button-primary text-sm disabled:opacity-50 py-2 px-3"
                      disabled={
                        values.doYouHaveInsuranceFather == "" ||
                        values.doYouHaveInsuranceMother == "" ||
                        values.patientGender === "" ||
                        dateOfBirth === "" ||
                        values.patientChilEmergencyNameLast === "" ||
                        values.patientChildEmergencyFirstName === "" ||
                        values.patientChildEmergencyRelationship === "" ||
                        patientEmergencyPhone === "" ||
                        (!patientNumberPhone && !patientCellPhone) // Add this condition
                          ? true
                          : (values.doYouHaveInsuranceFather == "Yes" &&
                              (!values.patientFatherInsurance ||
                                !values.patientFatherInsuranceSubscriber ||
                                !values.patientFatherInsuranceRelation ||
                                !values.patientFatherInsuranceID)) ||
                            (values.doYouHaveInsuranceMother === "Yes" &&
                              (!values.patientMotherInsurance ||
                                !values.patientMotherInsuranceSubscriber ||
                                !values.patientMotherInsuranceRelationShip ||
                                !values.patientMotherInsuranceID))
                          ? true
                          : false
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
        break;

      case 3:
        return (
          <>
            <section className="max-w-screen-lg px-6 py-12 bg-slate-100 mx-auto">
              <div className="px-4 xl:px-0">
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-center underline decoration-2 underline-offset-4 mb-4 md:mb-8">
                  PATIENT CONSENT FORM
                </h3>
                <h6 className="text-sm md:text-base font-bold mb-4">
                  MEDICAL CONSENT:
                </h6>
                <p className="md:text-base mb-4 md:mb-6">
                  I request and authorize my provider(s), their associates and
                  assistants and employees to provide and perform such medical
                  care, tests, procedures, drugs and other services and supplies
                  as are considered advisable by my provider for my health, and
                  well-being. This may include pathology, radiology, emergency
                  services, and other special services and tests ordered by my
                  provider(s). I acknowledge that no representations,
                  warranties, or guaranties as to result or cures have been made
                  to or relied upon by me.
                </p>
                <h6 className="text-sm md:text-base font-bold mb-4">
                  CONFIDENTIALITY:
                </h6>
                <p className="md:text-base mb-4 md:mb-6">
                  The law protects the privacy of communication between a client
                  and Dr Rubina. In most situations, we can only release
                  information about your treatment to others if you sign a
                  written Authorization form that meets certain legal
                  requirements imposed by HIPPA. Your signature on this
                  Agreement provides consent to the following activities:
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  I further authorize Doctor Rubina, her associates and
                  assistants and employees to provide and perform such medical
                  care:
                </p>
                <div className="pl-6 md:pl-10 flex gap-4 mb-4 md:mb-6">
                  <div className="w-2 h-2 rounded-full bg-black shrink-0 mt-2"></div>
                  <p className="md:text-base ">
                    If a patient threatens to harm himself/herself, I may be
                    obligated to seek hospitalization for him/her or to contact
                    family members or others who can help provide protection.
                  </p>
                </div>
                <p className="md:text-base mb-4 md:mb-6">
                  There are some situations in which the doctor is legally
                  obligated to take actions, which I believe are necessary to
                  attempt to protect others from harm and doctor may have to
                  reveal some information about a client’s treatment. If doctor
                  has a reason to believe that a child has been abused, the law
                  requires that doctor file a report with DFACS. Once a report
                  is filed, I may be required to provide additional information
                </p>
                <div className="pl-6 md:pl-10 flex gap-4 mb-4 md:mb-6">
                  <div className="w-2 h-2 rounded-full bg-black shrink-0 mt-2"></div>
                  <p className="md:text-base ">
                    If I have reasonable cause to believe that a disabled adult
                    or elder person has been abused, I am required to report
                    that to the appropriate agency. Once a report is filed, I
                    may be required to provide additional information.
                  </p>
                </div>
                <div className="pl-6 md:pl-10 flex gap-4 mb-4 md:mb-6">
                  <div className="w-2 h-2 rounded-full bg-black shrink-0 mt-2"></div>
                  <p className="md:text-base ">
                    If I determine that a client presents a serious danger of
                    violence to another, I may be required to take protective
                    actions. These actions may include notifying the potential
                    victim, and/or contacting the police, and/or seeking
                    hospitalization for the client
                  </p>
                </div>
                <p className="md:text-base mb-4 md:mb-6">
                  If a situation arises, I will make every effort to fully
                  discuss it with you before taking any action and I will limit
                  my disclosure to what is necessary. Please feel free to
                  discuss any concerns or questions you may have about
                  confidentiality.
                </p>
                <h6 className="text-sm md:text-base font-bold mb-4">
                  RELEASE OF INFORMATION:
                </h6>
                <p className="md:text-base mb-4 md:mb-6">
                  I hereby authorize the above provider(s) to release any
                  medical information concerning my care, including copies of
                  medical records, and/or billing information pertaining to my
                  medical care to individuals or representatives of agencies or
                  organizations or the insurer in connection with obtaining
                  payment for the medical services rendered to me and/or
                  independent contractors engaged by them
                </p>
                <h6 className="text-sm md:text-base font-bold mb-4">
                  ASSIGNMENT OF INSURANCE BENEFITS:
                </h6>
                <p className="md:text-base mb-4 md:mb-6">
                  In consideration of any and all medical services, care, drugs,
                  supplies, equipment and facilities forwarded by the above
                  providers, I hereby irrevocably transfer to said provider(s)
                  all insurance benefits now due and payable to me or to become
                  due and payable to me under any insurance policy or policies,
                  or any replacement policies thereof that might be applicable.
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  I understand that my obligation to pay all charges is not
                  affected by the fact that I have insurance benefits, and if my
                  insurance company fails to pay all or any portion of these
                  charges for any reason, I will be responsible for all sums due
                  and owing above provider(s).
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  The above provider(s) and the patient or patient’s
                  representative hereby enter into the above agreements. The
                  patient or patient’s representative certifies that he/she has
                  read and accepted the above, where applicable to the patient’s
                  condition and status and further certified that he/she is the
                  patient, or is duly authorized on behalf of the patient to
                  execute such an agreement.
                </p>
                <div className="flex flex-col md:flex-row justify-between mb-4 ">
                  <div>
                    {sign ? (
                      <>
                        <img src={sign} />
                        <button
                          className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                          type="button"
                          onClick={() => {
                            setSign();
                          }}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        {/* <ReactSignatureCanvas
                          ref={canvasRef}
                          canvasProps={{
                            width: 280,
                            height: 120,
                            className:
                              "signatureCanvas mb-4 w-full md:w-[280px] md:h-[120px]",
                          }}
                        /> */}
                        <SignatureCanvas
                          ref={(ref) => (canvasRef.current = ref)} // Initialize the canvasRef with the reference to the component
                          canvasProps={{
                            width: 280,
                            height: 120,
                            className:
                              "signatureCanvas mb-4 w-full md:w-[280px] md:h-[120px]",
                          }}
                        />
                        <button
                          className="button-primary  text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                          type="button"
                          onClick={() => {
                            canvasRef.current.clear();
                            setSign();
                          }}
                        >
                          Clear
                        </button>
                      </>
                    )}

                    {/* <button
                      className="ml-5 button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3 "
                      type="button"
                      onClick={() => {
                        setSign(canvasRef.current.toDataURL());
                      }}
                    >
                      Save
                    </button> */}
                    <button
                      className={`ml-5 button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3 ${
                        canvasRef.current && !canvasRef.current.isEmpty()
                          ? ""
                          : "disabled"
                      }`}
                      type="button"
                      onClick={() => {
                        if (canvasRef.current && !canvasRef.current.isEmpty()) {
                          setSign(canvasRef.current.toDataURL());
                        }
                      }}
                    >
                      Save
                    </button>

                    <p className="md:text-base mb-4 mt-2 md:mb-6 ">
                      Patient’s Signature/Person Authorized to
                      Consent(Relationship)
                    </p>
                  </div>
                </div>
              </div>
              <div>
                {sign ? (
                  <div className="col-span-12 flex gap-4 px-4 xl:px-0">
                    <div>
                      <button
                        onClick={() => setStep(step - 1)}
                        type="button"
                        className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      >
                        Previous
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => setStep(step + 1)}
                        type="button"
                        className="button-primary text-sm disabled:opacity-50 py-2 px-3"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="col-span-12 flex gap-4 px-4 xl:px-0">
                    <div>
                      <button
                        onClick={() => setStep(step - 1)}
                        type="button"
                        className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      >
                        Previous
                      </button>
                    </div>
                    <div>
                      <button
                        disabled
                        type="button"
                        className="button-primary text-sm disabled:opacity-50 py-2 px-3"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        );
        break;

      case 4:
        return (
          <>
            <section className="max-w-screen-lg px-6 py-12 bg-slate-100 mx-auto">
              <div className="px-4 xl:px-0">
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-center underline decoration-2 underline-offset-4 mb-4 md:mb-8">
                  PRIVACY POLICY ACKNOWLEDGEMENT STATEMENT
                </h3>
                <p className="md:text-base mb-4 md:mb-6">
                  I hereby acknowledge that I have been made aware that Gwinnett
                  Psychiatry, P.C. has a Privacy Policy in place in accordance
                  with the Health Insurance Portability and Accountability Act
                  of 1996(HIPAA).
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  As a patient of Gwinnett Psychiatry, P.C., I understand and
                  acknowledge the following:
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  Gwinnett Psychiatry, P.C. has a privacy policy in effect in
                  their office.
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  Gwinnett Psychiatry, P.C. has made this policy available to me
                  for review, by placing a complete version in a binder that
                  resides in the waiting room and/or by placing a poster version
                  of this policy in the waiting room or similar common area with
                  patient access.
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  Gwinnett Psychiatry, P.C. has made me aware, that as a patient
                  I am entitled to a copy of this Privacy Policy if I desire a
                  copy for my personal file.
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  Upon your review of the above statements, please sign at the
                  bottom, acknowledging that you have been advised of the
                  privacy policy implemented by Gwinnett Psychiatry, P.C.
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  I have read and understand the acknowledgment form. If you
                  desire a copy of the Privacy Policy, please request one at
                  this time.
                </p>

                <div className="md:text-base mb-4 md:mb-6">
                  <div className="flex items-center gap-2 col-span-2 mb-2 md:col-span-1">
                    <label>
                      <Field
                        type="radio"
                        value="Yes"
                        name="acknowledgePrivacyPolicyExists"
                        className="mr-2"
                      />
                      Yes, I do want a copy of the Privacy Policy
                    </label>
                  </div>

                  <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                    <label>
                      <Field
                        type="radio"
                        value="No"
                        name="acknowledgePrivacyPolicyExists"
                        className="mr-2"
                      />
                      No, I do not want a copy but I acknowledge the Privacy
                      Policy exists.
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                  <div className="col-span-12 md:col-span-12 relative">
                    <label htmlFor="patientName">Patient Name</label>
                  </div>

                  <div className="col-span-12 gap-4 md:col-span-4 relative">
                    <label
                      htmlFor="patientPrivacyLastName"
                      className="mb-2 md:mb-0"
                    >
                      Last
                    </label>
                    <Field
                      type="text"
                      name="patientPrivacyLastName"
                      id="patientPrivacyLastName"
                    />
                    <ErrorMessage
                      name="patientPrivacyLastName"
                      component="p"
                      className="invalid"
                    />
                  </div>

                  <div className="col-span-12  gap-4 md:col-span-4 relative">
                    <label
                      htmlFor="patientPrivacyFirstName"
                      className="mb-2 md:mb-0"
                    >
                      First
                    </label>
                    <Field
                      type="text"
                      name="patientPrivacyFirstName"
                      id="patientPrivacyFirstName"
                    />
                    <ErrorMessage
                      name="patientPrivacyFirstName"
                      component="p"
                      className="invalid"
                    />
                  </div>

                  <div className="col-span-12 gap-4 md:col-span-4 relative">
                    <label
                      htmlFor="patientPrivacyMiddleName"
                      className="mb-2 md:mb-0"
                    >
                      Middle
                    </label>
                    <Field
                      type="text"
                      name="patientPrivacyMiddleName"
                      id="patientPrivacyMiddleName"
                    />
                    <ErrorMessage
                      name="patientPrivacyMiddleName"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between mb-4 md:mb-6">
                  <div>
                    {signData ? (
                      <>
                        <img src={signData} />
                        <button
                          className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                          type="button"
                          onClick={() => {
                            setSignData();
                          }}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        {/* <ReactSignatureCanvas
                          ref={canvasRef}
                          canvasProps={{
                            width: 280,
                            height: 120,
                            className:
                              "signatureCanvas mb-4 w-full md:w-[280px] md:h-[120px]",
                          }}
                        /> */}
                        <SignatureCanvas
                          ref={(ref) => (canvasRef.current = ref)} // Initialize the canvasRef with the reference to the component
                          canvasProps={{
                            width: 280,
                            height: 120,
                            className:
                              "signatureCanvas mb-4 w-full md:w-[280px] md:h-[120px]",
                          }}
                        />
                        <button
                          className="button-primary  text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                          type="button"
                          onClick={() => {
                            canvasRef.current.clear();
                            setSignData();
                          }}
                        >
                          Clear
                        </button>
                      </>
                    )}

                    {/* <button
                      className="ml-5 button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      type="button"
                      onClick={() => {
                        setSignData(canvasRef.current.toDataURL());
                      }}
                    >
                      Save
                    </button> */}
                    <button
                      className={`ml-5 button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3 ${
                        canvasRef.current && !canvasRef.current.isEmpty()
                          ? ""
                          : "disabled"
                      }`}
                      type="button"
                      onClick={() => {
                        if (canvasRef.current && !canvasRef.current.isEmpty()) {
                          setSignData(canvasRef.current.toDataURL());
                        }
                      }}
                    >
                      Save
                    </button>

                    <p className="md:text-base mb-4 mt-2 md:mb-6 ">
                      Patient’s Signature/Person Authorized to Consent
                      (Relationship)
                    </p>
                  </div>
                </div>
                <p className="md:text-base font-bold mb-4 md:mb-6">
                  For more information contact the Gwinnett Psychiatry, P.C. at
                  (678) 226-2295
                </p>
              </div>
              <div>
                {signData &&
                values.acknowledgePrivacyPolicyExists &&
                values.patientPrivacyLastName &&
                values.patientPrivacyFirstName ? (
                  <div className="col-span-12 flex gap-4 px-4 xl:px-0">
                    <div>
                      <button
                        onClick={() => setStep(step - 1)}
                        type="button"
                        className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      >
                        Previous
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => setStep(step + 1)}
                        type="button"
                        className="button-primary text-sm disabled:opacity-50 py-2 px-3"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="col-span-12 flex gap-4 px-4 xl:px-0">
                    <div>
                      <button
                        onClick={() => setStep(step - 1)}
                        type="button"
                        className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      >
                        Previous
                      </button>
                    </div>
                    <div>
                      <button
                        disabled
                        type="button"
                        className="button-primary text-sm disabled:opacity-50 py-2 px-3"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        );
        break;

      case 5:
        return (
          <>
            <section className="max-w-screen-lg px-6 py-12 bg-slate-100 mx-auto">
              <div className="px-4 xl:px-0">
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-center underline decoration-2 underline-offset-4 mb-4 md:mb-8">
                  STATEMENT OF RESPONSIBILITY
                </h3>
                <p className="md:text-base mb-4 md:mb-6">
                  The coverage your insurance program provides is calculated
                  based on their allowed amount, minus any deductibles,
                  co-payments and/or coinsurance amounts. These amounts are your
                  share of the cost.
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  <span className="font-bold">Pre-certification:</span> or
                  certification is obtained from your insurance company. If you
                  do not obtain certification when required, your benefits will
                  be reduced or denied. Your insurance certification of your
                  care does not guarantee coverage.
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  <span className="font-bold">Pre-Existing:</span> Your
                  insurance might have a pre-existing condition clause. Any
                  condition that existed on or before your effective date may be
                  considered pre-existing. These conditions may be excluded for
                  a period of time.
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  <span className="font-bold"> Responsibility:</span> The amount
                  your insurance will pay is determined by them and is the
                  amount they determine to be appropriate for the service
                  rendered. They have the sole discretion to determine the
                  allowed amount. Your insurance company has the sole discretion
                  to determine whether care is medically necessary. They will
                  not cover care they feel it is not medically necessary.
                  Therefore, it is your responsibility to cover any and all
                  charges not paid by your insurance company
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  <span className="font-bold">Prescription Refills:</span>{" "}
                  Please allow 48 hours for all prescription refills, providing
                  the patient account is paid in full. Prescription refills
                  requested on Friday will be called in on Monday before noon.
                  All controlled substance prescriptions will be issued only if
                  the patient is present.
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  <span className="font-bold">Unpaid Visits:</span> If your
                  insurance company has not paid for two prior visits, we will
                  reschedule your appointment after payment has been received.
                  You can continue to see the doctor if you agree to pay half of
                  the actual fee, not contracted fee up front which will be
                  reimbursed upon receiving payment from your insurance company.
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  <span className="font-bold"> Telephone Calls:</span>{" "}
                  Non-emergency telephone messages may be left with front office
                  or voicemail. We will return your call as soon as possible.
                  There is no charge for brief calls (less than 5 minutes).
                  Calls of longer duration will be billed at the usual
                  professional rate $300 per hour. Please understand that health
                  insurance companies do not pay for telephone calls, but are
                  provided to you as a convenience to you in your care.
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  <span className="font-bold">Litigation cases:</span> We do not
                  accept new patient(s) involved in litigation such as child
                  custody, divorce case & etc. As for established patient(s),
                  all litigation cases must be paid in full before the services
                  are rendered, since insurance companies do not reimburse for
                  litigation cases(s). For more details please see the “fee
                  schedule
                </p>
                <p className="md:text-base mb-4 md:mb-6 font-bold">
                  Medicare: We are not a Medicare provider therefore if you have
                  Medicare or a Medicare Supplement plan through a commercial
                  insurance, please notify us prior to being seen by the doctor
                  otherwise you would be liable for all of the charges,
                  including collection and attorney fees.
                </p>
                <div className="md:text-base mb-4 md:mb-6 ">
                  {" "}
                  <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                    <div className="col-span-12 gap-4 md:col-span-4 relative">
                      <label
                        htmlFor="patientResponsibleLastName"
                        className="mb-2 md:mb-0"
                      >
                        Last
                      </label>
                      <Field
                        type="text"
                        name="patientResponsibleLastName"
                        id="patientResponsibleLastName"
                      />
                      <ErrorMessage
                        name="patientResponsibleLastName"
                        component="p"
                        className="invalid"
                      />
                    </div>

                    <div className="col-span-12  gap-4 md:col-span-4 relative">
                      <label
                        htmlFor="patientResponsibleFirstName"
                        className="mb-2 md:mb-0"
                      >
                        First
                      </label>
                      <Field
                        type="text"
                        name="patientResponsibleFirstName"
                        id="patientResponsibleFirstName"
                      />
                      <ErrorMessage
                        name="patientResponsibleFirstName"
                        component="p"
                        className="invalid"
                      />
                    </div>

                    <div className="col-span-12 gap-4 md:col-span-4 relative">
                      <label
                        htmlFor="patientResponsibleMiddleName"
                        className="mb-2 md:mb-0"
                      >
                        Middle
                      </label>
                      <Field
                        type="text"
                        name="patientResponsibleMiddleName"
                        id="patientResponsibleMiddleName"
                      />
                      <ErrorMessage
                        name="patientResponsibleMiddleName"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  I, understand that I am responsible to pay my financial
                  obligation in full. If for some reason, I am unable to pay
                  this obligation in full when the balance is due, I will be
                  held accountable for any and all late fees, collection fees,
                  interest or finance charges, etc. that may accrue.
                </div>
                <div className="flex flex-col md:flex-row justify-between mb-4 md:mb-6">
                  <div>
                    {hand ? (
                      <>
                        <img src={hand} />
                        <button
                          className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                          type="button"
                          onClick={() => {
                            setHand();
                          }}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        {/* <ReactSignatureCanvas
                          ref={canvasRef}
                          canvasProps={{
                            width: 280,
                            height: 120,
                            className:
                              "signatureCanvas mb-4 w-full md:w-[280px] md:h-[120px]",
                          }}
                        /> */}
                        <SignatureCanvas
                          ref={(ref) => (canvasRef.current = ref)} // Initialize the canvasRef with the reference to the component
                          canvasProps={{
                            width: 280,
                            height: 120,
                            className:
                              "signatureCanvas mb-4 w-full md:w-[280px] md:h-[120px]",
                          }}
                        />
                        <button
                          className="button-primary  text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                          type="button"
                          onClick={() => {
                            canvasRef.current.clear();
                            setHand();
                          }}
                        >
                          Clear
                        </button>
                      </>
                    )}
                    {/* <button
                      className="ml-5 button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      type="button"
                      onClick={() => {
                        setHand(canvasRef.current.toDataURL());
                      }}
                    >
                      Save
                    </button> */}
                    <button
                      className={`ml-5 button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3 ${
                        canvasRef.current && !canvasRef.current.isEmpty()
                          ? ""
                          : "disabled"
                      }`}
                      type="button"
                      onClick={() => {
                        if (canvasRef.current && !canvasRef.current.isEmpty()) {
                          setHand(canvasRef.current.toDataURL());
                        }
                      }}
                    >
                      Save
                    </button>

                    <p className="md:text-base mb-4 mt-2 md:mb-6 ">
                      Patient’s Signature/Person Authorized to Consent
                      (Relationship)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                {hand &&
                values?.patientResponsibleLastName &&
                values?.patientResponsibleFirstName ? (
                  <div className="col-span-12 flex gap-4 px-4 xl:px-0">
                    <div>
                      <button
                        onClick={() => setStep(step - 1)}
                        type="button"
                        className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      >
                        Previous
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => setStep(step + 1)}
                        type="button"
                        className="button-primary text-sm disabled:opacity-50 py-2 px-3"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="col-span-12 flex gap-4 px-4 xl:px-0">
                    <div>
                      <button
                        onClick={() => setStep(step - 1)}
                        type="button"
                        className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      >
                        Previous
                      </button>
                    </div>
                    <div>
                      <button
                        disabled
                        type="button"
                        className="button-primary text-sm disabled:opacity-50 py-2 px-3"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        );
        break;

      case 6:
        return (
          <>
            <section className="max-w-screen-lg px-6 py-12 bg-slate-100 mx-auto">
              <div className="px-4 xl:px-0">
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-center underline decoration-2 underline-offset-4 mb-4 md:mb-8">
                  Gwinnett Psychiatry, PC Fee Schedule
                </h3>
                <p className="md:text-base mb-4 md:mb-6">
                  All litigation cases must be scheduled at least a month in
                  advance so the doctor can schedule patients accordingly. The
                  Commercial or Medicaid insurances{" "}
                  <span className="font-bold underline">DO NOT</span> pay for
                  any Litigation or Legal Consultation services provided by the
                  doctor. A typical case incurs the following out of pocket
                  charges:
                </p>
                <div className="flex flex-col md:flex-row gap-1 md:justify-between mb-4">
                  <div className="flex gap-4 ">
                    <div className="w-2 h-2 bg-black mt-2 rounded-full shrink-0"></div>
                    <p className="md:text-base ">
                      Consultation with patient & parent(s) in office or on the
                      phone
                    </p>
                  </div>
                  <p className="md:text-base font-medium pl-5 md:pl-0">
                    $500/HR (1 hour min)
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-1 md:justify-between mb-4">
                  <div className="flex gap-4 ">
                    <div className="w-2 h-2 bg-black mt-2 rounded-full shrink-0"></div>
                    <p className="md:text-base ">
                      Consultation with attorney on the phone or in the office.
                    </p>
                  </div>
                  <p className="md:text-base font-medium pl-5 md:pl-0">
                    $500/HR (1hour min)
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-1 md:justify-between mb-4">
                  <div className="flex gap-4 ">
                    <div className="w-2 h-2 bg-black mt-2 rounded-full shrink-0"></div>
                    <p className="md:text-base ">
                      Any Disability Form/letter/Report written to any
                      agency/institution
                    </p>
                  </div>
                  <p className="md:text-base font-medium pl-5 md:pl-0">
                    $500 each
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-1 md:justify-between mb-4">
                  <div className="flex gap-4 ">
                    <div className="w-2 h-2 bg-black mt-2 rounded-full shrink-0"></div>
                    <p className="md:text-base ">
                      Deposition in the office, plus min one hour case
                      preparation $500
                    </p>
                  </div>
                  <p className="md:text-base font-medium pl-5 md:pl-0">
                    $500 per hour (min two hours)
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-1 md:justify-between mb-4">
                  <div className="flex gap-4 ">
                    <div className="w-2 h-2 bg-black mt-2 rounded-full shrink-0"></div>
                    <p className="md:text-base ">
                      Deposition other than Doctor Rubina&apos;s office, within
                      50 miles
                    </p>
                  </div>
                  <p className="md:text-base font-medium pl-5 md:pl-0">
                    $600 per hour (min two hours)
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-1 md:justify-between mb-4">
                  <div className="flex gap-4 ">
                    <div className="w-2 h-2 bg-black mt-2 rounded-full shrink-0"></div>
                    <p className="md:text-base ">
                      Court appearance, plus min one hour case preparation $500
                    </p>
                  </div>
                  <p className="md:text-base font-medium pl-5 md:pl-0">
                    $600 per hour (min two hour)
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-1 md:justify-between mb-4">
                  <div className="flex gap-4 ">
                    <div className="w-2 h-2 bg-black mt-2 rounded-full shrink-0"></div>
                    <p className="md:text-base ">
                      Commute between office & court & back to office
                    </p>
                  </div>
                  <p className="md:text-base font-medium pl-5 md:pl-0">
                    $ 600 per hour (min one hour)
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-1 md:justify-between mb-4 md:mb-8">
                  <div className="flex gap-4 ">
                    <div className="w-2 h-2 bg-black mt-2 rounded-full shrink-0"></div>
                    <p className="md:text-base ">Out of state Case(s)</p>
                  </div>
                  <p className="md:text-base font-medium pl-5 md:pl-0">
                    $800 hour, plus Travel expenses
                  </p>
                </div>
                <p className="md:text-base mb-4 md:mb-6 text-center font-bold">
                  ALL ADDITIONAL TIME IS CHARGED IN 15 MINUTES INCREMENTS
                </p>
                <div className="flex flex-col md:flex-row gap-1 md:justify-between mb-4">
                  <div className="flex gap-4 ">
                    <div className="w-2 h-2 bg-transparent mt-2 rounded-full shrink-0"></div>
                    <p className="md:text-base ">
                      <strong>No Animal Support Letter</strong>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-1 md:justify-between mb-4">
                  <div className="flex gap-4 ">
                    <div className="w-2 h-2 bg-black mt-2 rounded-full shrink-0"></div>
                    <p className="md:text-base ">Diagnosis letter</p>
                  </div>
                  <p className="md:text-base font-medium pl-5 md:pl-0">
                    free of charge
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-1 md:justify-between mb-4">
                  <div className="flex gap-4 ">
                    <div className="w-2 h-2 bg-black mt-2 rounded-full shrink-0"></div>
                    <p className="md:text-base ">Accommodation Letter</p>
                  </div>
                  <p className="md:text-base font-medium pl-5 md:pl-0">$50</p>
                </div>
                <div className="flex flex-col md:flex-row gap-1 md:justify-between mb-4">
                  <div className="flex gap-4 ">
                    <div className="w-2 h-2 bg-black mt-2 rounded-full shrink-0"></div>
                    <p className="md:text-base ">School Medical Forms</p>
                  </div>
                  <p className="md:text-base font-medium pl-5 md:pl-0">$30</p>
                </div>
                <div className="flex flex-col md:flex-row gap-1 md:justify-between mb-4">
                  <div className="flex gap-4 ">
                    <div className="w-2 h-2 bg-black mt-2 rounded-full shrink-0"></div>
                    <p className="md:text-base ">Homebound Forms</p>
                  </div>
                  <p className="md:text-base font-medium pl-5 md:pl-0">$50</p>
                </div>
                <div className="flex flex-col md:flex-row gap-1 md:justify-between mb-4">
                  <div className="flex gap-4 ">
                    <div className="w-2 h-2 bg-black mt-2 rounded-full shrink-0"></div>
                    <p className="md:text-base ">Medical Records</p>
                  </div>
                  <p className="md:text-base font-medium pl-5 md:pl-0">$20</p>
                </div>
                <div className="flex flex-col md:flex-row gap-1 md:justify-between mb-4">
                  <div className="flex gap-4 ">
                    <div className="w-2 h-2 bg-black mt-2 rounded-full shrink-0"></div>
                    <p className="md:text-base ">Returned check fee</p>
                  </div>
                  <p className="md:text-base font-medium pl-5 md:pl-0">
                    $50 (thereafter, cash/credit)
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-1 md:justify-between mb-4 md:mb-8">
                  <div className="flex gap-4 ">
                    <div className="w-2 h-2 bg-black mt-2 rounded-full shrink-0"></div>
                    <p className="md:text-base ">
                      Any non-legal letter ( School forms, Katie Beckett & etc)
                    </p>
                  </div>
                  <p className="md:text-base font-medium pl-5 md:pl-0">
                    $50 per letter
                  </p>
                </div>
                <p className="md:text-base mb-4 md:mb-6">
                  For all depositions and court appearances must be scheduled at
                  least two weeks in advance, please schedule the doctor for
                  maximum estimated time or schedule the doctor for the entire
                  day (eight hours). Please bear in mind that the doctor will
                  have patients scheduled for the rest of the day. Therefore,
                  the doctor will leave right after your estimated scheduled
                  time.
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  The estimated fees should be paid in full seven days before
                  the services are rendered, unless the patient’s attorney is
                  guaranteed to pay on behalf of the patient. If the patient
                  requires more time than estimated time, the balance should be
                  paid right after the services are rendered.
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  In case of any court/deposition cancellation, please notify
                  the office seven days in advance, otherwise you would be
                  charged $500 per hour times the estimated time the doctor has
                  allocated for you. The over-paid balance will be refunded to
                  the patient within ten business days. The above services are
                  only provided to the established patients, whose accounts are
                  paid in full at the time the services are requested.
                </p>
                <p className="md:text-base mb-4 md:mb-6 underline underline-offset-2">
                  <span className="font-bold"> Subpoena:</span> If a
                  patient/patients attorney issues a subpoena to the doctor
                  without paying the consultation fee in advanced then the
                  patient will be dismissed immediately from the practice.
                </p>

                <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                  <div className="col-span-12 gap-4 md:col-span-4 relative">
                    <label
                      htmlFor="patientFeeLastName"
                      className="mb-2 md:mb-0"
                    >
                      Last
                    </label>
                    <Field
                      type="text"
                      name="patientFeeLastName"
                      id="patientFeeLastName"
                    />
                    <ErrorMessage
                      name="patientFeeLastName"
                      component="p"
                      className="invalid"
                    />
                  </div>

                  <div className="col-span-12  gap-4 md:col-span-4 relative">
                    <label
                      htmlFor="patientFeeFirstName"
                      className="mb-2 md:mb-0"
                    >
                      First
                    </label>
                    <Field
                      type="text"
                      name="patientFeeFirstName"
                      id="patientFeeFirstName"
                    />
                    <ErrorMessage
                      name="patientFeeFirstName"
                      component="p"
                      className="invalid"
                    />
                  </div>

                  <div className="col-span-12 gap-4 md:col-span-4 relative">
                    <label
                      htmlFor="patientFeeMiddleName"
                      className="mb-2 md:mb-0"
                    >
                      Middle
                    </label>
                    <Field
                      type="text"
                      name="patientFeeMiddleName"
                      id="patientFeeMiddleName"
                    />
                    <ErrorMessage
                      name="patientFeeMiddleName"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <p className="md:text-base font-bold  mb-4 md:mb-6">
                  I HAVE READ THE ABOVE POLICY AND UNDERSTAND IT FULLY.
                </p>
                <div className="flex flex-col md:flex-row justify-between mb-4 md:mb-6">
                  <div>
                    {handData ? (
                      <>
                        <img src={handData} />
                        <button
                          className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                          type="button"
                          onClick={() => {
                            setHandData();
                          }}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        {/* <ReactSignatureCanvas
                          ref={canvasRef}
                          canvasProps={{
                            width: 280,
                            height: 120,
                            className:
                              "signatureCanvas mb-4 w-full md:w-[280px] md:h-[120px]",
                          }}
                        /> */}
                        <SignatureCanvas
                          ref={(ref) => (canvasRef.current = ref)} // Initialize the canvasRef with the reference to the component
                          canvasProps={{
                            width: 280,
                            height: 120,
                            className:
                              "signatureCanvas mb-4 w-full md:w-[280px] md:h-[120px]",
                          }}
                        />
                        <button
                          className="button-primary  text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                          type="button"
                          onClick={() => {
                            canvasRef.current.clear();
                            setHandData();
                          }}
                        >
                          Clear
                        </button>
                      </>
                    )}
                    {/* <button
                      className="ml-5 button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      type="button"
                      onClick={() => {
                        setHandData(canvasRef.current.toDataURL());
                      }}
                    >
                      Save
                    </button> */}
                    <button
                      className={`ml-5 button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3 ${
                        canvasRef.current && !canvasRef.current.isEmpty()
                          ? ""
                          : "disabled"
                      }`}
                      type="button"
                      onClick={() => {
                        if (canvasRef.current && !canvasRef.current.isEmpty()) {
                          setHandData(canvasRef.current.toDataURL());
                        }
                      }}
                    >
                      Save
                    </button>

                    <p className="md:text-base mt-2 mb-4 md:mb-6 ">
                      Signature of patient or Parent/Guardian
                    </p>
                  </div>
                </div>
                <p className="md:text-base xl:text-xl text-center underline underline-offset-4 mb-4 md:mb-6 font-bold">
                  Please be advised, all fees are subject to change without
                  notice.
                </p>
              </div>
              <div>
                {handData &&
                values?.patientFeeLastName &&
                values?.patientFeeFirstName ? (
                  <div className="col-span-12 flex gap-4 px-4 xl:px-0">
                    <div>
                      <button
                        onClick={() => setStep(step - 1)}
                        type="button"
                        className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      >
                        Previous
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => setStep(step + 1)}
                        type="button"
                        className="button-primary text-sm disabled:opacity-50 py-2 px-3"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="col-span-12 flex gap-4 px-4 xl:px-0">
                    <div>
                      <button
                        onClick={() => setStep(step - 1)}
                        type="button"
                        className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      >
                        Previous
                      </button>
                    </div>
                    <div>
                      <button
                        disabled
                        type="button"
                        className="button-primary text-sm disabled:opacity-50 py-2 px-3"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        );
        break;

      case 7:
        return (
          <>
            <section className="max-w-screen-lg px-6 py-12 bg-slate-100 mx-auto">
              <div className="px-4 xl:px-0">
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-center underline decoration-2 underline-offset-4 mb-4 md:mb-8">
                  Cancellation Policy
                </h3>
                <p className="md:text-base mb-4 md:mb-6">
                  In today&apos;s hectic world unplanned issues come up for all
                  of us. We recognize this fact, but we respectfully request
                  that you cancel your scheduled appointment by phone a{" "}
                  <span className="font-bold">minimum of 24 hours</span> in
                  advance. That way the open slot can be filled with someone
                  needing an appointment.
                </p>
                <p className="md:text-base font-bold underline underline-offset-4">
                  Patients with Commercial Insurance(s):
                </p>
                <p className="md:text-base mb-4 md:mb-6">
                  If you do not cancel by the deadline,{" "}
                  <span className="font-bold">
                    you will be assessed a $50.00 missed appointment fee
                  </span>
                  . This fee is{" "}
                  <span className="font-bold underline underline-offset-4 ">
                    not
                  </span>{" "}
                  covered by any insurance company and will be your
                  responsibility to pay before your next visit. Most of the time
                  we remind our patients a day before their appointments but we
                  are not obligated. Therefore, this is patient’s responsibility
                  to keep track of his/her appointment.
                </p>
                <p className="md:text-base font-bold underline underline-offset-4 mb-4 md:mb-6">
                  Patients with Medicaid Insurance(s):
                </p>
                <p className="md:text-base font-bold  mb-4 md:mb-6">
                  As of July 01, 2021 we must notify you that we are unable to
                  reschedule an appointment if you have two no show appointments
                  without proper 24 hour notice you will be discharged from the
                  practice.{" "}
                </p>
                <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                  <div className="col-span-12 gap-4 md:col-span-4 relative">
                    <label
                      htmlFor="patientCancellationLastName"
                      className="mb-2 md:mb-0"
                    >
                      Last
                    </label>
                    <Field
                      type="text"
                      name="patientCancellationLastName"
                      id="patientCancellationLastName"
                    />
                    <ErrorMessage
                      name="patientCancellationLastName"
                      component="p"
                      className="invalid"
                    />
                  </div>

                  <div className="col-span-12  gap-4 md:col-span-4 relative">
                    <label
                      htmlFor="patientCancellationFirstName"
                      className="mb-2 md:mb-0"
                    >
                      First
                    </label>
                    <Field
                      type="text"
                      name="patientCancellationFirstName"
                      id="patientCancellationFirstName"
                    />
                    <ErrorMessage
                      name="patientCancellationFirstName"
                      component="p"
                      className="invalid"
                    />
                  </div>

                  <div className="col-span-12 gap-4 md:col-span-4 relative">
                    <label
                      htmlFor="patientCancellationMiddleName"
                      className="mb-2 md:mb-0"
                    >
                      Middle
                    </label>
                    <Field
                      type="text"
                      name="patientCancellationMiddleName"
                      id="patientCancellationMiddleName"
                    />
                    <ErrorMessage
                      name="patientCancellationMiddleName"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <p className="md:text-base font-bold  mb-4 md:mb-6">
                  I HAVE READ THE ABOVE POLICY AND UNDERSTAND IT FULLY.
                </p>
                <div className="flex flex-col md:flex-row justify-between mb-4 md:mb-6">
                  <div>
                    {mark ? (
                      <>
                        <img src={mark} />
                        <button
                          className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                          type="button"
                          onClick={() => {
                            setMark();
                          }}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        {/* <ReactSignatureCanvas
                          ref={canvasRef}
                          canvasProps={{
                            width: 280,
                            height: 120,
                            className:
                              "signatureCanvas mb-4 w-full md:w-[280px] md:h-[120px]",
                          }}
                        /> */}
                        <SignatureCanvas
                          ref={(ref) => (canvasRef.current = ref)} // Initialize the canvasRef with the reference to the component
                          canvasProps={{
                            width: 280,
                            height: 120,
                            className:
                              "signatureCanvas mb-4 w-full md:w-[280px] md:h-[120px]",
                          }}
                        />
                        <button
                          className="button-primary  text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                          type="button"
                          onClick={() => {
                            canvasRef.current.clear();
                            setMark();
                          }}
                        >
                          Clear
                        </button>
                      </>
                    )}

                    {/* <button
                      className=" ml-5 button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      type="button"
                      onClick={() => {
                        setMark(canvasRef.current.toDataURL());
                      }}
                    >
                      Save
                    </button> */}
                    <button
                      className={`ml-5 button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3 ${
                        canvasRef.current && !canvasRef.current.isEmpty()
                          ? ""
                          : "disabled"
                      }`}
                      type="button"
                      onClick={() => {
                        if (canvasRef.current && !canvasRef.current.isEmpty()) {
                          setMark(canvasRef.current.toDataURL());
                        }
                      }}
                    >
                      Save
                    </button>

                    <p className="md:text-base mt-2 mb-4 md:mb-6 ">
                      Signature of patient or Parent/Guardian
                    </p>
                  </div>
                </div>
              </div>
              <div>
                {mark &&
                values?.patientCancellationLastName &&
                values?.patientCancellationFirstName ? (
                  <div className="col-span-12 flex gap-4 px-4 xl:px-0">
                    <div>
                      <button
                        onClick={() => setStep(step - 1)}
                        type="button"
                        className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      >
                        Previous
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => setStep(step + 1)}
                        type="button"
                        className="button-primary text-sm disabled:opacity-50 py-2 px-3"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="col-span-12 flex gap-4 px-4 xl:px-0">
                    <div>
                      <button
                        onClick={() => setStep(step - 1)}
                        type="button"
                        className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      >
                        Previous
                      </button>
                    </div>
                    <div>
                      <button
                        disabled
                        type="button"
                        className="button-primary text-sm disabled:opacity-50 py-2 px-3"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        );
        break;

      case 8:
        return (
          <>
            <section className="max-w-screen-lg mx-auto px-6 py-12 bg-slate-100">
              <div className="px-4 xl:px-0">
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-center underline decoration-2 underline-offset-4 mb-4 md:mb-8">
                  Patient Demographic for E-Prescribe
                </h3>
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-center underline decoration-2 underline-offset-4 mb-4 md:mb-8">
                  Personal Information
                </h3>
                <div className="grid grid-cols-12 gap-4 mb-4 md:mb-8">
                  <div className="md:col-span-6 col-span-12 relative mb-4 md:mb-6">
                    <div className=" md:grid-cols-6 grid-cols-12 gap-4">
                      <div className="md:col-span-12 col-span-12">
                        <label htmlFor="patientpersonalInformationName">
                          Name *
                        </label>
                      </div>
                      <div className="md:col-span-12 col-span-12">
                        <Field
                          type="text"
                          name="patientpersonalInformationName"
                          id="patientpersonalInformationName"
                        />
                        <ErrorMessage
                          name="patientpersonalInformationName"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                    <div className=" grid-cols-12 md:grid-cols-6 gap-4">
                      <div className="cols-span-12 md:col-span-12">
                        <label htmlFor="patientChildEmergencyRelationshipPhone">
                          Phone No.
                        </label>
                      </div>
                      <div className="col-span-12 md:col-span-12">
                        <Field
                          type="tel"
                          name="patientChildEmergencyRelationshipPhone"
                          id="patientChildEmergencyRelationshipPhone"
                          value={patientPersonalPhone}
                          onChange={handlePersonalPhoneChange}
                          maxLength="14" // Including formatting characters
                        />
                        <ErrorMessage
                          name="patientChildEmergencyRelationshipPhone"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 mb-4 md:mb-8">
                  <div className="md:col-span-6 col-span-12 relative mb-4 md:mb-6">
                    <div className=" md:grid-cols-6 grid-cols-12 gap-4">
                      <div className="md:col-span-12 col-span-12">
                        <label htmlFor="patientpersonalInformationEmail">
                          Email *
                        </label>
                      </div>
                      <div className="md:col-span-12 col-span-12">
                        <Field
                          type="email"
                          name="patientpersonalInformationEmail"
                          id="patientpersonalInformationEmail"
                        />
                        <ErrorMessage
                          name="patientpersonalInformationEmail"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                    <div className=" grid-cols-12 md:grid-cols-6 gap-4">
                      <div className="col-span-12 md:col-span-12">
                        <label htmlFor="patientChildDOB">Date of Birth *</label>
                      </div>
                      <div className="col-span-12 md:col-span-12">
                        <Field
                          type="date"
                          name="patientChildDOB"
                          id="patientChildDOB"
                          value={dateOfBirth}
                          onChange={handleDateChange}
                          max={`${new Date().getFullYear()}-12-31`} // Set max attribute to current year
                        />
                        {yearEditedManually && (
                          <p className="invalid">
                            Please enter a valid date with a 4-digit year.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid-cols-12 md:grid-cols-6 gap-4">
                    <div className="cols-span-12 md:col-span-12">
                      <label htmlFor="patientpersonalInformationAddress">
                        Address
                      </label>
                    </div>
                    <div className="col-span-12 md:col-span-12">
                      <Field
                        type="text"
                        as="textarea"
                        rows="2"
                        name="patientpersonalInformationAddress"
                        id="patientpersonalInformationAddress"
                      />
                      <ErrorMessage
                        name="patientpersonalInformationAddress"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-center underline decoration-2 underline-offset-4 mb-4 md:mb-8">
                  Pharmacy Information
                </h3>
                <div className="grid grid-cols-12 gap-4 mb-4 md:mb-8">
                  <div className="md:col-span-6 col-span-12 relative mb-4 md:mb-6">
                    <div className=" md:grid-cols-6 grid-cols-12 gap-4">
                      <div className="md:col-span-12 col-span-12">
                        <label htmlFor="patientpharmacyName">Name *</label>
                      </div>
                      <div className="md:col-span-12 col-span-12">
                        <Field
                          type="text"
                          name="patientpharmacyName"
                          id="patientpharmacyName"
                        />
                        <ErrorMessage
                          name="patientpharmacyName"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                    <div className=" grid-cols-12 md:grid-cols-6 gap-4">
                      <div className="cols-span-12 md:col-span-12">
                        <label htmlFor="patientpharmacyPhone">
                          Phone No. *
                        </label>
                      </div>
                      <div className="col-span-12 md:col-span-12">
                        <Field
                          type="tel"
                          name="patientpharmacyPhone"
                          id="patientpharmacyPhone"
                          value={patientPharmacyPhone}
                          onChange={handlePharmacyPhoneChange}
                          maxLength="14" // Including formatting characters
                        />
                        <ErrorMessage
                          name="patientpharmacyPhone"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className=" grid-cols-12 md:grid-cols-6 gap-4">
                    <div className="cols-span-12 md:col-span-12">
                      <label htmlFor="patientpharmacyAddress">Address *</label>
                    </div>
                    <div className="col-span-12 md:col-span-12">
                      <Field
                        type="text"
                        as="textarea"
                        rows="2"
                        name="patientpharmacyAddress"
                        id="patientpharmacyAddress"
                      />
                      <ErrorMessage
                        name="patientpharmacyAddress"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid-cols-12 md:grid-cols-6 gap-4">
                    <div className="col-span-12 md:col-span-12">
                      <label htmlFor="patientListAllergies">
                        Please List Allergies and Side Effects
                      </label>
                    </div>
                    <div className="col-span-12 md:col-span-12">
                      <Field
                        type="text"
                        as="textarea"
                        rows="4"
                        name="patientListAllergies"
                        id="patientListAllergies"
                      />
                      <ErrorMessage
                        name="patientListAllergies"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {values.patientpersonalInformationName &&
                values.patientpersonalInformationEmail &&
                dateOfBirth &&
                values.patientpharmacyName &&
                patientPharmacyPhone &&
                values.patientpharmacyAddress ? (
                  <div className="col-span-12 flex gap-4 px-4 xl:px-0">
                    <div>
                      <button
                        onClick={() => setStep(step - 1)}
                        type="button"
                        className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      >
                        Previous
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => setStep(step + 1)}
                        type="button"
                        className="button-primary text-sm disabled:opacity-50 py-2 px-3"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="col-span-12 flex gap-4 px-4 xl:px-0">
                    <div>
                      <button
                        onClick={() => setStep(step - 1)}
                        type="button"
                        className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      >
                        Previous
                      </button>
                    </div>
                    <div>
                      <button
                        disabled
                        type="button"
                        className="button-primary text-sm disabled:opacity-50 py-2 px-3"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        );
        break;

      case 9:
        return (
          <>
            <section className="max-w-screen-lg px-6 py-12 bg-slate-100 mx-auto">
              <div className="px-4 xl:px-0">
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-center underline decoration-2 underline-offset-4 mb-4 md:mb-8">
                  CONSENT FOR TELEPSYCHIATRY
                </h3>
                <h4 className="font-bold text-base md:text-lg">Introduction</h4>
                <p className="md:text-base mb-4 md:mb-6">
                  Tele-psychiatry is the delivery of psychiatric services using
                  interactive audio and visual electronic systems between a
                  provider and a patient that are not in the same physical
                  location. The interactive electronic system used in
                  Telepsychiatry incorporate network and software security
                  protocols to protect the confidentiality of patient
                  information and audio and visual data. These protocols include
                  measures to safeguard the data and to aid in protecting
                  against intentional or unintentional corruption.
                </p>
                <h4 className="font-bold text-base md:text-lg">
                  Potential Benefits
                </h4>
                <div className="pl-5 md:pl-10 ">
                  <div className="flex md:gap-4 mb-2">
                    <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                    <p className="md:text-base ">
                      Increased accessibility to psychiatric care.
                    </p>
                  </div>
                  <div className="flex md:gap-4 mb-2">
                    <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                    <p className="md:text-base ">Patient convenience.</p>
                  </div>
                </div>
                <h4 className="font-bold text-base md:text-lg">
                  Potential Risks
                </h4>
                <p className="md:text-base mb-4 ">
                  As with any medical procedure, there may be potential risks
                  associated with the use of Tele-psychiatry. These risks
                  include, but may not be limited to:
                </p>
              </div>
              <div className="pl-5 md:pl-10 mb-4 md:mb-6">
                <div className="flex md:gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                  <p className="md:text-base ">
                    Information transmitted may not be sufficient (e.g., poor
                    resolution of video) to allow for appropriate
                    decision-making by your provider.
                  </p>
                </div>
                <div className="flex md:gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                  <p className="md:text-base ">
                    Your provider may not be able to provide medical treatment
                    using interactive electronic equipment nor provide for or
                    arrange for emergency care that you may require
                  </p>
                </div>
                <div className="flex md:gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                  <p className="md:text-base ">
                    Delays in medical evaluation and treatment may occur due to
                    deficiencies or failures of the equipment.
                  </p>
                </div>
                <div className="flex md:gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                  <p className="md:text-base ">
                    Security protocols can fail, causing a breach of privacy of
                    confidential health information.
                  </p>
                </div>
                <div className="flex md:gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                  <p className="md:text-base ">
                    A lack of access to all the information that might be
                    available in a face to face visit, but not in a
                    Tele-Psychiatry session, may result in errors injudgment.
                  </p>
                </div>
              </div>
              <h4 className="font-bold text-base md:text-lg px-4">
                Alternatives to the Use of Tele-psychiatry
              </h4>
              <div className="pl-5 md:pl-10 mb-4 md:mb-6">
                <div className="flex md:gap-4">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                  <p className="md:text-base ">
                    Traditional face-to-face sessions in your provider&apos;s
                    office.
                  </p>
                </div>
              </div>
              <h4 className="font-bold text-base md:text-lg px-4">
                Patient&apos;s Rights
              </h4>
              <div className="pl-5 md:pl-10 mb-4 md:mb-6">
                <div className="flex md:gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                  <p className="md:text-base ">
                    I understand that the laws that protect the privacy and
                    confidentiality of medical information also apply to
                    Tele-psychiatry.
                  </p>
                </div>
                <div className="flex md:gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                  <p className="md:text-base ">
                    I have the right to withhold or withdraw my consent to the
                    use of Tele-psychiatry during the course of my care at any
                    time. I understand that my withdrawal of consent will not
                    affectany future care or treatment.
                  </p>
                </div>
                <div className="flex md:gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                  <p className="md:text-base ">
                    I have the right to inspect all medical information that
                    includes the Tele-psychiatry visit. I may obtain copies of
                    this medical record information for a reasonable fee
                  </p>
                </div>
                <div className="flex md:gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                  <p className="md:text-base ">
                    I understand that my provider has the right to withhold or
                    withdraw consent for the use of Telepsychiatry during the
                    course of my care at any time
                  </p>
                </div>
                <div className="flex md:gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                  <p className="md:text-base ">
                    I understand that the laws that protect the privacy and
                    confidentiality of medical information also apply to
                    Tele-psychiatry
                  </p>
                </div>
                <div className="flex md:gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                  <p className="md:text-base ">
                    I understand that all the rules and regulations that apply
                    to the provision of healthcare services in the State of
                    Georgia also apply to Tele-psychiatry
                  </p>
                </div>
                <h4 className="font-bold text-base md:text-lg">
                  Patient&apos;s Responsibilities
                </h4>
                <div className="flex md:gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                  <p className="md:text-base ">
                    I will not record any Tele-psychiatry sessions without
                    written consent from my provider. I understand that my
                    provider will not record any of our Tele-psychiatry session
                    without my written consent.
                  </p>
                </div>
                <div className="flex md:gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                  <p className="md:text-base ">
                    I will inform my provider if any other person can hear or
                    see any part of our session before the session begins. The
                    provider will inform me if any other person can hear or see
                    any part of our session before the session begins.
                  </p>
                </div>
                <div className="flex md:gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                  <p className="md:text-base ">
                    I understand that I, not my provider, am responsible for the
                    configuration of an electronic equipment used on my computer
                    which is used for Tele-psychiatry. I understand that it is
                    my responsibility to ensure the proper functioning of all
                    electronic equipment before my session begins. I understand
                    that I must be a resident of the State of Georgia to be
                    eligible for Telepsychiatry services from my provider.
                  </p>
                </div>
                <div className="flex md:gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0"></div>
                  <p className="md:text-base ">
                    I understand that my initial evaluation will not be done
                    Tele-psychiatry except in special circumstances under which
                    I will be required to verify my identity.
                  </p>
                </div>
                <h4 className="font-bold text-base md:text-lg">
                  Patient Consent To The Use of Tele-psychiatry
                </h4>
                <p className="md:text-base mb-4 md:mb-8">
                  I have read and understood the information provided above
                  regarding Tele-psychiatry. I have discussed it with my
                  provider and all of my questions have been answered to my
                  satisfaction. I hereby give my informed consent for the use of
                  Tele-psychiatry in my health care and authorize my provider to
                  use Tele-psychiatry in the course of my diagnosis and
                  treatment.
                </p>
              </div>
              <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                <div className="col-span-12 md:col-span-12 relative">
                  <label htmlFor="patientName">Patient Name</label>
                </div>

                <div className="col-span-12 gap-4 md:col-span-4 relative">
                  <label
                    htmlFor="patientTelepsychiatryLastName"
                    className="mb-2 md:mb-0"
                  >
                    Last
                  </label>
                  <Field
                    type="text"
                    name="patientTelepsychiatryLastName"
                    id="patientTelepsychiatryLastName"
                  />
                  <ErrorMessage
                    name="patientTelepsychiatryLastName"
                    component="p"
                    className="invalid"
                  />
                </div>

                <div className="col-span-12  gap-4 md:col-span-4 relative">
                  <label
                    htmlFor="patientTelepsychiatryFirstName"
                    className="mb-2 md:mb-0"
                  >
                    First
                  </label>
                  <Field
                    type="text"
                    name="patientTelepsychiatryFirstName"
                    id="patientTelepsychiatryFirstName"
                  />
                  <ErrorMessage
                    name="patientTelepsychiatryFirstName"
                    component="p"
                    className="invalid"
                  />
                </div>

                <div className="col-span-12 gap-4 md:col-span-4 relative">
                  <label
                    htmlFor="patientTelepsychiatryMiddleName"
                    className="mb-2 md:mb-0"
                  >
                    Middle
                  </label>
                  <Field
                    type="text"
                    name="patientTelepsychiatryMiddleName"
                    id="patientTelepsychiatryMiddleName"
                  />
                  <ErrorMessage
                    name="patientTelepsychiatryMiddleName"
                    component="p"
                    className="invalid"
                  />
                </div>
              </div>
              <p className="md:text-base mb-4 md:mb-8 font-bold text-center">
                Note: Parent/Guardian signature required if patient is under 18
              </p>
              <div className="flex flex-col md:flex-row justify-between mb-4 md:mb-6">
                <div>
                  {markData ? (
                    <>
                      <img src={markData} />
                      <button
                        className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                        type="button"
                        onClick={() => {
                          setMarkData();
                        }}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      {/* <ReactSignatureCanvas
                        ref={canvasRef}
                        canvasProps={{
                          width: 280,
                          height: 120,
                          className:
                            "signatureCanvas mb-4 w-full md:w-[280px] md:h-[120px]",
                        }}
                      /> */}
                      <SignatureCanvas
                        ref={(ref) => (canvasRef.current = ref)} // Initialize the canvasRef with the reference to the component
                        canvasProps={{
                          width: 280,
                          height: 120,
                          className:
                            "signatureCanvas mb-4 w-full md:w-[280px] md:h-[120px]",
                        }}
                      />
                      <button
                        className="button-primary  text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                        type="button"
                        onClick={() => {
                          canvasRef.current.clear();
                          setMarkData();
                        }}
                      >
                        Clear
                      </button>
                    </>
                  )}

                  {/* <button
                    className="ml-5 button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                    type="button"
                    onClick={() => {
                      setMarkData(canvasRef.current.toDataURL());
                    }}
                  >
                    Save
                  </button> */}
                  <button
                    className={`ml-5 button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3 ${
                      canvasRef.current && !canvasRef.current.isEmpty()
                        ? ""
                        : "disabled"
                    }`}
                    type="button"
                    onClick={() => {
                      if (canvasRef.current && !canvasRef.current.isEmpty()) {
                        setMarkData(canvasRef.current.toDataURL());
                      }
                    }}
                  >
                    Save
                  </button>

                  <p className="md:text-base mb-4 mt-2 md:mb-6 ">
                    Patient’s Signature/Person Authorized to Consent
                    (Relationship)
                  </p>
                </div>

                <div>
                  <div className="col-span-12 gap-4 md:col-span-4 relative mb-2">
                    <label htmlFor="patientChildDOB" className="mb-2 md:mb-0">
                      Patient DOB
                    </label>
                    <Field
                      type="date"
                      name="patientChildDOB"
                      id="patientChildDOB"
                      value={dateOfBirth}
                      onChange={handleDateChange}
                      max={`${new Date().getFullYear()}-12-31`} // Set max attribute to current year
                    />
                    {yearEditedManually && (
                      <p className="invalid">
                        Please enter a valid date with a 4-digit year.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                {markData &&
                values.patientTelepsychiatryLastName &&
                values.patientTelepsychiatryFirstName ? (
                  <div className="col-span-12 flex gap-4 px-4 xl:px-0">
                    <div>
                      <button
                        onClick={() => setStep(step - 1)}
                        type="button"
                        className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      >
                        Previous
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => setStep(step + 1)}
                        type="button"
                        className="button-primary text-sm disabled:opacity-50 py-2 px-3"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="col-span-12 flex gap-4 px-4 xl:px-0">
                    <div>
                      <button
                        onClick={() => setStep(step - 1)}
                        type="button"
                        className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                      >
                        Previous
                      </button>
                    </div>
                    <div>
                      <button
                        disabled
                        type="button"
                        className="button-primary text-sm disabled:opacity-50 py-2 px-3"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        );
        break;

      case 10:
        return (
          <>
            <section className="max-w-screen-lg mx-auto px-6 py-12 bg-slate-100">
              <div className="px-4 xl:px-0">
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-center underline decoration-2 underline-offset-4 mb-4 md:mb-8">
                  CHILD HISTORY FORM
                </h3>
                <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                  <div className="md:col-span-2 col-span-12">
                    <label htmlFor="childHistoryName" className="md:text-base">
                      Child&apos;s Name:
                    </label>
                  </div>
                  <div className="md:col-span-4 col-span-12">
                    <Field
                      type="text"
                      name="childHistoryName"
                      id="childHistoryName"
                    />
                    <ErrorMessage
                      name="childHistoryName"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                  <div className="md:col-span-6 col-span-12 relative mb-4 md:mb-6">
                    <div className=" grid-cols-12 gap-4">
                      <div className="col-span-12">
                        <label htmlFor="patientChildDOB">Date of Birth:</label>
                      </div>
                      <div className="col-span-12">
                        <Field
                          type="date"
                          name="patientChildDOB"
                          id="patientChildDOB"
                          value={dateOfBirth}
                          onChange={handleDateChange}
                          max={`${new Date().getFullYear()}-12-31`} // Set max attribute to current year
                        />
                        {yearEditedManually && (
                          <p className="invalid">
                            Please enter a valid date with a 4-digit year.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-6 col-span-12 relative mb-4 md:mb-8">
                    <div className="grid-cols-12 gap-4">
                      <div className="col-span-12">
                        <label htmlFor="patientHistoryToday">
                          Today&apos;s Date:
                        </label>
                      </div>
                      <div className="col-span-12">
                        <Field
                          type="date"
                          name="patientHistoryToday"
                          id="patientHistoryToday"
                          disabled
                        />
                        <ErrorMessage
                          name="patientHistoryToday"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                  <div className="md:col-span-2 col-span-12">
                    <label
                      htmlFor="childHistoryCompletedBy"
                      className="md:text-base"
                    >
                      Completed By:
                    </label>
                  </div>
                  <div className="md:col-span-4 col-span-12">
                    <Field
                      type="text"
                      name="childHistoryCompletedBy"
                      id="childHistoryCompletedBy"
                    />
                    <ErrorMessage
                      name="childHistoryCompletedBy"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <p className="md:text-lg mb-4 md:mb-8 font-semibold">
                  Please describe any medical difficulty experienced by you or
                  your child during
                </p>

                <div className="grid grid-cols-12 col-span-12 gap-6">
                  <div className="relative  gap-4 md:col-span-6 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="medicalDificultyatPregnancy"
                        className="md:text-base"
                      >
                        Pregnancy with This Child:
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        as="textarea"
                        rows="4"
                        name="medicalDificultyatPregnancy"
                        id="medicalDificultyatPregnancy"
                      />
                      <ErrorMessage
                        name="medicalDificultyatPregnancy"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-6 mb-4 col-span-12 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="medicalDificultyatDelivery"
                        className="md:text-base"
                      >
                        Labor and Delivery:
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        as="textarea"
                        rows="4"
                        name="medicalDificultyatDelivery"
                        id="medicalDificultyatDelivery"
                      />
                      <ErrorMessage
                        name="medicalDificultyatDelivery"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-12 col-span-12 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-4">
                      <label htmlFor="patientWeight">Birth weight:</label>
                    </div>
                    <div className="grid-cols-4 md:col-span-4 col-span-6 gap-4">
                      <div className="col-span-4">
                        <label htmlFor="patientweightinPounds">pounds</label>
                      </div>
                      <div className="col-span-4">
                        <Field
                          type="text"
                          name="patientweightinPounds"
                          id="patientweightinPounds"
                        />
                        <ErrorMessage
                          name="patientweightinPounds"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                    <div className="grid-cols-4 md:col-span-4 col-span-6 gap-4">
                      <div className="col-span-4">
                        <label htmlFor="patientweightinOunces">ounces</label>
                      </div>
                      <div className="col-span-4">
                        <Field
                          type="text"
                          name="patientweightinOunces"
                          id="patientweightinOunces"
                        />
                        <ErrorMessage
                          name="patientweightinOunces"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 col-span-12 gap-6">
                  <div className="relative  gap-4 md:col-span-6 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="childafterbirthFirstday"
                        className="md:text-base"
                      >
                        Child in the First Days after Birth:
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        as="textarea"
                        rows="4"
                        name="childafterbirthFirstday"
                        id="childafterbirthFirstday"
                      />
                      <ErrorMessage
                        name="childafterbirthFirstday"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-6 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="childafterbirthFirstYear"
                        className="md:text-base"
                      >
                        Child&apos;s First Year:
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        as="textarea"
                        rows="4"
                        name="childafterbirthFirstYear"
                        id="childafterbirthFirstYear"
                      />
                      <ErrorMessage
                        name="childafterbirthFirstYear"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative  gap-4 col-span-6  mb-4 md:mb-6">
                  <div className="md:col-span-2 col-span-12">
                    <label
                      htmlFor="childCurrentongoingmedicalProblem"
                      className="md:text-base"
                    >
                      Describe any current or ongoing medical problem and
                      medication (or other form of treatment) for this child:
                    </label>
                  </div>
                  <div className="md:col-span-4 col-span-12">
                    <Field
                      type="text"
                      as="textarea"
                      rows="4"
                      name="childCurrentongoingmedicalProblem"
                      id="childCurrentongoingmedicalProblem"
                    />
                    <ErrorMessage
                      name="childCurrentongoingmedicalProblem"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-6">
                  <div className="relative  gap-4 md:col-span-6 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="childCurrenteatingProblem"
                        className="md:text-base"
                      >
                        Describe any eating problems your child has
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        as="textarea"
                        rows="4"
                        name="childCurrenteatingProblem"
                        id="childCurrenteatingProblem"
                      />
                      <ErrorMessage
                        name="childCurrenteatingProblem"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-6 col-span-12 mb-4 md:mb-8">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="childCurrentongoingSleepingProblem"
                        className="md:text-base"
                      >
                        Describe any sleeping problems your child has
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        as="textarea"
                        rows="4"
                        name="childCurrentongoingSleepingProblem"
                        id="childCurrentongoingSleepingProblem"
                      />
                      <ErrorMessage
                        name="childCurrentongoingSleepingProblem"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <p className="md:text-lg mb-4 md:mb-8 font-semibold">
                  Please rate your child&apos;s progress in the following areas
                  of development.
                </p>
                <div className="grid md:grid-cols-12 gap-6 mb-4">
                  <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                    <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-6">
                        <label htmlFor="patientSpeechDevelopment">
                          Speech and Langauge
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2">
                        <label>
                          <Field
                            type="radio"
                            value="Slow"
                            name="patientSpeechDevelopment"
                            className="mr-2"
                          />
                          Slow
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2">
                        <label>
                          <Field
                            type="radio"
                            value="Average"
                            name="patientSpeechDevelopment"
                            className="mr-2"
                          />
                          Average
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2">
                        <label>
                          <Field
                            type="radio"
                            value="Fast"
                            name="patientSpeechDevelopment"
                            className="mr-2"
                          />
                          Fast
                        </label>
                      </div>
                      <ErrorMessage
                        name="patientSpeechDevelopment"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-6 mb-4">
                  <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                    <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-6">
                        <label htmlFor="patientCordinationDevelopment">
                          Fine Coordination (writing and drawing)
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2">
                        <label>
                          <Field
                            type="radio"
                            value="Slow"
                            name="patientCordinationDevelopment"
                            className="mr-2"
                          />
                          Slow
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2">
                        <label>
                          <Field
                            type="radio"
                            value="Average"
                            name="patientCordinationDevelopment"
                            className="mr-2"
                          />
                          Average
                        </label>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <label>
                          <Field
                            type="radio"
                            value="Fast"
                            name="patientCordinationDevelopment"
                            className="mr-2"
                          />
                          Fast
                        </label>
                      </div>
                      <ErrorMessage
                        name="patientCordinationDevelopment"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-6 mb-4 md:mb-8">
                  <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                    <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-6">
                        <label htmlFor="patientConcernsDevelopment">
                          Describe any concerns in this space or above.
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2">
                        <label>
                          <Field
                            type="radio"
                            value="Slow"
                            name="patientConcernsDevelopment"
                            className="mr-2"
                          />
                          Slow
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2">
                        <label>
                          <Field
                            type="radio"
                            value="Average"
                            name="patientConcernsDevelopment"
                            className="mr-2"
                          />
                          Average
                        </label>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <label>
                          <Field
                            type="radio"
                            value="Fast"
                            name="patientConcernsDevelopment"
                            className="mr-2"
                          />
                          Fast
                        </label>
                      </div>
                      <ErrorMessage
                        name="patientConcernsDevelopment"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-6 mb-4">
                  <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                    <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-6">
                        <label htmlFor="patientGrossDevelopment">
                          Gross Coordination (running, walking and sports)
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2">
                        <label>
                          <Field
                            type="radio"
                            value="Slow"
                            name="patientGrossDevelopment"
                            className="mr-2"
                          />
                          Slow
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2">
                        <label>
                          <Field
                            type="radio"
                            value="Average"
                            name="patientGrossDevelopment"
                            className="mr-2"
                          />
                          Average
                        </label>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <label>
                          <Field
                            type="radio"
                            value="Fast"
                            name="patientGrossDevelopment"
                            className="mr-2"
                          />
                          Fast
                        </label>
                      </div>
                      <ErrorMessage
                        name="patientGrossDevelopment"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-6 mb-4">
                  <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                    <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-6">
                        <label htmlFor="patientSocializingDevelopment">
                          Socializing
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2">
                        <label>
                          <Field
                            type="radio"
                            value="Slow"
                            name="patientSocializingDevelopment"
                            className="mr-2"
                          />
                          Slow
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2">
                        <label>
                          <Field
                            type="radio"
                            value="Average"
                            name="patientSocializingDevelopment"
                            className="mr-2"
                          />
                          Average
                        </label>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <label>
                          <Field
                            type="radio"
                            value="Fast"
                            name="patientSocializingDevelopment"
                            className="mr-2"
                          />
                          Fast
                        </label>
                      </div>
                      <ErrorMessage
                        name="patientSocializingDevelopment"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>

                <p className="md:text-lg mb-4 md:mb-8 font-semibold">
                  Past Milestones: At what age did your child achieve the
                  following skills?
                </p>
                <div className="grid grid-cols-12 col-span-12 gap-6 mb-4">
                  <div className="relative  gap-4 md:col-span-6 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="experienceFeedingDifFiculties"
                        className="md:text-base"
                      >
                        Experience feeding difficulties or colic - Describe.
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="experienceFeedingDifFiculties"
                        id="experienceFeedingDifFiculties"
                      />
                      <ErrorMessage
                        name="experienceFeedingDifFiculties"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-6 mb-4 col-span-12 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="experienceSitAlone"
                        className="md:text-base"
                      >
                        Sit Alone
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="experienceSitAlone"
                        id="experienceSitAlone"
                      />
                      <ErrorMessage
                        name="experienceSitAlone"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 col-span-12 gap-6 mb-4">
                  <div className="relative  gap-4 md:col-span-6 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="experiencwalkalone"
                        className="md:text-base"
                      >
                        Walk Alone
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="experiencwalkalone"
                        id="experiencwalkalone"
                      />
                      <ErrorMessage
                        name="experiencwalkalone"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-6 mb-4 col-span-12 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="experienceRealWords"
                        className="md:text-base"
                      >
                        Speak Real Words
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="experienceRealWords"
                        id="experienceRealWords"
                      />
                      <ErrorMessage
                        name="experienceRealWords"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 col-span-12 gap-6 mb-4">
                  <div className="relative  gap-4 md:col-span-6 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="experienceRealSentences"
                        className="md:text-base"
                      >
                        Speak Real Sentences
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="experienceRealSentences"
                        id="experienceRealSentences"
                      />
                      <ErrorMessage
                        name="experienceRealSentences"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-6 mb-4 col-span-12 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="experienceAchieveBowltraining"
                        className="md:text-base"
                      >
                        Achieve Day and Night Bowel Training
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="experienceAchieveBowltraining"
                        id="experienceAchieveBowltraining"
                      />
                      <ErrorMessage
                        name="experienceAchieveBowltraining"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 col-span-12 gap-6 mb-4">
                  <div className="relative  gap-4 md:col-span-6 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="nightBladdedTraining"
                        className="md:text-base"
                      >
                        Achieve Night Bladder Training
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="nightBladdedTraining"
                        id="nightBladdedTraining"
                      />
                      <ErrorMessage
                        name="nightBladdedTraining"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-6 mb-4 col-span-12 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="dayBladderTraining"
                        className="md:text-base"
                      >
                        Achieve Day Bladder Training
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="dayBladderTraining"
                        id="dayBladderTraining"
                      />
                      <ErrorMessage
                        name="dayBladderTraining"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <p className="md:text-lg mb-4 md:mb-8 font-semibold">
                  Describe your child&apos;s past medical history concerning the
                  following events
                </p>
                <div className="relative  gap-4 grid grid-cols-12 col-span-12 mb-4 md:mb-6">
                  <div className="md:col-span-12 col-span-12">
                    <label htmlFor="Hospitalization" className="md:text-base">
                      Hospitalization
                    </label>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label
                        htmlFor="hospitalizationAge"
                        className="md:text-base"
                      >
                        AGE
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field
                        type="text"
                        name="hospitalizationAge"
                        id="hospitalizationAge"
                      />
                      <ErrorMessage
                        name="hospitalizationAge"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label
                        htmlFor="hospitalizationReason"
                        className="md:text-base"
                      >
                        REASON
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field
                        type="text"
                        name="hospitalizationReason"
                        id="hospitalizationReason"
                      />
                      <ErrorMessage
                        name="hospitalizationReason"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label
                        htmlFor="HospitalizationResult"
                        className="md:text-base"
                      >
                        RESULT
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field
                        type="text"
                        name="HospitalizationResult"
                        id="HospitalizationResult"
                      />
                      <ErrorMessage
                        name="HospitalizationResult"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative  gap-4 grid grid-cols-12 col-span-12 mb-4 md:mb-6">
                  <div className="md:col-span-12 col-span-12">
                    <label htmlFor="Surgeries" className="md:text-base">
                      Surgeries
                    </label>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label htmlFor="surgeriesAge" className="md:text-base">
                        AGE
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field
                        type="text"
                        name="surgeriesAge"
                        id="surgeriesAge"
                      />
                      <ErrorMessage
                        name="surgeriesAge"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label htmlFor="surgeriesReason" className="md:text-base">
                        REASON
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field
                        type="text"
                        name="surgeriesReason"
                        id="surgeriesReason"
                      />
                      <ErrorMessage
                        name="surgeriesReason"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label htmlFor="surgeriesResult" className="md:text-base">
                        RESULT
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field
                        type="text"
                        name="surgeriesResult"
                        id="surgeriesResult"
                      />
                      <ErrorMessage
                        name="surgeriesResult"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative  gap-4 grid grid-cols-12 col-span-12 mb-4 md:mb-6">
                  <div className="md:col-span-12 col-span-12">
                    <label htmlFor="Seizures" className="md:text-base">
                      Seizures
                    </label>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label htmlFor="seizuresAge" className="md:text-base">
                        AGE
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field type="text" name="seizuresAge" id="seizuresAge" />
                      <ErrorMessage
                        name="seizuresAge"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label htmlFor="seizuresReason" className="md:text-base">
                        REASON
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field
                        type="text"
                        name="seizuresReason"
                        id="seizuresReason"
                      />
                      <ErrorMessage
                        name="seizuresReason"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label htmlFor="seizuresResult" className="md:text-base">
                        RESULT
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field
                        type="text"
                        name="seizuresResult"
                        id="seizuresResult"
                      />
                      <ErrorMessage
                        name="seizuresResult"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative  gap-4 grid grid-cols-12 col-span-12 mb-4 md:mb-6">
                  <div className="md:col-span-12 col-span-12">
                    <label htmlFor="HeadInjuries" className="md:text-base">
                      Head Injuries
                    </label>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label htmlFor="headInjuriesAge" className="md:text-base">
                        AGE
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field
                        type="text"
                        name="headInjuriesAge"
                        id="headInjuriesAge"
                      />
                      <ErrorMessage
                        name="headInjuriesAge"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label
                        htmlFor="headInjuriesReason"
                        className="md:text-base"
                      >
                        REASON
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field
                        type="text"
                        name="headInjuriesReason"
                        id="headInjuriesReason"
                      />
                      <ErrorMessage
                        name="headInjuriesReason"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label
                        htmlFor="headInjuriesResult"
                        className="md:text-base"
                      >
                        RESULT
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field
                        type="text"
                        name="headInjuriesResult"
                        id="headInjuriesResult"
                      />
                      <ErrorMessage
                        name="headInjuriesResult"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative  gap-4 grid grid-cols-12 col-span-12 mb-4 md:mb-6">
                  <div className="md:col-span-12 col-span-12">
                    <label
                      htmlFor="LengthyMedicalProblems"
                      className="md:text-base"
                    >
                      Lengthy Medical Problems
                    </label>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label
                        htmlFor="MedicalProblemsAge"
                        className="md:text-base"
                      >
                        AGE
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field
                        type="text"
                        name="MedicalProblemsAge"
                        id="MedicalProblemsAge"
                      />
                      <ErrorMessage
                        name="MedicalProblemsAge"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label
                        htmlFor="MedicalProblemsReason"
                        className="md:text-base"
                      >
                        REASON
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field
                        type="text"
                        name="MedicalProblemsReason"
                        id="MedicalProblemsReason"
                      />
                      <ErrorMessage
                        name="MedicalProblemsReason"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label
                        htmlFor="MedicalProblemsResult"
                        className="md:text-base"
                      >
                        RESULT
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field
                        type="text"
                        name="MedicalProblemsResult"
                        id="MedicalProblemsResult"
                      />
                      <ErrorMessage
                        name="MedicalProblemsResult"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative  gap-4 grid grid-cols-12 col-span-12 mb-4 md:mb-6">
                  <div className="md:col-span-12 col-span-12">
                    <label htmlFor="MedicationsUsed" className="md:text-base">
                      Medications Used for Long Periods of Time
                    </label>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label
                        htmlFor="medicationsUsedage"
                        className="md:text-base"
                      >
                        AGE
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field
                        type="text"
                        name="medicationsUsedage"
                        id="medicationsUsedage"
                      />
                      <ErrorMessage
                        name="medicationsUsedage"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label
                        htmlFor="medicationsUsedReason"
                        className="md:text-base"
                      >
                        REASON
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field
                        type="text"
                        name="medicationsUsedReason"
                        id="medicationsUsedReason"
                      />
                      <ErrorMessage
                        name="medicationsUsedReason"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-12 col-span-12">
                      <label
                        htmlFor="medicationsUsedResult"
                        className="md:text-base"
                      >
                        RESULT
                      </label>
                    </div>
                    <div className="md:col-span-12 col-span-12">
                      <Field
                        type="text"
                        name="medicationsUsedResult"
                        id="medicationsUsedResult"
                      />
                      <ErrorMessage
                        name="medicationsUsedResult"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <p className="md:text-lg mb-4 md:mb-8 font-semibold">
                  Describe any psychiatric evaluation or treatment your child
                  has had.
                </p>
                <div>
                  <FieldArray name="evaluation">
                    {({ remove, push }) => (
                      <div>
                        {values.evaluation?.length > 0 &&
                          values.evaluation?.map((add, index) => (
                            <div
                              className="grid grid-cols-12 gap-6 col-span-12 relative"
                              key={index}
                            >
                              <div className="md:col-span-6 col-span-12 ">
                                <label
                                  htmlFor={`evaluation.${index}.evolationofAge`}
                                >
                                  AGE
                                </label>
                                <Field
                                  name={`evaluation.${index}.evolationofAge`}
                                  id={`evaluation.${index}.evolationofAge`}
                                  type="text"
                                />
                                <ErrorMessage
                                  name={`evaluation.${index}.evolationofAge`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>
                              <div className="md:col-span-6 col-span-12 ">
                                <label
                                  htmlFor={`evaluation.${index}.evaluationofReason`}
                                >
                                  REASON
                                </label>

                                <Field
                                  name={`evaluation.${index}.evaluationofReason`}
                                  id={`evaluation.${index}.evaluationofReason`}
                                  type="text"
                                />
                                <ErrorMessage
                                  name={`evaluation.${index}.evaluationofReason`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>

                              <div className="md:col-span-6 col-span-12">
                                <label
                                  htmlFor={`evaluation.${index}.evaluationofWhere`}
                                >
                                  WHERE
                                </label>
                                <Field
                                  name={`evaluation.${index}.evaluationofWhere`}
                                  id={`evaluation.${index}.evaluationofWhere`}
                                  type="text"
                                />
                                <ErrorMessage
                                  name={`evaluation.${index}.evaluationofWhere`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>

                              <div className="md:col-span-6 col-span-12 gap-4">
                                <label
                                  htmlFor={`evaluation.${index}.evaluationofResult`}
                                >
                                  RESULT
                                </label>
                                <Field
                                  name={`evaluation.${index}.evaluationofResult`}
                                  id={`evaluation.${index}.evaluationofResult`}
                                  type="text"
                                />
                                <ErrorMessage
                                  name={`evaluation.${index}.evaluationofResult`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>

                              <div className="col-span-12 relative text-right mt-8">
                                <button
                                  type="button"
                                  className="bg-transparent text-blue-700 text-sm md:text-base  py-2 px-3"
                                  onClick={() => remove(index)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}

                        <button
                          type="button"
                          className="bg-transparent text-blue-700 text-sm md:text-base  py-2 px-3 mb-4"
                          onClick={() =>
                            push({
                              evolationofAge: "",
                              evaluationofReason: "",
                              evaluationofWhere: "",
                              evaluationofResult: "",
                            })
                          }
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
                <p className="md:text-lg mb-4 md:mb-8 font-semibold">
                  Describe any hearing or visual problems your child has
                </p>
                <div className="grid grid-cols-12 col-span-12 gap-6 mb-4">
                  <div className="relative  gap-4 md:col-span-6 mb-4 col-span-12 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label htmlFor="childVision" className="md:text-base">
                        Vision
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        as="textarea"
                        rows="4"
                        name="childVision"
                        id="childVision"
                      />
                      <ErrorMessage
                        name="childVision"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:col-span-6 mb-4 col-span-12 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label htmlFor="childHearing" className="md:text-base">
                        Hearing
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        as="textarea"
                        rows="4"
                        name="childHearing"
                        id="childHearing"
                      />
                      <ErrorMessage
                        name="childHearing"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <p className="md:text-lg mb-4 md:mb-8 font-semibold">
                  Describe any problems your child is having now or has had in
                  the past at school.
                </p>
                <div className="md:col-span-12 col-span-12 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-4">
                      <label htmlFor="acadmicProblems">Academic</label>
                    </div>
                    <div className="grid-cols-4 md:col-span-4 col-span-12 gap-4">
                      <div className="col-span-4">
                        <label htmlFor="acadmicProblemsPresent">Present</label>
                      </div>
                      <div className="col-span-4">
                        <Field
                          type="text"
                          name="acadmicProblemsPresent"
                          id="acadmicProblemsPresent"
                        />
                        <ErrorMessage
                          name="acadmicProblemsPresent"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                    <div className="grid-cols-4 md:col-span-4 col-span-12 gap-4">
                      <div className="col-span-4">
                        <label htmlFor="acadmicProblemsPast">Past</label>
                      </div>
                      <div className="col-span-4">
                        <Field
                          type="text"
                          name="acadmicProblemsPast"
                          id="acadmicProblemsPast"
                        />
                        <ErrorMessage
                          name="acadmicProblemsPast"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-12 col-span-12 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-4">
                      <label htmlFor="behaviorProblems">Behavior</label>
                    </div>
                    <div className="grid-cols-4 md:col-span-4 col-span-12 gap-4">
                      <div className="col-span-4">
                        <label htmlFor="behaviorProblemsPresent">Present</label>
                      </div>
                      <div className="col-span-4">
                        <Field
                          type="text"
                          name="behaviorProblemsPresent"
                          id="behaviorProblemsPresent"
                        />
                        <ErrorMessage
                          name="behaviorProblemsPresent"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                    <div className="grid-cols-4 md:col-span-4 col-span-12 gap-4">
                      <div className="col-span-4">
                        <label htmlFor="behaviorProblemsPast">Past</label>
                      </div>
                      <div className="col-span-4">
                        <Field
                          type="text"
                          name="behaviorProblemsPast"
                          id="behaviorProblemsPast"
                        />
                        <ErrorMessage
                          name="behaviorProblemsPast"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-12 col-span-12 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-4">
                      <label htmlFor="peerRelationsProblems">
                        Peer Relations
                      </label>
                    </div>
                    <div className="grid-cols-4 md:col-span-4 col-span-12 gap-4">
                      <div className="col-span-4">
                        <label htmlFor="peerRelationsProblemsPresent">
                          Present
                        </label>
                      </div>
                      <div className="col-span-4">
                        <Field
                          type="text"
                          name="peerRelationsProblemsPresent"
                          id="peerRelationsProblemsPresent"
                        />
                        <ErrorMessage
                          name="peerRelationsProblemsPresent"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                    <div className="grid-cols-4 md:col-span-4 col-span-12 gap-4">
                      <div className="col-span-4">
                        <label htmlFor="peerRelationsProblemsPast">Past</label>
                      </div>
                      <div className="col-span-4">
                        <Field
                          type="text"
                          name="peerRelationsProblemsPast"
                          id="peerRelationsProblemsPast"
                        />
                        <ErrorMessage
                          name="peerRelationsProblemsPast"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-12 col-span-12 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-4">
                      <label htmlFor="relationshipToTeacher">
                        Relationship to Teacher
                      </label>
                    </div>
                    <div className="grid-cols-4 md:col-span-4 col-span-12 gap-4">
                      <div className="col-span-4">
                        <label htmlFor="relationshipToTeacherPresent">
                          Present
                        </label>
                      </div>
                      <div className="col-span-4">
                        <Field
                          type="text"
                          name="relationshipToTeacherPresent"
                          id="relationshipToTeacherPresent"
                        />
                        <ErrorMessage
                          name="relationshipToTeacherPresent"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                    <div className="grid-cols-4 md:col-span-4 col-span-12 gap-4">
                      <div className="col-span-4">
                        <label htmlFor="relationshipToTeacherPast">Past</label>
                      </div>
                      <div className="col-span-4">
                        <Field
                          type="text"
                          name="relationshipToTeacherPast"
                          id="relationshipToTeacherPast"
                        />
                        <ErrorMessage
                          name="relationshipToTeacherPast"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-12 col-span-12 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-4">
                      <label htmlFor="concerns">Concerns</label>
                    </div>
                    <div className="grid-cols-4 md:col-span-4 col-span-12 gap-4">
                      <div className="col-span-4">
                        <label htmlFor="concernsPresent">Present</label>
                      </div>
                      <div className="col-span-4">
                        <Field
                          type="text"
                          name="concernsPresent"
                          id="concernsPresent"
                        />
                        <ErrorMessage
                          name="concernsPresent"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                    <div className="grid-cols-4 md:col-span-4 col-span-12 gap-4">
                      <div className="col-span-4">
                        <label htmlFor="concernsPast">Past</label>
                      </div>
                      <div className="col-span-4">
                        <Field
                          type="text"
                          name="concernsPast"
                          id="concernsPast"
                        />
                        <ErrorMessage
                          name="concernsPast"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative  gap-4 grid md:grid-cols-12 col-span-12 mb-4 md:mb-6">
                  <div className="md:col-span-4 col-span-12">
                    <label
                      htmlFor="childAttendedschool"
                      className="md:text-base"
                    >
                      Where does your child attend school?
                    </label>
                  </div>
                  <div className="md:col-span-8 col-span-12">
                    <Field
                      type="text"
                      name="childAttendedschool"
                      id="childAttendedschool"
                    />
                    <ErrorMessage
                      name="childAttendedschool"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-6 col-span-12">
                  <div className="relative  gap-4 md:grid-cols-6 col-span-12 md:col-span-6 mb-4 md:mb-6">
                    <div className="md:col-span-6 col-span-12">
                      <label htmlFor="typeOfSchool" className="md:text-base">
                        Type of School
                      </label>
                    </div>
                    <div className="md:col-span-6 col-span-12">
                      <Field
                        type="text"
                        name="typeOfSchool"
                        id="typeOfSchool"
                      />
                      <ErrorMessage
                        name="typeOfSchool"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                  <div className="relative  gap-4 md:grid-cols-6 col-span-12 md:col-span-6 mb-4 md:mb-6">
                    <div className="md:col-span-6 col-span-12">
                      <label htmlFor="gradeOfSchool" className="md:text-base">
                        Grade
                      </label>
                    </div>
                    <div className="md:col-span-6 col-span-12">
                      <Field
                        type="text"
                        name="gradeOfSchool"
                        id="gradeOfSchool"
                      />
                      <ErrorMessage
                        name="gradeOfSchool"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative  gap-4  md:grid-cols-12 col-span-12 md:col-span-12 mb-4 md:mb-6">
                  <div className="md:col-span-12 col-span-12">
                    <label htmlFor="listTheSchools" className="md:text-base">
                      List the schools (day care and current) your child has
                      attended.
                    </label>
                  </div>
                  <div className="md:col-span-12 col-span-12">
                    <Field
                      type="text"
                      as="textarea"
                      rows="4"
                      name="listTheSchools"
                      id="listTheSchools"
                    />
                    <ErrorMessage
                      name="listTheSchools"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>
                <p className="md:text-lg mb-4 md:mb-8 font-semibold">
                  Mention any special classes, repeated grades, and outside
                  educational help your child has had or is now having.
                </p>

                <div className="relative  gap-4  md:grid-cols-12 col-span-12 md:col-span-12 mb-4 md:mb-6">
                  <div className="md:col-span-12 col-span-12">
                    <label htmlFor="specialClasses" className="md:text-base">
                      SPECIAL CLASSES
                    </label>
                  </div>
                  <div className="md:col-span-12 col-span-12">
                    <Field
                      type="text"
                      as="textarea"
                      rows="4"
                      name="specialClasses"
                      id="specialClasses"
                    />
                    <ErrorMessage
                      name="specialClasses"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>
                <div className="relative  gap-4 md:grid-cols-12 col-span-12 md:col-span-12 mb-4 md:mb-6">
                  <div className="md:col-span-12 col-span-12">
                    <label htmlFor="repeatedGrades" className="md:text-base">
                      REPEATED GRADES
                    </label>
                  </div>
                  <div className="md:col-span-12 col-span-12">
                    <Field
                      type="text"
                      as="textarea"
                      rows="4"
                      name="repeatedGrades"
                      id="repeatedGrades"
                    />
                    <ErrorMessage
                      name="repeatedGrades"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="relative  gap-4  md:grid-cols-12 col-span-12 md:col-span-12 mb-4 md:mb-6">
                  <div className="md:col-span-12 col-span-12">
                    <label
                      htmlFor="outsideEducationalHelp"
                      className="md:text-base"
                    >
                      OUTSIDE EDUCATIONAL HELP
                    </label>
                  </div>
                  <div className="md:col-span-12 col-span-12">
                    <Field
                      type="text"
                      as="textarea"
                      rows="4"
                      name="outsideEducationalHelp"
                      id="outsideEducationalHelp"
                    />
                    <ErrorMessage
                      name="outsideEducationalHelp"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <p className="md:text-lg mb-4 md:mb-8 font-semibold">
                  Please include:
                </p>

                <div className=" col-span-12 relative">
                  <div className="grid gap-4 grid-cols-12">
                    <div className="col-span-4">
                      <label htmlFor="copiesOfEducationPlanImg">
                        {" "}
                        Copy of individual education plans (IEP)
                      </label>
                    </div>
                    {copiesOfEducationPlanPath ? (
                      <div className="col-span-8 flex items-start gap-4">
                        <Image
                          src={copiesOfEducationPlanPath}
                          height={200}
                          width={200}
                          alt="Image For Preview"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            console.log("Delete button clicked");

                            setShouldDeleteCopiesOfEducationPlan(true);
                          }}
                          className="p-2 hover:bg-slate-100 rounded-full"
                        >
                          <TrashIcon className="h-5 w-5 text-blue-600" />
                        </button>
                      </div>
                    ) : (
                      // Render your Dropzone or other upload component here
                      <div className="col-span-8">
                        <Dropzone
                          onDrop={(acceptedFiles) => {
                            console.log(acceptedFiles);
                            uploadCopiesOfEducationPlan(acceptedFiles);
                          }}
                          accept={acceptableFileTypes}
                          multiple={true}
                          maxSize={20971520}
                          onDragEnter={() => {
                            setDragging(true);
                            setDropError(false);
                          }}
                          onDragLeave={() => {
                            setDragging(false);
                          }}
                          onDropRejected={(fileRejections) => {
                            if (fileRejections.length > 1) {
                              setDropError(fileRejections[0].errors[0].code);
                            } else {
                              setDropError(fileRejections[0].errors[0].code);
                            }
                            console.error(fileRejections[0]);
                          }}
                          onDropAccepted={() => {
                            setDropError(false);
                          }}
                          onError={(error) => {
                            console.error(error);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <section
                                className={`mt-2 flex h-48 cursor-pointer bg-white items-center justify-center px-6 pt-8 pb-10 border-2 border-slate-300 border-dashed rounded-md ${
                                  dragging ? "border-green-400" : ""
                                } ${dropError ? "border-red-300" : ""}`}
                              >
                                <div className="text-center">
                                  <DocumentTextIcon className="mx-auto h-8 w-8 m-3 text-slate-400" />
                                  <div className="text-sm text-slate-600 w-full font-medium">
                                    <span className="relative cursor-pointer  rounded-md  text-blue-600 hover:text-blue-700">
                                      <span>Upload a file</span>
                                    </span>
                                    <span className="pl-1">
                                      or drag and drop
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-400 mt-2 font-medium">
                                    PDF, DOCX, XLSX, CSV, PNG, JPG, PPTX up to
                                    20MB
                                  </p>
                                </div>
                              </section>
                            </div>
                          )}
                        </Dropzone>
                      </div>
                    )}
                    {/* Conditionally render the progress bar when the image exists */}
                    <div className="col-span-4"> </div>
                    {copiesOfEducationPlanPath && (
                      <div className="col-span-8">
                        <span className="w-full block bg-slate-200 border-4 rounded-full shadow-inner border-slate-200 mt-4">
                          <span
                            className="h-2 bg-green-400 block rounded-full"
                            style={progressStyleCopiesOfEducationPlan}
                          ></span>
                        </span>
                        {copiesOfEducationPlanUploaded && (
                          <div className="mt-2 text-sm">
                            <p>File uploaded successfully.</p>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="col-span-4"> </div>
                    {shouldDeleteCopiesOfEducationPlan && (
                      <div className="col-span-8 mb-2">
                        <button
                          type="button"
                          onClick={deleteCopiesOfEducationPlan}
                          className="px-4 py-2 text-xs mb-6 bg-red-500 text-white hover:bg-red-600 rounded-full"
                        >
                          Confirm Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className=" col-span-12 relative">
                  <div className="grid gap-4 grid-cols-12">
                    <div className="col-span-4">
                      <label htmlFor="copiesOfPsychologicalTestingImg">
                        {" "}
                        Copy of school psychological testing
                      </label>
                    </div>
                    {copiesOfPsychologicalTestingPath ? (
                      <div className="col-span-8 flex items-start gap-4">
                        <Image
                          src={copiesOfPsychologicalTestingPath}
                          height={200}
                          width={200}
                          alt="Image For Preview"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            console.log("Delete button clicked");

                            setShouldDeleteCopiesOfPsychologicalTesting(true);
                          }}
                          className="p-2 hover:bg-slate-100 rounded-full"
                        >
                          <TrashIcon className="h-5 w-5 text-blue-600" />
                        </button>
                      </div>
                    ) : (
                      // Render your Dropzone or other upload component here
                      <div className="col-span-8">
                        <Dropzone
                          onDrop={(acceptedFiles) => {
                            console.log(acceptedFiles);
                            uploadCopiesOfPsychologicalTesting(acceptedFiles);
                          }}
                          accept={acceptableFileTypes}
                          multiple={true}
                          maxSize={20971520}
                          onDragEnter={() => {
                            setDragging(true);
                            setDropError(false);
                          }}
                          onDragLeave={() => {
                            setDragging(false);
                          }}
                          onDropRejected={(fileRejections) => {
                            if (fileRejections.length > 1) {
                              setDropError(fileRejections[0].errors[0].code);
                            } else {
                              setDropError(fileRejections[0].errors[0].code);
                            }
                            console.error(fileRejections[0]);
                          }}
                          onDropAccepted={() => {
                            setDropError(false);
                          }}
                          onError={(error) => {
                            console.error(error);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <section
                                className={`mt-2 flex h-48 cursor-pointer bg-white items-center justify-center px-6 pt-8 pb-10 border-2 border-slate-300 border-dashed rounded-md ${
                                  dragging ? "border-green-400" : ""
                                } ${dropError ? "border-red-300" : ""}`}
                              >
                                <div className="text-center">
                                  <DocumentTextIcon className="mx-auto h-8 w-8 m-3 text-slate-400" />
                                  <div className="text-sm text-slate-600 w-full font-medium">
                                    <span className="relative cursor-pointer rounded-md  text-blue-600 hover:text-blue-700">
                                      <span>Upload a file</span>
                                    </span>
                                    <span className="pl-1">
                                      or drag and drop
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-400 mt-2 font-medium">
                                    PDF, DOCX, XLSX, CSV, PNG, JPG, PPTX up to
                                    20MB
                                  </p>
                                </div>
                              </section>
                            </div>
                          )}
                        </Dropzone>
                      </div>
                    )}
                    {/* Conditionally render the progress bar when the image exists */}
                    <div className="col-span-4"> </div>
                    {copiesOfPsychologicalTestingPath && (
                      <div className="col-span-8">
                        <span className="w-full block bg-slate-200 border-4 rounded-full shadow-inner border-slate-200 mt-4">
                          <span
                            className="h-2 bg-green-400 block rounded-full"
                            style={progressStyleCopiesOfPsychologicalTesting}
                          ></span>
                        </span>
                        {copiesOfPsychologicalTestingUploaded && (
                          <div className="mt-2 text-sm">
                            <p>File uploaded successfully.</p>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="col-span-4"> </div>
                    {shouldDeleteCopiesOfPsychologicalTesting && (
                      <div className="col-span-8 mb-2">
                        <button
                          type="button"
                          onClick={deleteCopiesOfPsychologicalTesting}
                          className="px-4 py-2 text-xs mb-6 bg-red-500 text-white hover:bg-red-600 rounded-full"
                        >
                          Confirm Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className=" col-span-12 relative">
                  <div className="grid gap-4 grid-cols-12">
                    <div className="col-span-4">
                      <label htmlFor="childReportCardsImg">
                        {" "}
                        Your child&apos;s report card
                      </label>
                    </div>
                    {childReportCardsPath ? (
                      <div className="col-span-8 flex items-start gap-4">
                        <Image
                          src={childReportCardsPath}
                          height={200}
                          width={200}
                          alt="Image For Preview"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            console.log("Delete button clicked");

                            setShouldDeleteChildReportCards(true);
                          }}
                          className="p-2 hover:bg-slate-100 rounded-full"
                        >
                          <TrashIcon className="h-5 w-5 text-blue-600" />
                        </button>
                      </div>
                    ) : (
                      // Render your Dropzone or other upload component here
                      <div className="col-span-8">
                        <Dropzone
                          onDrop={(acceptedFiles) => {
                            console.log(acceptedFiles);
                            uploadChildReportCards(acceptedFiles);
                          }}
                          accept={acceptableFileTypes}
                          multiple={true}
                          maxSize={20971520}
                          onDragEnter={() => {
                            setDragging(true);
                            setDropError(false);
                          }}
                          onDragLeave={() => {
                            setDragging(false);
                          }}
                          onDropRejected={(fileRejections) => {
                            if (fileRejections.length > 1) {
                              setDropError(fileRejections[0].errors[0].code);
                            } else {
                              setDropError(fileRejections[0].errors[0].code);
                            }
                            console.error(fileRejections[0]);
                          }}
                          onDropAccepted={() => {
                            setDropError(false);
                          }}
                          onError={(error) => {
                            console.error(error);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <section
                                className={`mt-2 flex h-48 cursor-pointer bg-white items-center justify-center px-6 pt-8 pb-10 border-2 border-slate-300 border-dashed rounded-md ${
                                  dragging ? "border-green-400" : ""
                                } ${dropError ? "border-red-300" : ""}`}
                              >
                                <div className="text-center">
                                  <DocumentTextIcon className="mx-auto h-8 w-8 m-3 text-slate-400" />
                                  <div className="text-sm text-slate-600 w-full font-medium">
                                    <span className="relative cursor-pointer  rounded-md  text-blue-600 hover:text-blue-700">
                                      <span>Upload a file</span>
                                    </span>
                                    <span className="pl-1">
                                      or drag and drop
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-400 mt-2 font-medium">
                                    PDF, DOCX, XLSX, CSV, PNG, JPG, PPTX up to
                                    20MB
                                  </p>
                                </div>
                              </section>
                            </div>
                          )}
                        </Dropzone>
                      </div>
                    )}
                    {/* Conditionally render the progress bar when the image exists */}
                    <div className="col-span-4"> </div>
                    {childReportCardsPath && (
                      <div className="col-span-8">
                        <span className="w-full block bg-slate-200 border-4 rounded-full shadow-inner border-slate-200 mt-4">
                          <span
                            className="h-2 bg-green-400 block rounded-full"
                            style={progressStyleChildReportCards}
                          ></span>
                        </span>
                        {childReportCardsUploaded && (
                          <div className="mt-2 text-sm">
                            <p>File uploaded successfully.</p>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="col-span-4"> </div>
                    {shouldDeleteChildReportCards && (
                      <div className="col-span-8 mb-2">
                        <button
                          type="button"
                          onClick={deleteChildReportCards}
                          className="px-4 py-2 text-xs mb-6 bg-red-500 text-white hover:bg-red-600 rounded-full"
                        >
                          Confirm Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className=" col-span-12 relative">
                  <div className="grid gap-4 grid-cols-12">
                    <div className="col-span-4">
                      <label htmlFor="insuranceCardFront">
                        {" "}
                        Insurance Card (Front) *
                      </label>
                    </div>
                    {insuranceCardFrontImgPath ? (
                      <div className="col-span-8 flex items-start gap-4">
                        <Image
                          src={insuranceCardFrontImgPath}
                          height={200}
                          width={200}
                          alt="Image For Preview"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            console.log("Delete button clicked");

                            setShouldDeleteInsuranceCardFrontImg(true);
                          }}
                          className="p-2 hover:bg-slate-100 rounded-full"
                        >
                          <TrashIcon className="h-5 w-5 text-blue-600" />
                        </button>
                      </div>
                    ) : (
                      // Render your Dropzone or other upload component here
                      <div className="col-span-8">
                        <Dropzone
                          onDrop={(acceptedFiles) => {
                            console.log(acceptedFiles);
                            uploadInsuranceCardFrontImg(acceptedFiles);
                          }}
                          accept={acceptableFileTypes}
                          multiple={true}
                          maxSize={20971520}
                          onDragEnter={() => {
                            setDragging(true);
                            setDropError(false);
                          }}
                          onDragLeave={() => {
                            setDragging(false);
                          }}
                          onDropRejected={(fileRejections) => {
                            if (fileRejections.length > 1) {
                              setDropError(fileRejections[0].errors[0].code);
                            } else {
                              setDropError(fileRejections[0].errors[0].code);
                            }
                            console.error(fileRejections[0]);
                          }}
                          onDropAccepted={() => {
                            setDropError(false);
                          }}
                          onError={(error) => {
                            console.error(error);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <section
                                className={`mt-2 flex h-48 cursor-pointer bg-white items-center justify-center px-6 pt-8 pb-10 border-2 border-slate-300 border-dashed rounded-md ${
                                  dragging ? "border-green-400" : ""
                                } ${dropError ? "border-red-300" : ""}`}
                              >
                                <div className="text-center">
                                  <DocumentTextIcon className="mx-auto h-8 w-8 m-3 text-slate-400" />
                                  <div className="text-sm text-slate-600 w-full font-medium">
                                    <span className="relative cursor-pointer rounded-md  text-blue-600 hover:text-blue-700">
                                      <span>Upload a file</span>
                                    </span>
                                    <span className="pl-1">
                                      or drag and drop
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-400 mt-2 font-medium">
                                    PDF, DOCX, XLSX, CSV, PNG, JPG, PPTX up to
                                    20MB
                                  </p>
                                </div>
                              </section>
                            </div>
                          )}
                        </Dropzone>
                      </div>
                    )}
                    {/* Conditionally render the progress bar when the image exists */}
                    <div className="col-span-4"> </div>
                    {insuranceCardFrontImgPath && (
                      <div className="col-span-8">
                        <span className="w-full block bg-slate-200 border-4 rounded-full shadow-inner border-slate-200 mt-4">
                          <span
                            className="h-2 bg-green-400 block rounded-full"
                            style={progressStyleInsuranceCardFrontImg}
                          ></span>
                        </span>
                        {insuranceCardFrontImgUploaded && (
                          <div className="mt-2 text-sm">
                            <p>File uploaded successfully.</p>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="col-span-4"> </div>
                    {shouldDeleteInsuranceCardFrontImg && (
                      <div className="col-span-8 mb-2">
                        <button
                          type="button"
                          onClick={deleteInsuranceCardFrontImg}
                          className="px-4 py-2 text-xs mb-6 bg-red-500 text-white hover:bg-red-600 rounded-full"
                        >
                          Confirm Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className=" col-span-12 relative">
                  <div className="grid gap-4 grid-cols-12">
                    <div className="col-span-4">
                      <label htmlFor="insuranceCardBack">
                        {" "}
                        Insurance Card (Back) *
                      </label>
                    </div>
                    {insuranceCardBackImgPath ? (
                      <div className="col-span-8 flex items-start gap-4">
                        <Image
                          src={insuranceCardBackImgPath}
                          height={200}
                          width={200}
                          alt="Image For Preview"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            console.log("Delete button clicked");

                            setShouldDeleteInsuranceCardBackImg(true);
                          }}
                          className="p-2 hover:bg-slate-100 rounded-full"
                        >
                          <TrashIcon className="h-5 w-5 text-blue-600" />
                        </button>
                      </div>
                    ) : (
                      // Render your Dropzone or other upload component here
                      <div className="col-span-8">
                        <Dropzone
                          onDrop={(acceptedFiles) => {
                            console.log(acceptedFiles);
                            uploadInsuranceCardBackImg(acceptedFiles);
                          }}
                          accept={acceptableFileTypes}
                          multiple={true}
                          maxSize={20971520}
                          onDragEnter={() => {
                            setDragging(true);
                            setDropError(false);
                          }}
                          onDragLeave={() => {
                            setDragging(false);
                          }}
                          onDropRejected={(fileRejections) => {
                            if (fileRejections.length > 1) {
                              setDropError(fileRejections[0].errors[0].code);
                            } else {
                              setDropError(fileRejections[0].errors[0].code);
                            }
                            console.error(fileRejections[0]);
                          }}
                          onDropAccepted={() => {
                            setDropError(false);
                          }}
                          onError={(error) => {
                            console.error(error);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <section
                                className={`mt-2 flex h-48 cursor-pointer bg-white items-center justify-center px-6 pt-8 pb-10 border-2 border-slate-300 border-dashed rounded-md ${
                                  dragging ? "border-green-400" : ""
                                } ${dropError ? "border-red-300" : ""}`}
                              >
                                <div className="text-center">
                                  <DocumentTextIcon className="mx-auto h-8 w-8 m-3 text-slate-400" />
                                  <div className="text-sm text-slate-600 w-full font-medium">
                                    <span className="relative cursor-pointer  rounded-md  text-blue-600 hover:text-blue-700">
                                      <span>Upload a file</span>
                                    </span>
                                    <span className="pl-1">
                                      or drag and drop
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-400 mt-2 font-medium">
                                    PDF, DOCX, XLSX, CSV, PNG, JPG, PPTX up to
                                    20MB
                                  </p>
                                </div>
                              </section>
                            </div>
                          )}
                        </Dropzone>
                      </div>
                    )}
                    {/* Conditionally render the progress bar when the image exists */}
                    <div className="col-span-4"> </div>
                    {insuranceCardBackImgPath && (
                      <div className="col-span-8">
                        <span className="w-full block bg-slate-200 border-4 rounded-full shadow-inner border-slate-200 mt-4">
                          <span
                            className="h-2 bg-green-400 block rounded-full"
                            style={progressStyleInsuranceCardBackImg}
                          ></span>
                        </span>
                        {insuranceCardBackImgUploaded && (
                          <div className="mt-2 text-sm">
                            <p>File uploaded successfully.</p>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="col-span-4"> </div>
                    {shouldDeleteInsuranceCardBackImg && (
                      <div className="col-span-8 mb-2">
                        <button
                          type="button"
                          onClick={deleteInsuranceCardBackImg}
                          className="px-4 py-2 text-xs mb-6 bg-red-500 text-white hover:bg-red-600 rounded-full"
                        >
                          Confirm Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className=" col-span-12 relative">
                  <div className="grid gap-4 grid-cols-12">
                    <div className="col-span-4">
                      <label htmlFor="drivingLicense">
                        {" "}
                        Driving License/ID *
                      </label>
                    </div>
                    {drivingLicenseImgPath ? (
                      <div className="col-span-8 flex items-start gap-4">
                        <Image
                          src={drivingLicenseImgPath}
                          height={200}
                          width={200}
                          alt="Image For Preview"
                        />

                        <button
                          type="button"
                          onClick={() => {
                            console.log("Delete button clicked");

                            setShouldDeleteDrivingLicenseImg(true);
                          }}
                          className="p-2 hover:bg-slate-100 rounded-full"
                        >
                          <TrashIcon className="h-5 w-5 text-blue-600" />
                        </button>
                      </div>
                    ) : (
                      // Render your Dropzone or other upload component here
                      <div className="col-span-8">
                        <Dropzone
                          onDrop={(acceptedFiles) => {
                            console.log(acceptedFiles);
                            uploadDrivingLicenseImg(acceptedFiles);
                          }}
                          accept={acceptableFileTypes}
                          multiple={true}
                          maxSize={20971520}
                          onDragEnter={() => {
                            setDragging(true);
                            setDropError(false);
                          }}
                          onDragLeave={() => {
                            setDragging(false);
                          }}
                          onDropRejected={(fileRejections) => {
                            if (fileRejections.length > 1) {
                              setDropError(fileRejections[0].errors[0].code);
                            } else {
                              setDropError(fileRejections[0].errors[0].code);
                            }
                            console.error(fileRejections[0]);
                          }}
                          onDropAccepted={() => {
                            setDropError(false);
                          }}
                          onError={(error) => {
                            console.error(error);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <section
                                className={`mt-2 flex h-48 cursor-pointer bg-white items-center justify-center px-6 pt-8 pb-10 border-2 border-slate-300 border-dashed rounded-md ${
                                  dragging ? "border-green-400" : ""
                                } ${dropError ? "border-red-300" : ""}`}
                              >
                                <div className="text-center">
                                  <DocumentTextIcon className="mx-auto h-8 w-8 m-3 text-slate-400" />
                                  <div className="text-sm text-slate-600 w-full font-medium">
                                    <span className="relative cursor-pointer  rounded-md  text-blue-600 hover:text-blue-700">
                                      <span>Upload a file</span>
                                    </span>
                                    <span className="pl-1">
                                      or drag and drop
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-400 mt-2 font-medium">
                                    PDF, DOCX, XLSX, CSV, PNG, JPG, PPTX up to
                                    20MB
                                  </p>
                                </div>
                              </section>
                            </div>
                          )}
                        </Dropzone>
                      </div>
                    )}
                    {/* Conditionally render the progress bar when the image exists */}
                    <div className="col-span-4"> </div>
                    {drivingLicenseImgPath && (
                      <div className="col-span-8">
                        <span className="w-full block bg-slate-200 border-4 rounded-full shadow-inner border-slate-200 mt-4">
                          <span
                            className="h-2 bg-green-400 block rounded-full"
                            style={progressStyleDrivingLicenseImg}
                          ></span>
                        </span>
                        {drivingLicenseImgUploaded && (
                          <div className="mt-2 text-sm">
                            <p>File uploaded successfully.</p>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="col-span-4"> </div>
                    {shouldDeleteDrivingLicenseImg && (
                      <div className="col-span-8 mb-2">
                        <button
                          type="button"
                          onClick={deleteDrivingLicenseImg}
                          className="px-4 py-2 text-xs mb-6 bg-red-500 text-white hover:bg-red-600 rounded-full"
                        >
                          Confirm Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative  gap-4 md:grid-cols-12 col-span-12 md:col-span-12 mb-4 md:mb-6">
                  <div className="md:col-span-12 col-span-12">
                    <label
                      htmlFor="describeAnyOtherConcerns"
                      className="md:text-base"
                    >
                      Use this space to describe any other concerns you may
                      have.
                    </label>
                  </div>
                  <div className="md:col-span-12 col-span-12">
                    <Field
                      type="text"
                      as="textarea"
                      rows="4"
                      name="describeAnyOtherConcerns"
                      id="describeAnyOtherConcerns"
                    />
                    <ErrorMessage
                      name="describeAnyOtherConcerns"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-12 flex gap-4 px-4 xl:px-0">
                <div>
                  <button
                    onClick={() => setStep(step - 1)}
                    type="button"
                    className="button-primary text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                  >
                    Previous
                  </button>
                </div>

                <div>
                  <button
                    type="submit"
                    className="button-primary text-sm bg-green-700 hover:bg-green-800 text-white disabled:cursor-wait disabled:opacity-50 py-2 px-3"
                    disabled={
                      !insuranceCardFrontImgPath ||
                      !insuranceCardBackImgPath ||
                      !drivingLicenseImgPath
                    }
                  >
                    Submit
                  </button>
                </div>
              </div>
            </section>
          </>
        );
        break;

      default:
        return <>Something Went Wrong...</>;
        break;
    }
  };

  return (
    <>
      <Head>
        <title>Child Patient Form Registration | Gwinnett Psychiatry</title>
      </Head>
      <div className="relative">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ values, handleChange, setFieldValue }) => (
            <Form className="st-form">
              {handleStep(values, handleChange, setFieldValue)}
            </Form>
          )}
        </Formik>
        {showSuccessModal && (
          <>
            <div className="max-w-sm w-full max-h-min fixed top-0 left-0 bottom-0 right-0 m-auto bg-white p-10 shadow-[0px_8px_16px_#1E293B1A] rounded z-20">
              <div className="flex flex-col items-center justify-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_605_2)">
                    <path
                      d="M12.5 1.5625C15.4008 1.5625 18.1828 2.71484 20.234 4.76602C22.2852 6.8172 23.4375 9.59919 23.4375 12.5C23.4375 15.4008 22.2852 18.1828 20.234 20.234C18.1828 22.2852 15.4008 23.4375 12.5 23.4375C9.59919 23.4375 6.8172 22.2852 4.76602 20.234C2.71484 18.1828 1.5625 15.4008 1.5625 12.5C1.5625 9.59919 2.71484 6.8172 4.76602 4.76602C6.8172 2.71484 9.59919 1.5625 12.5 1.5625ZM12.5 25C15.8152 25 18.9946 23.683 21.3388 21.3388C23.683 18.9946 25 15.8152 25 12.5C25 9.18479 23.683 6.00537 21.3388 3.66117C18.9946 1.31696 15.8152 0 12.5 0C9.18479 0 6.00537 1.31696 3.66117 3.66117C1.31696 6.00537 0 9.18479 0 12.5C0 15.8152 1.31696 18.9946 3.66117 21.3388C6.00537 23.683 9.18479 25 12.5 25ZM17.7393 9.92676C18.042 9.62402 18.042 9.12598 17.7393 8.82324C17.4365 8.52051 16.9385 8.52051 16.6357 8.82324L10.9375 14.5215L8.36426 11.9482C8.06152 11.6455 7.56348 11.6455 7.26074 11.9482C6.95801 12.251 6.95801 12.749 7.26074 13.0518L10.3857 16.1768C10.6885 16.4795 11.1865 16.4795 11.4893 16.1768L17.7393 9.92676Z"
                      fill="#16A34A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_605_2">
                      <rect width="25" height="25" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p className="text-lg mt-3">Thank you for your submission</p>
                <p className="text-sm mt-1">We will get back to you</p>
                <p className="mt-5">Redirecting...</p>
              </div>
            </div>
            <div className="absolute w-full h-full top-0 left-0 bg-white bg-opacity-60 z-10"></div>
          </>
        )}
      </div>
    </>
  );
};

export default Child;
