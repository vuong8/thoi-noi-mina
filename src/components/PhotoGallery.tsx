import React, { useState } from 'react';
import { Camera, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import mina1 from '@/assets/mina/att.AWu1Mi4nUuzKoLygAgeozP5sXtX6f9Nn3f8MpnJcJoA.JPG';
import mina2 from '@/assets/mina/att.FR2ldKZU-l_o6vUS62XC-55r_bH2xCN_4lzfEftBXSw.JPG';
import mina4 from '@/assets/mina/att.ZMt6EykkYqnGi9UJaiV-PPaUDyPCOdywFDt4eblgvTw.JPG';

interface PhotoGalleryProps {
  babyName: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ babyName }) => {
  // Photos from local assets
  const [photos] = useState([
    {
      id: 1,
      url: mina1,
      caption: `${babyName}`,
      likes: 15
    },
    {
      id: 2,
      url: mina2, 
      caption: `${babyName}`,
      likes: 23
    },
    {
      id: 4,
      url: mina4,
      caption: `Khoảnh khắc đặc biệt của ${babyName}`,
      likes: 31
    }
  ]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card className="shadow-gentle border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-quicksand font-bold text-primary flex items-center justify-center gap-3">
                <Camera className="w-8 h-8 animate-gentle-bounce" />
                Kỷ Niệm Của Bé {babyName}
                <Star className="w-8 h-8 animate-sparkle" />
              </CardTitle>
              <p className="text-lg text-muted-foreground font-nunito mt-4">
                Những khoảnh khắc đáng yêu và đặc biệt nhất 📸
              </p>
            </CardHeader>

            <CardContent className="p-6">
              {/* Photo Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
                    onClick={() => openModal(index)}
                  >
                    <div className="aspect-square overflow-hidden rounded-2xl shadow-soft">
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Modal for full-screen image viewing */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close button */}
            <Button
              onClick={closeModal}
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white"
            >
              ✕
            </Button>

            {/* Navigation buttons */}
            <Button
              onClick={prevImage}
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              onClick={nextImage}
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Main image */}
            <div className="text-center">
              <img
                src={photos[currentImageIndex].url}
                alt={photos[currentImageIndex].caption}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Image caption */}
              <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <p className="text-white font-nunito text-lg">
                  {photos[currentImageIndex].caption}
                </p>
              </div>

              {/* Image counter */}
              <div className="mt-2 text-white/60 text-sm">
                {currentImageIndex + 1} / {photos.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;