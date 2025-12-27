import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
import { useLoginForm } from './UseLoginForm';
import { NavLink } from 'react-router';

export const FormLogin = () => {
  const {
    register,
    handleSubmit,
    errors,
    showPassword,
    togglePasswordVisibility,
    setValue,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Email */}
      <div className="space-y-3">
        <Label htmlFor="email" className="text-gray-200">
          Admin Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="admin@yourplatform.com"
          className="h-14 text-base rounded-xl bg-white/10 border-gray-600 text-white placeholder-gray-400 focus:border-white"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-3">
        <Label htmlFor="password" className="text-gray-200">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className="h-14 text-base rounded-xl bg-white/10 border-gray-600 text-white placeholder-gray-400 pr-12"
            {...register('password')}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent text-gray-400 hover:text-white"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </Button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-400">{errors.password.message}</p>
        )}
      </div>

      {/* Remember Me */}
      <div className="flex items-center space-x-3">
        <Checkbox
          id="remember"
          onCheckedChange={(checked) => setValue('terms', checked as boolean)}
          className="border-gray-400 data-[state=checked]:bg-white data-[state=checked]:text-black"
        />
        <Label
          htmlFor="remember"
          className="text-sm text-gray-300 font-normal cursor-pointer"
        >
          Remember me
        </Label>
      </div>

      {/* Submit Button - Shadcn default blue */}
      <Button
        type="submit"
        className="w-full h-14 text-lg font-medium bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg"
      >
        Log In to Dashboard
      </Button>

      {/* Forgot Password */}
      <div className="text-center">
        <NavLink
          to="/forgot-password"
          className="text-sm text-blue-400 font-medium hover:underline"
        >
          Forgot password?
        </NavLink>
      </div>
    </form>
  );
};