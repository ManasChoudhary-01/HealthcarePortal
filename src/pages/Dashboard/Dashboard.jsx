import React from "react";
import styles from "./dashboard.module.scss";
import { Link } from "react-router-dom";

export default function Dashboard() {

    return (
        <div className={styles.dashboardContainer}>
            <Link to="/prescription">
                <div className={styles.dashboardItem}>Generate Prescription</div>
            </Link>

            <Link to="/reception">
                <div className={styles.dashboardItem}>Reception Desk</div>
            </Link>

            <Link to="/register">
                <div className={styles.dashboardItem}>Patient Registration</div>
            </Link>
        </div>
    )
}