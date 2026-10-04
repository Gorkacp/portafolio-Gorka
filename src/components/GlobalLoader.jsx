"use client";

import { useSyncExternalStore } from 'react';

/*
 * Estado global simplificado
 */
const loaderState = {
  isLoading: false,
  listeners: new Set(),
};

function subscribeToLoader(callback) {
  loaderState.listeners.add(callback);
  return () => loaderState.listeners.delete(callback);
}

function getLoaderSnapshot() {
  return loaderState.isLoading;
}

/*
 * Funciones de control
 */
export const showGlobalLoader = () => {
  if (!loaderState.isLoading) {
    loaderState.isLoading = true;
    document.body.style.overflow = 'hidden';
    document.body.style.pointerEvents = 'none';

    loaderState.listeners.forEach(listener => listener());

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
    loaderState.listeners.forEach(listener => listener());
  }
};

/*
 * Este componente NO importa framer-motion. Vive en layout.js, o sea que se
 * descarga en TODAS las rutas, y pagar 39 KB de libreria de animacion para
 * dibujar un spinner que solo aparece mientras un proyecto carga era el peor
 * gasto del sitio. Los @keyframes equivalentes estan en globals.css, con las
 * mismas duraciones y curvas que usaba antes.
 */
export default function GlobalLoader() {
  const showLoader = useSyncExternalStore(
    subscribeToLoader,
    getLoaderSnapshot,
    () => false
  );

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
          <div
            className="
              loader-glow
              absolute -inset-4 bg-purple-500/10 blur-xl rounded-full
            "
          />

          {/* Spinner principal */}
          <div className="relative w-20 h-20">
            {/* Anillo exterior: 1.5s linear, como el ease:linear de antes */}
            <div
              className="
                loader-ring
                absolute inset-0 border-4 border-transparent
                border-t-purple-500 border-r-blue-400 rounded-full
              "
            />

            {/* Anillo interior: 2s en sentido contrario */}
            <div
              className="
                loader-ring-reverse
                absolute inset-2 border-3 border-transparent
                border-b-cyan-400 border-l-pink-400 rounded-full
              "
            />

            {/* Punto central */}
            <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
          </div>

          {/* Puntos decorativos: 1.5s con delay 0.2 y 0.4 */}
          <div
            className="
              loader-dot
              absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full
            "
          />
          <div
            className="
              loader-dot loader-dot-delay
              absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full
            "
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

        {/* Barra de progreso: 1.5s easeInOut en bucle */}
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="loader-bar h-full bg-gradient-to-r from-purple-500 to-blue-500" />
        </div>
      </div>

      {/* Efectos de fondo sutiles: 3s, 4s y 5s con 0, 0.5 y 1 de delay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="loader-halo absolute w-[300px] h-[300px] rounded-full border border-white/5"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
              animationDuration: `${3 + i}s`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}