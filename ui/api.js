export function toApiError(status, body) {
  const error = new Error(body?.error ?? 'Unable to complete the request.');
  error.status = status;
  error.conflicts = body?.conflicts;
  return error;
}

export async function api(path, options) {
  const response = await fetch(`/api${path}`, options);
  const body = await response.json();
  if (!response.ok) throw toApiError(response.status, body);
  return body;
}
