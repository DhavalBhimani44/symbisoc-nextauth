'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import axios from 'axios';
import { Bell } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface EventProps {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    speaker: string;
    speakerDesignation: string;
}

export default function RegisteredEventsCard() {
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const { data: session } = useSession()

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/event/registeredEvents');
                console.log(response.data)
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' } as const;
        return date.toLocaleDateString('en-GB', options);
    };
    return (
        <div className="w-full">
            {events.map((event: EventProps, index) => (
                <Card key={index} className="flex flex-wrap bg-slate-700 text-neutral-950">
                    <div className='flex sm:flex-col md:flex-col lg:flex-row xl:flex-row w-full sm:w-full md:w-full lg:w-1/3 xl:w-1/3 justify-center items-center'>
                        <CardContent className="p-5 flex justify-center items-center">
                            <Image alt="banner" src='/banner.jpg' width={300} height={300} className="rounded-md" />
                        </CardContent>
                    </div>
                    <div className='flex sm:flex-col md:flex-col lg:flex-row xl:flex-row w-full sm:w-full md:w-full lg:w-2/3 xl:w-2/3 justify-start items-center'>
                        <CardContent>
                            <div className='flex flex-col justify-start'>
                                <div className='flex-col justify-start'>
                                    <CardHeader className='text-3xl font-bold'>
                                        {event.title}
                                    </CardHeader>
                                </div>
                                <div className='ml-6 font-medium flex-col justify-start'>
                                    <CardDescription className="text-slate-200 mt-3 text-md text-wrap">
                                        👀: {event.description}
                                    </CardDescription>
                                    <CardDescription className='text-slate-200 mt-2 text-md flex gap-1'>
                                        📆: {formatDate(event.date)}
                                    </CardDescription>
                                    <CardDescription className='text-slate-200 mt-2 text-md flex gap-1'>
                                        🕐: {event.time}
                                    </CardDescription>
                                    <CardDescription className='text-slate-200 mt-2 text-md flex gap-1'>
                                        📌: {event.location}
                                    </CardDescription>
                                    <CardDescription className='text-slate-200 mt-2 text-md flex gap-1'>
                                        📢: {event.speaker}({event.speakerDesignation})
                                    </CardDescription>
                                    <div className='flex mt-4 border-none rounded-xl bg-emerald-100 text-green-700 px-3 w-fit'>
                                        ✅ You&apos;ve successfully registered for this event!
                                    </div>
                                    <div className='flex justify-start mt-5'>
                                        <Button className='rounded-3xl flex gap-1.5'>Notify me <Bell size={18} /></Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            ))}
        </div>
    );
}
