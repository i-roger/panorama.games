export default function TopBanner() {
    return (
        <a
            href="https://panoramapanorama.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
        >
            <div className="bg-[#6a659e] py-2 px-4 transition-all duration-300 hover:brightness-110">
                <div className="container mx-auto flex items-center justify-center text-center">

                    {/* Mobile TopBanner */}
                    <p className="text-sm md:hidden text-white">
                        Panorama oficial: <span className="font-semibold  decoration-white/50 underline-offset-4">Acesse a loja completa</span>
                        <span className="ml-2 inline-block transform transition-transform group-hover:translate-x-1">→</span>
                    </p>

                    {/* Desktop TopBanner */}
                    <p className="text-sm hidden md:inline text-white">
                        Eleve seu nível: <span className="font-semibold  decoration-white/50 underline-offset-4">Adquira a versão oficial do Panorama e jogue sem limites</span>
                        <span className="ml-2 inline-block transform transition-transform group-hover:translate-x-1">→</span>
                    </p>

                </div>
            </div>
        </a>
    )
}