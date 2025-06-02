export default class APIRoutes {
  static baseUrl = "https://dummyjson.com/";

  // Auth
  static authUrl = `${this.baseUrl}auth/`;
  static login = `${this.authUrl}login`;
  static register = `${this.authUrl}register`;
  static refreshToken = `${this.authUrl}refresh`;
  static logout = `${this.authUrl}logout`;
  static me = `${this.authUrl}me`;

  // Core resources
  static products = `${this.baseUrl}products`;
  static users = `${this.baseUrl}users`;
  static posts = `${this.baseUrl}posts`;
  static comments = `${this.baseUrl}comments`;
  static carts = `${this.baseUrl}carts`;
}
