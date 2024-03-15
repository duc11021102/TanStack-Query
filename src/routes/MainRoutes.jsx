import {
    Navigate,
    createBrowserRouter,
} from "react-router-dom";
import Events from "../views/pages/Events/Events.jsx";
import EventDetails from "../views/pages/Events/EventDetails.jsx";
import NewEvent from "../views/pages/Events/NewEvent.jsx";
import EditEvent from "../views/pages/Events/EditEvent.jsx";
export const MainRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/events" />,
    },
    {
        path: "/events",
        element: <Events />,
        children: [
            {
                path: "/events/new",
                element: <NewEvent />,
            },
        ],
    },
    {
        path: "/events/:id",
        element: <EventDetails />,
        children: [
            {
                path: "/events/:id/edit",
                element: <EditEvent />,
            },
        ],
    },
]);