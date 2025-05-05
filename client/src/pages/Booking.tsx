import BookingForm from "../components/BookingForm";
import { CheckCircle2, CalendarRange, Clock, MapPin, Users } from "lucide-react";

export default function Booking() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Table Reservations</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Reserve your table at our restaurant and enjoy a delightful dining experience. 
          We look forward to serving you with our exceptional cuisine and hospitality.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
        <div className="flex flex-col items-center p-6 bg-primary/5 rounded-lg">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <CalendarRange className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy Online Booking</h3>
          <p className="text-center text-muted-foreground">
            Reserve your table in just a few clicks with our user-friendly online booking system.
          </p>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-primary/5 rounded-lg">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <Clock className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Instant Confirmation</h3>
          <p className="text-center text-muted-foreground">
            Receive immediate confirmation and a unique reservation code for your booking.
          </p>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-primary/5 rounded-lg">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Special Requests</h3>
          <p className="text-center text-muted-foreground">
            Let us know about any special occasions or dietary requirements, and we'll accommodate them.
          </p>
        </div>
      </div>

      {/* Booking process steps */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-[calc(2rem)] top-0 h-full w-0.5 bg-muted md:left-1/2"></div>
          
          {/* Step 1 */}
          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 mb-8">
            <div className="md:text-right md:pr-10">
              <h3 className="text-xl font-semibold mb-2">1. Select Date & Time</h3>
              <p className="text-muted-foreground">
                Choose your preferred date and time for your dining experience.
              </p>
            </div>
            <div className="relative md:pl-10">
              <div className="absolute left-[-12px] md:left-[-14px] top-1 h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                <CalendarRange className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 mb-8">
            <div className="md:order-last md:text-left md:pl-10">
              <h3 className="text-xl font-semibold mb-2">2. Choose Your Party Size</h3>
              <p className="text-muted-foreground">
                Let us know how many guests will be joining you for the meal.
              </p>
            </div>
            <div className="relative md:order-first md:text-right md:pr-10">
              <div className="absolute right-[-12px] md:right-[-14px] top-1 h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 mb-8">
            <div className="md:text-right md:pr-10">
              <h3 className="text-xl font-semibold mb-2">3. Select Dining Area</h3>
              <p className="text-muted-foreground">
                Choose your preferred dining space based on your preferences.
              </p>
            </div>
            <div className="relative md:pl-10">
              <div className="absolute left-[-12px] md:left-[-14px] top-1 h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                <MapPin className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:order-last md:text-left md:pl-10">
              <h3 className="text-xl font-semibold mb-2">4. Receive Confirmation</h3>
              <p className="text-muted-foreground">
                Get instant confirmation with your unique reservation code.
              </p>
            </div>
            <div className="relative md:order-first md:text-right md:pr-10">
              <div className="absolute right-[-12px] md:right-[-14px] top-1 h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking form section */}
      <div className="bg-muted/30 p-6 md:p-10 rounded-xl">
        <h2 className="text-2xl font-bold mb-8 text-center">Make Your Reservation</h2>
        <BookingForm />
      </div>

      {/* Testimonials */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">What Our Guests Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary font-bold">JS</span>
              </div>
              <div>
                <h4 className="font-semibold">James Smith</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">
              "The online reservation system was incredibly easy to use! I got my confirmation instantly, and when we arrived, our table was ready exactly as requested."
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary font-bold">EJ</span>
              </div>
              <div>
                <h4 className="font-semibold">Emily Johnson</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">
              "I made a special request for our anniversary dinner through the booking system, and they went above and beyond to make our evening special. Highly recommended!"
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary font-bold">MB</span>
              </div>
              <div>
                <h4 className="font-semibold">Michael Brown</h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">
              "I had to modify my reservation last minute, and it was so simple to do. The staff was accommodating, and the whole process was seamless."
            </p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">How far in advance should I make a reservation?</h3>
            <p className="text-muted-foreground">
              For weekdays, we recommend booking at least 24 hours in advance. For weekends and special occasions, 3-5 days in advance is recommended to secure your preferred time.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">What is your cancellation policy?</h3>
            <p className="text-muted-foreground">
              Reservations can be canceled up to 24 hours before your scheduled time without any charge. For cancellations less than 24 hours in advance, a small fee may apply.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">Can I modify my reservation?</h3>
            <p className="text-muted-foreground">
              Yes, you can modify your reservation through our online system using your confirmation code, or by calling us directly. Changes are subject to availability.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-2">Do you accommodate dietary restrictions?</h3>
            <p className="text-muted-foreground">
              Absolutely! You can note your dietary needs in the Special Requests section of the booking form, and our chefs will be happy to accommodate them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}