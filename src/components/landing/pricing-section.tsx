import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Básico",
    id: "basic",
    price: "R$ 99",
    description: "Ideal para pequenas empresas que estão começando.",
    features: [
      "Até 3 agentes",
      "500 chats por mês",
      "Widget personalizado",
      "Histórico de 30 dias",
      "Suporte por email",
    ],
    popular: false,
  },
  {
    name: "Profissional",
    id: "professional",
    price: "R$ 249",
    description:
      "Perfeito para empresas em crescimento com necessidades avançadas.",
    features: [
      "Até 10 agentes",
      "2.000 chats por mês",
      "Widget personalizado",
      "Integrações com CRM",
      "Chatbot básico",
      "Histórico ilimitado",
      "Suporte prioritário",
    ],
    popular: true,
  },
  {
    name: "Empresarial",
    id: "enterprise",
    price: "R$ 599",
    description:
      "Solução completa para grandes empresas com alto volume de atendimento.",
    features: [
      "Agentes ilimitados",
      "Chats ilimitados",
      "Widget totalmente personalizado",
      "Integrações avançadas",
      "Chatbot com IA avançada",
      "Análises detalhadas",
      "API completa",
      "Suporte 24/7",
      "White label",
    ],
    popular: false,
  },
];

export function PricingSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div id="pricing" className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Planos para todos os tamanhos de negócio
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Escolha o plano ideal para suas necessidades e comece a transformar
            seu atendimento ao cliente hoje mesmo.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.3 },
            },
          }}
          className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3"
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.1 * (index + 3) },
                },
              }}
              className={`flex flex-col justify-between rounded-3xl bg-card p-8 ring-1 ring-border ${tier.popular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8"} ${index === 0 ? "lg:rounded-r-none" : ""} ${index === 2 ? "lg:rounded-l-none" : ""} ${tier.popular ? "relative lg:-mt-4 lg:mb-4" : ""}`}
            >
              {tier.popular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-primary px-3 py-1 text-center text-xs font-medium text-primary-foreground">
                  Mais popular
                </div>
              )}
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-xl font-semibold leading-8 text-foreground">
                    {tier.name}
                  </h3>
                </div>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-muted-foreground">
                    /mês
                  </span>
                </p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {tier.description}
                </p>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check
                        className="h-5 w-5 flex-none text-primary"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                className={`mt-8 ${tier.popular ? "bg-primary hover:bg-primary/90" : "bg-primary/80 hover:bg-primary"}`}
                size="lg"
              >
                Escolher plano
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
