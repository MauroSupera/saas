import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Paperclip, X, Maximize2, Minimize2 } from "lucide-react";

interface ChatWidgetProps {
  companyName?: string;
  primaryColor?: string;
  welcomeMessage?: string;
  position?: "bottom-right" | "bottom-left";
}

export function ChatWidget({
  companyName = "ChatSaaS",
  primaryColor = "#3b82f6",
  welcomeMessage = "Olá! Como podemos ajudar você hoje?",
  position = "bottom-right",
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPreChatFormCompleted, setIsPreChatFormCompleted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: "user" | "agent" }>
  >([]);
  const [isMinimized, setIsMinimized] = useState(false);

  const handlePreChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPreChatFormCompleted(true);
    // Add welcome message to chat
    setMessages([{ text: welcomeMessage, sender: "agent" }]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: currentMessage, sender: "user" }];
    setMessages(newMessages);
    setCurrentMessage("");

    // Simulate agent response after a delay
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          text: "Obrigado por sua mensagem! Um agente entrará em contato em breve.",
          sender: "agent",
        },
      ]);
    }, 1000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className={`fixed ${position === "bottom-right" ? "right-4" : "left-4"} bottom-4 z-50`}
    >
      {/* Chat button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="rounded-full w-16 h-16 shadow-lg transition-transform hover:scale-105"
          style={{ backgroundColor: primaryColor }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className={`bg-background rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out border border-border ${isMinimized ? "w-72 h-14" : "w-80 sm:w-96 h-[500px]"}`}
        >
          {/* Chat header */}
          <div
            className="p-4 flex justify-between items-center cursor-pointer"
            style={{ backgroundColor: primaryColor }}
            onClick={toggleMinimize}
          >
            <h3 className="font-semibold text-white">{companyName}</h3>
            <div className="flex items-center space-x-2">
              {isMinimized ? (
                <Maximize2 className="h-5 w-5 text-white" />
              ) : (
                <Minimize2 className="h-5 w-5 text-white" />
              )}
              <X
                className="h-5 w-5 text-white hover:text-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              />
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Pre-chat form */}
              {!isPreChatFormCompleted ? (
                <div className="p-4 flex flex-col h-[calc(500px-64px)] overflow-y-auto">
                  <p className="text-foreground mb-4">
                    Por favor, preencha o formulário abaixo para iniciar o chat:
                  </p>
                  <form onSubmit={handlePreChatSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Como podemos ajudar?</Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Iniciar Chat
                    </Button>
                  </form>
                </div>
              ) : (
                <>
                  {/* Chat messages */}
                  <div className="p-4 h-[calc(500px-128px)] overflow-y-auto">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`mb-4 ${msg.sender === "user" ? "text-right" : "text-left"}`}
                      >
                        <div
                          className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat input */}
                  <div className="p-4 border-t border-border">
                    <form
                      onSubmit={handleSendMessage}
                      className="flex items-center space-x-2"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Paperclip className="h-5 w-5" />
                      </Button>
                      <Input
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        className="flex-1"
                      />
                      <Button
                        type="submit"
                        size="icon"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
