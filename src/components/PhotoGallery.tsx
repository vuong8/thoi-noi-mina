import React, { useState } from 'react';
import { Camera, Heart, Star, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PhotoGalleryProps {
  babyName: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ babyName }) => {
  // Sample photos - in a real app, these would come from a database
  const [photos] = useState([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: `${babyName} đang ngủ ngon lành`,
      likes: 15
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      caption: `${babyName} với nụ cười đáng yêu`,
      likes: 23
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: `${babyName} chơi đùa vui vẻ`,
      likes: 18
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: `Khoảnh khắc đặc biệt của ${babyName}`,
      likes: 31
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1518135714426-c2f1d2980ebc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: `${babyName} trong vòng tay gia đình`,
      likes: 27
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: `${babyName} và những kỷ niệm đẹp`,
      likes: 20
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
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-2xl flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                        <Heart className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-sm font-nunito">{photo.likes} lượt thích</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Upload Section */}
              <div className="text-center p-6 bg-gradient-soft rounded-2xl">
                <Camera className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-quicksand font-bold text-primary mb-2">
                  Chia Sẻ Kỷ Niệm
                </h3>
                <p className="text-muted-foreground font-nunito mb-4">
                  Hãy gửi cho chúng tôi những hình ảnh đẹp của bé {babyName}!
                </p>
                <Button className="bg-gradient-primary hover:shadow-gentle">
                  <Upload className="w-4 h-4 mr-2" />
                  Tải Ảnh Lên
                </Button>
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
                <div className="flex items-center justify-center gap-2 mt-2 text-white/80">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{photos[currentImageIndex].likes} lượt thích</span>
                </div>
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