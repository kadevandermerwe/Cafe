import { sql } from "drizzle-orm";
import { 
  boolean, 
  decimal, 
  pgTable, 
  serial, 
  text, 
  timestamp, 
  varchar, 
  integer, 
  pgEnum,
  foreignKey, 
  smallint,
  date,
  time,
  json,
  uniqueIndex
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const userRoleEnum = pgEnum('user_role', ['customer', 'staff', 'manager', 'admin']);
export const tableStatusEnum = pgEnum('table_status', ['available', 'reserved', 'occupied', 'maintenance']);
export const reservationStatusEnum = pgEnum('reservation_status', ['pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no_show']);
export const menuItemTypeEnum = pgEnum('menu_item_type', ['starter', 'main', 'dessert', 'drink', 'special']);
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'completed', 'failed', 'refunded']);
export const paymentMethodEnum = pgEnum('payment_method', ['credit_card', 'debit_card', 'cash', 'gift_card', 'mobile_payment']);

// Users schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  phoneNumber: varchar("phone_number", { length: 20 }),
  role: userRoleEnum("role").default('customer').notNull(),
  isVerified: boolean("is_verified").default(false).notNull(),
  verificationToken: varchar("verification_token", { length: 255 }),
  resetPasswordToken: varchar("reset_password_token", { length: 255 }),
  preferences: json("preferences").$type<{
    dietaryRestrictions?: string[];
    favoriteItems?: number[];
    seatingPreference?: string;
    marketingConsent?: boolean;
    notificationPreferences?: {
      email?: boolean;
      sms?: boolean;
      promotions?: boolean;
    };
  }>(),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Dining areas (sections of the restaurant)
