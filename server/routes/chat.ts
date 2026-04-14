import type { IncomingMessage, ServerResponse } from "node:http";
import { getAssistantReply, type ServerChatMessage } from "../ai/provider";

interface ChatCompletionRequest {
    messages: ServerChatMessage[];
}

const readBody = async (request: IncomingMessage) => {
    const chunks: Uint8Array[] = [];

    for await (const chunk of request) {
        chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }

    const body = Buffer.concat(chunks).toString("utf8");

    if (!body) {
        return {} as ChatCompletionRequest;
    }

    return JSON.parse(body) as ChatCompletionRequest;
};

const json = (response: ServerResponse, statusCode: number, payload: unknown) => {
    response.writeHead(statusCode, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    });
    response.end(JSON.stringify(payload));
};

export const handleChatRoute = async (request: IncomingMessage, response: ServerResponse) => {
    if (request.method === "OPTIONS") {
        json(response, 200, {});
        return;
    }

    if (request.method !== "POST") {
        json(response, 405, { error: "Method not allowed." });
        return;
    }

    try {
        const body = await readBody(request);
        const messages = body.messages ?? [];
        const assistantMessage = await getAssistantReply(messages);

        json(response, 200, { message: assistantMessage });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        json(response, 500, { error: message });
    }
};
