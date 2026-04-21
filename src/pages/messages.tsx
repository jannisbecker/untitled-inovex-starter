import { useState } from "react";
import {
    Attachment01,
    CheckDone02,
    Edit05,
    FaceSmile,
    PhoneCall01,
    Play,
    Recording02,
    SearchLg,
} from "@untitledui/icons";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { InputBase } from "@/components/base/input/input";
import { cx } from "@/utils/cx";

// ─── Nav items ───────────────────────────────────────────────────────────────

const navItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "Tasks", href: "/tasks" },
    { label: "Reporting", href: "/reporting" },
    { label: "Messages", href: "/messages" },
];

// ─── Types ───────────────────────────────────────────────────────────────────

interface Conversation {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    lastMessage: string;
    lastMessagePrefix?: string;
    time: string;
    unread: boolean;
}

interface ChatMessage {
    id: string;
    sender: "them" | "me";
    name: string;
    time: string;
    content?: string;
    attachment?: { name: string; size: string; type: string };
    audio?: { duration: string };
    reactions?: string[];
}

// ─── Mock data ───────────────────────────────────────────────────────────────

const conversations: Conversation[] = [
    {
        id: "1",
        name: "Phoenix Baker",
        handle: "@phoenix",
        avatar: "",
        lastMessage: "Hey Olivia, Katherine sent me over the latest doc. I just have a quick question about the...",
        time: "5min ago",
        unread: true,
    },
    {
        id: "2",
        name: "Andi Lane",
        handle: "@andi",
        avatar: "",
        lastMessage: "Sure thing, I'll have a look today. They're looking great!",
        lastMessagePrefix: "You: ",
        time: "20min ago",
        unread: false,
    },
    {
        id: "3",
        name: "Mollie Hall",
        handle: "@mollie",
        avatar: "",
        lastMessage: "I've just published the site again. Looks like it fixed it. How weird! I'll keep an eye on it...",
        time: "1hr ago",
        unread: true,
    },
    {
        id: "4",
        name: "Rosalee Melvin",
        handle: "@rosalee",
        avatar: "",
        lastMessage: "Hey Liv, just wanted to say thanks for chasing up the release for me. Really...",
        time: "2hr ago",
        unread: false,
    },
    {
        id: "5",
        name: "Anaiah Whitten",
        handle: "@analah",
        avatar: "",
        lastMessage: "Good news!! Jack accepted the offer. I've sent over a contract for him to review but...",
        time: "2hr ago",
        unread: false,
    },
    {
        id: "6",
        name: "Koray Okumus",
        handle: "@koray",
        avatar: "",
        lastMessage: "Thanks! Looks great!",
        time: "4hr ago",
        unread: true,
    },
    {
        id: "7",
        name: "Eva Bond",
        handle: "@eva",
        avatar: "",
        lastMessage: "The press release went out! It's been picked up by a few people... Here's the link if you...",
        time: "4hr ago",
        unread: false,
    },
];

const chatMessages: ChatMessage[] = [
    {
        id: "m1",
        sender: "them",
        name: "Andi Lane",
        time: "Thursday 10:16am",
        content: "Thanks Olivia! Almost there. I'll work on making those changes you suggested and will shoot it over.",
    },
    {
        id: "m2",
        sender: "them",
        name: "Andi Lane",
        time: "Thursday 11:40am",
        content: "Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.",
    },
    {
        id: "m3",
        sender: "them",
        name: "Andi Lane",
        time: "Thursday 11:40am",
        attachment: { name: "Tech requirements.pdf", size: "1.2 MB", type: "PDF" },
    },
    {
        id: "m4",
        sender: "me",
        name: "You",
        time: "Thursday 11:41am",
        content: "Awesome! Thanks. I'll look at this today.",
    },
    {
        id: "m5",
        sender: "them",
        name: "Andi Lane",
        time: "Thursday 11:44am",
        content: "No rush though\u2014we still have to wait for Lana's designs.",
    },
    {
        id: "m6",
        sender: "them",
        name: "Andi Lane",
        time: "Today 2:20pm",
        content: "Hey Olivia, can you please review the latest design?",
    },
    {
        id: "m7",
        sender: "me",
        name: "You",
        time: "Just now",
        content: "Sure thing, I'll have a look today. They're looking great!",
        reactions: ["\u2764\ufe0f", "\ud83d\udc4c"],
    },
    {
        id: "m8",
        sender: "them",
        name: "Andi Lane",
        time: "Friday 2:20pm",
        audio: { duration: "00:28" },
    },
];

// ─── Conversation list item ──────────────────────────────────────────────────

