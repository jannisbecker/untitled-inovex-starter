import { BookOpen01, Plus, SearchLg, Settings01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import type { ChatSession } from "@/types/chat";
import { cx } from "@/utils/cx";

interface ChatSidebarProps {
    sessions: ChatSession[];
    activeChatId: string | null;
    onSelectChat: (chatId: string) => void;
    onCreateChat: () => void;
}

const formatTime = (isoDate: string) =>
    new Date(isoDate).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
    });

export const ChatSidebar = ({ sessions, activeChatId, onSelectChat, onCreateChat }: ChatSidebarProps) => {
    return (
        <aside className="hidden h-dvh w-80 shrink-0 flex-col border-r border-secondary bg-primary lg:flex">
            <div className="space-y-4 border-b border-secondary p-5">
                <UntitledLogo className="h-6" />

                <Button size="md" iconLeading={Plus} onClick={onCreateChat} className="w-full justify-start">
                    New chat
                </Button>

                <Input size="sm" placeholder="Search chats" icon={SearchLg} />
            </div>

            <div className="flex min-h-0 flex-1 flex-col px-3 py-4">
                <p className="px-2 text-xs font-semibold tracking-wide text-tertiary uppercase">Chat history</p>

                <div className="mt-2 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1">
                    {sessions.map((session) => (
                        <button
                            type="button"
                            key={session.id}
                            onClick={() => onSelectChat(session.id)}
                            className={cx(
                                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition duration-100 ease-linear hover:bg-primary_hover",
                                activeChatId === session.id && "bg-secondary hover:bg-secondary_hover",
                            )}
                        >
                            <span className="flex min-w-0 items-center gap-2">
                                <SearchLg className="size-4 shrink-0 text-fg-tertiary" />
                                <span className="truncate text-sm font-medium text-secondary">{session.title}</span>
                            </span>
                            <span className="ml-2 shrink-0 text-xs text-tertiary">{formatTime(session.updatedAt)}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="border-t border-secondary p-3">
                <div className="flex items-center gap-2">
                    <Button color="tertiary" iconLeading={BookOpen01} href="https://www.untitledui.com/react/docs/introduction" target="_blank">
                        Docs
                    </Button>
                    <Button color="tertiary" iconLeading={Settings01}>
                        Settings
                    </Button>
                </div>
            </div>
        </aside>
    );
};
