import { useState } from 'react';

export default function FloatingLabelInput({ id, label, type = "text", name, value, onChange, error }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative z-0 w-full mb-1 group">
            <input
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(value ? true : false)}
                required
                autoComplete="off"
                placeholder=" "
                className="peer block py-2.5 px-0 w-full text-md text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
            />
            <label
                htmlFor={id}
                className={`absolute text-md text-white duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0]
                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                peer-focus:-translate-y-6 peer-focus:text-blue-600 ${isFocused ? 'peer-focus:text-blue-600' : 'text-white'}`}
            >
                {label}
            </label>

            {/* Error Message */}
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </div>
    );
}
