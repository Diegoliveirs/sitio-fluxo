import { useState, useEffect } from "react";
import { X, Calendar, User, Phone, DollarSign, Trash2 } from "lucide-react";

interface Reservation {
  id: string;
  client: string;
  date: string;
  value: number;
  phone: string;
}

interface EditReservationModalProps {
  reservation: Reservation | null;
  onClose: () => void;
  onSave: (reservation: Reservation) => void;
  onDelete?: (reservationId: string) => void;
}

const EditReservationModal = ({ reservation, onClose, onSave, onDelete }: EditReservationModalProps) => {
  const [client, setClient] = useState("");
  const [phone, setPhone] = useState("");
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (reservation) {
      setClient(reservation.client);
      setPhone(reservation.phone);
      setValue(reservation.value.toString());
    }
  }, [reservation]);

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

  const handleSave = () => {
    if (!client || !phone || !value) return;
    
    onSave({
      ...reservation,
      client,
      phone,
      value: Number(value)
    });

    setIsEditing(false);
    onClose();
  };

  const handleDelete = () => {
    if (onDelete && reservation.id) {
      onDelete(reservation.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">
            {isEditing ? "Editar Reserva" : "Detalhes da Reserva"}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-xl">
            <Calendar size={20} className="text-primary" />
            <span className="font-medium">{formatDate(reservation.date)}</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">Nome do Cliente</label>
              <div className="flex items-center space-x-3 p-3 border border-border rounded-xl">
                <User size={18} className="text-muted-foreground" />
                {isEditing ? (
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className="flex-1 bg-transparent outline-none"
                  />
                ) : (
                  <span className="flex-1">{client}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <div className="flex items-center space-x-3 p-3 border border-border rounded-xl">
                <Phone size={18} className="text-muted-foreground" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-transparent outline-none"
                  />
                ) : (
                  <span className="flex-1">{phone}</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Valor</label>
              <div className="flex items-center space-x-3 p-3 border border-border rounded-xl">
                <DollarSign size={18} className="text-muted-foreground" />
                {isEditing ? (
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="flex-1 bg-transparent outline-none"
                  />
                ) : (
                  <span className="flex-1 font-medium text-success">
                    {formatCurrency(reservation.value)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          {isEditing ? (
            <>
              <button 
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 rounded-xl bg-muted text-muted-foreground font-medium hover:bg-muted/80 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                className="flex-1 btn-primary"
                disabled={!client || !phone || !value}
              >
                Salvar
              </button>
            </>
          ) : (
            <>
              {onDelete && (
                <button 
                  onClick={handleDelete}
                  className="p-3 rounded-xl bg-danger text-danger-foreground hover:bg-danger/90 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              )}
              <button 
                onClick={() => setIsEditing(true)}
                className="flex-1 btn-primary"
              >
                Editar Reserva
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditReservationModal;