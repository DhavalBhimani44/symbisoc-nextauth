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

const Page = ({ params }: any) => {
    const eventId = params?.id;
    const [users, setUsers] = useState([]);
    const [regusers, setRegUsers] = useState([]);
    const [attendedUsers, setAttendedUsers] = useState(new Set()); // Keep track of attended users

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/event/eventRegistration');
                const allregUsers = response.data;
                const filteredUsers = eventId ? allregUsers.filter((user) => user.eventId === eventId) : [];
                setUsers(filteredUsers);
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
                const attendees = res.data.map((attendee) => attendee.userId);
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
        try {
            await axios.post('/api/event/addAttendee', {
                id: userId,
                eventId: eventId
            });
            toast.success('User added successfully');
            setAttendedUsers((prevAttended) => new Set(prevAttended.add(userId))); // Update the attended users state
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
                            <TableCell className="w-1/4 rounded-tr-lg">Status</TableCell>
                        </TableRow>
                        {users.map((user, index) => (
                            <TableRow key={index} className="text-gray-900 hover:bg-neutral-300 rounded-lg bg-neutral-200">
                                <TableCell className="w-1/4">{user.id}</TableCell>
                                <TableCell className="w-1/4">
                                    <Button onClick={() => handleAttended(user.id)}>Mark Attended</Button>
                                </TableCell>
                                <TableCell className="w-1/4">
                                    {attendedUsers.has(user.id) ? <FaCheckCircle /> : "Not Attended"}
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