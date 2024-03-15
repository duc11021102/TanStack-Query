import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSelectableImages } from "../../../util/http.js";
import ImagePicker from "../../containers/Layout/ImagePicker.jsx";
import ErrorBlock from "../../containers/UI/ErrorBlock.jsx";
import { useForm } from "react-hook-form"

export default function EventForm({ inputData, onSubmit, children }) {
  //STORE
  const [selectedImage, setSelectedImage] = useState(inputData?.image);
  //VALIDATE FORM
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  //QUERY
  const { data, isPending, isError } = useQuery({
    queryKey: ["events-images"],
    queryFn: fetchSelectableImages,
  });

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handlerSubmit(event) {
    console.log({ ...event, image: selectedImage })
    onSubmit({ ...event, image: selectedImage });
  }

  return (
    <form id="event-form" onSubmit={handleSubmit(handlerSubmit)}>
      <p className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          {...register("title", { required: true, maxLength: 40 })}
          defaultValue={inputData?.title ?? ""}
        />
        {!!errors.title && (
          <span className="error-text">Title cannot be blank and must not exceed 40 characters</span>
        )}
      </p>
      {isPending && <p>Loading selectable images...</p>}
      {isError && (
        <ErrorBlock
          title="Failed to load selectable images"
          message="Pls try again later!"
        />
      )}
      {data && (
        <div className="control">
          <ImagePicker
            images={data}
            onSelect={handleSelectImage}
            selectedImage={selectedImage}
          />
        </div>
      )}

      <p className="control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          {...register("description", { required: true })}
          defaultValue={inputData?.description ?? ""}
        />
        {!!errors.description && (
          <span className="error-text">Description cannot be blank</span>
        )}
      </p>

      <div className="controls-row">
        <p className="control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            {...register("date")}
            defaultValue={inputData?.date ?? "2024-03-05"}
          />
        </p>

        <p className="control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            {...register("time")}
            defaultValue={inputData?.time ?? "12:12"}
          />
        </p>
      </div>

      <p className="control">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          {...register("location", { required: true, maxLength: 20 })}
          defaultValue={inputData?.location ?? ""}
        />
        {!!errors.location && (
          <span className="error-text">Location cannot be blank and must not exceed 20 characters</span>
        )}
      </p>

      <p className="form-actions">{children}</p>
    </form>
  );
}
