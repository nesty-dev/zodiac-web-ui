import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../ui/src/molecules/Avatar/Avatar";

export interface TypeAProps {
  logoUrl: string;
  logoName: string;
}

export function TypeA({ logoUrl, logoName }: TypeAProps) {
  return (
    <nav className="navbar navbar--type-a">
      <img src={logoUrl} alt={logoName} className="logo-image" />
    </nav>
  );
}
