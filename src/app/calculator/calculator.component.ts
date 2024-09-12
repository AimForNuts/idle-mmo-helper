import { Component } from '@angular/core';
import { IMaterial } from './entities/interfaces/material.interface';
import { IExperience } from './entities/interfaces/experience.interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [NgFor],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  //name  unlockLevel   [experience]  unmodifiedWaitTimeMs  actualWaitTimeMs  cost
  public woodcutting: IMaterial[] = [];
  public xp_needed: number[] = [];
  public xpNeededResults: [string, number, number, string][] = [];

  constructor() {
    this.woodcutting = [
      this.createMaterial('Oak log', 1, [{ woodcutting: 3, strength: 1 }], 12000, 0, 0),
      this.createMaterial('Yew log', 5, [{ woodcutting: 5, strength: 2 }], 15000, 0, 0),
      this.createMaterial('Spruce log', 10, [{ woodcutting: 10, strength: 3 }], 23000, 0, 0),
      this.createMaterial('Birch log', 15, [{ woodcutting: 15, strength: 5 }], 27000, 0, 0),
      this.createMaterial('Banyan log', 25, [{ woodcutting: 21, strength: 7 }], 31000, 0, 0),
      this.createMaterial('Maple log', 40, [{ woodcutting: 27, strength: 9 }], 36000, 0, 0),
      this.createMaterial('Willow log', 60, [{ woodcutting: 35, strength: 11 }], 40000, 0, 0),
      this.createMaterial('Mahogany log', 70, [{ woodcutting: 40, strength: 13 }], 44000, 0, 0),
      this.createMaterial('Mystical log', 90, [{ woodcutting: 55, strength: 16 }], 55000, 0, 0),
    ];

    this.xp_needed = [
      139, 154, 168, 185, 203, 223, 244, 268, 294, 323, 354, 389, 427, 469, 515, 565, 620, 681, 748, 821, 902, 990, 1088, 1194, 1312, 1441, 1582,
      1738, 1909, 2097, 2304, 2531, 2780, 3054, 3356, 3687, 4051, 4452, 4892, 5376, 5908, 6492, 7135, 7842, 8619, 9474, 10414, 11447, 12584, 13833,
      15208, 16719, 18382, 20210, 22222, 24434, 26868, 29545, 32489, 35729, 39293, 43214, 47528, 52274, 57497, 63243, 69566, 76524, 84180, 92606,
      101878, 112082, 123313, 135673, 149277, 164251, 180732, 198874, 218843, 240826, 265024, 291664, 320991, 353277, 388824, 427959, 471048, 518491,
      570730, 628250, 691588, 761333, 838136, 922714, 1015856, 1118431, 1231399, 1355815, 1492843, 1643766,
    ];
  }

  public calculateXP(currentLevel: number, currentXP: number, targetLevel: number): void {
    this.xpNeededResults = this.calculateXPNeeded(currentLevel, currentXP, targetLevel);
  }

  public calculateXPNeeded(currentLevel: number, currentXP: number, targetLevel: number): [string, number, number, string][] {
    const results: [string, number, number, string][] = [];
    const logUsage: { [key: string]: { totalAmount: number; timeTaken: number; lastLevel: number } } = {};

    let xpToNextLevel = this.xp_needed[currentLevel - 1] - currentXP;
    if (xpToNextLevel <= 0) xpToNextLevel = 0; // Handle edge case where current XP might exceed required XP

    while (currentLevel < targetLevel) {
      // Get all logs that are available at this level
      const availableLogs = this.woodcutting.filter(log => log.unlockLevel <= currentLevel);

      if (availableLogs.length === 0) {
        throw new Error(`No logs available for current level: ${currentLevel}`);
      }

      // Find the most efficient log (the one with the highest XP per log)
      const currentLog = availableLogs.reduce((bestLog, log) => {
        const logXP = log.experience[0]?.woodcutting || 0;
        const bestLogXP = bestLog?.experience[0]?.woodcutting || 0;
        return logXP > bestLogXP ? log : bestLog;
      }, availableLogs[0]);

      const logXP = currentLog.experience[0]?.woodcutting || 0;
      if (logXP <= 0) {
        throw new Error(`Invalid XP value for log: ${currentLog.name}`);
      }

      const logsNeeded = Math.ceil(xpToNextLevel / logXP);
      const timeForLogs = logsNeeded * (currentLog.unmodifiedWaitTimeMs || 0);

      // Update the logUsage map
      if (!logUsage[currentLog.name]) {
        logUsage[currentLog.name] = { totalAmount: 0, timeTaken: 0, lastLevel: currentLevel };
      }
      logUsage[currentLog.name].totalAmount += logsNeeded;
      logUsage[currentLog.name].timeTaken += timeForLogs;
      logUsage[currentLog.name].lastLevel = currentLevel;

      // Move to the next level
      currentLevel += 1;

      if (currentLevel <= targetLevel) {
        xpToNextLevel = this.xp_needed[currentLevel - 1] - (currentXP + logXP * logsNeeded);
        if (xpToNextLevel <= 0) xpToNextLevel = 0; // Handle edge case
      }
    }

    // Push the results for each log type
    for (const [logName, data] of Object.entries(logUsage)) {
      results.push([logName, data.totalAmount, data.lastLevel, this.msToTime(data.timeTaken)]);
    }

    return results;
  }

  private createMaterial(
    name: string,
    unlockLevel: number,
    experience: IExperience[],
    unmodifiedWaitTimeMs: number,
    actualWaitTimeMs: number,
    cost: number
  ): IMaterial {
    return {
      name,
      unlockLevel,
      experience,
      unmodifiedWaitTimeMs,
      actualWaitTimeMs,
      cost,
    };
  }

  private msToTime(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    // Pad hours, minutes, and seconds with leading zeros if needed
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(secs).padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  }
}
