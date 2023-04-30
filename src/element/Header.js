import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Header() {

    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const fetchData = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.get('http://127.0.0.1:8000/api/datauser')
        .then((response) => {
            setUser(response.data);
        })    
    }

    useEffect(() => {
        if(!token) {
            navigate('/');
        }

        fetchData();
    }, []);

    const logoutHandler = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.post('http://127.0.0.1:8000/api/logout')
        .then(() => {
            localStorage.removeItem("token");
            navigate('/');
        });
    };
    

    return (
    <header class="bg-white fixed top-0 left-0 w-full flex items-center z-10">
        <div class="container mx-auto">
            <div class="flex items-center justify-between relative">
                <div class="px-4 lg:px-7">
                    <div class="text-sm block px-3 py-3">{user.name}</div>
                </div>
                <div class="flex items-center px-4">
                    <nav class="w-full p-3">
                        <ul>
                            <li class="group">
                                <button onClick={logoutHandler} class="text-sm font-semibold"><i class="fa-solid fa-arrow-right-from-bracket mr-2"></i>Logout</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>
    );
}

export default Header;

