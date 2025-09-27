import React from 'react';
import { Cake, Star, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import babyHero from '@/assets/baby-hero.jpg';

interface HeroSectionProps {
  babyName: string;
  eventDate: Date;
}

const HeroSection: React.FC<HeroSectionProps> = ({ babyName, eventDate }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const scrollToRSVP = () => {
    document.getElementById('rsvp-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="relative py-20 px-4 min-h-screen flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Star className="w-12 h-12 text-accent opacity-30" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-gentle-bounce">
          <Gift className="w-10 h-10 text-secondary opacity-40" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-sparkle">
          <Cake className="w-14 h-14 text-primary opacity-25" />
        </div>
      </div>

      <div className="container mx-auto max-w-6xl">
        <Card className="shadow-celebration border-0 bg-card/90 backdrop-blur-md overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0 items-center">
              {/* Text Content */}
              <div className="p-8 md:p-12 text-center md:text-left order-2 md:order-1">
                <div className="space-y-6">
                  {/* Main Title */}
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-quicksand font-bold leading-tight">
                      <span className="block text-primary animate-fade-in-up">
                        Thôi Nôi
                      </span>
                      <span className="block text-2xl md:text-3xl lg:text-4xl text-secondary mt-2 animate-fade-in-up">
                        Bé {babyName}
                      </span>
                    </h1>
                    
                    <div className="flex justify-center md:justify-start gap-2 animate-fade-in-up">
                      <div className="w-2 h-2 bg-primary rounded-full animate-gentle-bounce"></div>
                      <div className="w-2 h-2 bg-secondary rounded-full animate-gentle-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-accent rounded-full animate-gentle-bounce delay-150"></div>
                    </div>
                  </div>

                  {/* Event Date */}
                  <div className="space-y-2 animate-fade-in-up">
                    <p className="text-lg font-nunito font-medium text-muted-foreground">
                      📅 Ngày tổ chức
                    </p>
                    <p className="text-xl md:text-2xl font-quicksand font-semibold text-primary">
                      {formatDate(eventDate)}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4 animate-fade-in-up">
                    <Button
                      onClick={scrollToRSVP}
                      size="lg"
                      className="bg-gradient-primary hover:shadow-gentle transition-all duration-300 transform hover:scale-105 font-quicksand font-semibold text-lg px-8 py-6 rounded-2xl"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Xác Nhận Tham Dự
                      <Star className="w-5 h-5 ml-2 animate-sparkle" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Baby Image */}
              <div className="relative p-8 md:p-12 order-1 md:order-2">
                <div className="relative">
                  {/* Image container with decorative border */}
                  <div className="relative bg-gradient-soft p-4 rounded-3xl shadow-gentle">
                    <img
                      src={babyHero}
                      alt={`Ảnh bé ${babyName}`}
                      className="w-full h-auto max-w-md mx-auto rounded-2xl shadow-soft object-cover"
                    />
                    
                    {/* Floating hearts animation */}
                    <div className="absolute -top-4 -right-4 animate-float">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        ❤️
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -left-4 animate-gentle-bounce">
                      <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center text-lg">
                        🎈
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

// Import missing icon
import { Heart } from 'lucide-react';

export default HeroSection;