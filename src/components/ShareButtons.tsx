import React from 'react';
import { Share2, Facebook, MessageCircle, Copy, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ShareButtons: React.FC = () => {
  const { toast } = useToast();

  const currentUrl = window.location.href;
  const shareText = "🎉 Mời bạn đến dự tiệc thôi nôi của bé! Một ngày đặc biệt đầy yêu thương và niềm vui đang chờ đón bạn! 👶✨";

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Zalo',
      icon: MessageCircle,
      color: 'bg-blue-400 hover:bg-blue-500',
      action: () => {
        const url = `https://zalo.me/share?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => {
        const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
      }
    },
    {
      name: 'Sao chép liên kết',
      icon: Copy,
      color: 'bg-gray-500 hover:bg-gray-600',
      action: async () => {
        try {
          await navigator.clipboard.writeText(currentUrl);
          toast({
            title: "✅ Đã sao chép!",
            description: "Liên kết đã được sao chép vào clipboard",
          });
        } catch (error) {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = currentUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          
          toast({
            title: "✅ Đã sao chép!",
            description: "Liên kết đã được sao chép vào clipboard",
          });
        }
      }
    }
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Thiệp Mời Thôi Nôi',
          text: shareText,
          url: currentUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-celebration">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-gentle border-0 bg-card/90 backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-quicksand font-bold text-primary flex items-center justify-center gap-3">
              <Share2 className="w-8 h-8 animate-gentle-bounce" />
              Chia Sẻ Thiệp Mời
              <Share2 className="w-8 h-8 animate-gentle-bounce" />
            </CardTitle>
            <p className="text-lg text-muted-foreground font-nunito mt-4">
              Hãy chia sẻ niềm vui này với bạn bè và người thân! 💖
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Main sharing message */}
            <div className="text-center p-6 bg-gradient-soft rounded-2xl">
              <div className="text-2xl mb-4">🎈✨🎉</div>
              <p className="text-lg font-nunito leading-relaxed text-foreground">
                "{shareText}"
              </p>
            </div>

            {/* Share buttons grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {shareOptions.map((option, index) => (
                <Button
                  key={option.name}
                  onClick={option.action}
                  className={`${option.color} text-white border-0 h-20 flex flex-col items-center justify-center gap-2 font-nunito font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-gentle`}
                >
                  <option.icon className="w-6 h-6" />
                  <span className="text-sm">{option.name}</span>
                </Button>
              ))}
            </div>

            {/* Native share button for mobile */}
            {navigator.share && (
              <div className="text-center">
                <Button
                  onClick={handleNativeShare}
                  className="bg-gradient-primary hover:shadow-gentle text-lg font-quicksand font-semibold px-8 py-6 rounded-2xl"
                >
                  <Share2 className="w-5 h-5 mr-3" />
                  Chia Sẻ Nhanh
                  <span className="ml-2">📱</span>
                </Button>
              </div>
            )}

            {/* URL display */}
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Link className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-nunito text-muted-foreground mb-1">
                    Liên kết thiệp mời:
                  </p>
                  <p className="text-sm font-mono bg-background rounded px-3 py-2 truncate border">
                    {currentUrl}
                  </p>
                </div>
                <Button
                  onClick={shareOptions[3].action}
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Social sharing tips */}
            <div className="text-center p-4 bg-primary-light/20 rounded-xl">
              <h3 className="font-quicksand font-bold text-primary mb-2">
                💡 Gợi ý chia sẻ
              </h3>
              <div className="text-sm font-nunito text-muted-foreground space-y-1">
                <p>• Gửi trong nhóm gia đình trên Zalo</p>
                <p>• Đăng story trên Facebook</p>
                <p>• Gửi tin nhắn cá nhân cho bạn bè</p>
                <p>• In QR code để đặt trên bàn tiệc</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ShareButtons;