import { useState } from "react";
import { CalendarDate } from "@internationalized/date";
import { Tab, TabList, Tabs } from "@/components/application/tabs/tabs";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Calendar, type CalendarEvent } from "@/components/application/calendar/calendar";
import { Input } from "@/components/base/input/input";
import { SearchLg } from "@untitledui/icons";

// ─── Sample Events for January 2027 (matching Figma design) ─────────────────

const d = (day: number, hour: number, minute = 0) => new Date(2027, 0, day, hour, minute);

const events: CalendarEvent[] = [
    // Week 1: Dec 28 – Jan 3
    { id: "e1",  title: "Monday standup",     start: d(-3, 9),    end: d(-3, 9, 30) },
    { id: "e2",  title: "One-on-one...",       start: d(-2, 10),   end: d(-2, 11),   color: "pink" },
    { id: "e3",  title: "All-hands meeting",  start: d(-2, 16),   end: d(-2, 17) },
    { id: "e4",  title: "Dinner with...",      start: d(-2, 18, 30), end: d(-2, 19, 30), color: "indigo", dot: true },
    { id: "e5",  title: "EOY meeting",         start: d(-1, 9),    end: d(-1, 10) },
    { id: "e6",  title: "Coffee with...",      start: d(-1, 11, 30), end: d(-1, 12, 30), color: "purple" },
    { id: "e7",  title: "Marketing sit...",    start: d(-1, 14, 30), end: d(-1, 15, 30), color: "blue" },
    { id: "e8",  title: "Team sync",           start: d(-1, 10, 30), end: d(-1, 11, 30), color: "gray" },
    { id: "e9",  title: "Design review",       start: d(-1, 15, 30), end: d(-1, 16, 30), color: "purple" },
    { id: "e10", title: "Remote brief",        start: new Date(2026, 11, 31, 10, 30), end: new Date(2026, 11, 31, 11, 30), color: "blue" },
    { id: "e11", title: "Friday standup",      start: d(1, 9),     end: d(1, 9, 30) },
    { id: "e12", title: "House insp...",        start: d(2, 10, 30), end: d(2, 11, 30), color: "orange", dot: true },

    // Week 2: Jan 4–10
    { id: "e13", title: "Monday standup",      start: d(4, 9),     end: d(4, 9, 30) },
    { id: "e14", title: "Content plan...",     start: d(4, 11),    end: d(4, 12),    color: "purple" },
    { id: "e15", title: "One-on-one...",        start: d(5, 10),    end: d(5, 11),    color: "pink" },
    { id: "e16", title: "Catch up w/ A...",    start: d(5, 14, 30), end: d(5, 15, 30) },
    { id: "e17", title: "Deep work",           start: d(6, 9),     end: d(6, 10),    color: "blue" },
    { id: "e18", title: "Design sync",         start: d(6, 10, 30), end: d(6, 11, 30) },
    { id: "e19", title: "SEO planning",        start: d(6, 13, 30), end: d(6, 14, 30), color: "blue" },
    { id: "e20", title: "Investor call",       start: d(6, 15),    end: d(6, 16),    color: "gray" },
    { id: "e21", title: "Sprint planning",     start: d(6, 16),    end: d(6, 17),    color: "brand" },
    { id: "e22", title: "Onboarding call",     start: d(6, 8),     end: d(6, 9),     color: "green" },
    { id: "e23", title: "Lunch with...",        start: d(7, 12),    end: d(7, 13),    color: "green", dot: true },
    { id: "e24", title: "Friday standup",      start: d(8, 9),     end: d(8, 9, 30) },
    { id: "e25", title: "Olivia x Riley",      start: d(8, 10),    end: d(8, 11),    color: "purple" },
    { id: "e26", title: "Product demo",        start: d(8, 13, 30), end: d(8, 14, 30), color: "blue" },
    { id: "e27", title: "Team huddle",         start: d(8, 11),    end: d(8, 12),    color: "gray" },
    { id: "e28", title: "Design review",       start: d(8, 15),    end: d(8, 16),    color: "indigo" },
    { id: "e29", title: "House insp...",        start: d(9, 11),    end: d(9, 12),    color: "orange", dot: true },
    { id: "e30", title: "Ava's engag...",       start: d(10, 13),   end: d(10, 14),   color: "purple", dot: true },

    // Week 3: Jan 11–17
    { id: "e31", title: "Monday standup",      start: d(11, 9),    end: d(11, 9, 30) },
    { id: "e32", title: "Team lunch",          start: d(11, 12, 15), end: d(11, 13, 15), color: "pink" },
    { id: "e33", title: "Product plann...",    start: d(13, 9, 30), end: d(13, 10, 30), color: "blue" },
    { id: "e34", title: "Amélie's first...",   start: d(14, 10),   end: d(14, 11),   color: "purple" },
    { id: "e35", title: "All-hands me...",     start: d(14, 16),   end: d(14, 17) },
    { id: "e36", title: "Friday standup",      start: d(15, 9),    end: d(15, 9, 30) },
    { id: "e37", title: "Coffee w/ Am...",     start: d(15, 9, 30), end: d(15, 10, 30) },
    { id: "e38", title: "Design feedb...",     start: d(15, 14, 30), end: d(15, 15, 30), color: "blue" },
    { id: "e39", title: "UX research",         start: d(15, 11),   end: d(15, 12),   color: "indigo" },
    { id: "e40", title: "Half marath...",      start: d(16, 7),    end: d(16, 10),   color: "green", dot: true },

    // Week 4: Jan 18–24
    { id: "e41", title: "Monday standup",      start: d(18, 9),    end: d(18, 9, 30) },
    { id: "e42", title: "Deep work",           start: d(18, 9, 15), end: d(18, 11, 15), color: "blue" },
    { id: "e43", title: "Quarterly rev...",    start: d(19, 11, 30), end: d(19, 12, 30), color: "orange" },
    { id: "e44", title: "Lunch with Za...",    start: d(19, 13),   end: d(19, 14) },
    { id: "e45", title: "Dinner with...",      start: d(19, 19),   end: d(19, 20),   color: "green", dot: true },
    { id: "e46", title: "Deep work",           start: d(20, 9),    end: d(20, 10),   color: "blue" },
    { id: "e47", title: "Design sync",         start: d(20, 14, 30), end: d(20, 15, 30) },
    { id: "e48", title: "Amélie coffee",       start: d(21, 10),   end: d(21, 11),   color: "purple" },
    { id: "e49", title: "Friday standup",      start: d(22, 9),    end: d(22, 9, 30) },
    { id: "e50", title: "Accountant",          start: d(22, 13, 45), end: d(22, 14, 45), color: "yellow" },
    { id: "e51", title: "Marketing sit...",    start: d(22, 14, 30), end: d(22, 15, 30), color: "blue" },
    { id: "e52", title: "Board meeting",       start: d(22, 10),   end: d(22, 11),   color: "gray" },
    { id: "e53", title: "User interviews",     start: d(22, 11),   end: d(22, 12),   color: "indigo" },
    { id: "e54", title: "Sprint retro",        start: d(22, 15, 30), end: d(22, 16, 30), color: "brand" },

    // Week 5: Jan 25–31
    { id: "e55", title: "Monday standup",      start: d(25, 9),    end: d(25, 9, 30) },
    { id: "e56", title: "Content plan...",     start: d(26, 11),   end: d(26, 12),   color: "purple" },
    { id: "e57", title: "Lunch with A...",     start: d(26, 12, 45), end: d(26, 13, 45) },
    { id: "e58", title: "Product plann...",    start: d(27, 9, 30), end: d(27, 10, 30), color: "blue" },
    { id: "e59", title: "All-hands me...",     start: d(28, 16),   end: d(28, 17) },
    { id: "e60", title: "Team dinner",         start: d(28, 17, 30), end: d(28, 18, 30), color: "pink" },
    { id: "e61", title: "Friday standup",      start: d(29, 9),    end: d(29, 9, 30) },
    { id: "e62", title: "Drive to Sydney",     start: d(31, 8),    end: d(31, 20),   color: "orange", dot: true },
];

