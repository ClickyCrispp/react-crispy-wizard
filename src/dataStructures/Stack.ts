export class Stack<T> {
    private _elements: Array<T> = [];
  
    constructor(elements?: T[]) {
      if (elements) {
        this._elements = elements;
      }
    }
  
    private isEmpty() {
      return this._elements.length === 0;
    }
  
    size() {
      return this._elements.length;
    }
  
    peek() {
      if (this.isEmpty()) {
        return undefined;
      }
  
      return this._elements[this._elements.length - 1];
    }
  
    // Shallow copy
    toArray() {
      return [...this._elements];
    }
  
    // MUTATIONS
    push(element: T) {
      this._elements.push(element);
      return this;
    }
  
    pop() {
      if (this.isEmpty()) {
        return undefined;
      }
      return this._elements.pop();
    }
  
    clear() {
      this._elements = [];
    }
  }