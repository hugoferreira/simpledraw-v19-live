import { Action, CreateCircleAction, CreateRectangleAction, TranslateAction } from './actions'
import { Render } from './render';
import { Shape } from './shape'
import { UndoManager } from "./undo";

export class SimpleDrawDocument {
    public objects = new Array<Shape>()
    public undoManager = new UndoManager();

    public undo() {
    this.undoManager.undo();
  }

    public redo() {
    this.undoManager.redo();
  }

    public draw(render: Render): void {
        // this.objects.forEach(o => o.draw(ctx))
        render.draw(...this.objects)
    }

    public add(r: Shape): void {
        this.objects.push(r)
    }

    public do<T>(a: Action<T>): T {
    this.undoManager.onActionDone(a);
    return a.do();
  }

    public createRectangle(x: number, y: number, width: number, height: number): Shape {
        return this.do(new CreateRectangleAction(this, x, y, width, height))
    }

    public createCircle(x: number, y: number, radius: number): Shape {
        return this.do(new CreateCircleAction(this, x, y, radius))
    }

    public translate(s: Shape, xd: number, yd: number): void {
        return this.do(new TranslateAction(this, s, xd, yd))
    }
}