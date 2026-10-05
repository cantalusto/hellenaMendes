import "./globals.css";
import "./hero.css";
import "./entrance.css";

export const metadata = {
  title: "Hellena Mendes — Design que faz sentir",
  description:
    "Designer gráfica e estudante de psicologia, criando identidades visuais com sensibilidade e escuta — entre Recife e qualquer lugar.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