const ConversationItem = ({
    conversation,
    isActive,
    onClick,
}: {
    conversation: Conversation;
    isActive: boolean;
    onClick: () => void;
}) => (
    <button
        type="button"
        onClick={onClick}
        className={cx(
            "flex w-full flex-col gap-4 border-b border-secondary py-4 pl-3 pr-4 text-left transition duration-100 ease-linear",
            isActive && "bg-secondary",
        )}
    >
        <div className="flex items-start gap-4">
            <div className="flex flex-1 items-center gap-3">
                <div
                    className={cx(
                        "size-2 shrink-0 rounded-full bg-fg-brand-secondary",
                        !conversation.unread && "opacity-0",
                    )}
                />
                <AvatarLabelGroup
                    size="md"
                    src={conversation.avatar || undefined}
                    initials={conversation.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    title={conversation.name}
                    subtitle={conversation.handle}
                    status="online"
                />
            </div>
            <span className="shrink-0 text-sm text-tertiary">{conversation.time}</span>
        </div>
        <div className="pl-5">
            <p className="line-clamp-2 text-sm text-tertiary">
                {conversation.lastMessagePrefix && (
                    <span className="font-medium">{conversation.lastMessagePrefix}</span>
                )}
                {conversation.lastMessage}
            </p>
        </div>
    </button>
);

// ─── Chat bubble ─────────────────────────────────────────────────────────────

const ChatBubble = ({ message }: { message: ChatMessage }) => {
    const isMe = message.sender === "me";

    return (
        <div className={cx("flex w-full", isMe ? "justify-end pl-8" : "pr-8")}>
            <div className={cx("flex max-w-[560px] gap-3", isMe ? "max-w-[442px] flex-row-reverse" : "items-start")}>
                {!isMe && (
                    <Avatar
                        size="sm"
                        initials="AL"
                        status="online"
                    />
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    {/* Name and time */}
                    <div className="flex items-center gap-2">
                        <span className="flex-1 truncate text-sm font-medium text-secondary">
                            {message.name}
                        </span>
                        <div className="flex shrink-0 items-center gap-0.5">
                            <span className="text-xs text-tertiary">{message.time}</span>
                            {isMe && <CheckDone02 className="size-4 text-fg-brand-secondary" />}
                        </div>
                    </div>

                    {/* Content bubble */}
                    {message.content && (
                        <div
                            className={cx(
                                "w-full rounded-b-lg border border-secondary px-3 py-2",
                                isMe
                                    ? "rounded-tl-lg bg-primary"
                                    : "rounded-tr-lg bg-secondary",
                            )}
                        >
                            <p className="text-md text-primary">{message.content}</p>
                        </div>
                    )}

                    {/* File attachment */}
                    {message.attachment && (
                        <div
                            className={cx(
                                "flex w-full items-start gap-3 rounded-b-lg border border-secondary p-3",
                                isMe ? "rounded-tl-lg bg-primary" : "rounded-tr-lg bg-primary",
                            )}
                        >
                            <div className="relative size-10 shrink-0">
                                <div className="flex h-full w-full items-center justify-center rounded bg-primary">
                                    <div className="absolute bottom-1.5 left-0.5 rounded-xs bg-error-solid px-1 py-0.5 text-[10px] font-bold text-white">
                                        {message.attachment.type}
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-secondary">
                                    {message.attachment.name}
                                </p>
                                <p className="text-sm text-tertiary">{message.attachment.size}</p>
                            </div>
                        </div>
                    )}

                    {/* Audio message */}
                    {message.audio && (
                        <div
                            className={cx(
                                "flex w-full items-center gap-2 rounded-b-lg border border-secondary p-3",
                                isMe ? "rounded-tl-lg bg-primary" : "rounded-tr-lg bg-primary",
                            )}
                        >
                            <button
                                type="button"
                                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-solid text-white"
                            >
                                <Play className="size-4" />
                            </button>
                            <div className="flex flex-1 items-center gap-1 overflow-hidden">
                                {/* Audio waveform visualization */}
                                {Array.from({ length: 40 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-0.5 shrink-0 rounded-full bg-brand-solid"
                                        style={{ height: `${Math.random() * 24 + 4}px`, opacity: i > 20 ? 0.3 : 1 }}
                                    />
                                ))}
                            </div>
                            <span className="shrink-0 text-xs text-tertiary">{message.audio.duration}</span>
                        </div>
                    )}

                    {/* Reactions */}
                    {message.reactions && (
                        <div className="flex items-center justify-end gap-1">
                            {message.reactions.map((emoji, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    className="flex h-6 items-center justify-center rounded-full border border-secondary bg-secondary px-2"
                                >
                                    <span className="text-sm">{emoji}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── Content divider ─────────────────────────────────────────────────────────

const ContentDivider = ({ label }: { label: string }) => (
    <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-border-secondary" />
        <span className="shrink-0 text-center text-sm font-medium text-tertiary">{label}</span>
        <div className="h-px flex-1 bg-border-secondary" />
    </div>
);

// ─── Page ────────────────────────────────────────────────────────────────────

export const MessagesPage = () => {
    const [activeConversation, setActiveConversation] = useState("2");
    const activeContact = conversations.find((c) => c.id === activeConversation);

    return (
        <div className="flex h-dvh flex-col bg-primary">
            <HeaderNavigationBase activeUrl="/messages" items={navItems} />

            {/* Page header */}
            <main className="flex flex-1 flex-col overflow-hidden">
                <div className="mx-auto w-full max-w-container px-8 pt-12 pb-0">
                    <h1 className="text-xl font-semibold text-primary">All messages</h1>
                </div>

                {/* Content card */}
                <div className="mx-auto flex w-full max-w-container flex-1 flex-col overflow-hidden px-8 pt-8 pb-24">
                    <div className="flex min-h-0 flex-1 overflow-hidden rounded-xl border border-secondary shadow-xs">
                        {/* ── Left sidebar: Conversations list ── */}
                        <div className="flex w-full max-w-[360px] shrink-0 flex-col overflow-hidden border-r border-secondary bg-primary">
                            {/* Sidebar card header */}
                            <div className="relative flex items-center gap-4 bg-primary px-6 pt-5 pb-5">
                                <div className="flex flex-1 flex-col gap-0.5">
                                    <div className="flex items-center gap-1.5">
                                        <h2 className="text-md font-semibold text-primary">Messages</h2>
                                        <BadgeWithDot color="success" type="modern" size="sm">
                                            40
                                        </BadgeWithDot>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button size="sm" color="secondary" iconLeading={Edit05} aria-label="New message" />
                                </div>
                            </div>

                            {/* Search */}
                            <div className="px-5 pb-3">
                                <InputBase
                                    size="sm"
                                    placeholder="Search"
                                    icon={SearchLg}
                                    aria-label="Search messages"
                                />
                            </div>

                            {/* Conversation list */}
                            <div className="flex-1 overflow-y-auto">
                                {conversations.map((c) => (
                                    <ConversationItem
                                        key={c.id}
                                        conversation={c}
                                        isActive={c.id === activeConversation}
                                        onClick={() => setActiveConversation(c.id)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* ── Right panel: Chat thread ── */}
                        <div className="flex min-w-0 flex-1 flex-col bg-primary">
                            {/* Chat card header */}
                            <div className="relative flex items-start gap-4 border-b border-secondary bg-primary px-6 pt-5 pb-5">
                                <div className="flex flex-1 items-start gap-2">
                                    <Avatar
                                        size="lg"
                                        border
                                        initials={activeContact?.name.split(" ").map((n) => n[0]).join("") ?? ""}
                                        status="online"
                                        verified
                                    />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-1.5">
                                            <h3 className="text-md font-semibold text-primary">
                                                {activeContact?.name}
                                            </h3>
                                            <BadgeWithDot color="success" type="modern" size="sm">
                                                Online
                                            </BadgeWithDot>
                                        </div>
                                        <p className="truncate text-sm text-tertiary">
                                            {activeContact?.handle}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button size="sm" color="secondary" iconLeading={PhoneCall01}>
                                        Call
                                    </Button>
                                    <Button size="sm" color="primary">
                                        View profile
                                    </Button>
                                </div>

                                <Dropdown.Root>
                                    <Dropdown.DotsButton />
                                    <Dropdown.Popover className="w-min">
                                        <Dropdown.Menu>
                                            <Dropdown.Item>Mute conversation</Dropdown.Item>
                                            <Dropdown.Item>Archive</Dropdown.Item>
                                            <Dropdown.Item>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Popover>
                                </Dropdown.Root>
                            </div>

                            {/* Messages area */}
                            <div className="flex flex-1 flex-col justify-end gap-6 overflow-y-auto px-6 pb-8">
                                <ContentDivider label="Thursday" />

                                {/* Thursday messages */}
                                <div className="flex flex-col gap-4">
                                    {chatMessages.slice(0, 5).map((m) => (
                                        <ChatBubble key={m.id} message={m} />
                                    ))}
                                </div>

                                <ContentDivider label="Today" />

                                {/* Today messages */}
                                <div className="flex flex-col gap-4">
                                    {chatMessages.slice(5).map((m) => (
                                        <ChatBubble key={m.id} message={m} />
                                    ))}
                                </div>
                            </div>

                            {/* Message input */}
                            <div className="px-6 pb-6">
                                <div className="relative rounded-lg border border-primary shadow-xs">
                                    {/* Recording button (top right) */}
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 rounded-md p-1.5 text-fg-quaternary transition duration-100 ease-linear hover:text-fg-secondary"
                                    >
                                        <Recording02 className="size-4" />
                                    </button>

                                    {/* Text area */}
                                    <div className="min-h-[80px] px-3.5 pt-3 pb-10">
                                        <p className="text-md text-placeholder">Message</p>
                                    </div>

                                    {/* Bottom toolbar */}
                                    <div className="absolute right-3.5 bottom-2 flex items-center gap-2">
                                        <div className="flex items-center gap-0.5">
                                            <button
                                                type="button"
                                                className="rounded-md p-1.5 text-fg-quaternary transition duration-100 ease-linear hover:text-fg-secondary"
                                            >
                                                <Attachment01 className="size-4" />
                                            </button>
                                            <button
                                                type="button"
                                                className="rounded-md p-1.5 text-fg-quaternary transition duration-100 ease-linear hover:text-fg-secondary"
                                            >
                                                <FaceSmile className="size-4" />
                                            </button>
                                        </div>
                                        <Button size="sm" color="link-color">
                                            Send
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
