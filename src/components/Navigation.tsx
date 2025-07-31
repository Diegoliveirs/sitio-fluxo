import { Home, Calendar, DollarSign, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Calendar, label: "Reservas", path: "/reservas" },
    { icon: DollarSign, label: "Financeiro", path: "/financeiro" },
    { icon: User, label: "Perfil", path: "/perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-card border-t bg-white/80 backdrop-blur-xl z-50">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`nav-item min-w-0 flex-1 ${
              location.pathname === path ? "active" : ""
            }`}
          >
            <Icon size={24} className="mb-1" />
            <span className="text-xs font-medium truncate">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;