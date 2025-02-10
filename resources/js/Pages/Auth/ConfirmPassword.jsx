import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import FloatingLabelInput from '@/Components/FloatingLabelInput';
import InputError from '@/Components/InputError';
import { FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <motion.h2
                className="text-center text-2xl font-semibold text-gray-800 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Confirm Your Password
            </motion.h2>

            <p className="mb-6 text-sm text-gray-600 text-center">
                This is a secure area of the application. Please confirm your password before continuing.
            </p>

            <form onSubmit={submit} className="space-y-6">
                {/* Password Input */}
                <div className="relative">
                    <FloatingLabelInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        label="Password"
                        icon={FaLock}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        className="w-full"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </button>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Button */}
                <div className="flex items-center justify-between">
                    <a href={route('login')} className="text-blue-500 hover:underline text-sm">
                        Back to Login
                    </a>
                    <motion.button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
                        disabled={processing}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {processing ? 'Confirming...' : 'Confirm'}
                    </motion.button>
                </div>
            </form>
        </GuestLayout>
    );
}

