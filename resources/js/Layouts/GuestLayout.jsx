import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import bgImage from '../../../public/build/assets/gradient-bg.avif';
import { motion } from 'framer-motion';

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
                    <ApplicationLogo className="h-20 w-20 text-black drop-shadow-lg" />
                </Link>
            </div>

            {/* Content Box with Framer Motion for Animation */}
            <motion.div
                className="relative z-10 w-full max-w-md rounded-lg px-6 py-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <motion.div
                    className="w-full max-w-md mx-auto rounded-lg border-2 bg-white/10 backdrop-blur-lg p-6 shadow-xl"
                    initial={{ borderColor: '#e5e7eb' }}
                    animate={{
                        borderColor: ['#ff0000', '#ff6600', '#ffcc00', '#33cc33', '#3399ff', '#9933cc', '#ff33cc'],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'linear',
                    }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );
}

