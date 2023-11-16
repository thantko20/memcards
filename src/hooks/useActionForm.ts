import { useEffect } from "react";
import { useFormState } from "react-dom";

export type ActionReturnType<T = unknown> =
  | {
      data: T;
      error?: unknown;
      statusCode?: number;
      status: "success" | "error" | "idle";
      message?: string;
    }
  | undefined;

export type ActionOpts<T = unknown, E = unknown> = {
  onSuccess?: (data: T) => void;
  onError?: (error: E) => void;
};

export const useActionForm = <Data, Payload>(
  theAction: (payload: Payload) => Promise<ActionReturnType<Data> | undefined>,
  opts?: ActionOpts<Data>
) => {
  const [state, action] = useFormState(
    async (
      _state: ActionReturnType<Data> | undefined,
      payload: Parameters<typeof theAction>[0]
    ) => {
      return await theAction(payload);
    },
    undefined
  );
  const { onSuccess, onError } = opts || {};

  useEffect(() => {
    if (state?.status === "success") {
      onSuccess?.(state.data);
    }

    if (state?.status === "error") {
      onError?.(new Error(state.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return { state, action };
};
