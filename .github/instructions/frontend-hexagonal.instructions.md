---
applyTo: 'src/ui/**,src/core/store/**,src/frontend/**'
description: Enforces frontend hexagonal architecture boundaries between framework adapters and business/application logic
---
# Frontend Hexagonal Architecture Rules

## Goal
Keep frontend business/application logic testable without React, Zustand, or any UI framework dependency.

## Layer Boundaries
- **Core (`src/core/**`)**: pure domain + use cases, no framework or UI-state library.
- **Frontend application (`src/frontend/**`)**: view models and orchestration, framework-agnostic.
- **Driving adapters (`src/ui/adapters/**`)**: React/Zustand integration and hook wiring.
- **UI components/hooks (`src/ui/components/**`, `src/ui/hooks/**`)**: rendering + user interaction only.

## Mandatory Rules
1. `src/core/**` must not import from `react`, `zustand`, `@xyflow/react`, or `src/ui/**`.
2. UI components must call application behavior through view models/adapters, not instantiate use-case handlers directly.
3. View models in `src/frontend/**` must be unit-testable without React rendering or Zustand store runtime.
4. Framework-specific state management belongs to `src/ui/adapters/**`.
5. New frontend business logic must be added in `src/frontend/**` or `src/core/**`, never directly in JSX components.

## Testing Guidance
- Prefer unit tests for view models and use cases without UI framework.
- Keep UI framework tests focused on integration/rendering behavior.
