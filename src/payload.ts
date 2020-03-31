export type ReferenceObjectType = { type: "one" | "many"; ref: string };

export type ObjectType = { [key: string]: any };

export type ArrayType = ObjectType[];

export type FieldType =
  | "string"
  | "integer"
  | "boolean"
  | "reference"
  | "object"
  | "array"
  | ReferenceObjectType
  | ObjectType
  | ArrayType;

export type FieldObjectType = { [key: string]: FieldType };

export type ModelType = { [key: string]: FieldObjectType };

export type PayloadType = {
  attr: FieldType;
  meta?: ReferenceObjectType | ObjectType | ArrayType;
};

export function attr(
  attr: FieldType,
  meta?: ReferenceObjectType | ObjectType | ArrayType
): PayloadType {
  return { attr, meta };
}
