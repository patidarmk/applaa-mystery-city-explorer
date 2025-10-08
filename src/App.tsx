import * as React from 'react'
import { 
  createRouter, 
  RouterProvider, 
  createRootRoute, 
  createRoute as createTanStackRoute, 
  createFileRoute,
  Outlet 
} from '@tanstack/react-router'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GameProvider } from '@/contexts/GameContext';
import Index from "./pages/Index";
import Game from "./pages/Game";
import Inventory from "./pages/Inventory";
import Achievements from "./pages/Achievements";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LandmarkDetail from "./pages/LandmarkDetail";
import NotFound from "./pages/NotFound";
import Header from '@/components/Header';
import { MadeWithApplaa } from '@/components/made-with-applaa';

const queryClient = new QueryClient();

// Create root route
const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <GameProvider>
          <Header />
          <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <Outlet />
          </main>
          <MadeWithApplaa />
          <Toaster />
          <Sonner />
        </GameProvider>
      </TooltipProvider>
    </QueryClientProvider>
  ),
})

// Create routes
const indexRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
});

const gameRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/game',
  component: Game,
});

const landmarkRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/game/landmark',
  component: LandmarkDetail,
  validateSearch: (search: any) => {
    return { id: search.id };
  },
});

const inventoryRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/inventory',
  component: Inventory,
});

const achievementsRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/achievements',
  component: Achievements,
});

const aboutRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const contactRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
});

const notFoundRoute = createTanStackRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
});

// Create route tree
const routeTree = rootRoute.addChildren([indexRoute, gameRoute, landmarkRoute, inventoryRoute, achievementsRoute, aboutRoute, contactRoute, notFoundRoute])

// Create router
const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent' as const,
  defaultPreloadStaleTime: 0,
})

// Register for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const App = () => <RouterProvider router={router} />

export default App;