import { ErrorMessage, Field, Form, Formik, FieldArray } from "formik";
import { useRef, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { toast } from "react-hot-toast";
// import ReactSignatureCanvas from "react-signature-canvas";
import SignatureCanvas from "react-signature-canvas";

import { stateList } from "@/lib/select-options";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import Select from "react-select";
import Dropzone from "react-dropzone";
import { format } from "date-fns";
import { object, string } from "yup";
import { DocumentTextIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Head from "next/head";

const Adult = () => {
  const [step, setStep] = useState(1);
  const canvasRef = useRef(null);
  const [sign, setSign] = useState();
  const [signData, setSignData] = useState();
  const [hand, setHand] = useState();
  const [handData, setHandData] = useState();
  const [mark, setMark] = useState();
  const [markData, setMarkData] = useState();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const today = "dd/mm/yyyy";

  const [socialSecurity1, setSocialSecurity1] = useState("");
  const [socialSecurity1Error, setSocialSecurity1Error] = useState("");

  const [socialSecurity2, setSocialSecurity2] = useState("");
  const [socialSecurity2Error, setSocialSecurity2Error] = useState("");

  const [socialSecurity3, setSocialSecurity3] = useState("");
  const [socialSecurity3Error, setSocialSecurity3Error] = useState("");

  const [socialSecurity4, setSocialSecurity4] = useState("");
  const [socialSecurity4Error, setSocialSecurity4Error] = useState("");

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
  const [dropError, setDropError] = useState(false);
  const [dragging, setDragging] = useState(false);

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

  const handleSocialSecurity4Change = (event) => {
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
        setSocialSecurity4(formattedSSN);
        setSocialSecurity4Error("");
      } else {
        setSocialSecurity4(formattedValue);
        setSocialSecurity4Error("Invalid format");
      }
    } else {
      setSocialSecurity4(formattedValue);
      setSocialSecurity4Error("");
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

  const handleDateChange = (event) => {
    const { name, value } = event.target;

    const [year, month, day] = value.split("-");
    const formattedDateString = `${month}/${day}/${year}`;
    setDateOfBirthForDatabase(formattedDateString);

    setDateOfBirth(value);

    if (name === "patientDOB") {
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

    if (name === "insuranceCompanyDOB1") {
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

    if (name === "insuranceCompanyDOB2") {
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

  const [patientHomePhone, setPatientHomePhone] = useState("");
  const [patientCellPhone, setPatientCellPhone] = useState("");
  const [patientEmployersPhone, setPatientEmployersPhone] = useState("");
  const [patientSpousesPhone, setPatientSpousesPhone] = useState("");
  const [patientEmergencyPhone, setPatientEmergencyPhone] = useState("");
  const [patientOtherPhone, setPatientOtherPhone] = useState("");
  const [patientOtherEmployersPhone, setPatientOtherEmployersPhone] =
    useState("");
  const [patientReferredPhone, setPatientReferredPhone] = useState("");
  const [patientPhysicianPhone, setPatientPhysicianPhone] = useState("");
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

  const handleHomePhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientHomePhone(formattedNumber);
  };

  const handleCellPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientCellPhone(formattedNumber);
  };

  const handleEmployersPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientEmployersPhone(formattedNumber);
  };

  const handleSpousesPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const formattedNumber = formatPhoneNumber(inputPhoneNumber);

    // Limit input to 10 digits
    const trimmedNumber = inputPhoneNumber.slice(0, 10);
    setPatientSpousesPhone(formattedNumber);
  };

  const handleEmergencyPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientEmergencyPhone(formattedNumber);
  };

  const handleOtherPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientOtherPhone(formattedNumber);
  };

  const handleOtherEmployersPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientOtherEmployersPhone(formattedNumber);
  };

  const handleReferredPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientReferredPhone(formattedNumber);
  };

  const handlePhysicianPhoneChange = (e) => {
    const inputPhoneNumber = e.target.value;
    const numericInput = inputPhoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(numericInput);

    // Limit input to 10 digits
    const trimmedNumber = numericInput.slice(0, 10);
    setPatientPhysicianPhone(formattedNumber);
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
    // Case 2:
    formType: "Adult",
    patientLastName: "",
    patientFirstName: "",
    patientMiddleName: "",
    patientAddress: "",
    patientCity: "",
    patientState: "",
    patientZip: "",
    patientHomePhone: "",
    patientCell: "",
    patientGender: "",
    patientAge: "",
    patientDOB: "",
    patientRace: "",
    patientSocialSecurity: "",
    patientMaritalStatus: "",
    patientEmployersName: "",
    patientEmployersAddress: "",
    patientEmployersPhoneNo: "",
    patientEmployersOccupation: "",
    patientEmploymentStatus: "",
    spousesName: "",
    spousesOccupation: "",
    spousesEmployerName: "",
    spousesEmployerAddress: "",
    spousesEmployersPhoneNo: "",
    spousesEmploymentStatus: "",
    patientEmergencyContact: "",
    patientEmergencyContactPhone: "",
    patientEmergencyReleationship: "",
    patientEmergencyFirstName: "",
    patientEmergencyLastName: "",
    patientEmergencyMiddleName: "",
    patientEmergencyRelationship: "",
    patientEmergencyPhone: "",
    patientReleationship: "",
    otherPaymentPersonName: "",
    otherPaymentPersonAddress: "",
    otherPaymentPersonHomePhone: "",
    otherPaymentPersonCity: "",
    otherPaymentPersonState: "",
    otherPaymentPersonZip: "",
    otherPaymentPersonReleationship: "",
    otherPaymentPersonEmployersName: "",
    otherPaymentPersonEmployersAddress: "",
    otherPaymentPersonEmployersPhoneNo: "",
    otherPaymentPersonSocialSecurity: "",
    otherPaymentPersonOccupation: "",

    doYouHaveInsurance1: "",
    insuranceCompany1: "",
    insuranceCompanyID1: "",
    insuranceCompanyAddress1: "",
    insuranceCompanyCity1: "",
    insuranceCompanyState1: "",
    insuranceCompanyZip1: "",
    insuranceCompanyGroupNoName1: "",
    insuranceCompanySubscriber1: "",
    insuranceCompanyRelationshiptoPatient1: "",
    insuranceCompanyDOB1: "",
    insuranceCompanySocialSecurityNo1: "",

    doYouHaveInsurance2: "",
    insuranceCompany2: "",
    insuranceCompanyID2: "",
    insuranceCompanyAddress2: "",
    insuranceCompanyCity2: "",
    insuranceCompanyState2: "",
    insuranceCompanyZip2: "",
    insuranceCompanyGroupNoName2: "",
    insuranceCompanySubscriber2: "",
    insuranceCompanyRelationshiptoPatient2: "",
    insuranceCompanyDOB2: "",
    insuranceCompanySocialSecurityNo2: "",

    doYouHaveMedicaid: "",
    medicaidNo: "",
    medicaidState: "",
    medicaidEmployersAddress: "",
    referredBy: "",
    referredByPhone: "",
    officeAddress: "",
    officeCity: "",
    officeState: "",
    officeZip: "",
    primaryPersonalPhysician: "",
    primaryPersonalPhysicianHomePhone: "",

    // case 3

    todayDate: today,
    patientWitness: "",
    patientSignature1: "",

    // case 4

    todayDate: today,
    Patientsignature2: "",
    patientPrivacyLastName: "",
    patientPrivacyFirstName: "",
    patientPrivacyMiddleName: "",
    acknowledgePrivacyPolicyExists: "",

    // case 5

    todayDate: today,
    Patientsignature3: "",
    iAmResponsible: "",
    patientResponsibleLastName: "",
    patientResponsibleFirstName: "",
    patientResponsibleMiddleName: "",

    // case 6

    todayDate: today,
    PatientParentsignature: "",
    iHaveRead: "",
    patientFeeLastName: "",
    patientFeeFirstName: "",
    patientFeeMiddleName: "",
    // case 7

    todayDate: today,
    patientCancellationMiddleName: "",
    patientCancellationLastName: "",
    patientCancellationFirstName: "",
    PatientParentsignature1: "",

    //  case 8

    patientpersonalInformationName: "",
    patientpersonalInformationPhone: "",
    patientAddress: "",
    patientDOB: "",
    patientpersonalInformationEmail: "",
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
    patientDOB: "",

    // case 10

    patientName: "",
    patientDOB: "",
    patientBirthplace: "",
    patientGender: "",
    patientRace: "",
    patientRaceDescription: "",
    whoReferredOurPractice: "",
    brieflyDescribeProblem: "",
    whenProblemBegin: "",
    stressCauseContributeToProblem: "",
    stressCauseDescription: "",
    everReceivedOutPatientMentalHealthTreatment: "",

    psychologicalOrIQTesting: [
      {
        psychologicalOrIQTesting_clinicianOrDoctor: "",
        psychologicalOrIQTesting_dateOfEvaluationOrTreatment: "",
        psychologicalOrIQTesting_typeOfEvaluationOrTreatment: "",
        psychologicalOrIQTesting_frequencyOfVisits: "",
      },
    ],

    everReceivedInPatientMentalHealthTreatment: "",
    substanceUseHistory: "",
    ALCOHAL: "",
    alcohalAge: "",
    alcohalFrequency: "",
    alcohalAmountUsed: "",
    alcohalLastUse: "",
    alcohalProblems: "",

    TOBACCO: "",
    tobaccoAge: "",
    tobaccoFrequency: "",
    tobaccoAmountUsed: "",
    tobaccoLastUse: "",
    tobaccoProblems: "",

    MARIJUANA: "",
    marijuanaAge: "",
    marijuanaFrequency: "",
    marijuanaAmountUsed: "",
    marijuanaLastUse: "",
    marijuanaProblems: "",

    COCAINE: "",
    cocaineAge: "",
    cocaineFrequency: "",
    cocaineAmountUsed: "",
    cocaineLastUse: "",
    cocaineProblems: "",

    AMPHETAMINE: "",
    amphetamineAge: "",
    amphetamineFrequency: "",
    amphetamineAmountUsed: "",
    amphetamineLastUse: "",
    amphetamineProblems: "",

    ECSTACY: "",
    ecstacyAge: "",
    ecstacyFrequency: "",
    ecstacyAmountUsed: "",
    ecstacyLastUse: "",
    ecstacyProblems: "",

    LSDACID: "",
    lsdAcidAge: "",
    lsdAcidFrequency: "",
    lsdAcidAmountUsed: "",
    lsdAcidLastUse: "",
    lsdAcidProblems: "",

    OPIATES: "",
    opiatesAge: "",
    opiatesFrequency: "",
    opiatesAmountUsed: "",
    opiatesLastUse: "",
    opiatesProblems: "",

    INHALANTS: "",
    inhalantsAge: "",
    inhalantsFrequency: "",
    inhalantsAmountUsed: "",
    inhalantsLastUse: "",
    inhalantsProblems: "",

    HALLUCINQGENS: "",
    hallucinqgensAge: "",
    hallucinqgensFrequency: "",
    hallucinqgensAmountUsed: "",
    hallucinqgensLastUse: "",
    hallucinqgensProblems: "",

    everReceivedInpatientOrOutpatientSubstanceAbuse: "",
    inpatientOrOutpatientSubstanceAbuse: [
      {
        inpatientOrOutpatientSubstanceAbuse_hospitalDoctorName: "",
        inpatientOrOutpatientSubstanceAbuse_datesOfTreatment: "",
        inpatientOrOutpatientSubstanceAbuse_detoxRehabOrAANA: "",
      },
    ],

    areYouAdopted: "",
    areYouAdoptedDescription: "",
    everReceivedOutPatientMentalHealthTreatment: "",

    historyOfADHDMentalIllnessEtc: "",
    listHistoryOfADHDMentalIllnessEtc: [
      {
        listHistoryOfADHDMentalIllnessEtc_affectedFamilyMember: "",
        listHistoryOfADHDMentalIllnessEtc_typeOfMentalIllnessOrSA: "",
        listHistoryOfADHDMentalIllnessEtc_treatmentIfAny: "",
      },
    ],
    patientMaritalStatuss: "",
    patientMaritalStatussDescription: "",
    anyThatApplyToYourMothersPregnancyWithYou: "",
    mothersAgeAtTimeOfBirth: "",
    fathersAgeAtTimeOfBirth: "",
    wasMotherGivenMedicationOrAnesthesia: "",
    deliveryWas: "",
    anyComplicationsWithLabororDelivery: "",
    anyComplicationsWithLabororDeliveryDescription: "",
    wereYouPremature: "",
    wereYouPrematureDescription: "",
    yourBirthWeightLBS: "",
    yourBirthWeightOZ: "",
    breathingProblems: "",
    cordAroundTheNeck: "",
    abnormalColor: "",
    abnormalTone: "",
    meconium: "",
    failureToThrive: "",
    jaundice: "",
    infection: "",
    motorDevelopment: "",
    speechLanguage: "",
    selfHelpSkills: "",
    primaryResidenceAsChild: "",
    primaryResidenceAsChildDescription: "",
    describeYourHomeEnvironmentAsChild: "",
    otherApplicableInformation: "",
    whosYourFamilyDoctor: "",
    yourLastPhysicalExamination: "",
    currentMedications: "",

    listcurrentMedications: [
      {
        listcurrentMedications_rxName: "",
        listcurrentMedications_dosage: "",
        listcurrentMedications_frequency: "",
        listcurrentMedications_prescribingMD: "",
      },
    ],

    anyCurrentMedicalProblems: "",
    anyCurrentMedicalProblemsDescription: "",
    anyDrugAllergies: "",
    anyDrugAllergiesDescription: "",
    experiencedAnyOfTheFollowingConditions: "",
    cityOfResidence: "",
    nowLivingWith: "",
    nowLivingWithOther: "",
    childrenInFamily: "",

    childrenInFamilyDetails: [
      {
        childrenInFamilyDetails_childrenName: "",
        childrenInFamilyDetails_childrenAge: "",
      },
    ],

    everExperiencedAnyPhysicalAbuse: "",
    everExperiencedAnyPhysicalAbuseDescription: "",

    jobHistory: [
      {
        jobHistory_positionJob: "",
        jobHistory_nameOfEmployer: "",
        jobHistory_datesOfEmployment: "",
        jobHistory_reasonForLeavingJob: "",
      },
    ],

    doYouFindSatisfactionInYourWork: "",

    highestGradeLevelCompleted: "",
    nameOfLastSchoolAttended: "",
    currentAcademicPerformance: "",
    pastAcademicPerformance: "",
    pastBehavioralPerformance: "",
    inAnySpecialEducationPrograms: "",
    inAnySpecialEducationProgramsDescription: "",
    anyKnownLearningDisabilities: "",

    everArrestedOrHadLegalCharges: "",
    everArrestedOrHadLegalChargesDescription: "",
    religiousBeliefs: "",
    religiousBeliefsOther: "",
    religiousBeliefsChristen: "",
    activelyInvolvedInLocalChurch: "",
    prayRegularly: "",
    thePracticeOfYourFaith: "",

    inPatientMentalHealth: [
      {
        inPatientMentalHealth_hospitalName: "",
        inPatientMentalHealth_datesOfTreatment: "",
        inPatientMentalHealth_reasonForHospitalization: "",
      },
    ],

    everTakenPsychiatricMedications: "",

    listEverTakenPsychiatricMedications: [
      {
        listEverTakenPsychiatricMedications_rxName: "",
        listEverTakenPsychiatricMedications_reasonGiven: "",
        listEverTakenPsychiatricMedications_highestDose: "",
        listEverTakenPsychiatricMedications_percentImprovement: "",
        listEverTakenPsychiatricMedications_sideEffects: "",
        listEverTakenPsychiatricMedications_datesTaken: "",
      },
    ],

    everThreatenedOrAttemptedSuicide: "",
    everThreatenedOrAttemptedSuicideDescription: "",
    anyBrainImagingOrFunctionalStudies: "",

    // case 11
    insuranceCardFront: "",
    insuranceCardBack: "",
    drivingLicense: "",
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    const patientRegistrationAdult = {
      patientLastName: values.patientLastName,
      patientFirstName: values.patientFirstName,
      patientMiddleName: values.patientMiddleName,
      patientAddress: values.patientAddress,
      patientCity: values.patientCity,
      patientState: values.patientState,
      patientZip: values.patientZip,
      patientHomePhone: patientHomePhone,
      patientCell: patientCellPhone,
      patientGender: values.patientGender,
      patientAge: values.patientAge,
      patientDOB: dateOfBirthForDatabase,
      patientRace: values.patientRace,
      patientSocialSecurity: socialSecurity1,
      patientMaritalStatus: values.patientMaritalStatus,
      patientEmployersName: values.patientEmployersName,
      patientEmployersAddress: values.patientEmployersAddress,
      patientEmployersPhoneNo: patientEmployersPhone,
      patientEmployersOccupation: values.patientEmployersOccupation,
      patientEmploymentStatus: values.patientEmploymentStatus,
      spousesName: values.spousesName,
      spousesOccupation: values.spousesOccupation,
      spousesEmployerName: values.spousesEmployerName,
      spousesEmployerAddress: values.spousesEmployerAddress,
      spousesEmployersPhoneNo: patientSpousesPhone,
      spousesEmploymentStatus: values.spousesEmploymentStatus,
      patientEmergencyContact: values.patientEmergencyContact,
      patientEmergencyContactPhone: patientEmergencyPhone,
      patientEmergencyReleationship: values.patientEmergencyReleationship,
      patientEmergencyFirstName: values.patientEmergencyFirstName,
      patientEmergencyLastName: values.patientEmergencyLastName,
      patientEmergencyMiddleName: values.patientEmergencyMiddleName,
      patientEmergencyRelationship: values.patientEmergencyRelationship,
      patientEmergencyPhone: values.patientEmergencyPhone,
      patientReleationship: values.patientReleationship,
      otherPaymentPersonName: values.otherPaymentPersonName,
      otherPaymentPersonAddress: values.otherPaymentPersonAddress,
      otherPaymentPersonHomePhone: patientOtherPhone,
      otherPaymentPersonCity: values.otherPaymentPersonCity,
      otherPaymentPersonState: values.otherPaymentPersonState,
      otherPaymentPersonZip: values.otherPaymentPersonZip,
      otherPaymentPersonReleationship: values.otherPaymentPersonReleationship,
      otherPaymentPersonEmployersName: values.otherPaymentPersonEmployersName,
      otherPaymentPersonEmployersAddress:
        values.otherPaymentPersonEmployersAddress,
      otherPaymentPersonEmployersPhoneNo: patientOtherEmployersPhone,
      otherPaymentPersonSocialSecurity: socialSecurity2,
      otherPaymentPersonOccupation: values.otherPaymentPersonOccupation,

      doYouHaveInsurance1: values.doYouHaveInsurance1,
      insuranceCompany1: values.insuranceCompany1,
      insuranceCompanyID1: values.insuranceCompanyID1,
      insuranceCompanyAddress1: values.insuranceCompanyAddress1,
      insuranceCompanyCity1: values.insuranceCompanyCity1,
      insuranceCompanyState1: values.insuranceCompanyState1,
      insuranceCompanyZip1: values.insuranceCompanyZip1,
      insuranceCompanyGroupNoName1: values.insuranceCompanyGroupNoName1,
      insuranceCompanySubscriber1: values.insuranceCompanySubscriber1,
      insuranceCompanyRelationshiptoPatient1:
        values.insuranceCompanyRelationshiptoPatient1,
      insuranceCompanyDOB1: dateOfBirth1ForDatabase,
      insuranceCompanySocialSecurityNo1: socialSecurity3,

      doYouHaveInsurance2: values.doYouHaveInsurance2,
      insuranceCompany2: values.insuranceCompany2,
      insuranceCompanyID2: values.insuranceCompanyID2,
      insuranceCompanyAddress2: values.insuranceCompanyAddress2,
      insuranceCompanyCity2: values.insuranceCompanyCity2,
      insuranceCompanyState2: values.insuranceCompanyState2,
      insuranceCompanyZip2: values.insuranceCompanyZip2,
      insuranceCompanyGroupNoName2: values.insuranceCompanyGroupNoName2,
      insuranceCompanySubscriber2: values.insuranceCompanySubscriber2,
      insuranceCompanyRelationshiptoPatient2:
        values.insuranceCompanyRelationshiptoPatient2,
      insuranceCompanyDOB2: dateOfBirth2ForDatabase,
      insuranceCompanySocialSecurityNo2: socialSecurity4,

      doYouHaveMedicaid: values.doYouHaveMedicaid,
      medicaidNo: values.medicaidNo,
      medicaidState: values.medicaidState,
      medicaidEmployersAddress: values.medicaidEmployersAddress,
      referredBy: values.referredBy,
      referredByPhone: patientReferredPhone,
      officeAddress: values.officeAddress,
      officeCity: values.officeCity,
      officeState: values.officeState,
      officeZip: values.officeZip,
      primaryPersonalPhysician: values.primaryPersonalPhysician,
      primaryPersonalPhysicianHomePhone: patientPhysicianPhone,
    };

    const patientConsentAdult = {
      todayDate: serverTimestamp(),
      patientWitness: values.patientWitness,
      patientSignature1: sign,
    };

    const privacyPolicyAdult = {
      todayDate: serverTimestamp(),
      Patientsignature2: signData,
      patientPrivacyLastName: values.patientPrivacyLastName,
      patientPrivacyFirstName: values.patientPrivacyFirstName,
      patientPrivacyMiddleName: values.patientPrivacyMiddleName,
      acknowledgePrivacyPolicyExists: values.acknowledgePrivacyPolicyExists,
    };

    const responsibilityStmtAdult = {
      todayDate: serverTimestamp(),
      Patientsignature3: hand,
      iAmResponsible: values.iAmResponsible,
      patientResponsibleLastName: values.patientResponsibleLastName,
      patientResponsibleFirstName: values.patientResponsibleFirstName,
      patientResponsibleMiddleName: values.patientResponsibleMiddleName,
    };

    const feeScheduleAdult = {
      todayDate: serverTimestamp(),
      PatientParentsignature: handData,
      iHaveRead: values.iHaveRead,
      patientFeeLastName: values.patientFeeLastName,
      patientFeeFirstName: values.patientFeeFirstName,
      patientFeeMiddleName: values.patientFeeMiddleName,
    };

    const cancellationPolicyAdult = {
      todayDate: serverTimestamp(),
      PatientParentsignature1: mark,
      patientCancellationMiddleName: values.patientCancellationMiddleName,
      patientCancellationLastName: values.patientCancellationLastName,
      patientCancellationFirstName: values.patientCancellationFirstName,
    };

    const demographicAdult = {
      patientpersonalInformationName: values.patientpersonalInformationName,
      patientpersonalInformationPhone: patientPersonalPhone,
      patientAddress: values.patientAddress,
      patientDOB: dateOfBirthForDatabase,
      patientpersonalInformationEmail: values.patientpersonalInformationEmail,
      patientpharmacyName: values.patientpharmacyName,
      patientpharmacyPhone: patientPharmacyPhone,
      patientpharmacyAddress: values.patientpharmacyAddress,
      patientListAllergies: values.patientListAllergies,
    };

    const telepsychiatryAdult = {
      todayDate: serverTimestamp(),
      patientDOB: dateOfBirthForDatabase,
      patientTelepsychiatryLastName: values.patientTelepsychiatryLastName,
      patientTelepsychiatryFirstName: values.patientTelepsychiatryFirstName,
      patientTelepsychiatryMiddleName: values.patientTelepsychiatryMiddleName,
      PatientParentsignature2: markData,
    };

    const questionaireAdult = {
      patientName: values.patientName,
      patientDOB: dateOfBirthForDatabase,
      patientBirthplace: values.patientBirthplace,
      patientGender: values.patientGender,
      patientRace: values.patientRace,
      patientRaceDescription: values.patientRaceDescription,
      whoReferredOurPractice: values.whoReferredOurPractice,
      brieflyDescribeProblem: values.brieflyDescribeProblem,
      whenProblemBegin: values.whenProblemBegin,
      stressCauseContributeToProblem: values.stressCauseContributeToProblem,
      stressCauseDescription: values.stressCauseDescription,
      everReceivedOutPatientMentalHealthTreatment:
        values.everReceivedOutPatientMentalHealthTreatment,

      psychologicalOrIQTesting: values?.psychologicalOrIQTesting || [],

      everReceivedInPatientMentalHealthTreatment:
        values.everReceivedInPatientMentalHealthTreatment,
      substanceUseHistory: values.substanceUseHistory,

      alcohalAge: values.alcohalAge,
      alcohalFrequency: values.alcohalFrequency,
      alcohalAmountUsed: values.alcohalAmountUsed,
      alcohalLastUse: values.alcohalLastUse,
      alcohalProblems: values.alcohalProblems,

      tobaccoAge: values.tobaccoAge,
      tobaccoFrequency: values.tobaccoFrequency,
      tobaccoAmountUsed: values.tobaccoAmountUsed,
      tobaccoLastUse: values.tobaccoLastUse,
      tobaccoProblems: values.tobaccoProblems,

      marijuanaAge: values.marijuanaAge,
      marijuanaFrequency: values.marijuanaFrequency,
      marijuanaAmountUsed: values.marijuanaAmountUsed,
      marijuanaLastUse: values.marijuanaLastUse,
      marijuanaProblems: values.marijuanaProblems,

      cocaineAge: values.cocaineAge,
      cocaineFrequency: values.cocaineFrequency,
      cocaineAmountUsed: values.cocaineAmountUsed,
      cocaineLastUse: values.cocaineLastUse,
      cocaineProblems: values.cocaineProblems,

      amphetamineAge: values.amphetamineAge,
      amphetamineFrequency: values.amphetamineFrequency,
      amphetamineAmountUsed: values.amphetamineAmountUsed,
      amphetamineLastUse: values.amphetamineLastUse,
      amphetamineProblems: values.amphetamineProblems,

      ecstacyAge: values.ecstacyAge,
      ecstacyFrequency: values.ecstacyFrequency,
      ecstacyAmountUsed: values.ecstacyAmountUsed,
      ecstacyLastUse: values.ecstacyLastUse,
      ecstacyProblems: values.ecstacyProblems,

      lsdAcidAge: values.lsdAcidAge,
      lsdAcidFrequency: values.lsdAcidFrequency,
      lsdAcidAmountUsed: values.lsdAcidAmountUsed,
      lsdAcidLastUse: values.lsdAcidLastUse,
      lsdAcidProblems: values.lsdAcidProblems,

      opiatesAge: values.opiatesAge,
      opiatesFrequency: values.opiatesFrequency,
      opiatesAmountUsed: values.opiatesAmountUsed,
      opiatesLastUse: values.opiatesLastUse,
      opiatesProblems: values.opiatesProblems,

      inhalantsAge: values.inhalantsAge,
      inhalantsFrequency: values.inhalantsFrequency,
      inhalantsAmountUsed: values.inhalantsAmountUsed,
      inhalantsLastUse: values.inhalantsLastUse,
      inhalantsProblems: values.inhalantsProblems,

      hallucinqgensAge: values.hallucinqgensAge,
      hallucinqgensFrequency: values.hallucinqgensFrequency,
      hallucinqgensAmountUsed: values.hallucinqgensAmountUsed,
      hallucinqgensLastUse: values.hallucinqgensLastUse,
      hallucinqgensProblems: values.hallucinqgensProblems,

      everReceivedInpatientOrOutpatientSubstanceAbuse:
        values.everReceivedInpatientOrOutpatientSubstanceAbuse,

      inpatientOrOutpatientSubstanceAbuse:
        values?.inpatientOrOutpatientSubstanceAbuse || [],

      areYouAdopted: values.areYouAdopted,
      areYouAdoptedDescription: values.areYouAdoptedDescription,

      historyOfADHDMentalIllnessEtc: values.historyOfADHDMentalIllnessEtc,

      listHistoryOfADHDMentalIllnessEtc:
        values?.listHistoryOfADHDMentalIllnessEtc || [],

      anyThatApplyToYourMothersPregnancyWithYou:
        values.anyThatApplyToYourMothersPregnancyWithYou,
      mothersAgeAtTimeOfBirth: values.mothersAgeAtTimeOfBirth,
      fathersAgeAtTimeOfBirth: values.fathersAgeAtTimeOfBirth,
      wasMotherGivenMedicationOrAnesthesia:
        values.wasMotherGivenMedicationOrAnesthesia,
      deliveryWas: values.deliveryWas,
      anyComplicationsWithLabororDelivery:
        values.anyComplicationsWithLabororDelivery,
      anyComplicationsWithLabororDeliveryDescription:
        values.anyComplicationsWithLabororDeliveryDescription,
      wereYouPremature: values.wereYouPremature,
      wereYouPrematureDescription: values.wereYouPrematureDescription,
      yourBirthWeightLBS: values.yourBirthWeightLBS,
      yourBirthWeightOZ: values.yourBirthWeightOZ,
      breathingProblems: values.breathingProblems,
      cordAroundTheNeck: values.cordAroundTheNeck,
      abnormalColor: values.abnormalColor,
      abnormalTone: values.abnormalTone,
      meconium: values.meconium,
      failureToThrive: values.failureToThrive,
      jaundice: values.jaundice,
      infection: values.infection,
      motorDevelopment: values.motorDevelopment,
      speechLanguage: values.speechLanguage,
      selfHelpSkills: values.selfHelpSkills,
      primaryResidenceAsChild: values.primaryResidenceAsChild,
      primaryResidenceAsChildDescription:
        values.primaryResidenceAsChildDescription,
      describeYourHomeEnvironmentAsChild:
        values.describeYourHomeEnvironmentAsChild,
      otherApplicableInformation: values.otherApplicableInformation,
      whosYourFamilyDoctor: values.whosYourFamilyDoctor,
      yourLastPhysicalExamination: values.yourLastPhysicalExamination,
      currentMedications: values.currentMedications,

      listcurrentMedications: values?.listcurrentMedications || [],

      anyCurrentMedicalProblems: values.anyCurrentMedicalProblems,
      anyCurrentMedicalProblemsDescription:
        values.anyCurrentMedicalProblemsDescription,
      anyDrugAllergies: values.anyDrugAllergies,
      anyDrugAllergiesDescription: values.anyDrugAllergiesDescription,
      experiencedAnyOfTheFollowingConditions:
        values.experiencedAnyOfTheFollowingConditions,
      cityOfResidence: values.cityOfResidence,
      nowLivingWith: values.nowLivingWith,
      nowLivingWithOther: values.nowLivingWithOther,
      childrenInFamily: values.childrenInFamily,

      childrenInFamilyDetails: values?.childrenInFamilyDetails || [],

      patientMaritalStatuss: values.patientMaritalStatuss,
      patientMaritalStatussDescription: values.patientMaritalStatussDescription,
      everExperiencedAnyPhysicalAbuse: values.everExperiencedAnyPhysicalAbuse,
      everExperiencedAnyPhysicalAbuseDescription:
        values.everExperiencedAnyPhysicalAbuseDescription,

      jobHistory: values?.jobHistory || [],

      doYouFindSatisfactionInYourWork: values.doYouFindSatisfactionInYourWork,

      highestGradeLevelCompleted: values.highestGradeLevelCompleted,
      nameOfLastSchoolAttended: values.nameOfLastSchoolAttended,
      currentAcademicPerformance: values.currentAcademicPerformance,
      pastAcademicPerformance: values.pastAcademicPerformance,
      pastBehavioralPerformance: values.pastBehavioralPerformance,
      inAnySpecialEducationPrograms: values.inAnySpecialEducationPrograms,
      inAnySpecialEducationProgramsDescription:
        values.inAnySpecialEducationProgramsDescription,
      anyKnownLearningDisabilities: values.anyKnownLearningDisabilities,

      everArrestedOrHadLegalCharges: values.everArrestedOrHadLegalCharges,
      everArrestedOrHadLegalChargesDescription:
        values.everArrestedOrHadLegalChargesDescription,
      religiousBeliefs: values.religiousBeliefs,
      religiousBeliefsOther: values.religiousBeliefsOther,
      religiousBeliefsChristen: values.religiousBeliefsChristen,
      activelyInvolvedInLocalChurch: values.activelyInvolvedInLocalChurch,
      prayRegularly: values.prayRegularly,
      thePracticeOfYourFaith: values.thePracticeOfYourFaith,

      inPatientMentalHealth: values?.inPatientMentalHealth || [],

      everTakenPsychiatricMedications: values.everTakenPsychiatricMedications,

      listEverTakenPsychiatricMedications:
        values?.listEverTakenPsychiatricMedications || [],

      everThreatenedOrAttemptedSuicide: values.everThreatenedOrAttemptedSuicide,
      everThreatenedOrAttemptedSuicideDescription:
        values.everThreatenedOrAttemptedSuicideDescription,
      anyBrainImagingOrFunctionalStudies:
        values.anyBrainImagingOrFunctionalStudies,
    };

    const insuranceCardDocument = {
      insuranceCardFront: insuranceCardFrontImgPath,
      insuranceCardBack: insuranceCardBackImgPath,
    };

    const drivingLicenseDocument = {
      drivingLicense: drivingLicenseImgPath,
    };

    const formData = {
      patientRegistrationAdult,
      patientConsentAdult,
      privacyPolicyAdult,
      responsibilityStmtAdult,
      feeScheduleAdult,
      cancellationPolicyAdult,
      demographicAdult,
      telepsychiatryAdult,
      questionaireAdult,
      insuranceCardDocument,
      drivingLicenseDocument,
      createdAt: serverTimestamp(),
      formType: "Adult",
    };

    try {
      const newAdultCollectionRef = collection(db, "patientDetails");
      const newDocumentRef = await addDoc(newAdultCollectionRef, formData);

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

  const handleStep = (values, handleChange, isValid, submitCount) => {
    switch (step) {
      case 1:
        return (
          <>
            <section className="max-w-screen-lg px-6 py-12 bg-slate-100 mx-auto">
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
              <div className="col-span-2 px-4  xl:px-0">
                <div>
                  <button
                    onClick={() => setStep(step + 1)}
                    type="button"
                    className="button-primary  text-sm disabled:cursor-wait disabled:opacity-50 py-2 px-3"
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
            <section className="max-w-screen-lg px-6 py-12 bg-slate-100 mx-auto">
              <div>
                <div className=" mb-6  md:gap-6">
                  <div>
                    <h3 className="text-base md:text-lg xl:text-xl font-bold text-center underline decoration-2 underline-offset-4 mb-4 md:mb-8">
                      PATIENT REGISTRATION
                    </h3>
                  </div>
                </div>

                <h3 className="text-base md:text-lg text-center  font-semibold mb-2 md:mb-8 underline underline-offset-4">
                  Patient Name
                </h3>

                <h6 className="md:text-sm text-left font-medium italic mb-2 md:mb-8">
                  Note: Fields marked with * are mandatory.
                </h6>

                <div className="xlmb-12 mb-6 px-4 xl:px-0">
                  <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                    <div className="col-span-12 gap-4 md:col-span-4 relative">
                      <label htmlFor="patientLastName" className="mb-2 md:mb-0">
                        Last
                      </label>
                      <Field
                        type="text"
                        name="patientLastName"
                        id="patientLastName"
                      />
                      <ErrorMessage
                        name="patientLastName"
                        component="p"
                        className="invalid"
                      />
                    </div>

                    <div className="col-span-12  gap-4 md:col-span-4 relative">
                      <label
                        htmlFor="patientFirstName"
                        className="mb-2 md:mb-0"
                      >
                        First
                      </label>
                      <Field
                        type="text"
                        name="patientFirstName"
                        id="patientFirstName"
                      />
                      <ErrorMessage
                        name="patientFirstName"
                        component="p"
                        className="invalid"
                      />
                    </div>

                    <div className="col-span-12 gap-4 md:col-span-4 relative">
                      <label
                        htmlFor="patientMiddleName"
                        className="mb-2 md:mb-0"
                      >
                        Middle
                      </label>
                      <Field
                        type="text"
                        name="patientMiddleName"
                        id="patientMiddleName"
                      />
                      <ErrorMessage
                        name="patientMiddleName"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="patientAddress"
                          className="md:text-base"
                        >
                          Address
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          as="textarea"
                          name="patientAddress"
                          id="patientAddress"
                        />
                        <ErrorMessage
                          name="patientAddress"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                    <div className="col-span-12 gap-4 md:col-span-4 relative">
                      <label htmlFor="patientCity">City</label>
                      <Field type="text" name="patientCity" id="patientCity" />
                      <ErrorMessage
                        name="patientCity"
                        component="p"
                        className="invalid"
                      />
                    </div>

                    <div className="col-span-12  gap-4 md:col-span-4 relative">
                      <label htmlFor="patientState">State</label>

                      <Select
                        name="patientState"
                        id="patientState"
                        options={stateList}
                        className="st-react-select"
                        classNamePrefix="react-select"
                        defaultValue={() => {
                          if (
                            initialValues.patientState &&
                            initialValues.patientState != ""
                          )
                            return {
                              value: initialValues.patientState,
                              label: initialValues.patientState,
                            };
                          else return "";
                        }}
                        onChange={(selectedOption) => {
                          handleChange("patientState")(selectedOption?.value);
                        }}
                      />
                    </div>

                    <div className="col-span-12 gap-4 md:col-span-4 relative">
                      <label htmlFor="patientZip">Zip</label>
                      <Field type="text" name="patientZip" id="patientZip" />
                      <ErrorMessage
                        name="patientZip"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="patientHomePhone"
                          className="md:text-base"
                        >
                          Home Phone No. *
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="tel"
                          name="patientHomePhone"
                          id="patientHomePhone"
                          value={patientHomePhone}
                          onChange={handleHomePhoneChange}
                          maxLength="14" // Including formatting characters
                        />
                        <ErrorMessage
                          name="patientHomePhone"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>

                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label htmlFor="patientCell" className="md:text-base">
                          Cell Phone No. *
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
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
                  </div>

                  <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                    <div className="grid grid-cols-12 col-span-12 gap-4">
                      <div className="col-span-12 md:col-span-12">
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

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label htmlFor="patientDOB" className="md:text-base">
                          Date Of Birth *
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <input
                          type="date"
                          name="patientDOB"
                          id="patientDOB"
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

                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label htmlFor="patientAge" className="md:text-base">
                          Age
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field type="text" name="patientAge" id="patientAge" />
                        <ErrorMessage
                          name="patientAge"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label htmlFor="patientRace" className="md:text-base">
                          Race
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
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

                    <div className="relative gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="patientSocialSecurity"
                          className="md:text-base"
                        >
                          Social Security No.
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <input
                          type="text"
                          name="patientSocialSecurity"
                          id="patientSocialSecurity"
                          value={socialSecurity1}
                          onChange={handleSocialSecurity1Change}
                        />
                        {socialSecurity1Error && (
                          <p className="invalid">{socialSecurity1Error}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-base md:text-lg text-center  font-semibold mb-2 md:mb-8 underline underline-offset-4">
                    Marital Status
                  </h3>

                  <div className="col-span-12 relative mb-4 md:mb-6">
                    <div className="grid grid-cols-10 gap-4">
                      <div className="col-span-10"></div>

                      <div className="flex items-center gap-2 col-span-2">
                        <label>
                          <Field
                            type="radio"
                            value="Single"
                            name="patientMaritalStatus"
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
                            name="patientMaritalStatus"
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
                            name="patientMaritalStatus"
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
                            name="patientMaritalStatus"
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
                            name="patientMaritalStatus"
                            className="mr-2"
                          />
                          Widow
                        </label>
                      </div>

                      <ErrorMessage
                        name="patientMaritalStatus"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="patientEmployersName"
                          className="md:text-base"
                        >
                          Employer&apos;s Name
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="text"
                          name="patientEmployersName"
                          id="patientEmployersName"
                        />
                        <ErrorMessage
                          name="patientEmployersName"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="patientEmployersAddress"
                          className="md:text-base"
                        >
                          Employer&apos;s Address
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          as="textarea"
                          name="patientEmployersAddress"
                          id="patientEmployersAddress"
                        />
                        <ErrorMessage
                          name="patientEmployersAddress"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="patientEmployersPhoneNo"
                          className="md:text-base"
                        >
                          Employer&apos;s Phone No.
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="tel"
                          name="patientEmployersPhoneNo"
                          id="patientEmployersPhoneNo"
                          value={patientEmployersPhone}
                          onChange={handleEmployersPhoneChange}
                          maxLength="14" // Including formatting characters
                        />
                        <ErrorMessage
                          name="patientEmployersPhoneNo"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>

                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="patientEmployersOccupation"
                          className="md:text-base"
                        >
                          Occupation
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="text"
                          name="patientEmployersOccupation"
                          id="patientEmployersOccupation"
                        />
                        <ErrorMessage
                          name="patientEmployersOccupation"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-base md:text-lg text-center  font-semibold mb-2 md:mb-8 underline underline-offset-4">
                    Employment Status
                  </h3>

                  <div className="col-span-10 md:col-span-6 relative mb-4 md:mb-6">
                    <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-6"></div>

                      <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                        <label>
                          <Field
                            type="radio"
                            value="Full Time"
                            name="patientEmploymentStatus"
                            className="mr-2"
                          />
                          Full Time
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                        <label>
                          <Field
                            type="radio"
                            value="Part Time"
                            name="patientEmploymentStatus"
                            className="mr-2"
                          />
                          Part Time
                        </label>
                      </div>
                      <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                        <label>
                          <Field
                            type="radio"
                            value="Retired"
                            name="patientEmploymentStatus"
                            className="mr-2"
                          />
                          Retired
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                        <label>
                          <Field
                            type="radio"
                            value="Unemployed"
                            name="patientEmploymentStatus"
                            className="mr-2"
                          />
                          Unemployed
                        </label>
                      </div>
                      <ErrorMessage
                        name="patientEmploymentStatus"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>

                  {values.patientMaritalStatus === "Married" && (
                    <>
                      <h3 className="text-base md:text-lg  font-semibold mb-2 md:mb-8 underline underline-offset-4">
                        Spouse&apos;s Details
                      </h3>

                      <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                        <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="spousesName"
                              className="md:text-base"
                            >
                              Spouse&apos;s Name
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              type="text"
                              name="spousesName"
                              id="spousesName"
                            />
                            <ErrorMessage
                              name="spousesName"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                        <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="spousesEmployerName"
                              className="md:text-base"
                            >
                              Spouse&apos;s Employer Name
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              type="text"
                              name="spousesEmployerName"
                              id="spousesEmployerName"
                            />
                            <ErrorMessage
                              name="spousesEmployerName"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                        <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="spousesEmployerAddress"
                              className="md:text-base"
                            >
                              Spouse&apos;s Employer Address
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              as="textarea"
                              name="spousesEmployerAddress"
                              id="spousesEmployerAddress"
                            />
                            <ErrorMessage
                              name="spousesEmployerAddress"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                        <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="spousesEmployersPhoneNo"
                              className="md:text-base"
                            >
                              Employer&apos;s Phone No.
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              type="tel"
                              name="spousesEmployersPhoneNo"
                              id="spousesEmployersPhoneNo"
                              value={patientSpousesPhone}
                              onChange={handleSpousesPhoneChange}
                              maxLength="14" // Including formatting characters
                            />
                            <ErrorMessage
                              name="spousesEmployersPhoneNo"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>

                        <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="spousesOccupation"
                              className="md:text-base"
                            >
                              Occupation
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              type="text"
                              name="spousesOccupation"
                              id="spousesOccupation"
                            />
                            <ErrorMessage
                              name="spousesOccupation"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                        <div className="grid grid-cols-6 gap-4">
                          <div className="col-span-6">
                            <label htmlFor="spousesEmploymentStatus">
                              Employment Status
                            </label>
                          </div>

                          <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                            <label>
                              <Field
                                type="radio"
                                value="Full Time"
                                name="spousesEmploymentStatus"
                                className="mr-2"
                              />
                              Full Time
                            </label>
                          </div>

                          <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                            <label>
                              <Field
                                type="radio"
                                value="Part Time"
                                name="spousesEmploymentStatus"
                                className="mr-2"
                              />
                              Part Time
                            </label>
                          </div>
                          <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                            <label>
                              <Field
                                type="radio"
                                value="Retired"
                                name="spousesEmploymentStatus"
                                className="mr-2"
                              />
                              Retired
                            </label>
                          </div>

                          <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                            <label>
                              <Field
                                type="radio"
                                value="Unemployed"
                                name="spousesEmploymentStatus"
                                className="mr-2"
                              />
                              Unemployed
                            </label>
                          </div>
                          <ErrorMessage
                            name="spousesEmploymentStatus"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="patientEmergencyContact"
                          className="md:text-base"
                        >
                          In Case of Emergency Contact Name *
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="text"
                          name="patientEmergencyContact"
                          id="patientEmergencyContact"
                        />
                        <ErrorMessage
                          name="patientEmergencyContact"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>

                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="patientEmergencyContactPhone"
                          className="md:text-base"
                        >
                          Phone No. *
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="tel"
                          name="patientEmergencyContactPhone"
                          id="patientEmergencyContactPhone"
                          value={patientEmergencyPhone}
                          onChange={handleEmergencyPhoneChange}
                          maxLength="14" // Including formatting characters
                        />
                        <ErrorMessage
                          name="patientEmergencyContactPhone"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="patientEmergencyReleationship"
                          className="md:text-base"
                        >
                          Relationship to Patient *
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="text"
                          name="patientEmergencyReleationship"
                          id="patientEmergencyReleationship"
                        />
                        <ErrorMessage
                          name="patientEmergencyReleationship"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-base md:text-lg text-center  font-semibold mb-2 md:mb-8 underline underline-offset-4">
                    Person Responsible for Payment if Different than Above
                  </h3>

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="otherPaymentPersonName"
                          className="md:text-base"
                        >
                          Name
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="text"
                          name="otherPaymentPersonName"
                          id="otherPaymentPersonName"
                        />
                        <ErrorMessage
                          name="otherPaymentPersonName"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="otherPaymentPersonAddress"
                          className="md:text-base"
                        >
                          Address
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          as="textarea"
                          name="otherPaymentPersonAddress"
                          id="otherPaymentPersonAddress"
                        />
                        <ErrorMessage
                          name="otherPaymentPersonAddress"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="otherPaymentPersonHomePhone"
                          className="md:text-base"
                        >
                          Phone No.
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="tel"
                          name="otherPaymentPersonHomePhone"
                          id="otherPaymentPersonHomePhone"
                          value={patientOtherPhone}
                          onChange={handleOtherPhoneChange}
                          maxLength="14" // Including formatting characters
                        />
                        <ErrorMessage
                          name="otherPaymentPersonHomePhone"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                    <div className="col-span-12 gap-4 md:col-span-4 relative">
                      <label htmlFor="otherPaymentPersonCity">City</label>
                      <Field
                        type="text"
                        name="otherPaymentPersonCity"
                        id="otherPaymentPersonCity"
                      />
                      <ErrorMessage
                        name="otherPaymentPersonCity"
                        component="p"
                        className="invalid"
                      />
                    </div>

                    <div className="col-span-12  gap-4 md:col-span-4 relative">
                      <label htmlFor="otherPaymentPersonState">State</label>

                      <Select
                        name="otherPaymentPersonState"
                        id="otherPaymentPersonState"
                        options={stateList}
                        className="st-react-select"
                        classNamePrefix="react-select"
                        defaultValue={() => {
                          if (
                            initialValues.otherPaymentPersonState &&
                            initialValues.otherPaymentPersonState != ""
                          )
                            return {
                              value: initialValues.otherPaymentPersonState,
                              label: initialValues.otherPaymentPersonState,
                            };
                          else return "";
                        }}
                        onChange={(selectedOption) => {
                          handleChange("otherPaymentPersonState")(
                            selectedOption?.value
                          );
                        }}
                      />
                    </div>

                    <div className="col-span-12 gap-4 md:col-span-4 relative">
                      <label htmlFor="otherPaymentPersonZip">Zip</label>
                      <Field
                        type="text"
                        name="otherPaymentPersonZip"
                        id="otherPaymentPersonZip"
                      />
                      <ErrorMessage
                        name="otherPaymentPersonZip"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="otherPaymentPersonReleationship"
                          className="md:text-base"
                        >
                          Relationship to Patient
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="text"
                          name="otherPaymentPersonReleationship"
                          id="otherPaymentPersonReleationship"
                        />
                        <ErrorMessage
                          name="otherPaymentPersonReleationship"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>

                    <div className="relative gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="otherPaymentPersonSocialSecurity"
                          className="md:text-base"
                        >
                          Social Security No.
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <input
                          type="text"
                          name="otherPaymentPersonSocialSecurity"
                          id="otherPaymentPersonSocialSecurity"
                          value={socialSecurity2}
                          onChange={handleSocialSecurity2Change}
                        />
                        {socialSecurity2Error && (
                          <p className="invalid">{socialSecurity2Error}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="otherPaymentPersonEmployersName"
                          className="md:text-base"
                        >
                          Employer&apos;s Name
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="text"
                          name="otherPaymentPersonEmployersName"
                          id="otherPaymentPersonEmployersName"
                        />
                        <ErrorMessage
                          name="otherPaymentPersonEmployersName"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="otherPaymentPersonEmployersPhoneNo"
                          className="md:text-base"
                        >
                          Employer&apos;s Phone No.
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="tel"
                          name="otherPaymentPersonEmployersPhoneNo"
                          id="otherPaymentPersonEmployersPhoneNo"
                          value={patientOtherEmployersPhone}
                          onChange={handleOtherEmployersPhoneChange}
                          maxLength="14" // Including formatting characters
                        />
                        <ErrorMessage
                          name="otherPaymentPersonEmployersPhoneNo"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>

                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="otherPaymentPersonOccupation"
                          className="md:text-base"
                        >
                          Occupation
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="text"
                          name="otherPaymentPersonOccupation"
                          id="otherPaymentPersonOccupation"
                        />
                        <ErrorMessage
                          name="otherPaymentPersonOccupation"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-base md:text-lg text-center  font-semibold mb-2 md:mb-8 underline underline-offset-4">
                    Insurance Information
                  </h3>

                  <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                    <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-6">
                        <label htmlFor="doYouHaveInsurance1">
                          Do you have any primary insurance? *
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                        <label>
                          <Field
                            type="radio"
                            value="Yes"
                            name="doYouHaveInsurance1"
                            className="mr-2"
                          />
                          Yes
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                        <label>
                          <Field
                            type="radio"
                            value="N/A"
                            name="doYouHaveInsurance1"
                            className="mr-2"
                          />
                          N/A
                        </label>
                      </div>
                      <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                        <label>
                          <Field
                            type="radio"
                            value="Self Pay"
                            name="doYouHaveInsurance1"
                            className="mr-2"
                          />
                          Self Pay
                        </label>
                      </div>
                      <ErrorMessage
                        name="doYouHaveInsurance1"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>

                  {values.doYouHaveInsurance1 === "Yes" && (
                    <>
                      <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                        <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="insuranceCompany1"
                              className="md:text-base"
                            >
                              1. Insurance Company *
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              type="text"
                              name="insuranceCompany1"
                              id="insuranceCompany1"
                            />
                            <ErrorMessage
                              name="insuranceCompany1"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                        <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="insuranceCompanyAddress1"
                              className="md:text-base"
                            >
                              Address
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              as="textarea"
                              name="insuranceCompanyAddress1"
                              id="insuranceCompanyAddress1"
                            />
                            <ErrorMessage
                              name="insuranceCompanyAddress1"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="col-span-12 gap-4 md:col-span-4 relative">
                          <label htmlFor="insuranceCompanyCity1">City</label>
                          <Field
                            type="text"
                            name="insuranceCompanyCity1"
                            id="insuranceCompanyCity1"
                          />
                          <ErrorMessage
                            name="insuranceCompanyCity1"
                            component="p"
                            className="invalid"
                          />
                        </div>

                        <div className="col-span-12  gap-4 md:col-span-4 relative">
                          <label htmlFor="insuranceCompanyState1">State</label>

                          <Select
                            name="insuranceCompanyState1"
                            id="insuranceCompanyState1"
                            options={stateList}
                            className="st-react-select"
                            classNamePrefix="react-select"
                            defaultValue={() => {
                              if (
                                initialValues.insuranceCompanyState1 &&
                                initialValues.insuranceCompanyState1 != ""
                              )
                                return {
                                  value: initialValues.insuranceCompanyState1,
                                  label: initialValues.insuranceCompanyState1,
                                };
                              else return "";
                            }}
                            onChange={(selectedOption) => {
                              handleChange("insuranceCompanyState1")(
                                selectedOption?.value
                              );
                            }}
                          />
                        </div>

                        <div className="col-span-12 gap-4 md:col-span-4 relative">
                          <label htmlFor="insuranceCompanyZip1">Zip</label>
                          <Field
                            type="text"
                            name="insuranceCompanyZip1"
                            id="insuranceCompanyZip1"
                          />
                          <ErrorMessage
                            name="insuranceCompanyZip1"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                        <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="insuranceCompanyID1"
                              className="md:text-base"
                            >
                              Member ID No. *
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              type="text"
                              name="insuranceCompanyID1"
                              id="insuranceCompanyID1"
                            />
                            <ErrorMessage
                              name="insuranceCompanyID1"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                        <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="insuranceCompanySubscriber1"
                              className="md:text-base"
                            >
                              Subscriber *
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              type="text"
                              name="insuranceCompanySubscriber1"
                              id="insuranceCompanySubscriber1"
                            />
                            <ErrorMessage
                              name="insuranceCompanySubscriber1"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>

                        <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="insuranceCompanyRelationshiptoPatient1"
                              className="md:text-base"
                            >
                              Relationship to Patient *
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              type="text"
                              name="insuranceCompanyRelationshiptoPatient1"
                              id="insuranceCompanyRelationshiptoPatient1"
                            />
                            <ErrorMessage
                              name="insuranceCompanyRelationshiptoPatient1"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                        <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="insuranceCompanyDOB1"
                              className="md:text-base"
                            >
                              Date Of Birth *
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              type="date"
                              name="insuranceCompanyDOB1"
                              id="insuranceCompanyDOB1"
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

                        <div className="relative gap-4 col-span-6 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="insuranceCompanySocialSecurityNo1"
                              className="md:text-base"
                            >
                              Social Security No.
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <input
                              type="text"
                              name="insuranceCompanySocialSecurityNo1"
                              id="insuranceCompanySocialSecurityNo1"
                              value={socialSecurity3}
                              onChange={handleSocialSecurity3Change}
                            />
                            {socialSecurity3Error && (
                              <p className="invalid">{socialSecurity3Error}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                    <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-6">
                        <label htmlFor="doYouHaveInsurance2">
                          Do you have secondary insurance? *
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                        <label>
                          <Field
                            type="radio"
                            value="Yes"
                            name="doYouHaveInsurance2"
                            className="mr-2"
                          />
                          Yes
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                        <label>
                          <Field
                            type="radio"
                            value="N/A"
                            name="doYouHaveInsurance2"
                            className="mr-2"
                          />
                          N/A
                        </label>
                      </div>
                      <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                        <label>
                          <Field
                            type="radio"
                            value="Self Pay"
                            name="doYouHaveInsurance2"
                            className="mr-2"
                          />
                          Self Pay
                        </label>
                      </div>
                      <ErrorMessage
                        name="doYouHaveInsurance2"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>

                  {values.doYouHaveInsurance2 === "Yes" && (
                    <>
                      <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                        <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="insuranceCompany2"
                              className="md:text-base"
                            >
                              2. Insurance Company *
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              type="text"
                              name="insuranceCompany2"
                              id="insuranceCompany2"
                            />
                            <ErrorMessage
                              name="insuranceCompany2"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                        <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="insuranceCompanyAddress2"
                              className="md:text-base"
                            >
                              Address
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              as="textarea"
                              name="insuranceCompanyAddress2"
                              id="insuranceCompanyAddress2"
                            />
                            <ErrorMessage
                              name="insuranceCompanyAddress2"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="col-span-12 gap-4 md:col-span-4 relative">
                          <label htmlFor="insuranceCompanyCity2">City</label>
                          <Field
                            type="text"
                            name="insuranceCompanyCity2"
                            id="insuranceCompanyCity2"
                          />
                          <ErrorMessage
                            name="insuranceCompanyCity2"
                            component="p"
                            className="invalid"
                          />
                        </div>

                        <div className="col-span-12  gap-4 md:col-span-4 relative">
                          <label htmlFor="insuranceCompanyState2">State</label>

                          <Select
                            name="insuranceCompanyState2"
                            id="insuranceCompanyState2"
                            options={stateList}
                            className="st-react-select"
                            classNamePrefix="react-select"
                            defaultValue={() => {
                              if (
                                initialValues.insuranceCompanyState2 &&
                                initialValues.insuranceCompanyState2 != ""
                              )
                                return {
                                  value: initialValues.insuranceCompanyState2,
                                  label: initialValues.insuranceCompanyState2,
                                };
                              else return "";
                            }}
                            onChange={(selectedOption) => {
                              handleChange("insuranceCompanyState2")(
                                selectedOption?.value
                              );
                            }}
                          />
                        </div>

                        <div className="col-span-12 gap-4 md:col-span-4 relative">
                          <label htmlFor="insuranceCompanyZip2">Zip</label>
                          <Field
                            type="text"
                            name="insuranceCompanyZip2"
                            id="insuranceCompanyZip2"
                          />
                          <ErrorMessage
                            name="insuranceCompanyZip2"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                        <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="insuranceCompanyID2"
                              className="md:text-base"
                            >
                              Member ID No. *
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              type="text"
                              name="insuranceCompanyID2"
                              id="insuranceCompanyID2"
                            />
                            <ErrorMessage
                              name="insuranceCompanyID2"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                        <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="insuranceCompanySubscriber2"
                              className="md:text-base"
                            >
                              Subscriber
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              type="text"
                              name="insuranceCompanySubscriber2"
                              id="insuranceCompanySubscriber2"
                            />
                            <ErrorMessage
                              name="insuranceCompanySubscriber2"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>

                        <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="insuranceCompanyRelationshiptoPatient2"
                              className="md:text-base"
                            >
                              Relationship to Patient
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              type="text"
                              name="insuranceCompanyRelationshiptoPatient2"
                              id="insuranceCompanyRelationshiptoPatient2"
                            />
                            <ErrorMessage
                              name="insuranceCompanyRelationshiptoPatient2"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                        <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="insuranceCompanyDOB2"
                              className="md:text-base"
                            >
                              Date Of Birth
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              type="date"
                              name="insuranceCompanyDOB2"
                              id="insuranceCompanyDOB2"
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

                        <div className="relative gap-4 col-span-6 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="insuranceCompanySocialSecurityNo2"
                              className="md:text-base"
                            >
                              Social Security No.
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <input
                              type="text"
                              name="insuranceCompanySocialSecurityNo2"
                              id="insuranceCompanySocialSecurityNo2"
                              value={socialSecurity4}
                              onChange={handleSocialSecurity4Change}
                            />
                            {socialSecurity4Error && (
                              <p className="invalid">{socialSecurity4Error}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                    <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-6">
                        <label htmlFor="doYouHaveMedicaid">
                          Do you have Medicaid? *
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                        <label>
                          <Field
                            type="radio"
                            value="Yes"
                            name="doYouHaveMedicaid"
                            className="mr-2"
                          />
                          Yes
                        </label>
                      </div>

                      <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                        <label>
                          <Field
                            type="radio"
                            value="N/A"
                            name="doYouHaveMedicaid"
                            className="mr-2"
                          />
                          N/A
                        </label>
                      </div>
                      <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                        <label>
                          <Field
                            type="radio"
                            value="Self Pay"
                            name="doYouHaveMedicaid"
                            className="mr-2"
                          />
                          Self Pay
                        </label>
                      </div>
                      <ErrorMessage
                        name="doYouHaveMedicaid"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>

                  {values.doYouHaveMedicaid === "Yes" && (
                    <>
                      <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                        <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                          <div className="md:col-span-2 col-span-12">
                            <label
                              htmlFor="medicaidNo"
                              className="md:text-base"
                            >
                              Medicaid No. *
                            </label>
                          </div>
                          <div className="md:col-span-4 col-span-12">
                            <Field
                              type="text"
                              name="medicaidNo"
                              id="medicaidNo"
                            />
                            <ErrorMessage
                              name="medicaidNo"
                              component="p"
                              className="invalid"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label htmlFor="referredBy" className="md:text-base">
                          Referred by
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field type="text" name="referredBy" id="referredBy" />
                        <ErrorMessage
                          name="referredBy"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>

                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="referredByPhone"
                          className="md:text-base"
                        >
                          Phone No.
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="tel"
                          name="referredByPhone"
                          id="referredByPhone"
                          value={patientReferredPhone}
                          onChange={handleReferredPhoneChange}
                          maxLength="14" // Including formatting characters
                        />
                        <ErrorMessage
                          name="referredByPhone"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label htmlFor="officeAddress" className="md:text-base">
                          Office Address
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          as="textarea"
                          name="officeAddress"
                          id="officeAddress"
                        />
                        <ErrorMessage
                          name="officeAddress"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                    <div className="col-span-12 gap-4 md:col-span-4 relative">
                      <label htmlFor="officeCity">City</label>
                      <Field type="text" name="officeCity" id="officeCity" />
                      <ErrorMessage
                        name="officeCity"
                        component="p"
                        className="invalid"
                      />
                    </div>

                    <div className="col-span-12  gap-4 md:col-span-4 relative">
                      <label htmlFor="officeState">State</label>

                      <Select
                        name="officeState"
                        id="officeState"
                        options={stateList}
                        className="st-react-select"
                        classNamePrefix="react-select"
                        defaultValue={() => {
                          if (
                            initialValues.officeState &&
                            initialValues.officeState != ""
                          )
                            return {
                              value: initialValues.officeState,
                              label: initialValues.officeState,
                            };
                          else return "";
                        }}
                        onChange={(selectedOption) => {
                          handleChange("officeState")(selectedOption?.value);
                        }}
                      />
                    </div>

                    <div className="col-span-12 gap-4 md:col-span-4 relative">
                      <label htmlFor="officeZip">Zip</label>
                      <Field type="text" name="officeZip" id="officeZip" />
                      <ErrorMessage
                        name="officeZip"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="primaryPersonalPhysician"
                          className="md:text-base"
                        >
                          Primary/Personal Physician
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="text"
                          name="primaryPersonalPhysician"
                          id="primaryPersonalPhysician"
                        />
                        <ErrorMessage
                          name="primaryPersonalPhysician"
                          component="p"
                          className="invalid"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                    <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                      <div className="md:col-span-2 col-span-12">
                        <label
                          htmlFor="primaryPersonalPhysicianHomePhone"
                          className="md:text-base"
                        >
                          Phone No.
                        </label>
                      </div>
                      <div className="md:col-span-4 col-span-12">
                        <Field
                          type="tel"
                          name="primaryPersonalPhysicianHomePhone"
                          id="primaryPersonalPhysicianHomePhone"
                          value={patientPhysicianPhone}
                          onChange={handlePhysicianPhoneChange}
                          maxLength="14" // Including formatting characters
                        />
                        <ErrorMessage
                          name="primaryPersonalPhysicianHomePhone"
                          component="p"
                          className="invalid"
                        />
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
                        values.doYouHaveInsurance1 == "" ||
                        values.doYouHaveInsurance2 == "" ||
                        values.doYouHaveMedicaid == "" ||
                        values.patientGender === "" ||
                        dateOfBirth === "" ||
                        values.patientEmergencyContact === "" ||
                        values.patientEmergencyReleationship === "" ||
                        patientEmergencyPhone === "" ||
                        (!patientHomePhone && !patientCellPhone) // Add this condition
                          ? true
                          : (values.doYouHaveInsurance1 == "Yes" &&
                              (!values.insuranceCompany1 ||
                                !values.insuranceCompanyID1 ||
                                !values.insuranceCompanySubscriber1 ||
                                !values.insuranceCompanyRelationshiptoPatient1 ||
                                !dateOfBirth1)) ||
                            (values.doYouHaveInsurance2 === "Yes" &&
                              (!values.insuranceCompany2 ||
                                !values.insuranceCompanyID2)) ||
                            (values.doYouHaveMedicaid === "Yes" &&
                              !values.medicaidNo)
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
                        {
                          /* <ReactSignatureCanvas
                          ref={canvasRef}
                          canvasProps={{
                            width: 280,
                            height: 120,
                            className:
                              "signatureCanvas mb-4 w-full md:w-[280px] md:h-[120px]",
                          }}
                        /> */
                          <SignatureCanvas
                            ref={(ref) => (canvasRef.current = ref)} // Initialize the canvasRef with the reference to the component
                            canvasProps={{
                              width: 280,
                              height: 120,
                              className:
                                "signatureCanvas mb-4 w-full md:w-[280px] md:h-[120px]",
                            }}
                          />
                        }
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
                  <p className="md:text-base font-medium pl-5 md:pl-0">$75</p>
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
            <section className="max-w-screen-lg px-6 py-12 bg-slate-100 mx-auto">
              <div className="px-4 xl:px-0">
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-center underline decoration-2 underline-offset-4 mb-4 md:mb-8">
                  Patient Demographic for E-Prescribe
                </h3>
                <h3 className="text-base md:text-lg xl:text-xl font-bold text-center underline decoration-2 underline-offset-4 mb-4 md:mb-8">
                  Personal Information
                </h3>
                <div className="grid grid-cols-12 gap-4 mb-4 md:mb-8">
                  <div className="md:col-span-6 col-span-12 relative mb-4 md:mb-6">
                    <div className="md:grid-cols-6 grid-cols-12 gap-4">
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
                        <label htmlFor="patientpersonalInformationPhone">
                          Phone No.
                        </label>
                      </div>
                      <div className="col-span-12 md:col-span-12">
                        <Field
                          type="text"
                          name="patientpersonalInformationPhone"
                          id="patientpersonalInformationPhone"
                          value={patientPersonalPhone}
                          onChange={handlePersonalPhoneChange}
                          maxLength="14" // Including formatting characters
                        />
                        <ErrorMessage
                          name="patientpersonalInformationPhone"
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
                        <label htmlFor="patientDOB">Date of Birth *</label>
                      </div>
                      <div className="col-span-12 md:col-span-12">
                        <Field
                          type="date"
                          name="patientDOB"
                          id="patientDOB"
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
                      <label htmlFor="patientAddress">Address</label>
                    </div>
                    <div className="col-span-12 md:col-span-12">
                      <Field
                        type="text"
                        as="textarea"
                        rows="2"
                        name="patientAddress"
                        id="patientAddress"
                      />
                      <ErrorMessage
                        name="patientAddress"
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
                    <div className="md:grid-cols-6 grid-cols-12 gap-4">
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
                    <div className="grid-cols-12 md:grid-cols-6 gap-4">
                      <div className="cols-span-12 md:col-span-12">
                        <label htmlFor="patientpharmacyPhone">
                          Phone No. *
                        </label>
                      </div>
                      <div className="col-span-12 md:col-span-12">
                        <Field
                          type="text"
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
                  <div className="grid-cols-12 md:grid-cols-6 gap-4">
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
                    <label htmlFor="patientDOB" className="mb-2 md:mb-0">
                      Patient DOB
                    </label>
                    <Field
                      type="date"
                      name="patientDOB"
                      id="patientDOB"
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
            <section className="max-w-screen-lg px-6 py-12 bg-slate-100 mx-auto">
              <div className=" mb-6  md:gap-6">
                <div>
                  <h2 className="text-base md:text-lg xl:text-xl font-bold text-center underline decoration-2 underline-offset-4 mb-4 md:mb-8">
                    ADULT PSYCHIATRIC QUESTIONNAIRE
                  </h2>
                </div>
              </div>

              <div className="xlmb-12 mb-6 px-4 xl:px-0">
                <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                  <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label htmlFor="patientName">Patient Name</label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field type="text" name="patientName" id="patientName" />
                      <ErrorMessage
                        name="patientName"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                  <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label htmlFor="patientDOB" className="md:text-base">
                        Date of Birth
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="date"
                        name="patientDOB"
                        id="patientDOB"
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

                  <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="patientBirthplace"
                        className="md:text-base"
                      >
                        Patient’s Birthplace
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="patientBirthplace"
                        id="patientBirthplace"
                      />
                      <ErrorMessage
                        name="patientBirthplace"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="patientGender">Sex</label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
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

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
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
                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
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

                <div className="col-span-12 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-10 gap-4">
                    <div className="col-span-10">
                      <label htmlFor="patientRace">Race</label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2">
                      <label>
                        <Field
                          type="radio"
                          value="African-American"
                          name="patientRace"
                          className="mr-2"
                        />
                        African-American
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2">
                      <label>
                        <Field
                          type="radio"
                          value="Caucasian"
                          name="patientRace"
                          className="mr-2"
                        />
                        Caucasian
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2">
                      <label>
                        <Field
                          type="radio"
                          value="Hispanic"
                          name="patientRace"
                          className="mr-2"
                        />
                        Hispanic
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2">
                      <label>
                        <Field
                          type="radio"
                          value="Asian"
                          name="patientRace"
                          className="mr-2"
                        />
                        Asian
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2">
                      <label>
                        <Field
                          type="radio"
                          value="Other"
                          name="patientRace"
                          className="mr-2"
                        />
                        Other
                      </label>
                    </div>

                    <ErrorMessage
                      name="patientRace"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                {values.patientRace === "Other" && (
                  <>
                    <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                      <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                        <div className="md:col-span-2 col-span-12">
                          <label
                            htmlFor="patientRaceDescription"
                            className="md:text-base"
                          >
                            Other
                          </label>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                          <Field
                            type="text"
                            name="patientRaceDescription"
                            id="patientRaceDescription"
                          />
                          <ErrorMessage
                            name="patientRaceDescription"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                  <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label htmlFor="whoReferredOurPractice">
                        {" "}
                        Who referred you to our practice?
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="whoReferredOurPractice"
                        id="whoReferredOurPractice"
                      />
                      <ErrorMessage
                        name="whoReferredOurPractice"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                  <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label htmlFor="brieflyDescribeProblem">
                        {" "}
                        Please briefly describe the problem(s) for which you are
                        seeking help:
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        as="textarea"
                        row="4"
                        name="brieflyDescribeProblem"
                        id="brieflyDescribeProblem"
                      />
                      <ErrorMessage
                        name="brieflyDescribeProblem"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                  <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label htmlFor="whenProblemBegin">
                        {" "}
                        Proximately when did the problem(s) begin?
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="whenProblemBegin"
                        id="whenProblemBegin"
                      />
                      <ErrorMessage
                        name="whenProblemBegin"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="stressCauseContributeToProblem">
                        {" "}
                        Any known stress or cause contribute to the problem(s)?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="stressCauseContributeToProblem"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="stressCauseContributeToProblem"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="stressCauseContributeToProblem"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                {values.stressCauseContributeToProblem === "Yes" && (
                  <>
                    <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                      <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="md:col-span-2 col-span-12">
                          <label htmlFor="stressCauseDescription">
                            {" "}
                            please describe stress:
                          </label>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                          <Field
                            as="textarea"
                            row="4"
                            name="stressCauseDescription"
                            id="stressCauseDescription"
                          />
                          <ErrorMessage
                            name="stressCauseDescription"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="everReceivedOutPatientMentalHealthTreatment">
                        {" "}
                        Have you ever received outpatient mental health
                        treatment?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="everReceivedOutPatientMentalHealthTreatment"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="everReceivedOutPatientMentalHealthTreatment"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="everReceivedOutPatientMentalHealthTreatment"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12">
                  {values.everReceivedOutPatientMentalHealthTreatment ===
                    "Yes" && (
                    <>
                      <label
                        htmlFor="psychologicalOrIQTestingLabel"
                        className="mb-4"
                      >
                        please list in order, including Psychological or
                        IQ/School testing:
                      </label>
                      <FieldArray name="psychologicalOrIQTesting">
                        {({
                          insert,
                          remove,
                          push,
                          form: { setFieldValue },
                        }) => (
                          <div>
                            {values.psychologicalOrIQTesting.length > 0 &&
                              values.psychologicalOrIQTesting.map(
                                (add, index) => (
                                  <div
                                    className="grid grid-cols-12 gap-6 col-span-12 relative"
                                    key={index}
                                  >
                                    <div className="col-span-12 md:col-span-3">
                                      <label
                                        htmlFor={`psychologicalOrIQTesting.${index}.psychologicalOrIQTesting_clinicianOrDoctor`}
                                      >
                                        Clinician/Doctor
                                      </label>
                                      <Field
                                        name={`psychologicalOrIQTesting.${index}.psychologicalOrIQTesting_clinicianOrDoctor`}
                                        id={`psychologicalOrIQTesting.${index}.psychologicalOrIQTesting_clinicianOrDoctor`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`psychologicalOrIQTesting.${index}.psychologicalOrIQTesting_clinicianOrDoctor`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>
                                    <div className="col-span-12 md:col-span-3">
                                      <label
                                        htmlFor={`psychologicalOrIQTesting.${index}.psychologicalOrIQTesting_dateOfEvaluationOrTreatment`}
                                      >
                                        Date of Evaluation or Treatment
                                      </label>

                                      <Field
                                        name={`psychologicalOrIQTesting.${index}.psychologicalOrIQTesting_dateOfEvaluationOrTreatment`}
                                        id={`psychologicalOrIQTesting.${index}.psychologicalOrIQTesting_dateOfEvaluationOrTreatment`}
                                        type="date"
                                      />
                                      <ErrorMessage
                                        name={`psychologicalOrIQTesting.${index}.psychologicalOrIQTesting_width`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-12 md:col-span-3">
                                      <label
                                        htmlFor={`psychologicalOrIQTesting.${index}.psychologicalOrIQTesting_typeOfEvaluationOrTreatment`}
                                      >
                                        Type of Evaluation or Treatment
                                      </label>
                                      <Field
                                        name={`psychologicalOrIQTesting.${index}.psychologicalOrIQTesting_typeOfEvaluationOrTreatment`}
                                        id={`psychologicalOrIQTesting.${index}.psychologicalOrIQTesting_typeOfEvaluationOrTreatment`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`psychologicalOrIQTesting.${index}.psychologicalOrIQTesting_typeOfEvaluationOrTreatment`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-12 md:col-span-3">
                                      <label
                                        htmlFor={`psychologicalOrIQTesting.${index}.psychologicalOrIQTesting_frequencyOfVisits`}
                                      >
                                        Frequency of visits
                                      </label>
                                      <Field
                                        name={`psychologicalOrIQTesting.${index}.psychologicalOrIQTesting_frequencyOfVisits`}
                                        id={`psychologicalOrIQTesting.${index}.psychologicalOrIQTesting_frequencyOfVisits`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`psychologicalOrIQTesting.${index}.psychologicalOrIQTesting_frequencyOfVisits`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-12 relative text-right mt-8">
                                      <button
                                        type="button"
                                        className="bg-transparent text-blue-700 text-sm  py-2 px-3"
                                        onClick={() => remove(index)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                )
                              )}

                            <button
                              type="button"
                              className="bg-transparent text-blue-700 text-sm  py-2 px-3"
                              onClick={() =>
                                push({
                                  psychologicalOrIQTesting_clinicianOrDoctor:
                                    "",
                                  psychologicalOrIQTesting_dateOfEvaluationOrTreatment:
                                    "",
                                  psychologicalOrIQTesting_typeOfEvaluationOrTreatment:
                                    "",
                                  psychologicalOrIQTesting_frequencyOfVisits:
                                    "",
                                })
                              }
                            >
                              Add
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </>
                  )}
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="everReceivedInPatientMentalHealthTreatment">
                        {" "}
                        Have you ever received inpatient mental health
                        treatment?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="everReceivedInPatientMentalHealthTreatment"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="everReceivedInPatientMentalHealthTreatment"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="everReceivedInPatientMentalHealthTreatment"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12">
                  {values.everReceivedInPatientMentalHealthTreatment ===
                    "Yes" && (
                    <>
                      <label
                        htmlFor="inPatientMentalHealthLabel"
                        className="mb-4"
                      >
                        please list in order:
                      </label>
                      <FieldArray name="inPatientMentalHealth">
                        {({
                          insert,
                          remove,
                          push,
                          form: { setFieldValue },
                        }) => (
                          <div>
                            {values.inPatientMentalHealth.length > 0 &&
                              values.inPatientMentalHealth.map((add, index) => (
                                <div
                                  className="grid grid-cols-12 gap-6 col-span-12 relative"
                                  key={index}
                                >
                                  <div className="col-span-12 md:col-span-4">
                                    <label
                                      htmlFor={`inPatientMentalHealth.${index}.inPatientMentalHealth_hospitalName`}
                                    >
                                      Hospital Name
                                    </label>
                                    <Field
                                      name={`inPatientMentalHealth.${index}.inPatientMentalHealth_hospitalName`}
                                      id={`inPatientMentalHealth.${index}.inPatientMentalHealth_hospitalName`}
                                      type="text"
                                    />
                                    <ErrorMessage
                                      name={`inPatientMentalHealth.${index}.inPatientMentalHealth_hospitalName`}
                                      component="div"
                                      className="field-error"
                                    />
                                  </div>
                                  <div className="col-span-12 md:col-span-4 ">
                                    <label
                                      htmlFor={`inPatientMentalHealth.${index}.inPatientMentalHealth_datesOfTreatment`}
                                    >
                                      Dates of Treatment
                                    </label>

                                    <Field
                                      name={`inPatientMentalHealth.${index}.inPatientMentalHealth_datesOfTreatment`}
                                      id={`inPatientMentalHealth.${index}.inPatientMentalHealth_datesOfTreatment`}
                                      type="date"
                                    />
                                    <ErrorMessage
                                      name={`inPatientMentalHealth.${index}.inPatientMentalHealth_width`}
                                      component="div"
                                      className="field-error"
                                    />
                                  </div>

                                  <div className="col-span-12 md:col-span-4">
                                    <label
                                      htmlFor={`inPatientMentalHealth.${index}.inPatientMentalHealth_reasonForHospitalization`}
                                    >
                                      Reason for Hospitalization
                                    </label>
                                    <Field
                                      name={`inPatientMentalHealth.${index}.inPatientMentalHealth_reasonForHospitalization`}
                                      id={`inPatientMentalHealth.${index}.inPatientMentalHealth_reasonForHospitalization`}
                                      type="text"
                                    />
                                    <ErrorMessage
                                      name={`inPatientMentalHealth.${index}.inPatientMentalHealth_reasonForHospitalization`}
                                      component="div"
                                      className="field-error"
                                    />
                                  </div>

                                  <div className="col-span-12 relative text-right mt-8">
                                    <button
                                      type="button"
                                      className="bg-transparent text-blue-700 text-sm  py-2 px-3"
                                      onClick={() => remove(index)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))}

                            <button
                              type="button"
                              className="bg-transparent text-blue-700 text-sm  py-2 px-3"
                              onClick={() =>
                                push({
                                  inPatientMentalHealth_hospitalName: "",
                                  inPatientMentalHealth_datesOfTreatment: "",
                                  inPatientMentalHealth_reasonForHospitalization:
                                    "",
                                })
                              }
                            >
                              Add
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </>
                  )}
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="everTakenPsychiatricMedications">
                        {" "}
                        Have you ever taken psychiatric medications?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Applicable"
                          name="everTakenPsychiatricMedications"
                          className="mr-2"
                        />
                        Applicable
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Not Applicable"
                          name="everTakenPsychiatricMedications"
                          className="mr-2"
                        />
                        Not Applicable
                      </label>
                    </div>

                    <ErrorMessage
                      name="everTakenPsychiatricMedications"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12">
                  {values.everTakenPsychiatricMedications === "Applicable" && (
                    <>
                      <label
                        htmlFor="listEverTakenPsychiatricMedicationsLabel"
                        className="mb-4"
                      >
                        please list them below:
                      </label>
                      <FieldArray name="listEverTakenPsychiatricMedications">
                        {({
                          insert,
                          remove,
                          push,
                          form: { setFieldValue },
                        }) => (
                          <div>
                            {values.listEverTakenPsychiatricMedications.length >
                              0 &&
                              values.listEverTakenPsychiatricMedications.map(
                                (add, index) => (
                                  <div
                                    className="grid grid-cols-12 gap-6 col-span-12 relative"
                                    key={index}
                                  >
                                    <div className="col-span-12 md:col-span-2 ">
                                      <label
                                        htmlFor={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_rxName`}
                                      >
                                        Rx Name
                                      </label>
                                      <Field
                                        name={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_rxName`}
                                        id={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_rxName`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_rxName`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-12 md:col-span-2 ">
                                      <label
                                        htmlFor={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_reasonGiven`}
                                      >
                                        Reason Given
                                      </label>

                                      <Field
                                        name={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_reasonGiven`}
                                        id={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_reasonGiven`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_width`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-12 md:col-span-2">
                                      <label
                                        htmlFor={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_highestDose`}
                                      >
                                        Highest Dose
                                      </label>
                                      <Field
                                        name={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_highestDose`}
                                        id={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_highestDose`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_highestDose`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-12 md:col-span-2">
                                      <label
                                        htmlFor={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_percentImprovement`}
                                      >
                                        % Improvement
                                      </label>
                                      <Field
                                        name={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_percentImprovement`}
                                        id={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_percentImprovement`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_percentImprovement`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-12 md:col-span-2">
                                      <label
                                        htmlFor={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_sideEffects`}
                                      >
                                        Side-effects
                                      </label>
                                      <Field
                                        name={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_sideEffects`}
                                        id={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_sideEffects`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_sideEffects`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-12 md:col-span-2">
                                      <label
                                        htmlFor={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_datesTaken`}
                                      >
                                        Dates Taken
                                      </label>
                                      <Field
                                        name={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_datesTaken`}
                                        id={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_datesTaken`}
                                        type="date"
                                      />
                                      <ErrorMessage
                                        name={`listEverTakenPsychiatricMedications.${index}.listEverTakenPsychiatricMedications_datesTaken`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-12 relative text-right mt-8">
                                      <button
                                        type="button"
                                        className="bg-transparent text-blue-700 text-sm  py-2 px-3"
                                        onClick={() => remove(index)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                )
                              )}

                            <button
                              type="button"
                              className="bg-transparent text-blue-700 text-sm  py-2 px-3"
                              onClick={() =>
                                push({
                                  listEverTakenPsychiatricMedications_rxName:
                                    "",
                                  listEverTakenPsychiatricMedications_reasonGiven:
                                    "",
                                  listEverTakenPsychiatricMedications_highestDose:
                                    "",
                                  listEverTakenPsychiatricMedications_percentImprovement:
                                    "",
                                  listEverTakenPsychiatricMedications_sideEffects:
                                    "",
                                  listEverTakenPsychiatricMedications_datesTaken:
                                    "",
                                })
                              }
                            >
                              Add
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </>
                  )}
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="everThreatenedOrAttemptedSuicide">
                        {" "}
                        Have you ever threatened or attempted suicide?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="everThreatenedOrAttemptedSuicide"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="everThreatenedOrAttemptedSuicide"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="everThreatenedOrAttemptedSuicide"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                {values.everThreatenedOrAttemptedSuicide === "Yes" && (
                  <>
                    <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                      <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="md:col-span-2 col-span-12">
                          <label htmlFor="everThreatenedOrAttemptedSuicideDescription">
                            {" "}
                            please describe:
                          </label>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                          <Field
                            as="textarea"
                            row="4"
                            name="everThreatenedOrAttemptedSuicideDescription"
                            id="everThreatenedOrAttemptedSuicideDescription"
                          />
                          <ErrorMessage
                            name="everThreatenedOrAttemptedSuicideDescription"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="anyBrainImagingOrFunctionalStudies">
                        {" "}
                        Have you ever had any brain imaging or functional
                        studies? (MRI, CAT scan, EEG, etc.)
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="anyBrainImagingOrFunctionalStudies"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="anyBrainImagingOrFunctionalStudies"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="anyBrainImagingOrFunctionalStudies"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <p className="md:text-base font-bold  mb-4 md:mb-6">
                  <span className="underline underline-offset-4">
                    Substance Use History{" "}
                  </span>

                  <span className="text-sm font-light italic">
                    (ALCOHOL, TOBACCO, MARIJUANA, COCAINE, AMPHETAMINE, ECSTACY,
                    LSD/ ACID, OPIATES, INHALANTS, HALLUCINQGENS(mushrooms, PCP,
                    etc))
                  </span>
                </p>
                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="substanceUseHistory"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="substanceUseHistory"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>

                <ErrorMessage
                  name="substanceUseHistory"
                  component="p"
                  className="invalid"
                />

                {values.substanceUseHistory === "Yes" && (
                  <>
                    <h3 className="text-base text-left font-medium col-span-12 mb-8">
                      • Please describe your past or current use of any of the
                      following substances:
                    </h3>
                    <div className="relative  gap-4 grid grid-cols-10 col-span-10 mb-4 md:mb-6">
                      <div className="grid grid-cols-12 md:col-span-12 col-span-12">
                        <Field type="checkbox" name="ALCOHOL" id="ALCOHOL" />
                        <label htmlFor="ALCOHOL" className="md:text-base">
                          ALCOHOL
                        </label>
                        <ErrorMessage
                          name="ALCOHOL"
                          component="p"
                          className="invalid"
                        />
                      </div>
                      {values.ALCOHOL === true && (
                        <>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="alcohalAge"
                                className="md:text-base"
                              >
                                Age at 1st use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="alcohalAge"
                                id="alcohalAge"
                              />
                              <ErrorMessage
                                name="alcohalAge"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="alcohalFrequency"
                                className="md:text-base"
                              >
                                Frequency of use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="alcohalFrequency"
                                id="alcohalFrequency"
                              />
                              <ErrorMessage
                                name="alcohalFrequency"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="alcohalAmountUsed"
                                className="md:text-base"
                              >
                                Amount used
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="alcohalAmountUsed"
                                id="alcohalAmountUsed"
                              />
                              <ErrorMessage
                                name="alcohalAmountUsed"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="alcohalLastUse"
                                className="md:text-base"
                              >
                                Last use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="alcohalLastUse"
                                id="alcohalLastUse"
                              />
                              <ErrorMessage
                                name="alcohalLastUse"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="alcohalProblems"
                                className="md:text-base"
                              >
                                Problems
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="alcohalProblems"
                                id="alcohalProblems"
                              />
                              <ErrorMessage
                                name="alcohalProblems"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="relative  gap-4 grid grid-cols-10 col-span-10 mb-4 md:mb-6">
                      <div className="grid grid-cols-12 md:col-span-12 col-span-12">
                        <Field type="checkbox" name="TOBACCO" id="TOBACCO" />
                        <label htmlFor="TOBACCO" className="md:text-base">
                          TOBACCO
                        </label>
                        <ErrorMessage
                          name="TOBACCO"
                          component="p"
                          className="invalid"
                        />
                      </div>
                      {values.TOBACCO === true && (
                        <>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="tobaccoAge"
                                className="md:text-base"
                              >
                                Age at 1st use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="tobaccoAge"
                                id="tobaccoAge"
                              />
                              <ErrorMessage
                                name="tobaccoAge"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="tobaccoFrequency"
                                className="md:text-base"
                              >
                                Frequency of use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="tobaccoFrequency"
                                id="tobaccoFrequency"
                              />
                              <ErrorMessage
                                name="tobaccoFrequency"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="tobaccoAmountUsed"
                                className="md:text-base"
                              >
                                Amount used
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="tobaccoAmountUsed"
                                id="tobaccoAmountUsed"
                              />
                              <ErrorMessage
                                name="tobaccoAmountUsed"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="tobaccoLastUse"
                                className="md:text-base"
                              >
                                Last use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="tobaccoLastUse"
                                id="tobaccoLastUse"
                              />
                              <ErrorMessage
                                name="tobaccoLastUse"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="tobaccoProblems"
                                className="md:text-base"
                              >
                                Problems
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="tobaccoProblems"
                                id="tobaccoProblems"
                              />
                              <ErrorMessage
                                name="tobaccoProblems"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="relative  gap-4 grid grid-cols-10 col-span-10 mb-4 md:mb-6">
                      <div className=" grid grid-cols-12 md:col-span-12 col-span-12">
                        <Field
                          type="checkbox"
                          name="MARIJUANA"
                          id="MARIJUANA"
                        />
                        <label htmlFor="MARIJUANA" className="md:text-base">
                          MARIJUANA
                        </label>
                        <ErrorMessage
                          name="MARIJUANA"
                          component="p"
                          className="invalid"
                        />
                      </div>
                      {values.MARIJUANA === true && (
                        <>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="marijuanaAge"
                                className="md:text-base"
                              >
                                Age at 1st use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="marijuanaAge"
                                id="marijuanaAge"
                              />
                              <ErrorMessage
                                name="marijuanaAge"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="marijuanaFrequency"
                                className="md:text-base"
                              >
                                Frequency of use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="marijuanaFrequency"
                                id="marijuanaFrequency"
                              />
                              <ErrorMessage
                                name="marijuanaFrequency"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="marijuanaAmountUsed"
                                className="md:text-base"
                              >
                                Amount used
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="marijuanaAmountUsed"
                                id="marijuanaAmountUsed"
                              />
                              <ErrorMessage
                                name="marijuanaAmountUsed"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="marijuanaLastUse"
                                className="md:text-base"
                              >
                                Last use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="marijuanaLastUse"
                                id="marijuanaLastUse"
                              />
                              <ErrorMessage
                                name="marijuanaLastUse"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="marijuanaProblems"
                                className="md:text-base"
                              >
                                Problems
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="marijuanaProblems"
                                id="marijuanaProblems"
                              />
                              <ErrorMessage
                                name="marijuanaProblems"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="relative  gap-4 grid grid-cols-10 col-span-10 mb-4 md:mb-6">
                      <div className="grid grid-cols-12 md:col-span-12 col-span-12">
                        <Field type="checkbox" name="COCAINE" id="COCAINE" />
                        <label htmlFor="COCAINE" className="md:text-base">
                          COCAINE
                        </label>
                        <ErrorMessage
                          name="COCAINE"
                          component="p"
                          className="invalid"
                        />
                      </div>
                      {values.COCAINE === true && (
                        <>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="cocaineAge"
                                className="md:text-base"
                              >
                                Age at 1st use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="cocaineAge"
                                id="cocaineAge"
                              />
                              <ErrorMessage
                                name="cocaineAge"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="cocaineFrequency"
                                className="md:text-base"
                              >
                                Frequency of use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="cocaineFrequency"
                                id="cocaineFrequency"
                              />
                              <ErrorMessage
                                name="cocaineFrequency"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="cocaineAmountUsed"
                                className="md:text-base"
                              >
                                Amount used
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="cocaineAmountUsed"
                                id="cocaineAmountUsed"
                              />
                              <ErrorMessage
                                name="cocaineAmountUsed"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="cocaineLastUse"
                                className="md:text-base"
                              >
                                Last use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="cocaineLastUse"
                                id="cocaineLastUse"
                              />
                              <ErrorMessage
                                name="cocaineLastUse"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="cocaineProblems"
                                className="md:text-base"
                              >
                                Problems
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="cocaineProblems"
                                id="cocaineProblems"
                              />
                              <ErrorMessage
                                name="cocaineProblems"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="relative  gap-4 grid grid-cols-10 col-span-10 mb-4 md:mb-6">
                      <div className="grid grid-cols-12 md:col-span-12 col-span-12">
                        <Field
                          type="checkbox"
                          name="AMPHETAMINE"
                          id="AMPHETAMINE"
                        />
                        <label htmlFor="AMPHETAMINE" className="md:text-base">
                          AMPHETAMINE
                        </label>
                        <ErrorMessage
                          name="AMPHETAMINE"
                          component="p"
                          className="invalid"
                        />
                      </div>
                      {values.AMPHETAMINE === true && (
                        <>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="amphetamineAge"
                                className="md:text-base"
                              >
                                Age at 1st use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="amphetamineAge"
                                id="amphetamineAge"
                              />
                              <ErrorMessage
                                name="amphetamineAge"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="amphetamineFrequency"
                                className="md:text-base"
                              >
                                Frequency of use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="amphetamineFrequency"
                                id="amphetamineFrequency"
                              />
                              <ErrorMessage
                                name="amphetamineFrequency"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="amphetamineAmountUsed"
                                className="md:text-base"
                              >
                                Amount used
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="amphetamineAmountUsed"
                                id="amphetamineAmountUsed"
                              />
                              <ErrorMessage
                                name="amphetamineAmountUsed"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="amphetamineLastUse"
                                className="md:text-base"
                              >
                                Last use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="amphetamineLastUse"
                                id="amphetamineLastUse"
                              />
                              <ErrorMessage
                                name="amphetamineLastUse"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="amphetamineProblems"
                                className="md:text-base"
                              >
                                Problems
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="amphetamineProblems"
                                id="amphetamineProblems"
                              />
                              <ErrorMessage
                                name="amphetamineProblems"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="relative  gap-4 grid grid-cols-10 col-span-10 mb-4 md:mb-6">
                      <div className="grid grid-cols-12 md:col-span-12 col-span-12">
                        <Field type="checkbox" name="ECSTACY" id="ECSTACY" />
                        <label htmlFor="ECSTACY" className="md:text-base">
                          ECSTACY
                        </label>
                        <ErrorMessage
                          name="ECSTACY"
                          component="p"
                          className="invalid"
                        />
                      </div>
                      {values.ECSTACY === true && (
                        <>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="ecstacyAge"
                                className="md:text-base"
                              >
                                Age at 1st use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="ecstacyAge"
                                id="ecstacyAge"
                              />
                              <ErrorMessage
                                name="ecstacyAge"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="ecstacyFrequency"
                                className="md:text-base"
                              >
                                Frequency of use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="ecstacyFrequency"
                                id="ecstacyFrequency"
                              />
                              <ErrorMessage
                                name="ecstacyFrequency"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="ecstacyAmountUsed"
                                className="md:text-base"
                              >
                                Amount used
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="ecstacyAmountUsed"
                                id="ecstacyAmountUsed"
                              />
                              <ErrorMessage
                                name="ecstacyAmountUsed"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="ecstacyLastUse"
                                className="md:text-base"
                              >
                                Last use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="ecstacyLastUse"
                                id="ecstacyLastUse"
                              />
                              <ErrorMessage
                                name="ecstacyLastUse"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="ecstacyProblems"
                                className="md:text-base"
                              >
                                Problems
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="ecstacyProblems"
                                id="ecstacyProblems"
                              />
                              <ErrorMessage
                                name="ecstacyProblems"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="relative  gap-4 grid grid-cols-10 col-span-10 mb-4 md:mb-6">
                      <div className="grid grid-cols-12 md:col-span-12 col-span-12">
                        <Field type="checkbox" name="SDACID" id="SDACID" />

                        <label htmlFor="SDACID" className="md:text-base">
                          SD/ACID
                        </label>

                        <ErrorMessage
                          name="SDACID"
                          component="p"
                          className="invalid"
                        />
                      </div>

                      {values.SDACID === true && (
                        <>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="lsdAcidAge"
                                className="md:text-base"
                              >
                                Age at 1st use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="lsdAcidAge"
                                id="lsdAcidAge"
                              />
                              <ErrorMessage
                                name="lsdAcidAge"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="lsdAcidFrequency"
                                className="md:text-base"
                              >
                                Frequency of use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="lsdAcidFrequency"
                                id="lsdAcidFrequency"
                              />
                              <ErrorMessage
                                name="lsdAcidFrequency"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="lsdAcidAmountUsed"
                                className="md:text-base"
                              >
                                Amount used
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="lsdAcidAmountUsed"
                                id="lsdAcidAmountUsed"
                              />
                              <ErrorMessage
                                name="lsdAcidAmountUsed"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="lsdAcidLastUse"
                                className="md:text-base"
                              >
                                Last use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="lsdAcidLastUse"
                                id="lsdAcidLastUse"
                              />
                              <ErrorMessage
                                name="lsdAcidLastUse"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="lsdAcidProblems"
                                className="md:text-base"
                              >
                                Problems
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="lsdAcidProblems"
                                id="lsdAcidProblems"
                              />
                              <ErrorMessage
                                name="lsdAcidProblems"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="relative  gap-4 grid grid-cols-10 col-span-10 mb-4 md:mb-6">
                      <div className="grid grid-cols-12 md:col-span-12 col-span-12">
                        <Field type="checkbox" name="OPIATES" id="OPIATES" />
                        <label htmlFor="OPIATES" className="md:text-base">
                          OPIATES
                        </label>
                        <ErrorMessage
                          name="OPIATES"
                          component="p"
                          className="invalid"
                        />
                      </div>
                      {values.OPIATES === true && (
                        <>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="opiatesAge"
                                className="md:text-base"
                              >
                                Age at 1st use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="opiatesAge"
                                id="opiatesAge"
                              />
                              <ErrorMessage
                                name="opiatesAge"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="opiatesFrequency"
                                className="md:text-base"
                              >
                                Frequency of use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="opiatesFrequency"
                                id="opiatesFrequency"
                              />
                              <ErrorMessage
                                name="opiatesFrequency"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="opiatesAmountUsed"
                                className="md:text-base"
                              >
                                Amount used
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="opiatesAmountUsed"
                                id="opiatesAmountUsed"
                              />
                              <ErrorMessage
                                name="opiatesAmountUsed"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="opiatesLastUse"
                                className="md:text-base"
                              >
                                Last use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="opiatesLastUse"
                                id="opiatesLastUse"
                              />
                              <ErrorMessage
                                name="opiatesLastUse"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="opiatesProblems"
                                className="md:text-base"
                              >
                                Problems
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="opiatesProblems"
                                id="opiatesProblems"
                              />
                              <ErrorMessage
                                name="opiatesProblems"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="relative  gap-4 grid grid-cols-10 col-span-10 mb-4 md:mb-6">
                      <div className="grid grid-cols-12 md:col-span-12 col-span-12">
                        <Field
                          type="checkbox"
                          name="INHALANTS"
                          id="INHALANTS"
                        />
                        <label htmlFor="INHALANTS" className="md:text-base">
                          INHALANTS
                        </label>
                        <ErrorMessage
                          name="INHALANTS"
                          component="p"
                          className="invalid"
                        />
                      </div>
                      {values.INHALANTS === true && (
                        <>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="inhalantsAge"
                                className="md:text-base"
                              >
                                Age at 1st use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="inhalantsAge"
                                id="inhalantsAge"
                              />
                              <ErrorMessage
                                name="inhalantsAge"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="inhalantsFrequency"
                                className="md:text-base"
                              >
                                Frequency of use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="inhalantsFrequency"
                                id="inhalantsFrequency"
                              />
                              <ErrorMessage
                                name="inhalantsFrequency"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="inhalantsAmountUsed"
                                className="md:text-base"
                              >
                                Amount used
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="inhalantsAmountUsed"
                                id="inhalantsAmountUsed"
                              />
                              <ErrorMessage
                                name="inhalantsAmountUsed"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="inhalantsLastUse"
                                className="md:text-base"
                              >
                                Last use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="inhalantsLastUse"
                                id="inhalantsLastUse"
                              />
                              <ErrorMessage
                                name="inhalantsLastUse"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="inhalantsProblems"
                                className="md:text-base"
                              >
                                Problems
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="inhalantsProblems"
                                id="inhalantsProblems"
                              />
                              <ErrorMessage
                                name="inhalantsProblems"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="relative  gap-4 grid grid-cols-10 col-span-10 mb-4 md:mb-6">
                      <div className="grid grid-cols-12 md:col-span-12 col-span-12">
                        <Field
                          type="checkbox"
                          name="HALLUCINQGENS"
                          id="HALLUCINQGENS"
                        />
                        <label htmlFor="HALLUCINQGENS" className="md:text-base">
                          HALLUCINQGENS
                        </label>
                        <ErrorMessage
                          name="HALLUCINQGENS"
                          component="p"
                          className="invalid"
                        />
                      </div>
                      {values.HALLUCINQGENS === true && (
                        <>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="hallucinqgensAge"
                                className="md:text-base"
                              >
                                Age at 1st use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="hallucinqgensAge"
                                id="hallucinqgensAge"
                              />
                              <ErrorMessage
                                name="hallucinqgensAge"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="hallucinqgensFrequency"
                                className="md:text-base"
                              >
                                Frequency of use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="hallucinqgensFrequency"
                                id="hallucinqgensFrequency"
                              />
                              <ErrorMessage
                                name="hallucinqgensFrequency"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="hallucinqgensAmountUsed"
                                className="md:text-base"
                              >
                                Amount used
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="hallucinqgensAmountUsed"
                                id="hallucinqgensAmountUsed"
                              />
                              <ErrorMessage
                                name="hallucinqgensAmountUsed"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="hallucinqgensLastUse"
                                className="md:text-base"
                              >
                                Last use
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="hallucinqgensLastUse"
                                id="hallucinqgensLastUse"
                              />
                              <ErrorMessage
                                name="hallucinqgensLastUse"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                          <div className="relative  gap-4 md:col-span-2 col-span-12 mb-4 md:mb-6">
                            <div className="md:col-span-12 col-span-12">
                              <label
                                htmlFor="hallucinqgensProblems"
                                className="md:text-base"
                              >
                                Problems
                              </label>
                            </div>
                            <div className="md:col-span-12 col-span-12">
                              <Field
                                type="text"
                                name="hallucinqgensProblems"
                                id="hallucinqgensProblems"
                              />
                              <ErrorMessage
                                name="hallucinqgensProblems"
                                component="p"
                                className="invalid"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6 mt-4 md-mt-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="everReceivedInpatientOrOutpatientSubstanceAbuse">
                        {" "}
                        Have you ever received inpatient or outpatient substance
                        abuse treatment?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="everReceivedInpatientOrOutpatientSubstanceAbuse"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="everReceivedInpatientOrOutpatientSubstanceAbuse"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="everReceivedInpatientOrOutpatientSubstanceAbuse"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12">
                  {values.everReceivedInpatientOrOutpatientSubstanceAbuse ===
                    "Yes" && (
                    <>
                      <label
                        htmlFor="inpatientOrOutpatientSubstanceAbuseLabel"
                        className="mb-4"
                      >
                        please list:
                      </label>
                      <FieldArray name="inpatientOrOutpatientSubstanceAbuse">
                        {({
                          insert,
                          remove,
                          push,
                          form: { setFieldValue },
                        }) => (
                          <div>
                            {values.inpatientOrOutpatientSubstanceAbuse.length >
                              0 &&
                              values.inpatientOrOutpatientSubstanceAbuse.map(
                                (add, index) => (
                                  <div
                                    className="grid grid-cols-12 gap-6 col-span-12 relative"
                                    key={index}
                                  >
                                    <div className="col-span-12 md:col-span-4 ">
                                      <label
                                        htmlFor={`inpatientOrOutpatientSubstanceAbuse.${index}.inpatientOrOutpatientSubstanceAbuse_hospitalDoctorName`}
                                      >
                                        Hospital/ Doctor Name
                                      </label>
                                      <Field
                                        name={`inpatientOrOutpatientSubstanceAbuse.${index}.inpatientOrOutpatientSubstanceAbuse_hospitalDoctorName`}
                                        id={`inpatientOrOutpatientSubstanceAbuse.${index}.inpatientOrOutpatientSubstanceAbuse_hospitalDoctorName`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`inpatientOrOutpatientSubstanceAbuse.${index}.inpatientOrOutpatientSubstanceAbuse_hospitalDoctorName`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>
                                    <div className="col-span-12 md:col-span-4">
                                      <label
                                        htmlFor={`inpatientOrOutpatientSubstanceAbuse.${index}.inpatientOrOutpatientSubstanceAbuse_datesOfTreatment`}
                                      >
                                        Dates of Treatment
                                      </label>

                                      <Field
                                        name={`inpatientOrOutpatientSubstanceAbuse.${index}.inpatientOrOutpatientSubstanceAbuse_datesOfTreatment`}
                                        id={`inpatientOrOutpatientSubstanceAbuse.${index}.inpatientOrOutpatientSubstanceAbuse_datesOfTreatment`}
                                        type="date"
                                      />
                                      <ErrorMessage
                                        name={`inpatientOrOutpatientSubstanceAbuse.${index}.inpatientOrOutpatientSubstanceAbuse_width`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-12 md:col-span-4">
                                      <label
                                        htmlFor={`inpatientOrOutpatientSubstanceAbuse.${index}.inpatientOrOutpatientSubstanceAbuse_detoxRehabOrAANA`}
                                      >
                                        Detox, Rehab, or AA/NA?
                                      </label>
                                      <Field
                                        name={`inpatientOrOutpatientSubstanceAbuse.${index}.inpatientOrOutpatientSubstanceAbuse_detoxRehabOrAANA`}
                                        id={`inpatientOrOutpatientSubstanceAbuse.${index}.inpatientOrOutpatientSubstanceAbuse_detoxRehabOrAANA`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`inpatientOrOutpatientSubstanceAbuse.${index}.inpatientOrOutpatientSubstanceAbuse_detoxRehabOrAANA`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-12 relative text-right mt-8">
                                      <button
                                        type="button"
                                        className="bg-transparent text-blue-700 text-sm  py-2 px-3"
                                        onClick={() => remove(index)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                )
                              )}

                            <button
                              type="button"
                              className="bg-transparent text-blue-700 text-sm  py-2 px-3"
                              onClick={() =>
                                push({
                                  inpatientOrOutpatientSubstanceAbuse_hospitalDoctorName:
                                    "",
                                  inpatientOrOutpatientSubstanceAbuse_datesOfTreatment:
                                    "",
                                  inpatientOrOutpatientSubstanceAbuse_detoxRehabOrAANA:
                                    "",
                                })
                              }
                            >
                              Add
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </>
                  )}
                </div>

                <p className="md:text-base font-bold mb-4 md:mb-6">
                  <span className=" underline underline-offset-4">
                    Family Psychiatric History
                  </span>
                  <span className="text-sm font-light italic">
                    (Please note ADHD, Learning Disorders, Depression, Bipolar
                    Disorder, Anxiety Disorders, Obsessive-Compulsive Disorder,
                    Tic/Tourette’s, Schizophrenia, Drug or Alcohol Abuse,
                    Suicide attempts, or other Psychiatric Problems)
                  </span>
                </p>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="areYouAdopted"> Are you adopted?</label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="areYouAdopted"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="areYouAdopted"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="areYouAdopted"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                {values.areYouAdopted === "Yes" && (
                  <>
                    <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                      <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="md:col-span-2 col-span-12">
                          <label htmlFor="areYouAdoptedDescription">
                            {" "}
                            Please describe the circumstances of the adoption:
                          </label>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                          <Field
                            as="textarea"
                            row="4"
                            name="areYouAdoptedDescription"
                            id="areYouAdoptedDescription"
                          />
                          <ErrorMessage
                            name="areYouAdoptedDescription"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="historyOfADHDMentalIllnessEtc">
                        {" "}
                        Is there a history of ADHD, mental illness, mental
                        retardation, learning problems, alcohol or drug abuse in
                        your grandparents, parents, siblings, or 1st cousins?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="historyOfADHDMentalIllnessEtc"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="historyOfADHDMentalIllnessEtc"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="historyOfADHDMentalIllnessEtc"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12">
                  {values.historyOfADHDMentalIllnessEtc === "Yes" && (
                    <>
                      <label
                        htmlFor="listHistoryOfADHDMentalIllnessEtcLabel"
                        className="mb-4"
                      >
                        please fill in the following chart:
                      </label>
                      <FieldArray name="listHistoryOfADHDMentalIllnessEtc">
                        {({
                          insert,
                          remove,
                          push,
                          form: { setFieldValue },
                        }) => (
                          <div>
                            {values.listHistoryOfADHDMentalIllnessEtc.length >
                              0 &&
                              values.listHistoryOfADHDMentalIllnessEtc.map(
                                (add, index) => (
                                  <div
                                    className="grid grid-cols-12 gap-6 col-span-12 relative"
                                    key={index}
                                  >
                                    <div className="col-span-12 md:col-span-4">
                                      <label
                                        htmlFor={`listHistoryOfADHDMentalIllnessEtc.${index}.listHistoryOfADHDMentalIllnessEtc_affectedFamilyMember`}
                                      >
                                        Affected Family Member
                                      </label>
                                      <Field
                                        name={`listHistoryOfADHDMentalIllnessEtc.${index}.listHistoryOfADHDMentalIllnessEtc_affectedFamilyMember`}
                                        id={`listHistoryOfADHDMentalIllnessEtc.${index}.listHistoryOfADHDMentalIllnessEtc_affectedFamilyMember`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`listHistoryOfADHDMentalIllnessEtc.${index}.listHistoryOfADHDMentalIllnessEtc_affectedFamilyMember`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>
                                    <div className="col-span-12 md:col-span-4 ">
                                      <label
                                        htmlFor={`listHistoryOfADHDMentalIllnessEtc.${index}.listHistoryOfADHDMentalIllnessEtc_typeOfMentalIllnessOrSA`}
                                      >
                                        Type of Mental Illness or SA
                                      </label>

                                      <Field
                                        name={`listHistoryOfADHDMentalIllnessEtc.${index}.listHistoryOfADHDMentalIllnessEtc_typeOfMentalIllnessOrSA`}
                                        id={`listHistoryOfADHDMentalIllnessEtc.${index}.listHistoryOfADHDMentalIllnessEtc_typeOfMentalIllnessOrSA`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`listHistoryOfADHDMentalIllnessEtc.${index}.listHistoryOfADHDMentalIllnessEtc_width`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-12 md:col-span-4">
                                      <label
                                        htmlFor={`listHistoryOfADHDMentalIllnessEtc.${index}.listHistoryOfADHDMentalIllnessEtc_treatmentIfAny`}
                                      >
                                        Treatment (if any)
                                      </label>
                                      <Field
                                        name={`listHistoryOfADHDMentalIllnessEtc.${index}.listHistoryOfADHDMentalIllnessEtc_treatmentIfAny`}
                                        id={`listHistoryOfADHDMentalIllnessEtc.${index}.listHistoryOfADHDMentalIllnessEtc_treatmentIfAny`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`listHistoryOfADHDMentalIllnessEtc.${index}.listHistoryOfADHDMentalIllnessEtc_treatmentIfAny`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-12 relative text-right mt-8">
                                      <button
                                        type="button"
                                        className="bg-transparent text-blue-700 text-sm  py-2 px-3"
                                        onClick={() => remove(index)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                )
                              )}

                            <button
                              type="button"
                              className="bg-transparent text-blue-700 text-sm  py-2 px-3"
                              onClick={() =>
                                push({
                                  listHistoryOfADHDMentalIllnessEtc_affectedFamilyMember:
                                    "",
                                  listHistoryOfADHDMentalIllnessEtc_typeOfMentalIllnessOrSA:
                                    "",
                                  listHistoryOfADHDMentalIllnessEtc_treatmentIfAny:
                                    "",
                                })
                              }
                            >
                              Add
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </>
                  )}
                </div>

                <p className="md:text-base font-bold underline underline-offset-4 mb-4 md:mb-6">
                  Childhood Development:
                </p>

                <h3 className="text-base text-left font-medium col-span-12 mb-8">
                  • Pregnancy
                </h3>

                <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                  <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12 mb-4">
                      <div id="checkbox-group">
                        <label className="anyThatApplyToYourMothersPregnancyWithYou">
                          Please check any that apply to your mother’s pregnancy
                          with you:
                        </label>
                      </div>
                    </div>

                    <div
                      className="grid grid-cols-12 md:col-span-12 col-span-12 "
                      role="group"
                      aria-labelledby="checkbox-group"
                    >
                      <div className="md:col-span-6 col-span-12">
                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="anyThatApplyToYourMothersPregnancyWithYou"
                            value="Received prenatal care"
                            className="mr-2"
                          />
                          Received prenatal care
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="anyThatApplyToYourMothersPregnancyWithYou"
                            value="Drank alcohol during pregnancy"
                            className="mr-2"
                          />
                          Drank alcohol during pregnancy
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="anyThatApplyToYourMothersPregnancyWithYou"
                            value="Smoked during pregnancy"
                            className="mr-2"
                          />
                          Smoked during pregnancy
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="anyThatApplyToYourMothersPregnancyWithYou"
                            value="Used drugs during pregnancy"
                            className="mr-2"
                          />
                          Used drugs during pregnancy
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="anyThatApplyToYourMothersPregnancyWithYou"
                            value="Took medications"
                            className="mr-2"
                          />
                          Took medications
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="anyThatApplyToYourMothersPregnancyWithYou"
                            value="Elevated blood pressure"
                            className="mr-2"
                          />
                          Elevated blood pressure
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="anyThatApplyToYourMothersPregnancyWithYou"
                            value="Diabetes of pregnancy"
                            className="mr-2"
                          />
                          Diabetes of pregnancy
                        </label>
                      </div>

                      <div className="md:col-span-6 col-span-12">
                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="anyThatApplyToYourMothersPregnancyWithYou"
                            value="Pre-eclampsia"
                            className="mr-2"
                          />
                          Pre-eclampsia
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="anyThatApplyToYourMothersPregnancyWithYou"
                            value="Premature labor"
                            className="mr-2"
                          />
                          Premature labor
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="anyThatApplyToYourMothersPregnancyWithYou"
                            value="Threatened miscarriage"
                            className="mr-2"
                          />
                          Threatened miscarriage
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="anyThatApplyToYourMothersPregnancyWithYou"
                            value="Nausea or Vomiting"
                            className="mr-2"
                          />
                          Nausea or Vomiting
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="anyThatApplyToYourMothersPregnancyWithYou"
                            value="Infection(s)"
                            className="mr-2"
                          />
                          Infection(s)
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="anyThatApplyToYourMothersPregnancyWithYou"
                            value="Severe Emotional Distress"
                            className="mr-2"
                          />
                          Severe Emotional Distress
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-base text-left font-medium col-span-12 mb-8">
                  • Birth History
                </h3>

                <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                  <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="mothersAgeAtTimeOfBirth"
                        className="md:text-base"
                      >
                        Mother’s age at time of birth
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="mothersAgeAtTimeOfBirth"
                        id="mothersAgeAtTimeOfBirth"
                      />
                      <ErrorMessage
                        name="mothersAgeAtTimeOfBirth"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>

                  <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="fathersAgeAtTimeOfBirth"
                        className="md:text-base"
                      >
                        Father’s age at time of birth
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="fathersAgeAtTimeOfBirth"
                        id="fathersAgeAtTimeOfBirth"
                      />
                      <ErrorMessage
                        name="fathersAgeAtTimeOfBirth"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="wasMotherGivenMedicationOrAnesthesia">
                        Was mother given medication or anesthesia?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="wasMotherGivenMedicationOrAnesthesia"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="wasMotherGivenMedicationOrAnesthesia"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Don't Know"
                          name="wasMotherGivenMedicationOrAnesthesia"
                          className="mr-2"
                        />
                        Don&apos;t Know
                      </label>
                    </div>
                    <ErrorMessage
                      name="wasMotherGivenMedicationOrAnesthesia"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="deliveryWas">Delivery was:</label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="radio"
                          value="Spontaneous Vaginal"
                          name="deliveryWas"
                          className="mr-2"
                        />
                        Spontaneous Vaginal
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="radio"
                          value="Induced"
                          name="deliveryWas"
                          className="mr-2"
                        />
                        Induced
                      </label>
                    </div>
                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="radio"
                          value="Caesarian section"
                          name="deliveryWas"
                          className="mr-2"
                        />
                        Caesarian section
                      </label>
                    </div>
                    <ErrorMessage
                      name="deliveryWas"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="anyComplicationsWithLabororDelivery">
                        Any complications with labor or delivery?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="anyComplicationsWithLabororDelivery"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="anyComplicationsWithLabororDelivery"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="anyComplicationsWithLabororDelivery"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                {values.anyComplicationsWithLabororDelivery === "Yes" && (
                  <>
                    <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                      <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="md:col-span-2 col-span-12">
                          <label htmlFor="anyComplicationsWithLabororDeliveryDescription">
                            {" "}
                            Description
                          </label>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                          <Field
                            type="text"
                            name="anyComplicationsWithLabororDeliveryDescription"
                            id="anyComplicationsWithLabororDeliveryDescription"
                          />
                          <ErrorMessage
                            name="anyComplicationsWithLabororDeliveryDescription"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="wereYouPremature">
                        Were you premature?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="wereYouPremature"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="wereYouPremature"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="wereYouPremature"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                {values.wereYouPremature === "Yes" && (
                  <>
                    <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                      <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="md:col-span-2 col-span-12">
                          <label htmlFor="wereYouPrematureDescription">
                            {" "}
                            Description
                          </label>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                          <Field
                            type="text"
                            name="wereYouPrematureDescription"
                            id="wereYouPrematureDescription"
                          />
                          <ErrorMessage
                            name="wereYouPrematureDescription"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="grid grid-cols-12 gap-4 col-span-12 mb-4 md:mb-6">
                  <div className="col-span-12 md:col-span-12 relative">
                    <label htmlFor="yourBirthWeight">Your birth weight:</label>
                  </div>

                  <div className="col-span-12 gap-4 md:col-span-4 relative">
                    <label
                      htmlFor="yourBirthWeightLBS"
                      className="mb-2 md:mb-0"
                    >
                      lbs
                    </label>
                    <Field
                      type="text"
                      name="yourBirthWeightLBS"
                      id="yourBirthWeightLBS"
                    />
                    <ErrorMessage
                      name="yourBirthWeightLBS"
                      component="p"
                      className="invalid"
                    />
                  </div>

                  <div className="col-span-12  gap-4 md:col-span-4 relative">
                    <label htmlFor="yourBirthWeightOZ" className="mb-2 md:mb-0">
                      oz
                    </label>
                    <Field
                      type="text"
                      min="0"
                      name="yourBirthWeightOZ"
                      id="yourBirthWeightOZ"
                    />
                    <ErrorMessage
                      name="yourBirthWeightOZ"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <h3 className="text-base text-left font-medium col-span-12 mb-8">
                  Did you have any of the following:
                </h3>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="breathingProblems">
                        {" "}
                        Breathing problems
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="breathingProblems"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="breathingProblems"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="breathingProblems"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="cordAroundTheNeck">
                        {" "}
                        Cord around the neck
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="cordAroundTheNeck"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="cordAroundTheNeck"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="cordAroundTheNeck"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="abnormalColor"> Abnormal color</label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="abnormalColor"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="abnormalColor"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="abnormalColor"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="abnormalTone"> Abnormal tone</label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="abnormalTone"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="abnormalTone"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="abnormalTone"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="meconium"> Meconium</label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="meconium"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="meconium"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="meconium"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="failureToThrive">
                        {" "}
                        Failure to thrive
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="failureToThrive"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="failureToThrive"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="failureToThrive"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="jaundice"> Jaundice</label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="jaundice"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="jaundice"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="jaundice"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="infection"> Infection</label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="infection"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="infection"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="infection"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <h3 className="text-base text-left font-medium col-span-12 mb-8">
                  • Developmental Milestones{" "}
                  <span className="text-sm">
                    (answer as best you can recall)
                  </span>
                </h3>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="motorDevelopment">
                        Motor Development (sitting, crawling, walking)
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Normal"
                          name="motorDevelopment"
                          className="mr-2"
                        />
                        Normal
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Fast"
                          name="motorDevelopment"
                          className="mr-2"
                        />
                        Fast
                      </label>
                    </div>
                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Slow"
                          name="motorDevelopment"
                          className="mr-2"
                        />
                        Slow
                      </label>
                    </div>
                    <ErrorMessage
                      name="motorDevelopment"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="speechLanguage">Speech & Language</label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Normal"
                          name="speechLanguage"
                          className="mr-2"
                        />
                        Normal
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Fast"
                          name="speechLanguage"
                          className="mr-2"
                        />
                        Fast
                      </label>
                    </div>
                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Slow"
                          name="speechLanguage"
                          className="mr-2"
                        />
                        Slow
                      </label>
                    </div>
                    <ErrorMessage
                      name="speechLanguage"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="selfHelpSkills">
                        Self-help skills (dressing, brushing, toileting,
                        hygiene)
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Normal"
                          name="selfHelpSkills"
                          className="mr-2"
                        />
                        Normal
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Fast"
                          name="selfHelpSkills"
                          className="mr-2"
                        />
                        Fast
                      </label>
                    </div>
                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Slow"
                          name="selfHelpSkills"
                          className="mr-2"
                        />
                        Slow
                      </label>
                    </div>
                    <ErrorMessage
                      name="selfHelpSkills"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <h3 className="text-base text-left font-medium col-span-12 mb-8">
                  • Childhood Home
                </h3>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="primaryResidenceAsChild">
                        Primary Residence as a child
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="radio"
                          value="Single parent home"
                          name="primaryResidenceAsChild"
                          className="mr-2"
                        />
                        Single parent home
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="radio"
                          value="Two parent home"
                          name="primaryResidenceAsChild"
                          className="mr-2"
                        />
                        Two parent home
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="radio"
                          value="Other"
                          name="primaryResidenceAsChild"
                          className="mr-2"
                        />
                        Other
                      </label>
                    </div>
                    <ErrorMessage
                      name="primaryResidenceAsChild"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                {values.primaryResidenceAsChild === "Other" && (
                  <>
                    <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                      <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="md:col-span-2 col-span-12">
                          <label htmlFor="primaryResidenceAsChildDescription">
                            {" "}
                            Describe:
                          </label>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                          <Field
                            type="text"
                            name="primaryResidenceAsChildDescription"
                            id="primaryResidenceAsChildDescription"
                          />
                          <ErrorMessage
                            name="primaryResidenceAsChildDescription"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <label
                    htmlFor="describeYourHomeEnvironmentAsChild"
                    className="mb-4"
                  >
                    Check all that describe your home environment as a child:
                  </label>
                  <div className="grid grid-cols-6 gap-4 ">
                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="checkbox"
                          value="Nurturing"
                          name="describeYourHomeEnvironmentAsChild"
                          className="mr-2"
                        />
                        Nurturing
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="checkbox"
                          value="Loving"
                          name="describeYourHomeEnvironmentAsChild"
                          className="mr-2"
                        />
                        Loving
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="checkbox"
                          value="Supportive"
                          name="describeYourHomeEnvironmentAsChild"
                          className="mr-2"
                        />
                        Supportive
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="checkbox"
                          value="Abusive"
                          name="describeYourHomeEnvironmentAsChild"
                          className="mr-2"
                        />
                        Abusive
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="checkbox"
                          value="Critical"
                          name="describeYourHomeEnvironmentAsChild"
                          className="mr-2"
                        />
                        Critical
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="checkbox"
                          value="Stressful"
                          name="describeYourHomeEnvironmentAsChild"
                          className="mr-2"
                        />
                        Stressful
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="checkbox"
                          value="Rigid"
                          name="describeYourHomeEnvironmentAsChild"
                          className="mr-2"
                        />
                        Rigid
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="checkbox"
                          value="Harsh discipline"
                          name="describeYourHomeEnvironmentAsChild"
                          className="mr-2"
                        />
                        Harsh discipline
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="checkbox"
                          value="Little discipline"
                          name="describeYourHomeEnvironmentAsChild"
                          className="mr-2"
                        />
                        Little discipline
                      </label>
                    </div>

                    <ErrorMessage
                      name="describeYourHomeEnvironmentAsChild"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                  <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="otherApplicableInformation"
                        className="md:text-base"
                      >
                        Other applicable information
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        as="textarea"
                        name="otherApplicableInformation"
                        id="otherApplicableInformation"
                      />
                      <ErrorMessage
                        name="otherApplicableInformation"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>

                <p className="md:text-base font-bold underline underline-offset-4 mb-4 md:mb-6">
                  Medical History
                </p>

                <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                  <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="whosYourFamilyDoctor"
                        className="md:text-base"
                      >
                        Who is your Internist or Family Doctor?
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="whosYourFamilyDoctor"
                        id="whosYourFamilyDoctor"
                      />
                      <ErrorMessage
                        name="whosYourFamilyDoctor"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                  <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="yourLastPhysicalExamination"
                        className="md:text-base"
                      >
                        When was your last physical examination?
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="yourLastPhysicalExamination"
                        id="yourLastPhysicalExamination"
                      />
                      <ErrorMessage
                        name="yourLastPhysicalExamination"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="currentMedications">
                        {" "}
                        Current Medications (include Over-the-counter meds,
                        Vitamins, Herbs, orSupplements)
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="currentMedications"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="currentMedications"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="currentMedications"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12">
                  {values.currentMedications === "Yes" && (
                    <>
                      <label
                        htmlFor="listcurrentMedicationsLabel"
                        className="mb-4"
                      >
                        please list:
                      </label>
                      <FieldArray name="listcurrentMedications">
                        {({
                          insert,
                          remove,
                          push,
                          form: { setFieldValue },
                        }) => (
                          <div>
                            {values.listcurrentMedications.length > 0 &&
                              values.listcurrentMedications.map(
                                (add, index) => (
                                  <div
                                    className="grid grid-cols-12 gap-6 col-span-12 relative"
                                    key={index}
                                  >
                                    <div className="col-span-12 md:col-span-3 ">
                                      <label
                                        htmlFor={`listcurrentMedications.${index}.listcurrentMedications_rxName`}
                                      >
                                        Rx Name
                                      </label>
                                      <Field
                                        name={`listcurrentMedications.${index}.listcurrentMedications_rxName`}
                                        id={`listcurrentMedications.${index}.listcurrentMedications_rxName`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`listcurrentMedications.${index}.listcurrentMedications_rxName`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>
                                    <div className="col-span-12 md:col-span-3">
                                      <label
                                        htmlFor={`listcurrentMedications.${index}.listcurrentMedications_dosage`}
                                      >
                                        Dosage
                                      </label>

                                      <Field
                                        name={`listcurrentMedications.${index}.listcurrentMedications_dosage`}
                                        id={`listcurrentMedications.${index}.listcurrentMedications_dosage`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`listcurrentMedications.${index}.listcurrentMedications_width`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-12 md:col-span-3">
                                      <label
                                        htmlFor={`listcurrentMedications.${index}.listcurrentMedications_frequency`}
                                      >
                                        Frequency
                                      </label>
                                      <Field
                                        name={`listcurrentMedications.${index}.listcurrentMedications_frequency`}
                                        id={`listcurrentMedications.${index}.listcurrentMedications_frequency`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`listcurrentMedications.${index}.listcurrentMedications_frequency`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-12 md:col-span-3">
                                      <label
                                        htmlFor={`listcurrentMedications.${index}.listcurrentMedications_prescribingMD`}
                                      >
                                        Prescribing M.D.
                                      </label>
                                      <Field
                                        name={`listcurrentMedications.${index}.listcurrentMedications_prescribingMD`}
                                        id={`listcurrentMedications.${index}.listcurrentMedications_prescribingMD`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`listcurrentMedications.${index}.listcurrentMedications_prescribingMD`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-12 relative text-right mt-8">
                                      <button
                                        type="button"
                                        className="bg-transparent text-blue-700 text-sm  py-2 px-3"
                                        onClick={() => remove(index)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                )
                              )}

                            <button
                              type="button"
                              className="bg-transparent text-blue-700 text-sm  py-2 px-3"
                              onClick={() =>
                                push({
                                  listcurrentMedications_rxName: "",
                                  listcurrentMedications_dosage: "",
                                  listcurrentMedications_frequency: "",
                                  listcurrentMedications_prescribingMD: "",
                                })
                              }
                            >
                              Add
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </>
                  )}
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="anyCurrentMedicalProblems">
                        {" "}
                        Do you have any current medical problems?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="anyCurrentMedicalProblems"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="anyCurrentMedicalProblems"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="anyCurrentMedicalProblems"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                {values.anyCurrentMedicalProblems === "Yes" && (
                  <>
                    <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                      <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="md:col-span-2 col-span-12">
                          <label htmlFor="anyCurrentMedicalProblemsDescription">
                            {" "}
                            Please list:
                          </label>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                          <Field
                            as="textarea"
                            row="4"
                            name="anyCurrentMedicalProblemsDescription"
                            id="anyCurrentMedicalProblemsDescription"
                          />
                          <ErrorMessage
                            name="anyCurrentMedicalProblemsDescription"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="anyDrugAllergies">
                        {" "}
                        Do you have any drug allergies?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="anyDrugAllergies"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="anyDrugAllergies"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="anyDrugAllergies"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                {values.anyDrugAllergies === "Yes" && (
                  <>
                    <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                      <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="md:col-span-2 col-span-12">
                          <label htmlFor="anyDrugAllergiesDescription">
                            {" "}
                            Please list:
                          </label>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                          <Field
                            as="textarea"
                            row="4"
                            name="anyDrugAllergiesDescription"
                            id="anyDrugAllergiesDescription"
                          />
                          <ErrorMessage
                            name="anyDrugAllergiesDescription"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                  <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12 mb-2">
                      <div id="checkbox-group">
                        <label className="experiencedAnyOfTheFollowingConditions">
                          Please check & briefly describe if you have
                          experienced any of the following conditions:
                        </label>
                      </div>
                    </div>

                    <div
                      className="grid grid-cols-12 md:col-span-12 col-span-12 "
                      role="group"
                      aria-labelledby="checkbox-group"
                    >
                      <div className="md:col-span-6 col-span-12">
                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Surgeries"
                            className="mr-2"
                          />
                          Surgeries
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Chest pain"
                            className="mr-2"
                          />
                          Chest pain
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Significant accidents orinjuries"
                            className="mr-2"
                          />
                          Significant accidents or injuries
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Abnormal heart rate or rhythm "
                            className="mr-2"
                          />
                          Abnormal heart rate or rhythm
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value=" Heart attack"
                            className="mr-2"
                          />
                          Heart attack
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="High Blood Pressure"
                            className="mr-2"
                          />
                          High Blood Pressure
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Stroke"
                            className="mr-2"
                          />
                          Stroke
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Seizures/Convulsions"
                            className="mr-2"
                          />
                          Seizures/Convulsions
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Cancer"
                            className="mr-2"
                          />
                          Cancer
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Diabetes"
                            className="mr-2"
                          />
                          Diabetes
                        </label>

                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Acid Reflux"
                            className="mr-2"
                          />
                          Acid Reflux
                        </label>
                      </div>

                      <div className="md:col-span-6 col-span-12">
                        {" "}
                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Head Injury"
                            className="mr-2"
                          />
                          Head Injury
                        </label>
                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Kidney/Bladderproblems"
                            className="mr-2"
                          />
                          Kidney/Bladder problems
                        </label>
                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Arthritis/Joint problems"
                            className="mr-2"
                          />
                          Arthritis/Joint problems
                        </label>
                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Fainting/Dizziness"
                            className="mr-2"
                          />
                          Fainting/Dizziness
                        </label>
                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Frequent Headaches"
                            className="mr-2"
                          />
                          Frequent Headaches
                        </label>
                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Allergy/ Sinus problems"
                            className="mr-2"
                          />
                          Allergy/ Sinus problems
                        </label>
                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Thyroid disease"
                            className="mr-2"
                          />
                          Thyroid disease
                        </label>
                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="High cholesterol"
                            className="mr-2"
                          />
                          High cholesterol
                        </label>
                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Vision problems"
                            className="mr-2"
                          />
                          Vision problems
                        </label>
                        <label className="mb-2">
                          <Field
                            type="checkbox"
                            name="experiencedAnyOfTheFollowingConditions"
                            value="Sexual problems"
                            className="mr-2"
                          />
                          Sexual problems
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="md:text-base font-bold underline underline-offset-4 mb-4 md:mb-6">
                  Social History
                </p>

                <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                  <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label htmlFor="cityOfResidence" className="md:text-base">
                        City of Residence
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="cityOfResidence"
                        id="cityOfResidence"
                      />
                      <ErrorMessage
                        name="cityOfResidence"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="nowLivingWith">Now Living with:</label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Spouse"
                          name="nowLivingWith"
                          className="mr-2"
                        />
                        Spouse
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Children"
                          name="nowLivingWith"
                          className="mr-2"
                        />
                        Children
                      </label>
                    </div>
                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value=" Roommate"
                          name="nowLivingWith"
                          className="mr-2"
                        />
                        Roommate
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Other"
                          name="nowLivingWith"
                          className="mr-2"
                        />
                        Other
                      </label>
                    </div>
                    <ErrorMessage
                      name="nowLivingWith"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                {values.nowLivingWith === "Other" && (
                  <>
                    <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                      <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                        <div className="md:col-span-2 col-span-12">
                          <label
                            htmlFor="nowLivingWithOther"
                            className="md:text-base"
                          >
                            Other
                          </label>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                          <Field
                            type="text"
                            name="nowLivingWithOther"
                            id="nowLivingWithOther"
                          />
                          <ErrorMessage
                            name="nowLivingWithOther"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="childrenInFamily">
                        {" "}
                        Children in family
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Applicable"
                          name="childrenInFamily"
                          className="mr-2"
                        />
                        Applicable
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Not Applicable"
                          name="childrenInFamily"
                          className="mr-2"
                        />
                        Not Applicable
                      </label>
                    </div>

                    <ErrorMessage
                      name="childrenInFamily"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                <div className="col-span-12">
                  {values.childrenInFamily === "Applicable" && (
                    <>
                      <FieldArray name="childrenInFamilyDetails">
                        {({
                          insert,
                          remove,
                          push,
                          form: { setFieldValue },
                        }) => (
                          <div>
                            {values.childrenInFamilyDetails.length > 0 &&
                              values.childrenInFamilyDetails.map(
                                (add, index) => (
                                  <div
                                    className="grid grid-cols-12 gap-6 col-span-12 relative"
                                    key={index}
                                  >
                                    <div className="col-span-8 ">
                                      <label
                                        htmlFor={`childrenInFamilyDetails.${index}.childrenInFamilyDetails_childrenName`}
                                      >
                                        Name
                                      </label>
                                      <Field
                                        name={`childrenInFamilyDetails.${index}.childrenInFamilyDetails_childrenName`}
                                        id={`childrenInFamilyDetails.${index}.childrenInFamilyDetails_childrenName`}
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`childrenInFamilyDetails.${index}.childrenInFamilyDetails_childrenName`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-4 ">
                                      <label
                                        htmlFor={`childrenInFamilyDetails.${index}.childrenInFamilyDetails_childrenAge`}
                                      >
                                        Age
                                      </label>

                                      <Field
                                        name={`childrenInFamilyDetails.${index}.childrenInFamilyDetails_childrenAge`}
                                        id={`childrenInFamilyDetails.${index}.childrenInFamilyDetails_childrenAge`}
                                        type="text"
                                        min="0"
                                      />
                                      <ErrorMessage
                                        name={`childrenInFamilyDetails.${index}.childrenInFamilyDetails_width`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="col-span-12 relative text-right mt-8">
                                      <button
                                        type="button"
                                        className="bg-transparent text-blue-700 text-sm  py-2 px-3"
                                        onClick={() => remove(index)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                )
                              )}

                            <button
                              type="button"
                              className="bg-transparent text-blue-700 text-sm  py-2 px-3"
                              onClick={() =>
                                push({
                                  childrenInFamilyDetails_childrenName: "",
                                  childrenInFamilyDetails_childrenAge: "",
                                })
                              }
                            >
                              Add
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </>
                  )}
                </div>

                <div className="col-span-12 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-10 gap-4">
                    <div className="col-span-10">
                      <label htmlFor="patientMaritalStatuss">
                        Marital Status
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2">
                      <label>
                        <Field
                          type="radio"
                          value="Single"
                          name="patientMaritalStatuss"
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
                          name="patientMaritalStatuss"
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
                          name="patientMaritalStatuss"
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
                          name="patientMaritalStatuss"
                          className="mr-2"
                        />
                        Divorced
                      </label>
                    </div>

                    <ErrorMessage
                      name="patientMaritalStatuss"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                {values.patientMaritalStatuss === "Married" && (
                  <>
                    <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                      <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                        <div className="md:col-span-2 col-span-12">
                          <label
                            htmlFor="patientMaritalStatussDescription"
                            className="md:text-base"
                          >
                            How long?
                          </label>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                          <Field
                            type="text"
                            name="patientMaritalStatussDescription"
                            id="patientMaritalStatussDescription"
                          />
                          <ErrorMessage
                            name="patientMaritalStatussDescription"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="everExperiencedAnyPhysicalAbuse">
                        {" "}
                        Have you ever experienced or witnessed any physical
                        abuse, sexual abuse, or neglect?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Applicable"
                          name="everExperiencedAnyPhysicalAbuse"
                          className="mr-2"
                        />
                        Applicable
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Not Applicable"
                          name="everExperiencedAnyPhysicalAbuse"
                          className="mr-2"
                        />
                        Not Applicable
                      </label>
                    </div>

                    <ErrorMessage
                      name="everExperiencedAnyPhysicalAbuse"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>

                {values.everExperiencedAnyPhysicalAbuse === "Applicable" && (
                  <>
                    <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                      <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="md:col-span-2 col-span-12">
                          <label htmlFor="everExperiencedAnyPhysicalAbuseDescription">
                            {" "}
                            please describe:
                          </label>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                          <Field
                            as="textarea"
                            row="4"
                            name="everExperiencedAnyPhysicalAbuseDescription"
                            id="everExperiencedAnyPhysicalAbuseDescription"
                          />
                          <ErrorMessage
                            name="everExperiencedAnyPhysicalAbuseDescription"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <p className="md:text-base font-bold underline underline-offset-4 mb-4 md:mb-6">
                  Job History
                </p>

                <div className="col-span-12">
                  <label htmlFor="jobHistoryLabel" className="mb-4">
                    Please list all previous & current full-time employment:
                  </label>
                  <FieldArray name="jobHistory">
                    {({ insert, remove, push, form: { setFieldValue } }) => (
                      <div>
                        {values.jobHistory.length > 0 &&
                          values.jobHistory.map((add, index) => (
                            <div
                              className="grid grid-cols-12 gap-6 col-span-12 relative"
                              key={index}
                            >
                              <div className="col-span-12 md:col-span-3">
                                <label
                                  htmlFor={`jobHistory.${index}.jobHistory_positionJob`}
                                >
                                  Position/ Job
                                </label>
                                <Field
                                  name={`jobHistory.${index}.jobHistory_positionJob`}
                                  id={`jobHistory.${index}.jobHistory_positionJob`}
                                  type="text"
                                />
                                <ErrorMessage
                                  name={`jobHistory.${index}.jobHistory_positionJob`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>
                              <div className="col-span-12 md:col-span-3 ">
                                <label
                                  htmlFor={`jobHistory.${index}.jobHistory_nameOfEmployer`}
                                >
                                  Name of Employer
                                </label>

                                <Field
                                  name={`jobHistory.${index}.jobHistory_nameOfEmployer`}
                                  id={`jobHistory.${index}.jobHistory_nameOfEmployer`}
                                  type="text"
                                />
                                <ErrorMessage
                                  name={`jobHistory.${index}.jobHistory_width`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>

                              <div className="col-span-12 md:col-span-3">
                                <label
                                  htmlFor={`jobHistory.${index}.jobHistory_datesOfEmployment`}
                                >
                                  Dates of employment
                                </label>
                                <Field
                                  name={`jobHistory.${index}.jobHistory_datesOfEmployment`}
                                  id={`jobHistory.${index}.jobHistory_datesOfEmployment`}
                                  type="date"
                                />
                                <ErrorMessage
                                  name={`jobHistory.${index}.jobHistory_datesOfEmployment`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>

                              <div className="col-span-12 md:col-span-3">
                                <label
                                  htmlFor={`jobHistory.${index}.jobHistory_reasonForLeavingJob`}
                                >
                                  Reason for leaving job
                                </label>
                                <Field
                                  name={`jobHistory.${index}.jobHistory_reasonForLeavingJob`}
                                  id={`jobHistory.${index}.jobHistory_reasonForLeavingJob`}
                                  type="text"
                                />
                                <ErrorMessage
                                  name={`jobHistory.${index}.jobHistory_reasonForLeavingJob`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>

                              <div className="col-span-12 relative text-right mt-8">
                                <button
                                  type="button"
                                  className="bg-transparent text-blue-700 text-sm  py-2 px-3"
                                  onClick={() => remove(index)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}

                        <button
                          type="button"
                          className="bg-transparent text-blue-700 text-sm  py-2 px-3"
                          onClick={() =>
                            push({
                              jobHistory_positionJob: "",
                              jobHistory_nameOfEmployer: "",
                              jobHistory_datesOfEmployment: "",
                              jobHistory_reasonForLeavingJob: "",
                            })
                          }
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="doYouFindSatisfactionInYourWork">
                        {" "}
                        If currently employed, do you find satisfaction in your
                        work?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="doYouFindSatisfactionInYourWork"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="doYouFindSatisfactionInYourWork"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="doYouFindSatisfactionInYourWork"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>
                <p className="md:text-base font-bold underline underline-offset-4 mb-4 md:mb-6">
                  School History
                </p>
                <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                  <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="highestGradeLevelCompleted"
                        className="md:text-base"
                      >
                        Highest grade level completed
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="highestGradeLevelCompleted"
                        id="highestGradeLevelCompleted"
                      />
                      <ErrorMessage
                        name="highestGradeLevelCompleted"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>

                  <div className="relative  gap-4 col-span-6 mb-4 md:mb-6">
                    <div className="md:col-span-2 col-span-12">
                      <label
                        htmlFor="nameOfLastSchoolAttended"
                        className="md:text-base"
                      >
                        Name of last school attended
                      </label>
                    </div>
                    <div className="md:col-span-4 col-span-12">
                      <Field
                        type="text"
                        name="nameOfLastSchoolAttended"
                        id="nameOfLastSchoolAttended"
                      />
                      <ErrorMessage
                        name="nameOfLastSchoolAttended"
                        component="p"
                        className="invalid"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="currentAcademicPerformance">
                        Current Academic Performance
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Good"
                          name="currentAcademicPerformance"
                          className="mr-2"
                        />
                        Good
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Fair"
                          name="currentAcademicPerformance"
                          className="mr-2"
                        />
                        Fair
                      </label>
                    </div>
                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Poor"
                          name="currentAcademicPerformance"
                          className="mr-2"
                        />
                        Poor
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="N/A"
                          name="currentAcademicPerformance"
                          className="mr-2"
                        />
                        N/A
                      </label>
                    </div>
                    <ErrorMessage
                      name="currentAcademicPerformance"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="pastAcademicPerformance">
                        Past Academic Performance
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Good"
                          name="pastAcademicPerformance"
                          className="mr-2"
                        />
                        Good
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Fair"
                          name="pastAcademicPerformance"
                          className="mr-2"
                        />
                        Fair
                      </label>
                    </div>
                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Poor"
                          name="pastAcademicPerformance"
                          className="mr-2"
                        />
                        Poor
                      </label>
                    </div>

                    <ErrorMessage
                      name="currentAcademicPerformance"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="pastBehavioralPerformance">
                        Past Behavioral Performance
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Good"
                          name="pastBehavioralPerformance"
                          className="mr-2"
                        />
                        Good
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Fair"
                          name="pastBehavioralPerformance"
                          className="mr-2"
                        />
                        Fair
                      </label>
                    </div>
                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Poor"
                          name="pastBehavioralPerformance"
                          className="mr-2"
                        />
                        Poor
                      </label>
                    </div>

                    <ErrorMessage
                      name="currentBehavioralPerformance"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="inAnySpecialEducationPrograms">
                        {" "}
                        Were you ever in any special education programs?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="inAnySpecialEducationPrograms"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="inAnySpecialEducationPrograms"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="inAnySpecialEducationPrograms"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>
                {values.inAnySpecialEducationPrograms === "Yes" && (
                  <>
                    <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                      <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="md:col-span-2 col-span-12">
                          <label htmlFor="inAnySpecialEducationProgramsDescription">
                            {" "}
                            please describe:
                          </label>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                          <Field
                            as="textarea"
                            row="2"
                            name="inAnySpecialEducationProgramsDescription"
                            id="inAnySpecialEducationProgramsDescription"
                          />
                          <ErrorMessage
                            name="inAnySpecialEducationProgramsDescription"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="anyKnownLearningDisabilities">
                        {" "}
                        Any known Learning Disabilities?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="anyKnownLearningDisabilities"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="anyKnownLearningDisabilities"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="anyKnownLearningDisabilities"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>
                <p className="md:text-base font-bold underline underline-offset-4 mb-4 md:mb-6">
                  Legal Problems
                </p>
                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="everArrestedOrHadLegalCharges">
                        {" "}
                        Have you ever been arrested or had legal charges?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="everArrestedOrHadLegalCharges"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="everArrestedOrHadLegalCharges"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="everArrestedOrHadLegalCharges"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>
                {values.everArrestedOrHadLegalCharges === "Yes" && (
                  <>
                    <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                      <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="md:col-span-2 col-span-12">
                          <label htmlFor="everArrestedOrHadLegalChargesDescription">
                            {" "}
                            please describe:
                          </label>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                          <Field
                            as="textarea"
                            row="4"
                            name="everArrestedOrHadLegalChargesDescription"
                            id="everArrestedOrHadLegalChargesDescription"
                          />
                          <ErrorMessage
                            name="everArrestedOrHadLegalChargesDescription"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <p className="md:text-base font-bold underline underline-offset-4 mb-4 md:mb-6">
                  Religious Beliefs
                </p>
                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="None"
                          name="religiousBeliefs"
                          className="mr-2"
                        />
                        None
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Jewish"
                          name="religiousBeliefs"
                          className="mr-2"
                        />
                        Jewish
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Muslim"
                          name="religiousBeliefs"
                          className="mr-2"
                        />
                        Muslim
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Hindu"
                          name="religiousBeliefs"
                          className="mr-2"
                        />
                        Hindu
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Other"
                          name="religiousBeliefs"
                          className="mr-2"
                        />
                        Other
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Christen"
                          name="religiousBeliefs"
                          className="mr-2"
                        />
                        Christian
                      </label>
                    </div>

                    <ErrorMessage
                      name="religiousBeliefs"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>
                {values.religiousBeliefs === "Other" && (
                  <>
                    <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                      <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="md:col-span-2 col-span-12">
                          <label htmlFor="religiousBeliefsOther"> Other</label>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                          <Field
                            type="text"
                            row="4"
                            name="religiousBeliefsOther"
                            id="religiousBeliefsOther"
                          />
                          <ErrorMessage
                            name="religiousBeliefsOther"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {values.religiousBeliefs === "Christen" && (
                  <>
                    <div className="grid md:grid-cols-12 md:gap-6 col-span-12">
                      <div className="relative  gap-4 col-span-12 mb-4 md:mb-6">
                        <div className="md:col-span-2 col-span-12">
                          <label htmlFor="religiousBeliefsChristen">
                            {" "}
                            list denomination
                          </label>
                        </div>
                        <div className="md:col-span-4 col-span-12">
                          <Field
                            type="text"
                            row="4"
                            name="religiousBeliefsChristen"
                            id="religiousBeliefsChristen"
                          />
                          <ErrorMessage
                            name="religiousBeliefsChristen"
                            component="p"
                            className="invalid"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="activelyInvolvedInLocalChurch">
                        {" "}
                        Actively involved in local church?
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="activelyInvolvedInLocalChurch"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="activelyInvolvedInLocalChurch"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="activelyInvolvedInLocalChurch"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="prayRegularly"> Pray Regularly?</label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="Yes"
                          name="prayRegularly"
                          className="mr-2"
                        />
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                      <label>
                        <Field
                          type="radio"
                          value="No"
                          name="prayRegularly"
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>

                    <ErrorMessage
                      name="prayRegularly"
                      component="p"
                      className="invalid"
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 relative mb-4 md:mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-6">
                      <label htmlFor="thePracticeOfYourFaith">
                        {" "}
                        In your home, the practice of your faith is:
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="radio"
                          value="Not important"
                          name="thePracticeOfYourFaith"
                          className="mr-2"
                        />
                        Not important
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="radio"
                          value="Somewhat Important "
                          name="thePracticeOfYourFaith"
                          className="mr-2"
                        />
                        Somewhat Important
                      </label>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 ">
                      <label>
                        <Field
                          type="radio"
                          value="Very Important"
                          name="thePracticeOfYourFaith"
                          className="mr-2"
                        />
                        Very Important
                      </label>
                    </div>

                    <ErrorMessage
                      name="thePracticeOfYourFaith"
                      component="p"
                      className="invalid"
                    />
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
        <title>Adult Patient Form Registration | Gwinnett Psychiatry</title>
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

export default Adult;
