import { InstagramIcon } from "@/assets/instagram";
import { YoutubeIcon } from "@/assets/youtube";

export default function Navbar() {
    return (
            <div className="py-2 px-4 transition-all duration-300 border-b ">
                <div className="container mx-auto flex items-center justify-center text-center">

                    {/* Mobile TopBanner */}
                    <div className="flex w-full gap-2 md:hidden">
                        <a
                            href="https://www.instagram.com/vitorhugopanorama/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-2 bg-secondary border px-2 py-1 rounded-full  transition-all duration-300 hover:brightness-90 dark:hover:brightness-150"
                        >
                        <InstagramIcon className="w-4"/>
                        <p className="text-sm">Instagram</p>
                        </a>

                        <a
                            href="https://www.youtube.com/@panoramapanoramabrasil"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-2 bg-secondary px-2 py-1 rounded-full border transition-all duration-300 hover:brightness-90 dark:hover:brightness-150"
                        >
                        <YoutubeIcon className="w-4"/>
                        <p className="text-sm">Youtube</p>
                        </a>
                    </div>

                    {/* Desktop TopBanner */}
                    <div className="hidden md:flex justify-center gap-2">
                        <a
                            href="https://www.instagram.com/vitorhugopanorama/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-2 bg-secondary px-2 py-1 rounded-full border transition-all duration-300 hover:brightness-90 dark:hover:brightness-150"
                        >
                        <InstagramIcon className="w-4"/>
                        <p className="text-sm font-semibold">Instagram</p>
                        </a>

                        <a
                            href="https://www.youtube.com/@panoramapanoramabrasil"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-2 bg-secondary px-2 py-1 rounded-full border transition-all duration-300 hover:brightness-90 dark:hover:brightness-150"
                        >
                        <YoutubeIcon className="w-4"/>
                        <p className="text-sm font-semibold">Youtube</p>
                        </a>
                    </div>

                </div>
            </div>
    )
}