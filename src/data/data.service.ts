import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
  private readonly storage: any[] = [];

  saveData(data: any): void {
    this.storage.push({
      timestamp: new Date(),
      data,
    });
  }

  getLatest(): any {
    return this.storage[this.storage.length - 1] || null;
  }

  getAll(): any[] {
    return this.storage;
  }

  clearAll(): void {
    this.storage.length = 0;
  }
}