import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { ChatWidget } from "@/components/widget/chat-widget";
import { ArrowRight, MessageSquare, Zap, Users, Globe } from "lucide-react";

const heroTexts = [
  "Transforme seu Atendimento com Chat em Tempo Real",
  "Aumente suas Conversões com Suporte Instantâneo",
  "Conecte-se com seus Clientes em Qualquer Lugar",
  "Automatize Respostas e Economize Tempo",
  "Personalize a Experiência do seu Cliente",
];

const benefitItems = [
  {
    icon: MessageSquare,
    text: "Atendimento em tempo real",
    description: "Responda às dúvidas dos clientes instantaneamente",
  },
  {
    icon: Zap,
    text: "Automação inteligente",
    description: "Respostas automáticas para perguntas frequentes",
  },
  {
    icon: Users,
    text: "Equipe colaborativa",
    description: "Gerencie conversas com múltiplos agentes",
  },
  {
    icon: Globe,
    text: "Suporte multilíngue",
    description: "Atenda clientes em qualquer idioma",
  },
];

export function HeroSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [textIndex, setTextIndex] = useState(0);
  const [isChangingText, setIsChangingText] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");

      // Start the text rotation after initial animation
      const textRotationTimer = setTimeout(() => {
        const interval = setInterval(() => {
          setIsChangingText(true);
          setTimeout(() => {
            setTextIndex((prev) => (prev + 1) % heroTexts.length);
            setIsChangingText(false);
          }, 500);
        }, 4000);

        return () => clearInterval(interval);
      }, 3000);

      return () => clearTimeout(textRotationTimer);
    }
  }, [controls, inView]);

  return (
    <div className="relative isolate overflow-hidden bg-background pt-14">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-blue-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <div
            ref={ref}
            className="h-[120px] sm:h-[180px] flex items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={textIndex}
                initial={
                  isChangingText ? { opacity: 0, y: 20 } : { opacity: 0, y: 20 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500"
              >
                {heroTexts[textIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <motion.p
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.2 },
              },
            }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            Conecte-se com seus clientes de forma instantânea, personalize sua
            experiência e aumente suas conversões com nossa plataforma de chat
            ao vivo.
          </motion.p>

          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.4 },
              },
            }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden rounded-md px-8 py-6 transition-all duration-300 ease-out hover:bg-primary/90 hover:shadow-lg w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center">
                Experimente Grátis
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-primary to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full sm:w-auto"
            >
              <Link to="#features" className="px-8 py-6">
                Saiba Mais
              </Link>
            </Button>
          </motion.div>

          {/* Animated benefit items */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.6 },
              },
            }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
          >
            {benefitItems.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 flex flex-col items-center text-center hover:bg-card/80 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{item.text}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Chat Widget Demo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 relative mx-auto max-w-4xl bg-card rounded-xl shadow-xl overflow-hidden border border-border"
        >
          <div className="p-4 bg-primary text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="font-medium">Chat em Tempo Real - Demonstração</div>
            <div></div>
          </div>
          <div className="p-6 h-[400px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="flex items-start"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                  <span className="text-primary font-bold">A</span>
                </div>
                <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-foreground">
                    Olá! Como posso ajudar você hoje?
                  </p>
                  <span className="text-xs text-muted-foreground mt-1">
                    Atendente • 10:02
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="flex items-start justify-end"
              >
                <div className="bg-primary p-3 rounded-lg rounded-tr-none max-w-[80%]">
                  <p className="text-primary-foreground">
                    Olá! Estou interessado em saber mais sobre os planos de
                    assinatura.
                  </p>
                  <span className="text-xs text-primary-foreground/80 mt-1">
                    Você • 10:03
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 }}
                className="flex items-start"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                  <span className="text-primary font-bold">A</span>
                </div>
                <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-foreground">
                    Claro! Temos três planos disponíveis: Básico, Profissional e
                    Empresarial. Cada um oferece diferentes recursos e limites
                    de uso.
                  </p>
                  <span className="text-xs text-muted-foreground mt-1">
                    Atendente • 10:04
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="flex items-center justify-center"
              >
                <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                  Atendente está digitando...
                </span>
              </motion.div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                className="flex-1 rounded-full border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-blue-500 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Fixed Chat Widget */}
      <ChatWidget position="bottom-right" />
    </div>
  );
}
