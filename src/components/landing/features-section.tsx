import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  MessageSquare,
  Bot,
  Globe,
  Zap,
  Edit3,
  Save,
  MessageCircle,
  Users,
} from "lucide-react";

const features = [
  {
    name: "Chat ao Vivo",
    description:
      "Conecte-se com seus clientes em tempo real, oferecendo suporte instantâneo quando eles mais precisam.",
    icon: MessageSquare,
  },
  {
    name: "Respostas Automatizadas",
    description:
      "Configure respostas automáticas para perguntas frequentes, economizando tempo e recursos.",
    icon: Bot,
  },
  {
    name: "Integração Omnichannel",
    description:
      "Unifique suas comunicações em uma única plataforma, integrando e-mail, redes sociais e chat.",
    icon: Globe,
  },
  {
    name: "IA para Tradução",
    description:
      "Comunique-se com clientes em qualquer idioma com tradução automática em tempo real.",
    icon: Zap,
  },
  {
    name: "Editor de Mensagens",
    description:
      "Edite e formate suas mensagens com um editor rico e intuitivo para uma comunicação mais eficaz.",
    icon: Edit3,
  },
  {
    name: "Respostas Salvas",
    description:
      "Crie uma biblioteca de respostas prontas para agilizar o atendimento e manter a consistência.",
    icon: Save,
  },
  {
    name: "Mensagem Direta",
    description:
      "Envie mensagens personalizadas diretamente para clientes específicos com base em seu comportamento.",
    icon: MessageCircle,
  },
  {
    name: "Colaboração em Equipe",
    description:
      "Trabalhe em conjunto com sua equipe, transferindo conversas e compartilhando informações.",
    icon: Users,
  },
];

export function FeaturesSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div id="features" className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Funcionalidades Poderosas para seu Negócio
          </motion.h2>
          <motion.p
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.2 },
              },
            }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            Tudo o que você precisa para oferecer um atendimento excepcional e
            aumentar a satisfação dos seus clientes.
          </motion.p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4 md:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.1 * (index + 1) },
                  },
                }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group relative bg-card hover:bg-card/80 p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md border border-border"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon
                    className="h-6 w-6 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <dt className="text-lg font-semibold leading-7 text-foreground">
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
