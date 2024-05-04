'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from '@/components/PdfDocument';
import { Loader2 } from 'lucide-react';

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

interface Session {
    user: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
        role?: string | null | undefined;
    };
}

export default function ViewEventsCard() {
    const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const { data: session } = useSession()
    const typedSession = session as Session

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/event/viewEvent');
                const currentDate = new Date();
                setEvents(response.data.filter((event: EventProps) => new Date(event.date) <= currentDate));
                console.log(response.data);
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
    const handleRegister = async (eventId: number) => {
        setIsLoadingButton(true)
        try {
            await axios.post('/api/event/registerEvent', {
                id: eventId
            });
            toast.success('Registration successful');
            router.push(`/${typedSession?.user?.role?.toLowerCase()}/registeredEvents`)
        } catch (error) {
            console.error('Error registering for event:', error);
            toast.error('Registration failed');
        } finally {
            setIsLoadingButton(false)
        }
    };
    const handleDelete = async (eventId: number) => {
        setIsLoadingDelete(true);
        try {
            const eventToDelete = events.find((event: EventProps) => event.id === eventId);
            if (!eventToDelete) {
                console.error('Event not found');
                return;
            }

            await axios.delete('/api/event/deleteEvent', {
                data: {
                    id: eventId
                }
            });
            toast.success('Event deleted successfully');
            setEvents(events.filter((event: EventProps) => event.id !== eventId));
        } catch (error) {
            console.error("Error deleting event:", error);
            toast.error('Deletion failed');
        } finally {
            setIsLoadingDelete(false);
        }
    }
    return (
        <div className="">
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
                                    <div className='flex justify-start gap-2'>
                                        {typedSession?.user?.role?.toLowerCase() === 'admin' && (
                                            <PDFDownloadLink
                                                document={<PdfDocument />}
                                                fileName="report.pdf"
                                            >
                                                {({ loading }) =>
                                                    loading ? <Button><Loader2 className='animate-spin mt-4' size={18} /></Button> : <Button className='mt-4'>Download Report</Button>
                                                }
                                            </PDFDownloadLink>
                                        )}
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
