export const UnauthorizedLoginMessage = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-4">
                <span className="text-5xl">🚫</span>
            </div>

            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Access Denied
            </h1>

            <p className="text-gray-600 mb-6">
                You are not authorized to view this page.
            </p>

            <button
                onClick={() => window.location.href = '/login'}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition duration-200"
            >
                Go back to Login
            </button>
        </div>
    </div>

)