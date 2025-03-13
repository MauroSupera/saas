import { useState } from "react";
import { ChatWidget } from "./chat-widget";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function WidgetDemo() {
  const [companyName, setCompanyName] = useState("ChatSaaS");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Olá! Como podemos ajudar você hoje?",
  );
  const [position, setPosition] = useState<"bottom-right" | "bottom-left">(
    "bottom-right",
  );
  const [jsCode, setJsCode] = useState("");

  const generateCode = () => {
    const code = `<script>
  (function(w, d, s, o, f, js, fjs) {
    w['ChatSaaS-Widget'] = o;
    w[o] = w[o] || function() {
      (w[o].q = w[o].q || []).push(arguments);
    };
    js = d.createElement(s);
    fjs = d.getElementsByTagName(s)[0];
    js.id = o;
    js.src = f;
    js.async = 1;
    fjs.parentNode.insertBefore(js, fjs);
  })(window, document, 'script', 'chatsaas', 'https://widget.chatsaas.com/widget.js');
  
  chatsaas('init', {
    companyName: '${companyName}',
    primaryColor: '${primaryColor}',
    welcomeMessage: '${welcomeMessage}',
    position: '${position}'
  });
</script>`;

    setJsCode(code);
  };

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Experimente Nosso Widget
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Personalize seu Widget</CardTitle>
            <CardDescription>
              Configure as opções abaixo para ver como o widget ficará no seu
              site.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="appearance">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="appearance">Aparência</TabsTrigger>
                <TabsTrigger value="content">Conteúdo</TabsTrigger>
              </TabsList>

              <TabsContent value="appearance" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nome da Empresa</Label>
                  <Input
                    id="company-name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primary-color">Cor Primária</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="primary-color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                    />
                    <div
                      className="w-10 h-10 rounded-md border border-border"
                      style={{ backgroundColor: primaryColor }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Posição</Label>
                  <Select
                    value={position}
                    onValueChange={(value) =>
                      setPosition(value as "bottom-right" | "bottom-left")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a posição" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottom-right">
                        Inferior Direito
                      </SelectItem>
                      <SelectItem value="bottom-left">
                        Inferior Esquerdo
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="welcome-message">
                    Mensagem de Boas-vindas
                  </Label>
                  <Textarea
                    id="welcome-message"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    rows={3}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button onClick={generateCode} className="w-full mt-6">
              Gerar Código de Integração
            </Button>

            {jsCode && (
              <div className="mt-4">
                <Label htmlFor="js-code">Código para Integração</Label>
                <div className="relative mt-2">
                  <Textarea
                    id="js-code"
                    value={jsCode}
                    readOnly
                    rows={10}
                    className="font-mono text-xs bg-muted"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      navigator.clipboard.writeText(jsCode);
                      alert("Código copiado para a área de transferência!");
                    }}
                  >
                    Copiar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="relative h-[600px] bg-muted/30 rounded-lg border border-border overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">Prévia do Site</p>
          </div>
          <ChatWidget
            companyName={companyName}
            primaryColor={primaryColor}
            welcomeMessage={welcomeMessage}
            position={position}
          />
        </div>
      </div>
    </div>
  );
}
