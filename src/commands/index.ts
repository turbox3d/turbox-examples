import {
  HintCommand,
  SelectionCommand,
  BaseCommandBox,
  compose,
  IViewEntity,
  SceneMouseEvent,
  EntityObject,
  Action,
  Vector3,
  Vec3,
  ITool
} from "@turbox3d/turbox3d";
import * as THREE from "three";

class DefaultCommand extends compose({
  select: SelectionCommand,
  hint: HintCommand
}) {
  targetModel?: EntityObject;
  action: Action;
  initPosition?: Vector3;
  preModelPosition?: Vector3;

  active() {
    this.select.active({
      hint: this.hint
    });
    this.hint.active(this.select);
  }

  onClick(viewEntity: IViewEntity, event: SceneMouseEvent) {
    console.log("***", viewEntity);
  }

  onDragStart(viewEntity: IViewEntity, event: SceneMouseEvent) {
    const mp = event.scenePosition as Vec3;
    this.action = Action.create("adjustModelPosition", "调整模型位置");
    this.targetModel = EntityObject.getEntityById(viewEntity.id);
    this.initPosition = new Vector3(mp.x, mp.y, mp.z);
    if (this.targetModel) {
      this.preModelPosition = this.targetModel.position.clone();
    }
  }

  onDragMove(viewEntity: IViewEntity, event: SceneMouseEvent, tools: ITool) {
    if (!this.initPosition) {
      return;
    }
    const camera = tools.getCamera() as THREE.PerspectiveCamera;
    const normal = camera.getWorldDirection(new THREE.Vector3(0, 0, 0));
    const mp = event.scenePosition as Vec3;
    const currentPosition = new Vector3(mp.x, mp.y, mp.z);
    const intersectPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(
      normal.normalize(),
      new THREE.Vector3(currentPosition.x, currentPosition.y, currentPosition.z)
    );
    const mousePoint = intersectPlane.intersectLine(
      new THREE.Line3(),
      new THREE.Vector3(0, 0, 0)
    );
    const moveDistance = new Vector3(
      mousePoint?.x,
      mousePoint?.y,
      mousePoint?.z
    ).sub(this.initPosition);
    this.action.execute(() => {
      if (this.targetModel && this.preModelPosition) {
        this.targetModel.setPosition(this.preModelPosition.add(moveDistance));
      }
    });
  }

  onDragEnd() {
    this.action.complete();
  }
}

class AppCommandBox extends BaseCommandBox {
  defaultCommand = new DefaultCommand(this);

  constructor() {
    super();
    this.defaultCommand.apply();
  }
}

export const appCommandBox = new AppCommandBox();
