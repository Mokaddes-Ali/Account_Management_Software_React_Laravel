import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import bgImage from '../../../public/build/assets/gradient-bg.avif';

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
            {/* Fullscreen Background Image (Responsive & Fixed) */}
            <div
                className="absolute inset-0 bg-no-repeat w-full h-full bg-cover bg-center lg:bg-fixed"
                style={{ backgroundImage: `url(${bgImage})` }}
            ></div>

          

            {/* Logo */}
            <div className="relative z-10 mb-6">
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 text-white drop-shadow-lg" />
                </Link>
            </div>

            {/* Content Box (Glassmorphism Style) */}
            <div className="relative z-10 w-full max-w-md rounded-lg border border-white/30 bg-white/10 backdrop-blur-lg px-6 py-6 shadow-lg">
                {children}
            </div>
        </div>
    );
}
