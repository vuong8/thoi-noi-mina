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
    <section className="relative py-16 md:py-20 px-4 min-h-screen flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Star className="w-8 h-8 md:w-12 md:h-12 text-accent opacity-30" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-gentle-bounce">
          <Gift className="w-6 h-6 md:w-10 md:h-10 text-secondary opacity-40" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-sparkle">
          <Cake className="w-10 h-10 md:w-14 md:h-14 text-primary opacity-25" />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl">
        <Card className="shadow-celebration border-0 bg-card/95 backdrop-blur-md overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0 items-center">
              {/* Text Content */}
              <div className="p-6 md:p-8 lg:p-12 text-center md:text-left order-2 md:order-1">
                <div className="space-y-4 md:space-y-6">
                  {/* Main Title */}
                  <div className="space-y-3 md:space-y-4">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-quicksand font-bold leading-tight">
                      <span className="block text-primary animate-fade-in-up">
                        Thôi Nôi
                      </span>
                      <span className="block text-xl md:text-2xl lg:text-3xl xl:text-4xl text-secondary mt-2 animate-fade-in-up">
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
                    <p className="text-base md:text-lg font-nunito font-medium text-muted-foreground">
                      📅 Ngày tổ chức
                    </p>
                    <p className="text-lg md:text-xl lg:text-2xl font-quicksand font-semibold text-primary">
                      {formatDate(eventDate)}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-2 md:pt-4 animate-fade-in-up">
                    <Button
                      onClick={scrollToRSVP}
                      size="lg"
                      className="bg-gradient-primary hover:shadow-gentle transition-all duration-300 transform hover:scale-105 font-quicksand font-semibold text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-2xl w-full md:w-auto"
                    >
                      <Heart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Xác Nhận Tham Dự
                      <Star className="w-4 h-4 md:w-5 md:h-5 ml-2 animate-sparkle" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Baby Image */}
              <div className="relative p-6 md:p-8 lg:p-12 order-1 md:order-2">
                <div className="relative">
                  {/* Image container with decorative border */}
                  <div className="relative bg-gradient-soft p-3 md:p-4 rounded-3xl shadow-gentle">
                    <img
                      src={babyHero}
                      alt={`Ảnh bé ${babyName}`}
                      className="w-full h-auto max-w-sm md:max-w-md mx-auto rounded-2xl shadow-soft object-cover"
                    />
                    
                    {/* Floating hearts animation */}
                    <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 animate-float">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        ❤️
                      </div>
                    </div>
                    <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 animate-gentle-bounce">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-secondary/20 rounded-full flex items-center justify-center text-base md:text-lg">
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