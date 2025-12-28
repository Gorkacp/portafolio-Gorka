"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare, ArrowRight, Clock, Shield, Calendar, Linkedin, Zap, Target } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setTimeout(() => {
      setIsSubmitting(false);
      alert("¡Mensaje enviado con éxito! Te contactaré pronto.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="
        relative w-full py-32 px-6 font-poppins
        bg-gradient-to-b from-gray-900 via-black to-black
        text-white
      "
    >
      {/* Separador superior */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

        {/* Columna Izquierda - Información */}
        <div className="flex flex-col gap-6">
          <span className="uppercase tracking-widest text-sm text-purple-400">
            Oportunidad de colaboración
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Conectemos{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              visiones
            </span>{" "}
            <span className="block text-3xl sm:text-4xl mt-4 font-normal">
              para crear{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                soluciones extraordinarias
              </span>
            </span>
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            Como <span className="text-white font-medium">Desarrollador Full Stack</span>,
            busco proyectos donde pueda fusionar{" "}
            <strong>innovación técnica</strong> con{" "}
            <strong>estrategia empresarial</strong> para construir productos digitales
            que marquen la diferencia.
          </p>

          <p className="text-gray-400 leading-relaxed">
            Si tu empresa necesita un partner tecnológico que entienda tanto de
            <strong> código</strong> como de <strong>resultados de negocio</strong>,
            trabajemos juntos para transformar desafíos en éxitos medibles.
          </p>

          {/* LinkedIn Professional Card */}
          <div className="mt-8">
            <div className="
              p-6 rounded-xl
              bg-gradient-to-br from-blue-900/20 to-blue-950/10
              border border-blue-500/20
              hover:border-blue-400/30 transition-all duration-300
            ">
              <div className="flex items-center gap-4 mb-4">
                <div className="
                  w-12 h-12 rounded-lg
                  bg-gradient-to-br from-blue-600 to-blue-800
                  flex items-center justify-center
                ">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Perfil Profesional
                  </h3>
                  <p className="text-sm text-blue-300">
                    Red profesional actualizada
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">
                    Experiencia Full Stack verificada
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-300">
                    Proyectos completados exitosamente
                  </span>
                </div>
              </div>
              
              <motion.a
                href="https://www.linkedin.com/in/gorka-carmona-pino-803902294/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-6 inline-flex items-center gap-2 px-4 py-2.5
                  bg-gradient-to-r from-blue-600 to-blue-700
                  text-white text-sm font-medium rounded-lg
                  hover:from-blue-700 hover:to-blue-800
                  transition-all duration-300
                  group/linkedin
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-4 h-4" />
                Conectar en LinkedIn
                <ArrowRight className="w-3 h-3 group-hover/linkedin:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Columna Derecha - Formulario y Métricas */}
        <div className="flex flex-col gap-10">
          {/* Métricas Superiores */}
          <div className="grid grid-cols-3 gap-4">
            <div className="
              p-5 rounded-xl
              bg-gradient-to-br from-white/5 to-transparent
              border border-white/10
              text-center
              group hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300
            ">
              <div className="flex flex-col items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <div className="text-2xl font-bold text-white">24h</div>
              </div>
              <div className="text-xs text-gray-300 mt-2 uppercase tracking-wider">
                Respuesta
              </div>
            </div>
            <div className="
              p-5 rounded-xl
              bg-gradient-to-br from-white/5 to-transparent
              border border-white/10
              text-center
              group hover:border-blue-500/30 hover:bg-white/10 transition-all duration-300
            ">
              <div className="flex flex-col items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <div className="text-2xl font-bold text-white">100%</div>
              </div>
              <div className="text-xs text-gray-300 mt-2 uppercase tracking-wider">
                Compromiso
              </div>
            </div>
            <div className="
              p-5 rounded-xl
              bg-gradient-to-br from-white/5 to-transparent
              border border-white/10
              text-center
              group hover:border-pink-500/30 hover:bg-white/10 transition-all duration-300
            ">
              <div className="flex flex-col items-center gap-2">
                <Calendar className="w-5 h-5 text-pink-400" />
                <div className="text-2xl font-bold text-white">Flex.</div>
              </div>
              <div className="text-xs text-gray-300 mt-2 uppercase tracking-wider">
                Disponibilidad
              </div>
            </div>
          </div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="
                  w-10 h-10 rounded-lg
                  bg-gradient-to-r from-purple-500/20 to-pink-500/20
                  border border-purple-500/30
                  flex items-center justify-center
                ">
                  <Send className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Propuesta de colaboración
                  </h3>
                  <p className="text-sm text-gray-400">
                    Iniciemos una conversación estratégica
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre y Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Nombre
                      </div>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Nombre completo"
                      className="
                        w-full px-4 py-3 rounded-lg text-sm
                        bg-white/5 border border-white/10
                        text-white placeholder-gray-400
                        focus:outline-none focus:border-purple-500 focus:bg-white/10
                        transition-all duration-300
                        hover:border-white/20
                      "
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email profesional
                      </div>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="nombre@empresa.com"
                      className="
                        w-full px-4 py-3 rounded-lg text-sm
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tipo de proyecto
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Desarrollo web, Consultoría, Colaboración técnica..."
                    className="
                      w-full px-4 py-3 rounded-lg text-sm
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Visión del proyecto
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Describe los objetivos, desafíos y expectativas de tu proyecto..."
                    className="
                      w-full px-4 py-3 rounded-lg text-sm
                      bg-white/5 border border-white/10
                      text-white placeholder-gray-400
                      focus:outline-none focus:border-blue-500 focus:bg-white/10
                      transition-all duration-300
                      hover:border-white/20
                      resize-none
                    "
                  />
                </div>

                {/* Botón de envío */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    w-full px-6 py-4 rounded-lg text-sm font-semibold
                    bg-gradient-to-r from-purple-600/90 to-blue-600/90
                    border border-purple-500/30
                    text-white
                    hover:from-purple-600 hover:to-blue-600
                    hover:border-purple-500/50
                    hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]
                    transition-all duration-300
                    flex items-center justify-center gap-3
                    group/btn
                    cursor-pointer
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      PROCESANDO PROPUESTA...
                    </>
                  ) : (
                    <>
                      INICIAR COLABORACIÓN
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </>
                  )}
                </motion.button>

                {/* Nota */}
                <div className="text-center pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-400">
                    Su información es tratada con total confidencialidad y profesionalismo.
                    <br />
                    <span className="text-gray-500">
                      Respeto absoluto por su privacidad y datos corporativos.
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Separador inferior */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    </section>
  );
}