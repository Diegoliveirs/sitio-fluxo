import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Reservation {
  id: string;
  client: string;
  date: string;
  value: number;
  phone: string;
}

interface CalendarProps {
  reservations: Reservation[];
  onReservationClick: (reservation: Reservation) => void;
  onDateClick: (date: string) => void;
}

const Calendar = ({ reservations, onReservationClick, onDateClick }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const days = [];
  for (let i = 0; i < 42; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    days.push(day);
  }

  const getReservationForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return reservations.find(r => r.date === dateStr);
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  return (
    <div className="glass-card p-6 mx-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigateMonth('prev')}
          className="p-2 rounded-xl hover:bg-white/50 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        
        <h2 className="text-xl font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        
        <button 
          onClick={() => navigateMonth('next')}
          className="p-2 rounded-xl hover:bg-white/50 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const reservation = getReservationForDate(day);
          const isInCurrentMonth = isCurrentMonth(day);
          
          return (
            <div
              key={index}
              onClick={() => {
                if (!isInCurrentMonth) return;
                if (reservation) {
                  onReservationClick(reservation);
                } else {
                  // Clica em data disponível para criar reserva
                  const dateStr = day.toISOString().split('T')[0];
                  onDateClick(dateStr);
                }
              }}
              className={`calendar-day ${
                !isInCurrentMonth 
                  ? "empty opacity-30" 
                  : reservation 
                    ? "reserved" 
                    : "available"
              }`}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;