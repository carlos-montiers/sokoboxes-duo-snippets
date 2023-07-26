/*
 * Author: Carlos Montiers Aguilera
 * Project: Sokoboxes Duo
 */

/**
 * CompactLinkedList is a class that implements a singly linked list, optimizing memory usage.
 * When the last value is the same as the previous one, instead of creating a new node,
 * it increments a counter.
 */
export class CompactLinkedList<T extends PrimitiveTypes> {
  protected tail: CompactLinkedListNode<T> | null;

  constructor() {
    this.tail = null;
  }

  public push(value: T): void {
    if (this.tail && this.tail.value === value) {
      this.tail.repeated = (this.tail.repeated || 0) + 1;
      return;
    }

    const newNode = new CompactLinkedListNode<T>(value);
    newNode.prev = this.tail;
    this.tail = newNode;
  }

  public last(): T | undefined {
    return this.tail ? this.tail.value : undefined;
  }

  public pop(): T | undefined {
    if (!this.tail) {
      return undefined;
    }

    if (this.tail.repeated) {
      this.tail.repeated = this.tail.repeated - 1 || undefined;
      return this.tail.value;
    }

    const tailNode = this.tail;
    this.tail = this.tail.prev;
    tailNode.prev = null;

    return tailNode.value;
  }

  public async asyncRemoveAll(): Promise<void> {
    while (this.pop() !== undefined) {}
  }
}

type PrimitiveTypes = string | number | boolean;

class CompactLinkedListNode<T extends PrimitiveTypes> {
  prev: CompactLinkedListNode<T> | null;
  value: T;
  repeated?: number;

  constructor(value: T) {
    this.value = value;
    this.prev = null;
  }
}
