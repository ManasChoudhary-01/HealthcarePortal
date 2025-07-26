import React, { useState, useEffect, use } from "react";
import styles from "./appointment.module.scss";
import Navbar from "../../Header/Navbar";

import  useAuthStore from "../../../context/useAuthStore";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import axios from "axios";

export default function Appointment() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedDeptName, setSelectedDeptName] = useState("");
    // const [departmentOptions, setDepartmentOptions] = useState([]);
    const { accessToken, hospitalId } = useAuthStore();

    const departmentOptions = [
        { id: 1, name: "Cardiology" },
        { id: 2, name: "Neurology" },
        { id: 3, name: "Orthopedics" },
        { id: 4, name: "Pediatrics" },
        { id: 5, name: "Gynecology" },
    ];

    // useEffect(() => {

    //     const fetchDepartments = async () => {
    //         try {
    //             const response = await axios.get(`https://vitalize.strangled.net/api/department/hospital/${hospitalId}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             });
    //             setDepartmentOptions(response.data);
    //         } catch (error) {
    //             console.error("Error fetching departments:", error);
    //         }
    //     };

    //     fetchDepartments();
    // }, [accessToken, hospitalId]);

    const doctorsByDepartment = {
        Cardiology: [
            { id: "1", name: "Dr. A Sharma" },
            { id: "2", name: "Dr. B Mehta" },
            { id: "3", name: "Dr. C Patel" },
        ],
        Neurology: [
            { id: "4", name: "Dr. D Kumar" },
            { id: "5", name: "Dr. E Reddy" },
            { id: "6", name: "Dr. F Khan" },
        ],
        Orthopedics: [
            { id: "7", name: "Dr. G Singh" },
            { id: "8", name: "Dr. H Verma" },
            { id: "9", name: "Dr. I Das" },
        ],
    };

    const timeSlotOptions = [
        { value: "10:00", label: "10:00 AM" },
        { value: "10:15", label: "10:15 AM" },
        { value: "10:30", label: "10:30 AM" },
        { value: "10:45", label: "10:45 AM" },
        { value: "11:00", label: "11:00 AM" },
    ];

    const initialValues = {
        patientAadhar: "",
        doctorId: "",
        appointmentDate: "",
        appointmentTime: "",
    };

    const validationSchema = Yup.object({
        patientAadhar: Yup.string()
            .matches(/^\d{12}$/, "Aadhar number must be exactly 12 digits")
            .required("Aadhar number is required"),
    });

    function handleNumericInput(event, maxDigits) {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/\D/g, "");
        inputValue = inputValue.slice(0, maxDigits);
        event.target.value = inputValue;
    }

    const customSelectStyles = {
        control: (provided) => ({
            ...provided,
            border: "none",
            borderBottom: '1px solid #000000',
            outline: 'none',
            height: '50px',
            backgroundColor: '#fff',
            boxShadow: 'none',
            borderRadius: '0px',
            '&:hover': {
                borderBottom: '1px solid #000000',
            }
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#6B7582',
            fontSize: '20px',
            backgroundColor: '#fff',
            padding: '6px',
        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: '20px',
            color: '#6B7582',
            backgroundColor: '#fff',
            padding: '6px',
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            "& svg": {
                fill: "#32302C", // Change arrow color
            },
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            width: "0",
        }),
        clearIndicator: (provided) => ({
            ...provided,
            display: 'none', // Hide the clear indicator
        }),
    };

    const handleFormSubmit = async (values, { resetForm, setFieldValue }) => {
        setIsSubmitting(true);
        // onSubmitData(values);

        const finalValues = {
            ...values,
            // hospitalId: localStorage.getItem("hospitalId"),
            hospitalId: 1,
        };

        console.log("Final Values:", finalValues);

        try {
            const response = await axios.post("https://vitalize.strangled.net/api/appointment/create", finalValues, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // console.log("user registered successfully:", response.data);
            alert("Appointment created successfully!");
            resetForm();
            // setSelectedState("");
            // setFieldValue("state", "");
            // setFieldValue("city", "");
            // setCityOptions([]);
        } catch (error) {
            console.error("Error submitting prescription:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const doctorOptions = selectedDeptName
        ? doctorsByDepartment[selectedDeptName]?.map((doc) => ({
            value: doc.id,
            label: doc.name,
        }))
        : [];

    return (
        <div className={styles.appointmentContainer}>

            <Navbar />

            <h2>Book an Appointment</h2>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            // onSubmit={(values) => console.log(values)}
            >
                {({ values, setFieldValue }) => (
                    <Form className={styles.appointmentForm}>

                        <div className={styles.input}>
                            <label htmlFor="patientAadhar">Patient’s Aadhaar Number</label>
                            <Field
                                name="patientAadhar"
                                type="text"
                                className={styles.inputField}
                                placeholder="Enter aadhaar number"
                                onInput={(e) => handleNumericInput(e, 12)}
                            />
                            <ErrorMessage
                                name="patientAadhar"
                                component="div"
                                className={styles.errorMessage}
                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="department">Department</label>
                            <Select
                                id="department"
                                name="department"
                                placeholder="Select Department"
                                options={departmentOptions.map((dept) => ({
                                    value: dept.name,
                                    label: dept.name,
                                }))}
                                onChange={(option) => {
                                    setSelectedDeptName(option.value);
                                    setFieldValue("doctorId", "");
                                }}
                                value={
                                    selectedDeptName
                                        ? { value: selectedDeptName, label: selectedDeptName }
                                        : null
                                }
                                styles={customSelectStyles}
                            />
                            <ErrorMessage
                                name="department"
                                component="div"
                                className={styles.errorMessage}
                            />
                        </div>

                        <div className={styles.input}>
                            <label htmlFor="doctorId">Available Doctors</label>
                            <Select
                                name="doctorId"
                                placeholder="Select Doctor"
                                options={doctorOptions}
                                onChange={(option) => setFieldValue("doctorId", Number(option.value))}
                                value={
                                    values.doctorId
                                        ? doctorOptions.find((doc) => Number(doc.value) === values.doctorId)
                                        : null
                                }
                                styles={customSelectStyles}
                            />
                            <ErrorMessage
                                name="doctorId"
                                component="div"
                                className={styles.errorMessage}
                            />
                        </div>

                        <div className={styles.dateTime}>
                            <div className={styles.input} id={styles.dateInput}>
                                <label htmlFor="appointmentDate">Date</label>
                                <Field
                                    name="appointmentDate"
                                    type="date"
                                    className={styles.inputField}
                                    placeholder="DD-MM-YYYY"
                                />
                            </div>
                            <div className={styles.input} id={styles.timeInput}>
                                <label htmlFor="appointmentTime">Time</label>
                                <Select
                                    id="appointmentTime"
                                    name="appointmentTime"
                                    placeholder="Select Time Slot"
                                    options={timeSlotOptions}
                                    onChange={(option) => setFieldValue("appointmentTime", option.value)}
                                    value={
                                        values.appointmentTime
                                            ? timeSlotOptions.find((slot) => slot.value === values.appointmentTime)
                                            : null
                                    }
                                    styles={customSelectStyles}
                                />
                                <ErrorMessage
                                    name="appointmentTime"
                                    component="div"
                                    className={styles.errorMessage}
                                />
                            </div>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Confirming..." : "Confirm appointment"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}