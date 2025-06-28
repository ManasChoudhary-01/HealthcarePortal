import React, { useState, useEffect } from "react";
import styles from "./receptionform.module.scss";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import axios from "axios";

import statesData from "../../utils/states.json";
import citiesData from "../../utils/states.json";

export default function ReceptionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cityOptions, setCityOptions] = useState([]);

  const initialValues = {
    firstname: "",
    lastname: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("Name is required"),
    // lastname: Yup.string().required("Name is required"),
    gender: Yup.string().required("Gender is required"),
    dateOfBirth: Yup.date()
      .required("Date of Birth is required")
      .nullable()
      .max(new Date(), "Date of Birth cannot be in the future"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    address: Yup.string().required("Address is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    zipcode: Yup.string()
      .matches(/^\d{6}$/, "Zip Code must be exactly 6 digits")
      .required("Zip Code is required"),
  });

  function handleNumericInput(event) {
    // check for Zip Code number input
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, "");
    event.target.value = inputValue;
  }
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
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

  const handleFormSubmit = async (values, { resetForm, setFieldValue }) => {
    setIsSubmitting(true);
    // onSubmitData(values);
    // console.log(values)

    try {
      const response = await axios.post("https://httpbin.org/post", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("user registered successfully:", response.data);
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

  return (
    <div className={styles.receptionForm}>
      <h2>Registration Desk</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        // onSubmit={(values) => console.log(values)}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className={styles.gridContainer}>
              <div>
                <div className={styles.input}>
                  <label htmlFor="firstname">First Name</label>
                  <Field
                    name="firstname"
                    type="text"
                    placeholder="Enter First Name"
                    className={styles.inputField}
                  />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.input}>
                  <label htmlFor="lastname">Last Name</label>
                  <Field
                    name="lastname"
                    type="text"
                    className={styles.inputField}
                    placeholder="Enter Last Name"
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>

                <div className={styles.input}>
                  <label htmlFor="gender">Gender</label>
                  <div className={styles.checkboxContainer}>
                    {genderOptions.map((option) => (
                      <div key={option.value} className={styles.checkboxItem}>
                        <div
                          className={`${styles.customCheckbox} ${
                            values.gender === option.value ? styles.checked : ""
                          }`}
                          onClick={() => {
                            setFieldValue("gender", option.value);
                          }}
                        ></div>
                        <label
                          className={styles.checkboxLabel}
                          htmlFor={`gender-${option.value}`}
                          onClick={() => {
                            setFieldValue("gender", option.value);
                          }}
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <ErrorMessage
                    name="gender"
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
                    placeholder="Enter your Date of Birth"
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
                    placeholder="Enter your email address"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>
              </div>

              <div>
                <div className={styles.input}>
                  <label htmlFor="address">Address</label>
                  <Field
                    name="address"
                    as="textarea"
                    rows={`${window.innerWidth < 1100 ? 3 : 1}`}
                    placeholder="Enter Address"
                    className={styles.textArea}
                  />
                  <ErrorMessage
                    name="address"
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
                    className={styles.stateWrapper}
                    // styles={customStyles}
                    placeholder="Your State"
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
                    // styles={customStyles}
                    placeholder={
                      selectedState ? "Your City" : "Select a State first"
                    }
                  />
                  <ErrorMessage
                    name="city"
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
                    placeholder="Enter your Zip Code"
                    onInput={(e) => handleNumericInput(e)}
                  />
                  <ErrorMessage
                    name="zipcode"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>
              </div>
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register Patient"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
