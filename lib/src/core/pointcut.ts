import { JointPoint } from './joint_point';
import { Advice } from './advice';

export class Pointcut {
  public jointPoints: JointPoint[];

  public advice: Advice;

  private _applications = new Set<Function>();

  public apply(fn: Function, woveMetadata: any) {
    if (this._applications.has(fn)) {
      return;
    } else {
      this._applications.add(fn);
    }
    this.jointPoints.forEach(jp => {
      let matches = jp.match(fn);
      jp.wove({ fn, matches, woveMetadata }, this.advice);
    });
  }
}
