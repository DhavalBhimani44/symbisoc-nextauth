"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";

interface User {
    id: string;
    eventId: string;
  }
  
  interface Attendee {
    userId: string;
    eventId: string;
  }

const Page = ({ params }: any) => {
    const eventId = params?.id;
    const [users, setUsers] = useState([]);
    const [regusers, setRegUsers] = useState([]);
    const [attendedUsers, setAttendedUsers] = useState(new Set()); // Keep track of attended users
    const [loading, setLoading] = useState(true);
    const [isLoadingAttended, setIsLoadingAttended] = useState(false)
    const [clickedUserId, setClickedUserId] = useState<number | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/event/eventRegistration');
                const allregUsers = response.data;
                const filteredUsers = eventId ? allregUsers.filter((user: User) => user.eventId === eventId) : [];
                setUsers(filteredUsers);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [eventId]);

    useEffect(() => {
        const fetchAttendees = async () => {
            try {
                const res = await axios.get('/api/event/getEventAttendees', {
                    params: {
                        eventId: eventId
                    }
                });
                const attendees = res.data.map((attendee: Attendee) => attendee.userId);
                setAttendedUsers(new Set(attendees));
            } catch (error) {
                console.log("Error fetching attendees: ", error);
            }
        };

        if (eventId) {
            fetchAttendees();
        }
    }, [eventId]);

    const handleAttended = async (userId: number) => {
        setIsLoadingAttended(true)
        setClickedUserId(userId);
        try {
            await axios.post('/api/event/addAttendee', {
                id: userId,
                eventId: eventId
            });
            toast.success('User added successfully');
            setAttendedUsers((prevAttended) => new Set(prevAttended.add(userId))); // Update the attended users state
        } catch (error) {
            console.log("Error adding attendee: ", error);
            toast.error("Already added");
        } finally{
            setIsLoadingAttended(false)
            setClickedUserId(null); 
        }
    }

    return (
        <div className="w-full">
            <div className="flex justify-between mb-8 mt-8 top-14 sticky rounded-md z-10 w-full">
            {loading ? (
                        <Skeleton className="w-full h-[350px] bg-slate-700"/>
                    ) : (<Table className="w-full rounded-lg text-neutral-950 text-sm sm:text-sm md:text-sm lg:text-md xl:text-md">
                    <TableBody className="w-full rounded-lg">
                        <TableRow className="text-gray-200 hover:bg-neutral-950 rounded-lg bg-neutral-900">
                            <TableCell className="w-1/4 rounded-tl-lg">userId</TableCell>
                            <TableCell className="w-1/4 rounded-tr-lg">Action</TableCell>
                            <TableCell className="w-1/4 rounded-tr-lg">Status</TableCell>
                        </TableRow>
                        {users.map((user:User, index) => (
                            <TableRow key={index} className="text-gray-900 hover:bg-neutral-300 rounded-lg bg-neutral-200">
                                <TableCell className="w-1/4">{user.id}</TableCell>
                                <TableCell className="w-1/4">
                                    <Button isLoading={isLoadingAttended && clickedUserId === user.id} onClick={() => handleAttended(user.id)}>Mark Attended</Button>
                                </TableCell>
                                <TableCell className="w-1/4">
                                    {attendedUsers.has(user.id) ? <FaCheckCircle size={20} /> : "Not Attended"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>)}
            </div>
        </div>
    )
}

export default Page;