import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface EventDetailsProps {
  babyName: string;
  eventDate: Date;
  location: {
    name: string;
    address: string;
    coordinates: { lat: number; lng: number };
  };
}

const EventDetails: React.FC<EventDetailsProps> = ({ babyName, eventDate, location }) => {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };


  return (
    <section className="py-12 md:py-16 px-4" id="event-details">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-quicksand font-bold text-center text-primary mb-8 md:mb-12 px-2">
          📍 Thông Tin Chi Tiết
        </h2>

        <div className="max-w-3xl mx-auto">
          {/* Event Information */}
          <Card className="shadow-gentle border-0 bg-card/90 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-quicksand font-bold text-primary mb-4 md:mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 md:w-6 md:h-6" />
                Thời Gian & Địa Điểm
              </h3>
              
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-base md:text-lg font-nunito">
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                      👶
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-semibold text-primary">Tên bé:</span>
                      <span className="text-foreground">{babyName}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-base md:text-lg font-nunito">
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-secondary-light rounded-full flex items-center justify-center flex-shrink-0">
                      📅
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-semibold text-primary">Ngày:</span>
                      <span className="text-foreground text-sm md:text-base">{formatDate(eventDate)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-base md:text-lg font-nunito">
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-accent-light rounded-full flex items-center justify-center flex-shrink-0">
                      ⏰
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-semibold text-primary">Giờ:</span>
                      <span className="text-foreground">{formatTime(eventDate)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-3 text-base md:text-lg font-nunito">
                    <div className="w-7 h-7 md:w-8 md:h-8 bg-primary-light rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-primary block">Địa điểm:</span>
                      <span className="text-foreground font-medium break-words">{location.name}</span>
                      <br />
                      <span className="text-muted-foreground text-sm md:text-base break-words">{location.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;