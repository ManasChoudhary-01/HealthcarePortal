import React, { useState, useEffect } from "react";
import styles from "./registerform.module.scss";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import OtpInput from "react-otp-input";

export default function RegisterForm() {

    const [number, setNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [screen, setScreen] = useState(false);
    const [error, setError] = useState("");
    const [seconds, setSeconds] = useState(0);
    const [canResend, setCanResend] = useState(false);

    const getOtp = (e) => {
        e.preventDefault();

        if (number.length !== 13) {
            setError("Please enter a valid phone number.");
            return;
        }

        setError("");
        setScreen(true);
        setSeconds(60);
    }

    const verify = () => {

    }

    useEffect(() => {
        let timer;
        if (seconds > 0) {
            setCanResend(false)
            timer = setTimeout(() => setSeconds((prev) => prev - 1), 1000);
        } else {
            setCanResend(true);
        }

        return () => clearTimeout(timer);
    }, [seconds]);

    const handleResend = () => {
        if (!canResend) return;

        console.log("Resending OTP...");

        setSeconds(60);
        setCanResend(false);
    };

    return (
        <div className={styles.phoneInputContainer}>
            <div className={styles.phnoScreen} style={{ display: !screen ? "flex" : "none" }}>
                <h2>Verify your Phone number</h2>
                <p>Add your phone number. We'll send you a verification code so we know you are real.</p>
                <PhoneInput
                    defaultCountry="IN"
                    value={number}
                    onChange={setNumber}
                    maxLength={11}
                    placeholder="Enter phone number"
                    className={styles.customPhoneInput}
                />
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.buttonContainer}>
                    <button className={styles.sendOtp} onClick={getOtp}>Send OTP</button>
                </div>
            </div>
            <div className={styles.otpScreen} style={{ display: screen ? "flex" : "none" }}>
                <h2>Verify your Phone number</h2>
                <p className={styles.text}>Enter your OTP code here.</p>
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
                <div className={styles.resendContainer} style={{cursor: canResend ? "pointer" : "not-allowed"}}>
                    <p onClick={handleResend}>Resend OTP <span style={{ display: canResend ? "none" : "inline" }}>in {seconds}s</span></p>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.sendOtp} onClick={verify}>VERIFY</button>
                </div>
            </div>
        </div>
    );
}
