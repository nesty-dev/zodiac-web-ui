export default async function ZodiacLayout({
  params,
  children,
}: {
  params: { zodiac: string };
  children: React.ReactNode;
}) {
  // สมมติคุณ fetch theme config จาก API ได้ tokens = "aries"
  // const theme = await fetchTheme(params.zodiac)
  const tokens = params.zodiac; // mock ก่อน

  return (
    <html data-theme={tokens}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
