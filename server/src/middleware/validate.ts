import { Request, Response, NextFunction } from 'express';

export function validateTicket(req: Request, res: Response, next: NextFunction) {
  const { title, description, customerName, customerEmail, priority } = req.body;
  const errors: Record<string, string> = {};

  if (!title || !title.trim()) errors.title = 'Title field cannot be empty';
  if (!description || !description.trim()) errors.description = 'Description field cannot be empty';
  if (!customerName || !customerName.trim()) errors.customerName = 'Customer name field cannot be empty';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!customerEmail || !emailRegex.test(customerEmail)) {
    errors.customerEmail = 'Provide a valid email address';
  }

  if (priority && !['low', 'medium', 'high'].includes(priority)) {
    errors.priority = 'Priority value must be low, medium, or high';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
}
