import React from 'react';

export default function TicketCard({ ticket, onSelect, onStatusChange }) {
  const priorityColors = {
    high: 'bg-rose-50 text-rose-700 border-rose-100',
    medium: 'bg-amber-50 text-amber-700 border-amber-100',
    low: 'bg-emerald-50 text-emerald-700 border-emerald-100'
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', ticket.id.toString());
  };

  return (
    <div 
      draggable
      onDragStart={handleDragStart}
      className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing space-y-3 border-l-4 border-l-indigo-500"
    >
      <div className="flex justify-between items-center">
        <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded border ${priorityColors[ticket.priority]}`}>
          {ticket.priority}
        </span>
        <select 
          value={ticket.status} 
          onChange={(e) => onStatusChange(ticket.id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="text-[11px] bg-slate-50 border border-slate-200 rounded px-1 py-0.5 font-bold text-slate-600 outline-none"
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <h4 className="font-bold text-slate-900 text-sm hover:text-indigo-600 transition line-clamp-1">
        {ticket.title}
      </h4>
      <p className="text-xs text-slate-400 line-clamp-2">{ticket.description}</p>
      
      <div className="border-t border-slate-100 pt-2 flex justify-between items-center text-[10px] text-slate-400 font-bold">
        <span>👤 {ticket.customerName}</span>
        <span>🗓️ {new Date(ticket.createdAt).toLocaleDateString()}</span>
      </div>
      <button onClick={() => onSelect(ticket)} type="button" className="w-full py-1 bg-indigo-900 text-white font-bold text-xs rounded-lg uppercase tracking-wider transition cursor-pointer">View</button>
    </div>
  );
}
