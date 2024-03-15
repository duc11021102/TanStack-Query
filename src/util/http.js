import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();
export async function fetchEvents({ signal, searchTerm, max }) {
    //SIGNAL DÙNG ĐỂ HỦY REQUEST KHI REQUEST K CẦN THIẾT NỮA 
    //KHI CÓ SIGNAL THÌ CHỈ REQUEST ĐỐI VỚI REQUEST CÓ SIGNAL 
    let url = '/api/events';

    if (searchTerm && max) {
        url += '?search=' + searchTerm + '&max=' + max;
    } else if (searchTerm) {
        url += '?search=' + searchTerm;
    } else if (max) {
        url += '?max=' + max
    }
    try {
        const { data } = await axios.get(url, { signal: signal });
        return data.events
    } catch (error) {
        return error
    }
}

export async function createNewEvent(event) {
    try {
        const { data } = await axios.post('/api/events', event, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return data.event;
    } catch (error) {
        if (error.response) {
            // LỖI TỪ SERVER VỚI MÃ STATUS CODE
            const errorMessage = error.response.data.message || 'An error occurred while creating the event';
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


export async function fetchEvent({ id, signal }) {
    try {
        const { data } = await axios.get(`/api/events/${id}`, { signal })
        console.log(data)
        return data.event
    } catch (error) {
        if (error.response) {
            // LỖI TỪ SERVER VỚI MÃ STATUS CODE
            const errorMessage = error.response.data.message || 'An error occurred while get the event';
            throw new Error(errorMessage);
        } else if (error.request) {
            // LỖI KHÔNG NHẬN ĐƯỢC PHẢN HỒI TỪ SERVER
            throw new Error('No response received from server');
        } else {
            // LỖI KHI THIẾT LẬP YÊU CẦU
            throw new Error('Error');
        }
    }
}




export async function deleteEvent({ id }) {
    try {
        const { data } = await axios.delete(`/api/events/${id}`)
        return data
    } catch (error) {
        if (error.response) {
            // LỖI TỪ SERVER VỚI MÃ STATUS CODE
            const errorMessage = error.response.data.message || 'An error occurred while delete the event';
            throw new Error(errorMessage);
        } else if (error.request) {
            // LỖI KHÔNG NHẬN ĐƯỢC PHẢN HỒI TỪ SERVER
            throw new Error('No response received from server');
        } else {
            // LỖI KHI THIẾT LẬP YÊU CẦU
            throw new Error('Error');
        }
    }
}


export async function updateEvent({ id, event }) {
    try {
        const response = await axios.put(`/api/events/${id}`, { event }, {
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
        const { data } = await axios.get(`/api/events/images`, { signal })
        console.log("RESS:", data.images)
        return data.images
    } catch (error) {
        console.log(error)
        return error.message
    }
}