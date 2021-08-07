import { Domain } from "@turbox3d/turbox3d";
import { store } from ".";
import { BoxEntity } from "../models/box";

function getNeg() {
  const gap = 200;
  return Math.random() > 0.5 ? -gap : gap;
}

export class ActionsDomain extends Domain {
  addCubes = () => {
    for (let index = 0; index < 50; index++) {
      const entity = new BoxEntity();
      entity.setSize({ x: 30, y: 30, z: 30 });
      entity.setPosition({
        x: Math.random() * getNeg(),
        y: Math.random() * getNeg(),
        z: Math.random() * getNeg()
      });
      store.document.addModel(entity);
    }
  };
}
