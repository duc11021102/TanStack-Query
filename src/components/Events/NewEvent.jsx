import { Link, useNavigate } from "react-router-dom";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation } from "@tanstack/react-query";
import { createNewEvent } from "../../util/http.js";
import { queryClient } from "../../util/http.js";
import { toastSuccessCreate } from "../UI/Toast.jsx";
export default function NewEvent() {
  const navigate = useNavigate();
  // useMutation dùng để thực hiện các thay đổi trong dữ liệu chẳng hạn như thêm sửa xóa dữ liệu
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
