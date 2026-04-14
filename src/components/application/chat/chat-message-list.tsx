import { Avatar } from "@/components/base/avatar/avatar";
import type { ChatMessage } from "@/types/chat";
import { cx } from "@/utils/cx";

interface ChatMessageListProps {
    messages: ChatMessage[];
}

export const ChatMessageList = ({ messages }: ChatMessageListProps) => {
    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-8">
            {messages.map((message) => {
                const isUser = message.role === "user";

                return (
                    <article key={message.id} className={cx("flex gap-3", isUser && "flex-row-reverse")}>
                        <Avatar size="sm" initials={isUser ? "Y" : "AI"} />

                        <div
                            className={cx(
                                "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6",
                                isUser ? "bg-brand-solid text-primary_on-brand" : "bg-secondary text-primary",
                            )}
                        >
                            <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};
