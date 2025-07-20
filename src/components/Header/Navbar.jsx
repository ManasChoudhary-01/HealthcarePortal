import React from "react";
import styles from "./navbar.module.scss";
import logo from "/logo.png";

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <img src={logo} alt="Logo" />
            </div>
        </div>
    )
}