import React, { useState } from "react";
import styles from "./dashboard.module.scss";
import { Link } from "react-router-dom";

// import RoleWrapper from "../../helper/RoleWrapper";
import Navbar from "../../components/Header/Navbar";

export default function Dashboard() {

    const user = (localStorage.getItem("role"));
    const [role, setRole] = useState(user);

    return (
        <div className={styles.dashboardContainer}>
            <Navbar />
            {role === "RECEPTIONIST" &&
                <>
                    <h2>Receptionist Dashboard</h2>
                    <div className={styles.wrapper}>
                        <Link to="/reception_register">
                            <div className={styles.dashboardItem}>
                                <h3>Register a New Patient</h3>
                                <p>Quickly add a new patient to the system with all necessary details.</p>
                            </div>
                        </Link>

                        <Link to="/appointment">
                            <div className={styles.dashboardItem}>
                                <h3>Book an appointment</h3>
                                <p>Schedule a new appointment for an existing patient or a new one.</p>
                            </div>
                        </Link>
                    </div>
                </>
            }
        </div>
    )
}