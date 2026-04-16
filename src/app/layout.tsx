import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SocialCraft – Social Media Image Maker | Create Stunning Social Posts",
  description:
    "Create beautiful social media images with custom backgrounds, fonts, and text. Free online design tool for Instagram, Twitter/X, LinkedIn, Facebook, Pinterest, and YouTube. No signup required.",
  keywords: [
    "social media image maker",
    "social media post creator",
    "instagram post maker",
    "twitter image generator",
    "linkedin post designer",
    "free image editor",
    "social media design tool",
    "custom font images",
    "social media graphics",
    "canva alternative",
    "image maker online",
    "social post generator",
  ],
  authors: [{ name: "SocialCraft" }],
  creator: "SocialCraft",
  openGraph: {
    title: "SocialCraft – Create Stunning Social Media Images",
    description:
      "Design beautiful social media posts with custom backgrounds, fonts, and text. Supports Instagram, Twitter, LinkedIn, and more. Free and instant — no signup needed.",
    type: "website",
    locale: "en_US",
    siteName: "SocialCraft",
  },
  twitter: {
    card: "summary_large_image",
    title: "SocialCraft – Social Media Image Maker",
    description:
      "Create stunning social media images with custom backgrounds, fonts, and text. Free, instant, no signup.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=Open+Sans:wght@300;400;600;700&family=Lato:wght@300;400;700&family=Oswald:wght@400;500;600;700&family=Raleway:wght@300;400;500;600;700&family=Merriweather:wght@300;400;700&family=Source+Code+Pro:wght@400;500;600&family=Bebas+Neue&family=Dancing+Script:wght@400;500;600;700&family=Pacifico&family=Lobster&family=Archivo+Black&family=Righteous&family=Bitter:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "SocialCraft",
              description: "Free social media image maker with custom backgrounds, fonts, and text. Create stunning posts for Instagram, Twitter, LinkedIn, and more.",
              applicationCategory: "DesignApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Custom canvas sizes for all social platforms",
                "20+ curated fonts for social media designs",
                "Solid colors, gradients, image backgrounds",
                "Built-in templates for quick designs",
                "High-quality PNG and JPEG export",
                "No signup required",
              ],
            }),
          }}
        />
      </head>
      <body className="h-full">{children}</body>
    </html>
  );
}