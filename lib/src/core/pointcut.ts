import {JointPoint} from './joint_point';
import {Advice} from './advice';

export class Pointcut {
  public jointPoints: JointPoint[];
  public advice: Advice;
  public apply(fn) {
    this.jointPoints.forEach(jp => {
      let matches = jp.match(fn);
      jp.wove({fn, matches}, this.advice);
    });
  }
}