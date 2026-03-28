import Container from "@/components/Container";
import Button from "@/components/Button";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-soft relative">
      <div className="bg-dot-pattern" />
      <Container className="relative">
        <div className="text-center max-w-md mx-auto">
          <div className="flex justify-center mb-8">
            <Logo size="large" />
          </div>
          <p className="text-6xl font-bold text-teal mb-4">404</p>
          <h1 className="text-2xl font-bold text-navy mb-3">
            Page not found
          </h1>
          <p className="text-navy/60 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/">Go Home</Button>
            <Button href="/guides" variant="outline">
              Browse Guides
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
