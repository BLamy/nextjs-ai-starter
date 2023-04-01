import "./globals.css";

export const metadata = {
  title: "Create Next AI App",
  description: "Generated by create next ai app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gray-100">
      <body>
        <header className="py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center">
              NextJS AI Starter
            </h1>
          </div>
        </header>
        {children}
        <footer className="mt-10 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto text-center">
            <p><a href="https://github.com/BLamy/nextjs-ai-starter/blob/main/LICENSE">LICENSE - MIT</a></p>
          </div>
        </footer>
      </body>
    </html>
  );
}
