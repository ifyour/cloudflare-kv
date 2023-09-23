interface ConstructorOptions {
  api: string;
  key: string;
}

export default class JSONBin {
  private api: string;
  private key: string;

  constructor(options: ConstructorOptions) {
    const { api, key } = options;
    if (!api) {
      throw new Error("api is required");
    }
    if (!key) {
      throw new Error("key is required");
    }
    this.api = api;
    this.key = key;
  }

  async get<T>(path: string, defaultValue: T) {
    const url = `${this.api}${path || "/"}?key=${this.key}`;
    let result = defaultValue;
    const response = await fetch(url);
    if (response.ok) {
      result = await response.json();
    } else {
      if (response.status === 404) {
        result = defaultValue;
      } else {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    }
    return result;
  }

  async set(path: string, value: unknown) {
    if (!path) {
      throw new Error("path is required");
    }
    const url = `${this.api}${path || "/"}?key=${this.key}`;
    const writeResponse = await fetch(url, {
      method: "POST",
      body: JSON.stringify(value),
    });
    if (!writeResponse.ok) {
      throw new Error(`${writeResponse.status}: ${writeResponse.statusText}`);
    }
    return;
  }
}