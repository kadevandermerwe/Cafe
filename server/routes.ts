import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import { storage } from "./storage";
import { insertReservationSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

// Helper function for validating request body with custom error handling
const validateBody = <T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Extract formatted error messages
      const formattedErrors = error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }));
      
      // Create a custom error with the formatted errors
      const validationError = new Error('Validation failed');
      (validationError as any).status = 400;
      (validationError as any).errors = formattedErrors;
      
      throw validationError;
    }
    throw error;
  }
};

// Middleware for handling API errors consistently
const apiErrorHandler = (handler: (req: Request, res: Response) => Promise<any>) => {
  return async (req: Request, res: Response) => {
    try {
      await handler(req, res);
    } catch (error: any) {
      console.error(`API Error:`, error);
      
      // Check if it's a validation error we formatted
      if (error.errors && error.status === 400) {
        return res.status(400).json({
          success: false, 
          message: 'Validation failed',
          errors: error.errors
        });
      }
      
      // Default error response
      const statusCode = error.status || 500;
      const message = error.message || 'An unexpected error occurred';
      
      res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
      });
    }
  };
};

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Initialize WebSocket server for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  // Handle WebSocket connections
  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');
    
    // Send initial welcome message
    ws.send(JSON.stringify({ type: 'connected', message: 'Connected to reservation system' }));
    
    // Handle incoming messages
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('Received message:', data);
        
        // Could handle different message types here
      } catch (error) {
        console.error('Invalid WebSocket message format', error);
      }
    });
    
    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });

  // Broadcast updates to all connected clients
  const broadcastUpdate = (type: string, data: any) => {
    wss.clients.forEach((client) => {
      if (client.readyState === 1) { // WebSocket.OPEN
        client.send(JSON.stringify({ type, data }));
      }
    });
  };

  // ========================
  // User Endpoints
  // ========================
  
  // Register new user
  app.post('/api/users/register', apiErrorHandler(async (req, res) => {
    const userData = validateBody(insertUserSchema, req.body);
    
    // Check if user already exists
    const existingUserByUsername = await storage.getUserByUsername(userData.username);
    if (existingUserByUsername) {
      const error = new Error('Username already taken');
      (error as any).status = 409;
      throw error;
    }
    
    const existingUserByEmail = await storage.getUserByEmail(userData.email);
    if (existingUserByEmail) {
      const error = new Error('Email already registered');
      (error as any).status = 409;
      throw error;
    }
    
    // Create new user
    const newUser = await storage.createUser(userData);
    
    // Remove password from response
    const { password, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userWithoutPassword
    });
  }));
  
  // User login (simplified without JWT for demo)
  app.post('/api/users/login', apiErrorHandler(async (req, res) => {
    const loginSchema = z.object({
      username: z.string().min(1),
      password: z.string().min(1)
    });
    
    const credentials = validateBody(loginSchema, req.body);
    
    // Find user
    const user = await storage.getUserByUsername(credentials.username);
    if (!user || user.password !== credentials.password) {
      const error = new Error('Invalid username or password');
      (error as any).status = 401;
      throw error;
    }
    
    // Update last login time
    await storage.updateUser(user.id, { lastLogin: new Date() });
    
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword
    });
  }));

  // ========================
  // Reservation Endpoints
  // ========================
  
  // Create a new reservation
  app.post('/api/reservations', apiErrorHandler(async (req, res) => {
    const reservationData = validateBody(insertReservationSchema, req.body);
    
    // Additional validation logic
    const reservationDate = new Date(reservationData.date);
    const today = new Date();
    
    if (reservationDate < today) {
      const error = new Error('Reservation date cannot be in the past');
      (error as any).status = 400;
      throw error;
    }
    
    // Create reservation
    const newReservation = await storage.createReservation(reservationData);
    
    // Broadcast update to WebSocket clients
    broadcastUpdate('new_reservation', { 
      id: newReservation.id,
      date: newReservation.date,
      time: newReservation.time,
      guests: newReservation.guests
    });
    
    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      reservation: newReservation
    });
  }));
  
  // Get reservation by ID
  app.get('/api/reservations/:id', apiErrorHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      const error = new Error('Invalid reservation ID');
      (error as any).status = 400;
      throw error;
    }
    
    const reservation = await storage.getReservation(id);
    if (!reservation) {
      const error = new Error('Reservation not found');
      (error as any).status = 404;
      throw error;
    }
    
    res.status(200).json({
      success: true,
      reservation
    });
  }));
  
  // Get upcoming reservations
  app.get('/api/reservations/upcoming', apiErrorHandler(async (req, res) => {
    const upcomingReservations = await storage.getUpcomingReservations();
    
    res.status(200).json({
      success: true,
      count: upcomingReservations.length,
      reservations: upcomingReservations
    });
  }));
  
  // Update reservation status
  app.patch('/api/reservations/:id/status', apiErrorHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      const error = new Error('Invalid reservation ID');
      (error as any).status = 400;
      throw error;
    }
    
    const statusSchema = z.object({
      status: z.enum(['pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no_show']),
      reason: z.string().optional(),
      userId: z.number().optional()
    });
    
    const { status, reason, userId } = validateBody(statusSchema, req.body);
    
    const updatedReservation = await storage.updateReservationStatus(id, status, reason, userId);
    if (!updatedReservation) {
      const error = new Error('Reservation not found');
      (error as any).status = 404;
      throw error;
    }
    
    // Broadcast update to WebSocket clients
    broadcastUpdate('reservation_status_updated', { 
      id: updatedReservation.id,
      status: updatedReservation.status
    });
    
    res.status(200).json({
      success: true,
      message: `Reservation status updated to ${status}`,
      reservation: updatedReservation
    });
  }));
  
  // Search reservations
  app.get('/api/reservations/search', apiErrorHandler(async (req, res) => {
    const query = req.query.q as string;
    if (!query || query.length < 2) {
      const error = new Error('Search query must be at least 2 characters');
      (error as any).status = 400;
      throw error;
    }
    
    const results = await storage.searchReservations(query);
    
    res.status(200).json({
      success: true,
      count: results.length,
      reservations: results
    });
  }));
  
  // Check reservation by confirmation code
  app.get('/api/reservations/confirm/:code', apiErrorHandler(async (req, res) => {
    const code = req.params.code;
    
    const reservation = await storage.getReservationByConfirmationCode(code);
    if (!reservation) {
      const error = new Error('No reservation found with this confirmation code');
      (error as any).status = 404;
      throw error;
    }
    
    res.status(200).json({
      success: true,
      reservation
    });
  }));

  // ========================
  // Table Management Endpoints
  // ========================
  
  // Get all dining areas
  app.get('/api/dining-areas', apiErrorHandler(async (req, res) => {
    const diningAreas = await storage.getAllDiningAreas();
    
    res.status(200).json({
      success: true,
      count: diningAreas.length,
      diningAreas
    });
  }));
  
  // Get tables by dining area
  app.get('/api/dining-areas/:id/tables', apiErrorHandler(async (req, res) => {
    const diningAreaId = parseInt(req.params.id);
    if (isNaN(diningAreaId)) {
      const error = new Error('Invalid dining area ID');
      (error as any).status = 400;
      throw error;
    }
    
    // Check if dining area exists
    const diningArea = await storage.getDiningArea(diningAreaId);
    if (!diningArea) {
      const error = new Error('Dining area not found');
      (error as any).status = 404;
      throw error;
    }
    
    const tables = await storage.getTablesByDiningArea(diningAreaId);
    
    res.status(200).json({
      success: true,
      count: tables.length,
      diningArea,
      tables
    });
  }));
  
  // Get available tables for a specific date, time and party size
  app.get('/api/tables/available', apiErrorHandler(async (req, res) => {
    const dateParam = req.query.date as string;
    const timeParam = req.query.time as string;
    const partySizeParam = req.query.partySize as string;
    
    // Validate parameters
    if (!dateParam || !timeParam || !partySizeParam) {
      const error = new Error('Missing required parameters: date, time, and partySize');
      (error as any).status = 400;
      throw error;
    }
    
    const date = new Date(dateParam);
    if (isNaN(date.getTime())) {
      const error = new Error('Invalid date format');
      (error as any).status = 400;
      throw error;
    }
    
    const partySize = parseInt(partySizeParam);
    if (isNaN(partySize) || partySize < 1) {
      const error = new Error('Party size must be a positive number');
      (error as any).status = 400;
      throw error;
    }
    
    const availableTables = await storage.getAvailableTables(date, timeParam, partySize);
    
    res.status(200).json({
      success: true,
      count: availableTables.length,
      tables: availableTables
    });
  }));

  // ========================
  // Time Slot Endpoints
  // ========================
  
  // Get available time slots for a specific date
  app.get('/api/time-slots', apiErrorHandler(async (req, res) => {
    const dateParam = req.query.date as string;
    const partySizeParam = req.query.partySize as string || '2';
    
    if (!dateParam) {
      const error = new Error('Date parameter is required');
      (error as any).status = 400;
      throw error;
    }
    
    const date = new Date(dateParam);
    if (isNaN(date.getTime())) {
      const error = new Error('Invalid date format');
      (error as any).status = 400;
      throw error;
    }
    
    const partySize = parseInt(partySizeParam);
    if (isNaN(partySize) || partySize < 1) {
      const error = new Error('Party size must be a positive number');
      (error as any).status = 400;
      throw error;
    }
    
    const timeSlots = await storage.getAvailableTimeSlots(date, partySize);
    
    res.status(200).json({
      success: true,
      count: timeSlots.length,
      date: dateParam,
      timeSlots
    });
  }));

  // ========================
  // Special Events Endpoints
  // ========================
  
  // Get active special events
  app.get('/api/special-events', apiErrorHandler(async (req, res) => {
    const events = await storage.getAllActiveSpecialEvents();
    
    res.status(200).json({
      success: true,
      count: events.length,
      events
    });
  }));
  
  // Get special event by ID
  app.get('/api/special-events/:id', apiErrorHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      const error = new Error('Invalid event ID');
      (error as any).status = 400;
      throw error;
    }
    
    const event = await storage.getSpecialEvent(id);
    if (!event) {
      const error = new Error('Special event not found');
      (error as any).status = 404;
      throw error;
    }
    
    res.status(200).json({
      success: true,
      event
    });
  }));

  // ========================
  // Waitlist Endpoints
  // ========================
  
  // Add to waitlist
  app.post('/api/waitlist', apiErrorHandler(async (req, res) => {
    const waitlistSchema = z.object({
      name: z.string().min(1),
      phone: z.string().min(6),
      email: z.string().email().optional(),
      partySize: z.number().int().positive(),
      notes: z.string().optional()
    });
    
    const waitlistData = validateBody(waitlistSchema, req.body);
    
    const newEntry = await storage.addToWaitlist(waitlistData);
    
    // Broadcast update to WebSocket clients
    broadcastUpdate('new_waitlist', { 
      id: newEntry.id,
      name: newEntry.name,
      partySize: newEntry.partySize
    });
    
    res.status(201).json({
      success: true,
      message: 'Added to waitlist',
      waitlistEntry: newEntry
    });
  }));
  
  // Update waitlist status
  app.patch('/api/waitlist/:id/status', apiErrorHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      const error = new Error('Invalid waitlist entry ID');
      (error as any).status = 400;
      throw error;
    }
    
    const statusSchema = z.object({
      status: z.enum(['waiting', 'notified', 'seated', 'left', 'cancelled'])
    });
    
    const { status } = validateBody(statusSchema, req.body);
    
    const updatedEntry = await storage.updateWaitlistStatus(id, status);
    if (!updatedEntry) {
      const error = new Error('Waitlist entry not found');
      (error as any).status = 404;
      throw error;
    }
    
    // Broadcast update to WebSocket clients
    broadcastUpdate('waitlist_status_updated', { 
      id: updatedEntry.id,
      status: updatedEntry.status
    });
    
    res.status(200).json({
      success: true,
      message: `Waitlist status updated to ${status}`,
      waitlistEntry: updatedEntry
    });
  }));
  
  // Get current waitlist
  app.get('/api/waitlist', apiErrorHandler(async (req, res) => {
    const waitlist = await storage.getCurrentWaitlist();
    
    res.status(200).json({
      success: true,
      count: waitlist.length,
      waitlist
    });
  }));

  // ========================
  // Menu Endpoints
  // ========================
  
  // Get all menu categories
  app.get('/api/menu/categories', apiErrorHandler(async (req, res) => {
    const categories = await storage.getAllMenuCategories();
    
    res.status(200).json({
      success: true,
      count: categories.length,
      categories
    });
  }));
  
  // Get menu items by category
  app.get('/api/menu/categories/:id/items', apiErrorHandler(async (req, res) => {
    const categoryId = parseInt(req.params.id);
    if (isNaN(categoryId)) {
      const error = new Error('Invalid category ID');
      (error as any).status = 400;
      throw error;
    }
    
    const items = await storage.getMenuItemsByCategory(categoryId);
    
    res.status(200).json({
      success: true,
      count: items.length,
      items
    });
  }));
  
  // Get featured menu items
  app.get('/api/menu/featured', apiErrorHandler(async (req, res) => {
    const featuredItems = await storage.getFeaturedMenuItems();
    
    res.status(200).json({
      success: true,
      count: featuredItems.length,
      items: featuredItems
    });
  }));

  // ========================
  // Restaurant Settings Endpoints
  // ========================
  
  // Get operating hours
  app.get('/api/settings/hours', apiErrorHandler(async (req, res) => {
    const hours = await storage.getOperatingHours();
    
    res.status(200).json({
      success: true,
      hours
    });
  }));
  
  // Get restaurant settings by category
  app.get('/api/settings/:category', apiErrorHandler(async (req, res) => {
    const category = req.params.category;
    
    const settings = await storage.getRestaurantSettings(category);
    
    res.status(200).json({
      success: true,
      count: settings.length,
      settings
    });
  }));

  return httpServer;
}
