import React, { useEffect, useRef } from 'react';
import { X, Sparkles } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface MeditateModalProps {
  onClose: () => void;
}

export const MeditateModal: React.FC<MeditateModalProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { t } = useLanguage();
  const { isDay } = useTheme();

  useEffect(() => {
    soundEngine.startAmbientDrone(10);
    let frameId: number;
    let angle = 0;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = isDay ? '#f5efe6' : '#0d0907';
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(angle);

      // Render Expanding Golden Sacred Spiral
      ctx.strokeStyle = isDay ? 'rgba(184, 134, 11, 0.6)' : 'rgba(212, 175, 55, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < 300; i++) {
        const a = 0.1 * i;
        const r = 1.8 * a;
        const x = r * Math.cos(a);
        const y = r * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Concentric circles geometric balance overlay
      ctx.strokeStyle = isDay ? 'rgba(184, 134, 11, 0.25)' : 'rgba(212, 175, 55, 0.15)';
      ctx.beginPath();
      ctx.arc(0, 0, 60, 0, Math.PI * 2);
      ctx.arc(0, 0, 110, 0, Math.PI * 2);
      ctx.stroke();

      // Bouncing Peaceful Ball of Pure Consciousness
      const orbX = Math.cos(angle * 2) * 80;
      const orbY = Math.sin(angle * 1.5) * 80;

      ctx.fillStyle = isDay ? '#8c6508' : '#f5deb3';
      ctx.shadowColor = isDay ? '#b8860b' : '#d4af37';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(orbX, orbY, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      angle += 0.008;
      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
      soundEngine.stopAmbientDrone();
    };
  }, [isDay]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl select-none transition-colors duration-300 ${
        isDay ? 'bg-[#f8f4eb]/90' : 'bg-[#0d0907]/95'
      }`}
    >
      <div
        className={`relative w-full max-w-md rounded-2xl border-2 p-6 flex flex-col items-center transition-all ${
          isDay
            ? 'bg-[#f8f4eb] border-[#b8860b]/40 text-[#2c2017] shadow-[0_0_60px_rgba(184,134,11,0.2)]'
            : 'bg-[#0d0907] border-[#d4af37]/40 text-[#d4af37] shadow-[0_0_60px_rgba(212,175,55,0.25)]'
        }`}
      >
        {/* Header with Title and Close Button */}
        <div
          className={`w-full flex items-center justify-between border-b pb-3 mb-4 shrink-0 ${
            isDay ? 'border-[#b8860b]/30' : 'border-[#d4af37]/30'
          }`}
        >
          <div className={`flex items-center space-x-2 ${isDay ? 'text-[#b8860b]' : 'text-[#d4af37]'}`}>
            <Sparkles className="w-5 h-5 shrink-0" />
            <h2 className="text-sm font-cinzel font-bold tracking-[0.2em] uppercase">{t.meditateTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full border transition-all shrink-0 active:scale-95 ${
              isDay
                ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#8c6508] hover:bg-[#b8860b]/20'
                : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/20'
            }`}
            title="Fechar / Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className={`text-xs text-center font-serif italic mb-4 max-w-xs leading-relaxed ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/80'}`}>
          {t.meditateQuote}
        </p>

        {/* Canvas Meditation Visualizer */}
        <canvas
          ref={canvasRef}
          width={360}
          height={360}
          className={`w-full max-w-[320px] h-auto aspect-square rounded-xl border shadow-inner my-2 ${
            isDay ? 'border-[#b8860b]/30 bg-[#f5efe6]' : 'border-[#d4af37]/30 bg-[#0d0907]'
          }`}
        />

        <p className={`text-[11px] font-mono mt-4 text-center tracking-widest ${isDay ? 'text-[#8c6508]' : 'text-[#d4af37]/80'}`}>
          {t.droneActive}
        </p>
      </div>
    </div>
  );
};
