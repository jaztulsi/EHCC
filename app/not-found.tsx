import { Button } from "@/components/ui/Button";
import { CircuitBackground } from "@/components/effects/CircuitBackground";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4">
      <CircuitBackground />
      <div className="relative text-center">
        <p className="font-mono text-7xl font-bold text-gradient">404</p>
        <p className="mt-4 font-mono text-sm text-emerald">{"// page not found"}</p>
        <h1 className="mt-2 text-2xl font-bold text-white">This route returned null.</h1>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          The page you&apos;re looking for doesn&apos;t exist — but everything else we build does.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button href="/">Back home</Button>
          <Button href="/games" variant="outline">
            Play a game
          </Button>
        </div>
      </div>
    </section>
  );
}
