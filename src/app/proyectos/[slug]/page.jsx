"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Music, Ticket, Calendar, MapPin, Users, CreditCard, 
  Smartphone, Globe, Shield, BarChart, QrCode, Bell,
  ExternalLink, Github, ChevronRight, Zap, Target,
  Server, Database, Code2, Package, Cpu, Shield as ShieldIcon,
  ArrowLeft, Clock, CheckCircle, TrendingUp, Mail,
  Linkedin, Star, Eye, Layers, GitBranch, Cloud,
  Activity, Users as UsersIcon, DollarSign, Map,
  Code, FileCode, Terminal, Box, Lock, 
  Palette, Cpu as CpuIcon, Languages, BellRing, Download,
  LayoutDashboard, FileText, CreditCard as Card,
  ShoppingCart, Map as MapIcon, MessageSquare,
  RefreshCw, ServerCog, Database as DatabaseIcon,
  Cloud as CloudIcon, Wifi, Mail as MailIcon,
  Globe as GlobeIcon, Bell as BellIcon, ShieldCheck,
  Zap as ZapIcon, Users as UsersGroup, Settings,
  BarChart3, QrCode as QrCodeIcon, Rocket,
  Monitor, Smartphone as SmartphoneIcon, Monitor as MonitorIcon,
  FolderTree, GitBranch as GitBranchIcon, Cpu as CpuIcon2,
  FileCheck, Database as DatabaseIcon2, GitMerge,
  Wrench, Settings as SettingsIcon, Search, MessageCircle,
  Download as DownloadIcon, Smartphone as PhoneIcon,
  Smartphone as MobileIcon, Globe as WorldIcon,
  Shield as ShieldCheckIcon, Cpu as CpuIcon3,
  Smartphone as AppIcon, Bell as NotificationIcon,
  CreditCard as PaymentIcon, Map as MapIcon2,
  Users as GroupIcon, BarChart as AnalyticsIcon,
  ChevronLeft, ChevronRight as ChevronRightIcon,
  X, Maximize2, Menu, Grid3x3, ChevronDown
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTranslation } from "@/utils/translations";

// Componente para icono de café (Java)
const CoffeeIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 3H4v10a4 4 0 004 4h6a4 4 0 004-4v-3h2a2 2 0 002-2V5a2 2 0 00-2-2zm0 5h-2V5h2zM4 19h16v2H4z"/>
  </svg>
);

// Imágenes para el carrusel
const projectImages = [
  { src: "/img/GoLive.png", alt: "GoLive Dashboard Principal" },
  { src: "/img/GoLive2.png", alt: "GoLive Panel de Eventos" },
  { src: "/img/GoLive3.png", alt: "GoLive Checkout de Pago" },
  { src: "/img/GoLive4.png", alt: "GoLive Tickets QR" },
];

