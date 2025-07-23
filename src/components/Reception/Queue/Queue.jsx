import React, {useState, useEffect} from "react";
import styles from "./queue.module.scss";
import Navbar from "../../Header/Navbar";
import { Link, Navigate } from "react-router-dom";

import { data } from "./data.js"

export default function Queue() {
    return(
        <div className={styles.queueContainer}>
            <Navbar />
            <h2>Queue</h2>
            <div className={styles.wrapper}>
                {/* <div className={styles.searchContainer}>
                    <input type="text" placeholder="Search by UHID" className={styles.searchInput} />
                </div> */}
                <div className={styles.list}>
                    {data.map(item => (
                        <div key={item.id} className={styles.queueItem}>
                            <div className={styles.left}>
                                <h4>UHID:</h4>
                                <span className={styles.uhid}>{item.uhid}</span>
                            </div>
                            <Link to="/prescription">
                                <div className={styles.right}>Prescribe</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}