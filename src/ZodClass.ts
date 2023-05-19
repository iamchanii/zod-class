import { z } from 'zod';

export interface ZodClass<
  Shape extends z.ZodRawShape,
  Value = z.infer<z.ZodObject<Shape>>
> {
  schema: z.ZodObject<Shape>;
  parse<T extends InstanceType<this> = InstanceType<this>>(data: unknown): T;
  new (data: Value): Value;
}

export function ZodClass<
  Shape extends z.ZodRawShape,
  Value = z.infer<z.ZodObject<Shape>>
>(shape: Shape): ZodClass<Shape> {
  return class {
    static schema = z.object(shape);

    static parse(data: unknown) {
      return new this(this.schema.parse(data) as Value);
    }

    constructor(data: Value) {
      Object.assign(this, data);
    }
  } as never;
}
