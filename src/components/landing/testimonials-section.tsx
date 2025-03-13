import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    content:
      "Desde que implementamos o ChatSaaS, nosso tempo de resposta diminuiu em 60% e a satisfação dos clientes aumentou significativamente.",
    author: "Maria Silva",
    role: "Diretora de Atendimento, TechCorp",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
  },
  {
    content:
      "A facilidade de personalização e a integração com nossos sistemas existentes tornaram a implementação extremamente simples.",
    author: "João Santos",
    role: "CTO, E-commerce Solutions",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=joao",
  },
  {
    content:
      "Os recursos de IA para tradução e sugestões de resposta revolucionaram nosso atendimento internacional. Recomendo fortemente.",
    author: "Ana Oliveira",
    role: "Gerente de Suporte Global, WorldTrade",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ana",
  },
  {
    content:
      "O dashboard de análise nos deu insights valiosos sobre o comportamento dos clientes, permitindo otimizar nossos processos.",
    author: "Carlos Mendes",
    role: "Analista de Dados, DataInsight",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos",
  },
  {
    content:
      "A arquitetura multi-tenant nos permitiu gerenciar várias marcas em uma única plataforma, simplificando nossa operação.",
    author: "Patrícia Lima",
    role: "COO, Grupo Empresarial Nexus",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=patricia",
  },
];

export function TestimonialsSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div id="testimonials" className="py-24 sm:py-32 bg-muted/30">
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
            O que nossos clientes dizem
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Descubra como empresas de diversos setores estão transformando seu
            atendimento ao cliente com nossa plataforma.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5, delay: 0.3 } },
          }}
          className="mx-auto mt-16"
        >
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full border border-border bg-card">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex-1">
                        <p className="text-muted-foreground italic">
                          "{testimonial.content}"
                        </p>
                      </div>
                      <div className="mt-6 flex items-center gap-x-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="h-12 w-12 rounded-full bg-muted"
                        />
                        <div>
                          <h3 className="text-base font-semibold text-foreground">
                            {testimonial.author}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="static" />
              <CarouselNext className="static" />
            </div>
          </Carousel>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.5 },
            },
          }}
          className="mt-16 flex justify-center gap-8 flex-wrap"
        >
          {[
            "TechCorp",
            "E-commerce Solutions",
            "WorldTrade",
            "DataInsight",
            "Grupo Nexus",
          ].map((company) => (
            <div key={company} className="flex items-center justify-center">
              <p className="text-lg font-semibold text-muted-foreground">
                {company}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
