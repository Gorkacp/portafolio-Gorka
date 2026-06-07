"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, Volume2, Youtube, Zap, Monitor, Terminal,
  ExternalLink, Github, ChevronRight, Cpu, Headphones,
  Globe, Code2, Server, Database, Layers, MessageSquare,
  Wifi, WifiOff, Play, Clock, ArrowLeft, Star,
  Eye, ChevronDown, Menu, LayoutDashboard,
  FileText, Settings, CheckCircle, Activity,
  AlertCircle, Music, Radio, AudioWaveformIcon,
  Bot, BrainCircuit, Speech
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTranslation } from "@/utils/translations";
import { useLanguage } from "@/contexts/LanguageContext";

const JarvisIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

export default function JarvisDetailClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { language } = useLanguage();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const translations = {
    project_title: getTranslation(language, "JarvisProjectDetail.project_title"),
    project_subtitle: getTranslation(language, "JarvisProjectDetail.project_subtitle"),
    project_type: getTranslation(language, "JarvisProjectDetail.project_type"),
    project_description: getTranslation(language, "JarvisProjectDetail.project_description"),
    status: getTranslation(language, "JarvisProjectDetail.status"),
    status_in_progress: getTranslation(language, "JarvisProjectDetail.status_in_progress"),
    security: getTranslation(language, "JarvisProjectDetail.security"),
    application: getTranslation(language, "JarvisProjectDetail.application"),
    tabs: {
      overview: getTranslation(language, "JarvisProjectDetail.tabs.overview"),
      features: getTranslation(language, "JarvisProjectDetail.tabs.features"),
      tech: getTranslation(language, "JarvisProjectDetail.tabs.tech"),
      architecture: getTranslation(language, "JarvisProjectDetail.tabs.architecture"),
      modes: getTranslation(language, "JarvisProjectDetail.tabs.modes"),
    },
    what_does_project_do: getTranslation(language, "JarvisProjectDetail.what_does_project_do"),
    overview_description: getTranslation(language, "JarvisProjectDetail.overview_description"),
    two_modes: getTranslation(language, "JarvisProjectDetail.two_modes"),
    voice_mode: getTranslation(language, "JarvisProjectDetail.voice_mode"),
    voice_mode_desc: getTranslation(language, "JarvisProjectDetail.voice_mode_desc"),
    web_mode: getTranslation(language, "JarvisProjectDetail.web_mode"),
    web_mode_desc: getTranslation(language, "JarvisProjectDetail.web_mode_desc"),
    key_capabilities: getTranslation(language, "JarvisProjectDetail.key_capabilities"),
    features_title: getTranslation(language, "JarvisProjectDetail.features_title"),
    features_subtitle: getTranslation(language, "JarvisProjectDetail.features_subtitle"),
    tech_title: getTranslation(language, "JarvisProjectDetail.tech_title"),
    tech_subtitle: getTranslation(language, "JarvisProjectDetail.tech_subtitle"),
    backend: getTranslation(language, "JarvisProjectDetail.backend"),
    voice_audio: getTranslation(language, "JarvisProjectDetail.voice_audio"),
    frontend: getTranslation(language, "JarvisProjectDetail.frontend"),
    architecture_title: getTranslation(language, "JarvisProjectDetail.architecture_title"),
    architecture_subtitle: getTranslation(language, "JarvisProjectDetail.architecture_subtitle"),
    modes_title: getTranslation(language, "JarvisProjectDetail.modes_title"),
    modes_subtitle: getTranslation(language, "JarvisProjectDetail.modes_subtitle"),
    learnings_title: getTranslation(language, "JarvisProjectDetail.learnings_title"),
  };

  const capabilities = [
    getTranslation(language, "JarvisProjectDetail.capability_1"),
    getTranslation(language, "JarvisProjectDetail.capability_2"),
    getTranslation(language, "JarvisProjectDetail.capability_3"),
    getTranslation(language, "JarvisProjectDetail.capability_4"),
    getTranslation(language, "JarvisProjectDetail.capability_5"),
    getTranslation(language, "JarvisProjectDetail.capability_6"),
  ];

  const tabs = [
    { id: "overview", label: translations.tabs.overview, icon: <Eye className="w-4 h-4" /> },
    { id: "features", label: translations.tabs.features, icon: <Zap className="w-4 h-4" /> },
    { id: "tech", label: translations.tabs.tech, icon: <Code2 className="w-4 h-4" /> },
    { id: "architecture", label: translations.tabs.architecture, icon: <Layers className="w-4 h-4" /> },
    { id: "modes", label: translations.tabs.modes, icon: <Monitor className="w-4 h-4" /> },
  ];

  const techStack = {
    backend: [
      { name: "FastAPI", icon: <Server className="w-3 h-3 md:w-4 md:h-4" />, color: "text-green-400", purpose: getTranslation(language, "JarvisProjectDetail.fastapi_purpose"), mobilePurpose: getTranslation(language, "JarvisProjectDetail.fastapi_mobile") },
      { name: "Ollama", icon: <BrainCircuit className="w-3 h-3 md:w-4 md:h-4" />, color: "text-purple-400", purpose: getTranslation(language, "JarvisProjectDetail.ollama_purpose"), mobilePurpose: getTranslation(language, "JarvisProjectDetail.ollama_mobile") },
      { name: "SQLite", icon: <Database className="w-3 h-3 md:w-4 md:h-4" />, color: "text-blue-400", purpose: getTranslation(language, "JarvisProjectDetail.sqlite_purpose"), mobilePurpose: getTranslation(language, "JarvisProjectDetail.sqlite_mobile") },
      { name: "psutil", icon: <Activity className="w-3 h-3 md:w-4 md:h-4" />, color: "text-cyan-400", purpose: getTranslation(language, "JarvisProjectDetail.psutil_purpose"), mobilePurpose: getTranslation(language, "JarvisProjectDetail.psutil_mobile") },
      { name: "yt-dlp", icon: <Music className="w-3 h-3 md:w-4 md:h-4" />, color: "text-red-400", purpose: getTranslation(language, "JarvisProjectDetail.ytdlp_purpose"), mobilePurpose: getTranslation(language, "JarvisProjectDetail.ytdlp_mobile") },
      { name: "mpv", icon: <Play className="w-3 h-3 md:w-4 md:h-4" />, color: "text-yellow-400", purpose: getTranslation(language, "JarvisProjectDetail.mpv_purpose"), mobilePurpose: getTranslation(language, "JarvisProjectDetail.mpv_mobile") },
    ],
    voice_audio: [
      { name: "Vosk", icon: <Mic className="w-3 h-3 md:w-4 md:h-4" />, color: "text-blue-400", purpose: getTranslation(language, "JarvisProjectDetail.vosk_purpose"), mobilePurpose: getTranslation(language, "JarvisProjectDetail.vosk_mobile") },
      { name: "sounddevice", icon: <AudioWaveformIcon className="w-3 h-3 md:w-4 md:h-4" />, color: "text-green-400", purpose: getTranslation(language, "JarvisProjectDetail.sounddevice_purpose"), mobilePurpose: getTranslation(language, "JarvisProjectDetail.sounddevice_mobile") },
      { name: "pyttsx3", icon: <Volume2 className="w-3 h-3 md:w-4 md:h-4" />, color: "text-purple-400", purpose: getTranslation(language, "JarvisProjectDetail.pyttsx3_purpose"), mobilePurpose: getTranslation(language, "JarvisProjectDetail.pyttsx3_mobile") },
    ],
    frontend: [
      { name: "Tailwind CSS", icon: <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.1 0 2-.9 2-2 0-.28-.06-.54-.16-.78-.2-.5-.05-1.07.36-1.42.41-.36.99-.46 1.49-.24.38.17.79.26 1.21.26 2.76 0 5-2.24 5-5C22 6.49 17.51 2 12 2z"/></svg>, color: "text-cyan-400", purpose: getTranslation(language, "JarvisProjectDetail.tailwind_purpose"), mobilePurpose: getTranslation(language, "JarvisProjectDetail.tailwind_mobile") },
    ],
  };

  const architectureFeatures = [
    getTranslation(language, "JarvisProjectDetail.arch_feature_1"),
    getTranslation(language, "JarvisProjectDetail.arch_feature_2"),
    getTranslation(language, "JarvisProjectDetail.arch_feature_3"),
    getTranslation(language, "JarvisProjectDetail.arch_feature_4"),
    getTranslation(language, "JarvisProjectDetail.arch_feature_5"),
    getTranslation(language, "JarvisProjectDetail.arch_feature_6"),
    getTranslation(language, "JarvisProjectDetail.arch_feature_7"),
    getTranslation(language, "JarvisProjectDetail.arch_feature_8"),
    getTranslation(language, "JarvisProjectDetail.arch_feature_9"),
    getTranslation(language, "JarvisProjectDetail.arch_feature_10"),
  ];

  const renderTechCategory = (title, items) => (
    <div>
      <h3 className="text-sm md:text-base font-semibold text-white mb-3 md:mb-4">{title}</h3>
      <div className="grid grid-cols-1 gap-2 md:gap-3">
        {items.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
          >
            <div className={`${tech.color} w-6 h-6 md:w-8 md:h-8 flex items-center justify-center`}>
              {tech.icon}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs md:text-sm font-semibold text-white block truncate">{tech.name}</span>
              <span className="text-[10px] md:text-xs text-gray-400 block truncate">
                {isMobile ? tech.mobilePurpose : tech.purpose}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 md:space-y-12"
          >
            <section>
              <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <Bot className="w-5 h-5 md:w-7 md:h-7 text-purple-400" />
                {translations.what_does_project_do}
              </h2>
              <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
                {translations.overview_description}
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <Star className="w-5 h-5 md:w-7 md:h-7 text-yellow-400" />
                {translations.key_capabilities}
              </h2>
              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                {capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 md:p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                    </div>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{cap}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <Monitor className="w-5 h-5 md:w-7 md:h-7 text-blue-400" />
                {translations.two_modes}
              </h2>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Terminal className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                    <h3 className="text-base md:text-lg font-bold text-white">{translations.voice_mode}</h3>
                  </div>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{translations.voice_mode_desc}</p>
                </div>
                <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Globe className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                    <h3 className="text-base md:text-lg font-bold text-white">{translations.web_mode}</h3>
                  </div>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{translations.web_mode_desc}</p>
                </div>
              </div>
            </section>
          </motion.div>
        );

      case "features":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">{translations.features_title}</h2>
              <p className="text-gray-400 text-sm md:text-base">{translations.features_subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { icon: <Mic className="w-5 h-5 md:w-7 md:h-7" />, title: "Reconocimiento Voz Offline", desc: "Vosk con modelo español, funciona sin internet", gradient: "from-blue-500/20 to-cyan-500/20", color: "text-blue-400" },
                { icon: <BrainCircuit className="w-5 h-5 md:w-7 md:h-7" />, title: "LLM Local", desc: "Qwen 2.5 via Ollama para respuestas inteligentes", gradient: "from-purple-500/20 to-pink-500/20", color: "text-purple-400" },
                { icon: <Volume2 className="w-5 h-5 md:w-7 md:h-7" />, title: "Texto a Voz Offline", desc: "pyttsx3 con SAPI5, sin depender de la nube", gradient: "from-green-500/20 to-emerald-500/20", color: "text-green-400" },
                { icon: <Zap className="w-5 h-5 md:w-7 md:h-7" />, title: "Acciones Rápidas", desc: "Hora, clima, apps, búsquedas en sub-100ms", gradient: "from-yellow-500/20 to-orange-500/20", color: "text-yellow-400" },
                { icon: <Music className="w-5 h-5 md:w-7 md:h-7" />, title: "YouTube Integrado", desc: "Reproduce música con yt-dlp + mpv", gradient: "from-red-500/20 to-rose-500/20", color: "text-red-400" },
                { icon: <Radio className="w-5 h-5 md:w-7 md:h-7" />, title: "Detección Palmadas", desc: "Activa/desactiva el asistente con palmadas", gradient: "from-indigo-500/20 to-violet-500/20", color: "text-indigo-400" },
              ].map((feat, i) => (
                <div
                  key={i}
                  className={`p-4 md:p-6 rounded-xl bg-gradient-to-br ${feat.gradient} border border-white/10 hover:border-white/20 transition-all`}
                >
                  <div className={`${feat.color} mb-3`}>{feat.icon}</div>
                  <h3 className="text-sm md:text-base font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case "tech":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 md:space-y-12"
          >
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">{translations.tech_title}</h2>
              <p className="text-gray-400 text-sm md:text-base">{translations.tech_subtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {renderTechCategory(translations.backend, techStack.backend)}
              {renderTechCategory(translations.voice_audio, techStack.voice_audio)}
              {renderTechCategory(translations.frontend, techStack.frontend)}
            </div>
          </motion.div>
        );

      case "architecture":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">{translations.architecture_title}</h2>
              <p className="text-gray-400 text-sm md:text-base">{translations.architecture_subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              {architectureFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 md:p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10"
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Cpu className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                  </div>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{feat}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case "modes":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">{translations.modes_title}</h2>
              <p className="text-gray-400 text-sm md:text-base">{translations.modes_subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 via-purple-900/10 to-blue-900/20 border border-purple-500/20">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                    <Terminal className="w-5 h-5 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-bold text-white">{translations.voice_mode}</h3>
                    <p className="text-gray-400 text-xs md:text-sm">{translations.voice_mode_desc}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <Mic className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300 text-sm">Activación por voz o palmadas</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <MessageSquare className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300 text-sm">Conversaciones naturales con LLM local</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">Acciones rápidas manos libres</span>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 via-blue-900/10 to-cyan-900/20 border border-blue-500/20">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                    <Globe className="w-5 h-5 md:w-7 md:h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-bold text-white">{translations.web_mode}</h3>
                    <p className="text-gray-400 text-xs md:text-sm">{translations.web_mode_desc}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <LayoutDashboard className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300 text-sm">Monitor de sistema en tiempo real</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <FileText className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">Transcripción de voz en vivo</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-300 text-sm">Chat tipo ChatGPT con historial</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black text-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className={`relative ${isMobile ? 'pt-8' : 'py-6 md:py-12 lg:py-20'} overflow-hidden`}>
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent" />
        <div className="absolute -top-10 -right-10 w-48 h-48 md:-top-20 md:-right-20 md:w-96 md:h-96 bg-purple-500/5 rounded-full blur-xl md:blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 md:-bottom-20 md:-left-20 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-xl md:blur-3xl" />

        <div className="relative max-w-[1400px] mx-auto px-3 md:px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            <div className="space-y-6 md:space-y-8 lg:order-1">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Bot className="w-5 h-5 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
                      {translations.project_title}
                    </h1>
                    <p className="text-gray-400 text-sm md:text-lg lg:text-xl mt-1 md:mt-2">
                      {translations.project_subtitle}
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 border border-amber-400/30 backdrop-blur-sm">
                  <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-amber-400" />
                  <span className="text-xs md:text-sm font-semibold">{translations.project_type}</span>
                  <span className="text-[10px] md:text-xs text-amber-300 px-1.5 py-0.5 md:px-2 md:py-0.5 bg-black/30 rounded">{translations.status_in_progress}</span>
                </div>

                <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed md:leading-relaxed">
                  {translations.project_description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 md:gap-3 lg:gap-4">
                <div className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-center">
                  <div className="text-lg md:text-2xl lg:text-3xl font-bold text-purple-400">100%</div>
                  <div className="text-[10px] md:text-xs text-gray-400 mt-1">Local</div>
                </div>
                <div className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-center">
                  <div className="text-lg md:text-2xl lg:text-3xl font-bold text-blue-400">&lt;100</div>
                  <div className="text-[10px] md:text-xs text-gray-400 mt-1">ms acciones</div>
                </div>
                <div className="p-3 md:p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-center">
                  <div className="text-lg md:text-2xl lg:text-3xl font-bold text-cyan-400">2</div>
                  <div className="text-[10px] md:text-xs text-gray-400 mt-1">Modos</div>
                </div>
              </div>
            </div>

            <div className="lg:order-2 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/img/Jarvis.svg"
                  alt="JARVIS Assistant"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs md:text-sm font-medium text-white">Sistema Activo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Tab Navigation */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-3 md:px-6">
          {isMobile ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center justify-between w-full py-3 px-4 text-sm font-medium text-white"
              >
                <span className="flex items-center gap-2">
                  {tabs.find(t => t.id === activeTab)?.icon}
                  {tabs.find(t => t.id === activeTab)?.label}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-50"
                  >
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setIsMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                          activeTab === tab.id ? 'bg-purple-500/20 text-purple-300' : 'text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        {tab.icon}
                        {tab.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex gap-1 py-3 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tab Content */}
      <section className="py-8 md:py-16">
        <div className="max-w-[1400px] mx-auto px-3 md:px-6">
          {renderTabContent()}
        </div>
      </section>

      {/* Navigation */}
      <section className="pb-8 md:pb-16">
        <div className="max-w-[1400px] mx-auto px-3 md:px-6">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <motion.a
              href="https://github.com/Gorkacp/JARVIS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 md:gap-3 px-5 md:px-8 py-3 md:py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold text-sm md:text-base hover:from-purple-700 hover:to-cyan-700 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4 md:w-5 md:h-5" />
              Código Fuente
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            </motion.a>
            <motion.button
              onClick={() => { router.push('/#projects') }}
              className="inline-flex items-center justify-center gap-2 md:gap-3 px-5 md:px-8 py-3 md:py-4 rounded-xl bg-white/5 border border-white/20 text-white font-semibold text-sm md:text-base hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              Volver a Proyectos
            </motion.button>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <Footer />
    </div>
  );
}
