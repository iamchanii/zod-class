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
  const schema = z.object(shape);
  return class {
    static schema = schema;

    static parse(data: unknown) {
      return new this(schema.parse(data) as Value);
    }

    constructor(data: Value) {
      Object.assign(this, data);

      (this.constructor as ZodClass<Shape>).parse = (
        this.constructor as ZodClass<Shape>
      ).parse.bind(this.constructor);
    }
  } as never;
}
