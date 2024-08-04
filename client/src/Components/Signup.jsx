import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import "./login.css";

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/signup", { username, password });
            if (response.data === "exist") {
                alert("Username exists");
            } else if (response.data === "inserted") {
                navigate("/home", { state: { id: username } });
            }
        } catch (e) {
            alert("An error occurred during signup");
            console.log(e);
        }
    }

    return (
        <div className="login-container">
            <h2>Sign Up</h2>
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
                <button type="submit">Sign Up</button>
            </form>
            <br/>
            <Link to="/login" className="signup-link">Login</Link>
        </div>
    );
};

export default Signup;
