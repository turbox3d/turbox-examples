import * as React from "react";
import { Scene3D, Vector3 } from "@turbox3d/turbox3d";
import { store } from "../domain/index";
import { appCommandBox } from "../commands/index";
import ModelsWorld from "./ModelsWorld";
import { Button, Col, Row, Slider } from "antd";
import { Light } from "./Light";
import { Camera } from "./Camera";

export default class MainScene3D extends React.Component {
  private addCubes = () => {
    store.actions.addCubes();
  };

  private undoHandler = () => {
    store.document.undo();
  };

  private redoHandler = () => {
    store.document.redo();
  };

  private cameraPositionHandler = (value: number) => {
    const { x, y } = store.scene.cameraPosition;
    store.scene.$update({
      cameraPosition: new Vector3(x, y, value)
    });
  };

  render() {
    const { x, y, z } = store.scene.cameraPosition;
    return (
      <Scene3D
        id="scene3d"
        container="root"
        transparent={false}
        commandBox={appCommandBox}
        // skyBoxImages={[
        //   "https://img.alicdn.com/imgextra/i1/O1CN01a6GX3j1Sik7JM7aai_!!6000000002281-2-tps-1800-1800.png",
        //   "https://img.alicdn.com/imgextra/i2/O1CN01PD3inR1poucQ2EOGD_!!6000000005408-2-tps-1800-1800.png",
        //   "https://img.alicdn.com/imgextra/i2/O1CN01oFyCQW1LeR5IlBpil_!!6000000001324-2-tps-1800-1800.png",
        //   "https://img.alicdn.com/imgextra/i2/O1CN01NBtLXn1d8WZbAH8SB_!!6000000003691-2-tps-1800-1800.png",
        //   "https://img.alicdn.com/imgextra/i1/O1CN01krgToR1SjCWAWNSCK_!!6000000002282-2-tps-1800-1800.png",
        //   "https://img.alicdn.com/imgextra/i2/O1CN01tkXWku1XdltxcnaeB_!!6000000002947-2-tps-1800-1800.png"
        // ]}
        backgroundColor={0xcccccc}
        cameraPosition={{ x, y, z }}
        cameraTarget={{ x: 0, y: 0, z: 0 }}
      >
        <ModelsWorld />
        <Light />
        <Camera />
        <Row>
          <Col span={12}>
            <Button onClick={this.addCubes}>Add Cubes</Button>
            <Button onClick={this.undoHandler}>Undo</Button>
            <Button onClick={this.redoHandler}>Redo</Button>
          </Col>
          <Col span={12}>
            <Slider
              min={0}
              max={1000}
              defaultValue={z}
              onChange={this.cameraPositionHandler}
            />
          </Col>
        </Row>
      </Scene3D>
    );
  }
}

// test
// class Test3DMesh extends Box {
//   protected view;
//   draw() {
//     setTimeout(() => {
//       const mesh = convertBufferGeometryToStreamingMesh(
//         new THREE.BoxBufferGeometry(15, 15, 15),
//       );
//       const meshComp = new MeshComponent();
//       meshComp.setMesh(mesh as Mesh);
//       const Mat = new MeshBasicMaterial({ });
//       meshComp.setMaterial(Mat);
//       this.view.addComponent(meshComp);
//     }, 3000);
//   }
// }
