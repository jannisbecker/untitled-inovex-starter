import { ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { TextArea } from "@/components/base/textarea/textarea";

interface ChatComposerProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    isLoading?: boolean;
    placeholder?: string;
    autoFocus?: boolean;
}

export const ChatComposer = ({ value, onChange, onSubmit, isLoading = false, placeholder = "Ask anything...", autoFocus = false }: ChatComposerProps) => {
    return (
        <div className="w-full rounded-2xl border border-secondary bg-primary p-3 shadow-sm">
            <TextArea
                autoFocus={autoFocus}
                value={value}
                placeholder={placeholder}
                rows={3}
                textAreaClassName="min-h-[88px] resize-none border-none shadow-none ring-0! focus:ring-0!"
                onChange={onChange}
                onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        onSubmit();
                    }
                }}
            />

            <div className="mt-3 flex justify-end">
                <Button size="md" iconTrailing={ArrowRight} isLoading={isLoading} onClick={onSubmit} isDisabled={!value.trim()}>
                    Send
                </Button>
            </div>
        </div>
    );
};
