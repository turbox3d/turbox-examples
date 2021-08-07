import { Mesh3D, EntityObject } from "@turbox3d/turbox3d";
import * as THREE from "three";
import { color16 } from "../utils/index";

interface IBoxProps {
  model: EntityObject;
}

export default class Box extends Mesh3D<IBoxProps> {
  protected reactivePipeLine = [this.updateGeometry];
  protected view = new THREE.Mesh();

  updateGeometry() {
    const geometry = new THREE.BoxGeometry(
      this.props.model.size.x,
      this.props.model.size.y,
      this.props.model.size.z
    );
    const material = new THREE.MeshPhongMaterial({ color: color16() });
    this.view.geometry = geometry;
    this.view.material = material;
    this.view.position.set(0, 0, 0);
  }
}
