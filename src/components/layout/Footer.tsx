import Link from "next/link";
import { Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-neutral-50 py-12 text-sm text-neutral-500">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-1.5 font-semibold text-neutral-700">
              <Heart className="h-4 w-4 fill-rose-400 text-rose-400" />
              <span>Vínculo Consciente</span>
            </div>
            <p className="max-w-xs leading-relaxed">
              Educación sexual basada en evidencia. Información confiable para una vida plena y saludable.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="mb-3 font-medium text-neutral-700">Temas</p>
              <ul className="space-y-2">
                <li><Link href="/blog?category=salud-sexual" className="hover:text-rose-500">Salud Sexual</Link></li>
                <li><Link href="/blog?category=relaciones" className="hover:text-rose-500">Relaciones</Link></li>
                <li><Link href="/blog?category=educacion" className="hover:text-rose-500">Educación</Link></li>
                <li><Link href="/blog?category=bienestar" className="hover:text-rose-500">Bienestar</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-medium text-neutral-700">Legal</p>
              <ul className="space-y-2">
                <li><Link href="/privacidad" className="hover:text-rose-500">Privacidad</Link></li>
                <li><Link href="/aviso-legal" className="hover:text-rose-500">Aviso Legal</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <p className="text-center">© {new Date().getFullYear()} Vínculo Consciente. Información con propósito educativo.</p>
      </div>
    </footer>
  );
}
