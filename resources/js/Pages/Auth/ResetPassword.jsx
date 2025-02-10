import { useState } from "react";
import FloatingLabelInput from "@/Components/FloatingLabelInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form
                onSubmit={submit}
                className="bg-white shadow-lg rounded-lg p-6 space-y-6"
            >
                {/* Email Field */}
                <FloatingLabelInput
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    autoComplete="username"
                    error={errors.email}
                />

                {/* Password Field */}
                <div className="relative">
                    <FloatingLabelInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        label="Password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        autoComplete="new-password"
                        error={errors.password}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOffIcon className="w-5 h-5" />
                        ) : (
                            <EyeIcon className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {/* Confirm Password Field */}
                <div className="relative">
                    <FloatingLabelInput
                        id="password_confirmation"
                        type={showConfirmPassword ? "text" : "password"}
                        name="password_confirmation"
                        label="Confirm Password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        autoComplete="new-password"
                        error={errors.password_confirmation}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                    >
                        {showConfirmPassword ? (
                            <EyeOffIcon className="w-5 h-5" />
                        ) : (
                            <EyeIcon className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {processing ? "Processing..." : "Reset Password"}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
