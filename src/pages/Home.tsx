import { useState } from "react";
import * as React from "react";
import Calendar from "@/components/Calendar";
import EditReservationModal from "@/components/EditReservationModal";
import CreateReservationModal from "@/components/CreateReservationModal";
import Navigation from "@/components/Navigation";

interface Reservation {
  id: string;
  client: string;
  date: string;
  value: number;
  phone: string;
}

const Home = () => {
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Inicializar dados mockados
  React.useEffect(() => {
    const mockReservations: Reservation[] = [
      {
        id: "1",
        client: "Jonathan Lee",
        date: "2024-12-11",
        value: 200,
        phone: "(11) 99999-9999"
      },
      {
        id: "2",
        client: "Maria Silva",
        date: "2024-12-15",
        value: 350,
        phone: "(11) 88888-8888"
      },
      {
        id: "3",
        client: "João Santos",
        date: "2024-12-20",
        value: 150,
        phone: "(11) 77777-7777"
      },
      {
        id: "4",
        client: "Ana Costa",
        date: "2024-12-25",
        value: 280,
        phone: "(11) 66666-6666"
      }
    ];
    setReservations(mockReservations);
  }, []);

  const handleReservationClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setCreateModalOpen(true);
  };

  const handleCreateReservation = (newReservation: { client: string; date: string; value: number; phone: string }) => {
    const reservation: Reservation = {
      id: Date.now().toString(),
      ...newReservation
    };
    setReservations(prev => [...prev, reservation]);
  };

  const handleSaveReservation = (updatedReservation: Reservation) => {
    setReservations(prev => 
      prev.map(r => r.id === updatedReservation.id ? updatedReservation : r)
    );
  };

  const handleDeleteReservation = (reservationId: string) => {
    setReservations(prev => prev.filter(r => r.id !== reservationId));
  };

  const closeModal = () => {
    setSelectedReservation(null);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="glass-card mx-4 mt-4 p-6 text-center">
        <div className="flex items-center justify-between mb-2">
          <div></div>
          <h1 className="text-2xl font-bold">InnoBnB</h1>
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">A</span>
          </div>
        </div>
        <p className="text-muted-foreground">Gerenciamento de Reservas</p>
      </div>

      {/* Calendar */}
      <Calendar 
        reservations={reservations}
        onReservationClick={handleReservationClick}
        onDateClick={handleDateClick}
      />

      {/* Example reservation card similar to the mockup */}
      {reservations.length > 0 && (
        <div className="mx-4 mb-6">
          <div 
            className="glass-card p-4 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => handleReservationClick(reservations[0])}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-medium">
                    {reservations[0].client.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">{reservations[0].client}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(reservations[0].date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long'
                    })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-success">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(reservations[0].value)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Navigation />
      
      <EditReservationModal 
        reservation={selectedReservation}
        onClose={closeModal}
        onSave={handleSaveReservation}
        onDelete={handleDeleteReservation}
      />
      
      <CreateReservationModal
        isOpen={createModalOpen}
        selectedDate={selectedDate}
        onClose={closeCreateModal}
        onSave={handleCreateReservation}
      />
    </div>
  );
};

export default Home;