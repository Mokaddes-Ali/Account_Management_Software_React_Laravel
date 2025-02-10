import { motion } from "framer-motion";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            {/* Main Container */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6 backdrop-blur-lg bg-opacity-80 border border-gray-200"
            >
                {/* Header */}
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-xl font-semibold text-gray-900 text-center"
                >
                    Verify Your Email Address
                </motion.h2>

                <p className="text-sm text-gray-600 text-center">
                    Thank you for signing up! Please verify your email by clicking
                    on the link we sent to your inbox. If you didn't receive the
                    email, click the button below to resend.
                </p>

                {/* Success Message */}
                {status === "verification-link-sent" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="p-3 text-sm font-medium text-green-700 bg-green-100 border border-green-400 rounded-md text-center shadow-md"
                    >
                        ✅ A new verification link has been sent to your email.
                    </motion.div>
                )}

                {/* Resend Verification Form */}
                <form onSubmit={submit} className="mt-6">
                    <div className="flex flex-col items-center space-y-4">
                        {/* Resend Button */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full"
                        >
                            <PrimaryButton
                                disabled={processing}
                                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-md"
                            >
                                {processing ? (
                                    <>
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            className="border-t-2 border-white border-solid rounded-full w-5 h-5"
                                        ></motion.span>
                                        Sending...
                                    </>
                                ) : (
                                    "Resend Verification Email"
                                )}
                            </PrimaryButton>
                        </motion.div>

                        {/* Logout Link */}
                        <motion.div whileHover={{ scale: 1.1 }}>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="text-sm text-gray-600 hover:text-gray-900 underline transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Log Out
                            </Link>
                        </motion.div>
                    </div>
                </form>
            </motion.div>
        </GuestLayout>
    );
}
