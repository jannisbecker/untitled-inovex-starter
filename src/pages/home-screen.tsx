import { useMemo, useState } from "react";
import { Plus } from "@untitledui/icons";
import { ChatComposer } from "@/components/application/chat/chat-composer";
import { ChatMessageList } from "@/components/application/chat/chat-message-list";
import { ChatSidebar } from "@/components/application/chat/chat-sidebar";
import { Button } from "@/components/base/buttons/button";
import { useChatHistory } from "@/hooks/use-chat-history";
import type { ChatMessage } from "@/types/chat";
import { requestChatCompletionWithFallback } from "@/utils/chat-client";
import { cx } from "@/utils/cx";

export const HomeScreen = () => {
    const [draft, setDraft] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { sessions, activeSession, activeChatId, setActiveChatId, createSession, appendMessage, createChatAndAppend } = useChatHistory();

    const hasMessages = Boolean(activeSession?.messages.length);

    const activeMessages = useMemo(() => activeSession?.messages ?? [], [activeSession]);

    const createId = () => {
        if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
            return crypto.randomUUID();
        }

        return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    };

    const submitMessage = async () => {
        const content = draft.trim();

        if (!content || isLoading) {
            return;
        }

        setDraft("");

        const userMessage: ChatMessage = {
            id: createId(),
            role: "user",
            content,
            createdAt: new Date().toISOString(),
        };

        let targetSessionId = activeChatId;

        if (!targetSessionId) {
            targetSessionId = createChatAndAppend(userMessage);
        } else {
            appendMessage(targetSessionId, userMessage);
        }

        setIsLoading(true);

        try {
            const assistantMessage = await requestChatCompletionWithFallback([...(activeSession?.messages ?? []), userMessage]);
            appendMessage(targetSessionId, assistantMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-dvh bg-primary">
            <ChatSidebar sessions={sessions} activeChatId={activeChatId} onCreateChat={() => createSession()} onSelectChat={setActiveChatId} />

            <main className="relative flex min-w-0 flex-1 flex-col">
                {!hasMessages ? (
                    <div className="mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-center px-6">
                        <h1 className="text-center text-display-sm font-semibold text-primary">Start a new conversation</h1>
                        <p className="mt-3 max-w-2xl text-center text-lg text-tertiary">
                            Build faster with a clean chat workspace. Ask about product ideas, copywriting, or implementation tasks.
                        </p>

                        <div className="mt-10 w-full max-w-3xl">
                            <ChatComposer value={draft} onChange={setDraft} onSubmit={submitMessage} isLoading={isLoading} autoFocus />
                        </div>
                    </div>
                ) : (
                    <>
                        <section className="min-h-0 flex-1 overflow-y-auto px-6">
                            <ChatMessageList messages={activeMessages} />
                        </section>

                        <section className="border-t border-secondary bg-primary px-6 py-4">
                            <div className="mx-auto w-full max-w-3xl">
                                <ChatComposer value={draft} onChange={setDraft} onSubmit={submitMessage} isLoading={isLoading} />
                            </div>
                        </section>
                    </>
                )}

                <Button
                    size="sm"
                    color="secondary"
                    iconLeading={Plus}
                    className={cx("absolute top-4 right-4 lg:hidden", hasMessages && "top-3")}
                    onClick={() => createSession()}
                >
                    New
                </Button>
            </main>
        </div>
    );
};
