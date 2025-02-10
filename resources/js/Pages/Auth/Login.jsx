import { useForm } from '@inertiajs/react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import FloatingLabelInput from '@/Components/FloatingLabelInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />

            {/* Flash Message */}
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 bg-green-100 p-3 rounded-md">
                    {status}
                </div>
            )}

            {/* Login Form */}
            <div className="w-full max-w-md mx-auto ">
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-5">
                    Login to Your Account
                </h2>

                <form onSubmit={submit} className="space-y-6">
                    {/* Email Field */}
                    <FloatingLabelInput
                        id="email"
                        label="Email Address"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        error={errors.email}
                    />

                    {/* Password Field */}
                    <FloatingLabelInput
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        error={errors.password}
                    />

                    {/* Remember Me & Forgot Password */}
                    <div className="flex justify-between items-center">
                        <label className="flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-indigo-600 hover:text-indigo-700"
                            >
                                Forgot Password?
                            </Link>
                        )}
                    </div>

                    {/* Login Button */}
                    <div className="mt-4 flex justify-center">
    <button
        className="w-full max-w-xs text-gray-900 text-lg bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg px-8 py-3 text-center"
        disabled={processing}
    >
        Login
    </button>
</div>

                </form>

                {/* Register Link */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href={route('register')} className="text-indigo-600 hover:text-indigo-700">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}

