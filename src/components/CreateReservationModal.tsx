import { useState } from "react";
import { X, Calendar, User, Phone, DollarSign } from "lucide-react";

interface CreateReservationModalProps {
  isOpen: boolean;
  selectedDate: string | null;
  onClose: () => void;
  onSave: (reservation: { client: string; date: string; value: number; phone: string }) => void;
}

const CreateReservationModal = ({ isOpen, selectedDate, onClose, onSave }: CreateReservationModalProps) => {
  const [client, setClient] = useState("");
  const [phone, setPhone] = useState("");
  const [value, setValue] = useState("");

  if (!isOpen || !selectedDate) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleSave = () => {
    if (!client || !phone || !value) return;
    
    onSave({
      client,
      date: selectedDate,
      value: Number(value),
      phone
    });

    // Reset form
    setClient("");
    setPhone("");
    setValue("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Nova Reserva</h3>
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
            <span className="font-medium">{formatDate(selectedDate)}</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">Nome do Cliente</label>
              <div className="flex items-center space-x-3 p-3 border border-border rounded-xl">
                <User size={18} className="text-muted-foreground" />
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="Digite o nome do cliente"
                  className="flex-1 bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <div className="flex items-center space-x-3 p-3 border border-border rounded-xl">
                <Phone size={18} className="text-muted-foreground" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="flex-1 bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Valor (R$)</label>
              <div className="flex items-center space-x-3 p-3 border border-border rounded-xl">
                <DollarSign size={18} className="text-muted-foreground" />
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="0,00"
                  className="flex-1 bg-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-muted text-muted-foreground font-medium hover:bg-muted/80 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 btn-primary"
            disabled={!client || !phone || !value}
          >
            Salvar Reserva
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateReservationModal;