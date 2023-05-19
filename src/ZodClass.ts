import { z } from 'zod';

export interface ZodClass<
  Shape extends z.ZodRawShape,
  Value = z.infer<z.ZodObject<Shape>>
> {
  parse<T extends InstanceType<this> = InstanceType<this>>(data: unknown): T;
  new (data: Value): Value;
}

export function ZodClass<Shape extends z.ZodRawShape>(
  shape: Shape
): ZodClass<Shape> {
  const schema = z.object(shape);

  return class {
    static parse(data: unknown) {
      return new this(schema.parse(data));
    }

    constructor(data: any) {
      Object.assign(this, data);
    }
  } as never;
}
