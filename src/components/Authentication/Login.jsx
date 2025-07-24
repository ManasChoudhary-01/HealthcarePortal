import React, { useState, useEffect } from 'react';
import styles from './login.module.scss';
import axios from "axios";
import useAuthStore from "../../context/useAuthStore";
import { useNavigate } from 'react-router-dom';

import background from "../../assets/Login/background.png"
import email from "../../assets/Login/email.svg"
import pass from "../../assets/Login/password.svg"

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuthStore();
    const navigate = useNavigate();

    const loginData = {
        email: username,
        password: password,
    };

    useEffect(() => {
        if (username && password) {
            setEnabled(true)
            return;
        }
    }, [username, password]);

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('https://vitalize.strangled.net/api/auth/v2/staff-login', loginData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const role = response.data?.occupation?.occupation;
            const roleId = response.data?.occupation?.id;
            const hospitalId = response.data?.occupation?.hospitals?.[0];

            if (!role) {
                console.error("Role is missing in API response");
                return;
            }

            login({
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
                role: role,
                roleId: roleId,
                hospitalId: hospitalId,
            });

            navigate("/dashboard");
            // localStorage.setItem("role", role);
            // localStorage.setItem("hospitalId", hospitalId);

            alert("Signed in as " + role);

            // const data = response.data;
            // setSuccess('Login successful!');
            // console.log('Login response:', data);

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

                    {error && (
                        <div className={styles.errorMessage}>{error}</div>
                    )}

                    <div className={styles.forgotPassword}>
                        <a href="#" className={styles.link}>Forgot Password?</a>
                    </div>

                    <button
                        className={styles.submitButton}
                        id={enabled ? "" : styles.disabled}
                        onClick={handleLogin}
                        disabled={!enabled}
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </div>
            </div>
        </div>
    );
};