// ─── Nav items ────────────────────────────────────────────────────────────────

const navItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "Calendar", href: "/calendar" },
    { label: "Reporting", href: "/reporting" },
    { label: "Users", href: "/users" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export const CalendarPage = () => {
    const [activeTab, setActiveTab] = useState("all-events");

    return (
        <div className="flex min-h-screen flex-col bg-primary">
            <HeaderNavigationBase activeUrl="/calendar" items={navItems} />

            <main className="flex flex-1 flex-col">
                {/* Page Header */}
                <div className="border-b border-secondary">
                    <div className="mx-auto w-full max-w-container px-8 pt-6 pb-0">
                        <div className="flex items-center justify-between gap-4 pb-5">
                            <h1 className="text-xl font-semibold text-primary">My calendar</h1>

                            {/* Search with ⌘K shortcut — Code Connect: Input size="sm" type="Search" shortcut={true} */}
                            <Input
                                size="sm"
                                placeholder="Search"
                                icon={SearchLg}
                                shortcut
                                className="w-72"
                                aria-label="Search calendar"
                            />
                        </div>

                        {/* Tabs — Code Connect: Tabs type="Underline" size="sm" fullWidth="False" */}
                        <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(String(key))}>
                            <TabList size="sm" type="underline" className="-mb-px before:hidden">
                                <Tab id="all-events">All events</Tab>
                                <Tab id="shared">Shared</Tab>
                                <Tab id="public">Public</Tab>
                                <Tab id="archived">Archived</Tab>
                            </TabList>
                        </Tabs>
                    </div>
                </div>

                {/* Calendar Section */}
                <div className="flex flex-1 flex-col">
                    <div className="mx-auto w-full max-w-container px-8 py-6">
                        {/* Calendar component — installed via Untitled UI MCP: npx untitledui add calendar */}
                        <Calendar
                            events={events}
                            view="month"
                            initialDate={new CalendarDate(2027, 1, 8)}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};
