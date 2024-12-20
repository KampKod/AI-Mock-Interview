import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "AI-Interview Mocker - KampKode | Mock Interviews for Success",
  description:
    "Prepare for your next job interview with KampKode's AI-Interview Mocker. Engage in realistic mock interviews and enhance your skills to improve your chances of success.",
  openGraph: {
    title: "AI-Interview Mocker - KampKode",
    description:
      "Enhance your interview preparation with KampKode's AI-Interview Mocker. Practice with realistic scenarios and receive AI-driven feedback to ace your next interview.",
    url: "https://ai-interview.kampkode.tech/",
    siteName: "AI-Interview Mocker - KampKode",
    images: [
      {
        url: "https://res.cloudinary.com/dyimcysjz/image/upload/v1734629411/AI_interview_popvu4.png",
        width: 630,
        height: 630,
        alt: "AI-Interview Mocker - KampKode",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="description" content={metadata.description} />
          <meta property="og:title" content={metadata.openGraph.title} />
          <meta property="og:description" content={metadata.openGraph.description} />
          <meta property="og:url" content={metadata.openGraph.url} />
          <meta property="og:site_name" content={metadata.openGraph.siteName} />
          <meta property="og:image" content={metadata.openGraph.images[0].url} />
          <meta property="og:image:width" content={metadata.openGraph.images[0].width.toString()} />
          <meta property="og:image:height" content={metadata.openGraph.images[0].height.toString()} />
          <meta property="og:locale" content={metadata.openGraph.locale} />
          <meta property="og:type" content={metadata.openGraph.type} />
          <title>{metadata.title}</title>
        </head>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
