export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918826023527?text=Hello%20Zardosi%20Atelier%2C%20I%27d%20like%20to%20discuss%20a%20couture%20embroidery%20project."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-[#25D366] bg-[#25D366] px-5 py-3 transition-all duration-400 hover:bg-[#20ba5a] hover:scale-105"
    >
      {/* White icon badge */}
      <span className="grid size-9 place-items-center rounded-full bg-white/20 text-white transition-colors duration-400 group-hover:bg-white/30 flex-shrink-0">
        <svg viewBox="0 0 32 32" className="size-5" fill="currentColor" aria-hidden="true">
          <path d="M16.001 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.255.59 4.466 1.71 6.4l-1.81 6.6 6.77-1.78a12.78 12.78 0 0 0 6.13 1.56h.005c7.07 0 12.8-5.73 12.8-12.8 0-3.42-1.331-6.633-3.749-9.05A12.738 12.738 0 0 0 16.001 3.2zm0 23.36a10.55 10.55 0 0 1-5.38-1.474l-.386-.23-4.018 1.057 1.073-3.918-.252-.402a10.55 10.55 0 0 1-1.616-5.61c0-5.84 4.752-10.59 10.59-10.59a10.52 10.52 0 0 1 7.49 3.105 10.52 10.52 0 0 1 3.098 7.49c-.001 5.838-4.755 10.572-10.6 10.572zm5.797-7.927c-.318-.16-1.88-.927-2.171-1.034-.291-.108-.503-.16-.715.16-.211.318-.82 1.034-1.005 1.246-.185.211-.37.238-.688.08-.318-.16-1.343-.495-2.558-1.578-.946-.844-1.585-1.886-1.77-2.204-.185-.318-.02-.49.14-.648.144-.143.318-.371.477-.557.16-.185.211-.318.318-.529.106-.211.053-.397-.027-.557-.08-.16-.715-1.724-.98-2.36-.258-.62-.52-.535-.715-.546l-.61-.011a1.17 1.17 0 0 0-.847.397c-.291.318-1.11 1.084-1.11 2.643 0 1.56 1.137 3.066 1.295 3.279.16.211 2.237 3.415 5.42 4.79.758.327 1.349.523 1.81.67.76.241 1.452.207 2 .126.61-.091 1.88-.768 2.144-1.51.265-.741.265-1.376.185-1.509-.08-.132-.291-.211-.61-.371z" />
        </svg>
      </span>
      {/* White label text */}
      <span className="hidden sm:inline text-[10px] uppercase tracking-[0.25em] text-white font-semibold">
        WhatsApp
      </span>
    </a>
  );
}
