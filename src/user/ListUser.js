import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import Header from '../element/Header';

function ListUser() {

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validationError, setvalidationError] = useState([])

    const createuser = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)

        await axios.post(`http://127.0.0.1:8000/api/user/store`, formData).then(({data}) => {
            fetchDataUser()
            Swal.fire({
                icon:"success",
                text:data.message
            }).then(function(){
                navigate(0);
            });
            

        }).catch(({response}) => {
            if(response.status===422) {
                setvalidationError(response.data.errors)
            }else{
                Swal.fire({
                    text:response.data.message,
                    icon:"error"
                })
            }
        })
    }


    const [datauser, setDataUser] = useState([])
    useEffect(() => {
        fetchDataUser()
    },[])

    const fetchDataUser = async () => {
        await axios.get(`http://127.0.0.1:8000/api/user`).then(({data}) =>{
            setDataUser(data)
        })
    }

    const deleteuser = async (id) => {
        const isConfirm = await Swal.fire ({
            titie: 'Are you sure ?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'yes'
        }).then((result) => {
            return result.isConfirmed
        });

        if (!isConfirm) {
            return;
        }

        await axios.delete(`http://127.0.0.1:8000/api/user/destroy/${id}`).then(({data}) => {
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchDataUser()
        }).catch(({response:{data}}) => {
            Swal.fire({
                text:data.message,
                icon:"error"
            })
        })
    } 

    return (  
    <>
    <Header />
    <div class="container mx-auto">
        <div class="w-full">
            <div class="mt-14 p-10 border-2 border-slate-50 rounded-3xl shadow-lg">
                <h1 class="mb-5 text-center text-xl font-semibold">CRUD Alfa Prima</h1>
                <div class="mx-auto p-5 mb-10 border-2 border-slate-50 rounded-md">
                    <h2 class="text-base font-medium mb-3">Add Data User</h2>
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
                    <form onSubmit={createuser}>
                        <div class="md:flex md:gap-5">
                            <div class="md:w-1/2">
                                <div class="flex flex-col mb-4">
                                    <label class="text-sm mb-2">Name</label>
                                    <input type="text" class="px-2 py-1 text-sm rounded-md border-[1px]" placeholder="Enter Name here..." value={name} onChange={(event)=>{setName(event.target.value)}} required></input>    
                                </div>
                                <div class="flex flex-col mb-4">
                                    <label class="text-sm mb-2">Email</label>
                                    <input type="text" class="px-2 py-1 text-sm rounded-md border-[1px]" placeholder="Enter Email here..." value={email} onChange={(event)=>{setEmail(event.target.value)}} required></input>    
                                </div>
                            </div>
                            <div class="md:w-1/2">
                                <div class="flex flex-col mb-4">    
                                    <label class="text-sm mb-2">Password</label>
                                    <input type="text" class="px-2 py-1 text-sm rounded-md border-[1px]" placeholder="Enter Password here..." value={password} onChange={(event)=>{setPassword(event.target.value)}} required></input>    
                                </div>
                                <label class="text-sm mb-3">Save</label>
                                <button type="submit" class="md:block px-3 py-2 text-sm bg-green-600  rounded-full text-white hover:bg-white hover:text-green-600 hover:border-2 hover:border-green-600"> <i class="fa fa-add text-xs"></i> Add Data User</button>
                            </div>
                        </div>
                    </form>
                </div>
                
                <div class="p-5 border-2 border-slate-50 rounded-md">
                    <h2 class="text-lg font-semibold mb-3">Data User</h2>
                    <div class="overflow-auto">
                        <table class="w-full table-auto divide-y overflow-x-scroll">
                            <thead class="text-left">
                                <tr>
                                    <th class="px-6 py-2 text-sm">No</th>
                                    <th class="px-6 py-2 text-sm">Name</th>
                                    <th class="px-6 py-2 text-sm">Email</th>
                                    <th class="px-6 py-2 text-sm">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    datauser.length > 0 && (
                                        datauser.map((row, key) => (
                                            <tr key={key}>
                                                <td class="px-6 py-2 text-sm whitespace-nowrap">{key + 1}</td>
                                                <td class="px-6 py-2 text-sm whitespace-nowrap">{row.name}</td>
                                                <td class="px-6 py-2 text-sm whitespace-nowrap">{row.email}</td>
                                                <td class="px-6 py-2 text-sm whitespace-nowrap">
                                                    <Link class="pr-[2px] py-2"><i class="fa-solid fa-eye text-base"></i></Link>
                                                    <Link to={`/user/Edit/${row.id}`} class="pr-[2px] py-2"><i class="fa-solid fa-pen-to-square text-base"></i></Link>
                                                    <button className="pr-[2px] py-2" onClick={()=>deleteuser(row.id)}><i className="fa-regular fa-trash-can text-base"></i></button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                            <tfoot class="text-left">
                                <tr>
                                    <th class="px-6 py-2 text-sm">No</th>
                                    <th class="px-6 py-2 text-sm">Name</th>
                                    <th class="px-6 py-2 text-sm">Email</th>
                                    <th class="px-6 py-2 text-sm">Action</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    );
}

export default ListUser;

