"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare, ArrowRight, Clock, Shield, Calendar, Linkedin, Zap, Target } from "lucide-react";
import { getTranslation } from "@/utils/translations";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState("es");
  const [isMounted, setIsMounted] = useState(false);

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
    
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
      clearInterval(interval);
    };
  }, []);

  // Función para renderizar texto con HTML
  const renderTextWithHTML = (text) => {
    return { __html: text };
  };

  // Obtener traducciones
  const translations = {
    section_title: getTranslation(language, "Contact.section_title"),
    main_title: getTranslation(language, "Contact.main_title"),
    main_title_highlight: getTranslation(language, "Contact.main_title_highlight"),
    subtitle: getTranslation(language, "Contact.subtitle"),
    subtitle_highlight: getTranslation(language, "Contact.subtitle_highlight"),
    description: getTranslation(language, "Contact.description"),
    description2: getTranslation(language, "Contact.description2"),
    linkedin_card: getTranslation(language, "Contact.linkedin_card"),
    metrics: getTranslation(language, "Contact.metrics"),
    form: getTranslation(language, "Contact.form"),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form data:", formData);
    
    // Aquí iría la lógica real de envío del formulario
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Mensaje de éxito traducido
      const successMessages = {
        es: "¡Mensaje enviado con éxito! Te contactaré pronto.",
        en: "Message sent successfully! I'll contact you soon.",
        de: "Nachricht erfolgreich gesendet! Ich werde mich bald bei Ihnen melden."
      };
      
      alert(successMessages[language] || successMessages.es);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  // Loading (evita SSR issues)
  if (!isMounted) {
    return (
      <section
        id="contact"
        className="
          relative w-full py-12 md:py-32 px-4 md:px-6 font-poppins
          bg-gradient-to-b from-gray-900 via-black to-black
          text-white
        "
      >
        <div className="h-96"></div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="
        relative w-full py-12 md:py-32 px-4 md:px-6 font-poppins
        bg-gradient-to-b from-gray-900 via-black to-black
        text-white
      "
    >
      {/* Separador superior - más sutil */}
      <div className="absolute top-0 left-0 w-full h-[0.5px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 items-start">

        {/* Columna Izquierda - Información */}
        <div className="flex flex-col gap-4 md:gap-6">
          <span className="uppercase tracking-widest text-xs md:text-sm text-purple-400">
            {translations.section_title}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            {translations.main_title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              {translations.main_title_highlight}
            </span>{" "}
            <span className="block text-xl sm:text-3xl md:text-4xl mt-2 md:mt-4 font-normal">
              {translations.subtitle}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                {translations.subtitle_highlight}
              </span>
            </span>
          </h2>

          <p 
            className="text-gray-300 text-sm md:text-lg leading-relaxed"
            dangerouslySetInnerHTML={renderTextWithHTML(translations.description)}
          />

          <p 
            className="text-gray-400 text-sm md:text-base leading-relaxed"
            dangerouslySetInnerHTML={renderTextWithHTML(translations.description2)}
          />

          {/* LinkedIn Professional Card */}
          <div className="mt-4 md:mt-8">
            <div className="
              p-4 md:p-6 rounded-xl
              bg-gradient-to-br from-blue-900/20 to-blue-950/10
              border border-blue-500/20
              hover:border-blue-400/30 transition-all duration-300
            ">
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="
                  w-10 h-10 md:w-12 md:h-12 rounded-lg
                  bg-gradient-to-br from-blue-600 to-blue-800
                  flex items-center justify-center flex-shrink-0
                ">
                  <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white">
                    {translations.linkedin_card?.title || "Perfil Profesional"}
                  </h3>
                  <p className="text-xs md:text-sm text-blue-300">
                    {translations.linkedin_card?.subtitle || "Red profesional actualizada"}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 md:w-4 md:h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-gray-300">
                    {translations.linkedin_card?.feature1 || "Experiencia Full Stack verificada"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-3 h-3 md:w-4 md:h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-xs md:text-sm text-gray-300">
                    {translations.linkedin_card?.feature2 || "Proyectos completados exitosamente"}
                  </span>
                </div>
              </div>
              
              <motion.a
                href="https://www.linkedin.com/in/gorka-carmona-pino-803902294/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-4 md:mt-6 inline-flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5
                  bg-gradient-to-r from-blue-600 to-blue-700
                  text-white text-xs md:text-sm font-medium rounded-lg
                  hover:from-blue-700 hover:to-blue-800
                  transition-all duration-300
                  group/linkedin
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span>{translations.linkedin_card?.connect_button || "Conectar en LinkedIn"}</span>
                <ArrowRight className="w-3 h-3 md:w-3 md:h-3 group-hover/linkedin:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Columna Derecha - Formulario y Métricas */}
        <div className="flex flex-col gap-6 md:gap-10">
          {/* Métricas Superiores - Responsive */}
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <div className="
              p-3 md:p-5 rounded-xl
              bg-gradient-to-br from-white/5 to-transparent
              border border-white/10
              text-center
              group hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300
              flex flex-col items-center justify-center
            ">
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                <div className="text-xl md:text-2xl font-bold text-white">24h</div>
              </div>
              <div className="text-[10px] md:text-xs text-gray-300 mt-1 md:mt-2 uppercase tracking-wider leading-tight">
                {translations.metrics?.response || "Respuesta"}
              </div>
            </div>
            <div className="
              p-3 md:p-5 rounded-xl
              bg-gradient-to-br from-white/5 to-transparent
              border border-white/10
              text-center
              group hover:border-blue-500/30 hover:bg-white/10 transition-all duration-300
              flex flex-col items-center justify-center
            ">
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                <div className="text-xl md:text-2xl font-bold text-white">100%</div>
              </div>
              <div className="text-[10px] md:text-xs text-gray-300 mt-1 md:mt-2 uppercase tracking-wider leading-tight">
                {translations.metrics?.commitment || "Compromiso"}
              </div>
            </div>
            <div className="
              p-3 md:p-5 rounded-xl
              bg-gradient-to-br from-white/5 to-transparent
              border border-white/10
              text-center
              group hover:border-pink-500/30 hover:bg-white/10 transition-all duration-300
              flex flex-col items-center justify-center
            ">
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />
                <div className="text-xl md:text-2xl font-bold text-white">Flex.</div>
              </div>
              <div className="text-[10px] md:text-xs text-gray-300 mt-1 md:mt-2 uppercase tracking-wider leading-tight">
                {translations.metrics?.availability || "Disponibilidad"}
              </div>
            </div>
          </div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div className="mb-4">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="
                  w-8 h-8 md:w-10 md:h-10 rounded-lg
                  bg-gradient-to-r from-purple-500/20 to-pink-500/20
                  border border-purple-500/30
                  flex items-center justify-center flex-shrink-0
                ">
                  <Send className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg md:text-xl font-semibold text-white">
                    {translations.form?.title || "Propuesta de colaboración"}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-400 truncate">
                    {translations.form?.subtitle || "Iniciemos una conversación estratégica"}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Nombre y Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div className="space-y-2">
                    <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 md:w-4 md:h-4" />
                        <span>{translations.form?.labels?.name || "Nombre"}</span>
                      </div>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={translations.form?.placeholders?.name || "Nombre completo"}
                      className="
                        w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg text-xs md:text-sm
                        bg-white/5 border border-white/10
                        text-white placeholder-gray-400
                        focus:outline-none focus:border-purple-500 focus:bg-white/10
                        transition-all duration-300
                        hover:border-white/20
                      "
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 md:w-4 md:h-4" />
                        <span>{translations.form?.labels?.email || "Email profesional"}</span>
                      </div>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={translations.form?.placeholders?.email || "nombre@empresa.com"}
                      className="
                        w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg text-xs md:text-sm
                        bg-white/5 border border-white/10
                        text-white placeholder-gray-400
                        focus:outline-none focus:border-blue-500 focus:bg-white/10
                        transition-all duration-300
                        hover:border-white/20
                      "
                    />
                  </div>
                </div>

                {/* Asunto */}
                <div className="space-y-2">
                  <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                    {translations.form?.labels?.project_type || "Tipo de proyecto"}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={translations.form?.placeholders?.project_type || "Desarrollo web, Consultoría, Colaboración técnica..."}
                    className="
                      w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg text-xs md:text-sm
                      bg-white/5 border border-white/10
                      text-white placeholder-gray-400
                      focus:outline-none focus:border-purple-500 focus:bg-white/10
                      transition-all duration-300
                      hover:border-white/20
                    "
                  />
                </div>

                {/* Mensaje */}
                <div className="space-y-2">
                  <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                    {translations.form?.labels?.project_vision || "Visión del proyecto"}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="
                      w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg text-xs md:text-sm
                      bg-white/5 border border-white/10
                      text-white placeholder-gray-400
                      focus:outline-none focus:border-blue-500 focus:bg-white/10
                      transition-all duration-300
                      hover:border-white/20
                      resize-none
                    "
                    placeholder={translations.form?.placeholders?.project_vision || "Describe los objetivos, desafíos y expectativas de tu proyecto..."}
                  />
                </div>

                {/* Botón de envío */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    w-full px-4 md:px-6 py-3 md:py-4 rounded-lg text-xs md:text-sm font-semibold
                    bg-gradient-to-r from-purple-600/90 to-blue-600/90
                    border border-purple-500/30
                    text-white
                    hover:from-purple-600 hover:to-blue-600
                    hover:border-purple-500/50
                    hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]
                    transition-all duration-300
                    flex items-center justify-center gap-2 md:gap-3
                    group/btn
                    cursor-pointer
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{translations.form?.submitting || "PROCESANDO PROPUESTA..."}</span>
                    </>
                  ) : (
                    <>
                      <span>{translations.form?.submit_button || "INICIAR COLABORACIÓN"}</span>
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </>
                  )}
                </motion.button>

                {/* Nota */}
                <div className="text-center pt-3 md:pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-400">
                    {translations.form?.privacy_note || "Su información es tratada con total confidencialidad y profesionalismo."}
                    <br />
                    <span className="text-gray-500 text-[10px] md:text-xs">
                      {translations.form?.privacy_subnote || "Respeto absoluto por su privacidad y datos corporativos."}
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Separador inferior - más sutil */}
      <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
    </section>
  );
}