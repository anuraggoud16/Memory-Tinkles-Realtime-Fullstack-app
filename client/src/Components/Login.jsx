import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import './login.css'; // Import the CSS file

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/", { username, password })
                .then((res) => {
                    if (res.data === "exist") {
                        navigate("/home", { state: { id: username } });
                    } else if (res.data === "notexist") {
                        alert("User has not signed up");
                    }
                });
        } catch (e) {
            alert("Wrong details");
            console.log(e);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <br />
            <Link to="/" className="signup-link">Signup Page</Link>
        </div>
    );
}

export default Login;
