import { Reactive } from "@turbox3d/turbox3d";
import * as React from "react";
import { store } from "../domain";
import BoxViewEntity from "./boxViewEntity";

@Reactive
export default class ModelsWorld extends React.Component {
  render() {
    return (
      <React.Fragment>
        {[...store.document.models.values()].map((entity) => (
          <BoxViewEntity
            key={entity.id}
            type={Symbol("box")}
            id={entity.id}
            model={entity}
          />
        ))}
      </React.Fragment>
    );
  }
}
