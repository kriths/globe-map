import {Country} from "./country";

/**
 * Country data copied and modified from https://gist.github.com/tadast/8827699
 * Source is MIT licensed
 */
declare module "countries.json" {
  const value: Country[];
  export default value;
}
