import { Router } from 'express';
import { getTickets, getTicketById, createTicket, updateTicket } from '../controllers/ticketController.js';
import { validateTicket } from '../middleware/validate.js';

const router = Router();

router.get('/tickets', getTickets);
router.get('/tickets/:id', getTicketById);
router.post('/tickets', validateTicket, createTicket);
router.patch('/tickets/:id', updateTicket);

export default router;
