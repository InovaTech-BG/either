import { EitherAsync, EitherSync, left, right, TEither } from "./either";

class InvalidNumberError extends Error {
	constructor() {
		super("Invalid number");
	}
}

class NaNError extends Error {
	constructor() {
		super("NaN");
	}
}

function DoSomething(
	params: number,
): TEither<InvalidNumberError | NaNError, string> {
	if (Number.isNaN(params)) {
		return left(new NaNError());
	}

	if (params < 0) {
		return left(new InvalidNumberError());
	}

	return right("Success");
}

class DoSomethingSyncClass extends EitherSync<
	number,
	InvalidNumberError | NaNError,
	string
> {
	public execute(
		params: number,
	): TEither<InvalidNumberError | NaNError, string> {
		if (Number.isNaN(params)) {
			return this.left(new NaNError());
		}

		if (params < 0) {
			return this.left(new InvalidNumberError());
		}

		return this.right("Success");
	}
}

class DoSomethingAsyncClass extends EitherAsync<
  number,
  InvalidNumberError | NaNError,
  string
> {
  public async execute(
    params: number,
  ): Promise<TEither<InvalidNumberError | NaNError, string>> {
    if (Number.isNaN(params)) {
      return this.left(new NaNError());
    }

    if (params < 0) {
      return this.left(new InvalidNumberError());
    }

    return this.right("Success");
  }
}

describe("Either", () => {
	it("should return Left with InvalidNumberError", () => {
		const result = DoSomething(-1);
		expect(result.isLeft()).toBe(true);
		expect(result.extract()).toBeInstanceOf(InvalidNumberError);
	});

	it("should return Left with NaNError", () => {
		const result = DoSomething(Number.NaN);
		expect(result.isLeft()).toBe(true);
		expect(result.extract()).toBeInstanceOf(NaNError);
	});

	it("should return Right with Success", () => {
		const result = DoSomething(1);
		expect(result.isRight()).toBe(true);
		expect(result.extract()).toBe("Success");
	});

  it("should return Left with InvalidNumberError on sync class", () => {
    const doSomething = new DoSomethingSyncClass();
    const result = doSomething.execute(-1);
    expect(result.isLeft()).toBe(true);
    expect(result.extract()).toBeInstanceOf(InvalidNumberError);
  });

  it("should return Left with NaNError on sync class", () => {
    const doSomething = new DoSomethingSyncClass();
    const result = doSomething.execute(Number.NaN);
    expect(result.isLeft()).toBe(true);
    expect(result.extract()).toBeInstanceOf(NaNError);
  });

  it("should return Right with Success on sync class", () => {
    const doSomething = new DoSomethingSyncClass();
    const result = doSomething.execute(1);
    expect(result.isRight()).toBe(true);
    expect(result.extract()).toBe("Success");
  });

  it("should return Left with InvalidNumberError on async class", async () => {
    const doSomething = new DoSomethingAsyncClass();
    const result = await doSomething.execute(-1);
    expect(result.isLeft()).toBe(true);
    expect(result.extract()).toBeInstanceOf(InvalidNumberError);
  });

  it("should return Left with NaNError on async class", async () => {
    const doSomething = new DoSomethingAsyncClass();
    const result = await doSomething.execute(Number.NaN);
    expect(result.isLeft()).toBe(true);
    expect(result.extract()).toBeInstanceOf(NaNError);
  });

  it("should return Right with Success on async class", async () => {
    const doSomething = new DoSomethingAsyncClass();
    const result = await doSomething.execute(1);
    expect(result.isRight()).toBe(true);
    expect(result.extract()).toBe("Success");
  });
});
