import { IExperience } from './experience.interface';
import { IResourcesNeeeded } from './resources-needed.interface';

export interface IMaterial {
  name: string;
  unlockLevel: number;
  experience: IExperience[];
  unmodifiedWaitTimeMs: number;
  actualWaitTimeMs: number;
  resourcesNeeded: IResourcesNeeeded[];
}
