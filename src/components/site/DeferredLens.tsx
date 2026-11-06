import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";

const LazyLens = lazy(async () => {
  const module = await import("@/registry/magicui/lens");
  return { default: module.Lens };
});

type DeferredLensProps = {
  children: ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  isStatic?: boolean;
};

function LensFallback({ children }: { children: ReactNode }) {
  return <div className="relative h-full w-full overflow-hidden">{children}</div>;
}

export function DeferredLens(props: DeferredLensProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const enable = () => setEnabled(true);
    const idleId = window.requestIdleCallback?.(enable, { timeout: 1500 });
    const timerId = idleId === undefined ? window.setTimeout(enable, 800) : undefined;

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

  if (!enabled) return <LensFallback>{props.children}</LensFallback>;

  return (
    <Suspense fallback={<LensFallback>{props.children}</LensFallback>}>
      <LazyLens {...props} />
    </Suspense>
  );
}
