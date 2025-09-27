import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Timer, Hourglass } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { value: timeLeft.days, label: 'Ngày', icon: Calendar, color: 'text-primary' },
    { value: timeLeft.hours, label: 'Giờ', icon: Clock, color: 'text-secondary' },
    { value: timeLeft.minutes, label: 'Phút', icon: Timer, color: 'text-accent' },
    { value: timeLeft.seconds, label: 'Giây', icon: Hourglass, color: 'text-primary' }
  ];

  return (
    <div className="text-center animate-fade-in-up">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-quicksand font-bold text-primary mb-6 md:mb-8 px-2">
        ⏰ Đếm Ngược Đến Ngày Đặc Biệt
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto">
        {timeUnits.map(({ value, label, icon: Icon, color }, index) => (
          <Card key={label} className="shadow-soft border-0 bg-card/90 backdrop-blur-sm hover:shadow-gentle transition-all duration-300 transform hover:scale-105 mx-auto w-full">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="space-y-2 md:space-y-3">
                <Icon className={`w-6 h-6 md:w-8 md:h-8 mx-auto ${color} animate-gentle-bounce`} style={{ animationDelay: `${index * 0.1}s` }} />
                
                <div className="space-y-1">
                  <div className={`text-2xl md:text-3xl lg:text-4xl font-quicksand font-bold ${color}`}>
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base font-nunito font-medium text-muted-foreground">
                    {label}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
        <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-celebration rounded-2xl shadow-gentle max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl font-quicksand font-bold text-primary">
            🎉 Hôm nay là ngày đặc biệt! 🎉
          </p>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;