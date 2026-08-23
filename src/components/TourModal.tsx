import React, { useState } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  BookOpen,
  Gamepad2,
  Zap,
  Flame,
  Wind,
  Droplets,
  Shield,
  EyeOff,
  Music,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { soundEngine } from '../audio/soundEngine';
import { LanguageSelector } from './LanguageSelector';

interface TourModalProps {
  onClose: () => void;
}

export const TourModal: React.FC<TourModalProps> = ({ onClose }) => {
  const { t, language } = useLanguage();
  const { isDay } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = 6;

  const handleNext = () => {
    soundEngine.playPaddleHit();
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    soundEngine.playPaddleHit();
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleJumpToStep = (index: number) => {
    soundEngine.playPaddleHit();
    setCurrentStep(index);
  };

  const handleComplete = () => {
    soundEngine.playAbideActivation();
    try {
      localStorage.setItem('abide_first_run_tour_seen_v1', 'true');
    } catch {
      // ignore
    }
    onClose();
  };

  const handleSkip = () => {
    try {
      localStorage.setItem('abide_first_run_tour_seen_v1', 'true');
    } catch {
      // ignore
    }
    onClose();
  };

  // Step definition details with gospel wisdom and mechanics
  const steps = [
    {
      stepNumber: 1,
      title: t.tourStep1Title,
      quote: t.tourStep1Quote,
      desc: t.tourStep1Desc,
      mechanic: t.tourStep1Mechanic,
      icon: BookOpen,
      badgeColor: isDay ? 'border-[#b8860b] text-[#b8860b]' : 'border-[#d4af37] text-[#d4af37]',
      visual: (
        <div
          className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-2 ${
            isDay ? 'bg-[#ede4d4]/90 border-[#b8860b]/30' : 'bg-[#1a140f]/90 border-[#d4af37]/30'
          }`}
        >
          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-500 font-bold">
              ⌨️ ← / →
            </span>
            <span>ou</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-500 font-bold">
              🖱️ Mouse / Touch 📱
            </span>
          </div>
          <div className="w-44 h-3.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 shadow-[0_0_12px_rgba(212,175,55,0.6)] flex items-center justify-center text-[9px] font-mono text-black font-bold tracking-widest uppercase">
            {language === 'pt' ? 'TAPETE SAGRADO' : 'SACRED RUG'}
          </div>
        </div>
      )
    },
    {
      stepNumber: 2,
      title: t.tourStep2Title,
      quote: t.tourStep2Quote,
      desc: t.tourStep2Desc,
      mechanic: t.tourStep2Mechanic,
      icon: Gamepad2,
      badgeColor: isDay ? 'border-amber-600 text-amber-700' : 'border-amber-400 text-amber-300',
      visual: (
        <div
          className={`p-3 rounded-xl border flex items-center justify-around ${
            isDay ? 'bg-[#ede4d4]/90 border-[#b8860b]/30' : 'bg-[#1a140f]/90 border-[#d4af37]/30'
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 via-amber-300 to-yellow-100 shadow-[0_0_15px_rgba(251,191,36,0.8)] flex items-center justify-center text-xs font-bold text-black border border-white">
              🎳
            </div>
            <span className="text-[9px] font-mono mt-1 text-center font-bold">
              {language === 'pt' ? 'Bola Cósmica' : 'Cosmic Ball'}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/40 border border-indigo-400 flex items-center justify-center font-mono font-bold text-indigo-300">
              ☁️
            </div>
            <span className="text-[9px] font-mono mt-1 text-center">
              {language === 'pt' ? 'Bloco Dimenúvel' : 'Cloud Block'}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-7 h-7 rounded-lg bg-amber-500/30 border border-amber-400 flex items-center justify-center font-mono font-bold text-amber-300">
              🏆
            </div>
            <span className="text-[9px] font-mono mt-1 text-center font-bold text-amber-400">
              {language === 'pt' ? 'Pino Sagrado' : 'Sacred Pin'}
            </span>
          </div>
        </div>
      )
    },
    {
      stepNumber: 3,
      title: t.tourStep3Title,
      quote: t.tourStep3Quote,
      desc: t.tourStep3Desc,
      mechanic: t.tourStep3Mechanic,
      icon: Zap,
      badgeColor: isDay ? 'border-yellow-600 text-yellow-700' : 'border-yellow-400 text-yellow-300',
      visual: (
        <div
          className={`p-2.5 rounded-xl border flex flex-col space-y-1.5 ${
            isDay ? 'bg-[#ede4d4]/90 border-[#b8860b]/30' : 'bg-[#1a140f]/90 border-[#d4af37]/30'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="font-bold text-amber-400 flex items-center space-x-1">
              <Sparkles className="w-3 h-3 animate-spin text-amber-400" />
              <span>{language === 'pt' ? 'MEDIDOR DE ABIDA: 100%' : 'ABIDE METER: 100%'}</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-amber-500 text-black font-bold uppercase text-[9px] animate-pulse">
              {language === 'pt' ? 'MODO ABIDA ATIVO' : 'ABIDE MODE ACTIVE'}
            </span>
          </div>
          <div className="w-full h-2.5 bg-black/40 rounded-full border border-amber-400/50 overflow-hidden p-0.5">
            <div className="w-full h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse" />
          </div>
          <p className="text-[10px] font-mono text-center opacity-85">
            {language === 'pt'
              ? '✨ O Tapete se expande, o tempo abranda e dobra a pontuação!'
              : '✨ Rug expands, softens speed and doubles scoring!'}
          </p>
        </div>
      )
    },
    {
      stepNumber: 4,
      title: t.tourStep4Title,
      quote: t.tourStep4Quote,
      desc: t.tourStep4Desc,
      mechanic: t.tourStep4Mechanic,
      icon: Music,
      badgeColor: isDay ? 'border-sky-600 text-sky-700' : 'border-sky-400 text-sky-300',
      visual: (
        <div
          className={`p-2 rounded-xl border flex flex-col space-y-1.5 ${
            isDay ? 'bg-[#ede4d4]/90 border-[#b8860b]/30' : 'bg-[#1a140f]/90 border-[#d4af37]/30'
          }`}
        >
          <div className="flex items-center justify-center space-x-1.5">
            {[
              { vowel: 'I', hz: '523Hz', color: 'border-rose-400 text-rose-400 bg-rose-500/20' },
              { vowel: 'E', hz: '440Hz', color: 'border-sky-400 text-sky-400 bg-sky-500/20' },
              { vowel: 'O', hz: '329Hz', color: 'border-emerald-400 text-emerald-400 bg-emerald-500/20' },
              { vowel: 'U', hz: '220Hz', color: 'border-purple-400 text-purple-400 bg-purple-500/20' },
              { vowel: 'A', hz: '659Hz', color: 'border-amber-400 text-amber-400 bg-amber-500/20' }
            ].map(v => (
              <div
                key={v.vowel}
                className={`flex flex-col items-center px-1.5 py-0.5 rounded-lg border font-mono font-bold text-[11px] shadow-sm ${v.color}`}
              >
                <span>{v.vowel}</span>
                <span className="text-[7px] opacity-80">{v.hz}</span>
              </div>
            ))}
          </div>
          <div className="text-center text-[9px] font-mono text-amber-400 font-bold">
            {language === 'pt' ? '⚡ Bônus: +500 PTS & Surto de Abida' : '⚡ Bonus: +500 PTS & Abide Surge'}
          </div>
        </div>
      )
    },
    {
      stepNumber: 5,
      title: t.tourStep5Title,
      quote: t.tourStep5Quote,
      desc: t.tourStep5Desc,
      mechanic: t.tourStep5Mechanic,
      icon: Flame,
      badgeColor: isDay ? 'border-rose-600 text-rose-700' : 'border-rose-400 text-rose-300',
      visual: (
        <div
          className={`p-2 rounded-xl border flex flex-col space-y-1.5 ${
            isDay ? 'bg-[#ede4d4]/90 border-[#b8860b]/30' : 'bg-[#1a140f]/90 border-[#d4af37]/30'
          }`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[9px] font-mono">
            <div className="flex items-center space-x-1 p-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <Flame className="w-3 h-3 shrink-0" />
              <span>{language === 'pt' ? 'Fogo: Fura' : 'Fire: Pierce'}</span>
            </div>
            <div className="flex items-center space-x-1 p-1 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
              <Wind className="w-3 h-3 shrink-0" />
              <span>{language === 'pt' ? 'Ar: Veloz' : 'Air: Speed'}</span>
            </div>
            <div className="flex items-center space-x-1 p-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Droplets className="w-3 h-3 shrink-0" />
              <span>{language === 'pt' ? 'Água: Amplo' : 'Water: Wide'}</span>
            </div>
            <div className="flex items-center space-x-1 p-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Shield className="w-3 h-3 shrink-0" />
              <span>{language === 'pt' ? 'Terra: Salva' : 'Earth: Save'}</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-1.5 p-1 rounded-lg bg-purple-950/40 border border-purple-500/40 text-purple-300 text-[8.5px] font-mono">
            <EyeOff className="w-3 h-3 text-purple-400 shrink-0" />
            <span>{language === 'pt' ? '⚠️ Ilusão do Vazio: inverte controles!' : '⚠️ Void Illusion: inverts controls!'}</span>
          </div>
        </div>
      )
    },
    {
      stepNumber: 6,
      title: t.tourStep6Title,
      quote: t.tourStep6Quote,
      desc: t.tourStep6Desc,
      mechanic: t.tourStep6Mechanic,
      icon: Sparkles,
      badgeColor: isDay ? 'border-amber-600 text-amber-700' : 'border-[#d4af37] text-[#d4af37]',
      visual: (
        <div
          className={`p-3 rounded-xl border flex items-center justify-around text-center ${
            isDay ? 'bg-[#ede4d4]/90 border-[#b8860b]/30' : 'bg-[#1a140f]/90 border-[#d4af37]/30'
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="text-xl">♾️</span>
            <span className="text-[9px] font-mono font-bold mt-1 text-amber-400">
              {language === 'pt' ? 'Modo Infinito' : 'Endless Mode'}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl">🧘</span>
            <span className="text-[9px] font-mono font-bold mt-1 text-sky-400">
              {language === 'pt' ? 'Meditação Guiada' : 'Guided Meditation'}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl">🎵</span>
            <span className="text-[9px] font-mono font-bold mt-1 text-emerald-400">
              {language === 'pt' ? 'Solfeggio 432/528Hz' : 'Solfeggio 432/528Hz'}
            </span>
          </div>
        </div>
      )
    }
  ];

  const current = steps[currentStep];
  const StepIcon = current.icon;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-2xl select-none transition-colors duration-300 ${
        isDay ? 'bg-[#f8f4eb]/95' : 'bg-[#0d0907]/95'
      }`}
    >
      <div
        className={`relative w-full max-w-xl max-h-[88vh] sm:max-h-[84vh] rounded-2xl border-2 p-4 sm:p-5 flex flex-col shadow-2xl overflow-hidden transition-all ${
          isDay
            ? 'bg-[#f8f4eb] border-[#b8860b]/40 text-[#2c2017] shadow-[0_0_60px_rgba(184,134,11,0.25)]'
            : 'bg-[#0d0907] border-[#d4af37]/40 text-[#d4af37] shadow-[0_0_60px_rgba(212,175,55,0.3)]'
        }`}
      >
        {/* Top Header Bar (Fixed) */}
        <div
          className={`flex items-center justify-between border-b pb-2.5 mb-2.5 shrink-0 ${
            isDay ? 'border-[#b8860b]/30' : 'border-[#d4af37]/30'
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className={`p-1.5 rounded-lg border ${current.badgeColor}`}>
              <StepIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-cinzel font-bold tracking-[0.2em] uppercase">
                {t.tourTitle}
              </h2>
              <p className={`text-[10px] font-mono tracking-wider ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/60'}`}>
                {t.step} {currentStep + 1} {t.of} {totalSteps}
              </p>
            </div>
          </div>

          {/* Language Selector & Quick Skip Button */}
          <div className="flex items-center space-x-1.5">
            <LanguageSelector compact />
            <button
              onClick={handleSkip}
              type="button"
              className={`flex items-center justify-center border rounded-lg px-2 py-1 text-xs font-cinzel font-bold transition-all active:scale-95 cursor-pointer ${
                isDay
                  ? 'bg-[#ede4d4] border-[#b8860b]/30 text-[#2c2017] hover:bg-[#b8860b]/20'
                  : 'bg-[#1a140f] border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/20 shadow-[0_0_8px_rgba(212,175,55,0.2)]'
              }`}
              title={language === 'pt' ? 'Pular' : 'Skip'}
            >
              <span className="text-[10px] tracking-wider uppercase leading-none">{t.skipTour}</span>
            </button>
          </div>
        </div>

        {/* Step Progress Indicators (Fixed) */}
        <div className="flex items-center justify-between gap-1.5 px-0.5 mb-2.5 shrink-0">
          {steps.map((s, idx) => (
            <button
              key={s.stepNumber}
              onClick={() => handleJumpToStep(idx)}
              type="button"
              className={`flex-1 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentStep
                  ? isDay
                    ? 'bg-[#b8860b] shadow-[0_0_8px_rgba(184,134,11,0.6)]'
                    : 'bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.8)]'
                  : idx < currentStep
                  ? isDay
                    ? 'bg-[#b8860b]/50'
                    : 'bg-[#d4af37]/40'
                  : isDay
                  ? 'bg-[#ede4d4]'
                  : 'bg-[#1a140f]'
              }`}
              title={`${t.step} ${idx + 1}: ${s.title}`}
            />
          ))}
        </div>

        {/* Scrollable Step Content (Cleanly scrollable inside container) */}
        <div className="flex-1 min-h-0 overflow-y-auto space-y-2.5 pr-1 sm:pr-1.5">
          {/* Step Heading */}
          <div className="flex items-center justify-between">
            <h3
              className={`text-sm sm:text-base font-cinzel font-bold tracking-wide ${
                isDay ? 'text-[#8c6508]' : 'text-[#f5deb3]'
              }`}
            >
              {current.title}
            </h3>
            <span
              className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${current.badgeColor}`}
            >
              {currentStep + 1}/{totalSteps}
            </span>
          </div>

          {/* Gospel Quote Doctrine Block */}
          <div
            className={`p-2.5 border rounded-xl space-y-1 ${
              isDay
                ? 'bg-[#ede4d4]/90 border-[#b8860b]/40 text-[#2c2017]'
                : 'bg-[#1a140f]/90 border-[#d4af37]/40 text-[#f5deb3]'
            }`}
          >
            <div className="flex items-center space-x-1.5 text-[9px] font-cinzel font-bold tracking-widest text-[#d4af37] uppercase">
              <BookOpen className="w-3 h-3 text-[#d4af37]" />
              <span>{t.tourGospelQuoteTag}</span>
            </div>
            <p className="text-xs font-serif italic leading-relaxed text-center py-0.5">
              {current.quote}
            </p>
          </div>

          {/* Spiritual Lore & Philosophical Meaning */}
          <p className={`text-xs font-serif leading-relaxed ${isDay ? 'text-[#2c2017]' : 'text-[#f5deb3]/90'}`}>
            {current.desc}
          </p>

          {/* Visual Interactive Graphic Demonstration */}
          {current.visual}

          {/* Playfield Gameplay Mechanics Card */}
          <div
            className={`p-2.5 border rounded-xl space-y-1 ${
              isDay
                ? 'bg-[#f4ebe1] border-amber-600/30 text-[#2c2017]'
                : 'bg-[#150f0b] border-amber-500/30 text-[#f5deb3]'
            }`}
          >
            <div className="flex items-center space-x-1.5 text-[9px] font-cinzel font-bold tracking-widest text-amber-500 uppercase">
              <Gamepad2 className="w-3 h-3 text-amber-500" />
              <span>{t.tourMechanicTag}</span>
            </div>
            <p className="text-xs font-serif leading-relaxed">
              {current.mechanic}
            </p>
          </div>
        </div>

        {/* Footer Navigation Bar (Fixed at bottom, never covered) */}
        <div
          className={`flex items-center justify-between pt-2.5 mt-2.5 border-t shrink-0 ${
            isDay ? 'border-[#b8860b]/30' : 'border-[#d4af37]/30'
          }`}
        >
          {/* Previous Step Button */}
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            type="button"
            className={`flex items-center space-x-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border text-[11px] font-cinzel font-semibold tracking-wider transition-all ${
              currentStep === 0
                ? 'opacity-30 cursor-not-allowed border-transparent'
                : isDay
                ? 'bg-[#ede4d4] hover:bg-[#b8860b]/20 border-[#b8860b]/40 text-[#2c2017] cursor-pointer'
                : 'bg-[#1a140f] hover:bg-[#d4af37]/20 border-[#d4af37]/40 text-[#d4af37] cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>{t.previous}</span>
          </button>

          {/* Step numbers text in center */}
          <span className={`text-[10px] font-mono tracking-widest ${isDay ? 'text-[#634e3f]' : 'text-[#f5deb3]/60'}`}>
            {currentStep + 1} / {totalSteps}
          </span>

          {/* Next / Start Button */}
          <button
            onClick={handleNext}
            type="button"
            className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border text-[11px] font-cinzel font-bold tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm ${
              currentStep === totalSteps - 1
                ? isDay
                  ? 'bg-gradient-to-r from-[#b8860b] via-[#e5c158] to-[#b8860b] text-[#1f160e] border-[#b8860b] shadow-[0_0_10px_rgba(184,134,11,0.4)]'
                  : 'bg-gradient-to-r from-[#d4af37] via-[#f5deb3] to-[#d4af37] text-[#0d0907] border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.5)]'
                : isDay
                ? 'bg-[#ede4d4] hover:bg-[#b8860b] text-[#8c6508] hover:text-[#f8f4eb] border-[#b8860b]/50'
                : 'bg-[#1a140f] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0d0907] border-[#d4af37]/50'
            }`}
          >
            {currentStep === totalSteps - 1 ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t.startJourney}</span>
              </>
            ) : (
              <>
                <span>{t.next}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
