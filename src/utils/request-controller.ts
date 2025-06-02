export default class RequestController {
  private static token: string = "";

  static setToken(token: string) {
    this.token = token;
  }

  private static async request(
    url: string,
    method: string = "GET",
    body?: object
  ) {
    try {
      const res: Response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.message || "Request failed");
      }

      return { success: true, data: json };
    } catch (e: any) {
      return { success: false, error: e.message || "Something went wrong" };
    }
  }

  // method wrappers
  static get(url: string) {
    return this.request(url, "GET");
  }

  static post(url: string, body: object) {
    return this.request(url, "POST", body);
  }

  static patch(url: string, body: object) {
    return this.request(url, "PATCH", body);
  }
}
