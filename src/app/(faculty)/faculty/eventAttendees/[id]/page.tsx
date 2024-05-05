"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';

const Page = ({ params }: any) => {
    const eventId = params?.id;
    const [users, setUsers] = useState([]);
    const [regusers, setRegUsers] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/event/eventRegistration');
                const allregUsers = response.data;
                const filteredUsers = eventId ? allregUsers.filter(user => user.eventId === eventId) : [];
                setUsers(filteredUsers);
                console.log("Event id: ", eventId);
                console.log("filtered events: ", filteredUsers);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [eventId]);

    const handleAttended = async (userId: number, eventId: number) => {
        try {
            await axios.post('/api/event/addAttendee', {
                id: userId,
                eventId: eventId
            });
            toast.success('User added successfully');
        } catch (error) {
            console.log("Error adding attendee: ", error);
            toast.error("Addition failed!");
        }
    }

    return (
        <div className="w-full">
            <div className="flex justify-between mb-8 mt-8 top-14 sticky rounded-md z-10 w-full">
                <Table className="w-full rounded-lg text-neutral-950 text-sm sm:text-sm md:text-sm lg:text-md xl:text-md">
                    <TableBody className="w-full rounded-lg">
                        <TableRow className="text-gray-200 hover:bg-neutral-950 rounded-lg bg-neutral-900">
                            <TableCell className="w-1/4 rounded-tl-lg">userId</TableCell>                            
                            <TableCell className="w-1/4 rounded-tr-lg">Action</TableCell>
                        </TableRow>
                        {users.map((user) => (
                            <TableRow className="text-gray-900 hover:bg-neutral-300 rounded-lg bg-neutral-200">
                                <TableCell className="w-1/4">{user.id}</TableCell>                                
                                <TableCell className="w-1/4">
                                    <Button onClick={() => handleAttended(user.id, eventId)}>Mark Attended</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Page;