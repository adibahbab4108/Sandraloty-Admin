import { LoginForm } from '@/components/modules/Auth/LoginForm';

export default function LoginPage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">

      {/* Background Image .....................*/}
      <div
        className="absolute inset-0 bg-center bg-cover opacity-50"
        style={{ backgroundImage: "url('/banner.webp')" }}
      />
      {/* dark layer................... */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl rounded-2xl border overflow-hidden">
        <div className="bg-black/80 text-white p-8 sm:p-12 lg:p-16 space-y-10 shadow-2xl">
          <div className="space-y-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold">
              Admin Login
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              Manage how customers connect with
              trusted auto service contractors. Review job postings, track and compare bids, and oversee
              professional interactions to ensure smooth operations across all automotive services.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