export const diningAreas = pgTable("dining_areas", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true).notNull(),
  capacity: integer("capacity").notNull(),
  floorPlan: json("floor_plan").$type<{
    layout: string;
    dimensions: { width: number; height: number };
  }>(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Restaurant tables
export const restaurantTables = pgTable("restaurant_tables", {
  id: serial("id").primaryKey(),
  diningAreaId: integer("dining_area_id").notNull().references(() => diningAreas.id, { onDelete: 'cascade' }),
  tableNumber: varchar("table_number", { length: 20 }).notNull(),
  capacity: smallint("capacity").notNull(),
  status: tableStatusEnum("status").default('available').notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  position: json("position").$type<{ x: number; y: number }>(),
  shape: varchar("shape", { length: 20 }).default('rectangle'),
  size: json("size").$type<{ width: number; height: number }>(),
  metadata: json("metadata").$type<{
    isAccessible?: boolean;
    isOutdoor?: boolean;
    hasView?: boolean;
    isQuiet?: boolean;
  }>(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
}, (table) => {
  return {
    tableNumberUnique: uniqueIndex("table_number_unique").on(table.tableNumber),
  }
});

// Special events (like holidays, live music, etc.)
export const specialEvents = pgTable("special_events", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  startTime: time("start_time"),
  endTime: time("end_time"),
  capacity: integer("capacity"),
  isPublic: boolean("is_public").default(true).notNull(),
  isFullyBooked: boolean("is_fully_booked").default(false).notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Reservation slots (available time slots for each date)
export const timeSlots = pgTable("time_slots", {
  id: serial("id").primaryKey(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  dayOfWeek: smallint("day_of_week").notNull(), // 0=Sunday, 1=Monday, etc.
  maxReservations: integer("max_reservations").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  specialEventId: integer("special_event_id").references(() => specialEvents.id, { onDelete: 'set null' }),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Menu categories
export const menuCategories = pgTable("menu_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  displayOrder: integer("display_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Menu items
export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull().references(() => menuCategories.id, { onDelete: 'cascade' }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  type: menuItemTypeEnum("type").notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
  ingredients: text("ingredients").array(), 
  allergens: text("allergens").array(),
  nutritionalInfo: json("nutritional_info").$type<{
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    sodium?: number;
  }>(),
  isSpicy: boolean("is_spicy").default(false).notNull(),
  isVegetarian: boolean("is_vegetarian").default(false).notNull(),
  isVegan: boolean("is_vegan").default(false).notNull(),
  isGlutenFree: boolean("is_gluten_free").default(false).notNull(),
  isAvailable: boolean("is_available").default(true).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  prepTime: smallint("prep_time"), // in minutes
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Reservations
export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: 'set null' }),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  date: date("date").notNull(),
  time: time("time").notNull(),
  endTime: time("end_time"), // Calculated based on estimated dining duration
  guests: smallint("guests").notNull(),
  status: reservationStatusEnum("status").default('pending').notNull(),
  specialRequests: text("special_requests"),
  occasion: varchar("occasion", { length: 100 }),
  assignedTableId: integer("assigned_table_id").references(() => restaurantTables.id, { onDelete: 'set null' }),
  specialEventId: integer("special_event_id").references(() => specialEvents.id, { onDelete: 'set null' }),
  estimatedDuration: smallint("estimated_duration").default(90), // in minutes
  arrivalTime: timestamp("arrival_time"),
  departureTime: timestamp("departure_time"),
  reminderSent: boolean("reminder_sent").default(false).notNull(),
  confirmationCode: varchar("confirmation_code", { length: 20 }).notNull().unique(),
  source: varchar("source", { length: 50 }).default('website'),
  menuPreferences: json("menu_preferences").$type<{
    selectedItems?: number[];
    dietaryRestrictions?: string[];
    preOrderItems?: Array<{
      menuItemId: number;
      quantity: number;
      specialRequest?: string;
    }>;
  }>(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Reservation history (for tracking changes)
export const reservationHistory = pgTable("reservation_history", {
  id: serial("id").primaryKey(),
  reservationId: integer("reservation_id").notNull().references(() => reservations.id, { onDelete: 'cascade' }),
  previousStatus: reservationStatusEnum("previous_status").notNull(),
  newStatus: reservationStatusEnum("new_status").notNull(),
  changedByUserId: integer("changed_by_user_id").references(() => users.id, { onDelete: 'set null' }),
  reason: text("reason"),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

// Waitlist entries
export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }),
  partySize: smallint("party_size").notNull(),
  estimatedWaitTime: smallint("estimated_wait_time"), // in minutes
  notificationSent: boolean("notification_sent").default(false).notNull(),
  status: varchar("status", { length: 20 }).default('waiting').notNull(), 
  notes: text("notes"),
  checkInTime: timestamp("check_in_time").default(sql`now()`).notNull(),
  seatedTime: timestamp("seated_time"),
  leftTime: timestamp("left_time"),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Payments
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  reservationId: integer("reservation_id").references(() => reservations.id, { onDelete: 'set null' }),
  userId: integer("user_id").references(() => users.id, { onDelete: 'set null' }),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default('USD').notNull(),
  status: paymentStatusEnum("status").default('pending').notNull(),
  paymentMethod: paymentMethodEnum("payment_method"),
  paymentIntentId: varchar("payment_intent_id", { length: 255 }),
  receiptUrl: varchar("receipt_url", { length: 255 }),
  refundAmount: decimal("refund_amount", { precision: 10, scale: 2 }),
  metadata: json("metadata").$type<{
    cardBrand?: string;
    last4?: string;
    billingDetails?: {
      name?: string;
      email?: string;
      address?: string;
    }
  }>(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Operating hours
export const operatingHours = pgTable("operating_hours", {
  id: serial("id").primaryKey(),
  dayOfWeek: smallint("day_of_week").notNull(), // 0=Sunday, 1=Monday, etc.
  openTime: time("open_time").notNull(),
  closeTime: time("close_time").notNull(),
  isClosed: boolean("is_closed").default(false).notNull(),
  isSpecialHours: boolean("is_special_hours").default(false).notNull(),
  specialDate: date("special_date"), // For holiday hours
  mealPeriod: varchar("meal_period", { length: 20 }), // breakfast, lunch, dinner, etc.
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Restaurant Settings
export const restaurantSettings = pgTable("restaurant_settings", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  value: text("value").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
});

// Create Insert and Select Schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  isVerified: true,
  verificationToken: true,
  resetPasswordToken: true,
  lastLogin: true,
  createdAt: true,
  updatedAt: true,
});

export const insertReservationSchema = createInsertSchema(reservations).omit({
  id: true,
  status: true,
  reminderSent: true,
  arrivalTime: true,
  departureTime: true,
  confirmationCode: true,
  createdAt: true,
  updatedAt: true,
});

export const reservationWithTablesSchema = createSelectSchema(reservations).extend({
  table: z.object({
    id: z.number(),
    tableNumber: z.string(),
    capacity: z.number(),
    diningArea: z.object({
      id: z.number(),
      name: z.string(),
    }).optional()
  }).optional(),
});

// Define relationships
export const relations = {
  users: {
    reservations: { 
      relation: "1:n", 
      references: [reservations] 
    }
  },
  diningAreas: {
    tables: {
      relation: "1:n", 
      references: [restaurantTables]
    }
  },
  restaurantTables: {
    diningArea: {
      relation: "n:1",
      references: [diningAreas]
    },
    reservations: {
      relation: "1:n",
      references: [reservations]
    }
  },
  reservations: {
    user: {
      relation: "n:1",
      references: [users]
    },
    table: {
      relation: "n:1",
      references: [restaurantTables]
    },
    specialEvent: {
      relation: "n:1",
      references: [specialEvents]
    },
    history: {
      relation: "1:n",
      references: [reservationHistory]
    },
    payments: {
      relation: "1:n",
      references: [payments]
    }
  },
  menuCategories: {
    items: {
      relation: "1:n",
      references: [menuItems]
    }
  }
};

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Reservation = typeof reservations.$inferSelect;
export type InsertReservation = z.infer<typeof insertReservationSchema>;
export type ReservationWithTable = z.infer<typeof reservationWithTablesSchema>;

export type DiningArea = typeof diningAreas.$inferSelect;
export type RestaurantTable = typeof restaurantTables.$inferSelect;
export type MenuItem = typeof menuItems.$inferSelect;
export type MenuCategory = typeof menuCategories.$inferSelect;
export type SpecialEvent = typeof specialEvents.$inferSelect;
export type TimeSlot = typeof timeSlots.$inferSelect;
export type Waitlist = typeof waitlist.$inferSelect;
export type Payment = typeof payments.$inferSelect;
