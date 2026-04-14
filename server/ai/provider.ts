import { generateId } from "ai";

export interface ServerChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt: string;
}

const createMockReply = (prompt: string) => {
    const normalizedPrompt = prompt.trim();

    if (!normalizedPrompt) {
        return "Tell me what you want to build and I will help you break it down.";
    }

    return `Mock reply: ${normalizedPrompt}`;
};

export const getAssistantReply = async (messages: ServerChatMessage[]): Promise<ServerChatMessage> => {
    const mode = process.env.AI_PROVIDER_MODE ?? "mock";
    const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

    if (mode !== "mock") {
        throw new Error(
            "Live provider mode is not configured yet. Set AI_PROVIDER_MODE=mock or add a provider implementation in server/ai/provider.ts.",
        );
    }

    return {
        id: generateId(),
        role: "assistant",
        content: createMockReply(latestUserMessage?.content ?? ""),
        createdAt: new Date().toISOString(),
    };
};
