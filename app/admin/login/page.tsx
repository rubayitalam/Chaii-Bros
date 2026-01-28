"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin");
        } catch (err) {
            setError("Invalid email or password");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-copper/10 flex items-center justify-center py-16">
            <div className="bg-white p-8 rounded-card shadow-xl max-w-md w-full">
                <h1 className="text-4xl font-script text-brown text-center mb-8">
                    Admin <span className="text-copper">Login</span>
                </h1>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-sans text-brown mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-copper/30 rounded-lg focus:border-copper focus:outline-none font-serif"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-sans text-brown mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-copper/30 rounded-lg focus:border-copper focus:outline-none font-serif"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 text-center">{error}</p>
                    )}

                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Logging in..." : "LOGIN"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
