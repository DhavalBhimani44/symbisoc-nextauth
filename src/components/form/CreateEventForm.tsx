"use client"
import { eventSchema } from "@/lib/validationSchema";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type CreateEventForm = z.infer<typeof eventSchema>;

const CreateEventForm = () => {
    const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false)
    const router = useRouter();
    const form = useForm<z.infer<typeof eventSchema>>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: '',
            description: '',
            organizingClub: '',
            date: '',
            time: '',
            location: '',
            speaker: '',
            speakerDesignation: '',
        },
    });
    const onSubmit = async (values: z.infer<typeof eventSchema>) => {
        setIsLoadingButton(true)
        try {
            const formattedValues = {
                ...values,
                date: new Date(values.date).toISOString(),
            };
            await axios.post('/api/event/createEvent', formattedValues);
            toast.success('Event created successfully');
            router.push('/clubincharge/viewEvents');
        } catch (error: any) {
            toast.error(error.message)
            console.log("Following error occured: ", error)
        } finally {
            setIsLoadingButton(false)
        }
    }
    return (
        <Card className="w-full items-center bg-slate-700 text-neutral-950 justify-center">
            <CardHeader >
                <CardTitle className="text-3xl text-slate-100">Create Events</CardTitle>
                <CardDescription className="text-md text-zinc-400">Create Events easily using SymbiSoc.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col justify-center items-center py-1'>
                        <div className="flex flex-col w-full min-h-full space-y-2 justify-center items-center text-slate-200">
                            <div className="flex flex-wrap w-full p-2 justify-around">
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='title'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Event Title*</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Event Title" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='description'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Event Description*</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Event Description" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='organizingClub'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className='lg:text-xl sm:text-lg'>Organizing Club*</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Organizing Club" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full p-2 justify-around">
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='date'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Event Date*</div></FormLabel>
                                                <FormControl>
                                                    <Input type="date" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='time'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Event Time*</div></FormLabel>
                                                <FormControl>
                                                    <Input type="time" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='location'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Event Venue*</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Event Venue" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full p-2 justify-around">
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='speaker'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Speaker Name*</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Speaker Name" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='speakerDesignation'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Speaker Designation*</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Speaker Designation" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='speakerCompany'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Speaker Company</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Speaker Company" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full p-2 justify-around">
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='speakerMail'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Speaker Email</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="example@email.com" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='speakerContact'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Speaker Contact Info.</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Speaker Contact Info" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='academicyear'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Academic Year</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Academic Year" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full p-2 justify-around">
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='faculty'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Faculty Name</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Faculty Name" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='facultyMail'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Faculty Mail</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="example@email.com" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='facultyContact'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Faculty Contact Info.</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Faculty Contact" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full p-2 justify-around">
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='course'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Course Name</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Course Name" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='batch'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Batch</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="22-26" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='branch'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Branch</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="22-26" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full p-2 justify-around">
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='semester'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className='lg:text-xl sm:text-lg'>Semester</div></FormLabel>
                                                <FormControl>
                                                    <Select {...field} onValueChange={(selectedValue) => form.setValue('ODD', selectedValue)}>
                                                        <SelectTrigger className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900">
                                                            <SelectValue placeholder="Semester" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="ODD">Odd</SelectItem>
                                                            <SelectItem value="EVEN">Even</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='year'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className='lg:text-xl sm:text-lg'>Year</div></FormLabel>
                                                <FormControl>
                                                    <Select {...field} onValueChange={(selectedValue) => form.setValue('year', selectedValue)}>
                                                        <SelectTrigger className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900">
                                                            <SelectValue placeholder="Year" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="FIRSTYEAR">1st Year</SelectItem>
                                                            <SelectItem value="SECONDYEAR">2nd Year</SelectItem>
                                                            <SelectItem value="THIRDYEAR">3rd Year</SelectItem>
                                                            <SelectItem value="FOURTHYEAR">4th Year</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='division'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className='lg:text-xl sm:text-lg'>Division</div></FormLabel>
                                                <FormControl>
                                                    <Select {...field} onValueChange={(selectedValue) => form.setValue('division', selectedValue)}>
                                                        <SelectTrigger className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900">
                                                            <SelectValue placeholder="Division" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="A">A</SelectItem>
                                                            <SelectItem value="B">B</SelectItem>
                                                            <SelectItem value="C">C</SelectItem>
                                                            <SelectItem value="D">D</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full p-2 justify-around">
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='copo'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">CO and PO numbers</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="CO/PO" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col w-full justify-center items-center mt-4'>
                            <Button isLoading={isLoadingButton} className='w-max h-fit hover:shadow active:translate-y-[2px] hover:-translate-y-[1px] text-md shadow-inner mt-10 bg-slate-200' type='submit'>
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default CreateEventForm;