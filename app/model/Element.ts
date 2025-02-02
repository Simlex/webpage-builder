import { ElementContentMap, ElementTypes } from "./Content";

export type TElement<T extends ElementTypes = ElementTypes> = {
  id: string;
  type: T;
  content: ElementContentMap[T];
};
