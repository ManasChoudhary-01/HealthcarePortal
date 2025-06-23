import React, { forwardRef } from "react";
import styles from "./template.module.scss";

const Prescription = forwardRef(({ data }, ref) => {

    const today = new Date();
    const currentDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear().toString().slice(-2)}`;
    // console.log(currentDate);

    return (
        <div ref={ref} className={styles.prescriptionTemplate}>
            <div className={styles.header}>
                <div className={styles.doctorInfo}>
                    <h2>Dr. Mukesh D. Gupta</h2>
                    <p>MBBS, MD</p>
                    <p>General Medicine</p>
                    <p>Reg No.: 12345</p>
                </div>
                <div className={styles.logo}></div>
            </div>
            <div className={styles.serialNumber}>
                <p>
                    <span>Prescription Serial No:</span>123456
                </p>
                <p>
                    <span>Date:</span> {currentDate}
                </p>
            </div>
            <div className={styles.patientInfo}>
                <p>
                    <span>Patient Name:</span> {data.patientName}
                </p>
                <p>
                    <span>Age:</span> {data.patientAge}
                </p>
                <p>
                    <span>Contact Number:</span> {data.phone}
                </p>
                <p>
                    <span>Email:</span> {data.email}
                </p>
                <p>
                    <span>Sex:</span> {data.gender}
                </p>
                <p>
                    <span>Diagnosis:</span> {data.diagnosis}
                </p>
            </div>
            <div className={styles.prescriptionDetails}>
                <h2>Rx</h2>
                <p>{data.prescription}</p>
            </div>
            <div className={styles.notes}>
                <h2>Additional Notes:</h2>
                <p>{data.symptoms}</p>
            </div>
            <div className={styles.footer}>
                <div className={styles.left}>
                    <p>Doctor's Signature: ____________________</p>
                    <p>
                        <span>Date:</span> {currentDate}
                    </p>
                </div>
                <div className={styles.right}>
                    <div className={styles.stamp}></div>
                    <p>Doctor's Stamp</p>
                </div>
            </div>
        </div>
    );
});

export default Prescription;
