import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../util/http.js";
import { useState, useReducer } from "react";

const initialState = {
  max: 3
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_MAX':
      return { ...state, max: action.payload };
    default:
      return state;
  }
}

// USEQUERY DÙNG ĐỂ FETCH DỮ LIỆU , GIÚP QUẢN LÝ VIỆC FETCH DỮ LIỆU MỘT CÁCH HIỆU QUẢ , GIÚP CẢI THIỆN HIỆU NĂNG VÀ TRẢI NGHIỆM NGƯỜI DÙNG
export default function NewEventsSection() {
  // REDUCER
  const [state, dispatch] = useReducer(reducer, initialState);
  //STORE 
  const [isShowAll, setIsShowAll] = useState(false);

  //QUERY GET EVENTS AFTER LOAD PAGE
  //CHANGING STATE WILL CAUSE QUERY TO BE FETCH AGAIN
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { max: state.max }],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }), // HÀM FETCH DỮ LIỆU , GIỚI HẠN DỮ LIỆU 3 EVENTS
    staleTime: 5000,
    // XÁC ĐỊNH KHOẢNG THỜI GIAN TRẢI QUA SAU KHI DỮ LIỆU ĐƯỢC COI LÀ CŨ, SAU 5 GIÂY TỪ KHI DỮ LIỆU MỚI NHẤT ĐƯỢC GỌI NẾU NGƯỜI DÙNG
    // RỜI TRANG VÀ QUAY LẠI TRANG THÌ DỮ LIỆU SẼ ĐƯỢC GỌI LẠI
  });
  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fecth events"}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
        {!isShowAll ? <button onClick={() => {
          setIsShowAll(true)
          dispatch({ type: "SET_MAX", payload: 100 })
        }} className="button">Show all events</button> : <button onClick={() => {
          setIsShowAll(false)
          dispatch({ type: "SET_MAX", payload: 3 })
        }} className="button">Show less events</button>}
      </header>
      {content}
    </section>
  );
}
