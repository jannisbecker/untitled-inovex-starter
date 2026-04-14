import { createServer } from "node:http";
import { handleChatRoute } from "./routes/chat";

const port = Number(process.env.PORT ?? 8787);

const server = createServer(async (request, response) => {
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);

    if (url.pathname === "/api/chat") {
        await handleChatRoute(request, response);
        return;
    }

    response.writeHead(404, {
        "Content-Type": "application/json",
    });
    response.end(JSON.stringify({ error: "Not found." }));
});

server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Chat server running on http://localhost:${port}`);
});
