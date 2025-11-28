import { Mic, PlusCircle, Send } from 'lucide-react';

interface ChatInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSend?: () => void;
}

export function ChatInput({ message, onMessageChange, onSend }: ChatInputProps) {
  return (
    <div className="flex items-end px-4 py-3 bg-background border-t border-border gap-2">
      <button className="p-1">
        <PlusCircle size={28} className="text-primary" />
      </button>
      <div className="flex-1 bg-border rounded-[20px] px-4 py-2 max-h-[100px] overflow-y-auto">
        <textarea
          className="w-full bg-transparent outline-none text-[15px] text-foreground placeholder:text-text-secondary resize-none min-h-[36px]"
          placeholder="메시지를 입력하세요..."
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          rows={1}
        />
      </div>
      <button className="p-1.5">
        <Mic size={24} className="text-primary" />
      </button>
      <button
        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
        onClick={onSend}
      >
        <Send size={20} className="text-background" />
      </button>
    </div>
  );
}
