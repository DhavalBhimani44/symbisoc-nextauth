'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

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

export default function ViewEventsCard() {
    const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const { data: session } = useSession()

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/event/viewEvent');
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
    const handleRegister = async (eventId: number) => {
        setIsLoadingButton(true)
        try {
            await axios.post('/api/event/registerEvent', {
                id: eventId
            });
            toast.success('Registration successful');
            router.push(`/${session?.user?.role.toLowerCase()}/registeredEvents`)
        } catch (error) {
            console.error('Error registering for event:', error);
            toast.error('Registration failed');
        } finally {
            setIsLoadingButton(false)
        }
    };
    return (
        <div className="">
            {events.map((event: EventProps) => (
                <Card key={event} className="flex bg-slate-700 text-neutral-950">
                    <CardContent className="p-5">
                        <Image alt="banner" src='/banner.jpg' width={300} height={300} className="rounded-md" />
                    </CardContent>
                    <CardContent>
                        <CardHeader className='text-3xl font-bold'>
                            {event.title}
                        </CardHeader>
                        <div className='ml-6 font-medium'>
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
                            <div className='flex justify-end gap-2'>
                                {session?.user?.role.toLowerCase() === 'clubincharge' && (
                                    <Button className="mt-4" variant={"destructive"} isLoading={isLoadingDelete}>Delete</Button>
                                )}
                                <Button className="mt-4" variant={"secondary"} isLoading={isLoadingButton} onClick={() => handleRegister(event.id)}>Register</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
