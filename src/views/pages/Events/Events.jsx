import { Link, Outlet } from 'react-router-dom';

import Header from '../../containers/Layout/Header.jsx';
import EventsIntroSection from '../../components/Events/EventsIntroSection.jsx';
import FindEventSection from '../../components/Events/FindEventSection.jsx';
import NewEventsSection from '../../components/Events/NewEventsSection.jsx';

export default function Events() {
    return (
        <>
            <Outlet />
            <Header>
                <Link to="/events/new" className="button">
                    New Event
                </Link>
            </Header>
            <main>
                <EventsIntroSection />
                <NewEventsSection />
                <FindEventSection />
            </main>
        </>
    );
}
