import React, { useState, useEffect } from "react";
import styles from "./registerform.module.scss";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import OtpInput from "react-otp-input";

export default function RegisterForm() {
    const [number, setNumber] = useState("");
    const [otp, setOtp] = useState("");

    return (
        <div className={styles.phoneInputContainer}>
            <div className={styles.wrapper}>
                <PhoneInput
                    defaultCountry="IN"
                    value={number}
                    onChange={setNumber}
                    placeholder="Enter phone number"
                    className={styles.customPhoneInput}
                />
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span></span>}
                    renderInput={(props) => <input {...props} className={styles.inputBox} />}
                    className={styles.otpInput}
                    inputStyle={{
                        width: '36px',
                        height: '42px',
                        fontSize: '18px',
                        fontWeight: '600',
                        border: '2px solid #ccc',
                        textAlign: 'center',
                    }}
                />
                <div className={styles.buttonContainer}>
                    <button className={styles.sendOtp}>Send OTP</button>
                </div>
            </div>
        </div>
    );
}
