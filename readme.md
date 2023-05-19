# zod-class

> NOTE: This library was heavily inspired by the [zod-class](https://github.com/sam-goodwin/zod-class) which made by **[@sam-goodwin](https://github.com/sam-goodwin)**. I took his implementation and rewrote it into the code I needed for my purposes.

## Installation

```bash
pnpm add @imchhh/zod-class
```

## Example

```ts
import { z } from 'zod';
import { ZodClass } from '@imchhh/zod-class';

declare const unknownInput: unknown;

class User extends ZodClass({
  name: z.string(),
  age: z.number(),
}) {}

const user = User.parse(unknownInput);
```

## License

MIT
