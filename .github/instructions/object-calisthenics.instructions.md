---
applyTo: "src/core/domain/**"
---

# Object Calisthenics — Domain Rules

Apply the following **9 Object Calisthenics rules** to every file under `src/core/domain/`:

## Rule 1 — One level of indentation per method
Each method body must have at most one level of indent. Extract helper methods when a second level is needed.

## Rule 2 — No else keyword
Use early-return guards instead of `if/else`. Never use the `else` keyword.

## Rule 3 — Wrap all primitives and strings
Every primitive value (number, string, boolean) used in the domain must be wrapped in a named value-object class. No raw `number` or `string` parameters in domain method signatures.

## Rule 4 — First-class collections
Any class that holds a collection of objects must wrap it in a dedicated class. No raw arrays or maps in domain classes.

## Rule 5 — One dot per line (Law of Demeter)
Never chain method or property accesses across object boundaries: `a.b()` is ok; `a.b().c()` is not.
All domain entity fields must be declared `private` so that external code cannot navigate through them.
Only talk to your immediate collaborators — never to strangers reached through another object's internals.

## Rule 6 — Don't abbreviate
Use full, descriptive names: `column` or `col` is acceptable when it is a well-known domain term, but never single-letter variables outside loops.

## Rule 7 — Keep all entities small
No class longer than 50 lines. No method longer than 10 lines.

## Rule 8 — No classes with more than two instance variables
Each domain class holds at most two fields.

## Rule 9 — No getters/setters / No public fields
All instance variables must be declared `private`. Never expose a raw field value through a public accessor.
Instead, define behaviour-revealing methods that express domain intent (e.g. `isAt(position)`, `shouldShiftWhenInserted(node)`, `toViewData()`).
A method that merely returns a field value is a getter in disguise — name and implement it as a domain operation instead.
