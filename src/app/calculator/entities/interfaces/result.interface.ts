import { IResourcesNeeeded } from './resources-needed.interface';

export interface IResult {
  baseMaterial?: string;
  totalMaterial?: number;
  lastLevel?: number;
  time?: string;
  resourcesNeeded: IResourcesNeeeded[];
}
