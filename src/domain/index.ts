import { DocumentDomain } from "./document";
import { ActionsDomain } from "./actions";
import { SceneDomain } from "./scene";

export const store = {
  document: new DocumentDomain(),
  actions: new ActionsDomain(),
  scene: new SceneDomain()
};

declare global {
  interface Window {
    $$debug: any;
  }
}

window.$$debug = store;
