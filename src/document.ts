import { Action, CreateCircleAction, CreateRectangleAction, TranslateAction } from './actions'
import { Render } from './render'
import { Shape } from './shape'

export class SimpleDrawDocument {
  public objects = new Array<Shape>()
  public doStack = new Array<Action<any>>()
  public undoStack = new Array<Action<any>>()

  public undo () {
    if (this.doStack.length > 0) {
      const a1 = this.doStack.pop()
      a1.undo()
      this.undoStack.push(a1)
    }
  }

  public redo () {
    if (this.undoStack.length > 0) {
      const a1 = this.undoStack.pop()
      a1.do()
      this.doStack.push(a1)
    }
  }

  public draw (render: Render): void {
        // this.objects.forEach(o => o.draw(ctx))
    render.draw(...this.objects)
  }

  public add (r: Shape): void {
    this.objects.push(r)
  }

  public do<T> (a: Action<T>): T {
    this.doStack.push(a)
    this.undoStack.length = 0
    return a.do()
  }

  public createRectangle (x: number, y: number, width: number, height: number): Shape {
    return this.do(new CreateRectangleAction(this, x, y, width, height))
  }

  public createCircle (x: number, y: number, radius: number): Shape {
    return this.do(new CreateCircleAction(this, x, y, radius))
  }

  public translate (s: Shape, xd: number, yd: number): void {
    return this.do(new TranslateAction(this, s, xd, yd))
  }
}
