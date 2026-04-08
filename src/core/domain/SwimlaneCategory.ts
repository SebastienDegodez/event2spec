/**
 * Horizontal sub-row category within a swimlane.
 *
 * Each swimlane is divided into three sub-rows:
 * - `actor_ui` — UI Screens, external system interfaces
 * - `command_readmodel` — Commands, Read Models, Policies
 * - `event` — Domain Events
 */
export type SwimlaneCategory = 'actor_ui' | 'command_readmodel' | 'event';

/** Ordered list of categories within a swimlane (top → bottom). */
export const SWIMLANE_CATEGORIES: readonly SwimlaneCategory[] = ['actor_ui', 'command_readmodel', 'event'] as const;

/** Number of grid rows occupied by a single swimlane. */
export const ROWS_PER_SWIMLANE = SWIMLANE_CATEGORIES.length;
