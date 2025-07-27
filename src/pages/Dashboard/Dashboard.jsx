import React, { useState, useEffect, use } from "react";
import styles from "./dashboard.module.scss";
import { Link } from "react-router-dom";

import RoleWrapper from "../../helper/RoleWrapper";
import Navbar from "../../components/Header/Navbar";
import useAuthStore from "../../context/useAuthStore";

export default function Dashboard() {

    const role = useAuthStore((state) => state.role);
    const [heading, setHeading] = useState("Dashboard");

    useEffect(() => {

        if (role === "RECEPTIONIST") {
            setHeading("Receptionist Dashboard");
        } else if (role === "DOCTOR") {
            setHeading("Doctor Dashboard");
        } else if (role === "PHARMACIST") {
            setHeading("Pharmacist Dashboard");
        } else if (role === "LAB_TECHNICIAN") {
            setHeading("Lab Technician Dashboard");
        } else {
            setHeading("Dashboard");
        }
    },[role])

    return (
        <div className={styles.dashboardContainer}>
            <Navbar />

            <h2>{heading}</h2>
            <div className={styles.wrapper}>

                <RoleWrapper allowedRoles={["RECEPTIONIST"]}>
                    <Link to="/reception_register">
                        <div className={styles.dashboardItem}>
                            <h3>Register a New Patient</h3>
                            <p>Quickly add a new patient to the system with all necessary details.</p>
                        </div>
                    </Link>
                </RoleWrapper>

                <RoleWrapper allowedRoles={["RECEPTIONIST", "DOCTOR"]}>
                    <Link to="/appointment">
                        <div className={styles.dashboardItem}>
                            <h3>Book an appointment</h3>
                            <p>Schedule a new appointment for an existing patient or a new one.</p>
                        </div>
                    </Link>
                </RoleWrapper>

                <RoleWrapper allowedRoles={["DOCTOR"]}>
                    <Link to="/queue">
                        <div className={styles.dashboardItem}>
                            <h3>View Appointment Queue</h3>
                            <p>Check and manage all upcoming patient appointments in real-time.</p>
                        </div>
                    </Link>
                </RoleWrapper>
            </div>

        </div>
    )
}