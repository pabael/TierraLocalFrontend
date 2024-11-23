import { Category } from "./Category";
import { Location } from "./Location";

export interface Brand{
  name:                       string;
  summary?:                    string;
  url?:                        string;
  materials?:                  string;
  crueltyFree?:                boolean | null;
  vegan?:                      boolean | null;
  commitment?:                 string;
  production?:                 string;
  categories?:                 Category[];
  labels?:                     string[];
  consumers?:                  string[];
  price?:                      number;
  locations?:                  Location[];
}
