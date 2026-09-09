import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The link may be broken, or the page may have been moved.
      </p>
      <ButtonLink href="/" className="mt-8">
        Back home
      </ButtonLink>
    </Container>
  );
}
