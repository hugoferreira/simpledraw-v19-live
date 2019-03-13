export interface Shape {
    translate(xd: number, yd: number): void
}


export abstract class BasicShape implements Shape {
    constructor(public x: number, public y: number) { }

    translate(xd: number, yd: number): void {
        this.x += xd
        this.y += yd
    }
}

export class Rectangle extends BasicShape {
    constructor(public x: number, public y: number, public width: number, public height: number) {
        super(x, y)
    }
}

export class Circle extends BasicShape {
    constructor(public x: number, public y: number, public radius: number) {
        super(x, y)
    }
}

export class Selection implements Shape {
    constructor(public objs: Array<Shape>) {}

    translate(xd: number, yd: number): void {
        this.objs.forEach(element => element.translate(xd, yd));
    }
}