import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import { Camera, Edit3, LogOut, User, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Perfil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Administrador");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="glass-card mx-4 mt-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Perfil</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-xl hover:bg-white/50 transition-colors"
          >
            <Edit3 size={20} className="text-primary" />
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="mx-4 mt-4">
        <div className="glass-card p-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Perfil" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-white" />
                )}
              </div>
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-2 rounded-full shadow-lg hover:scale-105 transition-transform"
                >
                  <Camera size={16} />
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nome</label>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 px-4 py-3 bg-white/50 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              ) : (
                <p className="text-lg font-medium mt-1">{name}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Usuário</label>
              <p className="text-lg mt-1">teste</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Tipo de Conta</label>
              <p className="text-lg mt-1">Administrador</p>
            </div>
          </div>

          {isEditing && (
            <button
              onClick={handleSave}
              className="btn-primary w-full mt-6"
            >
              Salvar Alterações
            </button>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="mx-4 mt-4">
        <div className="glass-card p-4">
          <h3 className="font-semibold mb-4">Informações de Contato</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-muted-foreground">
              <Phone size={20} />
              <span>(11) 99999-9999</span>
            </div>
            <div className="flex items-center space-x-3 text-muted-foreground">
              <Mail size={20} />
              <span>admin@innobnb.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mx-4 mt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 p-4 bg-danger text-danger-foreground rounded-2xl font-medium transition-all hover:shadow-lg active:scale-95"
        >
          <LogOut size={20} />
          <span>Sair da Conta</span>
        </button>
      </div>

      <Navigation />
    </div>
  );
};

export default Perfil;