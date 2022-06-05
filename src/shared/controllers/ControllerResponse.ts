import { Link } from "./Link";

export type ControllerResponse<T> = Promise<{
  content: T;
  links: Link[];
}>;
