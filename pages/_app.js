import "@/styles/globals.css";
import { Inter } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "@/lib/AuthContext";
import AuthCheck from "@/Components/AuthCheck";
import { useRouter } from "next/router";

config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });

const noAuthRequired = [
  "/",
  "/login",
  "/patient-registration-adult",
  "/patient-registration-child",
];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <div className={inter.className}>
      <AuthContextProvider>
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <AuthCheck>
            <Component {...pageProps} />
          </AuthCheck>
        )}

        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "text-sm font-medium",
          }}
        />
      </AuthContextProvider>
    </div>
  );
}
