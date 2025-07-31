import { X } from "lucide-react";

interface Reservation {
  id: string;
  client: string;
  date: string;
  value: number;
  phone: string;
}

interface ReservationModalProps {
  reservation: Reservation | null;
  onClose: () => void;
}

const ReservationModal = ({ reservation, onClose }: ReservationModalProps) => {
  if (!reservation) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card w-full max-w-sm p-6 animate-in slide-in-from-bottom-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Detalhes da Reserva</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Cliente</label>
            <p className="text-lg font-medium">{reservation.client}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Data da Reserva</label>
            <p className="text-lg">{formatDate(reservation.date)}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Valor Total</label>
            <p className="text-2xl font-bold text-success">{formatCurrency(reservation.value)}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Telefone</label>
            <p className="text-lg">{reservation.phone}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-primary w-full mt-6"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ReservationModal;