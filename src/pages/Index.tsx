import React, { useState } from 'react';
import { Heart, Calendar, MapPin, Users, Share2, Music, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import HeroSection from '@/components/HeroSection';
import CountdownTimer from '@/components/CountdownTimer';
import EventDetails from '@/components/EventDetails';
import RSVPForm from '@/components/RSVPForm';
import PhotoGallery from '@/components/PhotoGallery';
import ShareButtons from '@/components/ShareButtons';
import MusicPlayer from '@/components/MusicPlayer';

const Index = () => {
  const [babyName] = useState("Minh An");
  const [eventDate] = useState(new Date("2024-12-15T14:00:00"));
  const [location] = useState({
    name: "Nhà Hàng Tiệc Cưới Saigon Palace",
    address: "123 Đường Nguyễn Thị Minh Khai, Quận 1, TP.HCM",
    coordinates: { lat: 10.7769, lng: 106.7009 }
  });
  
  return (
    <div className="min-h-screen bg-gradient-hero font-nunito relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-8 h-8 bg-primary-light rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-40 right-16 animate-gentle-bounce">
        <div className="w-6 h-6 bg-secondary-light rounded-full opacity-70"></div>
      </div>
      <div className="absolute bottom-40 left-20 animate-sparkle">
        <div className="w-10 h-10 bg-accent-light rounded-full opacity-50"></div>
      </div>

      <MusicPlayer />
      
      {/* Hero Section */}
      <HeroSection babyName={babyName} eventDate={eventDate} />
      
      {/* Countdown Timer */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <CountdownTimer targetDate={eventDate} />
        </div>
      </section>

      {/* Personal Invitation Message */}
      <section className="py-12 px-4 bg-gradient-soft">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="shadow-gentle border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl md:text-3xl font-quicksand font-bold text-primary mb-6">
                💝 Lời Mời Đặc Biệt 💝
              </h2>
              <p className="text-lg leading-relaxed text-foreground/80 font-nunito">
                Gia đình bé <span className="font-bold text-primary">{babyName}</span> trân trọng mời 
                <span className="font-bold text-secondary"> Quý khách </span>
                đến chung vui trong ngày thôi nôi đặc biệt của con. 
                <br /><br />
                Sự hiện diện của quý vị là niềm vui lớn nhất của gia đình chúng tôi! 
                Hãy cùng tạo nên những kỷ niệm tuyệt vời trong ngày đầy ý nghĩa này nhé! 🎈
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Event Details */}
      <EventDetails 
        babyName={babyName}
        eventDate={eventDate}
        location={location}
      />

      {/* RSVP Form */}
      <RSVPForm babyName={babyName} />

      {/* Photo Gallery */}
      <PhotoGallery babyName={babyName} />

      {/* Share Section */}
      <ShareButtons />

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-celebration text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-primary animate-gentle-bounce" />
            <span className="font-quicksand font-semibold text-primary">
              Cảm ơn quý vị đã dành thời gian cho bé {babyName}!
            </span>
            <Heart className="w-5 h-5 text-primary animate-gentle-bounce" />
          </div>
          <p className="text-sm text-muted-foreground">
            Thiệp mời được tạo với yêu thương ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;