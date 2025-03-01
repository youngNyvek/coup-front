import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div>
        <header className="p-4 bg-gray-100">
          <h1>Coup Game</h1>
        </header>
        <main className="p-4">
          <Outlet /> {/* Renderiza as páginas filhas */}
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})