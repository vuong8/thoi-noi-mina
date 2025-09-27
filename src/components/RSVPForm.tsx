import React, { useState } from 'react';
import { Send, Users, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

interface RSVPFormProps {
  babyName: string;
}

const rsvpSchema = z.object({
  name: z.string().trim().min(1, { message: "Vui lòng nhập họ tên" }).max(100, { message: "Tên quá dài" }),
  phone: z.string().trim().min(10, { message: "Số điện thoại không hợp lệ" }).max(15, { message: "Số điện thoại quá dài" }),
  guestCount: z.number().min(1, { message: "Ít nhất 1 người tham dự" }).max(10, { message: "Tối đa 10 người" }),
  message: z.string().trim().max(500, { message: "Lời nhắn quá dài (tối đa 500 ký tự)" }).optional()
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

const RSVPForm: React.FC<RSVPFormProps> = ({ babyName }) => {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    phone: '',
    guestCount: 1,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof RSVPFormData, string>>>({});
  const { toast } = useToast();

  const handleInputChange = (field: keyof RSVPFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      rsvpSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof RSVPFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof RSVPFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Lỗi thông tin",
        description: "Vui lòng kiểm tra lại thông tin đã nhập",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "✅ Xác nhận thành công!",
        description: `Cảm ơn ${formData.name} đã xác nhận tham dự tiệc thôi nôi của bé ${babyName}!`,
      });

      // Reset form
      setFormData({
        name: '',
        phone: '',
        guestCount: 1,
        message: ''
      });

    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau hoặc liên hệ trực tiếp qua số điện thoại",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-soft" id="rsvp-section">
      <div className="container mx-auto max-w-3xl">
        <Card className="shadow-celebration border-0 bg-card/95 backdrop-blur-md">
          <CardHeader className="text-center pb-4 md:pb-6">
            <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-quicksand font-bold text-primary flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
              <Heart className="w-6 h-6 md:w-8 md:h-8 animate-gentle-bounce" />
              <span>Xác Nhận Tham Dự</span>
              <Heart className="w-6 h-6 md:w-8 md:h-8 animate-gentle-bounce" />
            </CardTitle>
            <p className="text-base md:text-lg text-muted-foreground font-nunito mt-3 md:mt-4 px-2">
              Hãy cho gia đình bé {babyName} biết bạn sẽ đến chung vui nhé! 🎉
            </p>
          </CardHeader>

          <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base md:text-lg font-nunito font-semibold text-primary">
                  👤 Họ và Tên *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Nhập họ tên của bạn"
                  className={`text-base md:text-lg h-12 md:h-14 bg-background/50 border-2 focus:border-primary transition-colors ${
                    errors.name ? 'border-destructive' : ''
                  }`}
                />
                {errors.name && (
                  <p className="text-destructive text-sm font-nunito">{errors.name}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base md:text-lg font-nunito font-semibold text-primary">
                  📱 Số Điện Thoại *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Nhập số điện thoại liên hệ"
                  className={`text-base md:text-lg h-12 md:h-14 bg-background/50 border-2 focus:border-primary transition-colors ${
                    errors.phone ? 'border-destructive' : ''
                  }`}
                />
                {errors.phone && (
                  <p className="text-destructive text-sm font-nunito">{errors.phone}</p>
                )}
              </div>

              {/* Guest Count Field */}
              <div className="space-y-2">
                <Label htmlFor="guestCount" className="text-base md:text-lg font-nunito font-semibold text-primary">
                  <Users className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
                  Số Lượng Người Tham Dự *
                </Label>
                <Input
                  id="guestCount"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.guestCount}
                  onChange={(e) => handleInputChange('guestCount', parseInt(e.target.value) || 1)}
                  className={`text-base md:text-lg h-12 md:h-14 bg-background/50 border-2 focus:border-primary transition-colors ${
                    errors.guestCount ? 'border-destructive' : ''
                  }`}
                />
                {errors.guestCount && (
                  <p className="text-destructive text-sm font-nunito">{errors.guestCount}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-base md:text-lg font-nunito font-semibold text-primary">
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
                  Lời Chúc Mừng (Tùy chọn)
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Gửi lời chúc mừng đặc biệt đến bé và gia đình..."
                  className={`min-h-[100px] md:min-h-[120px] text-sm md:text-base bg-background/50 border-2 focus:border-primary transition-colors resize-none ${
                    errors.message ? 'border-destructive' : ''
                  }`}
                  maxLength={500}
                />
                {errors.message && (
                  <p className="text-destructive text-sm font-nunito">{errors.message}</p>
                )}
                <p className="text-xs text-muted-foreground text-right">
                  {formData.message?.length || 0}/500
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 md:h-16 text-base md:text-lg font-quicksand font-semibold bg-gradient-primary hover:shadow-gentle transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 md:w-5 md:h-5 mr-3" />
                    Xác Nhận Tham Dự 🎈
                  </>
                )}
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 md:mt-8 p-3 md:p-4 bg-gradient-celebration rounded-xl">
              <p className="text-center text-xs md:text-sm font-nunito text-muted-foreground">
                💡 <strong>Lưu ý:</strong> Sau khi xác nhận, chúng tôi sẽ liên hệ lại để xác nhận thông tin chi tiết
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RSVPForm;