import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Send,
  Paperclip,
  X,
  Maximize2,
  Minimize2,
  Image,
  Smile,
  MoreHorizontal,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatWidgetProps {
  companyName?: string;
  primaryColor?: string;
  welcomeMessage?: string;
  position?: "bottom-right" | "bottom-left";
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
  status?: "sending" | "sent" | "delivered" | "read";
  avatar?: string;
  agentName?: string;
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastMessageTime, setLastMessageTime] = useState<Date | null>(null);
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);

  // Scroll to bottom when new messages arrive
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    // Simulate agent typing after user sends a message
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === "user") {
      setIsTyping(true);
      const typingTimeout = setTimeout(() => {
        setIsTyping(false);
        // Add agent response
        const newMessage: Message = {
          id: Date.now().toString(),
          text: "Obrigado por sua mensagem! Um de nossos agentes entrará em contato em breve.",
          sender: "agent",
          timestamp: new Date(),
          status: "sent",
          agentName: "Atendente",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=agent",
        };
        setMessages((prev) => [...prev, newMessage]);
        setLastMessageTime(new Date());
        if (!isOpen) {
          setUnreadCount((prev) => prev + 1);
        }
      }, 2000);

      return () => clearTimeout(typingTimeout);
    }
  }, [messages, isOpen]);

  // Reset unread count when opening the chat
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  // Add initial welcome message when component mounts
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage: Message = {
        id: "welcome",
        text: welcomeMessage,
        sender: "agent",
        timestamp: new Date(),
        status: "read",
        agentName: "Atendente",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=agent",
      };
      setMessages([initialMessage]);
      setLastMessageTime(new Date());
    }

    // Show initial animation for a few seconds
    const animationTimer = setTimeout(() => {
      setShowInitialAnimation(false);
    }, 3000);

    return () => clearTimeout(animationTimer);
  }, [welcomeMessage]);

  const handleSubmitPreChatForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setIsPreChatFormCompleted(true);
      // Add system message acknowledging the user info
      const newMessage: Message = {
        id: Date.now().toString(),
        text: `Olá ${name}! Como podemos ajudar você hoje?`,
        sender: "agent",
        timestamp: new Date(),
        status: "sent",
        agentName: "Atendente",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=agent",
      };
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: currentMessage,
        sender: "user",
        timestamp: new Date(),
        status: "sending",
      };
      setMessages((prev) => [...prev, newMessage]);
      setCurrentMessage("");

      // Simulate message being sent and delivered
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "sent" } : msg,
          ),
        );
      }, 500);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg,
          ),
        );
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      ref={widgetRef}
      className={`fixed ${position === "bottom-right" ? "right-4" : "left-4"} bottom-4 z-50 flex flex-col items-end`}
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Chat button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: showInitialAnimation ? [1, 1.1, 1] : 1,
              opacity: 1,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              duration: 0.3,
              repeat: showInitialAnimation ? Infinity : 0,
              repeatType: "reverse",
              repeatDelay: 1,
            }}
            className="relative"
          >
            <button
              onClick={toggleChat}
              className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors duration-200 hover:shadow-xl"
              style={{ backgroundColor: primaryColor }}
            >
              <MessageSquare className="h-6 w-6 text-white" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
            {lastMessageTime && !showInitialAnimation && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute bottom-16 right-0 w-60 rounded-lg bg-white p-3 shadow-md dark:bg-gray-800"
              >
                <p className="text-sm font-medium">{companyName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Última mensagem {formatTime(lastMessageTime)}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mb-4 w-full overflow-hidden rounded-lg border border-border bg-card shadow-xl sm:w-96"
          >
            {/* Chat header */}
            <div
              className="flex items-center justify-between p-4"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="flex items-center">
                <div className="mr-3 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {companyName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-white">{companyName}</h3>
                  <p className="text-xs text-white/80">
                    {isTyping ? "Digitando..." : "Online"}
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={toggleMinimize}
                  className="rounded p-1 text-white/80 hover:bg-white/20 hover:text-white"
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={toggleChat}
                  className="rounded p-1 text-white/80 hover:bg-white/20 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat body */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {!isPreChatFormCompleted ? (
                    <div className="p-4">
                      <h4 className="mb-4 text-center text-sm font-medium">
                        Por favor, preencha suas informações para iniciar o chat
                      </h4>
                      <form
                        onSubmit={handleSubmitPreChatForm}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Seu nome"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu.email@exemplo.com"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Mensagem (opcional)</Label>
                          <Textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Como podemos ajudar?"
                            rows={3}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          style={{
                            backgroundColor: primaryColor,
                            color: "white",
                          }}
                        >
                          Iniciar Chat
                        </Button>
                      </form>
                    </div>
                  ) : (
                    <>
                      <div className="h-80 overflow-y-auto p-4">
                        <div className="space-y-4">
                          {messages.map((msg) => (
                            <motion.div
                              key={msg.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                              {msg.sender === "agent" && (
                                <div className="mr-2 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-primary/10">
                                  {msg.avatar ? (
                                    <img
                                      src={msg.avatar}
                                      alt={msg.agentName || "Agent"}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-primary/20 text-xs font-bold text-primary">
                                      {msg.agentName?.charAt(0) || "A"}
                                    </div>
                                  )}
                                </div>
                              )}
                              <div
                                className={`max-w-[75%] rounded-lg p-3 ${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
                              >
                                <p className="text-sm">{msg.text}</p>
                                <div
                                  className={`mt-1 flex items-center justify-end space-x-1 text-xs ${msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                                >
                                  <span>{formatTime(msg.timestamp)}</span>
                                  {msg.sender === "user" && msg.status && (
                                    <span>
                                      {msg.status === "sending" && "✓"}
                                      {msg.status === "sent" && "✓"}
                                      {msg.status === "delivered" && "✓✓"}
                                      {msg.status === "read" && "✓✓"}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                          {isTyping && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex justify-start"
                            >
                              <div className="mr-2 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-primary/10">
                                <div className="flex h-full w-full items-center justify-center bg-primary/20 text-xs font-bold text-primary">
                                  A
                                </div>
                              </div>
                              <div className="max-w-[75%] rounded-lg bg-muted p-3">
                                <div className="flex space-x-1">
                                  <span className="animate-bounce">•</span>
                                  <span
                                    className="animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                  >
                                    •
                                  </span>
                                  <span
                                    className="animate-bounce"
                                    style={{ animationDelay: "0.4s" }}
                                  >
                                    •
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                          <div ref={messagesEndRef} />
                        </div>
                      </div>
                      <div className="border-t border-border p-3">
                        <div className="flex items-end space-x-2">
                          <div className="flex-1">
                            <Textarea
                              value={currentMessage}
                              onChange={(e) =>
                                setCurrentMessage(e.target.value)
                              }
                              onKeyDown={handleKeyPress}
                              placeholder="Digite sua mensagem..."
                              className="min-h-10 resize-none"
                              rows={1}
                            />
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-full"
                            >
                              <Paperclip className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-full"
                            >
                              <Image className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-full"
                            >
                              <Smile className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={handleSendMessage}
                              style={{ backgroundColor: primaryColor }}
                              disabled={!currentMessage.trim()}
                            >
                              <Send className="h-4 w-4 text-white" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat footer */}
            <div className="border-t border-border p-2 text-center text-xs text-muted-foreground">
              Powered by {companyName}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
