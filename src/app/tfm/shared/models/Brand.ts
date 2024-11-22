import { Category } from "./Category";

export interface Brand{
  name:                       string      | null;
  summary:                    string      | null;
  url:                        string      | null;
  materials:                  string      | null;
  crueltyFree:                boolean     | null;
  vegan:                      boolean     | null;
  commitment:                 string      | null;
  production:                 string      | null;
  categories:                 Category[]  | null;
  labels:                     string[]    | null;
  consumers:                  string[]    | null;
  price:                      number;
  locations:                  Location[]    | null;
}