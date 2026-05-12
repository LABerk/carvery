import { CLIENT_CARVERY_API_URI } from "@/aspects/api/configuration/client-carvery-api-uri";

export const clientUpdateApi = async <TModel, TBody extends object>(
  endpoint: string,
  body: TBody,
): Promise<TModel> => {
  const url = `${CLIENT_CARVERY_API_URI}${endpoint}`;
  const requestConfiguration = await buildRequestConfiguration(body);

  const response = await fetch(url, requestConfiguration);

  if (!response.ok) {
    await handleErroredRequest(response);
  }

  return (await response.json()) as TModel;
};

const buildRequestConfiguration = async <TBody extends object>(
  body: TBody,
): Promise<RequestInit> => ({
  cache: "no-cache",
  credentials: "include",
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const handleErroredRequest = async (response: Response): Promise<void> => {
  const responseErrorMessage = await response.text();
  const errorMessage = responseErrorMessage
    ? responseErrorMessage
    : response.statusText;

  throw new Error(`Request failed (HTTP ${response.status}): ${errorMessage}`);
};
