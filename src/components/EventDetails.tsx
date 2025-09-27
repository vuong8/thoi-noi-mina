import React from 'react';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

  const openInMaps = () => {
    const url = `https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const openInZalo = () => {
    const message = `Xin chào! Tôi muốn xác nhận tham dự tiệc thôi nôi của bé ${babyName} vào ${formatDate(eventDate)} tại ${location.name}`;
    const zaloUrl = `https://zalo.me/0123456789?text=${encodeURIComponent(message)}`;
    window.open(zaloUrl, '_blank');
  };

  return (
    <section className="py-16 px-4" id="event-details">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-quicksand font-bold text-center text-primary mb-12">
          📍 Thông Tin Chi Tiết
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Event Information */}
          <Card className="shadow-gentle border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-quicksand font-bold text-primary mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Thời Gian & Địa Điểm
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-lg font-nunito">
                    <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
                      👶
                    </div>
                    <span className="font-semibold text-primary">Tên bé:</span>
                    <span className="text-foreground">{babyName}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-lg font-nunito">
                    <div className="w-8 h-8 bg-secondary-light rounded-full flex items-center justify-center">
                      📅
                    </div>
                    <span className="font-semibold text-primary">Ngày:</span>
                    <span className="text-foreground">{formatDate(eventDate)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-lg font-nunito">
                    <div className="w-8 h-8 bg-accent-light rounded-full flex items-center justify-center">
                      ⏰
                    </div>
                    <span className="font-semibold text-primary">Giờ:</span>
                    <span className="text-foreground">{formatTime(eventDate)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-3 text-lg font-nunito">
                    <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center mt-1">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-primary block">Địa điểm:</span>
                      <span className="text-foreground font-medium">{location.name}</span>
                      <br />
                      <span className="text-muted-foreground text-base">{location.address}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-lg font-nunito">
                    <div className="w-8 h-8 bg-secondary-light rounded-full flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-primary">Liên hệ:</span>
                    <span className="text-foreground">0123.456.789</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <Button
                  onClick={openInMaps}
                  variant="outline"
                  className="flex-1 bg-secondary/10 hover:bg-secondary/20 border-secondary text-secondary-foreground"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Xem Bản Đồ
                </Button>
                <Button
                  onClick={openInZalo}
                  className="flex-1 bg-gradient-primary hover:shadow-gentle"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Liên Hệ Zalo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Google Maps Embed */}
          <Card className="shadow-gentle border-0 bg-card/80 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="h-full min-h-[400px]">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6305931741667!2d106.69831687602671!3d10.769381359496246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f62a90e5dbd%3A0x674d5126513db295!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1698765432109!5m2!1svi!2s`}
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: '0' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Bản đồ địa điểm tiệc thôi nôi bé ${babyName}`}
                  className="w-full h-full rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;