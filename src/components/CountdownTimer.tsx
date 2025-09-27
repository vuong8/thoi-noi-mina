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
      <h2 className="text-3xl md:text-4xl font-quicksand font-bold text-primary mb-8">
        ⏰ Đếm Ngược Đến Ngày Đặc Biệt
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {timeUnits.map(({ value, label, icon: Icon, color }, index) => (
          <Card key={label} className="shadow-soft border-0 bg-card/80 backdrop-blur-sm hover:shadow-gentle transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="space-y-3">
                <Icon className={`w-8 h-8 mx-auto ${color} animate-gentle-bounce`} style={{ animationDelay: `${index * 0.1}s` }} />
                
                <div className="space-y-1">
                  <div className={`text-3xl md:text-4xl font-quicksand font-bold ${color}`}>
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm md:text-base font-nunito font-medium text-muted-foreground">
                    {label}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
        <div className="mt-8 p-6 bg-gradient-celebration rounded-2xl shadow-gentle">
          <p className="text-2xl font-quicksand font-bold text-primary">
            🎉 Hôm nay là ngày đặc biệt! 🎉
          </p>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;