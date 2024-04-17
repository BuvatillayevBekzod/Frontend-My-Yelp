import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./styles/Login.css";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [wrongMsg, setWrongMsg] = useState(false);

    const loginHandler = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(getAuth(), email, password)
            .then(() => setWrongMsg(false))
            .catch(() => setWrongMsg(true));
    };

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <h2 className="login-title">Sign in for Yelp</h2>
                <p className="login-subtitle">
                    Sign in to continue to our platform.
                </p>

                <form onSubmit={loginHandler}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    {wrongMsg && (
                        <p className="error-message">
                            Your email or password is Wrong
                        </p>
                    )}

                    <p className="register-link">
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                    </p>
                    <button type="submit" className="login-button btn-primary">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
