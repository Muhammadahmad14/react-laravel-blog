import { useState } from "react";
import { Loader2 } from "lucide-react";
import GoogleLogo from "../../components/GoogleLogo";

function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    window.location.href = "http://localhost:8000/api/auth/google";
  };

  return (
    <div className="flex justify-center mt-5">
      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className={`
          inline-flex items-center gap-2 
          bg-white/90 backdrop-blur border border-gray-300 
          rounded-md px-5 py-2
          text-sm font-medium text-gray-700
          shadow-sm hover:shadow-md
          transition-all duration-200 ease-in-out
          hover:bg-white hover:border-gray-400
          active:scale-95
          disabled:opacity-70 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 cursor-pointer
        `}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
        ) : (
          <GoogleLogo className="w-4 h-4" />
        )}

        <span>{isLoading ? "Connecting..." : "Sign in with Google"}</span>
      </button>
    </div>
  );
}

export default GoogleLoginButton;
