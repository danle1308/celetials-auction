
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { AuthProvider } from '@/views/store/context/AuthContext';
import { UserInfoProvider } from '@/views/store/context/UserInfoContext';
import { SignalProvider } from '@/views/store/context/SignalContext';


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">

      <head>

        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      </head>

      <body>

        <AuthProvider>
          <UserInfoProvider>
            <SignalProvider>
              <div>
                {children}
              </div>
            </SignalProvider>
          </UserInfoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
