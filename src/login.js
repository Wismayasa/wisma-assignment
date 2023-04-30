import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setvalidation] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigate("/user/ListUser");
        }
    }, []);

    const loginHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('email', email);
        formData.append('password', password);

        await axios.post('http://127.0.0.1:8000/api/login', formData)
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            navigate("/user/ListUser");
        })
        .catch((error) => {
            setvalidation(error.response.data);
        })
    };

    return (
        <div class="min-h-[542px] flex items-center justify-center flex-col h-screen">
            <div class="w-[350px] bg-white text-center py-10 px-6 rounded-xl border-[1px] border-slate-300">
                <div class="mb-7">
                    <h4 class="text-xl">Log In</h4>
                    <p class="text-xs mb-1">Log in to your account</p>
                </div>
                <form onSubmit={loginHandler}>
                    {
                        validation.message && (
                            <p class="text-sm text-red-500 mb-2">{validation.message}</p>
                        )
                    }
                    <div class="mb-10 text-left">
                        <label class="text-sm">Email</label>
                        <input class="mt-1 py-4 px-3 mb-5 w-full block text-sm rounded-md border-[1px] border-slate-300" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        
                        <label class="text-sm">Password</label>
                        <input class="mt-1 py-4 px-3 w-full block text-sm rounded-md border-[1px] border-slate-300" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                        <button type="submit" class="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">Log In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;

