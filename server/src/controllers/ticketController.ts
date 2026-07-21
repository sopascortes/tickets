import { Request, Response } from 'express';
import { db } from '../config/db.js';

export const getTickets = async (_req: Request, res: Response) => {
  try {
    const tickets = await db.all('SELECT * FROM tickets ORDER BY id DESC');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Database access failure reading tickets' });
  }
};

export const getTicketById = async (req: Request, res: Response) => {
  try {
    const ticket = await db.get('SELECT * FROM tickets WHERE id = ?', req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket ID not found' });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Database record error' });
  }
};

export const createTicket = async (req: Request, res: Response) => {
  const { title, description, customerName, customerEmail, priority } = req.body;
  try {
    const result = await db.run(
      `INSERT INTO tickets (title, description, customerName, customerEmail, status, priority) 
       VALUES (?, ?, ?, ?, 'open', ?)`,
      [title, description, customerName, customerEmail, priority || 'medium']
    );
    const newTicket = await db.get('SELECT * FROM tickets WHERE id = ?', result.lastID);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Database ticket save failed' });
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  const { status, priority } = req.body;
  try {
    const ticket = await db.get('SELECT * FROM tickets WHERE id = ?', req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket update missing data' });

    if (status && !['open', 'in_progress', 'resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    await db.run(
      `UPDATE tickets SET status = COALESCE(?, status), priority = COALESCE(?, priority) WHERE id = ?`,
      [status, priority, req.params.id]
    );

    const updated = await db.get('SELECT * FROM tickets WHERE id = ?', req.params.id);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Database update failed' });
  }
};
