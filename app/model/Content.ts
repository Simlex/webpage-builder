export type HeadingContent = {
  type: ElementTypes.HEADING;
  text: string;
};

export type ParagraphContent = {
  type: ElementTypes.PARAGRAPH;
  text: string;
};

export type ImageContent = {
  type: ElementTypes.IMAGE;
  src: string;
};

export type InputContent = {
  type: ElementTypes.INPUT;
  label: string;
  placeholder: string;
  value: string;
};

export type ButtonContent = {
  type: ElementTypes.BUTTON;
  label: string;
};

export type CardContent = {
  type: ElementTypes.CARD;
  title: string;
  description: string;
  content: string;
  footer: string;
};

export type AccordionContent = {
  type: ElementTypes.ACCORDION;
  items: { trigger: string; content: string }[];
};

export type TabsContent = {
  type: ElementTypes.TABS;
  items: { label: string; value: string; content: string }[];
};

export type SelectContent = {
  type: ElementTypes.SELECT;
  options: { label: string; value: string }[];
  placeholder: string;
};

export type CheckboxContent = {
  type: ElementTypes.CHECKBOX;
  label: string;
};

export type RadioContent = {
  type: ElementTypes.RADIO;
  options: { label: string; value: string }[];
};

export type SwitchContent = {
  type: ElementTypes.SWITCH;
  label: string;
};

export type AvatarContent = {
  type: ElementTypes.AVATAR;
  src: string;
  fallback: string;
};

export type BadgeContent = {
  type: ElementTypes.BADGE;
  text: string;
};

export type AlertContent = {
  type: ElementTypes.ALERT;
  title: string;
  description: string;
};

export type ProgressContent = {
  type: ElementTypes.PROGRESS;
  value: number;
};

// Union type for all possible return values
export type TDefaultContent =
  | HeadingContent
  | ParagraphContent
  | ImageContent
  | InputContent
  | ButtonContent
  | CardContent
  | AccordionContent
  | TabsContent
  | SelectContent
  | CheckboxContent
  | RadioContent
  | SwitchContent
  | AvatarContent
  | BadgeContent
  | AlertContent
  | ProgressContent
  | string; // For the default case

export enum ElementTypes {
  HEADING = "heading",
  PARAGRAPH = "paragraph",
  IMAGE = "image",
  INPUT = "input",
  BUTTON = "button",
  CARD = "card",
  ACCORDION = "accordion",
  TABS = "tabs",
  SELECT = "select",
  CHECKBOX = "checkbox",
  RADIO = "radio",
  SWITCH = "switch",
  AVATAR = "avatar",
  BADGE = "badge",
  ALERT = "alert",
  PROGRESS = "progress",
}

// Mapping ElementTypes to their corresponding content types
export type ElementContentMap = {
  [ElementTypes.HEADING]: HeadingContent;
  [ElementTypes.PARAGRAPH]: ParagraphContent;
  [ElementTypes.IMAGE]: ImageContent;
  [ElementTypes.INPUT]: InputContent;
  [ElementTypes.BUTTON]: ButtonContent;
  [ElementTypes.CARD]: CardContent;
  [ElementTypes.ACCORDION]: AccordionContent;
  [ElementTypes.TABS]: TabsContent;
  [ElementTypes.SELECT]: SelectContent;
  [ElementTypes.CHECKBOX]: CheckboxContent;
  [ElementTypes.RADIO]: RadioContent;
  [ElementTypes.SWITCH]: SwitchContent;
  [ElementTypes.AVATAR]: AvatarContent;
  [ElementTypes.BADGE]: BadgeContent;
  [ElementTypes.ALERT]: AlertContent;
  [ElementTypes.PROGRESS]: ProgressContent;
};
