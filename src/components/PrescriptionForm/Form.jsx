import React, { useState, useEffect } from "react";
import styles from "./form.module.scss";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";

export default function PrescriptionForm({ onSubmitData }) {
  const initialValues = {
    patientName: "",
    patientAge: "",
    email: "",
    phone: "",
    gender: "",
    symptoms: "",
    diagnosis: "",
    prescription: "",
    checked: false,
  };

  const validationSchema = Yup.object({
    patientName: Yup.string().required("Name is required"),
    patientAge: Yup.number().required("Age is required").min(0),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    gender: Yup.string().required("Gender is required"),
    symptoms: Yup.string().required("Symptoms are required"),
    diagnosis: Yup.string().required("Diagnosis is required"),
    prescription: Yup.string().required("Prescription is required"),
    checked: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  function handleNumericInput(event) {
    // check for phone number input
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, "");
    event.target.value = inputValue;
  }

  const genderOptions = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
    { value: "O", label: "Other" },
  ];

  const diagnosisOptions = [
    { value: "Flu", label: "Flu" },
    { value: "Cold", label: "Cold" },
    { value: "Fever", label: "Fever" },
    { value: "Other", label: "Other" },
  ];

  return (
    <div className={styles.formContainer}>
      <h2>Doctor Prescription Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          onSubmitData(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className={styles.gridContainer}>
              <div className={styles.input}>
                <label htmlFor="patientName">Patient Name</label>
                <Field
                  name="patientName"
                  type="text"
                  placeholder="Enter patient name"
                  className={styles.inputField}
                />
                <ErrorMessage
                  name="patientName"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="patientAge">Patient Age</label>
                <Field
                  name="patientAge"
                  type="number"
                  className={styles.inputField}
                  placeholder="Enter patient age"
                />
                <ErrorMessage
                  name="patientAge"
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
              <div className={styles.input}>
                <label htmlFor="phone">Phone</label>
                <Field
                  name="phone"
                  type="text"
                  className={styles.inputField}
                  placeholder="Enter your phone number"
                  onInput={(e) => handleNumericInput(e)}
                />
                <ErrorMessage
                  name="phone"
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
                <label htmlFor="diagnosis">Diagnosis</label>
                <div className={styles.checkboxContainer}>
                  {diagnosisOptions.map((option) => (
                    <div key={option.value} className={styles.checkboxItem}>
                      <div
                        className={`${styles.customCheckbox} ${
                          values.diagnosis === option.value
                            ? styles.checked
                            : ""
                        }`}
                        onClick={() => {
                          setFieldValue("diagnosis", option.value);
                        }}
                      ></div>
                      <label
                        className={styles.checkboxLabel}
                        htmlFor={`diagnosis-${option.value}`}
                        onClick={() => {
                          setFieldValue("diagnosis", option.value);
                        }}
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
                <ErrorMessage
                  name="diagnosis"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="symptoms">Symptoms</label>
                <Field
                  name="symptoms"
                  as="textarea"
                  placeholder="Enter symptoms"
                  className={styles.textArea}
                />
                <ErrorMessage
                  name="symptoms"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="prescription">Prescription</label>
                <Field
                  name="prescription"
                  as="textarea"
                  placeholder="Enter prescription details"
                  className={styles.textArea}
                />
                <ErrorMessage
                  name="prescription"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
            </div>
            <div className={styles.inputCheckbox}>
              <label>
                <Field type="checkbox" name="checked" />I certify that the above
                information is true and accurate.
              </label>
              <ErrorMessage
                name="checked"
                component="div"
                className={styles.errorMessage}
              />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
