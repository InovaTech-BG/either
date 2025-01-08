export class Left<L, R> {
  readonly _type = "Left" as const;
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isRight(): this is Right<L, R> {
    return false;
  }

  isLeft(): this is Left<L, R> {
    return true;
  }

  extract(): L {
    return this.value;
  }
}

export class Right<L, R> {
  readonly _type = "Right" as const;
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isRight(): this is Right<L, R> {
    return true;
  }

  isLeft(): this is Left<L, R> {
    return false;
  }

  extract(): R {
    return this.value;
  }
}

export type TEither<L, R> = Left<L, R> | Right<L, R>;
export const left = <L, R>(value: L): TEither<L, R> => new Left(value);
export const right = <L, R>(value: R): TEither<L, R> => new Right(value);

abstract class Either<Params, L, R> {
  protected left(value: L): TEither<L, R> {
    return left(value);
  }

  protected right(value: R): TEither<L, R> {
    return right(value);
  }

  // public abstract execute(params: Params): TEither<L, R>;
  // public abstract executeAsync(params: Params): Promise<TEither<L, R>>;
}

export abstract class EitherAsync<Params, L, R> extends Either<Params, L, R> {
  public abstract execute(params: Params): Promise<TEither<L, R>>;
}

export abstract class EitherSync<Params, L, R> extends Either<Params, L, R> {
  public abstract execute(params: Params): TEither<L, R>;
}
