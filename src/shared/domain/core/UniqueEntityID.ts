import { v4 as uuid4 } from "uuid";

import { Identifier } from "./Identifier";

export class UniqueEntityID extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : uuid4());
  }
}
