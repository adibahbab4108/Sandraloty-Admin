import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import type { ILogin } from "@/types/auth.type";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hook/useAuth";

const loginSchema = z.object({
    email: z.email({ message: "Please enter a valid email address" })
        .min(1, { message: "Email is required" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const [loginMutation] = useLoginMutation();
    const { login: loginLocal } = useAuth();
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "xediyad154@m3player.com",
            password: "xediyad154@m3player.com",
        },
    });

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        try {
            const res = await loginMutation(data as ILogin).unwrap();
            console.log(res)

            if (res.success || res.token)
                loginLocal(res.token, res.user);
            
            toast.success(res.message || "Login successful");
            navigate("/dashboard");

        } catch (err: any) {
            console.log("From LoginForm", err);
            toast.error(err?.data?.error?.message || "Login failed");
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="grid gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="john@example.com"
                                            type="email"
                                            autoComplete="email"
                                            {...field}
                                            className="h-14 text-base rounded-xl bg-white/10 border-gray-600 text-white placeholder-gray-400 focus:border-white"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Enter your password"
                                                autoComplete="current-password"
                                                {...field}
                                                className="h-14 text-base rounded-xl bg-white/10 border-gray-600 text-white placeholder-gray-400 focus:border-white"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent text-gray-400 hover:text-white cursor-pointer"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </Button>

                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full cursor-pointer h-14"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}