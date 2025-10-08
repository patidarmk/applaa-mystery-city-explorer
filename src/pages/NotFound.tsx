<problem file="src/pages/NotFound.tsx" line="1" column="29" code="2307">Cannot find module 'react-router-dom' or its corresponding type declarations.</problem>
<problem file="src/contexts/GameContext.tsx" line="2" column="137" code="2307">Cannot find module '@/data/gameData' or its corresponding type declarations.</problem>
<problem file="src/components/GameMap.tsx" line="2" column="42" code="2307">Cannot find module '@/data/gameData' or its corresponding type declarations.</problem>
<problem file="src/components/GameMap.tsx" line="3" column="25" code="2307">Cannot find module '@/contexts/GameContext' or its corresponding type declarations.</problem>
<problem file="src/components/GameMap.tsx" line="4" column="40" code="2307">Cannot find module '@/data/gameData' or its corresponding type declarations.</problem>
<problem file="src/components/GameMap.tsx" line="31" column="11" code="2322">Type '&quot;/game/landmark&quot;' is not assignable to type '&quot;/&quot; | &quot;.&quot; | &quot;..&quot;'.</problem>
<problem file="src/components/GameMap.tsx" line="32" column="11" code="2322">Type '(prev: any) =&gt; any' is not assignable to type 'ParamsReducerFn&lt;RouterCore&lt;Route&lt;Register, any, &quot;/&quot;, &quot;/&quot;, string, &quot;__root__&quot;, undefined, {}, {}, AnyContext, AnyContext, {}, undefined, readonly [Route&lt;unknown, RootRoute&lt;Register, ... 10 more ..., undefined&gt;, ... 15 more ..., undefined&gt;], unknown, unknown, unknown, undefined&gt;, &quot;never&quot;, false, RouterHistory, Record&lt;...'.
  Type 'any' is not assignable to type 'never'.</problem>
<problem file="src/components/PuzzleModal.tsx" line="2" column="33" code="2307">Cannot find module '@/data/gameData' or its corresponding type declarations.</problem>
<problem file="src/components/PuzzleModal.tsx" line="3" column="25" code="2307">Cannot find module '@/contexts/GameContext' or its corresponding type declarations.</problem>
<problem file="src/components/LandmarkDetail.tsx" line="3" column="54" code="2307">Cannot find module '@/data/gameData' or its corresponding type declarations.</problem>
<problem file="src/components/LandmarkDetail.tsx" line="9" column="25" code="2307">Cannot find module '@/contexts/GameContext' or its corresponding type declarations.</problem>
<problem file="src/components/LandmarkDetail.tsx" line="18" column="30" code="2322">Type '&quot;/game/landmark&quot;' is not assignable to type 'ConstrainLiteral&lt;&quot;/game/landmark&quot;, &quot;__root__&quot; | &quot;/&quot;, &quot;__root__&quot; | &quot;/&quot;&gt;'.</problem>
<problem file="src/components/LandmarkDetail.tsx" line="19" column="20" code="2552">Cannot find name 'useLocation'. Did you mean 'location'?</problem>
<problem file="src/components/LandmarkDetail.tsx" line="41" column="35" code="2322">Type '&quot;/game&quot;' is not assignable to type '&quot;/&quot; | &quot;.&quot; | &quot;..&quot;'.</problem>
</dyad-problem-report><applaa-write path="src/pages/NotFound.tsx" description="Fix import: Use TanStack Router's useLocation instead of react-router-dom. Ensure no 404 by adding route later, but fix current errors.">
import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;