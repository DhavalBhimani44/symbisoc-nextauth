"use client"
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { FormSchema } from '@/lib/validationSchema';
import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as z from 'zod';

type FormSchema = z.infer<typeof FormSchema>

interface User {
    id: string;
    userId: string;
    PRN: string;
    email: string;
    role: string;
}

interface ChangeEvent {
    target: {
        name: string;
        value: string;
    };
}

const UsersTab = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [formData, setFormData] = useState({
        userId: "",
        PRN: "",
        email: "",
        role: ""
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState<User[]>([]);
    const [isopen, setIsopen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/user/getUsers');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching users: ', error);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleEdit = (user: User) => {
        setFormData({
            userId: user.id,
            PRN: user.PRN,
            email: user.email,
            role: user.role
        });
    }

    const handleChange = (e: ChangeEvent) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await axios.put(`/api/user/updateUsers`, formData);
            const updatedUser = response.data.data;
            setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
            toast.success('User updated successfully');
            setFormData({
                userId: "",
                PRN: "",
                email: "",
                role: "",
            })
            setIsopen(false);
        } catch (error) {
            console.log('Error updating user: ', error);
        }finally{
            setIsLoading(false);
        }
    }

    const handleDelete = async (user: User) => {
        try {
          const userId = user.id;
          console.log("user id: ", userId);
          await axios.delete('/api/user/deleteUser', {
            data: {
                id: userId
            }
          });
          toast.success('User deleted successfully');
          setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };

    const handleSearch = () => {
        const result = users.filter(user =>
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResult(result);
    }

    return (
        <>
            <div className="w-full h-full">
                <div className="flex justify-between mb-4 w-full">
                    <div className="flex w-full gap-3 sm:w-full md:w-full lg:w-1/2 xl:w-1/2 my-0 sm:my-4 md:my-4 lg:my-0 xl:my-0">
                        <div className="w-full flex justify-end items-center sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 mx-0 sm:mx-2 md:mx-2 lg:mx-0 xl:mx-0 my-0 sm:my-2 md:my-2 lg:my-0 xl:my-0">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch();
                                    }
                                }}
                                placeholder="Search by email"
                                className="w-64 h-8 px-3 py-1.5 text-black rounded-3xl"
                            />
                        </div>
                        <div className="w-full flex items-center sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 sm:mx-2 md:mx-2 lg:mx-0 xl:mx-0">
                            <Button size={"sm"} className="rounded-3xl" onClick={handleSearch}><Search size={15} /></Button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mb-8 mt-8 top-14 sticky rounded-md z-10">
                    <Table className="w-full rounded-lg text-neutral-950 text-sm sm:text-sm md:text-sm lg:text-md xl:text-md">
                        <TableBody className="w-full rounded-lg">
                            <TableRow className="text-gray-200 hover:bg-neutral-950 rounded-lg bg-neutral-900">
                                <TableCell className="w-1/4 rounded-tl-lg">PRN</TableCell>
                                <TableCell className="w-1/4">Email Address</TableCell>
                                <TableCell className="w-1/4">Role</TableCell>
                                <TableCell className="w-1/4 rounded-tr-lg">Action</TableCell>
                            </TableRow>
                            <TableRow className="text-black bg-gray-200 rounded-lg hover:bg-gray-300 w-full">
                                <TableCell>
                                    <input
                                        type="text"
                                        id="PRN"
                                        name="PRN"
                                        value={formData.PRN}
                                        onChange={handleChange}
                                        className="w-64 h-8 px-2 rounded-xl"
                                        placeholder="PRN"
                                    />
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-64 h-8 px-2 rounded-xl"
                                        placeholder="Email"
                                    />
                                </TableCell>
                                <TableCell>
                                    <select
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-64 h-8 px-2 rounded-xl"
                                    >
                                        <option value="STUDENT">Student</option>
                                        <option value="FACULTY">Faculty</option>
                                        <option value="CLUBINCHARGE">Club Incharge</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </TableCell>
                                <TableCell>
                                    <Button className="rounded-3xl" isLoading={isLoading} onClick={handleSubmit}>Submit</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <div className="flex justify-between mb-4">
                    {loading ? (
                        <Skeleton className="w-full h-[350px] bg-slate-700"/>
                    ) : (<Table className="w-full rounded-lg text-neutral-950 text-sm sm:text-sm md:text-sm lg:text-md xl:text-md">
                        <TableBody className="w-full rounded-lg">
                            <TableRow className="top-0 sticky rounded-xl bg-neutral-900 text-gray-200 hover:bg-neutral-950">
                                <TableCell className="rounded-tl-lg">PRN</TableCell>
                                <TableCell>Email Address</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell className="rounded-tr-lg">Delete</TableCell>
                            </TableRow>
                            {searchResult.length > 0 ? searchResult.map((user: User) => (
                                <TableRow key={user.userId} className="bg-gray-200 hover:bg-gray-300">
                                    <TableCell>{user.PRN}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Button className="rounded-3xl" onClick={() => handleEdit(user)}>Edit</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button className="rounded-3xl" onClick={() => handleDelete(user)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            )) : users.map((user: User) => (
                                <TableRow key={user.userId} className="bg-gray-200 hover:bg-gray-300">
                                    <TableCell>{user.PRN}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Button className="rounded-3xl" onClick={() => handleEdit(user)}>Edit</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button className="rounded-3xl" onClick={() => handleDelete(user)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>)}
                </div>
            </div>
        </>
    );
}

export default UsersTab;
