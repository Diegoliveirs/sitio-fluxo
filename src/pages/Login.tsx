import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular autenticação (usuário: teste, senha: teste)
    setTimeout(() => {
      if (username === "teste" && password === "teste") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify({ 
          username: "teste", 
          name: "Administrador" 
        }));
        
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao InnoBnB",
        });
        
        navigate("/");
      } else {
        toast({
          title: "Erro no login",
          description: "Usuário ou senha incorretos",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            InnoBnB
          </h1>
          <p className="text-muted-foreground">Gerenciamento de Reservas</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="glass-card p-6 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-white/50 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>

          <div className="text-center text-sm text-muted-foreground">
            <p>Usuário teste: <span className="font-medium">teste</span></p>
            <p>Senha: <span className="font-medium">teste</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;