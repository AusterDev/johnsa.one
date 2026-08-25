import type { APIContext } from "astro";
import { Links } from "../../constants";

export function GET({ redirect }: APIContext) {
  return redirect(Links.GITHUB);
}