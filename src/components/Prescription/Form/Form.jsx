import React, { useState } from "react";
import styles from "./form.module.scss";
import Navbar from "../../Header/Navbar";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import axios from "axios";
import { customSelectStyles, getCustomSelectStyles } from "./CustomStyles";
import cross from "../../../assets/Form/cross.svg";

export default function PrescriptionForm({ onSubmitData }) {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialValues = {
        complaint: [],
        medicines: [
            {
                name: "",
                dosage: "",
                frequency: "",
                duration: "",
                note: "",
            },
        ],
        investigation: [],
        comments: "",
    };

    const validationSchema = Yup.object({
        complaint: Yup.array()
            .of(Yup.string().required())
            .min(1, "Please select at least one complaint."),
        investigation: Yup.array()
            .of(Yup.string().required())
            .min(1, "Please select at least one investigation."),
        medicines: Yup.array()
            .min(1, 'At least one medicine is required'),
    });

    const complaintOptions = [
        { id: 1, name: "Cold" },
        { id: 2, name: "Flu" },
        { id: 3, name: "Fever" },
        { id: 4, name: "Diabetes" },
        { id: 5, name: "Asthma" },
        { id: 6, name: "Hypertension" },
        { id: 7, name: "Allergy" },
    ];

    const investigationOptions = [
        { id: 1, name: "Blood Test" },
        { id: 2, name: "X-Ray" },
        { id: 3, name: "MRI" },
        { id: 4, name: "CT Scan" },
        { id: 5, name: "Ultrasound" },
    ];

    const medicinesOptions = {
        name: [
            { id: 1, name: "Paracetamol" },
            { id: 2, name: "Ibuprofen" },
            { id: 3, name: "Amoxicillin" },
            { id: 4, name: "Lisinopril" },
            { id: 5, name: "Metformin" },
        ],
        dosage: [
            { id: 1, name: "500mg" },
            { id: 2, name: "1000mg" },
            { id: 3, name: "250mg" },
            { id: 4, name: "5mg" },
            { id: 5, name: "10mg" },
        ],
        frequency: [
            { id: 1, name: "Once a day" },
            { id: 2, name: "Twice a day" },
            { id: 3, name: "Three times a day" },
            { id: 4, name: "As needed" },
            { id: 5, name: "Before meals" },
        ],
    };

    const handleFormSubmit = async (values, { resetForm }) => {
        setIsSubmitting(true);
        // onSubmitData(values);

        try {
            const response = await axios.post("https://httpbin.org/post", values, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            alert("Prescription submitted successfully!");

            // console.log("Prescription submitted successfully:", response);
            // console.log(values);
            // resetForm();

            // if (onSubmitData) {
            //     onSubmitData(values);
            // }
        } catch (error) {
            console.error("Error submitting prescription:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.prescriptionContainer}>
            <Navbar />

            <div className={styles.patientDetails}>
                <h2>Patient Details</h2>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            // onSubmit={(values) => console.log(values)}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className={styles.formContainer}>

                            <div className={styles.input}>
                                <label htmlFor="complaint">Chief Complaint</label>
                                <Select
                                    id="complaint"
                                    name="complaint"
                                    options={(Array.isArray(complaintOptions)
                                        ? complaintOptions
                                        : []
                                    ).map((item) => ({
                                        value: item.id,
                                        label: item.name,
                                    }))}
                                    isMulti
                                    value={(values.complaint || []).map((complaintId) => {
                                        const complaint = complaintOptions.find(
                                            (item) => item.name === complaintId
                                        );
                                        return complaint
                                            ? { value: complaint.id, label: complaint.name }
                                            : null;
                                    })}
                                    onChange={(selectedOptions) => {
                                        const selectedIds = selectedOptions
                                            ? selectedOptions.map((option) => option.label)
                                            : [];
                                        setFieldValue("complaint", selectedIds);
                                    }}
                                    styles={customSelectStyles}
                                    placeholder="Enter the disease name..."
                                />
                                <ErrorMessage
                                    name="complaint"
                                    component="div"
                                    className={styles.errorMessage}
                                />
                            </div>

                            <div className={styles.input}>
                                <label htmlFor="medicines">Medicines</label>
                                <FieldArray name="medicines">
                                    {({ push, remove }) => (
                                        <>
                                            {values.medicines.map((medicine, index) => (

                                                <div key={index} className={styles.medicineFields}>
                                                    <Select
                                                        id={`medicines[${index}].name`}
                                                        name={`medicines[${index}].name`}
                                                        options={medicinesOptions.name
                                                            .filter((item) =>
                                                                !values.medicines.some((m, i) => i !== index && m.name === item.name)
                                                            )
                                                            .map((item) => ({
                                                                value: item.id,
                                                                label: item.name,
                                                            }))
                                                        }
                                                        value={
                                                            medicine.name
                                                                ? {
                                                                    value: medicine.name,
                                                                    label: medicine.name,
                                                                    // label: medicinesOptions.name.find((i) => i.id === medicine.name)?.name || '',
                                                                }
                                                                : null
                                                        }
                                                        onChange={(selectedOptions) => {
                                                            const selectedIds = selectedOptions?.label || [];
                                                            setFieldValue(`medicines[${index}].name`, selectedIds);
                                                        }}
                                                        styles={getCustomSelectStyles('200px')}
                                                        placeholder="Medicine Name..."
                                                    />

                                                    <Select
                                                        id={`medicines[${index}].dosage`}
                                                        name={`medicines[${index}].dosage`}
                                                        options={medicinesOptions.dosage.map((item) => ({
                                                            value: item.id,
                                                            label: item.name,
                                                        }))}
                                                        value={
                                                            medicine.dosage
                                                                ? {
                                                                    value: medicine.dosage,
                                                                    label: medicine.dosage,
                                                                }
                                                                : null
                                                        }
                                                        onChange={(selectedOptions) => {
                                                            const selectedIds = selectedOptions?.label || [];
                                                            setFieldValue(`medicines[${index}].dosage`, selectedIds);
                                                        }}
                                                        styles={getCustomSelectStyles('150px')}
                                                        placeholder="Dosage..."
                                                    />

                                                    <Select
                                                        id={`medicines[${index}].frequency`}
                                                        name={`medicines[${index}].frequency`}
                                                        options={medicinesOptions.frequency.map((item) => ({
                                                            value: item.id,
                                                            label: item.name,
                                                        }))}
                                                        value={
                                                            medicine.frequency
                                                                ? {
                                                                    value: medicine.frequency,
                                                                    label: medicine.frequency,
                                                                }
                                                                : null
                                                        }
                                                        onChange={(selectedOptions) => {
                                                            const selectedIds = selectedOptions?.label || [];
                                                            setFieldValue(`medicines[${index}].frequency`, selectedIds);
                                                        }}
                                                        styles={getCustomSelectStyles('200px')}
                                                        placeholder="Frequency..."
                                                    />

                                                    <Field
                                                        name={`medicines[${index}].duration`}
                                                        type="text"
                                                        className={styles.inputField}
                                                        placeholder="Duration..."
                                                        style={{ width: "140px" }}
                                                    />

                                                    <Field
                                                        name={`medicines[${index}].note`}
                                                        type="text"
                                                        className={styles.inputField}
                                                        placeholder="Note..."
                                                        style={{ width: "220px" }}
                                                    />

                                                    <button className={styles.remove} type="button" onClick={() => remove(index)}>
                                                        <img src={cross} alt="Remove" />
                                                    </button>

                                                </div>
                                            ))}

                                            <button className={styles.addMedicine} type="button" onClick={() => push({ name: "", dosage: "", frequency: "", duration: "", note: "" })}>
                                                <span>+</span> Add Medicine
                                            </button>
                                        </>
                                    )}
                                </FieldArray>
                                <ErrorMessage
                                    name="medicines"
                                    component="div"
                                    className={styles.errorMessage}
                                />
                            </div>

                            <div className={styles.input}>
                                <label htmlFor="investigation">Investigation</label>
                                <Select
                                    id="investigation"
                                    name="investigation"
                                    options={(Array.isArray(investigationOptions)
                                        ? investigationOptions
                                        : []
                                    ).map((item) => ({
                                        value: item.id,
                                        label: item.name,
                                    }))}
                                    isMulti
                                    value={(values.investigation || []).map((investigationId) => {
                                        const investigation = investigationOptions.find(
                                            (item) => item.name === investigationId
                                        );
                                        return investigation
                                            ? { value: investigation.id, label: investigation.name }
                                            : null;
                                    })}
                                    onChange={(selectedOptions) => {
                                        const selectedIds = selectedOptions
                                            ? selectedOptions.map((option) => option.label)
                                            : [];
                                        setFieldValue("investigation", selectedIds);
                                    }}
                                    styles={customSelectStyles}
                                    placeholder="Select Investigation..."
                                />
                                <ErrorMessage
                                    name="investigation"
                                    component="div"
                                    className={styles.errorMessage}
                                />
                            </div>

                            <div className={styles.input}>
                                <label htmlFor="comments">Other Comments</label>
                                <Field
                                    name="comments"
                                    as="textarea"
                                    placeholder="Enter any other comments..."
                                    className={styles.textArea}
                                />
                                <ErrorMessage
                                    name="comments"
                                    component="div"
                                    className={styles.errorMessage}
                                />
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button type="submit" disabled={isSubmitting}>
                                View Prescription
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
