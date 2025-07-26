import React, { useState, useEffect } from "react";
import styles from "./queue.module.scss";
import Navbar from "../../Header/Navbar";
import { Link } from "react-router-dom";
import useAuthStore from "../../../context/useAuthStore";
import search from "../../../assets/Form/search.svg";

export default function Queue() {

    const [facts, setFacts] = useState([]);
    const [totalPatients, setTotalPatients] = useState(0);
    const [search, setSearch] = useState("");
    const { accessToken, hospitalId, roleId } = useAuthStore();

    useEffect(() => {

        const doctorId = roleId;

        const fetchData = async () => {
            const response = await fetch(`https://vitalize.strangled.net/api/appointment/queue/${doctorId}/${hospitalId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
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

    // console.log(facts);
    // console.log(totalPatients);
    // console.log(search);

    return (
        <div className={styles.queueContainer}>
            <Navbar />
            <div className={styles.header}>
                <h2>Queue</h2>
                <span className={styles.totalPatients}>{totalPatients} patients</span>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.searchContainer}>
                    <span className={styles.searchIcon}>
                        <img src={search} alt="search" />
                    </span>
                    <input onChange={(e) => setSearch(e.target.value)} className={styles.searchInput} type="text" placeholder="Search by UHID" />
                </div>
                <div className={styles.list}>
                    {facts.filter((item) => {
                        return search.toLowerCase() === ""
                            ? item
                            : item.patient.profile.firstName.toLowerCase().includes(search) || item.patient.profile.lastName.toLowerCase().includes(search);
                    }).map(item => (
                        <div className={styles.queueItem}>
                            <div className={styles.left}>
                                <h4>UHID:</h4>
                                <span className={styles.uhid}>{item.patient.profile.firstName + " " + item.patient.profile.lastName}</span>
                            </div>
                            <Link to={`/prescription/${item.patientId}`} target="_main">
                                <div className={styles.right}>Prescribe</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}