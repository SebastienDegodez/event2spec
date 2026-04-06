import type { ActorType } from './ActorType';
import type { SwimlaneColor } from './SwimlaneColor';
export type { ActorType } from './ActorType';
export type { SwimlaneColor } from './SwimlaneColor';

/** An actor or system participant in the event model. */
export interface Actor {
  name: string;
  role: string;
  type: ActorType;
}

/** A horizontal lane representing one actor or system. */
export interface Swimlane {
  id: string;
  actorName: string;
  order: number;
  color: SwimlaneColor;
}

/** A domain event that has occurred in the system. */
export interface DomainEventEntry {
  id: string;
  name: string;
  swimlaneId: string;
  triggeredBy: string;
  data: Record<string, unknown>;
  timelinePosition: number;
}

/** A command that triggers domain events. */
export interface CommandEntry {
  id: string;
  name: string;
  actor: string;
  payload: Record<string, unknown>;
  resultingEvents: string[];
  guardConditions: string[];
}

/** A read model / projection fed by domain events. */
export interface ReadModelEntry {
  id: string;
  name: string;
  fedBy: string[];
  consumedBy: string;
  data: Record<string, unknown>;
}

/** A policy that reacts to an event and triggers a command. */
export interface PolicyEntry {
  id: string;
  name: string;
  whenEvent: string;
  thenCommand: string;
  condition: string;
}

/** A UI screen that triggers commands and displays read models. */
export interface UIScreenEntry {
  id: string;
  name: string;
  description: string;
  triggersCommand: string;
  displaysReadModel: string;
  timelinePosition: number;
}

/** A scenario step. */
export interface Scenario {
  given: string[];
  when: string;
  then: string[];
}

/** A vertical slice grouping command, events, read model, and scenarios. */
export interface VerticalSlice {
  name: string;
  command: string;
  events: string[];
  readModel: string;
  scenarios: Scenario[];
}

/** A bounded context grouping related events under a team. */
export interface BoundedContext {
  name: string;
  events: string[];
  owningTeam: string;
  integrationEvents: string[];
}

/** An architectural or design decision. */
export interface Decision {
  id: string;
  description: string;
  rationale: string;
}

/** An open question to be resolved. */
export interface OpenQuestion {
  id: string;
  question: string;
  raisedBy: string;
}

/** The full event model schema exported by event2spec. */
export interface EventModel {
  name: string;
  version: string;
  description: string;
  actors: Actor[];
  swimlanes: Swimlane[];
  domainEvents: DomainEventEntry[];
  commands: CommandEntry[];
  readModels: ReadModelEntry[];
  policies: PolicyEntry[];
  uiScreens: UIScreenEntry[];
  verticalSlices: VerticalSlice[];
  boundedContexts: BoundedContext[];
  decisions: Decision[];
  openQuestions: OpenQuestion[];
}
