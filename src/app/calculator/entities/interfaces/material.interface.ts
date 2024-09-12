import { IExperience } from './experience.interface';

export interface IMaterial {
  name: string;
  unlockLevel: number;
  experience: IExperience[];
  unmodifiedWaitTimeMs: number;
  actualWaitTimeMs: number;
  cost: number;
}
