import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component, state }: PageProps) {
  return (
    <div class="layout">
      <div class="header">
        <a href="/registro">REGISTRO</a>
        <a href="/acceder">ACCEDER</a>
      </div>
      <Component />
    </div>
  );
}