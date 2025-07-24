import React, { useState, useEffect } from "react";
import styles from "./receptionform.module.scss";
import Navbar from "../../Header/Navbar";

import useAuthStore from "../../../context/AuthContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import axios from "axios";

import statesData from "../../../utils/states.json";
import citiesData from "../../../utils/states.json";
import Image from "../../../assets/Form/image.png";

export default function ReceptionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cityOptions, setCityOptions] = useState([]);

  const { accessToken } = useAuthStore();

  const initialValues = {
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    dateOfBirth: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    aadharNumber: "",
    uhid: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Name is required"),
    lastName: Yup.string().required("Name is required"),
    gender: Yup.string().required("Gender is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    dateOfBirth: Yup.date()
      .required("Date of Birth is required")
      .nullable()
      .max(new Date(), "Date of Birth cannot be in the future"),
    email: Yup.string()
      .email("Please enter a valid email"),
    // address: Yup.string().required("Address is required"),
    // state: Yup.string().required("State is required"),
    // city: Yup.string().required("City is required"),
    zipcode: Yup.string()
      .matches(/^\d{6}$/, "Zip Code must be exactly 6 digits"),
    aadharNumber: Yup.string()
      .matches(/^\d{12}$/, "Aadhar number must be exactly 12 digits")
      .required("Aadhar number is required"),
    uhid: Yup.string()
      .matches(/^\d{16}$/, "UHID must be exactly 16 digits")
      .required("UHID is required"),
  });

  function handleNumericInput(event, maxDigits) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, "");
    inputValue = inputValue.slice(0, maxDigits);
    event.target.value = inputValue;
  }
  const genderOptions = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" },
  ];

  useEffect(() => {
    const allStates = statesData.map((state) => ({
      value: state.name,
      label: state.name,
    }));
    setStateOptions(allStates);
  }, []);

  useEffect(() => {
    const selectedStateCities =
      citiesData
        .find((state) => state.name === selectedState)
        ?.cities.map((city) => ({
          value: city.name,
          label: city.name,
        })) || [];
    setCityOptions(selectedStateCities);
  }, [selectedState]);

  // console.log(accessToken)

  const handleFormSubmit = async (values, { resetForm, setFieldValue }) => {
    setIsSubmitting(true);
    // onSubmitData(values);
    // console.log(values)

    try {
      const response = await axios.post("https://vitalize.strangled.net/api/auth/v2/register", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // console.log("user registered successfully:", response.data);
      alert("User registered successfully!");
      resetForm();
      setSelectedState("");
      setFieldValue("state", "");
      setFieldValue("city", "");
      setCityOptions([]);
    } catch (error) {
      console.error("Error submitting prescription:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      outline: 'none',
      height: '56px',
      width: '440px',
      backgroundColor: '#fff',
      boxShadow: 'none',
      borderRadius: '12px',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#6B7582',
      fontSize: '16px',
      backgroundColor: '#fff',
      padding: '16px',
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '16px',
      color: '#6B7582',
      backgroundColor: '#fff',
      padding: '16px',
    }),
  };

  return (
    <div className={styles.receptionForm}>
      <Navbar />

      <h2>Patient Registration</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      // onSubmit={(values) => console.log(values)}
      >
        {({ values, setFieldValue }) => (
          <Form className={styles.formContainer}>
            <div className={styles.imgContainer}>
              <img src={Image} alt="Form" />
            </div>
            <div className={styles.gridContainer}>

              <div className={styles.leftColumn}>

                <div className={styles.input}>
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    name="firstName"
                    type="text"
                    placeholder="Enter first name"
                    className={styles.inputField}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.input}>
                  <label htmlFor="lastName">Last Name</label>
                  <Field
                    name="lastName"
                    type="text"
                    className={styles.inputField}
                    placeholder="Enter last name"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.input}>
                  <div className={styles.checkboxContainer}>
                    {genderOptions.map((option) => (
                      <label
                        className={`${values.gender === option.value ? styles.checked : ""
                          } ${styles.checkboxLabel}`}
                        htmlFor={`gender-${option.value}`}
                        onClick={() => {
                          setFieldValue("gender", option.value);
                        }}
                      >
                        {option.label}
                      </label>
                    ))}
                  </div>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.input}>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Field
                    name="phoneNumber"
                    type="text"
                    className={styles.inputField}
                    placeholder="XXXXXXXXXX"
                    onInput={(e) => handleNumericInput(e, 10)}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.input}>
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <Field
                    name="dateOfBirth"
                    type="date"
                    className={styles.inputField}
                    placeholder="DD-MM-YYYY"
                  />
                  <ErrorMessage
                    name="dateOfBirth"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.input}>
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className={styles.inputField}
                    placeholder="Enter email address"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.input}>
                  <label htmlFor="aadharNumber">Aadhaar Number</label>
                  <Field
                    name="aadharNumber"
                    type="text"
                    className={styles.inputField}
                    placeholder="Enter aadhaar number"
                    onInput={(e) => handleNumericInput(e, 12)}
                  />
                  <ErrorMessage
                    name="aadharNumber"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>
              </div>

              <div className={styles.rightColumn}>

                <div className={styles.input}>
                  <label htmlFor="uhid">UHID</label>
                  <Field
                    name="uhid"
                    type="text"
                    className={styles.inputField}
                    placeholder="Enter UHID"
                    onInput={(e) => handleNumericInput(e, 16)}
                  />
                  <ErrorMessage
                    name="uhid"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.input}>
                  <label htmlFor="address">Address</label>
                  <Field
                    name="address"
                    as="textarea"
                    // rows={`${window.innerWidth < 1100 ? 3 : 3}`}
                    placeholder="Enter address"
                    className={styles.textArea}
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.input}>
                  <label htmlFor="zipcode">Zip Code</label>
                  <Field
                    name="zipcode"
                    type="text"
                    className={styles.inputField}
                    placeholder="Enter zip code"
                    onInput={(e) => handleNumericInput(e, 6)}
                  />
                  <ErrorMessage
                    name="zipcode"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.input}>
                  <label htmlFor="state">State</label>
                  <Select
                    id="state"
                    name="state"
                    options={stateOptions}
                    value={
                      values.state
                        ? stateOptions.find(
                          (option) => option.value === values.state
                        )
                        : null
                    }
                    onChange={(selectedOption) => {
                      setFieldValue(
                        "state",
                        selectedOption ? selectedOption.value : ""
                      );
                      setFieldValue("city", ""); // Clear the city when the state changes
                      setSelectedState(
                        selectedOption ? selectedOption.value : ""
                      );
                    }}
                    styles={customSelectStyles}
                    placeholder="Select State"
                  />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.input}>
                  <label htmlFor="city">City</label>
                  <Select
                    id="city"
                    name="city"
                    options={cityOptions}
                    value={
                      values.city
                        ? cityOptions.find(
                          (option) => option.value === values.city
                        )
                        : null
                    }
                    onChange={(selectedOption) => {
                      setFieldValue(
                        "city",
                        selectedOption ? selectedOption.value : ""
                      );
                    }}
                    isDisabled={!selectedState} // Disable city selection if no state is selected
                    className={styles.cityWrapper}
                    styles={customSelectStyles}
                    placeholder={
                      selectedState ? "Select City" : "Select a State first"
                    }
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.buttonContainer}>
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register Patient"}
                  </button>
                </div>

              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
