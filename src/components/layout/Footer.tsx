import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card py-14 text-sm text-muted-foreground">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-heading font-semibold text-foreground">
                Vínculo<span className="text-primary"> Consciente</span>
              </span>
            </Link>
            <p className="leading-relaxed">
              Educación sexual basada en evidencia. Información confiable para una vida plena y saludable.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="mb-4 font-medium text-foreground">Temas</p>
              <ul className="space-y-2.5">
                <li><Link href="/blog?category=salud-sexual" className="transition-colors hover:text-primary">Salud Sexual</Link></li>
                <li><Link href="/blog?category=relaciones" className="transition-colors hover:text-primary">Relaciones</Link></li>
                <li><Link href="/blog?category=educacion" className="transition-colors hover:text-primary">Educación</Link></li>
                <li><Link href="/blog?category=bienestar" className="transition-colors hover:text-primary">Bienestar</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-4 font-medium text-foreground">Legal</p>
              <ul className="space-y-2.5">
                <li><Link href="/privacidad" className="transition-colors hover:text-primary">Privacidad</Link></li>
                <li><Link href="/aviso-legal" className="transition-colors hover:text-primary">Aviso Legal</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8" />
        <p className="text-center text-xs">
          © {new Date().getFullYear()} Vínculo Consciente — Información con propósito educativo.
        </p>
      </div>
    </footer>
  );
}
