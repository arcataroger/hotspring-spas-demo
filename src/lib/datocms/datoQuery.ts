import {
  executeQuery,
  type ExecuteQueryOptions,
  type TypedDocumentNode,
} from "@datocms/cda-client";

const defaultOptions: ExecuteQueryOptions = {
  token: process.env.DATOCMS_API_TOKEN!,
  excludeInvalid: true,
  fetchFn: (input, init) =>
    fetch(input, {
      next: {
        revalidate: 1, // Revalidate once a second for this demo. In prod it'd prob be 60 secs or more. https://nextjs.org/docs/app/api-reference/functions/fetch#optionsnextrevalidate
      },
      ...init,
    }),
};

export const datoQuery = <Result = unknown, Variables = unknown>(
  query: TypedDocumentNode<Result, Variables>,
  options?: Partial<ExecuteQueryOptions<Variables>>,
): Promise<Result> => {
  return executeQuery(query, { ...defaultOptions, ...options });
};
