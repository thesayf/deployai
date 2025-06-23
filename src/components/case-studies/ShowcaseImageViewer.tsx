import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMaximize2,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const showcaseScreens = [
  {
    name: "Homepage",
    image: "/schomee.png",
    description: "Cinema homepage with film listings and showtimes",
  },
  {
    name: "Dashboard",
    image: "/scmain.png",
    description: "Main scheduling dashboard with AI-generated schedules",
  },
  {
    name: "Sites Settings",
    image: "/scsites.png",
    description: "Multi-site configuration and management",
  },
  {
    name: "Best Practices",
    image: "/scbp.png",
    description: "AI-driven best practice recommendations",
  },
];

interface ShowcaseImageViewerProps {
  currentScreen: number;
  setCurrentScreen: (screen: number) => void;
}

export const ShowcaseImageViewer = ({
  currentScreen,
  setCurrentScreen,
}: ShowcaseImageViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState("");

  const openFullscreen = (imageUrl: string) => {
    setFullscreenImage(imageUrl);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setFullscreenImage("");
  };

  const nextImage = () => {
    const newScreen = (currentScreen + 1) % showcaseScreens.length;
    setCurrentScreen(newScreen);
    // Update fullscreen image if in fullscreen mode
    if (isFullscreen) {
      setFullscreenImage(showcaseScreens[newScreen].image);
    }
  };

  const prevImage = () => {
    const newScreen =
      currentScreen === 0 ? showcaseScreens.length - 1 : currentScreen - 1;
    setCurrentScreen(newScreen);
    // Update fullscreen image if in fullscreen mode
    if (isFullscreen) {
      setFullscreenImage(showcaseScreens[newScreen].image);
    }
  };

  return (
    <>
      {/* Main Image Viewer */}
      <div className="relative h-[450px] w-full overflow-hidden rounded-2xl border-2 border-zinc-900 bg-white shadow-[4px_4px_0px_#18181b]">
        {/* Navigation Buttons */}
        <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
          <button
            onClick={prevImage}
            className="rounded-full border border-zinc-300 bg-white/90 p-2 shadow-sm transition-all hover:bg-white"
          >
            <FiChevronLeft className="h-4 w-4" />
          </button>

          <div className="rounded-full border border-zinc-300 bg-white/90 px-3 py-1 text-xs font-medium">
            {currentScreen + 1} / {showcaseScreens.length}
          </div>

          <button
            onClick={nextImage}
            className="rounded-full border border-zinc-300 bg-white/90 p-2 shadow-sm transition-all hover:bg-white"
          >
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={() => openFullscreen(showcaseScreens[currentScreen].image)}
          className="absolute right-16 top-4 z-10 rounded-full bg-red-600 p-2 text-white shadow-sm transition-all hover:bg-red-700"
          title="View Fullscreen"
        >
          <FiMaximize2 className="h-4 w-4" />
        </button>

        {/* Screen Label */}
        <div className="absolute bottom-4 left-4 rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white">
          {showcaseScreens[currentScreen].name}
        </div>

        {/* Main Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentScreen}
            src={showcaseScreens[currentScreen].image}
            alt={showcaseScreens[currentScreen].description}
            className="h-full w-full cursor-pointer object-contain"
            onClick={() => openFullscreen(showcaseScreens[currentScreen].image)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </div>

      {/* Screen Navigation Dots */}
      <div className="mt-4 flex justify-center gap-2">
        {showcaseScreens.map((screen, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentScreen(index);
              // Update fullscreen image if in fullscreen mode
              if (isFullscreen) {
                setFullscreenImage(showcaseScreens[index].image);
              }
            }}
            className={`rounded-full border-2 px-3 py-1 text-sm transition-all ${
              currentScreen === index
                ? "border-red-600 bg-red-600 text-white"
                : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-500"
            }`}
          >
            {screen.name}
          </button>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeFullscreen}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-h-full max-w-7xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeFullscreen}
                className="absolute -top-12 right-0 rounded-full bg-white/20 p-2 text-white transition-all hover:bg-white/30"
              >
                <FiX className="h-6 w-6" />
              </button>

              {/* Fullscreen Image */}
              <img
                src={fullscreenImage}
                alt="Fullscreen view"
                className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
              />

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-2 text-white">
                <div className="font-medium">
                  {showcaseScreens[currentScreen].name}
                </div>
                <div className="text-sm opacity-80">
                  {showcaseScreens[currentScreen].description}
                </div>
              </div>

              {/* Navigation in Fullscreen */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition-all hover:bg-white/30"
              >
                <FiChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition-all hover:bg-white/30"
              >
                <FiChevronRight className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { showcaseScreens };
