import Navigation from "@/components/Navigation";
import { TrendingUp, Download, DollarSign, Calendar } from "lucide-react";

const Financeiro = () => {
  // Dados mockados
  const monthlyTotal = 1180;
  const paidReservations = [
    {
      id: "1",
      client: "Jonathan Lee",
      date: "2024-04-11",
      value: 200,
      status: "paid"
    },
    {
      id: "2",
      client: "Maria Silva",
      date: "2024-04-15",
      value: 350,
      status: "paid"
    },
    {
      id: "4",
      client: "Ana Costa",
      date: "2024-04-25",
      value: 280,
      status: "paid"
    },
    {
      id: "6",
      client: "Pedro Almeida",
      date: "2024-04-28",
      value: 350,
      status: "paid"
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleExportExcel = () => {
    // Simular download do Excel
    console.log("Exportando para Excel...");
    // Aqui seria implementada a integração com a API para exportar
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="glass-card mx-4 mt-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Financeiro</h1>
          <TrendingUp size={24} className="text-success" />
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="mx-4 mt-4">
        <div className="glass-card p-6 text-center">
          <div className="mb-2">
            <DollarSign size={32} className="text-success mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Total Arrecadado em Abril</p>
          </div>
          <p className="text-4xl font-bold text-success mb-2">
            {formatCurrency(monthlyTotal)}
          </p>
          <p className="text-sm text-muted-foreground">
            {paidReservations.length} reservas pagas
          </p>
        </div>
      </div>

      {/* Export Button */}
      <div className="mx-4 mt-4">
        <button
          onClick={handleExportExcel}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <Download size={20} />
          <span>Exportar para Excel</span>
        </button>
      </div>

      {/* Paid Reservations */}
      <div className="mx-4 mt-4">
        <h2 className="text-lg font-semibold mb-3 px-2">Reservas Pagas</h2>
        <div className="space-y-3">
          {paidReservations.map((reservation) => (
            <div key={reservation.id} className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{reservation.client}</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Pago</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar size={16} />
                  <span className="text-sm">{formatDate(reservation.date)}</span>
                </div>
                <p className="text-lg font-bold text-success">
                  {formatCurrency(reservation.value)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mx-4 mt-6 grid grid-cols-2 gap-3">
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-primary">
            {((paidReservations.length / 5) * 100).toFixed(0)}%
          </p>
          <p className="text-sm text-muted-foreground">Taxa de Pagamento</p>
        </div>
        
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-accent">
            {formatCurrency(monthlyTotal / paidReservations.length)}
          </p>
          <p className="text-sm text-muted-foreground">Ticket Médio</p>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Financeiro;