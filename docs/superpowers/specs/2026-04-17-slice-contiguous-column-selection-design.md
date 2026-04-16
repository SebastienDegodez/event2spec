# Slice Contiguous Column Selection Design

Date: 2026-04-17
Status: Draft for review
Scope: Canvas slice selection, contiguous extension, and slice header actions

## 1. Objective

Improve vertical slices UX on the board so users can:
- Select a free column as a slice start.
- Extend selection contiguously to the right with a header arrow button.
- See slices clearly with a grouped title and a visual bounding rectangle.
- Open slice editing and scenario management from the slice header on canvas.

Constraints validated with user:
- Slices are always contiguous.
- A column already belonging to a slice is not selectable.
- Arrow extension button is disabled when next column is not available (already used or out of bounds).
- Existing forms are kept for now; only entry points and placement change.

## 2. UX Behavior

### 2.1 Column Selection

- Clicking a free column starts a temporary selection range.
- Clicking a covered column does nothing for new selection.
- Temporary selection range is represented as:
  - startColumn
  - columnCount
- Covered columns are computed from existing slices and treated as unavailable.

### 2.2 Contiguous Extension With Arrow

- A right arrow button appears in the selection/slice header.
- Clicking arrow extends range by exactly one column to the right.
- Repeated clicks continue contiguous extension rightward.
- Arrow is disabled when:
  - next column is already covered by another slice, or
  - next column exceeds board column limit.

### 2.3 Slice Visualization

Each persisted slice is rendered with:
- Header above grouped columns with slice title.
- Subtle bounding rectangle around all covered columns.
- Header actions:
  - Extend right (arrow)
  - View/Edit
  - Scenarios

Visual layering:
- Slice rectangle under sticky notes and links.
- Header controls remain accessible and readable.

### 2.4 Slice Editing Entry Point

- Slice creation/edit opening moves from left area to slice header on canvas.
- Existing form components remain unchanged functionally.
- Existing scenario add/edit/remove behaviors remain unchanged.

## 3. Technical Design

### 3.1 Data Representation

Introduce contiguous column range for each slice:
- startColumn: number
- columnCount: number

Derived helper:
- coveredColumns(slice): number[]

Rationale:
- Native model support for contiguous ranges.
- Efficient overlap checks and extension.
- Direct mapping to grouped rectangle rendering.

### 3.2 Domain Rules

For any create/extend operation:
- Reject if target column overlaps an existing slice.
- Reject if target column is out of board bounds.
- Reject non-contiguous range updates.

Rules are enforced at both levels:
- UI: disabled controls and blocked interactions.
- Store/usecase/domain: invariant validation for safety.

### 3.3 Persistence and Compatibility

Storage payload version evolves to include contiguous range fields.

Load strategy:
- Read persisted slice range when available.
- If legacy data has only node references, infer start/end from linked node columns and normalize to contiguous range.
- If inference is impossible or inconsistent, skip invalid range update and keep board operational.

Save strategy:
- Persist range fields for all slices.
- Keep existing slice business fields (name, command/event/read model/scenarios, bounded context).

## 4. Components and Integration

Target areas:
- Canvas rendering and overlays:
  - render slice headers and group rectangle
  - disable/enable extension arrow based on availability
- Column selection state/actions:
  - start selection on free column
  - contiguous extend action
- Slice panel entry points:
  - move open/edit/scenario actions into slice header
  - keep form internals unchanged for now

No behavior changes required for:
- Core scenario form semantics
- Existing node linking behaviors
- Existing bounded context assignment semantics

## 5. Error Handling and Edge Cases

- Click on covered column: no selection start.
- Extend on blocked next column: arrow disabled, no mutation.
- Extend at max board column: arrow disabled.
- Concurrent state update edge (e.g., quick repeated clicks): validate on command handler side before save.
- Legacy inconsistent slices: gracefully skip invalid range mutation rather than crashing load.

## 6. Test Strategy

### 6.1 Domain/Usecase Tests

- Create slice with contiguous range succeeds on free columns.
- Create slice fails on overlap.
- Extend slice by one column succeeds when free.
- Extend slice fails when next column occupied.
- Extend slice fails when out of bounds.

### 6.2 Store Tests

- Persist and reload range fields.
- Legacy payload normalization to range.
- Invalid legacy range does not break board load.

### 6.3 UI Tests

- Covered column cannot start selection.
- Arrow enabled on valid next column.
- Arrow disabled on occupied next column.
- Arrow disabled at right bound.
- Slice header renders title and action buttons.
- Group rectangle spans exact slice columns.

### 6.4 E2E Test

Scenario:
1. Select free column N.
2. Click arrow twice.
3. Confirm selected range is columns N..N+2.
4. Create slice.
5. Confirm rendered header and bounding rectangle cover 3 contiguous columns.
6. Confirm a covered next column disables extension arrow.

## 7. Migration and Rollout

Incremental rollout:
1. Add range representation and persistence.
2. Add domain guards for overlap/out-of-bounds.
3. Render header + rectangle overlays.
4. Wire arrow extension action and disabled logic.
5. Move open/edit/scenarios trigger to slice header.
6. Keep old left-side content minimal or remove entry triggers once header controls are stable.

## 8. Risks and Mitigations

- Risk: visual overlays reduce readability.
  - Mitigation: low-opacity rectangle, strict z-index policy.
- Risk: legacy data mismatch.
  - Mitigation: safe normalization with fallback behavior.
- Risk: duplicated state logic between temporary selection and persisted slices.
  - Mitigation: shared helper for coverage/availability checks.

## 9. Non-Goals

- Full redesign of forms.
- Full replacement of side panels unrelated to slices.
- Changes to bounded context business rules.
