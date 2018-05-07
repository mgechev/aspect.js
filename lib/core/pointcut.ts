import { JoinPoint } from './join_point';
import { Advice } from './advice';

export class Pointcut {
  public joinPoints: JoinPoint[];
  public advice: Advice;
  private _applications = new Set<Function>();

  public apply(fn: Function, woveMetadata: any) {
    if (this._applications.has(fn)) {
      return;
    }
    this._applications.add(fn);
    this.joinPoints.forEach(jp => jp.wove({ fn, matches: jp.match(fn), woveMetadata }, this.advice));
  }
}
