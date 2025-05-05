import { 
  users, 
  reservations, 
  diningAreas, 
  restaurantTables, 
  timeSlots, 
  specialEvents,
  waitlist,
  reservationHistory,
  menuItems,
  menuCategories,
  payments,
  operatingHours,
  restaurantSettings,
  relations,
  type User, 
  type InsertUser, 
  type Reservation, 
  type InsertReservation,
  type DiningArea,
  type RestaurantTable,
  type TimeSlot,
  type SpecialEvent,
  type Waitlist,
  type MenuItem,
  type MenuCategory,
  type Payment,
  reservationStatusEnum
} from "@shared/schema";
import { db } from "./db";
import { and, eq, gte, lte, sql, desc, asc, isNull, not, inArray, like } from "drizzle-orm";
import { randomUUID } from "crypto";

// Advanced storage interface to handle all aspects of reservation system
export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<Omit<User, 'id'>>): Promise<User | undefined>;
  
  // Reservation management
  getReservation(id: number): Promise<Reservation | undefined>;
  getReservationByConfirmationCode(code: string): Promise<Reservation | undefined>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  updateReservationStatus(id: number, status: string, reason?: string, changedByUserId?: number): Promise<Reservation | undefined>;
  getReservationsByDate(date: Date): Promise<Reservation[]>;
  getReservationsByUser(userId: number): Promise<Reservation[]>;
  getUpcomingReservations(): Promise<Reservation[]>;
  searchReservations(query: string): Promise<Reservation[]>;
  
  // Table management
  getAllDiningAreas(): Promise<DiningArea[]>;
  getDiningArea(id: number): Promise<DiningArea | undefined>;
  getTablesByDiningArea(diningAreaId: number): Promise<RestaurantTable[]>;
  getAvailableTables(date: Date, time: string, partySize: number): Promise<RestaurantTable[]>;
  
  // Time slots
  getAvailableTimeSlots(date: Date, partySize: number): Promise<TimeSlot[]>;
  
  // Special events
  getAllActiveSpecialEvents(): Promise<SpecialEvent[]>;
  getSpecialEvent(id: number): Promise<SpecialEvent | undefined>;
  
  // Waitlist management
  addToWaitlist(waitlistEntry: Omit<Waitlist, 'id' | 'checkInTime' | 'createdAt' | 'updatedAt'>): Promise<Waitlist>;
  updateWaitlistStatus(id: number, status: string): Promise<Waitlist | undefined>;
  getCurrentWaitlist(): Promise<Waitlist[]>;
  
  // Menu management
  getAllMenuCategories(): Promise<MenuCategory[]>;
  getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]>;
  getFeaturedMenuItems(): Promise<MenuItem[]>;
  
  // Restaurant settings
  getOperatingHours(): Promise<any[]>;
  getRestaurantSettings(category: string): Promise<any[]>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User management
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values({
      ...insertUser
    } as any).returning();
    return user;
  }
  
  async updateUser(id: number, userData: Partial<Omit<User, 'id'>>): Promise<User | undefined> {
    const [updatedUser] = await db.update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  // Reservation management
  async getReservation(id: number): Promise<Reservation | undefined> {
    const [reservation] = await db.select().from(reservations).where(eq(reservations.id, id));
    return reservation;
  }
  
  async getReservationByConfirmationCode(code: string): Promise<Reservation | undefined> {
    const [reservation] = await db.select().from(reservations).where(eq(reservations.confirmationCode, code));
    return reservation;
  }
  
  async createReservation(reservationData: InsertReservation): Promise<Reservation> {
    // Generate a unique confirmation code
    const confirmationCode = randomUUID().substring(0, 8).toUpperCase();
    
    const [reservation] = await db.insert(reservations)
      .values({
        ...reservationData,
        confirmationCode
      } as any)
      .returning();
    
    // Log the reservation creation in history
    await db.insert(reservationHistory).values({
      reservationId: reservation.id,
      previousStatus: 'pending' as any,
      newStatus: 'pending' as any,
      reason: 'Initial reservation creation',
    });
    
    return reservation;
  }
  
  async updateReservationStatus(
    id: number, 
    status: string, 
    reason?: string, 
    changedByUserId?: number
  ): Promise<Reservation | undefined> {
    // Get current reservation to track status change
    const [currentReservation] = await db.select().from(reservations).where(eq(reservations.id, id));
    
    if (!currentReservation) return undefined;
    
    // Update the reservation status
    const [updatedReservation] = await db.update(reservations)
      .set({ 
        status: status as any, 
        updatedAt: new Date() 
      })
      .where(eq(reservations.id, id))
      .returning();
    
    // Record status change in history
    await db.insert(reservationHistory).values({
      reservationId: id,
      previousStatus: currentReservation.status,
      newStatus: status as any,
      changedByUserId,
      reason,
    });
    
    return updatedReservation;
  }
  
  async getReservationsByDate(date: Date): Promise<Reservation[]> {
    return db.select().from(reservations)
      .where(eq(reservations.date, date))
      .orderBy(asc(reservations.time));
  }
  
  async getReservationsByUser(userId: number): Promise<Reservation[]> {
    return db.select().from(reservations)
      .where(eq(reservations.userId, userId))
      .orderBy(desc(reservations.date), asc(reservations.time));
  }
  
  async getUpcomingReservations(): Promise<Reservation[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return db.select().from(reservations)
      .where(
        and(
          gte(reservations.date, today),
          not(inArray(reservations.status, ['cancelled', 'no_show', 'completed'])),
        )
      )
      .orderBy(asc(reservations.date), asc(reservations.time))
      .limit(100);
  }
  
  async searchReservations(query: string): Promise<Reservation[]> {
    return db.select().from(reservations)
      .where(
        or(
          like(reservations.name, `%${query}%`),
          like(reservations.email, `%${query}%`),
          like(reservations.phone, `%${query}%`),
          like(reservations.confirmationCode, `%${query}%`)
        )
      )
      .orderBy(desc(reservations.date))
      .limit(50);
  }

  // Table management
  async getAllDiningAreas(): Promise<DiningArea[]> {
    return db.select().from(diningAreas)
      .where(eq(diningAreas.isActive, true))
      .orderBy(asc(diningAreas.name));
  }
  
  async getDiningArea(id: number): Promise<DiningArea | undefined> {
    const [area] = await db.select().from(diningAreas).where(eq(diningAreas.id, id));
    return area;
  }
  
  async getTablesByDiningArea(diningAreaId: number): Promise<RestaurantTable[]> {
    return db.select().from(restaurantTables)
      .where(
        and(
          eq(restaurantTables.diningAreaId, diningAreaId),
          eq(restaurantTables.isActive, true)
        )
      )
      .orderBy(asc(restaurantTables.tableNumber));
  }
  
  async getAvailableTables(date: Date, time: string, partySize: number): Promise<RestaurantTable[]> {
    // This is a simplified version. A real implementation would check existing
    // reservations and find tables that are not already booked at this time
    const bookedTableIds = await db.select({ id: reservations.assignedTableId })
      .from(reservations)
      .where(
        and(
          eq(reservations.date, date),
          eq(reservations.time, time),
          inArray(reservations.status, ['confirmed', 'pending'])
        )
      );
    
    const bookedIds = bookedTableIds.map(t => t.id).filter(id => id !== null) as number[];
    
    return db.select().from(restaurantTables)
      .where(
        and(
          eq(restaurantTables.isActive, true),
          eq(restaurantTables.status, 'available'),
          gte(restaurantTables.capacity, partySize),
          lte(restaurantTables.capacity, partySize + 2), // Don't waste large tables on small parties
          bookedIds.length > 0 ? not(inArray(restaurantTables.id, bookedIds)) : undefined
        )
      )
      .orderBy(asc(restaurantTables.capacity));
  }

  // Time slots
  async getAvailableTimeSlots(date: Date, partySize: number): Promise<TimeSlot[]> {
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    return db.select().from(timeSlots)
      .where(
        and(
          eq(timeSlots.dayOfWeek, dayOfWeek),
          eq(timeSlots.isActive, true)
        )
      )
      .orderBy(asc(timeSlots.startTime));
  }

  // Special events
  async getAllActiveSpecialEvents(): Promise<SpecialEvent[]> {
    const today = new Date();
    
    return db.select().from(specialEvents)
      .where(
        and(
          lte(specialEvents.startDate, today),
          gte(specialEvents.endDate, today),
          eq(specialEvents.isPublic, true)
        )
      )
      .orderBy(asc(specialEvents.startDate));
  }
  
  async getSpecialEvent(id: number): Promise<SpecialEvent | undefined> {
    const [event] = await db.select().from(specialEvents).where(eq(specialEvents.id, id));
    return event;
  }

  // Waitlist management
  async addToWaitlist(waitlistEntry: Omit<Waitlist, 'id' | 'checkInTime' | 'createdAt' | 'updatedAt'>): Promise<Waitlist> {
    const [entry] = await db.insert(waitlist)
      .values(waitlistEntry)
      .returning();
    return entry;
  }
  
  async updateWaitlistStatus(id: number, status: string): Promise<Waitlist | undefined> {
    const [updatedEntry] = await db.update(waitlist)
      .set({ 
        status, 
        updatedAt: new Date(),
        ...(status === 'seated' ? { seatedTime: new Date() } : {}),
        ...(status === 'left' ? { leftTime: new Date() } : {})
      })
      .where(eq(waitlist.id, id))
      .returning();
    return updatedEntry;
  }
  
  async getCurrentWaitlist(): Promise<Waitlist[]> {
    return db.select().from(waitlist)
      .where(eq(waitlist.status, 'waiting'))
      .orderBy(asc(waitlist.checkInTime));
  }

  // Menu management
  async getAllMenuCategories(): Promise<MenuCategory[]> {
    return db.select().from(menuCategories)
      .where(eq(menuCategories.isActive, true))
      .orderBy(asc(menuCategories.displayOrder));
  }
  
  async getMenuItemsByCategory(categoryId: number): Promise<MenuItem[]> {
    return db.select().from(menuItems)
      .where(
        and(
          eq(menuItems.categoryId, categoryId),
          eq(menuItems.isAvailable, true)
        )
      )
      .orderBy(asc(menuItems.name));
  }
  
  async getFeaturedMenuItems(): Promise<MenuItem[]> {
    return db.select().from(menuItems)
      .where(
        and(
          eq(menuItems.isAvailable, true),
          eq(menuItems.isFeatured, true)
        )
      )
      .limit(6);
  }

  // Restaurant settings
  async getOperatingHours(): Promise<any[]> {
    return db.select().from(operatingHours)
      .orderBy(asc(operatingHours.dayOfWeek), asc(operatingHours.openTime));
  }
  
  async getRestaurantSettings(category: string): Promise<any[]> {
    return db.select().from(restaurantSettings)
      .where(eq(restaurantSettings.category, category))
      .orderBy(asc(restaurantSettings.name));
  }
}

// Function to create SQL error safely without user details
function or(...conditions: unknown[]) {
  // @ts-ignore: We know we're using SQL safely here
  return sql`(${conditions.join(' OR ')})`;
}

export const storage = new DatabaseStorage();
