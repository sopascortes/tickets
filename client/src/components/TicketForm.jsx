import React, { useState } from 'react';

const API_URL = '/api/tickets';

export default function TicketForm({ onTicketCreated }) {
  const [formData, setFormData] = useState({
    title: '', description: '', customerName: '', customerEmail: '', priority: 'medium'
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const localErrors = {};
    if (!formData.title.trim()) localErrors.title = 'Title parameter missing';
    if (!formData.description.trim()) localErrors.description = 'Description parameter missing';
    if (!formData.customerName.trim()) localErrors.customerName = 'Customer name missing';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.customerEmail)) localErrors.customerEmail = 'Email missing';
    
    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const newTicket = await res.json();
        onTicketCreated(newTicket);
        setFormData({ title: '', description: '', customerName: '', customerEmail: '', priority: 'medium' });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error("API persistence channel block:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Create support ticket</h3>
      
      {success && <div className="p-3 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-100">Ticket saved</div>}

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Title</label>
        <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full text-sm p-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"/>
        {errors.title && <p className="text-rose-500 text-[11px] font-medium mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Description</label>
        <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full text-sm p-2 border border-slate-200 rounded-lg h-20 resize-none outline-none focus:border-indigo-500"/>
        {errors.description && <p className="text-rose-500 text-[11px] font-medium mt-1">{errors.description}</p>}
      </div>

      <div>
         <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Client name</label>
         <input type="text" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} className="w-full text-sm p-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"/>
         {errors.customerName && <p className="text-rose-500 text-[11px] font-medium mt-1">{errors.customerName}</p>}
      </div>
      <div>
         <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Client email</label>
         <input type="email" value={formData.customerEmail} onChange={e => setFormData({...formData, customerEmail: e.target.value})} className="w-full text-sm p-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"/>
         {errors.customerEmail && <p className="text-rose-500 text-[11px] font-medium mt-1">{errors.customerEmail}</p>}
      </div>

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Priority</label>
        <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full text-sm p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg uppercase tracking-wider transition cursor-pointer">Save ticket</button>
    </form>
  );
}
