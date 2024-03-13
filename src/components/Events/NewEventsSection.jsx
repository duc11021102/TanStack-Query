import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../../util/http.js";
// useQuery dùng để fetch dữ liệu , giúp quản lý việc fetch dữ liệu một cách hiệu quả , giúp cải thiện hiệu năng và trải nghiệm người dùng
export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents, // hàm fetch dữ liệu
    staleTime: 5000,
    // xác định khoảng thời gian trải qua sau khi dữ liệu được coi là cũ, sau 5 giây từ khi dữ liệu mới nhất được gọi nếu người dùng
    // rời trang và quay lại trang thì dữ liệu sẽ được gọi lại
    // refetchInterval: 5000,
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
      </header>
      {content}
    </section>
  );
}
