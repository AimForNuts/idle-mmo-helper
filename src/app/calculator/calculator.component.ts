import { Component } from '@angular/core';
import { IMaterial } from './entities/interfaces/material.interface';
import { IExperience } from './entities/interfaces/experience.interface';
import { FormsModule } from '@angular/forms';
import { IResourcesNeeeded } from './entities/interfaces/resources-needed.interface';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, CheckboxComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  public xpNeededResults: [string, number, number, string][] = [];
  public professions: string[] = [];
  public selectedProfession: string = '';
  public noResourcesError: string = '';
  public totalTime: string = '';

  private woodcutting: IMaterial[] = [];
  private mining: IMaterial[] = [];
  private fishing: IMaterial[] = [];
  private alchemy: IMaterial[] = [];
  private smelting: IMaterial[] = [];
  private cooking: IMaterial[] = [];
  private forge: IMaterial[] = [];
  private xp_needed: number[] = [];

  constructor() {
    //name  unlockLevel   [experience]  unmodifiedWaitTimeMs  actualWaitTimeMs  cost
    this.woodcutting = [
      this.createMaterial('Oak log', 1, [{ woodcutting: 3, strength: 1 }], 12000, 0, []),
      this.createMaterial('Yew log', 5, [{ woodcutting: 5, strength: 2 }], 15000, 0, []),
      this.createMaterial('Spruce log', 10, [{ woodcutting: 10, strength: 3 }], 23000, 0, []),
      this.createMaterial('Birch log', 15, [{ woodcutting: 15, strength: 5 }], 27000, 0, []),
      this.createMaterial('Banyan log', 25, [{ woodcutting: 21, strength: 7 }], 31000, 0, []),
      this.createMaterial('Maple log', 40, [{ woodcutting: 27, strength: 9 }], 36000, 0, []),
      this.createMaterial('Willow log', 60, [{ woodcutting: 35, strength: 11 }], 40000, 0, []),
      this.createMaterial('Mahogany log', 70, [{ woodcutting: 40, strength: 13 }], 44000, 0, []),
      this.createMaterial('Mystical log', 90, [{ woodcutting: 55, strength: 16 }], 55000, 0, []),
    ];

    this.mining = [
      this.createMaterial('Coal ore', 1, [{ mining: 3, strength: 1, defence: 1 }], 12000, 0, []),
      this.createMaterial('Tin ore', 1, [{ mining: 3, strength: 1, defence: 1 }], 12000, 0, []),
      this.createMaterial('Copper ore', 5, [{ mining: 5, strength: 1, defence: 2 }], 15000, 0, []),
      this.createMaterial('Iron ore', 10, [{ mining: 10, strength: 2, defence: 3 }], 23000, 0, []),
      this.createMaterial('Lead ore', 15, [{ mining: 15, strength: 3, defence: 5 }], 27000, 0, []),
      this.createMaterial('Steel ore', 25, [{ mining: 21, strength: 3, defence: 7 }], 31000, 0, []),
      this.createMaterial('Mercury ore', 40, [{ mining: 27, strength: 4, defence: 9 }], 36000, 0, []),
      this.createMaterial('Chromite ore', 60, [{ mining: 35, strength: 5, defence: 11 }], 40000, 0, []),
      this.createMaterial('Uranium ore', 70, [{ mining: 40, strength: 6, defence: 13 }], 44000, 0, []),
      this.createMaterial('Mystic ore', 90, [{ mining: 55, strength: 7, defence: 16 }], 55000, 0, []),
    ];

    this.fishing = [
      this.createMaterial('Cod', 1, [{ fishing: 2, dexterity: 1 }], 7000, 0, [this.createResourceNeeded('Cheap Bait', 1, 2)]),
      this.createMaterial('Salmon', 3, [{ fishing: 4, dexterity: 2 }], 10000, 0, [this.createResourceNeeded('Cheap Bait', 1, 2)]),
      this.createMaterial('Tuna', 5, [{ fishing: 6, dexterity: 3 }], 12000, 0, [this.createResourceNeeded('Cheap Bait', 1, 2)]),
      this.createMaterial('Trout', 8, [{ fishing: 8, dexterity: 4 }], 14000, 0, [this.createResourceNeeded('Tarnished Bait', 1, 4)]),
      this.createMaterial('Perch', 11, [{ fishing: 10, dexterity: 5 }], 16000, 0, [this.createResourceNeeded('Tarnished Bait', 1, 4)]),
      this.createMaterial('Herring', 15, [{ fishing: 13, dexterity: 6 }], 18000, 0, [this.createResourceNeeded('Gleaming Bait', 1, 7)]),
      this.createMaterial('Sardines', 25, [{ fishing: 16, dexterity: 7 }], 21000, 0, [this.createResourceNeeded('Gleaming Bait', 1, 7)]),
      this.createMaterial('Lobster', 30, [{ fishing: 19, dexterity: 8 }], 24000, 0, [this.createResourceNeeded('Elemental Bait', 1, 12)]),
      this.createMaterial('Crab', 40, [{ fishing: 22, dexterity: 9 }], 27000, 0, [this.createResourceNeeded('Elemental Bait', 1, 12)]),
      this.createMaterial('Turtle', 50, [{ fishing: 27, dexterity: 10 }], 32000, 0, [this.createResourceNeeded('Eldritch Bait', 1, 16)]),
      this.createMaterial('Stingray', 60, [{ fishing: 35, dexterity: 11 }], 40000, 0, [this.createResourceNeeded('Eldritch Bait', 1, 16)]),
      this.createMaterial('Lantern Fish', 80, [{ fishing: 40, dexterity: 13 }], 41000, 0, [this.createResourceNeeded('Arcane Bait', 1, 25)]),
      this.createMaterial('Great White Shark', 90, [{ fishing: 55, dexterity: 16 }], 45000, 0, [this.createResourceNeeded('Arcane Bait', 1, 25)]),
    ];

    this.cooking = [
      this.createMaterial('Cooked Cod', 1, [{ cooking: 2, dexterity: 1 }], 8000, 0, [
        this.createResourceNeeded('Cod', 1, 0),
        this.createResourceNeeded('Coal', 1, 0),
      ]),
      this.createMaterial('Cooked Salmon', 3, [{ cooking: 4, dexterity: 2 }], 12000, 0, [
        this.createResourceNeeded('Salmon', 1, 0),
        this.createResourceNeeded('Coal', 1, 0),
      ]),
      this.createMaterial('Cooked Tuna', 5, [{ cooking: 6, dexterity: 3 }], 14000, 0, [
        this.createResourceNeeded('Tuna', 1, 0),
        this.createResourceNeeded('Coal', 1, 0),
      ]),
      this.createMaterial('Cooked Trout', 8, [{ cooking: 8, dexterity: 4 }], 17000, 0, [
        this.createResourceNeeded('Trout', 1, 0),
        this.createResourceNeeded('Coal', 1, 0),
      ]),
      this.createMaterial('Cooked Perch', 11, [{ cooking: 10, dexterity: 5 }], 19000, 0, [
        this.createResourceNeeded('Perch', 1, 0),
        this.createResourceNeeded('Coal', 1, 0),
      ]),
      this.createMaterial('Cooked Herring', 11, [{ cooking: 13, dexterity: 6 }], 22000, 0, [
        this.createResourceNeeded('Herring', 1, 0),
        this.createResourceNeeded('Coal', 1, 0),
      ]),
      this.createMaterial('Cooked Sardines', 25, [{ cooking: 16, dexterity: 7 }], 25000, 0, [
        this.createResourceNeeded('Sardines', 1, 0),
        this.createResourceNeeded('Coal', 1, 0),
      ]),
      this.createMaterial('Cooked Lobster', 30, [{ cooking: 19, dexterity: 8 }], 28000, 0, [
        this.createResourceNeeded('Lobster', 1, 0),
        this.createResourceNeeded('Coal', 1, 0),
      ]),
      this.createMaterial('Cooked Crab', 40, [{ cooking: 22, dexterity: 9 }], 30000, 0, [
        this.createResourceNeeded('Crab', 1, 0),
        this.createResourceNeeded('Coal', 1, 0),
      ]),
      this.createMaterial('Cooked Turtle', 50, [{ cooking: 27, dexterity: 10 }], 30000, 0, [
        this.createResourceNeeded('Turtle', 1, 0),
        this.createResourceNeeded('Coal', 1, 0),
      ]),
      this.createMaterial('Cooked Stingray', 60, [{ cooking: 35, dexterity: 11 }], 40000, 0, [
        this.createResourceNeeded('Stingray', 1, 0),
        this.createResourceNeeded('Coal', 1, 0),
      ]),
      this.createMaterial('Cooked Lantern Fish', 80, [{ cooking: 40, dexterity: 13 }], 42000, 0, [
        this.createResourceNeeded('Lantern Fish', 1, 0),
        this.createResourceNeeded('Coal', 1, 0),
      ]),
      this.createMaterial('Cooked Great White Shark', 90, [{ cooking: 55, dexterity: 14 }], 55000, 0, [
        this.createResourceNeeded('Great White Shark', 1, 0),
        this.createResourceNeeded('Coal', 1, 0),
      ]),
    ];

    this.xp_needed = [
      139, 154, 168, 185, 203, 223, 244, 268, 294, 323, 354, 389, 427, 469, 515, 565, 620, 681, 748, 821, 902, 990, 1088, 1194, 1312, 1441, 1582,
      1738, 1909, 2097, 2304, 2531, 2780, 3054, 3356, 3687, 4051, 4452, 4892, 5376, 5908, 6492, 7135, 7842, 8619, 9474, 10414, 11447, 12584, 13833,
      15208, 16719, 18382, 20210, 22222, 24434, 26868, 29545, 32489, 35729, 39293, 43214, 47528, 52274, 57497, 63243, 69566, 76524, 84180, 92606,
      101878, 112082, 123313, 135673, 149277, 164251, 180732, 198874, 218843, 240826, 265024, 291664, 320991, 353277, 388824, 427959, 471048, 518491,
      570730, 628250, 691588, 761333, 838136, 922714, 1015856, 1118431, 1231399, 1355815, 1492843, 1643766,
    ];

    this.professions = ['Woodcutting', 'Mining', 'Fishing', 'Alchemy', 'Smelting', 'Cooking', 'Forge'];
  }

  public onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedProfession = target.value;
    this.xpNeededResults = [];
  }

  public calculateXP(currentLevel: number, expNeeded: number, targetLevel: number): void {
    this.xpNeededResults = this.calculateXPNeeded(currentLevel, expNeeded, targetLevel);
  }

  private calculateXPNeeded(currentLevel: number, expNeeded: number, targetLevel: number): [string, number, number, string][] {
    this.xpNeededResults = [];
    const results: [string, number, number, string][] = [];
    const materialUsage: { [key: string]: { totalAmount: number; timeTaken: number; lastLevel: number } } = {};
    let currentSkill: IMaterial[] = [];

    switch (this.selectedProfession) {
      case 'Woodcutting':
        currentSkill = this.woodcutting;
        break;
      case 'Mining':
        currentSkill = this.mining;
        break;
      case 'Fishing':
        currentSkill = this.fishing;
        break;
      case 'Alchemy':
        currentSkill = this.alchemy;
        break;
      case 'Smelting':
        currentSkill = this.smelting;
        break;
      case 'Cooking':
        currentSkill = this.cooking;
        break;
      case 'Forge':
        currentSkill = this.forge;
        break;
      default:
        break;
    }

    // Alchemy needs to take into consideration prices
    // Smelting, Cooking and Forge needs to take into consideration time from Woodcutting, Mining and Fishing
    let currentXP = this.xp_needed[currentLevel - 1] - expNeeded;
    let xpToNextLevel = this.xp_needed[currentLevel - 1] - currentXP;
    if (xpToNextLevel <= 0) xpToNextLevel = 0; // Handle edge case where current XP might exceed required XP

    while (currentLevel < targetLevel) {
      // Get all resources that are available at this level
      const availableResources = currentSkill.filter(log => log.unlockLevel <= currentLevel);

      if (availableResources.length === 0) {
        this.noResourcesError = `No available resources for current level: ${currentLevel}`;
      }

      let currentMaterial: IMaterial = {
        name: '',
        unlockLevel: 0,
        experience: [],
        unmodifiedWaitTimeMs: 0,
        actualWaitTimeMs: 0,
        resourcesNeeded: [],
      };
      let currentMaterialXP: number = 0;

      switch (this.selectedProfession) {
        case 'Woodcutting':
          const resultWoodcutting = this.woodcuttingStrategy(availableResources);
          currentMaterial = resultWoodcutting.currentMaterial;
          currentMaterialXP = resultWoodcutting.currentMaterialXP;
          break;
        case 'Mining':
          const resultMining = this.miningStrategy(availableResources);
          currentMaterial = resultMining.currentMaterial;
          currentMaterialXP = resultMining.currentMaterialXP;
          break;
        case 'Fishing':
          const resultFishing = this.fishingStrategy(availableResources);
          currentMaterial = resultFishing.currentMaterial;
          currentMaterialXP = resultFishing.currentMaterialXP;
          break;
        case 'Alchemy':
          currentSkill = this.alchemy;
          break;
        case 'Smelting':
          currentSkill = this.smelting;
          break;
        case 'Cooking':
          const resultCooking = this.cookingStrategy(availableResources);
          currentMaterial = resultCooking.currentMaterial;
          currentMaterialXP = resultCooking.currentMaterialXP + resultCooking.currentMaterialXP * 0.1;
          currentSkill = this.cooking;
          break;
        case 'Forge':
          currentSkill = this.forge;
          break;
        default:
          break;
      }

      if (currentMaterialXP <= 0) {
        throw new Error(`Invalid XP value for material: ${currentMaterial.name}`);
      }

      const materialNeeded = Math.ceil(xpToNextLevel / currentMaterialXP);
      const timeForMaterial = materialNeeded * (currentMaterial.unmodifiedWaitTimeMs || 0);

      if (!materialUsage[currentMaterial.name]) {
        materialUsage[currentMaterial.name] = { totalAmount: 0, timeTaken: 0, lastLevel: currentLevel };
      }
      materialUsage[currentMaterial.name].totalAmount += materialNeeded;
      materialUsage[currentMaterial.name].timeTaken += timeForMaterial;
      materialUsage[currentMaterial.name].lastLevel = currentLevel;

      // Move to the next level
      currentLevel += 1;

      if (currentLevel <= targetLevel) {
        xpToNextLevel = this.xp_needed[currentLevel - 1];
        // Handle edge case
        if (xpToNextLevel <= 0) xpToNextLevel = 0;
      }
    }

    let totalTimeMs = 0;
    // Push the results for each log type
    for (const [materialName, data] of Object.entries(materialUsage)) {
      totalTimeMs += data.timeTaken;
      results.push([materialName, data.totalAmount, data.lastLevel, this.msToTime(data.timeTaken)]);
    }

    this.totalTime = this.msToTime(totalTimeMs, true);

    return results;
  }

  private woodcuttingStrategy(availableResources: IMaterial[]): { currentMaterial: IMaterial; currentMaterialXP: number } {
    // Find the most efficient log (the one with the highest XP per log)
    const currentLog: IMaterial = availableResources.reduce((bestLog, log) => {
      const logXP = log.experience[0]?.woodcutting || 0;
      const bestLogXP = bestLog?.experience[0]?.woodcutting || 0;
      return logXP > bestLogXP ? log : bestLog;
    }, availableResources[0]);

    return { currentMaterial: currentLog, currentMaterialXP: currentLog.experience[0]?.woodcutting || 0 };
  }

  private miningStrategy(availableResources: IMaterial[]): { currentMaterial: IMaterial; currentMaterialXP: number } {
    // Find the most efficient ore (the one with the highest XP per ore)
    const currentOre: IMaterial = availableResources.reduce((bestOre, log) => {
      const logXP = log.experience[0]?.mining || 0;
      const bestLogXP = bestOre?.experience[0]?.mining || 0;
      return logXP > bestLogXP ? log : bestOre;
    }, availableResources[0]);

    return { currentMaterial: currentOre, currentMaterialXP: currentOre.experience[0]?.mining || 0 };
  }

  // TODO: calculate profit per hour on fishing + selling to vendor
  private fishingStrategy(availableResources: IMaterial[]): { currentMaterial: IMaterial; currentMaterialXP: number } {
    const currentFish: IMaterial = availableResources.reduce((bestFish, log) => {
      const logXP = log.experience[0]?.fishing || 0;
      const bestLogXP = bestFish?.experience[0]?.fishing || 0;
      return logXP > bestLogXP ? log : bestFish;
    }, availableResources[0]);

    return { currentMaterial: currentFish, currentMaterialXP: currentFish.experience[0]?.fishing || 0 };
  }

  private cookingStrategy(availableResources: IMaterial[]): { currentMaterial: IMaterial; currentMaterialXP: number } {
    const currentRecipe: IMaterial = availableResources.reduce((bestRecipe, log) => {
      const logXP = log.experience[0]?.cooking || 0;
      const bestLogXP = bestRecipe?.experience[0]?.cooking || 0;
      return logXP > bestLogXP ? log : bestRecipe;
    }, availableResources[0]);

    return { currentMaterial: currentRecipe, currentMaterialXP: currentRecipe.experience[0]?.cooking || 0 };
  }

  private createMaterial(
    name: string,
    unlockLevel: number,
    experience: IExperience[],
    unmodifiedWaitTimeMs: number,
    actualWaitTimeMs: number,
    resourcesNeeded: IResourcesNeeeded[]
  ): IMaterial {
    return {
      name,
      unlockLevel,
      experience,
      unmodifiedWaitTimeMs,
      actualWaitTimeMs,
      resourcesNeeded,
    };
  }

  private createResourceNeeded(name: string, quantity: number, cost: number): IResourcesNeeeded {
    return {
      name,
      quantity,
      cost,
    };
  }

  private msToTime(ms: number, asDays: boolean | null = null): string {
    const seconds = Math.floor(ms / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (asDays) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;

      // Pad days, hours, minutes, and seconds with leading zeros if needed
      const paddedDays = String(days).padStart(2, '0');
      const paddedHours = String(remainingHours).padStart(2, '0');
      const paddedMinutes = String(minutes).padStart(2, '0');
      const paddedSeconds = String(secs).padStart(2, '0');

      return `${paddedDays}d ${paddedHours}h ${paddedMinutes}m ${paddedSeconds}s`;
    } else {
      // Pad hours, minutes, and seconds with leading zeros if needed
      const paddedHours = String(hours).padStart(2, '0');
      const paddedMinutes = String(minutes).padStart(2, '0');
      const paddedSeconds = String(secs).padStart(2, '0');

      return `${paddedHours}h ${paddedMinutes}m ${paddedSeconds}s`;
    }
  }
}
