import { Link, Outlet } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header.jsx";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchEvent, deleteEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { toastSuccessDelete } from "../UI/Toast.jsx";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";
export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: id }),
  });

  const {
    mutate,
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/events");
      toastSuccessDelete();
    },
  });
  const handlerDelete = () => {
    mutate({ id: id });
  };
  let content;
  if (isLoading) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetching event data ...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="event-details-content">
        <ErrorBlock
          title="Failed to load event"
          message={error.info?.message}
        />
      </div>
    );
  }

  if (data) {
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={() => setIsModal(true)}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt="" />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {data.date} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isModal && (
        <Modal>
          <h2>Are you sure ?</h2>
          <p>
            Do you really want to delete this event? This action cannot be
            undone.
          </p>
          <div className="form-actions">
            {isLoadingDelete ? (
              <p>Deleting , please wait...</p>
            ) : (
              <>
                <button
                  onClick={() => setIsModal(false)}
                  className="button-text"
                >
                  Cancel
                </button>
                <button onClick={handlerDelete} className="button">
                  Delete
                </button>
              </>
            )}
          </div>
          {isErrorDelete && (
            <ErrorBlock
              title="Failed to delete event"
              message="Failed to delete"
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
