import { useQuery } from "@tanstack/react-query";
import { getSettings } from "@/lib/admin-data";

function getWhatsappUrl(rawNumber?: string) {
  const digits = (rawNumber || "+91 88260 23527").replace(/\D/g, "");
  const number = digits.length === 10 ? `91${digits}` : digits;
  const message = encodeURIComponent(
    "Hello Zardosi Atelier, I would like to inquire about couture hand embroidery commissions.",
  );
  return `https://wa.me/${number}?text=${message}`;
}

export function FloatingWhatsApp() {
  const { data: settings } = useQuery({
    queryKey: ["settings-public"],
    queryFn: () => getSettings(),
    staleTime: 0,
  });

  const href = getWhatsappUrl(settings?.whatsappNumber || settings?.phone);

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-5 right-5 z-50 flex items-center"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect with Zardosi Atelier on WhatsApp"
        className="group relative flex items-center gap-2.5 rounded-full bg-[#25D366] px-3.5 py-2.5 sm:px-4 sm:py-3 text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 hover:bg-[#20ba5a] hover:shadow-[0_12px_32px_rgba(37,211,102,0.55)] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      >
        {/* Animated pulse halo */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 opacity-75 blur-sm transition-all group-hover:opacity-100 group-hover:blur animate-pulse" />

        {/* WhatsApp Icon */}
        <span className="relative flex size-6 items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="size-5 fill-current"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.445 4.43-9.874 9.877-9.874 2.637 0 5.116 1.028 6.98 2.894A9.8 9.8 0 0122 11.986c0 5.448-4.43 9.877-9.949 9.877m0-18.177C6.545 3.608 2.3 7.854 2.3 13.31c0 1.963.513 3.877 1.488 5.561L2.25 24l5.297-1.39a10.97 10.97 0 005.495 1.461c5.454 0 9.899-4.446 9.899-9.899 0-2.645-1.03-5.133-2.9-7.003-1.87-1.87-4.357-2.9-7.002-2.9" />
          </svg>
        </span>

        {/* Text Label */}
        <span className="relative flex flex-col items-start leading-none pr-1">
          <span className="text-[12px] font-bold tracking-wide sm:text-[13px]">
            WhatsApp
          </span>
          <span className="hidden text-[9px] font-normal tracking-wider text-white/90 sm:inline mt-0.5">
            Chat with Atelier
          </span>
        </span>

        {/* Live green dot */}
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-white" />
        </span>
      </a>
    </aside>
  );
}
