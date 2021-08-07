import { reactor, Domain, Vector3 } from "@turbox3d/turbox3d";

export class SceneDomain extends Domain {
  @reactor() cameraPosition: Vector3;

  constructor() {
    super();
    this.cameraPosition = new Vector3(0, 0, 500);
  }
}
