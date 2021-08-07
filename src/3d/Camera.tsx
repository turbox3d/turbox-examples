import { Mesh3D } from "@turbox3d/turbox3d";
import * as THREE from "three";
import { store } from "../domain";

export class Camera extends Mesh3D<{}> {
  protected reactivePipeLine = [this.updateGeometry];
  protected view = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    1,
    30000
  );
  protected viewType: "camera" | "light" | "model" = "camera";

  updateGeometry() {
    const v = store.scene.cameraPosition;
    this.view.position.set(v.x, v.y, v.z);
  }
}
