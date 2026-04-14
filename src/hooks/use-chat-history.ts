import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChatMessage, ChatSession } from "@/types/chat";

const CHAT_STORAGE_KEY = "chat-history-v1";

const createId = () => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const getSessionTitle = (firstMessage: string) => {
    const trimmed = firstMessage.trim();

    if (!trimmed) {
        return "New chat";
    }

    return trimmed.slice(0, 44);
};

export const useChatHistory = () => {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);

    useEffect(() => {
        const raw = localStorage.getItem(CHAT_STORAGE_KEY);

        if (!raw) {
            return;
        }

        try {
            const parsed = JSON.parse(raw) as { sessions: ChatSession[]; activeChatId: string | null };

            setSessions(parsed.sessions ?? []);
            setActiveChatId(parsed.activeChatId ?? null);
        } catch {
            localStorage.removeItem(CHAT_STORAGE_KEY);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            CHAT_STORAGE_KEY,
            JSON.stringify({
                sessions,
                activeChatId,
            }),
        );
    }, [sessions, activeChatId]);

    const activeSession = useMemo(() => sessions.find((session) => session.id === activeChatId) ?? null, [sessions, activeChatId]);

    const createSession = useCallback((seedMessage?: string) => {
        const now = new Date().toISOString();
        const session: ChatSession = {
            id: createId(),
            title: getSessionTitle(seedMessage ?? ""),
            createdAt: now,
            updatedAt: now,
            messages: [],
        };

        setSessions((prev) => [session, ...prev]);
        setActiveChatId(session.id);

        return session;
    }, []);

    const updateSessionMessages = useCallback((sessionId: string, updater: (messages: ChatMessage[]) => ChatMessage[]) => {
        setSessions((prev) =>
            prev.map((session) => {
                if (session.id !== sessionId) {
                    return session;
                }

                const nextMessages = updater(session.messages);
                const title = session.title === "New chat" && nextMessages[0] ? getSessionTitle(nextMessages[0].content) : session.title;

                return {
                    ...session,
                    title,
                    updatedAt: new Date().toISOString(),
                    messages: nextMessages,
                };
            }),
        );
    }, []);

    const appendMessage = useCallback(
        (sessionId: string, message: ChatMessage) => {
            updateSessionMessages(sessionId, (messages) => [...messages, message]);
        },
        [updateSessionMessages],
    );

    const createChatAndAppend = useCallback(
        (message: ChatMessage) => {
            const session = createSession(message.content);

            setSessions((prev) =>
                prev.map((item) => {
                    if (item.id !== session.id) {
                        return item;
                    }

                    return {
                        ...item,
                        messages: [message],
                        updatedAt: new Date().toISOString(),
                    };
                }),
            );

            return session.id;
        },
        [createSession],
    );

    return {
        sessions,
        activeChatId,
        activeSession,
        setActiveChatId,
        createSession,
        appendMessage,
        createChatAndAppend,
    };
};
