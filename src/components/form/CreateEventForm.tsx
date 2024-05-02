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
        }finally{
            setIsLoadingButton(false)
        }
    }
    return (
        <Card className="w-full items-center bg-slate-700 text-neutral-950 justify-center">
            <CardHeader >
                <CardTitle className="text-3xl text-slate-900">Create Events</CardTitle>
                <CardDescription className="text-md text-slate-900/90">Create Events easily using SymbiSoc.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col justify-center items-center py-1'>
                        <div className="flex flex-col w-full min-h-full space-y-2 justify-center items-center">
                            <div className="flex flex-wrap w-full p-2 justify-around">
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='title'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg text-slate-900">Event Title</div></FormLabel>
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
                                                <FormLabel><div className="lg:text-xl sm:text-lg text-slate-900">Event Description</div></FormLabel>
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
                                                <FormLabel><div className='lg:text-xl sm:text-lg text-slate-900'>Organizing Club</div></FormLabel>
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
                                                <FormLabel><div className="lg:text-xl sm:text-lg text-slate-900">Event Date</div></FormLabel>
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
                                                <FormLabel><div className="lg:text-xl sm:text-lg text-slate-900">Event Time</div></FormLabel>
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
                                                <FormLabel><div className="lg:text-xl sm:text-lg text-slate-900">Event Venue</div></FormLabel>
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
                                                <FormLabel><div className="lg:text-xl sm:text-lg text-slate-900">Speaker Name</div></FormLabel>
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
                                                <FormLabel><div className="lg:text-xl sm:text-lg text-slate-900">Speaker Designation</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Speaker Designation" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-slate-100 bg-slate-900" {...field} />
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