export default function GoLiveProjectDetail() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("es");
  const menuRef = useRef(null);
  const carouselRef = useRef(null);

  // Escuchar cambios de idioma
  useEffect(() => {
    setIsMounted(true);
    
    const handleLanguageChange = () => {
      const savedLang = localStorage.getItem("language") || "es";
      setLanguage(savedLang);
    };

    handleLanguageChange();
    
    window.addEventListener("languageChange", handleLanguageChange);
    
    const interval = setInterval(handleLanguageChange, 1000);
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Cerrar menú al hacer clic fuera
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    
    // Teclado para pantalla completa
    const handleKeyDown = (e) => {
      if (isFullscreen) {
        if (e.key === 'ArrowRight' || e.key === ' ') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') setIsFullscreen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener("languageChange", handleLanguageChange);
      clearInterval(interval);
    };
  }, [isFullscreen]);

  // Obtener traducciones
  const translations = {
    // Hero section
    project_title: getTranslation(language, "GoLiveProjectDetail.project_title"),
    project_subtitle: getTranslation(language, "GoLiveProjectDetail.project_subtitle"),
    project_type: getTranslation(language, "GoLiveProjectDetail.project_type"),
    project_description: getTranslation(language, "GoLiveProjectDetail.project_description"),
    
    // Stats
    stats_endpoints: getTranslation(language, "GoLiveProjectDetail.stats_endpoints"),
    stats_vue_components: getTranslation(language, "GoLiveProjectDetail.stats_vue_components"),
    stats_services: getTranslation(language, "GoLiveProjectDetail.stats_services"),
    stats_languages: getTranslation(language, "GoLiveProjectDetail.stats_languages"),
    stats_installable: getTranslation(language, "GoLiveProjectDetail.stats_installable"),
    stats_dashboard: getTranslation(language, "GoLiveProjectDetail.stats_dashboard"),
    
    // Buttons
    view_demo: getTranslation(language, "GoLiveProjectDetail.view_demo"),
    source_code: getTranslation(language, "GoLiveProjectDetail.source_code"),
    
    // Tech info
    demo_url: getTranslation(language, "GoLiveProjectDetail.demo_url"),
    status: getTranslation(language, "GoLiveProjectDetail.status"),
    status_active: getTranslation(language, "GoLiveProjectDetail.status_active"),
    security: getTranslation(language, "GoLiveProjectDetail.security"),
    application: getTranslation(language, "GoLiveProjectDetail.application"),
    
    // Tabs
    tabs: {
      overview: getTranslation(language, "GoLiveProjectDetail.tabs.overview"),
      features: getTranslation(language, "GoLiveProjectDetail.tabs.features"),
      tech: getTranslation(language, "GoLiveProjectDetail.tabs.tech"),
      architecture: getTranslation(language, "GoLiveProjectDetail.tabs.architecture"),
      apis: getTranslation(language, "GoLiveProjectDetail.tabs.apis"),
      demo: getTranslation(language, "GoLiveProjectDetail.tabs.demo")
    },
    
    // Overview section
    what_does_project_do: getTranslation(language, "GoLiveProjectDetail.what_does_project_do"),
    overview_description: getTranslation(language, "GoLiveProjectDetail.overview_description"),
    advanced_security: getTranslation(language, "GoLiveProjectDetail.advanced_security"),
    features_title: getTranslation(language, "GoLiveProjectDetail.features_title"),
    features_subtitle: getTranslation(language, "GoLiveProjectDetail.features_subtitle"),
    
    // Features section
    features_main_title: getTranslation(language, "GoLiveProjectDetail.features_main_title"),
    features_main_subtitle: getTranslation(language, "GoLiveProjectDetail.features_main_subtitle"),
    end_users: getTranslation(language, "GoLiveProjectDetail.end_users"),
    end_users_subtitle: getTranslation(language, "GoLiveProjectDetail.end_users_subtitle"),
    admins: getTranslation(language, "GoLiveProjectDetail.admins"),
    admins_subtitle: getTranslation(language, "GoLiveProjectDetail.admins_subtitle"),
    
    // Tech section
    tech_title: getTranslation(language, "GoLiveProjectDetail.tech_title"),
    tech_subtitle: getTranslation(language, "GoLiveProjectDetail.tech_subtitle"),
    frontend: getTranslation(language, "GoLiveProjectDetail.frontend"),
    backend: getTranslation(language, "GoLiveProjectDetail.backend"),
    infrastructure: getTranslation(language, "GoLiveProjectDetail.infrastructure"),
    
    // Architecture section
    architecture_title: getTranslation(language, "GoLiveProjectDetail.architecture_title"),
    architecture_subtitle: getTranslation(language, "GoLiveProjectDetail.architecture_subtitle"),
    frontend_layer: getTranslation(language, "GoLiveProjectDetail.frontend_layer"),
    backend_layer: getTranslation(language, "GoLiveProjectDetail.backend_layer"),
    infrastructure_layer: getTranslation(language, "GoLiveProjectDetail.infrastructure_layer"),
    
    // APIs section
    apis_title: getTranslation(language, "GoLiveProjectDetail.apis_title"),
    apis_subtitle: getTranslation(language, "GoLiveProjectDetail.apis_subtitle"),
    what_i_learned: getTranslation(language, "GoLiveProjectDetail.what_i_learned"),
    
    // Demo section
    demo_title: getTranslation(language, "GoLiveProjectDetail.demo_title"),
    demo_subtitle: getTranslation(language, "GoLiveProjectDetail.demo_subtitle"),
    test_credentials: getTranslation(language, "GoLiveProjectDetail.test_credentials"),
    email: getTranslation(language, "GoLiveProjectDetail.email"),
    password: getTranslation(language, "GoLiveProjectDetail.password"),
    available_features: getTranslation(language, "GoLiveProjectDetail.available_features"),
    access_demo: getTranslation(language, "GoLiveProjectDetail.access_demo"),
    interactive_demo: getTranslation(language, "GoLiveProjectDetail.interactive_demo"),
    note: getTranslation(language, "GoLiveProjectDetail.note"),
    functional: getTranslation(language, "GoLiveProjectDetail.functional"),
    available: getTranslation(language, "GoLiveProjectDetail.available"),
    
    // Carousel
    previous_image: getTranslation(language, "GoLiveProjectDetail.previous_image"),
    next_image: getTranslation(language, "GoLiveProjectDetail.next_image"),
    fullscreen: getTranslation(language, "GoLiveProjectDetail.fullscreen"),
    close_fullscreen: getTranslation(language, "GoLiveProjectDetail.close_fullscreen"),
    of: getTranslation(language, "GoLiveProjectDetail.of"),
    
    // Mobile menu
    select_tab: getTranslation(language, "GoLiveProjectDetail.select_tab"),
  };

  // Características destacadas con textos dinámicos
  const highlightedFeatures = [
    {
      icon: <Ticket className="w-5 h-5 md:w-7 md:h-7" />,
      title: getTranslation(language, "GoLiveProjectDetail.feature_ticket_title"),
      mobileTitle: getTranslation(language, "GoLiveProjectDetail.feature_ticket_mobile"),
      description: getTranslation(language, "GoLiveProjectDetail.feature_ticket_desc"),
      mobileDescription: getTranslation(language, "GoLiveProjectDetail.feature_ticket_mobile_desc"),
      gradient: "from-purple-500/20 to-blue-500/20",
      iconColor: "text-purple-400"
    },
    {
      icon: <PaymentIcon className="w-5 h-5 md:w-7 md:h-7" />,
      title: getTranslation(language, "GoLiveProjectDetail.feature_paypal_title"),
      mobileTitle: getTranslation(language, "GoLiveProjectDetail.feature_paypal_mobile"),
      description: getTranslation(language, "GoLiveProjectDetail.feature_paypal_desc"),
      mobileDescription: getTranslation(language, "GoLiveProjectDetail.feature_paypal_mobile_desc"),
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400"
    },
    {
      icon: <QrCodeIcon className="w-5 h-5 md:w-7 md:h-7" />,
      title: getTranslation(language, "GoLiveProjectDetail.feature_qr_title"),
      mobileTitle: getTranslation(language, "GoLiveProjectDetail.feature_qr_mobile"),
      description: getTranslation(language, "GoLiveProjectDetail.feature_qr_desc"),
      mobileDescription: getTranslation(language, "GoLiveProjectDetail.feature_qr_mobile_desc"),
      gradient: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-400"
    },
    {
      icon: <AppIcon className="w-5 h-5 md:w-7 md:h-7" />,
      title: getTranslation(language, "GoLiveProjectDetail.feature_pwa_title"),
      mobileTitle: getTranslation(language, "GoLiveProjectDetail.feature_pwa_mobile"),
      description: getTranslation(language, "GoLiveProjectDetail.feature_pwa_desc"),
      mobileDescription: getTranslation(language, "GoLiveProjectDetail.feature_pwa_mobile_desc"),
      gradient: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-400"
    },
    {
      icon: <WorldIcon className="w-5 h-5 md:w-7 md:h-7" />,
      title: getTranslation(language, "GoLiveProjectDetail.feature_multilang_title"),
      mobileTitle: getTranslation(language, "GoLiveProjectDetail.feature_multilang_mobile"),
      description: getTranslation(language, "GoLiveProjectDetail.feature_multilang_desc"),
      mobileDescription: getTranslation(language, "GoLiveProjectDetail.feature_multilang_mobile_desc"),
      gradient: "from-pink-500/20 to-rose-500/20",
      iconColor: "text-pink-400"
    },
    {
      icon: <AnalyticsIcon className="w-5 h-5 md:w-7 md:h-7" />,
      title: getTranslation(language, "GoLiveProjectDetail.feature_dashboard_title"),
      mobileTitle: getTranslation(language, "GoLiveProjectDetail.feature_dashboard_mobile"),
      description: getTranslation(language, "GoLiveProjectDetail.feature_dashboard_desc"),
      mobileDescription: getTranslation(language, "GoLiveProjectDetail.feature_dashboard_mobile_desc"),
      gradient: "from-indigo-500/20 to-violet-500/20",
      iconColor: "text-indigo-400"
    }
  ];

  // Tabs con textos dinámicos
  const tabs = [
    { id: "overview", label: translations.tabs.overview || "Resumen", icon: <Eye className="w-4 h-4" /> },
    { id: "features", label: translations.tabs.features || "Funciones", icon: <Zap className="w-4 h-4" /> },
    { id: "tech", label: translations.tabs.tech || "Tecnologías", icon: <Code2 className="w-4 h-4" /> },
    { id: "architecture", label: translations.tabs.architecture || "Arquitectura", icon: <Layers className="w-4 h-4" /> },
    { id: "apis", label: translations.tabs.apis || "APIs", icon: <Cloud className="w-4 h-4" /> },
    { id: "demo", label: translations.tabs.demo || "Demo", icon: <MonitorIcon className="w-4 h-4" /> }
  ];

  // Estadísticas principales
  const mainStats = [
    { value: "42+", label: translations.stats_endpoints || "Endpoints", icon: <Server className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />, mobileLabel: translations.stats_endpoints || "Endpoints" },
    { value: "15+", label: translations.stats_vue_components || "Componentes Vue", icon: <Code2 className="w-4 h-4 md:w-5 md:h-5 text-green-400" />, mobileLabel: translations.stats_vue_components || "Vue" },
    { value: "10+", label: translations.stats_services || "Servicios", icon: <ServerCog className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />, mobileLabel: translations.stats_services || "Servicios" },
    { value: "3", label: translations.stats_languages || "Idiomas", icon: <Globe className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />, mobileLabel: translations.stats_languages || "Idiomas" },
    { value: "PWA", label: translations.stats_installable || "Instalable", icon: <DownloadIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />, mobileLabel: translations.stats_installable || "PWA" },
    { value: "Real", label: translations.stats_dashboard || "Dashboard", icon: <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />, mobileLabel: translations.stats_dashboard || "Real-time" }
  ];

  // Funcionalidades por tipo de usuario - Optimizadas para móvil
  const userFeatures = {
    endUsers: [
      { icon: <Search className="w-3 h-3 md:w-4 md:h-4" />, text: getTranslation(language, "GoLiveProjectDetail.feature_search"), mobileText: getTranslation(language, "GoLiveProjectDetail.feature_search_mobile") },
      { icon: <Ticket className="w-3 h-3 md:w-4 md:h-4" />, text: getTranslation(language, "GoLiveProjectDetail.feature_purchase"), mobileText: getTranslation(language, "GoLiveProjectDetail.feature_purchase_mobile") },
      { icon: <CreditCard className="w-3 h-3 md:w-4 md:h-4" />, text: getTranslation(language, "GoLiveProjectDetail.feature_payment"), mobileText: getTranslation(language, "GoLiveProjectDetail.feature_payment_mobile") },
      { icon: <QrCodeIcon className="w-3 h-3 md:w-4 md:h-4" />, text: getTranslation(language, "GoLiveProjectDetail.feature_tickets"), mobileText: getTranslation(language, "GoLiveProjectDetail.feature_tickets_mobile") },
      { icon: <NotificationIcon className="w-3 h-3 md:w-4 md:h-4" />, text: getTranslation(language, "GoLiveProjectDetail.feature_notifications"), mobileText: getTranslation(language, "GoLiveProjectDetail.feature_notifications_mobile") },
      { icon: <MessageCircle className="w-3 h-3 md:w-4 md:h-4" />, text: getTranslation(language, "GoLiveProjectDetail.feature_chat"), mobileText: getTranslation(language, "GoLiveProjectDetail.feature_chat_mobile") },
      { icon: <WorldIcon className="w-3 h-3 md:w-4 md:h-4" />, text: getTranslation(language, "GoLiveProjectDetail.feature_multilanguage"), mobileText: getTranslation(language, "GoLiveProjectDetail.feature_multilanguage_mobile") },
      { icon: <DownloadIcon className="w-3 h-3 md:w-4 md:h-4" />, text: getTranslation(language, "GoLiveProjectDetail.feature_pwa"), mobileText: getTranslation(language, "GoLiveProjectDetail.feature_pwa_mobile") }
    ],
    admins: [
      { icon: <BarChart3 className="w-3 h-3 md:w-4 md:h-4" />, text: getTranslation(language, "GoLiveProjectDetail.admin_dashboard"), mobileText: getTranslation(language, "GoLiveProjectDetail.admin_dashboard_mobile") },
      { icon: <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />, text: getTranslation(language, "GoLiveProjectDetail.admin_charts"), mobileText: getTranslation(language, "GoLiveProjectDetail.admin_charts_mobile") },
      { icon: <GroupIcon className="w-3 h-3 md:w-4 md:h-4" />, text: getTranslation(language, "GoLiveProjectDetail.admin_users"), mobileText: getTranslation(language, "GoLiveProjectDetail.admin_users_mobile") },
      { icon: <Calendar className="w-3 h-3 md:w-4 md:h-4" />, text: getTranslation(language, "GoLiveProjectDetail.admin_events"), mobileText: getTranslation(language, "GoLiveProjectDetail.admin_events_mobile") },
      { icon: <Mail className="w-3 h-3 md:w-4 md:h-4" />, text: getTranslation(language, "GoLiveProjectDetail.admin_notifications"), mobileText: getTranslation(language, "GoLiveProjectDetail.admin_notifications_mobile") },
      { icon: <DollarSign className="w-3 h-3 md:w-4 md:h-4" />, text: getTranslation(language, "GoLiveProjectDetail.admin_revenue"), mobileText: getTranslation(language, "GoLiveProjectDetail.admin_revenue_mobile") },
      { icon: <FileText className="w-3 h-3 md:w-4 md:h-4" />, text: getTranslation(language, "GoLiveProjectDetail.admin_reports"), mobileText: getTranslation(language, "GoLiveProjectDetail.admin_reports_mobile") }
    ]
  };

  // APIs y servicios externos
  const externalApis = [
    {
      name: getTranslation(language, "GoLiveProjectDetail.api_paypal"),
      mobileName: getTranslation(language, "GoLiveProjectDetail.api_paypal_mobile"),
      description: getTranslation(language, "GoLiveProjectDetail.api_paypal_desc"),
      mobileDescription: getTranslation(language, "GoLiveProjectDetail.api_paypal_mobile_desc"),
      icon: <PaymentIcon className="w-4 h-4 md:w-6 md:h-6" />,
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      name: getTranslation(language, "GoLiveProjectDetail.api_sendgrid"),
      mobileName: getTranslation(language, "GoLiveProjectDetail.api_sendgrid_mobile"),
      description: getTranslation(language, "GoLiveProjectDetail.api_sendgrid_desc"),
      mobileDescription: getTranslation(language, "GoLiveProjectDetail.api_sendgrid_mobile_desc"),
      icon: <MailIcon className="w-4 h-4 md:w-6 md:h-6" />,
      color: "from-green-500/20 to-emerald-600/20"
    },
    {
      name: getTranslation(language, "GoLiveProjectDetail.api_webpush"),
      mobileName: getTranslation(language, "GoLiveProjectDetail.api_webpush_mobile"),
      description: getTranslation(language, "GoLiveProjectDetail.api_webpush_desc"),
      mobileDescription: getTranslation(language, "GoLiveProjectDetail.api_webpush_mobile_desc"),
      icon: <BellIcon className="w-4 h-4 md:w-6 md:h-6" />,
      color: "from-yellow-500/20 to-orange-600/20"
    },
    {
      name: getTranslation(language, "GoLiveProjectDetail.api_mongodb"),
      mobileName: getTranslation(language, "GoLiveProjectDetail.api_mongodb_mobile"),
      description: getTranslation(language, "GoLiveProjectDetail.api_mongodb_desc"),
      mobileDescription: getTranslation(language, "GoLiveProjectDetail.api_mongodb_mobile_desc"),
      icon: <CloudIcon className="w-4 h-4 md:w-6 md:h-6" />,
      color: "from-purple-500/20 to-pink-600/20"
    }
  ];

  // Aprendizajes y logros
  const learnings = [
    getTranslation(language, "GoLiveProjectDetail.learning_1"),
    getTranslation(language, "GoLiveProjectDetail.learning_2"),
    getTranslation(language, "GoLiveProjectDetail.learning_3"),
    getTranslation(language, "GoLiveProjectDetail.learning_4"),
    getTranslation(language, "GoLiveProjectDetail.learning_5"),
    getTranslation(language, "GoLiveProjectDetail.learning_6"),
    getTranslation(language, "GoLiveProjectDetail.learning_7"),
    getTranslation(language, "GoLiveProjectDetail.learning_8"),
    getTranslation(language, "GoLiveProjectDetail.learning_9"),
    getTranslation(language, "GoLiveProjectDetail.learning_10")
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  // Stack tecnológico completo - Optimizado para móvil
  const techStack = {
    frontend: [
      { name: "Nuxt.js 3", icon: <Code2 className="w-3 h-3 md:w-4 md:h-4" />, color: "text-purple-400", purpose: getTranslation(language, "GoLiveProjectDetail.tech_nuxt_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_nuxt_mobile") },
      { name: "Vue 3", icon: <FileCode className="w-3 h-3 md:w-4 md:h-4" />, color: "text-green-400", purpose: getTranslation(language, "GoLiveProjectDetail.tech_vue_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_vue_mobile") },
      { name: "Pinia", icon: <Database className="w-3 h-3 md:w-4 md:h-4" />, color: "text-blue-400", purpose: getTranslation(language, "GoLiveProjectDetail.tech_pinia_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_pinia_mobile") },
      { name: "Bootstrap 5", icon: <Palette className="w-3 h-3 md:w-4 md:h-4" />, color: "text-pink-400", purpose: getTranslation(language, "GoLiveProjectDetail.tech_bootstrap_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_bootstrap_mobile") },
      { name: "Chart.js", icon: <BarChart3 className="w-3 h-3 md:w-4 md:h-4" />, color: "text-yellow-400", purpose: getTranslation(language, "GoLiveProjectDetail.tech_chartjs_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_chartjs_mobile") },
      { name: "Leaflet", icon: <MapIcon2 className="w-3 h-3 md:w-4 md:h-4" />, color: "text-emerald-400", purpose: getTranslation(language, "GoLiveProjectDetail.tech_leaflet_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_leaflet_mobile") },
      { name: "Vue I18n", icon: <Languages className="w-3 h-3 md:w-4 md:h-4" />, color: "text-cyan-400", purpose: getTranslation(language, "GoLiveProjectDetail.tech_i18n_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_i18n_mobile") },
      { name: "Axios", icon: <Cloud className="w-3 h-3 md:w-4 md:h-4" />, color: "text-orange-400", purpose: getTranslation(language, "GoLiveProjectDetail.tech_axios_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_axios_mobile") }
    ],
    backend: [
      { name: "Spring Boot 3", icon: <ServerCog className="w-3 h-3 md:w-4 md:h-4" />, color: "text-green-500", purpose: getTranslation(language, "GoLiveProjectDetail.tech_spring_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_spring_mobile") },
      { name: "Java 17", icon: <CoffeeIcon className="w-3 h-3 md:w-4 md:h-4" />, color: "text-red-400", purpose: getTranslation(language, "GoLiveProjectDetail.tech_java_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_java_mobile") },
      { name: "Spring Security", icon: <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" />, color: "text-blue-500", purpose: getTranslation(language, "GoLiveProjectDetail.tech_security_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_security_mobile") },
      { name: "Spring Data", icon: <DatabaseIcon2 className="w-3 h-3 md:w-4 md:h-4" />, color: "text-emerald-500", purpose: getTranslation(language, "GoLiveProjectDetail.tech_springdata_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_springdata_mobile") },
      { name: "JWT", icon: <Lock className="w-3 h-3 md:w-4 md:h-4" />, color: "text-purple-500", purpose: getTranslation(language, "GoLiveProjectDetail.tech_jwt_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_jwt_mobile") },
      { name: "Maven", icon: <Package className="w-3 h-3 md:w-4 md:h-4" />, color: "text-orange-500", purpose: getTranslation(language, "GoLiveProjectDetail.tech_maven_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_maven_mobile") }
    ],
    database: [
      { name: "MongoDB Atlas", icon: <CloudIcon className="w-3 h-3 md:w-4 md:h-4" />, color: "text-blue-400", purpose: getTranslation(language, "GoLiveProjectDetail.tech_mongodb_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_mongodb_mobile") }
    ],
    devops: [
      { name: "Docker", icon: <Box className="w-3 h-3 md:w-4 md:h-4" />, color: "text-blue-400", purpose: getTranslation(language, "GoLiveProjectDetail.tech_docker_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_docker_mobile") },
      { name: "Docker Compose", icon: <GitMerge className="w-3 h-3 md:w-4 md:h-4" />, color: "text-purple-400", purpose: getTranslation(language, "GoLiveProjectDetail.tech_dockercompose_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_dockercompose_mobile") }
    ],
    utilities: [
      { name: "ZXing", icon: <QrCodeIcon className="w-3 h-3 md:w-4 md:h-4" />, color: "text-green-400", purpose: getTranslation(language, "GoLiveProjectDetail.tech_zxing_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_zxing_mobile") },
      { name: "PDFBox", icon: <FileText className="w-3 h-3 md:w-4 md:h-4" />, color: "text-red-400", purpose: getTranslation(language, "GoLiveProjectDetail.tech_pdfbox_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_pdfbox_mobile") },
      { name: "Web Push", icon: <BellIcon className="w-3 h-3 md:w-4 md:h-4" />, color: "text-yellow-500", purpose: getTranslation(language, "GoLiveProjectDetail.tech_webpush_purpose"), mobilePurpose: getTranslation(language, "GoLiveProjectDetail.tech_webpush_mobile") }
    ]
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black text-white overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section - Completamente responsive */}
      <section className={`relative ${isMobile ? 'pt-8' : 'py-6 md:py-12 lg:py-20'} overflow-hidden`}>
        {/* Efectos de fondo - Optimizados para móvil */}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent" />
        <div className="absolute -top-10 -right-10 w-48 h-48 md:-top-20 md:-right-20 md:w-96 md:h-96 bg-purple-500/5 rounded-full blur-xl md:blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 md:-bottom-20 md:-left-20 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-xl md:blur-3xl" />

        <div className="relative max-w-[1400px] mx-auto px-3 md:px-6">
          {/* Layout reorganizado: En desktop se mantiene igual, en móvil cambia */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            
            {/* Información Principal - Optimizada móvil */}
            <div className="space-y-6 md:space-y-8 lg:order-1">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Music className="w-5 h-5 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
                      {translations.project_title || "GoLive Platform"}
                    </h1>
                    <p className="text-gray-400 text-sm md:text-lg lg:text-xl mt-1 md:mt-2">
                      {translations.project_subtitle || "Plataforma de Venta de Entradas"}
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 border border-purple-500/30 backdrop-blur-sm">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                  <span className="text-xs md:text-sm font-semibold">{translations.project_type || "Proyecto Full Stack"}</span>
                  <span className="text-[10px] md:text-xs text-gray-400 px-1.5 py-0.5 md:px-2 md:py-0.5 bg-black/30 rounded">Spring + Nuxt</span>
                </div>

                <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed md:leading-relaxed">
                  {translations.project_description || "Solución completa y escalable para la gestión y venta de entradas para eventos musicales. Plataforma empresarial con sistema de pagos integrado, tickets QR, dashboard analítico y PWA instalable."}
                </p>
              </div>

              {/* Estadísticas - Optimizadas para móvil */}
              <div className="grid grid-cols-3 gap-2 md:grid-cols-3 md:gap-3 lg:gap-4">
                {mainStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-2 md:p-3 lg:p-4 rounded-lg md:rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-purple-500/30 transition-all group"
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center gap-1.5 md:gap-2 lg:gap-3">
                      <div className="text-purple-400 group-hover:scale-110 transition-transform">
                        {stat.icon}
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-base md:text-lg lg:text-xl xl:text-2xl font-bold leading-none">{stat.value}</div>
                        <div className="text-[10px] md:text-xs text-gray-400 truncate">
                          {isMobile ? stat.mobileLabel : stat.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Botones de Acción - Optimizados móvil */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <motion.a
                  href="https://golive-hu5d.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 md:px-6 md:py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg md:rounded-xl font-semibold flex items-center justify-center gap-2 md:gap-3 group text-sm md:text-base transition-transform"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{translations.view_demo || "Ver Demo"}</span>
                  <ChevronRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  href="https://github.com/Gorkacp/GoLive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 md:px-6 md:py-3.5 bg-white/5 border border-white/10 rounded-lg md:rounded-xl font-semibold flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base transition-transform"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{translations.source_code || "Código Fuente"}</span>
                </motion.a>
              </div>
            </div>

            {/* CARRUSEL - SOLO EN MÓVIL SE MUESTRA DESPUÉS DE LOS BOTONES */}
            <motion.div 
              className={`relative ${isMobile ? 'mt-6' : 'lg:order-2'}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              ref={carouselRef}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl md:blur-3xl rounded-full" />
              
              {/* Contenedor Principal de la Imagen */}
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-xl md:shadow-2xl shadow-purple-500/10">
                <div className="aspect-video relative bg-gradient-to-br from-gray-900 via-black to-gray-900">
                  {/* Imagen Principal */}
                  <Image
                    src={projectImages[currentImageIndex].src}
                    alt={projectImages[currentImageIndex].alt}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Overlay de gradiente sutil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  
                  {/* Botones de navegación ENCIMA DE LA IMAGEN - Siempre visibles */}
                  <div className="absolute inset-0 flex items-center justify-between px-3 md:px-4">
                    <button
                      onClick={prevImage}
                      className="p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all z-20 backdrop-blur-sm"
                      aria-label={translations.previous_image || "Imagen anterior"}
                    >
                      <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all z-20 backdrop-blur-sm"
                      aria-label={translations.next_image || "Siguiente imagen"}
                    >
                      <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                  
                  {/* Botón de pantalla completa - Visible en todos los dispositivos */}
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="absolute top-3 md:top-4 right-3 md:right-4 p-1.5 md:p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all z-20 backdrop-blur-sm"
                    aria-label={translations.fullscreen || "Pantalla completa"}
                  >
                    <Maximize2 className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>

              {/* Solo indicadores y descripción - SIN FLECHAS DEBAJO */}
              <div className="flex flex-col items-center mt-3 md:mt-4">
                {/* Indicadores del carrusel */}
                <div className="flex gap-2 md:gap-3 mb-2 md:mb-3">
                  {projectImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`rounded-full transition-all duration-300 ${
                        currentImageIndex === index 
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/50" 
                          : "bg-white/30 hover:bg-white/50"
                      } ${isMobile ? 'w-2 h-2' : 'w-2.5 h-2.5 md:w-3 md:h-3'}`}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
                
                {/* Título de la imagen actual - Optimizado móvil */}
                <div className="text-center px-2 md:px-4">
                  <p className="text-xs md:text-sm text-gray-300 font-medium truncate">
                    {isMobile 
                      ? projectImages[currentImageIndex].alt.replace("GoLive ", "")
                      : projectImages[currentImageIndex].alt
                    }
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">
                    {currentImageIndex + 1} {translations.of || "de"} {projectImages.length}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Información Técnica - Optimizada móvil */}
          <motion.div 
            className="mt-6 md:mt-8 p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20 border border-white/10 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {/* URL de la demo */}
              <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg md:rounded-xl bg-black/40 hover:bg-black/60 transition-all cursor-pointer group">
                <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg bg-gradient-to-r from-blue-500/20 to-blue-600/20 flex items-center justify-center flex-shrink-0`}>
                  <GlobeIcon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-blue-400`} />
                </div>
                <div className="overflow-hidden min-w-0">
                  <div className="text-xs text-gray-400">{translations.demo_url || "URL Demo"}</div>
                  <code className="text-xs md:text-sm text-purple-300 font-mono truncate block group-hover:text-purple-200 transition-colors">
                    golive-hu5d.onrender.com
                  </code>
                </div>
              </div>

              {/* Estado */}
              <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg md:rounded-xl bg-black/40 hover:bg-black/60 transition-all">
                <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg bg-gradient-to-r from-green-500/20 to-green-600/20 flex items-center justify-center flex-shrink-0`}>
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400 animate-pulse" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs text-gray-400">{translations.status || "Estado"}</div>
                  <div className="text-xs md:text-sm text-green-400 font-medium truncate">{translations.status_active || "Demo Activa"}</div>
                </div>
              </div>

              {/* Seguridad */}
              <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg md:rounded-xl bg-black/40 hover:bg-black/60 transition-all">
                <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg bg-gradient-to-r from-purple-500/20 to-purple-600/20 flex items-center justify-center flex-shrink-0`}>
                  <ShieldCheck className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-purple-400`} />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs text-gray-400">{translations.security || "Seguridad"}</div>
                  <div className="text-xs md:text-sm text-white truncate">JWT + Spring</div>
                </div>
              </div>

              {/* PWA */}
              <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg md:rounded-xl bg-black/40 hover:bg-black/60 transition-all">
                <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 flex items-center justify-center flex-shrink-0`}>
                  <SmartphoneIcon className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-yellow-400`} />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs text-gray-400">{translations.application || "Aplicación"}</div>
                  <div className="text-xs md:text-sm text-white truncate">PWA Instalable</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navegación por Tabs - Mejorada con menú desplegable profesional para móvil */}
      <section className="sticky top-0 z-40 bg-black/95 backdrop-blur-xl border-y border-white/10">
        <div className="max-w-[1400px] mx-auto px-3 md:px-6">
          {isMobile ? (
            // Menú desplegable profesional para móvil
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-full px-4 py-3 flex items-center justify-between rounded-lg bg-gradient-to-r from-purple-600/90 to-blue-600/90"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-white/20">
                    {tabs.find(tab => tab.id === activeTab)?.icon}
                  </div>
                  <span className="font-medium text-sm">
                    {tabs.find(tab => tab.id === activeTab)?.label}
                  </span>
                </div>
                <div className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden z-50 shadow-xl"
                  >
                    <div className="py-2">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setIsMenuOpen(false);
                          }}
                          className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                            activeTab === tab.id 
                              ? 'bg-purple-600/20 text-white' 
                              : 'hover:bg-white/5 text-gray-300'
                          }`}
                        >
                          <div className={`p-1.5 rounded ${
                            activeTab === tab.id 
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                              : 'bg-white/10'
                          }`}>
                            {tab.icon}
                          </div>
                          <span className="font-medium text-sm">{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            // Tabs normales para desktop
            <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-3 rounded-xl whitespace-nowrap transition-all flex items-center gap-2 flex-shrink-0 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contenido según Tab - Completamente responsive */}
      <section className="py-8 md:py-12 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-3 md:px-6">
          {/* Resumen */}
          {activeTab === "overview" && (
            <div className="space-y-8 md:space-y-16">
              {/* ¿Qué hace el proyecto? */}
              <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8">
                <motion.div 
                  className="space-y-4 md:space-y-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 md:w-7 md:h-7 text-purple-400" />
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">{translations.what_does_project_do || "¿Qué hace el proyecto?"}</h3>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
                    {translations.overview_description || "GoLive es una plataforma integral que permite a organizadores de eventos gestionar, promocionar y vender entradas de forma eficiente, mientras ofrece a los usuarios una experiencia de compra fluida y segura."}
                  </p>
                  <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20">
                    <ul className="space-y-2 md:space-y-3">
                      {[
                        getTranslation(language, "GoLiveProjectDetail.overview_feature_1") || "Venta de entradas online con múltiples zonas de precios",
                        getTranslation(language, "GoLiveProjectDetail.overview_feature_2") || "Panel de administración completo con analytics",
                        getTranslation(language, "GoLiveProjectDetail.overview_feature_3") || "Sistema de pagos integrado con PayPal",
                        getTranslation(language, "GoLiveProjectDetail.overview_feature_4") || "Generación automática de tickets con códigos QR",
                        getTranslation(language, "GoLiveProjectDetail.overview_feature_5") || "Notificaciones push para recordatorios",
                        getTranslation(language, "GoLiveProjectDetail.overview_feature_6") || "Chat asistente inteligente",
                        getTranslation(language, "GoLiveProjectDetail.overview_feature_7") || "Aplicación PWA instalable",
                        getTranslation(language, "GoLiveProjectDetail.overview_feature_8") || "Multiidioma (ES, EN, PT)"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 md:gap-3">
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm md:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                <motion.div 
                  className="space-y-4 md:space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheckIcon className="w-5 h-5 md:w-7 md:h-7 text-blue-400" />
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">{translations.advanced_security || "Seguridad Avanzada"}</h3>
                  </div>
                  <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      {[
                        { title: "JWT Auth", desc: getTranslation(language, "GoLiveProjectDetail.security_feature_1") || "Tokens seguros con refresh" },
                        { title: "RBAC", desc: getTranslation(language, "GoLiveProjectDetail.security_feature_2") || "Control acceso por roles" },
                        { title: "BCrypt", desc: getTranslation(language, "GoLiveProjectDetail.security_feature_3") || "Passwords con hashing" },
                        { title: "Validación", desc: getTranslation(language, "GoLiveProjectDetail.security_feature_4") || "Frontend y backend" },
                        { title: "CSRF/CORS", desc: getTranslation(language, "GoLiveProjectDetail.security_feature_5") || "Protección avanzada" },
                        { title: "HTTPS", desc: getTranslation(language, "GoLiveProjectDetail.security_feature_6") || "Comunicación segura" }
                      ].map((item, index) => (
                        <div key={index} className="p-2.5 md:p-3 rounded-lg md:rounded-xl bg-white/5">
                          <div className="font-semibold text-white text-sm md:text-base mb-1">{item.title}</div>
                          <div className="text-xs md:text-sm text-gray-400">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Características Destacadas */}
              <div className="space-y-6 md:space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                      ✨ {translations.features_title || "Características"}
                    </span>
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
                    {translations.features_subtitle || "Plataforma completa para gestión profesional de eventos"}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {highlightedFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-purple-500/30 transition-all group"
                    >
                      <div className={`${isMobile ? 'w-10 h-10' : 'w-12 md:w-14 md:h-14'} rounded-lg md:rounded-xl bg-gradient-to-r ${feature.gradient} border border-white/10 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-105 transition-transform`}>
                        <div className={feature.iconColor}>
                          {feature.icon}
                        </div>
                      </div>
                      <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
                        {isMobile ? feature.mobileTitle : feature.title}
                      </h4>
                      <p className="text-gray-400 text-sm md:text-base">
                        {isMobile ? feature.mobileDescription : feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Funcionalidades */}
          {activeTab === "features" && (
            <div className="space-y-8 md:space-y-16">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    🚀 {translations.features_main_title || "Funcionalidades"}
                  </span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
                  {translations.features_main_subtitle || "Sistema diseñado para usuarios finales y administradores"}
                </p>
              </div>

              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8">
                {/* Para Usuarios Finales */}
                <motion.div 
                  className="space-y-4 md:space-y-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg md:rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 flex items-center justify-center`}>
                      <Users className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-purple-400`} />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-semibold">{translations.end_users || "Usuarios Finales"}</h4>
                      <p className="text-gray-400 text-xs md:text-sm">{translations.end_users_subtitle || "Experiencia de compra fluida"}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20">
                    <ul className="space-y-2 md:space-y-3">
                      {userFeatures.endUsers.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-lg md:rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                          <div className="text-purple-400">
                            {feature.icon}
                          </div>
                          <span className="text-gray-300 text-sm md:text-base flex-1">
                            {isMobile ? feature.mobileText : feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Para Administradores */}
                <motion.div 
                  className="space-y-4 md:space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 flex items-center justify-center`}>
                      <SettingsIcon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-blue-400`} />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-semibold">{translations.admins || "Administradores"}</h4>
                      <p className="text-gray-400 text-xs md:text-sm">{translations.admins_subtitle || "Control completo"}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20">
                    <ul className="space-y-2 md:space-y-3">
                      {userFeatures.admins.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-lg md:rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                          <div className="text-blue-400">
                            {feature.icon}
                          </div>
                          <span className="text-gray-300 text-sm md:text-base flex-1">
                            {isMobile ? feature.mobileText : feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* Tecnologías */}
          {activeTab === "tech" && (
            <div className="space-y-8 md:space-y-16">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    🛠️ {translations.tech_title || "Tecnologías"}
                  </span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
                  {translations.tech_subtitle || "Stack tecnológico moderno y robusto"}
                </p>
              </div>

              <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6">
                {/* Frontend */}
                <motion.div 
                  className="space-y-3 md:space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center`}>
                      <SmartphoneIcon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold">{translations.frontend || "Frontend"}</h3>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    {techStack.frontend.map((tech, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-3 md:p-4 rounded-lg md:rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 md:gap-3 min-w-0">
                            <div className={tech.color}>
                              {tech.icon}
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-sm md:text-base truncate">{tech.name}</div>
                              <div className="text-xs text-gray-400 truncate">
                                {isMobile ? tech.mobilePurpose : tech.purpose}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] md:text-xs text-gray-500 flex-shrink-0">UI</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Backend */}
                <motion.div 
                  className="space-y-3 md:space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg md:rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center`}>
                      <Server className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold">{translations.backend || "Backend"}</h3>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    {techStack.backend.map((tech, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-3 md:p-4 rounded-lg md:rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 md:gap-3 min-w-0">
                            <div className={tech.color}>
                              {tech.icon}
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-sm md:text-base truncate">{tech.name}</div>
                              <div className="text-xs text-gray-400 truncate">
                                {isMobile ? tech.mobilePurpose : tech.purpose}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] md:text-xs text-gray-500 flex-shrink-0">Server</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Database & DevOps */}
                <motion.div 
                  className="space-y-3 md:space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg md:rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center`}>
                      <DatabaseIcon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold">{translations.infrastructure || "Infraestructura"}</h3>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    {[...techStack.database, ...techStack.devops, ...techStack.utilities].map((tech, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-3 md:p-4 rounded-lg md:rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 md:gap-3 min-w-0">
                            <div className={tech.color}>
                              {tech.icon}
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-sm md:text-base truncate">{tech.name}</div>
                              <div className="text-xs text-gray-400 truncate">
                                {isMobile ? tech.mobilePurpose : tech.purpose}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] md:text-xs text-gray-500 flex-shrink-0">Infra</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* Arquitectura */}
          {activeTab === "architecture" && (
            <div className="space-y-8 md:space-y-16">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    🏗️ {translations.architecture_title || "Arquitectura"}
                  </span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
                  {translations.architecture_subtitle || "Diseño escalable con separación clara"}
                </p>
              </div>

              {/* Diagrama simplificado - Responsive */}
              <div className="p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10">
                <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8">
                  {/* Frontend Layer */}
                  <div className="space-y-3 md:space-y-4">
                    <div className="p-4 md:p-6 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-900/30 to-transparent border border-blue-500/30">
                      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <SmartphoneIcon className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                        <h4 className="text-lg md:text-xl font-semibold">{translations.frontend_layer || "Frontend"}</h4>
                      </div>
                      <ul className="space-y-1.5 md:space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                          <span className="text-sm">{getTranslation(language, "GoLiveProjectDetail.arch_feature_1") || "PWA instalable"}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                          <span className="text-sm">{getTranslation(language, "GoLiveProjectDetail.arch_feature_2") || "SSR/SSG optimizado"}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                          <span className="text-sm">{getTranslation(language, "GoLiveProjectDetail.arch_feature_3") || "Pinia (State)"}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                          <span className="text-sm">{getTranslation(language, "GoLiveProjectDetail.arch_feature_4") || "Vue I18n multiidioma"}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Backend Layer */}
                  <div className="space-y-3 md:space-y-4">
                    <div className="p-4 md:p-6 rounded-lg md:rounded-xl bg-gradient-to-br from-purple-900/30 to-transparent border border-purple-500/30">
                      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <Server className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                        <h4 className="text-lg md:text-xl font-semibold">{translations.backend_layer || "Backend"}</h4>
                      </div>
                      <ul className="space-y-1.5 md:space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                          <span className="text-sm">{getTranslation(language, "GoLiveProjectDetail.arch_feature_5") || "42+ endpoints REST"}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                          <span className="text-sm">{getTranslation(language, "GoLiveProjectDetail.arch_feature_6") || "Spring Security + JWT"}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                          <span className="text-sm">{getTranslation(language, "GoLiveProjectDetail.arch_feature_7") || "Validación robusta"}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                          <span className="text-sm">{getTranslation(language, "GoLiveProjectDetail.arch_feature_8") || "Manejo excepciones"}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Database & Infrastructure */}
                  <div className="space-y-3 md:space-y-4">
                    <div className="p-4 md:p-6 rounded-lg md:rounded-xl bg-gradient-to-br from-green-900/30 to-transparent border border-green-500/30">
                      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <CloudIcon className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                        <h4 className="text-lg md:text-xl font-semibold">{translations.infrastructure_layer || "Infraestructura"}</h4>
                      </div>
                      <ul className="space-y-1.5 md:space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                          <span className="text-sm">{getTranslation(language, "GoLiveProjectDetail.arch_feature_9") || "MongoDB Atlas (Cloud)"}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                          <span className="text-sm">{getTranslation(language, "GoLiveProjectDetail.arch_feature_10") || "Docker containerización"}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                          <span className="text-sm">{getTranslation(language, "GoLiveProjectDetail.arch_feature_11") || "Docker Compose"}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                          <span className="text-sm">{getTranslation(language, "GoLiveProjectDetail.arch_feature_12") || "Variables entorno"}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Flujo de datos - Responsive */}
                <div className="mt-6 md:mt-8 p-4 md:p-6 rounded-lg md:rounded-xl bg-gradient-to-br from-gray-900/50 to-transparent border border-white/10">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center">
                      <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mx-auto mb-1.5 md:mb-2`}>
                        <SmartphoneIcon className={`${isMobile ? 'w-4 h-4' : 'w-5 md:w-6 md:h-6'}`} />
                      </div>
                      <div className="text-sm font-medium">{translations.frontend || "Frontend"}</div>
                      <div className="text-xs text-gray-400">Nuxt.js + Vue 3</div>
                    </div>
                    
                    <div className="hidden md:block">
                      <div className="flex items-center gap-2">
                        <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                        <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500" />
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg md:rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-1.5 md:mb-2`}>
                        <Server className={`${isMobile ? 'w-4 h-4' : 'w-5 md:w-6 md:h-6'}`} />
                      </div>
                      <div className="text-sm font-medium">{translations.backend || "Backend"}</div>
                      <div className="text-xs text-gray-400">Spring Boot 3</div>
                    </div>
                    
                    <div className="hidden md:block">
                      <div className="flex items-center gap-2">
                        <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-purple-500 to-green-500" />
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                        <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-green-500 to-purple-500" />
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg md:rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center mx-auto mb-1.5 md:mb-2`}>
                        <DatabaseIcon className={`${isMobile ? 'w-4 h-4' : 'w-5 md:w-6 md:h-6'}`} />
                      </div>
                      <div className="text-sm font-medium">Database</div>
                      <div className="text-xs text-gray-400">MongoDB Atlas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* APIs y Servicios */}
          {activeTab === "apis" && (
            <div className="space-y-8 md:space-y-16">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    🔌 {translations.apis_title || "APIs & Servicios"}
                  </span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
                  {translations.apis_subtitle || "Integraciones profesionales avanzadas"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {externalApis.map((api, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-purple-500/30 transition-all"
                  >
                    <div className={`${isMobile ? 'w-10 h-10' : 'w-12 md:w-14 md:h-14'} rounded-lg md:rounded-xl bg-gradient-to-r ${api.color} border border-white/10 flex items-center justify-center mb-3 md:mb-4`}>
                      {api.icon}
                    </div>
                    <h4 className="text-lg md:text-xl font-semibold mb-1.5 md:mb-2">
                      {isMobile ? api.mobileName : api.name}
                    </h4>
                    <p className="text-gray-400 text-xs md:text-sm">
                      {isMobile ? api.mobileDescription : api.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Aprendizajes */}
              <div className="space-y-6 md:space-y-8">
                <div className="text-center">
                  <h4 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                      💡 {translations.what_i_learned || "¿Qué aprendí?"}
                    </span>
                  </h4>
                </div>
                
                <div className="p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-gradient-to-br from-yellow-900/10 to-orange-900/10 border border-yellow-500/20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {learnings.map((learning, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-start gap-2 md:gap-3 p-2.5 md:p-3 rounded-lg md:rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                      >
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm md:text-base">{learning}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Demo */}
          {activeTab === "demo" && (
            <div className="space-y-8 md:space-y-16">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    🚀 {translations.demo_title || "Demo en Vivo"}
                  </span>
                </h3>
                <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
                  {translations.demo_subtitle || "Explora todas las funcionalidades"}
                </p>
              </div>

              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-6 md:space-y-8">
                  <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20">
                    <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">{translations.test_credentials || "Credenciales de Prueba"}</h4>
                    <div className="space-y-2 md:space-y-3">
                      <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-black/50 border border-white/10">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">{translations.email || "Email:"}</span>
                          <code className="text-purple-400 font-mono text-sm truncate">demo@golive.com</code>
                        </div>
                      </div>
                      <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-black/50 border border-white/10">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm">{translations.password || "Contraseña:"}</span>
                          <code className="text-blue-400 font-mono text-sm">Demo123!</code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-green-900/20 to-transparent border border-green-500/20">
                    <h4 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">{translations.available_features || "Funcionalidades Disponibles"}</h4>
                    <ul className="space-y-1.5 md:space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                        <span className="text-sm md:text-base">{getTranslation(language, "GoLiveProjectDetail.demo_feature_1") || "Compra de entradas completa"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                        <span className="text-sm md:text-base">{getTranslation(language, "GoLiveProjectDetail.demo_feature_2") || "Tickets con QR"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                        <span className="text-sm md:text-base">{getTranslation(language, "GoLiveProjectDetail.demo_feature_3") || "Dashboard administración"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                        <span className="text-sm md:text-base">{getTranslation(language, "GoLiveProjectDetail.demo_feature_4") || "Panel usuario con historial"}</span>
                      </li>
                    </ul>
                  </div>

                  <motion.a
                    href="https://golive-hu5d.onrender.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-3 md:px-6 md:py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg md:rounded-xl font-semibold transition-all text-center group transition-transform"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center gap-2 md:gap-3">
                      <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="text-base md:text-lg">{translations.access_demo || "Acceder a la Demo"}</span>
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform" />
                    </div>
                  </motion.a>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl md:blur-3xl rounded-full" />
                  <div className="relative p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10">
                    <div className="space-y-4 md:space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg md:text-xl font-semibold">{translations.interactive_demo || "Demo Interactiva"}</h4>
                        <div className="flex gap-1.5 md:gap-2">
                          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500" />
                          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500" />
                          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500" />
                        </div>
                      </div>
                      
                      <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-black/50 border border-white/10">
                        <code className="text-purple-300 font-mono text-xs md:text-sm lg:text-base break-all">
                          https://golive-hu5d.onrender.com
                        </code>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-white/5 text-center">
                          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-400">100%</div>
                          <div className="text-xs md:text-sm text-gray-400">{translations.functional || "Funcional"}</div>
                        </div>
                        <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-white/5 text-center">
                          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-400">24/7</div>
                          <div className="text-xs md:text-sm text-gray-400">{translations.available || "Disponible"}</div>
                        </div>
                      </div>
                      
                      <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30">
                        <p className="text-xs md:text-sm text-gray-300 text-center">
                          <strong>{translations.note || "Nota"}:</strong> {getTranslation(language, "GoLiveProjectDetail.demo_note") || "Demo con datos de prueba. Transacciones simuladas."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal para pantalla completa - RESPONSIVE Y CONTAINER LIMITADO */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 md:p-5"
          >
            <div className="relative w-full max-w-4xl md:max-w-5xl">
              {/* Botón de cerrar */}
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-2 right-2 md:top-4 md:right-4 z-50 p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all backdrop-blur-sm"
                aria-label={translations.close_fullscreen || "Cerrar pantalla completa"}
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              
              <div className="relative aspect-video rounded-lg md:rounded-xl overflow-hidden bg-black">
                <Image
                  src={projectImages[currentImageIndex].src}
                  alt={projectImages[currentImageIndex].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
                
                {/* Botones de navegación ENCIMA DE LA IMAGEN EN EL MODAL */}
                <div className="absolute inset-0 flex items-center justify-between px-3 md:px-4">
                  <button
                    onClick={prevImage}
                    className="p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all z-20 backdrop-blur-sm"
                    aria-label={translations.previous_image || "Imagen anterior"}
                  >
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all z-20 backdrop-blur-sm"
                    aria-label={translations.next_image || "Siguiente imagen"}
                  >
                    <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
              
              {/* Controles inferiores */}
              <div className="mt-3 md:mt-4 flex flex-col items-center">
                {/* Indicadores */}
                <div className="flex gap-2 mb-2 md:mb-3">
                  {projectImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`rounded-full transition-all duration-300 ${
                        currentImageIndex === index 
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 w-2.5 h-2.5 md:w-3 md:h-3" 
                          : "bg-white/30 hover:bg-white/50 w-2 h-2 md:w-2.5 md:h-2.5"
                      }`}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
                
                {/* Información */}
                <div className="text-center px-2 md:px-4">
                  <p className="text-xs md:text-sm lg:text-base text-white font-medium truncate">
                    {projectImages[currentImageIndex].alt}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {currentImageIndex + 1} {translations.of || "de"} {projectImages.length}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}