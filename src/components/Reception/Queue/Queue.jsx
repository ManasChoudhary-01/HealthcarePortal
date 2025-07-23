import React, { useState, useEffect } from "react";
import styles from "./queue.module.scss";
import Navbar from "../../Header/Navbar";
import { Link, Navigate } from "react-router-dom";

export default function Queue() {

    const [facts, setFacts] = useState([]);
    const [listening, setListening] = useState(false);
    const [totalPatients, setTotalPatients] = useState(0);

    useEffect(() => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsIm9jY3VwYXRpb24iOnsib2NjdXBhdGlvbiI6IkRPQ1RPUiIsImlkIjoxLCJob3NwaXRhbHMiOlsxXX0sImlhdCI6MTc1MzIxOTMxMCwiZXhwIjoxNzUzMzA1NzEwfQ.XN-HLMtlVgUUHlwiUvzIU_x7KZgp4AEgjV4uGc9p5GI";
        const hospitalId = localStorage.getItem("hospitalId") || 1;
        const doctorId = 1;

        const fetchData = async () => {
            const response = await fetch(`https://vitalize.strangled.net/api/appointment/queue/${doctorId}/${hospitalId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "text/event-stream",
                },
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let buffer = "";

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                // Split buffer by newlines to get complete "data:" lines
                const lines = buffer.split("\n");

                for (let line of lines) {
                    line = line.trim();

                    if (line.startsWith("data:")) {
                        const dataString = line.slice(5).trim(); // remove "data:"

                        try {
                            const parsed = JSON.parse(dataString); // could be array or object
                            setFacts((prev) => [...prev, ...parsed]); // assuming parsed is array
                            setTotalPatients((prev) => prev + parsed.length);
                        } catch (error) {
                            console.error("JSON parse error:", dataString, error);
                            // Could optionally buffer again if incomplete
                        }
                    }
                }

                // Keep only the last partial line (if any) in buffer
                if (!buffer.endsWith("\n")) {
                    buffer = lines[lines.length - 1];
                } else {
                    buffer = "";
                }
            }
        };

        fetchData();
    }, []);

    console.log(facts);
    // console.log(totalPatients);

    return (
        <div className={styles.queueContainer}>
            <Navbar />
            <div className={styles.header}>
                <h2>Queue</h2>
                <span className={styles.totalPatients}>{totalPatients} patients</span>
            </div>
            <div className={styles.wrapper}>
                {/* <div className={styles.searchContainer}>
                    <input type="text" placeholder="Search by UHID" className={styles.searchInput} />
                </div> */}
                <div className={styles.list}>
                    {facts.map(item => (
                        <div className={styles.queueItem}>
                            <div className={styles.left}>
                                <h4>UHID:</h4>
                                <span className={styles.uhid}>{item.patient.profile.firstName + " " + item.patient.profile.lastName}</span>
                            </div>
                            <Link to={`/prescription/${item.patientId}`}>
                                <div className={styles.right}>Prescribe</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}