import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReservationSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/reservations", async (req, res) => {
    try {
      // Validate the reservation data with Zod schema
      const validatedData = insertReservationSchema.parse(req.body);
      
      // Store reservation data in memory storage
      const newReservation = await storage.createReservation(validatedData);
      
      // Return success response
      res.status(201).json({
        message: "Reservation submitted successfully",
        reservation: newReservation
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Invalid reservation data",
          errors: error.errors
        });
      }
      
      // Handle other errors
      console.error("Error creating reservation:", error);
      res.status(500).json({ message: "Failed to create reservation" });
    }
  });
  
  // Get all reservations
  app.get("/api/reservations", async (req, res) => {
    try {
      const reservations = await storage.getAllReservations();
      res.json(reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ message: "Failed to fetch reservations" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
