import React from "react";
import styles from "./template.module.scss";
import html2pdf from "html2pdf.js";

import logo from "../../../assets/Prescription/logo.svg";
import watermark from "../../../assets/Prescription/watermark.svg";
import rx from "../../../assets/Prescription/rx.svg";

export default function PrescriptionTemplate({data}) {

    function downloadPdf() {
        const element = document.getElementById("pdf");
        const opt = {
            // margin: [10, 10, 10, 10],               // mm if jsPDF.unit === 'mm'
            filename: 'prescription.pdf',
            image: { type: 'jpeg', quality: 1 },     // PNG = lossless
            html2canvas: {
                scale: Math.min(4, window.devicePixelRatio * 2), // bump this up to 3–4
                useCORS: true,                         // load external images/fonts
                letterRendering: true,                 // slightly better glyph rendering
                scrollX: 0,
                scrollY: 0,
                backgroundColor: null,                 // keep transparent bg if you want
            },
            jsPDF: {
                unit: 'mm',                            // use real-world units
                format: 'a4',
                orientation: 'portrait',
                putOnlyUsedFonts: true,
                floatPrecision: 16                     // reduce rounding artifacts
            },
            pagebreak: { mode: ['css', 'legacy'] }   // respect CSS page-breaks
        };


        html2pdf().set(opt).from(element).save();
        // html2pdf()
        //     .from(element)
        //     .save("prescription.pdf");

    }

    return (
        <>
            <div className={styles.templateContainer} id="pdf">
                <div className={styles.pdf}>
                    <div className={styles.header}>
                        <div className={styles.doctorInfo}>
                            <h2>Dr. Manas Choudhary</h2>
                            <p>Cardiologist</p>
                            <div className={styles.regNo}>Reg No: 12345</div>
                        </div>
                        <div className={styles.logo}>
                            <img src={logo} alt="Logo" />
                        </div>
                    </div>
                    <div className={styles.patientInfo}>
                        <div className={styles.item} id={styles.name}>
                            <span className={styles.label}>Patient Name:</span>
                            <span className={styles.value}>{data?.patient?.profile?.firstName} {data?.patient?.profile?.lastName}</span>
                        </div>

                        <div className={styles.item} id={styles.date}>
                            <span className={styles.label}>Date:</span>
                            <span className={styles.value}>24-07-2025</span>
                        </div>

                        <div className={styles.item} id={styles.age}>
                            <span className={styles.label}>Age:</span>
                            <span className={styles.value}>80</span>
                        </div>

                        <div className={styles.item} id={styles.gender}>
                            <span className={styles.label}>Gender:</span>
                            <span className={styles.value}>{data?.patient?.profile?.gender}</span>
                        </div>

                        <div className={styles.item} id={styles.weight}>
                            <span className={styles.label}>Weight:</span>
                            <span className={styles.value}>70 kg</span>
                        </div>

                        <div className={styles.item} id={styles.diagnosis}>
                            <span className={styles.label}>Diagnosis:</span>
                            <span className={styles.value}>{data?.prescription?.diagnosis.join(", ")}</span>
                        </div>
                    </div>
                    <div className={styles.rxContainer}>
                        <div className={styles.watermark}>
                            <img src={watermark} alt="Watermark" />
                        </div>
                        <div className={styles.rxHeader}>
                            <img src={rx} alt="Rx" />
                        </div>    
                    </div>
                </div>

            </div>
            <button className={styles.downloadPdf} onClick={downloadPdf} data-html2canvas-ignores="true">Submit Prescription</button>
        </>
    )
}