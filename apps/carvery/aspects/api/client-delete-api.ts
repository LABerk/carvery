import { CLIENT_CARVERY_API_URI } from "@/aspects/api/configuration/client-carvery-api-uri";

export const clientDeleteApi = async (endpoint: string): Promise<void> => {
  const url = `${CLIENT_CARVERY_API_URI}${endpoint}`;
  const requestConfiguration = await buildRequestConfiguration();

  const response = await fetch(url, requestConfiguration);

  if (!response.ok) {
    await handleErroredRequest(response);
  }
};

const buildRequestConfiguration = async (): Promise<RequestInit> => ({
  cache: "no-cache",
  credentials: "include",
  method: "DELETE",
});

const handleErroredRequest = async (response: Response): Promise<void> => {
  const responseErrorMessage = await response.text();
  const errorMessage = responseErrorMessage
    ? responseErrorMessage
    : response.statusText;

  throw new Error(`Request failed (HTTP ${response.status}): ${errorMessage}`);
};
