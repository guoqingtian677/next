import { Container, Sprite, Assets, Point } from 'pixi.js'
import { Mini3d } from '../utils/Mini3D';
import { random,  } from '../utils/Math2'


class Cloud extends Sprite {

    position3d: { x: number, y: number, z: number }
    scaleRatio: number
    scaleOffset: Point
    constructor(...args: any[]) {
        super(...args);
        this.position3d = { x: 0, y: 0, z: 0 };
        this.scaleRatio = 2;
        this.scaleOffset = new Point(1, 1);
    }
}


export default class Clouds {
    mini3d: Mini3d
    view: Container
    speed: number = -15
    clouds: Sprite[] = []
    count: number
    range: number = 3e3
    constructor() {
        this.view = new Container();
        this.mini3d = new Mini3d();
        this.view.addChild(this.mini3d.view);
        let images = [Assets.get('skyCloud1'), Assets.get('skyCloud2')];
        for (var e = 0; 50 > e; e++) {
            var i: any = new Cloud(images[e % 2]);
            this.mini3d.addChild(i);
            this.clouds.push(i);
            i.position3d.z = -(this.range / 50) * e;
        }
        console.log(23333)
        this.count = 0;
    }
    updated() {
         for (var t = 0; t < this.clouds.length; t++) {
            var e: any = this.clouds[t];
            (e.position3d.z += this.speed);
              e.position3d.z < 300 ? (e.alpha = e.position3d.z / 300) : (e.alpha += 0.01 * (1 - e.alpha))
              e.position3d.z < 0 &&
                ((e.scaleRatio = 5),
                (e.position3d.z += this.range),
                (e.position3d.x = random(-4500, 4500)),
                (e.position3d.y = 1200 - Math.abs(0.2 * e.position3d.x) + random(0, 200)),
                (e.rotation = e.position3d.x * -2e-4),
                (e.alpha = 0),
                (e.scaleOffset.x = random(0.6, 1.4)),
                (e.scaleOffset.y = random(0.9, 1.1)),
                Math.random() < 0.5 && (e.scaleOffset.x *= -1));
          }
          this.mini3d.update();
            this.count++;
            (this.mini3d.view.rotation = 0.08 * Math.cos(0.02 * this.count));
            (this.mini3d.position3d.y = 200 * Math.sin(0.03 * this.count));
            (this.mini3d.position3d.y -= 50);
            (this.mini3d.rotation3d.y = 0.2 * Math.sin(0.02 * this.count * 0.5));
    }
}