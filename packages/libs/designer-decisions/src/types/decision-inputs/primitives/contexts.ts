export type DecisionContextsInput =
    | string[]
    | {
          all: string[];
          any?: string[];
      };
