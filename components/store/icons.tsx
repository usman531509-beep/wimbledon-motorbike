import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function IconBase({
  size = 20,
  children,
  className,
  ...props
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </IconBase>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </IconBase>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 20-1.2-1C5.2 14 2 11.1 2 7.5A4.5 4.5 0 0 1 6.5 3c2 0 3.3 1 4.3 2.4C11.7 4 13 3 15 3A4.5 4.5 0 0 1 19.5 7.5c0 3.6-3.2 6.5-8.8 11.5L12 20Z" />
    </IconBase>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="9" cy="20" r="1.2" />
      <circle cx="18" cy="20" r="1.2" />
      <path d="M3 4h2l2.3 10.2a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 7H7" />
    </IconBase>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </IconBase>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </IconBase>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 8h2V4h-2.5A3.5 3.5 0 0 0 10 7.5V10H8v4h2v6h4v-6h2.2l.8-4H14V8.2c0-.13.07-.2.2-.2Z" />
    </IconBase>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M22 5.9c-.7.3-1.4.6-2.2.7.8-.5 1.4-1.2 1.7-2.1-.8.5-1.6.8-2.5 1A3.8 3.8 0 0 0 12.3 8a10.8 10.8 0 0 1-7.8-4 3.8 3.8 0 0 0 1.2 5.1c-.6 0-1.2-.2-1.7-.5 0 1.8 1.2 3.4 2.9 3.8-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1.5 1.5 1.9 2.7 3.6 2.7A7.7 7.7 0 0 1 3 18.2 10.8 10.8 0 0 0 8.8 20c7 0 10.8-5.8 10.8-10.8v-.5c.7-.5 1.4-1.1 1.9-1.8Z" />
    </IconBase>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M21 8.5a2.5 2.5 0 0 0-1.8-1.8C17.8 6.3 12 6.3 12 6.3s-5.8 0-7.2.4A2.5 2.5 0 0 0 3 8.5 26 26 0 0 0 2.7 12c0 1.2.1 2.3.3 3.5a2.5 2.5 0 0 0 1.8 1.8c1.4.4 7.2.4 7.2.4s5.8 0 7.2-.4a2.5 2.5 0 0 0 1.8-1.8c.2-1.2.3-2.3.3-3.5s-.1-2.3-.3-3.5Z" />
      <path d="m10 9.5 5 2.5-5 2.5Z" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function StarIcon({
  filled = false,
  half = false,
  ...props
}: IconProps & { filled?: boolean; half?: boolean }) {
  if (filled) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={props.size ?? 16}
        height={props.size ?? 16}
        className={props.className}
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="m12 2.6 2.9 5.88 6.49.94-4.7 4.58 1.11 6.47L12 17.43l-5.8 3.04 1.11-6.47-4.7-4.58 6.49-.94Z"
        />
      </svg>
    );
  }

  if (half) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={props.size ?? 16}
        height={props.size ?? 16}
        className={props.className}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="half-star">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          fill="url(#half-star)"
          stroke="currentColor"
          strokeWidth="1.5"
          d="m12 2.6 2.9 5.88 6.49.94-4.7 4.58 1.11 6.47L12 17.43l-5.8 3.04 1.11-6.47-4.7-4.58 6.49-.94Z"
        />
      </svg>
    );
  }

  return (
    <IconBase {...props}>
      <path d="m12 2.6 2.9 5.88 6.49.94-4.7 4.58 1.11 6.47L12 17.43l-5.8 3.04 1.11-6.47-4.7-4.58 6.49-.94Z" />
    </IconBase>
  );
}

export function EngineIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3a9 9 0 0 0-9 9v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1a9 9 0 0 0-9-9Z" />
      <path d="M12 8v4" />
      <path d="M9 10h6" />
      <path d="M15 15v4a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2v-4" />
    </IconBase>
  );
}

export function ElectricalIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    </IconBase>
  );
}

export function HeatingIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M12 3v6" />
      <path d="M12 15v6" />
      <path d="M3 12h6" />
      <path d="M15 12h6" />
    </IconBase>
  );
}

export function SteeringIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 10V3" />
      <path d="m10.5 13.5-5 5" />
      <path d="m13.5 13.5 5 5" />
    </IconBase>
  );
}

export function SuspensionIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3v18" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M8 16h8" />
      <path d="M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
      <path d="M12 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
    </IconBase>
  );
}

export function TransmissionIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="m16.2 7.8 2.9-2.9" />
    </IconBase>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M22 3H2l8 9.46V19l4 2V12.46L22 3Z" />
    </IconBase>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m9 6 6 6-6 6" />
    </IconBase>
  );
}
