import React from 'react';

export default function TicketDetailsModal({ ticket, onClose, onStatusChange, onPriorityChange }) {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-lg p-6 shadow-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold transition">✕</button>
        
        <div className="space-y-4">
          <div className="flex gap-2 items-center">
            <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded bg-slate-100 text-slate-600 border border-slate-200">
              Ticket #{ticket.id}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              Created {new Date(ticket.createdAt).toLocaleString()}
            </span>
          </div>

	  <span className="block text-slate-400 font-black uppercase tracking-wider text-[9px]">Title</span>
          <h2 className="text-lg font-black tracking-tight text-slate-900">{ticket.title}</h2>

	  <span className="block text-slate-400 font-black uppercase tracking-wider text-[9px]">Description</span>
          <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap font-medium leading-relaxed">
            {ticket.description}
          </div>

          <div className="border-t border-slate-100 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="block text-slate-400 font-black uppercase tracking-wider text-[9px]">Client Info</span>
              <p className="font-bold text-slate-800">{ticket.customerName}</p>
              <p className="text-slate-500 font-medium">{ticket.customerEmail}</p>
            </div>
            <div className="space-y-1">
              <span className="block text-slate-400 font-black uppercase tracking-wider text-[9px]">Status</span>
              <div className="space-y-1.5 font-bold text-slate-700">
			<div className="flex items-center gap-1.5">
			  <span>Priority:</span>
			  <select 
			    value={ticket.priority} 
			    onChange={(e) => onPriorityChange(ticket.id, e.target.value)}
			    className="p-1 border border-slate-200 rounded text-xs bg-white outline-none"
			  >
			    <option value="low">Low</option>
			    <option value="medium">Medium</option>
			    <option value="high">High</option>
			  </select>
			</div>

			

                <div className="flex items-center gap-1.5">
                  <span>Status:</span>
                  <select 
                    value={ticket.status} 
                    onChange={(e) => onStatusChange(ticket.id, e.target.value)}
                    className="p-1 border border-slate-200 rounded text-xs bg-white outline-none"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
