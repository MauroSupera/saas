import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log({ email });
    setIsSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-muted/30 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link
            to="/"
            className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
          >
            ChatSaaS
          </Link>
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-foreground"
        >
          Recuperar senha
        </motion.h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-card px-6 py-12 shadow sm:rounded-lg sm:px-12 border border-border"
        >
          {!isSubmitted ? (
            <>
              <p className="text-center text-sm text-muted-foreground mb-6">
                Digite seu email e enviaremos um link para redefinir sua senha.
              </p>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-foreground"
                  >
                    Email
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Enviar link de recuperação
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <svg
                  className="mx-auto h-12 w-12 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-foreground">
                  Email enviado com sucesso!
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Verifique sua caixa de entrada para o link de recuperação de
                  senha.
                </p>
              </motion.div>
            </div>
          )}

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Lembrou sua senha?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-primary hover:text-primary/80"
            >
              Voltar para o login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
