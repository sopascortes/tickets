import React from 'react';
import TicketCard from './TicketCard.jsx';

const COLUMNS = [
  { id: 'open', title: 'Open', countColor: 'bg-slate-200 text-slate-700' },
  { id: 'in_progress', title: 'In progress', countColor: 'bg-amber-100 text-amber-800' },
  { id: 'resolved', title: 'Resolved', countColor: 'bg-emerald-100 text-emerald-800' }
];

export default function KanbanBoard({ tickets, onSelectTicket, onStatusChange }) {
  
  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetStatus) => {
    e.preventDefault();
    const ticketIdStr = e.dataTransfer.getData('text/plain');
    if (ticketIdStr) {
      onStatusChange(parseInt(ticketIdStr, 10), targetStatus);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {COLUMNS.map(col => {
        const filtered = tickets.filter(t => t.status === col.id);
        return (
          <div 
            key={col.id} 
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, col.id)}
            className="bg-slate-100/60 rounded-2xl border border-slate-200 p-4 flex flex-col min-h-[550px]"
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200/60">
              <h3 className="font-black text-xs text-slate-500 uppercase tracking-wider">{col.title}</h3>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-black ${col.countColor}`}>{filtered.length}</span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="h-24 border border-dashed border-slate-300 rounded-xl flex items-center justify-center text-xs text-slate-400 font-medium">
                  No tickets with this status
                </div>
              ) : (
                filtered.map(ticket => (
                  <TicketCard 
                    key={ticket.id} 
                    ticket={ticket} 
                    onSelect={onSelectTicket} 
                    onStatusChange={onStatusChange} 
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
