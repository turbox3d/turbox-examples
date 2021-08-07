import {
  ViewEntity3D,
  IViewEntity,
  EntityObject,
  Reactive
} from "@turbox3d/turbox3d";
import React from "react";
import { appCommandBox } from "../commands/index";
import WireFrame from "./wireframe";
import Box from "./box";

interface IProps extends IViewEntity {
  model: EntityObject;
}

@Reactive
export default class BoxViewEntity extends ViewEntity3D<IProps> {
  protected reactivePipeLine = [
    this.updatePosition,
    this.updateRotation,
    this.updateScale
  ];

  render() {
    const { model } = this.props;
    const isSelected = appCommandBox.defaultCommand.select
      .getSelectedEntities()
      .includes(model);
    return (
      <React.Fragment>
        {isSelected && <WireFrame model={model} />}
        <Box model={model} />
      </React.Fragment>
    );
  }

  private updatePosition() {
    const { model } = this.props;
    this.view.position.set(
      model.position.x,
      model.position.y,
      model.position.z
    );
  }

  private updateRotation() {
    const { model } = this.props;
    this.view.rotation.set(
      model.rotation.x,
      model.rotation.y,
      model.rotation.z
    );
  }

  private updateScale() {
    const { model } = this.props;
    this.view.scale.set(model.scale.x, model.scale.y, model.scale.z);
  }
}
