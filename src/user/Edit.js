import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../element/Header';

function Edit() {
    const navigate = useNavigate();
    const {id} = useParams()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validationError, setvalidationError] = useState({})

    useEffect(()=> {
        fetchDataUser()
    },[])

    const fetchDataUser = async () => {
        await axios.get(`http://127.0.0.1:8000/api/user/show/${id}`).then(({data})=>{
            const {name, email} = data.user
            setName(name)
            setEmail(email)
        }).catch(({response:{data}}) => {
            Swal.fire({
                text:data.message,
                icon:"error"
            })
        })
    }

    const updateuser = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('_method', 'PATCH');
        formData.append('name', name)
        formData.append('email', email);
        formData.append('password', password);

        await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`, formData).then(({data}) => {
            Swal.fire({
                icon:"success",
                text:data.message
            })
            navigate("/user/ListUser");
        }).catch(({response}) => {
            if(response.status===422){
                setvalidationError(response.data.errors)
            }else{
                Swal.fire({
                    text:response.data.message,
                    icon:"error"
                })
            }
        })
    }
    
    return (
    <div>
    <Header />
    <div class="container mx-auto">
        <div class="w-full">
            <div class="mt-14 p-10 border-2 border-slate-50 rounded-3xl shadow-lg">
                <div class="flex items-center mb-4">
                    <Link class="mr-1 text-xs" to={"/user/ListUser"} >Data User</Link>
                    <i class="fa-solid fa-chevron-right text-[10px] mr-1"></i>
                    <p class="text-xs">Edit Data User</p>
                </div>
                <div class="mx-auto p-5 border-2 border-slate-50 rounded-md">
                    <h2 class="text-base font-medium mb-3">Edit Data User</h2>
                    {
                        Object.keys(validationError).length > 0 && (
                            <div className="w-full">
                                {
                                    Object.entries(validationError).map(({key, value}) => {
                                        <li key={key}>{value}</li>
                                    })
                                }
                            </div>
                        )
                    }
                    <form onSubmit={updateuser}>
                        <div class="md:flex md:gap-5">
                        <div class="md:w-1/2">
                        <div class="flex flex-col mb-4">
                            <label class="text-sm mb-2">Name</label>
                            <input type="text" class="px-2 py-1 text-sm rounded-md border-[1px]" placeholder="Enter Name here..." value={name} onChange={(event)=>{setName(event.target.value)}} required maxLength="100"></input>    
                        </div>
                        <div class="flex flex-col mb-4">
                            <label class="text-sm mb-2">Email</label>
                            <input type="text" class="px-2 py-1 text-sm rounded-md border-[1px]" placeholder="Enter Email here..." value={email} onChange={(event)=>{setEmail(event.target.value)}} required maxLength="100"></input>    
                        </div>
                        </div>
                        <div class="md:w-1/2">
                        <div class="flex flex-col mb-4">
                            <label class="text-sm mb-2">Password</label>
                            <input type="text" class="px-2 py-1 text-sm rounded-md border-[1px]" placeholder="Enter Password here..." value={password} onChange={(event)=>{setPassword(event.target.value)}} maxLength="50"></input>    
                        </div>
                            <label class="text-sm mb-3">Save</label>
                            <button type="submit" class="block px-3 py-2 text-sm bg-green-600  rounded-full text-white hover:bg-white hover:text-green-600 hover:border-2 hover:border-green-600"> <i class="fa fa-add text-xs"></i> Save</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
}

export default Edit;

