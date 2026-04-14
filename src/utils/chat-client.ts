import type { UIMessage } from "ai";
import type { ChatCompletionResponse, ChatMessage } from "@/types/chat";

interface ChatCompletionPayload {
    messages: ChatMessage[];
}

const createId = () => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const buildMockResponse = (prompt: string): ChatMessage => ({
    id: createId(),
    role: "assistant",
    content: `Mock reply: ${prompt.trim() || "Tell me what you want to build."}`,
    createdAt: new Date().toISOString(),
});

export const requestChatCompletion = async (payload: ChatCompletionPayload) => {
    const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Chat request failed.");
    }

    const body = (await response.json()) as ChatCompletionResponse;

    if (!body.message?.content) {
        throw new Error("Invalid chat response.");
    }

    return body.message;
};

export const requestChatCompletionWithFallback = async (messages: ChatMessage[]) => {
    try {
        // Keep a lightweight AI SDK message mapping so moving to `@ai-sdk/react` useChat is straightforward.
        const _uiMessages: UIMessage[] = messages.map((message) => ({
            id: message.id,
            role: message.role,
            parts: [{ type: "text", text: message.content }],
        }));

        void _uiMessages;
        return await requestChatCompletion({ messages });
    } catch {
        const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
        return buildMockResponse(latestUserMessage?.content ?? "");
    }
};
