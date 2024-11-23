import { Category } from "./Category";
import { Location } from "./Location";

export interface Brand{
  name:                       string;
  summary?:                    string;
  url?:                        string
  materials?:                  string
  crueltyFree?:                boolean
  vegan?:                      boolean
  commitment?:                 string
  production?:                 string
  categories?:                 Category[]
  labels?:                     string[]
  consumers?:                  string[]
  price?:                      number;
  locations?:                  Location[]
}
