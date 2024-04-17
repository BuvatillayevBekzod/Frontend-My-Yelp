import { useState } from "react";
import { Link } from "react-router-dom";
import "../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { Typography } from "@mui/material";
import "./styles/Register.css";
const Register = ({ itemCollectionAccount }) => {
    // ... rest of your code ...
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmMassage, setShowConfirmMassage] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);

    const confirmPass = () => {
        if (confirmPassword == password) {
            return true;
        }
        return false;
    };

    const submitForm = (e) => {
        e.preventDefault();
        const confirm = confirmPass();
        if (confirm) {
            createUserWithEmailAndPassword(getAuth(), email, password).catch(
                () => setErrorMsg(true)
            );
            addDoc(itemCollectionAccount, {
                userName,
                email,
            });
        } else {
            setShowConfirmMassage(true);
        }
    };
    return (
        <div className="register-container">
            <div className="register-wrapper">
                <h2 className="register-title">Sign up for Yelp</h2>
                <p className="register-subtitle">
                    Sign up to continue to our platform.
                </p>

                <form onSubmit={submitForm}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="user">User Name</label>
                            <input
                                type="text"
                                id="user"
                                name="user"
                                className="form-control"
                                onChange={(e) => setUserName(e.target.value)}
                                value={userName}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                value={confirmPassword}
                                required
                            />
                            {showConfirmMassage && (
                                <Typography fontSize={14} color={"red"}>
                                    Please Confirm your password
                                </Typography>
                            )}
                        </div>
                    </div>
                    {errorMsg && (
                        <p className="error-message">
                            Change you Email or Password
                        </p>
                    )}
                    <p className="register-link">
                        You have an account? <Link to="/login">Login</Link>
                    </p>
                    <button type="submit" className="register-button">
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
