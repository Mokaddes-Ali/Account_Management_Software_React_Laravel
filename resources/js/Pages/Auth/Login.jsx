import { useForm } from '@inertiajs/react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import FloatingLabelInput from '@/Components/FloatingLabelInput';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaEnvelope } from 'react-icons/fa';
import {useState} from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />
            <h2 className="text-center text-2xl font-bold text-white mb-5">
                Login to Your Account
            </h2>
            {/* Login Form with Animation and Color */}
            <motion.div
                className="w-full max-w-md mx-auto"
                initial={{ borderColor: "#e5e7eb" }}
                whileHover={{ borderColor: "#9333ea" }}
                animate={{ borderColor: "#10b981" }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                }}
            >
                    <form onSubmit={submit} className="space-y-6">
                        {/* Email Field */}
                        <div className="relative">
                            <FloatingLabelInput
                                id="email"
                                label="Email Address"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={errors.email}
                                className="w-full -pb-6"
                            />
                            <FaEnvelope className="absolute top-3 text-2xl right-4 text-zinc-50" />
                        </div>

                        {/* Password Field with Eye Icon */}
                        <div className="relative">
                            <FloatingLabelInput
                                id="password"
                                label="Password"
                                type={passwordVisible ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                error={errors.password}
                                className="w-full -pb-6"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute top-3 right-4"
                            >
                                {passwordVisible ? (
                                    <FaEyeSlash className="text-zinc-50 text-2xl" />
                                ) : (
                                    <FaEye className="text-zinc-50 text-2xl" />
                                )}
                            </button>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex justify-between items-center">
                            <label className="flex items-center">
                                <input
                                    id="remember_me"
                                    type="checkbox"
                                    name="remember"
                                    className="rounded border-emerald-500 text-indigo-600 focus:ring-indigo-500"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ml-2 text-[16px] text-white">Remember me</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-indigo-300 hover:text-indigo-700"
                                >
                                    Forgot Password?
                                </Link>
                            )}
                        </div>

                        {/* Login Button */}
                        <div className="mt-4 flex justify-center">
                            <motion.button
                                className="relative w-full max-w-xs text-gray-900 text-lg font-medium rounded-lg px-8 py-3 text-center bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80"
                                disabled={processing}
                                whileHover={{
                                    scale: 0.90,
                                    transition: { duration: 0.3, type: "spring", stiffness: 300 },
                                }}
                                whileTap={{
                                    scale: 0.95,
                                    transition: { duration: 0.2 },
                                }}
                                style={{
                                    border: "2px solid transparent",
                                    backgroundImage: "linear-gradient(45deg, #0ea5e9, #9333ea, #f59e0b, #10b981, #3b82f6)",
                                    backgroundClip: "padding-box",
                                }}
                            >
                                <span className="relative z-10">Login</span>
                            </motion.button>
                        </div>

                        {/* Error Message */}
                        <div className="text-red-600 text-sm">
                            {errors.email && <p className="mt-2">{errors.email}</p>}
                            {errors.password && <p className="mt-2">{errors.password}</p>}
                        </div>
                    </form>

                    {/* Register Link */}
                    <div className="text-center mt-4">
                        <p className="text-sm text-white">
                            Don't have an account?{' '}
                            <Link href={route('register')} className="text-blue-600 hover:text-orange-400">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </motion.div>
        </GuestLayout>
    );
}
