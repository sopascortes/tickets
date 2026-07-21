import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard.jsx';
import TicketForm from './components/TicketForm.jsx';
import TicketDetailsModal from './components/TicketDetailsModal.jsx';

const API_URL = '/api/tickets';

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [networkError, setNetworkError] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Network validation response error');
        return res.json();
      })
      .then(data => {
        setTickets(data);
        setNetworkError(false);
      })  
      .catch(err => {
        console.error("Communication operational breakdown:", err);
        setNetworkError(true);
      });
  }, []);


  const handleTicketCreated = (newTicket) => {
    setTickets(prev => [newTicket, ...prev]);
    triggerNotification('New ticket saved');
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const updated = await res.json();
        setTickets(prev => prev.map(t => t.id === id ? updated : t));
        if (selectedTicket && selectedTicket.id === id) {
          setSelectedTicket(updated);
        }
        triggerNotification(`Ticket status updated to ${newStatus.replace('_', ' ')}`);
      }
    } catch (err) {
      console.error("State synch execution failure for status:", err);
    }
  };

  const handlePriorityChange = async (id, newPriority) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority: newPriority })
      });
      if (res.ok) {
        const updated = await res.json();
        setTickets(prev => prev.map(t => t.id === id ? updated : t));
        if (selectedTicket && selectedTicket.id === id) {
          setSelectedTicket(updated);
        }
        triggerNotification(`Ticket priority raised/lowered to ${newPriority}`);
      }
    } catch (err) {
      console.error("State sync execution failure for priority:", err);
    }
  };

  const triggerNotification = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(''), 3500);
  };

  const visibleTickets = tickets.filter(t => {
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesPriority && matchesStatus;
  });


  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-md">STP</div>
            <div>
              <h1 className="text-sm font-black tracking-wider text-slate-900 uppercase">Support Ticket Portal</h1>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Dashboard</p>
            </div>
          </div>
          {feedback && (
            <div className="px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[25px] font-bold rounded-full transition-all">
              {feedback}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
         {networkError && (
          <div className="lg:col-span-4 p-4 bg-rose-50 border border-rose-200 text-rose-800 font-bold text-xs rounded-xl">
            ⚠️ Network Socket Failure: Unable to fetch data, refresh page to try again...
          </div>
        )}

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Filters</label>
            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Priority</label>
            <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none font-bold text-slate-600">
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Status</label>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none font-bold text-slate-600">
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="in_progress">In progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          
          <TicketForm onTicketCreated={handleTicketCreated} />
        </div>

        <div className="lg:col-span-3">
          <KanbanBoard 
            tickets={visibleTickets} 
            onSelectTicket={setSelectedTicket} 
            onStatusChange={handleStatusChange} 
          />
        </div>
      </main>

      <TicketDetailsModal 
        ticket={selectedTicket} 
        onClose={() => setSelectedTicket(null)} 
        onStatusChange={handleStatusChange} 
        onPriorityChange={handlePriorityChange}
      />
    </div>
  );
}
