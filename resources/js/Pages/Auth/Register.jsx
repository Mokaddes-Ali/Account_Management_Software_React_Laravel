import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FloatingLabelInput from '@/Components/FloatingLabelInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            {/* Headline */}
            <motion.h2
                className="text-center text-3xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Create Your Account
            </motion.h2>

            {/* Register Form */}
            <form onSubmit={submit} className="space-y-6">
                {/* Full Name */}
                <div className="relative">
                    <FloatingLabelInput
                        id="name"
                        name="name"
                        label="Full Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        className="w-full pl-10"
                    />
                    <InputError message={errors.name} />
                </div>

                {/* Email Address */}
                <div className="relative">
                    <FloatingLabelInput
                        id="email"
                        type="email"
                        name="email"
                        label="Email Address"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        className="w-full pl-10"
                    />
                    <InputError message={errors.email} />
                </div>

                {/* Password */}
                <div className="relative">
                    <FloatingLabelInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        label="Password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        className="w-full pl-10 pr-10"
                    />
                    <span
                        className="absolute right-3 top-3 cursor-pointer text-md text-white"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    <InputError message={errors.password} />
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <FloatingLabelInput
                        id="password_confirmation"
                        type={showConfirmPassword ? "text" : "password"}
                        name="password_confirmation"
                        label="Confirm Password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                        className="w-full pl-10 pr-10"
                    />
                    <span
                        className="absolute right-3 top-3 cursor-pointer text-md text-white"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    <InputError message={errors.password_confirmation} />
                </div>

                {/* Already Registered & Register Button */}
                <div className="flex items-center justify-between">
                    <Link
                        href={route('login')}
                        className="text-md text-blue-400 hover:text-blue-600"
                    >
                        Already registered?
                    </Link>

                    <motion.button
                        type="submit"
                        className="relative flex items-center px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg shadow-lg"
                        disabled={processing}
                        whileHover={{ scale: 0.95 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {processing && <span className="animate-spin mr-2">🔄</span>}
                        Register
                    </motion.button>
                </div>
            </form>
        </GuestLayout>
    );
}

