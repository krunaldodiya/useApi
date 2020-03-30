export type ReferenceObjectType = { type: "one" | "many"; ref: string };

export type CustomObjectType = { [key: string]: any };

export type FieldType =
  | "string"
  | "integer"
  | "boolean"
  | "reference"
  | "custom"
  | ReferenceObjectType
  | CustomObjectType;

export type FieldObjectType = { [key: string]: FieldType };

export type ModelType = { [key: string]: FieldObjectType };

export type PayloadType = {
  attr: FieldType;
  meta?: ReferenceObjectType | CustomObjectType;
};

export function attr(
  attr: FieldType,
  meta?: ReferenceObjectType | CustomObjectType
): PayloadType {
  return { attr, meta };
}
