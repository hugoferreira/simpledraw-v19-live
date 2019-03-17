import { SimpleDrawDocument } from './document'
import { Circle, Rectangle, Shape } from './shape'

export interface Action<T> {
  shape: Shape
  do (): T
  undo (): void
}

interface CreateAction extends Action<Shape> {
  shape: Shape
}

export class CreateCircleAction implements CreateAction {
  public shape: Circle

  constructor (private doc: SimpleDrawDocument, private x: number, private y: number, private radius: number) {}

  public do (): Circle {
    this.shape = new Circle(this.x, this.y, this.radius)
    this.doc.add(this.shape)
    return this.shape
  }

  public undo () {
    this.doc.objects = this.doc.objects.filter(o => o !== this.shape)
  }
}

export class CreateRectangleAction {
  public shape: Rectangle

  constructor (private doc: SimpleDrawDocument, private x: number, private y: number, private width: number, private height: number) { }

  public do (): Rectangle {
    this.shape = new Rectangle(this.x, this.y, this.width, this.height)
    this.doc.add(this.shape)
    return this.shape
  }

  public undo () {
    this.doc.objects = this.doc.objects.filter(o => o !== this.shape)
  }
}

export class TranslateAction implements Action<void> {
  public oldX: number
  public oldY: number

  constructor (private doc: SimpleDrawDocument, public shape: Shape, private xd: number, private yd: number) { }

  public do (): void {
    this.oldX = this.shape.x
    this.oldY = this.shape.y
    this.shape.translate(this.xd, this.yd)
  }

  public undo () {
    this.shape.x = this.oldX
    this.shape.y = this.oldY
       // this.shape.translate(-this.xd, -this.yd)
  }
}
