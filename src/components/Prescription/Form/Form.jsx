import React, { useState, useEffect } from "react";
import styles from "./form.module.scss";
import Navbar from "../../Header/Navbar";
import { data, useParams } from "react-router-dom";
import useAuthStore from "../../../context/useAuthStore";
import PrescriptionTemplate from "../Template/Template";
import { useNavigate } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import axios from "axios";
import { customSelectStyles, getCustomSelectStyles } from "./CustomStyles";
import cross from "../../../assets/Form/cross.svg";

export default function PrescriptionForm({ onSubmitData }) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { patientId } = useParams();
    const [patientData, setPatientData] = useState(null);
    const [generatePDF, setGeneratePDF] = useState(false);
    const [combinedData, setCombinedData] = useState(null);
    const { accessToken } = useAuthStore();

    const initialValues = {
        diagnosis: [],
        medications: [
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
        diagnosis: Yup.array()
            .of(Yup.string().required())
            .min(1, "Please select at least one diagnosis."),
        investigation: Yup.array()
            .of(Yup.string().required())
            .min(1, "Please select at least one investigation."),
        medications: Yup.array()
            .min(1, 'At least one medicine is required'),
    });

    const diagnosisOptions = [
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

    const medicationsOptions = {
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

    useEffect(() => {
        const fetchPatientDetails = async () => {

            try {
                const response = await axios.get(`https://vitalize.strangled.net/api/patient/${patientId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setPatientData(response.data);
                console.log("Patient details fetched successfully:", response.data);
            } catch (error) {
                console.error("Error fetching patient details:", error);
            }
        };

        if (patientId) fetchPatientDetails();
    }, [patientId]);

    const handleFormSubmit = async (values, { resetForm }) => {
        setIsSubmitting(true);
        // onSubmitData(values);

        setCombinedData({
            patient: patientData,
            prescription: values,
        });

        try {
            const response = await axios.post("https://vitalize.strangled.net/api/prescription/upload-prescription", values, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            alert("Prescription submitted successfully!");

            // console.log("Prescription submitted successfully:", response);
            console.log(values);
            setGeneratePDF(true);
            // resetForm();

            // if (onSubmitData) {
            //     onSubmitData(values);
            // }
        } catch (error) {
            console.error("Error submitting prescription:", error);
            setGeneratePDF(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (combinedData) {
            console.log(combinedData)
        }
    }, [combinedData])

    return (
        <div className={styles.prescriptionContainer}>
            <Navbar />

            {!generatePDF &&
                <>
                    <div className={styles.patientDetails}>
                        <div className={styles.header}>
                            <h2>Prescription for {patientData?.profile?.firstName || "Manas"}</h2>
                            <div className={styles.right}>
                                <p><svg width="14" height="16" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 8V5C17 3.89543 16.1046 3 15 3H3C1.89543 3 1 3.89543 1 5V8M17 8V17C17 18.1046 16.1046 19 15 19H3C1.89543 19 1 18.1046 1 17V8M17 8H1M5 1V5M13 1V5" stroke="#2383E2" stroke-width="1.5" stroke-linecap="square" />
                                </svg>July, 2025</p>
                                <p><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="9" stroke="#2383E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 6.5V12L16 14" stroke="#2383E2" stroke-width="1.5" stroke-linecap="square" />
                                </svg>04:00 PM</p>
                            </div>
                        </div>
                        <h3>Patient Details</h3>
                        <div className={styles.details}>
                            <div className={styles.detail}>
                                <span className={styles.label}>Name</span>
                                <span className={styles.value}>{patientData?.profile?.firstName} {patientData?.profile?.lastName || "Manas"}</span>
                            </div>
                            <div className={styles.detail}>
                                <span className={styles.label}>Sex</span>
                                <span className={styles.value}>{patientData?.profile?.gender || "Male"}</span>
                            </div>
                            <div className={styles.detail}>
                                <span className={styles.label}>Email Address</span>
                                <span className={styles.value}>{patientData?.profile?.user?.email || "manas@gmail.com"}</span>
                            </div>
                            <div className={styles.detail}>
                                <span className={styles.label}>Phone Number</span>
                                <span className={styles.value}>{patientData?.profile?.user?.phoneNumber || "9928057474"}</span>
                            </div>
                            <div className={styles.detail}>
                                <span className={styles.label}>Aadhar Number</span>
                                <span className={styles.value}>{patientData?.aadharNumber || "1234-5678-9012"}</span>
                            </div>
                            <div className={styles.detail}>
                                <span className={styles.label}>UHID</span>
                                <span className={styles.value}>{patientData?.uhid || "XYZH123456789101"}</span>
                            </div>
                            <div className={styles.detail}>
                                <span className={styles.label}>Address</span>
                                <span className={styles.value}>{patientData?.profile?.address || "Jodhpur"}</span>
                            </div>
                            <div className={styles.detail}>
                                <span className={styles.label}>Age</span>
                                <span className={styles.value}>20</span>
                            </div>
                            <div className={styles.detail}>
                                <span className={styles.label}>Weight</span>
                                <span className={styles.value}>60 kg</span>
                            </div>
                        </div>
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
                                        <label htmlFor="diagnosis">Chief Complaint</label>
                                        <Select
                                            id="diagnosis"
                                            name="diagnosis"
                                            options={(Array.isArray(diagnosisOptions)
                                                ? diagnosisOptions
                                                : []
                                            ).map((item) => ({
                                                value: item.id,
                                                label: item.name,
                                            }))}
                                            isMulti
                                            value={(values.diagnosis || []).map((diagnosisId) => {
                                                const diagnosis = diagnosisOptions.find(
                                                    (item) => item.name === diagnosisId
                                                );
                                                return diagnosis
                                                    ? { value: diagnosis.id, label: diagnosis.name }
                                                    : null;
                                            })}
                                            onChange={(selectedOptions) => {
                                                const selectedIds = selectedOptions
                                                    ? selectedOptions.map((option) => option.label)
                                                    : [];
                                                setFieldValue("diagnosis", selectedIds);
                                            }}
                                            styles={customSelectStyles}
                                            placeholder="Enter the disease name..."
                                        />
                                        <ErrorMessage
                                            name="diagnosis"
                                            component="div"
                                            className={styles.errorMessage}
                                        />
                                    </div>

                                    <div className={styles.input}>
                                        <label htmlFor="medications">Medicines</label>
                                        <FieldArray name="medications">
                                            {({ push, remove }) => (
                                                <>
                                                    {values.medications.map((medicine, index) => (

                                                        <div key={index} className={styles.medicineFields}>
                                                            <Select
                                                                id={`medications[${index}].name`}
                                                                name={`medications[${index}].name`}
                                                                options={medicationsOptions.name
                                                                    .filter((item) =>
                                                                        !values.medications.some((m, i) => i !== index && m.name === item.name)
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
                                                                            // label: medicationsOptions.name.find((i) => i.id === medicine.name)?.name || '',
                                                                        }
                                                                        : null
                                                                }
                                                                onChange={(selectedOptions) => {
                                                                    const selectedIds = selectedOptions?.label || [];
                                                                    setFieldValue(`medications[${index}].name`, selectedIds);
                                                                }}
                                                                styles={getCustomSelectStyles('200px')}
                                                                placeholder="Medicine Name..."
                                                            />

                                                            <Select
                                                                id={`medications[${index}].dosage`}
                                                                name={`medications[${index}].dosage`}
                                                                options={medicationsOptions.dosage.map((item) => ({
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
                                                                    setFieldValue(`medications[${index}].dosage`, selectedIds);
                                                                }}
                                                                styles={getCustomSelectStyles('150px')}
                                                                placeholder="Dosage..."
                                                            />

                                                            <Select
                                                                id={`medications[${index}].frequency`}
                                                                name={`medications[${index}].frequency`}
                                                                options={medicationsOptions.frequency.map((item) => ({
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
                                                                    setFieldValue(`medications[${index}].frequency`, selectedIds);
                                                                }}
                                                                styles={getCustomSelectStyles('200px')}
                                                                placeholder="Frequency..."
                                                            />

                                                            <Field
                                                                name={`medications[${index}].duration`}
                                                                type="text"
                                                                className={styles.inputField}
                                                                placeholder="Duration..."
                                                                style={{ width: "140px" }}
                                                            />

                                                            <Field
                                                                name={`medications[${index}].note`}
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
                                            name="medications"
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
                                    <button type="submit" disabled={isSubmitting} style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer', backgroundColor: isSubmitting ? '#153679' : '' }}>
                                        View Prescription
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </>
            }
            {generatePDF &&
                <div className={styles.genPrescription}>
                    <PrescriptionTemplate data={combinedData} />
                </div>
            }
        </div>
    );
}
