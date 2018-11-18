import { JoinPoint } from './join_point';
import { Advice } from './advice';

export class Pointcut {
  public joinPoints: JoinPoint[];
  public advice: Advice;
  private _applications = new Set<Function>();

  public apply(fn: Function, advisedMetadata: any) {
    if (this._applications.has(fn)) {
      return;
    }
    this._applications.add(fn);
    this.joinPoints.forEach(jp => jp.apply({ fn, matches: jp.match(fn), advisedMetadata }, this.advice));
  }
}
