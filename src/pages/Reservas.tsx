import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Calendar, Phone, DollarSign, Filter } from "lucide-react";

interface Reservation {
  id: string;
  client: string;
  date: string;
  value: number;
  phone: string;
  status: "confirmed" | "pending" | "cancelled";
}

const Reservas = () => {
  const [filterPeriod, setFilterPeriod] = useState("all");

  // Dados mockados
  const mockReservations: Reservation[] = [
    {
      id: "1",
      client: "Jonathan Lee",
      date: "2024-04-11",
      value: 200,
      phone: "(11) 99999-9999",
      status: "confirmed"
    },
    {
      id: "2",
      client: "Maria Silva",
      date: "2024-04-15",
      value: 350,
      phone: "(11) 88888-8888",
      status: "confirmed"
    },
    {
      id: "3",
      client: "João Santos",
      date: "2024-04-20",
      value: 150,
      phone: "(11) 77777-7777",
      status: "pending"
    },
    {
      id: "4",
      client: "Ana Costa",
      date: "2024-04-25",
      value: 280,
      phone: "(11) 66666-6666",
      status: "confirmed"
    },
    {
      id: "5",
      client: "Carlos Oliveira",
      date: "2024-05-02",
      value: 180,
      phone: "(11) 55555-5555",
      status: "pending"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-yellow-500 text-white";
      case "cancelled":
        return "bg-danger text-danger-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada";
      case "pending":
        return "Pendente";
      case "cancelled":
        return "Cancelada";
      default:
        return "Desconhecido";
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="glass-card mx-4 mt-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Reservas</h1>
          <Filter size={24} className="text-primary" />
        </div>

        {/* Filter */}
        <div className="flex space-x-2">
          <button
            onClick={() => setFilterPeriod("all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filterPeriod === "all" 
                ? "bg-primary text-primary-foreground" 
                : "bg-white/50 text-foreground hover:bg-white/70"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilterPeriod("month")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filterPeriod === "month" 
                ? "bg-primary text-primary-foreground" 
                : "bg-white/50 text-foreground hover:bg-white/70"
            }`}
          >
            Este Mês
          </button>
          <button
            onClick={() => setFilterPeriod("week")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filterPeriod === "week" 
                ? "bg-primary text-primary-foreground" 
                : "bg-white/50 text-foreground hover:bg-white/70"
            }`}
          >
            Esta Semana
          </button>
        </div>
      </div>

      {/* Reservations List */}
      <div className="mx-4 mt-4 space-y-3">
        {mockReservations.map((reservation) => (
          <div key={reservation.id} className="glass-card p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">{reservation.client}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                  {getStatusText(reservation.status)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-success">
                  {formatCurrency(reservation.value)}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Calendar size={16} />
                <span className="text-sm">{formatDate(reservation.date)}</span>
              </div>

              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone size={16} />
                <span className="text-sm">{reservation.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Navigation />
    </div>
  );
};

export default Reservas;