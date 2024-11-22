import { Category } from "../../shared/models/Category";

export interface BrandFormInfo {
  allCategories:              Category[];
  allLabels:                  string[];
  allConsumers:               string[];
  allPrices:                  number[];
  allAutonomousCommunities:   string[];
  allProvinces:               string[];
  allLocations:               string[];
}
