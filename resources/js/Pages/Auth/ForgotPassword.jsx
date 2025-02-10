import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FloatingLabelInput from '@/Components/FloatingLabelInput';
import { FaEnvelope } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        post(route('password.email'), {
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <motion.h2
                className="text-center text-2xl font-bold text-gray-200 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Reset Your Password
            </motion.h2>

            <p className="mb-4 text-sm text-gray-400 text-center">
                Enter your email and we will send you a password reset link.
            </p>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-500 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <FloatingLabelInput
                    id="email"
                    type="email"
                    name="email"
                    label="Email Address"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    icon={<FaEnvelope className="text-gray-400" />}
                />
                <InputError message={errors.email} />

                <div className="flex items-center justify-between">
                    <Link
                        href={route('login')}
                        className="text-sm text-blue-400 hover:text-blue-600"
                    >
                        Back to Login
                    </Link>

                    <motion.button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2"
                        disabled={processing || isSubmitting}
                        whileHover={{ scale: 0.95 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                    </motion.button>
                </div>
            </form>
        </GuestLayout>
    );
}
