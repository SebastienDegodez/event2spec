import { type ActorType } from './ActorType';
import { type SwimlaneColor } from './SwimlaneColor';

/** Domain object representing a horizontal lane grouping post-its by actor or system. */
export class Swimlane {
  readonly id: string;
  readonly actorName: string;
  readonly actorType: ActorType;

  private constructor(id: string, actorName: string, actorType: ActorType) {
    this.id = id;
    this.actorName = actorName;
    this.actorType = actorType;
  }

  static create(id: string, actorName: string, actorType: ActorType): Swimlane {
    return new Swimlane(id, actorName, actorType);
  }

  color(): SwimlaneColor {
    const colors: Record<ActorType, SwimlaneColor> = {
      human: 'yellow',
      internal_system: 'blue',
      external_system: 'red',
      automated_process: 'grey',
    };
    return colors[this.actorType];
  }

  withActorName(actorName: string): Swimlane {
    return new Swimlane(this.id, actorName, this.actorType);
  }

  withActorType(actorType: ActorType): Swimlane {
    return new Swimlane(this.id, this.actorName, actorType);
  }
}
