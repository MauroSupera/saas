import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div id="contact" className="py-24 sm:py-32 bg-background">
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
            Entre em Contato
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Tem alguma dúvida ou quer saber mais sobre nossa plataforma?
            Preencha o formulário abaixo e entraremos em contato com você.
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
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="first-name">Nome</Label>
                <div className="mt-2.5">
                  <Input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="last-name">Sobrenome</Label>
                <div className="mt-2.5">
                  <Input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <div className="mt-2.5">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="company">Empresa</Label>
                <div className="mt-2.5">
                  <Input
                    type="text"
                    name="company"
                    id="company"
                    autoComplete="organization"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="message">Mensagem</Label>
                <div className="mt-2.5">
                  <Textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                Enviar mensagem
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
