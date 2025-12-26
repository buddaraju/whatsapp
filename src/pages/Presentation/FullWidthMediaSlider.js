import { useState, useEffect, useRef } from "react";
import { Box, IconButton, Slider, Typography } from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
} from "@mui/icons-material";

import slideImage1 from "../../assets/images/bg-presentation.jpeg";
import slideVideo1 from "../../assets/images/video.mp4";
import "./app.css";

const AUTOPLAY_DELAY = 2000;

const slides = [
  { type: "image", src: slideImage1 },
  { type: "video", src: slideVideo1 },
  { type: "image", src: slideImage1 },
  { type: "video", src: slideVideo1 },
];

export default function FullWidthMediaSlider() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // Audio ON by default
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef(null);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const current = slides[index];

  // Handle slide changes
  useEffect(() => {
    const video = videoRef.current;

    // Stop previous video
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    // Auto-slide for images
    if (current.type === "image") {
      const timer = setTimeout(next, AUTOPLAY_DELAY);
      return () => clearTimeout(timer);
    }

    // Video slide → start playing instantly
    if (current.type === "video" && video) {
      video.muted = isMuted; // Apply default audio state
      video.play().catch(() => {}); // start instantly
      setIsPlaying(true);

      const updateTime = () => {
        setCurrentTime(video.currentTime);
        setDuration(video.duration || 0);
      };
      const onEnded = () => next();

      video.addEventListener("timeupdate", updateTime);
      video.addEventListener("ended", onEnded);

      return () => {
        video.removeEventListener("timeupdate", updateTime);
        video.removeEventListener("ended", onEnded);
      };
    }
  }, [index, isMuted]);

  // Play / Pause toggle
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) video.pause();
    else video.play();

    setIsPlaying(!isPlaying);
  };

  // Seek slider
  const handleSeek = (e, value) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = value;
    setCurrentTime(value);
  };

  // Mute / Unmute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Fullscreen
  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  // Format time
  const format = (t) =>
    isNaN(t) ? "0:00" : `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "250px", sm: "400px", md: "550px" },
        position: "relative",
        overflow: "hidden",
        pt: "56px",
      }}
    >
      {/* Image / Video */}
      {current.type === "image" ? (
        <img
          src={current.src}
          alt="slide"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
          <video
            ref={videoRef}
            src={current.src}
            playsInline
            muted={isMuted}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          {/* Controls */}
          <Box
            sx={{
              position: "absolute",
              bottom: 10,
              width: "100%",
              px: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "rgba(0,0,0,0.5)",
                p: "6px 8px",
                borderRadius: "6px",
                gap: 1,
              }}
            >
              <IconButton onClick={togglePlay} sx={{ color: "white", p: 0 }}>
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>

              <IconButton onClick={toggleMute} sx={{ color: "white", p: 0 }}>
                {isMuted ? <VolumeOff /> : <VolumeUp />}
              </IconButton>

              <Slider
                value={currentTime}
                min={0}
                max={duration}
                onChange={handleSeek}
                sx={{
                  color: "red",
                  height: 4,
                  flexGrow: 1,
                  "& .MuiSlider-thumb": { height: 12, width: 12 },
                }}
              />

              <Typography sx={{ color: "white", fontSize: "14px", whiteSpace: "nowrap" }}>
                {format(currentTime)} / {format(duration)}
              </Typography>

              <IconButton onClick={handleFullscreen} sx={{ color: "white", p: 0 }}>
                <Fullscreen />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}

      {/* Left Arrow */}
      <IconButton
        onClick={prev}
        sx={{
          position: "absolute",
          top: "50%",
          left: 20,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.4)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
      >
        <ArrowBackIos />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        onClick={next}
        sx={{
          position: "absolute",
          top: "50%",
          right: 20,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.4)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
}
