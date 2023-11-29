import { authenticate } from "@/lib/lucia";
import { ZodSchema, ZodTypeAny, z } from "zod";
import * as context from "next/headers";
import { User } from "@/lib/db/schema";

type Callback<I, D, WithGuard = false> = (
  input: I,
  authenticated: WithGuard extends true | "guard_or_pass"
    ? { user: User; session: any }
    : undefined
) => Promise<D>;

export function data<
  S extends ZodTypeAny,
  Input extends z.infer<S>,
  Data extends any,
  Guard extends true | "guard_or_pass",
  CB extends Callback<Input, Data, Guard>,
  ReturnedData extends Awaited<ReturnType<CB>>
>(withGuard: Guard, schema: S, cb: CB): (input: Input) => Promise<ReturnedData>;

export function data<
  S extends ZodTypeAny,
  Input extends z.infer<S>,
  Data extends any,
  Guard extends false,
  CB extends Callback<Input, Data, Guard>,
  ReturnedData extends Awaited<ReturnType<CB>>
>(schema: S, cb: CB): (input: Input) => Promise<ReturnedData>;

export function data<
  S extends ZodTypeAny,
  Input extends z.infer<S>,
  Data extends any,
  Guard extends boolean,
  CB extends Callback<Input, Data, Guard>,
  ReturnedData extends Awaited<ReturnType<CB>>
>(
  opt1: Guard | S,
  opt2: S | CB,
  opt3?: CB
): (input: Input) => Promise<ReturnedData> {
  return async (input) => {
    let withGuard: boolean = false;
    let schema: ZodSchema;
    let cb: CB;

    if (
      typeof opt1 === "boolean" ||
      (typeof opt1 === "string" && opt1 === "guard_or_pass")
    ) {
      withGuard = opt1;
    } else {
      schema = opt1;
    }

    if (typeof opt2 === "function") {
      if (typeof opt1 === "boolean") {
        throw new Error("Schema must be provided");
      }
      schema = opt1;
      cb = opt2;
    } else {
      schema = opt2;

      if (opt3) {
        cb = opt3;
      } else {
        throw new Error("Callback is required");
      }
    }

    const result = schema.safeParse(input);
    if (!result.success) {
      console.log(result.error);
      throw result.error;
    }

    let authenticated: { user: User; session: any } | undefined;
    if (withGuard) {
      try {
        const { user, session } = await authenticate("get", context);
        authenticated = { user, session };
      } catch (error) {
        if (typeof opt1 === "string" && opt1 !== "guard_or_pass") {
          throw error;
        }
      }
    }

    // @ts-ignore
    return cb(input, authenticated) as ReturnedData;
  };
}
