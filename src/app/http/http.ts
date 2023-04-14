export type CloutFunctionResponseError = { error: string };

export type CloutFunctionResponse<TData = any> = CloutFunctionResponseError | TData;
