"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Estado global simplificado
const loaderState = {
  isLoading: false,
  listeners: new Set(),
};

// Funciones de control
export const showGlobalLoader = () => {
  if (!loaderState.isLoading) {
    loaderState.isLoading = true;
    document.body.style.overflow = 'hidden';
    document.body.style.pointerEvents = 'none';
    
    loaderState.listeners.forEach(listener => listener(true));
    
    // Timeout de seguridad
    setTimeout(() => {
      if (loaderState.isLoading) {
        hideGlobalLoader();
      }
    }, 5000);
  }
};

export const hideGlobalLoader = () => {
  if (loaderState.isLoading) {
    loaderState.isLoading = false;
    document.body.style.overflow = 'auto';
    document.body.style.pointerEvents = 'auto';
    loaderState.listeners.forEach(listener => listener(false));
  }
};

export default function GlobalLoader() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const handleStateChange = (state) => {
      setShowLoader(state);
    };
    
    loaderState.listeners.add(handleStateChange);
    
    if (loaderState.isLoading) {
      setShowLoader(true);
    }

    return () => {
      loaderState.listeners.delete(handleStateChange);
      document.body.style.overflow = 'auto';
      document.body.style.pointerEvents = 'auto';
    };
  }, []);

  if (!showLoader) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black
      "
    >
      {/* Loader principal - diseño minimalista profesional */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Spinner elegante */}
        <div className="relative">
          {/* Glow exterior */}
          <motion.div
            className="absolute -inset-4 bg-purple-500/10 blur-xl rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Spinner principal */}
          <div className="relative w-20 h-20">
            {/* Anillo exterior */}
            <motion.div
              className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-blue-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Anillo interior */}
            <motion.div
              className="absolute inset-2 border-3 border-transparent border-b-cyan-400 border-l-pink-400 rounded-full"
              animate={{ rotate: -360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Punto central */}
            <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
          </div>
          
          {/* Puntos decorativos */}
          <motion.div
            className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          <motion.div
            className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
        </div>

        {/* Texto simple */}
        <div className="text-center">
          <h3 className="text-lg font-medium text-white mb-1">
            Cargando
          </h3>
          <p className="text-sm text-gray-400">
            Por favor, espere un momento
          </p>
        </div>

        {/* Barra de progreso mínima */}
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* Efectos de fondo sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[300px] h-[300px] rounded-full border border-white/5"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.02, 0.05, 0.02],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}