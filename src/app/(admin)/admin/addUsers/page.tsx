"use client"
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { FormSchema } from '@/lib/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

interface User {
    userId: string;
    PRN: string;
    email: string;
    role: string;
}

export default function AddUsers() {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            PRN: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'STUDENT',
        },
    });
    const handleAdd = async (values: z.infer<typeof FormSchema>) => {
        try {
            await axios.post('/api/user/sign-up', values);
            const response = await axios.get('/api/user/getUsers');
            const updatedUsers = response.data;
            setUsers(updatedUsers);
            form.reset();
            toast.success('User added successfully')
        } catch (error: any) {
            toast.error('Error adding user')
            console.log("Following user")
        }
        console.log(values);
    }
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 50);
    }, []);

    return (
        <div className="flex justify-center items-center">
            {isLoading ? (
                <Skeleton className="w-[350px] h-[250px] bg-slate-700" />
            ) : (
                <Card className="w-auto bg-slate-700">
                    <CardHeader className='text-3xl text-slate-200 font-semibold'>Add Users</CardHeader>
                    <div className='justify-center items-center mb-8 px-16 text-slate-200'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleAdd)}>
                                <div className="flex w-1/4">
                                    <FormField
                                        control={form.control}
                                        name="PRN"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className='lg:text-xl sm:text-lg'>PRN</div></FormLabel>
                                                <FormControl>
                                                    <Input className='w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg bg-slate-200 text-black' placeholder='PRN' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex w-1/4">
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className='lg:text-xl sm:text-lg mt-2'>Email</div></FormLabel>
                                                <FormControl>
                                                    <Input className='w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg bg-slate-200 text-black' placeholder='mail@sitpune.edu.in' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex w-1/4">
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className='lg:text-xl sm:text-lg flex w-1/2 mt-2'>Password</div></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='password'
                                                        className='w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg bg-slate-200 text-black'
                                                        placeholder='Enter your password'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex w-1/4">
                                    <FormField
                                        control={form.control}
                                        name='confirmPassword'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className='lg:text-xl sm:text-lg mt-2'>Re-enter Password</div></FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Re-Enter your password'
                                                        className='w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg bg-slate-200 text-black'
                                                        type='password'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex w-1/4">
                                    <FormField
                                        control={form.control}
                                        name='role'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className='lg:text-xl sm:text-lg mt-2'>User Type</div></FormLabel>
                                                <FormControl>
                                                    <Select {...field} onValueChange={(selectedValue) => form.setValue('role', selectedValue)}>
                                                        <SelectTrigger className="w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg bg-slate-200 text-black">
                                                            <SelectValue placeholder="User type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="STUDENT">Student</SelectItem>
                                                            <SelectItem value="FACULTY">Faculty</SelectItem>
                                                            <SelectItem value="CLUBINCHARGE">Club Incharge</SelectItem>
                                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="">
                                    <Button
                                        className='w-full mt-3 flex justify-center items-center text-md shadow-indigo-500/50 hover:shadow-indigo-500/50 shadow-sm hover:shadow-md bg-gradient-to-br from-fuchsia-500 to-cyan-500 hover:bg-gradient-to-tl hover:from-fuchsia-500 hover:to-cyan-500 transition duration-300 ease-in-out'
                                        type='submit'
                                    >
                                        <div className="w-full flex justify-center items-center">Add User</div>
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </Card>
            )}
        </div>
    )
}
