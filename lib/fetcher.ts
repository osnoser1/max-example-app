export type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
  body?: Record<string, any> | FormData;
  headers?: Record<string, any>;
  params?: Record<string, any>;
};

const handleResponse = async (response: Response) => {
  const isJson = response.headers.get("content-type") === "application/json";
  const data = isJson ? await response.json() : null;
  return response.ok ? data : Promise.reject(data ?? response);
};

export const fetcher = <T = void>(
  path: string | URL,
  options: FetchOptions = { method: "GET" },
): Promise<T> => {
  const { body: rawBody, headers: rawHeaders, params, ...rest } = options;
  const body = rawBody instanceof FormData ? rawBody : JSON.stringify(rawBody);
  const headers = new Headers(rawHeaders);
  if (!(rawBody instanceof FormData)) {
    headers.append("Content-Type", "application/json");
  }

  const url = new URL(path, process.env.NEXT_PUBLIC_BASE_URL);
  url.search = new URLSearchParams({
    ...params,
    apikey: process.env.NEXT_PUBLIC_API_KEY!,
  }).toString();

  return fetch(url, { ...rest, headers, body }).then(handleResponse);
};
