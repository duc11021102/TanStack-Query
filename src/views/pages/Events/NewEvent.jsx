import { Link, useNavigate } from "react-router-dom";
import ErrorBlock from "../../containers/UI/ErrorBlock.jsx";
import Modal from "../../containers/UI/Modal.jsx";
import EventForm from "../../components/Events/EventForm.jsx";
import { useMutation } from "@tanstack/react-query";
import { createNewEvent, queryClient } from "../../../util/http.js";
import { toastSuccessCreate } from "../../containers/UI/Toast.jsx";
export default function NewEvent() {
    const navigate = useNavigate();
    // USEMUTATION DÙNG ĐỂ THỰC HIỆN CÁC THAY ĐỔI TRONG DỮ LIỆU CHẲNG HẠN NHƯ THÊM SỬA XÓA DỮ LIỆU
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: createNewEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            navigate("/events");
            toastSuccessCreate();
        },
    });
    function handleSubmit(formData) {
        console.log(formData);
        mutate({ event: formData });
    }

    return (
        <Modal onClose={() => navigate("../")}>
            <EventForm onSubmit={handleSubmit}>
                {isPending && "Submitting..."}
                {!isPending && (
                    <>
                        <Link to="../" className="button-text">
                            Cancel
                        </Link>
                        <button type="submit" className="button">
                            Create
                        </button>
                    </>
                )}
            </EventForm>
            {isError && (
                <ErrorBlock
                    title="Failed to create event"
                    message={
                        error.info?.message ||
                        "Failed to create event . Pls check and try again later"
                    }
                />
            )}
        </Modal>
    );
}
