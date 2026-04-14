import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, Plus, SearchLg } from "@untitledui/icons";
import { Tab, TabList, Tabs } from "@/components/application/tabs/tabs";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

// ─── Types ────────────────────────────────────────────────────────────────────

type EventColor = "blue" | "purple" | "pink" | "green" | "orange" | "yellow" | "indigo";

interface CalendarEvent {
    id: string;
    title: string;
    time: string;
    color?: EventColor;
    hasDot?: boolean;
    isPill?: boolean;
}

interface CalendarDay {
    date: number;
    month: "prev" | "current" | "next";
    isToday?: boolean;
    events: CalendarEvent[];
    moreCount?: number;
}

// ─── Event Color Styles ───────────────────────────────────────────────────────

const eventColors: Record<EventColor, { bg: string; text: string; dot: string }> = {
    blue: {
        bg: "bg-utility-blue-50",
        text: "text-utility-blue-700",
        dot: "bg-utility-blue-500",
    },
    purple: {
        bg: "bg-utility-purple-50",
        text: "text-utility-purple-700",
        dot: "bg-utility-purple-500",
    },
    indigo: {
        bg: "bg-utility-indigo-50",
        text: "text-utility-indigo-700",
        dot: "bg-utility-indigo-500",
    },
    pink: {
        bg: "bg-utility-pink-50",
        text: "text-utility-pink-700",
        dot: "bg-utility-pink-500",
    },
    green: {
        bg: "bg-utility-green-50",
        text: "text-utility-green-700",
        dot: "bg-utility-green-500",
    },
    orange: {
        bg: "bg-utility-orange-50",
        text: "text-utility-orange-700",
        dot: "bg-utility-orange-500",
    },
    yellow: {
        bg: "bg-utility-yellow-50",
        text: "text-utility-yellow-700",
        dot: "bg-utility-yellow-500",
    },
};

// ─── Calendar Data ────────────────────────────────────────────────────────────

