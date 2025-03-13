import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Shield, Users, Zap, Globe } from "lucide-react";

const values = [
  {
    name: "Segurança em primeiro lugar",
    description:
      "Protegemos seus dados e os de seus clientes com os mais altos padrões de segurança e criptografia.",
    icon: Shield,
  },
  {
    name: "Foco no cliente",
    description:
      "Desenvolvemos nossas soluções pensando na experiência do usuário final e na satisfação do cliente.",
    icon: Users,
  },
  {
    name: "Inovação constante",
    description:
      "Estamos sempre evoluindo nossa plataforma com as mais recentes tecnologias e tendências do mercado.",
    icon: Zap,
  },
  {
    name: "Alcance global",
    description:
      "Nossa plataforma está preparada para atender empresas de qualquer tamanho e em qualquer lugar do mundo.",
    icon: Globe,
  },
];

export function AboutSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div id="about" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="mx-auto max-w-2xl lg:text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Sobre Nós
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Somos uma empresa dedicada a revolucionar a forma como as empresas
            se comunicam com seus clientes. Nossa missão é fornecer ferramentas
            de comunicação intuitivas e eficientes que elevam a experiência do
            cliente.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5, delay: 0.3 } },
          }}
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4 md:grid-cols-2">
            {values.map((value, index) => (
              <motion.div
                key={value.name}
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
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-foreground">
                  <value.icon
                    className="h-6 w-6 text-primary"
                    aria-hidden="true"
                  />
                  {value.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{value.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
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
          className="mt-16 lg:mt-24 relative overflow-hidden rounded-xl bg-card p-8 shadow-sm border border-border"
        >
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Nossa História
            </h3>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Fundada em 2020, a ChatSaaS nasceu da visão de transformar a
              comunicação entre empresas e clientes. Começamos como uma pequena
              startup com grandes ideias e, em poucos anos, nos tornamos uma
              referência no mercado de soluções de chat ao vivo. Nossa equipe é
              composta por especialistas apaixonados por tecnologia e
              experiência do cliente, trabalhando constantemente para
              desenvolver soluções inovadoras que atendam às necessidades em
              constante evolução do mercado.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
