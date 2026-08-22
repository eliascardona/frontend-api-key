const API_BASE_URL = 'http://localhost:8082';

function serializeParams(params = {}) {
  const serialized = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      const values = value
        .filter((item) => item !== null && item !== undefined)
        .map(String);

      if (values.length > 0) {
        serialized[key] = values;
      }

      continue;
    }

    if (value instanceof Date) {
      serialized[key] = value.toISOString();
      continue;
    }

    serialized[key] = String(value);
  }

  return serialized;
}

function buildUrl(endpoint, parameters = {}) {
  const url = new URL(
    endpoint,
    API_BASE_URL
  );

  const serializedParams = serializeParams(parameters);

  for (const [key, value] of Object.entries(serializedParams)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        url.searchParams.append(key, item);
      }
    } else {
      url.searchParams.append(key, value);
    }
  }

  console.log('---- url', url.toString());

  return url.toString();
}

async function createRequestOptions(
  method,
  data,
  customHeaders = {},
  authProvider
) {
  const headers = {
    ...customHeaders,
  };

  let body;

  if (data !== undefined && data !== null) {
    headers['Content-Type'] ??= 'application/json';

    body = JSON.stringify(data);
  }

  if (authProvider) {
    const token = await authProvider();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return {
    method,
    headers,
    body,
  };
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') ?? '';

  let data;

  if (response.status === 401 || response.status === 403) {
    if (contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  }

  try {
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
  } catch {
    data = null;
  }

  if (!response.ok) {
    const error = new Error(
      response.statusText || 'HTTP request failed'
    );

    error.status = response.status;
    error.statusText = response.statusText;
    error.data = data;

    throw error;
  }

  return data;
}

export function createApiClient(authProvider) {
  async function request(
    method,
    endpoint,
    data,
    customHeaders = {},
    parameters = {}
  ) {
    const url = buildUrl(endpoint, parameters);

    const options = await createRequestOptions(
      method,
      data,
      customHeaders,
      authProvider
    );

    const response = await fetch(url, options);

    return parseResponse(response);
  }

  return {
    get(endpoint, customHeaders = {}, parameters = {}) {
      return request(
        'GET',
        endpoint,
        undefined,
        customHeaders,
        parameters
      );
    },

    post(
      endpoint,
      data,
      customHeaders = {},
      parameters = {}
    ) {
      return request(
        'POST',
        endpoint,
        data,
        customHeaders,
        parameters
      );
    },

    put(
      endpoint,
      data,
      customHeaders = {},
      parameters = {}
    ) {
      return request(
        'PUT',
        endpoint,
        data,
        customHeaders,
        parameters
      );
    },

    patch(
      endpoint,
      data,
      customHeaders = {},
      parameters = {}
    ) {
      return request(
        'PATCH',
        endpoint,
        data,
        customHeaders,
        parameters
      );
    },

    delete(
      endpoint,
      data,
      customHeaders = {},
      parameters = {}
    ) {
      return request(
        'DELETE',
        endpoint,
        data,
        customHeaders,
        parameters
      );
    },
  };
}

export function createTokenClient(token) {
  return createApiClient(() => Promise.resolve(token));
}

export const apiClient = createApiClient();