const calendarWeeks: CalendarDay[][] = [
    // Week 1: Dec 28 – Jan 3
    [
        {
            date: 28,
            month: "prev",
            events: [{ id: "e1", title: "Monday stand...", time: "9:00 AM" }],
        },
        {
            date: 29,
            month: "prev",
            events: [
                { id: "e2", title: "One-on-one...", time: "10:00 AM", color: "pink", isPill: true },
                { id: "e3", title: "All-hands me...", time: "4:00 PM" },
                { id: "e4", title: "Dinner with...", time: "6:30 PM", color: "indigo", isPill: true, hasDot: true },
            ],
        },
        {
            date: 30,
            month: "prev",
            events: [
                { id: "e5", title: "EOY meeting", time: "9:00 AM" },
                { id: "e6", title: "Coffee with...", time: "11:30 AM", color: "purple", isPill: true },
                { id: "e7", title: "Marketing sit...", time: "2:30 PM", color: "blue", isPill: true },
            ],
            moreCount: 2,
        },
        {
            date: 31,
            month: "prev",
            events: [{ id: "e8", title: "Remote brief", time: "10:30 AM", color: "blue", isPill: true }],
        },
        {
            date: 1,
            month: "current",
            events: [{ id: "e9", title: "Friday standup", time: "9:00 AM" }],
        },
        {
            date: 2,
            month: "current",
            events: [{ id: "e10", title: "House insp...", time: "10:30 AM", color: "orange", isPill: true, hasDot: true }],
        },
        { date: 3, month: "current", events: [] },
    ],
    // Week 2: Jan 4–10
    [
        {
            date: 4,
            month: "current",
            events: [
                { id: "e11", title: "Monday stand...", time: "9:00 AM" },
                { id: "e12", title: "Content plan...", time: "11:00 AM", color: "purple", isPill: true },
            ],
        },
        {
            date: 5,
            month: "current",
            events: [
                { id: "e13", title: "One-on-one...", time: "10:00 AM", color: "pink", isPill: true },
                { id: "e14", title: "Catch up w/ A...", time: "2:30 PM" },
            ],
        },
        {
            date: 6,
            month: "current",
            events: [
                { id: "e15", title: "Deep work", time: "9:00 AM", color: "blue", isPill: true },
                { id: "e16", title: "Design sync", time: "10:30 AM" },
                { id: "e17", title: "SEO planning", time: "1:30 PM", color: "blue", isPill: true },
            ],
            moreCount: 3,
        },
        {
            date: 7,
            month: "current",
            events: [{ id: "e18", title: "Lunch with...", time: "12:00 PM", color: "green", isPill: true, hasDot: true }],
        },
        {
            date: 8,
            month: "current",
            isToday: true,
            events: [
                { id: "e19", title: "Friday standup", time: "9:00 AM" },
                { id: "e20", title: "Olivia x Riley", time: "10:00 AM", color: "purple", isPill: true },
                { id: "e21", title: "Product demo", time: "1:30 PM", color: "blue", isPill: true },
            ],
            moreCount: 2,
        },
        {
            date: 9,
            month: "current",
            events: [{ id: "e22", title: "House insp...", time: "11:00 AM", color: "orange", isPill: true, hasDot: true }],
        },
        {
            date: 10,
            month: "current",
            events: [{ id: "e23", title: "Ava's engag...", time: "1:00 PM", color: "purple", isPill: true, hasDot: true }],
        },
    ],
    // Week 3: Jan 11–17
    [
        {
            date: 11,
            month: "current",
            events: [
                { id: "e24", title: "Monday stand...", time: "9:00 AM" },
                { id: "e25", title: "Team lunch", time: "12:15 PM", color: "pink", isPill: true },
            ],
        },
        { date: 12, month: "current", events: [] },
        {
            date: 13,
            month: "current",
            events: [{ id: "e26", title: "Product plann...", time: "9:30 AM", color: "blue", isPill: true }],
        },
        {
            date: 14,
            month: "current",
            events: [
                { id: "e27", title: "Amélie's first...", time: "10:00 AM", color: "purple", isPill: true },
                { id: "e28", title: "All-hands me...", time: "4:00 PM" },
            ],
        },
        {
            date: 15,
            month: "current",
            events: [
                { id: "e29", title: "Friday standup", time: "9:00 AM" },
                { id: "e30", title: "Coffee w/ Am...", time: "9:30 AM" },
                { id: "e31", title: "Design feedb...", time: "2:30 PM", color: "blue", isPill: true },
            ],
            moreCount: 1,
        },
        {
            date: 16,
            month: "current",
            events: [{ id: "e32", title: "Half marath...", time: "7:00 AM", color: "green", isPill: true, hasDot: true }],
        },
        { date: 17, month: "current", events: [] },
    ],
    // Week 4: Jan 18–24
    [
        {
            date: 18,
            month: "current",
            events: [
                { id: "e33", title: "Monday stand...", time: "9:00 AM" },
                { id: "e34", title: "Deep work", time: "9:15 AM", color: "blue", isPill: true },
            ],
        },
        {
            date: 19,
            month: "current",
            events: [
                { id: "e35", title: "Quarterly rev...", time: "11:30 AM", color: "orange", isPill: true },
                { id: "e36", title: "Lunch with Za...", time: "1:00 PM" },
                { id: "e37", title: "Dinner with...", time: "7:00 PM", color: "green", isPill: true, hasDot: true },
            ],
        },
        {
            date: 20,
            month: "current",
            events: [
                { id: "e38", title: "Deep work", time: "9:00 AM", color: "blue", isPill: true },
                { id: "e39", title: "Design sync", time: "2:30 PM" },
            ],
        },
        {
            date: 21,
            month: "current",
            events: [{ id: "e40", title: "Amélie coffee", time: "10:00 AM", color: "purple", isPill: true }],
        },
        {
            date: 22,
            month: "current",
            events: [
                { id: "e41", title: "Friday standup", time: "9:00 AM" },
                { id: "e42", title: "Accountant", time: "1:45 PM", color: "yellow", isPill: true },
                { id: "e43", title: "Marketing sit...", time: "2:30 PM", color: "blue", isPill: true },
            ],
            moreCount: 3,
        },
        { date: 23, month: "current", events: [] },
        { date: 24, month: "current", events: [] },
    ],
    // Week 5: Jan 25–31
    [
        {
            date: 25,
            month: "current",
            events: [{ id: "e44", title: "Monday stand...", time: "9:00 AM" }],
        },
        {
            date: 26,
            month: "current",
            events: [
                { id: "e45", title: "Content plan...", time: "11:00 AM", color: "purple", isPill: true },
                { id: "e46", title: "Lunch with A...", time: "12:45 AM" },
            ],
        },
        {
            date: 27,
            month: "current",
            events: [{ id: "e47", title: "Product plann...", time: "9:30 AM", color: "blue", isPill: true }],
        },
        {
            date: 28,
            month: "current",
            events: [
                { id: "e48", title: "All-hands me...", time: "4:00 PM" },
                { id: "e49", title: "Team dinner", time: "5:30 PM", color: "pink", isPill: true },
            ],
        },
        {
            date: 29,
            month: "current",
            events: [{ id: "e50", title: "Friday standup", time: "9:00 AM" }],
        },
        { date: 30, month: "current", events: [] },
        {
            date: 31,
            month: "current",
            events: [{ id: "e51", title: "Drive to Sydney", time: "", color: "orange", isPill: true, hasDot: true }],
        },
    ],
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const CalendarEventItem = ({ event }: { event: CalendarEvent }) => {
    if (!event.color || !event.isPill) {
        return (
            <div className="flex min-w-0 items-center gap-1 truncate text-xs font-medium text-secondary">
                <span className="truncate">{event.title}</span>
                {event.time && <span className="shrink-0 text-tertiary">{event.time}</span>}
            </div>
        );
    }

    const colors = eventColors[event.color];

    return (
        <div className={cx("flex min-w-0 items-center gap-1 truncate rounded-md px-1.5 py-0.5 text-xs font-medium", colors.bg, colors.text)}>
            {event.hasDot && <span className={cx("size-1.5 shrink-0 rounded-full", colors.dot)} />}
            <span className="truncate">{event.title}</span>
            {event.time && <span className="shrink-0 opacity-80">{event.time}</span>}
        </div>
    );
};

const CalendarDayCell = ({ day }: { day: CalendarDay }) => {
    const isCurrentMonth = day.month === "current";

    return (
        <div className={cx("flex min-h-28 flex-col border-b border-r border-secondary p-1.5 last:border-r-0", !isCurrentMonth && "bg-secondary/30")}>
            <div className="mb-1 flex items-center justify-between">
                <span
                    className={cx(
                        "flex size-6 items-center justify-center rounded-full text-xs font-semibold",
                        day.isToday ? "bg-brand-solid text-white" : isCurrentMonth ? "text-secondary" : "text-quaternary",
                    )}
                >
                    {day.date}
                </span>
            </div>

            <div className="flex flex-col gap-0.5 overflow-hidden">
                {day.events.map((event) => (
                    <CalendarEventItem key={event.id} event={event} />
                ))}
                {day.moreCount && (
                    <button className="self-start text-xs font-medium text-tertiary hover:text-secondary">
                        {day.moreCount} more...
                    </button>
                )}
            </div>
        </div>
    );
};

// ─── Nav items ────────────────────────────────────────────────────────────────

const navItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "Calendar", href: "/calendar" },
    { label: "Reporting", href: "/reporting" },
    { label: "Users", href: "/users" },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export const CalendarPage = () => {
    const [activeTab, setActiveTab] = useState("All events");

    const tabs = [
        { id: "All events", children: "All events" },
        { id: "Shared", children: "Shared" },
        { id: "Public", children: "Public" },
        { id: "Archived", children: "Archived" },
    ];

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
        <div className="flex min-h-screen flex-col bg-primary">
            <HeaderNavigationBase activeUrl="/calendar" items={navItems} />

            <main className="flex flex-1 flex-col">
                {/* Page Header */}
                <div className="border-b border-secondary">
                    <div className="mx-auto w-full max-w-container px-8 pt-6 pb-0">
                        <div className="flex items-center justify-between gap-4 pb-5">
                            <h1 className="text-xl font-semibold text-primary">My calendar</h1>
                            <div className="relative flex items-center rounded-lg border border-primary bg-primary px-3 py-2 shadow-xs">
                                <SearchLg className="mr-2 size-4 text-quaternary" aria-hidden />
                                <span className="text-sm text-placeholder">Search</span>
                                <kbd className="ml-8 flex items-center gap-0.5 rounded border border-secondary px-1.5 py-0.5 text-xs text-tertiary">
                                    ⌘K
                                </kbd>
                            </div>
                        </div>

                        <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(String(key))}>
                            <TabList
                                size="sm"
                                type="underline"
                                items={tabs}
                                className="-mb-px before:hidden"
                            />
                        </Tabs>
                    </div>
                </div>

                {/* Calendar Section */}
                <div className="flex flex-1 flex-col">
                    <div className="mx-auto w-full max-w-container px-8 py-6">
                        <div className="overflow-hidden rounded-xl border border-secondary shadow-xs">
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between border-b border-secondary px-4 py-3.5">
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col items-center rounded-lg border border-secondary px-2.5 py-1.5 text-center shadow-xs">
                                        <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-secondary">JAN</span>
                                        <span className="text-xl font-bold text-primary leading-tight">8</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold text-primary">January 2027</span>
                                            <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary">
                                                Week 1
                                            </span>
                                        </div>
                                        <p className="text-sm text-tertiary">Jan 1, 2027 – Jan 31, 2027</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className="flex size-8 items-center justify-center rounded-lg border border-secondary text-quaternary hover:bg-primary_hover hover:text-secondary transition duration-100 ease-linear shadow-xs">
                                        <SearchLg className="size-4" aria-hidden />
                                    </button>

                                    <div className="flex items-center rounded-lg border border-secondary shadow-xs overflow-hidden">
                                        <button className="flex size-8 items-center justify-center text-quaternary hover:bg-primary_hover hover:text-secondary transition duration-100 ease-linear border-r border-secondary">
                                            <ArrowLeft className="size-4" aria-hidden />
                                        </button>
                                        <button className="px-3 py-1.5 text-sm font-semibold text-secondary hover:bg-primary_hover transition duration-100 ease-linear">
                                            Today
                                        </button>
                                        <button className="flex size-8 items-center justify-center text-quaternary hover:bg-primary_hover hover:text-secondary transition duration-100 ease-linear border-l border-secondary">
                                            <ArrowRight className="size-4" aria-hidden />
                                        </button>
                                    </div>

                                    <button className="flex items-center gap-1.5 rounded-lg border border-secondary px-3 py-1.5 text-sm font-semibold text-secondary shadow-xs hover:bg-primary_hover transition duration-100 ease-linear">
                                        Month view
                                        <ChevronDown className="size-4 text-quaternary" aria-hidden />
                                    </button>

                                    <Button size="sm" color="primary" iconLeading={Plus}>
                                        Add event
                                    </Button>
                                </div>
                            </div>

                            {/* Day Headers */}
                            <div className="grid grid-cols-7 border-b border-secondary">
                                {weekDays.map((day) => (
                                    <div
                                        key={day}
                                        className="border-r border-secondary py-2.5 text-center text-xs font-medium text-tertiary last:border-r-0"
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            {calendarWeeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="grid grid-cols-7 last:[&>div]:border-b-0">
                                    {week.map((day) => (
                                        <CalendarDayCell key={`${day.month}-${day.date}`} day={day} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
