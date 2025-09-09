import { Card } from "./card.types";

export class CardEntity {
  private props: Card;

  constructor(props: Card) {
    if (!props.title || props.title.trim().length < 3) {
      throw new Error("Card title must be at least 3 characters long");
    }
    this.props = { ...props };
  }

  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get boardId() {
    return this.props.boardId;
  }

  get listId() {
    return this.props.listId;
  }

  // ✅ Business rules

  updateTitle(newTitle: string) {
    if (newTitle.trim().length < 3) {
      throw new Error("Card title must be at least 3 characters long");
    }
    this.props.title = newTitle;
    this.props.updatedAt = new Date();
  }

  moveToList(newListId: string, position: number) {
    if (!newListId) throw new Error("List ID required");
    this.props.listId = newListId;
    this.props.order = position;
    this.props.updatedAt = new Date();
  }

  assignLabel(label: string) {
    if (!label) throw new Error("Label is invalid");
    if (!this.props.labels.includes(label)) {
      this.props.labels.push(label);
    }
  }

  removeLabel(label: string) {
    this.props.labels = this.props.labels.filter((l) => l !== label);
  }

  // export raw object if needed
  toObject(): Card {
    return { ...this.props };
  }
}
