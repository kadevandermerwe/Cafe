import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";

// UI Components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock, Users, Phone, Mail, User2 } from "lucide-react";
import { cn } from "../lib/utils";

// Booking form validation schema
const bookingFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(6, {
    message: "Please enter a valid phone number.",
  }),
  date: z.date({
    required_error: "Please select a date for your reservation.",
  }),
  time: z.string({
    required_error: "Please select a time for your reservation.",
  }),
  guests: z.string().transform((val) => parseInt(val, 10)),
  occasion: z.string().optional(),
  specialRequests: z.string().optional(),
  diningAreaId: z.string().optional(),
});

// Get TypeScript type from schema
type BookingFormValues = z.infer<typeof bookingFormSchema>;

// Time slots for the select dropdown
const timeSlots = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", 
  "14:00", "14:30", "17:00", "17:30", "18:00", "18:30", 
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
];

// Guest capacity options
const guestOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

// Dining areas with descriptions
const diningAreas = [
  { id: "1", name: "Main Dining Room", description: "Elegant atmosphere with panoramic views of the garden" },
  { id: "2", name: "Terrace", description: "Outdoor seating with a beautiful natural setting" },
  { id: "3", name: "Private Room", description: "Intimate setting perfect for special occasions (min. 6 guests)" },
  { id: "4", name: "Bar Area", description: "Lively atmosphere near our premium cocktail bar" }
];

// Occasion options for special events
const occasionOptions = [
  "None", "Birthday", "Anniversary", "Business Meeting", 
  "Date Night", "Family Gathering", "Special Event"
];

export default function BookingForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  // Form definition with react-hook-form
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      guests: "2",
      occasion: "None",
      specialRequests: "",
      diningAreaId: "1",
    },
  });

  // Query for available time slots based on selected date (simplified for now)
  const { data: availableTimeSlots } = useQuery({
    queryKey: ["availableTimeSlots", selectedDate],
    queryFn: async () => {
      if (!selectedDate) return timeSlots;
      return timeSlots; // In a real app, this would fetch from the API
    },
    enabled: !!selectedDate,
  });

  // When date changes, update the date field and reset time
  useEffect(() => {
    if (selectedDate) {
      form.setValue("date", selectedDate);
      // Reset time when date changes
      form.setValue("time", "", { shouldValidate: true });
    }
  }, [selectedDate, form]);

  // Mutation for submitting the booking form
  const mutation = useMutation({
    mutationFn: (data: BookingFormValues) => {
      return apiRequest({
        url: "/api/reservations",
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/reservations"] });
      setConfirmationCode(data.reservation.confirmationCode);
      setShowSuccessCard(true);
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error("Booking error:", error);
      toast({
        title: "Booking failed",
        description: "There was a problem with your reservation. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  // Form submission handler
  function onSubmit(data: BookingFormValues) {
    setIsSubmitting(true);
    mutation.mutate(data);
  }

  // For new reservation after successful booking
  const handleNewReservation = () => {
    setShowSuccessCard(false);
    form.reset({
      name: "",
      email: "",
      phone: "",
      guests: "2",
      occasion: "None",
      specialRequests: "",
      diningAreaId: "1",
    });
    setSelectedDate(undefined);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {showSuccessCard ? (
        // Success message after booking
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-800 text-xl">Reservation Confirmed!</CardTitle>
            <CardDescription className="text-green-700">
              We're looking forward to seeing you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-green-700">
                Your reservation has been confirmed. We've sent the details to your email.
              </p>
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <p className="font-medium">Confirmation Code:</p>
                <p className="text-xl font-bold tracking-wider text-center my-2">{confirmationCode}</p>
                <p className="text-xs text-muted-foreground">
                  Please save this code. You'll need it if you need to modify or cancel your reservation.
                </p>
              </div>
              <Button 
                className="w-full mt-4" 
                onClick={handleNewReservation}
                variant="outline"
              >
                Make Another Reservation
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Booking form
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Guest Information</h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="John Smith" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="example@email.com" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="(123) 456-7890" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="occasion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occasion (Optional)</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an occasion" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {occasionOptions.map((occasion) => (
                            <SelectItem key={occasion} value={occasion}>
                              {occasion}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Reservation Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Reservation Details</h3>
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              setSelectedDate(date);
                            }}
                            disabled={(date) => 
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!selectedDate}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <SelectValue placeholder="Select a time" />
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableTimeSlots?.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Guests</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <div className="flex items-center">
                              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                              <SelectValue placeholder="Select number of guests" />
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {guestOptions.map((num) => (
                            <SelectItem key={num} value={num}>
                              {num} {parseInt(num) === 1 ? "Guest" : "Guests"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="diningAreaId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seating Preference</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a seating area" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {diningAreas.map((area) => (
                            <SelectItem key={area.id} value={area.id}>
                              <div className="flex flex-col">
                                <span>{area.name}</span>
                                <span className="text-xs text-muted-foreground truncate max-w-[280px]">
                                  {area.description}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please let us know if you have any special requests or dietary requirements."
                      className="resize-none min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-muted/50 p-4 rounded-lg text-sm border">
              <h4 className="font-medium mb-2">Reservation Policy</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Reservations can be canceled up to 24 hours before the scheduled time.</li>
                <li>For parties of 6 or more, a credit card is required to hold the reservation.</li>
                <li>Please arrive on time. We can only hold your table for 15 minutes past your reservation time.</li>
                <li>For special dietary needs, please note them in the Special Requests section.</li>
              </ul>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Book Table"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}