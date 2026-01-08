import { loadTheme } from "@/lib/loadTheme";
import { resolveLayout, resolveNavbar } from "@/lib/resolvePresets";

const HOST = process.env.NEXT_PUBLIC_THEME_KEY || "aries";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = loadTheme(HOST);
  const Layout = resolveLayout(theme.layout);

  const header = theme.layoutSlots ? (
    <>
      {theme.layoutSlots.map((slot) => {
        const Component = resolveNavbar(slot.component);
        return Component ? <Component key={slot.name} {...slot.props} /> : null;
      })}
    </>
  ) : null;

  if (Layout) {
    return <Layout header={header}>{children}</Layout>;
  }

  return <div>{children}</div>;
}
