import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
// import { toastSuccessCreate } from "../components/UI/Toast";
export const queryClient = new QueryClient();
export async function fetchEvents({ signal, searchTerm }) {
    //signal dùng để hủy request khi request k cần thiết nữa 
    //khi có signal thì chỉ request đối với request có signal 
    let url = 'http://localhost:3001/events';

    if (searchTerm) {
        url += '?search=' + searchTerm
    }
    try {
        const { data } = await axios.get(url, { signal: signal });
        return data.events
    } catch (error) {
        // console.log("ERROR", error.message)
        return error
    }
}

export async function createNewEvent(eventData) {
    const response = await fetch(`http://localhost:3001/events`, {
        method: 'POST',
        body: JSON.stringify(eventData),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = new Error('An error occurred while creating the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { event } = await response.json();
    // toastSuccessCreate();
    return event;
}

export async function fetchEvent({ id, signal }) {
    const response = await fetch(`http://localhost:3001/events/${id}`, { signal });

    if (!response.ok) {
        const error = new Error('An error occurred while fetching the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { event } = await response.json();

    return event;
}

export async function deleteEvent({ id }) {
    const response = await fetch(`http://localhost:3001/events/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const error = new Error('An error occurred while deleting the event');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    return response.json();
}


export async function updateEvent({ id, event }) {
    try {
        const response = await axios.put(`http://localhost:3001/events/${id}`, { event }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            // LỖI TỪ SERVER VỚI MÃ STATUS CODE
            const errorMessage = error.response.data.message || 'An error occurred while updating the event';
            throw new Error(errorMessage);
        } else if (error.request) {
            // LỖI KHÔNG NHẬN ĐƯỢC PHẢN HỒI TỪ SERVER
            throw new Error('No response received from server');
        } else {
            // LỖI KHI THIẾT LẬP YÊU CẦU
            throw new Error('Error setting up request');
        }
    }
}

export async function fetchSelectableImages({ signal }) {
    try {
        const { data } = await axios.get(`http://localhost:3001/events/images`, { signal })
        console.log("RESS:", data.images)
        return data.images
    } catch (error) {
        console.log(error)
        return error.message
    }
}