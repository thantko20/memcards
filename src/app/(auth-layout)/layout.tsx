import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative grid place-items-center h-screen">
      <ThemeToggle className="absolute top-12 right-12 z-10" />
      <main className="relative z-20">{children}</main>
      <svg
        id="patternId"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute "
      >
        <defs>
          <pattern
            id="a"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
            patternTransform="scale(2) rotate(0)"
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="hsla(0, 0%, 100%, 0)"
            />
            <path
              d="M10-10L20 0v10L10 0zM20 0L10-10V0l10 10zm0 10L10 0v10l10 10zm0 10L10 10v10l10 10zM0 20l10-10v10L0 30zm0-10L10 0v10L0 20zM0 0l10-10V0L0 10z"
              stroke-width="1"
              stroke="hsla(0, 0%, 100%, 0.29)"
              fill="none"
              className="stroke-black/10 dark:stroke-white/10"
            />
          </pattern>
        </defs>
        <rect
          width="800%"
          height="800%"
          transform="translate(0,0)"
          fill="url(#a)"
        />
      </svg>
    </div>
  );
}
