export interface IRouter {
  path: string;
  name?: string;
  icon?: string;
  children?: IRouter[];
}
