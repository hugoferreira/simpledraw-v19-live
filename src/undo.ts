interface UndoableAction<S> { do(): S; undo(): void }

export class UndoManager<S, A extends UndoableAction<S>> {
  public doStack = new Array<A>();
  public undoStack = new Array<A>();

  public undo() {
    if (this.doStack.length > 0) {
      const a1 = this.doStack.pop();
      a1.undo();
      this.undoStack.push(a1);
    }
  }

  public redo() {
    if (this.undoStack.length > 0) {
      const a1 = this.undoStack.pop();
      a1.do();
      this.doStack.push(a1);
    }
  }

  public onActionDone(a: A): void {
    this.doStack.push(a);
    this.undoStack.length = 0;
  }
}
