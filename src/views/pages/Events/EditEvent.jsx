import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { updateEvent, queryClient, fetchEvent } from "../../../util/http.js";
import EventForm from "../../components/Events/EventForm.jsx";
import Modal from "../../containers/UI/Modal.jsx";
import LoadingIndicator from "../../containers/UI/LoadingIndicator.jsx";
import ErrorBlock from "../../containers/UI/ErrorBlock.jsx";
import { toastSuccessEdit, toastErrorEdit } from "../../containers/UI/Toast.jsx";
export default function EditEvent() {
    //STORE
    const navigate = useNavigate();
    const { id } = useParams();

    //QUERY GET DETAIL EVENT
    //USE SIGNAL TO CANCELLATION FETCH {SIGNAL AND CANCELQUERIES}
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["events", id],
        queryFn: ({ signal }) => fetchEvent({ signal, id: id }),
        staleTime: 5000,
    });

    //MUTATE UPDATE EVENTS
    const { mutate } = useMutation({
        mutationFn: updateEvent,
        // WHEN MUTATE IS CALLED:
        onMutate: async (data) => {
            const newEvent = data.event;
            // CANCEL ANY OUTGOING REFETCHES
            // (SO THEY DON'T OVERWRITE OUR OPTIMISTIC UPDATE)
            await queryClient.cancelQueries({ queryKey: ['events', id] });
            // SNAPSHOT THE PREVIOUS VALUE
            const previousEvent = queryClient.getQueryData(['events', id]);
            // OPTIMISTICALLY UPDATE TO THE NEW VALUE
            queryClient.setQueryData(['events', id], newEvent);
            // RETURN A CONTEXT WITH THE PREVIOUS AND NEW TODO
            return { previousEvent, newEvent };
        },
        // IF THE MUTATION FAILS, USE THE CONTEXT WE RETURNED ABOVE
        onError: (error, data, context) => {
            queryClient.setQueryData(['events', id], context.previousEvent);
            toastErrorEdit();
        },
        onSuccess: () => {
            toastSuccessEdit();
        },
        // ALWAYS REFETCH AFTER ERROR OR SUCCESS:
        onSettled: () => {
            queryClient.invalidateQueries(['events', id]);
        }

    })


    function handleSubmit(formData) {
        console.log({ id: id, event: formData })
        mutate({ id: id, event: formData })
        navigate('../');
    }

    // CLOSE BACK
    function handleClose() {
        navigate("../");
    }

    //COMPONENTS
    let content
    if (isLoading) {
        content = (<div className="center">
            <LoadingIndicator />
        </div>)
    }

    if (isError) {
        content = (<>
            <ErrorBlock
                title="Failed to load event"
                message={
                    error.info?.message ||
                    'Failed to load event. Please check your inputs and try again later.'
                }
            />
            <div className="form-actions">
                <Link to="../" className="button">
                    Okay
                </Link>
            </div>
        </>)
    }

    if (data) {
        content = (
            <EventForm inputData={data} onSubmit={handleSubmit}>
                <Link to="../" className="button-text">
                    Cancel
                </Link>
                <button type="submit" className="button">
                    Update
                </button>
            </EventForm>
        );
    }

    return (
        <Modal onClose={handleClose}>{content}</Modal>
    );
}
