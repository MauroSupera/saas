import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Clock, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Básico",
    id: "basic",
    price: "R$ 99",
    originalPrice: "R$ 149",
    description: "Ideal para pequenas empresas que estão começando.",
    features: [
      "Até 3 agentes",
      "500 chats por mês",
      "Widget personalizado",
      "Histórico de 30 dias",
      "Suporte por email",
    ],
    popular: false,
    trialDays: 14,
  },
  {
    name: "Profissional",
    id: "professional",
    price: "R$ 249",
    originalPrice: "R$ 349",
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
    trialDays: 14,
  },
  {
    name: "Empresarial",
    id: "enterprise",
    price: "R$ 599",
    originalPrice: "R$ 799",
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
    trialDays: 14,
  },
];

export function PricingSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });
  const [showFreeTrial, setShowFreeTrial] = useState(false);
  const [animatingPrices, setAnimatingPrices] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");

      // Start the price animation after a delay
      const timer = setTimeout(() => {
        setAnimatingPrices(true);

        // Show free trial message after price animation
        const trialTimer = setTimeout(() => {
          setShowFreeTrial(true);
        }, 2000);

        return () => clearTimeout(trialTimer);
      }, 1500);

      return () => clearTimeout(timer);
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

          <AnimatePresence>
            {showFreeTrial && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mt-6 bg-primary/10 border border-primary/20 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <div className="flex items-center gap-2 text-primary">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">
                    14 dias de teste grátis em todos os planos
                  </span>
                </div>
                <Button size="sm" className="whitespace-nowrap group">
                  Comece hoje
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
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
              whileHover={tier.popular ? { scale: 1.03 } : { scale: 1.02 }}
              className={`flex flex-col justify-between rounded-3xl bg-card p-8 ring-1 ring-border ${tier.popular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8"} ${index === 0 ? "lg:rounded-r-none" : ""} ${index === 2 ? "lg:rounded-l-none" : ""} ${tier.popular ? "relative lg:-mt-4 lg:mb-4" : ""}`}
            >
              {tier.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                  className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-primary px-3 py-1 text-center text-xs font-medium text-primary-foreground"
                >
                  Mais popular
                </motion.div>
              )}
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-xl font-semibold leading-8 text-foreground">
                    {tier.name}
                  </h3>
                </div>
                <div className="mt-6 flex flex-col">
                  <div className="flex items-baseline gap-x-1 relative h-12">
                    {animatingPrices && (
                      <>
                        <motion.span
                          initial={{ opacity: 1 }}
                          animate={[
                            {
                              opacity: 0,
                              y: -20,
                              transition: { duration: 0.5, delay: 0.2 * index },
                            },
                            { opacity: 0, y: 20, transition: { duration: 0 } },
                            { opacity: 1, y: 0, transition: { duration: 0.5 } },
                          ]}
                          className="text-4xl font-bold tracking-tight text-foreground absolute"
                        >
                          {tier.originalPrice}
                        </motion.span>
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.7 + 0.2 * index,
                            duration: 0.5,
                          }}
                          className="text-4xl font-bold tracking-tight text-foreground absolute"
                        >
                          {tier.price}
                        </motion.span>
                      </>
                    )}
                    {!animatingPrices && (
                      <span className="text-4xl font-bold tracking-tight text-foreground">
                        {tier.price}
                      </span>
                    )}
                    <span className="text-sm font-semibold leading-6 text-muted-foreground ml-24">
                      /mês
                    </span>
                  </div>
                  {showFreeTrial && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="mt-2 text-sm text-primary flex items-center gap-1"
                    >
                      <Clock className="h-4 w-4" />
                      <span>{tier.trialDays} dias grátis</span>
                    </motion.div>
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {tier.description}
                </p>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                  {tier.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      className="flex gap-x-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.5 + 0.05 * featureIndex + 0.1 * index,
                      }}
                    >
                      <Check
                        className="h-5 w-5 flex-none text-primary"
                        aria-hidden="true"
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className={`mt-8 w-full ${tier.popular ? "bg-primary hover:bg-primary/90" : "bg-primary/80 hover:bg-primary"}`}
                  size="lg"
                >
                  Começar teste grátis
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
