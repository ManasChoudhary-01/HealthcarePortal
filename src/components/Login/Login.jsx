import React, { useState } from 'react';
import styles from './login.module.scss';

import axios from "axios";
import background from "../../assets/Login/background.png"
import email from "../../assets/Login/email.svg"
import pass from "../../assets/Login/password.svg"

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [alloswed, setAllowed] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('https://vitalize.strangled.net/api/auth/v2/staff-login', {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    username,
                    password
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setSuccess('Login successful!');
            console.log('Login response:', data);

            // You can handle successful login here
            // For example: redirect, store token, etc.

        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <img src={background} alt="Background" />
            </div>
            <div className={styles.loginCard}>

                <div className={styles.logoContainer}>
                    <div className={styles.logo}></div>
                    <p>Vitalize</p>
                </div>

                <div className={styles.header}>
                    <h1 className={styles.title}>Sign in</h1>
                    <p className={styles.description}>
                        Prescriptions, reports, and records all in one place, accessible always. Log in securely to your personalized dashboard
                    </p>
                </div>

                <div className={styles.form}>
                    <div className={styles.fieldGroup}>
                        <label htmlFor="username" className={styles.label}>
                            Username
                        </label>
                        <div className={styles.inputWrapper}>
                            <span className={styles.icon}>
                                <img src={email} alt="Email Icon" />
                            </span>
                            <input
                                type="text"
                                id="username"
                                className={styles.input}
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <div className={styles.inputWrapper}>
                            <span className={styles.icon}>
                                <img src={pass} alt="Password Icon" />
                            </span>
                            <input
                                type="password"
                                id="password"
                                className={styles.input}
                                placeholder="Enter your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.forgotPassword}>
                        <a href="#" className={styles.link}>Forgot Password?</a>
                    </div>

                    <button
                        className={styles.submitButton}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>

                    {/* {error && (
                        <div className={`${styles.message} ${styles.error}`}>
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className={`${styles.message} ${styles.success}`}>
                            {success}
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
};
