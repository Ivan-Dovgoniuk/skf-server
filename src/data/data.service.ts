import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
    private readonly storage: Record<string, { timestamp: Date; data: any }> = {};

    saveData(id: string, data: any): void {
        this.storage[id] = {
            timestamp: new Date(),
            data,
        };
    }

    getById(id: string): { timestamp: Date; data: any } | null {
        return this.storage[id] || null;
    }

    getAll(): { id: string; timestamp: Date; data: any }[] {
        return Object.entries(this.storage).map(([id, { timestamp, data }]) => ({
            id,
            timestamp,
            data,
        }));
    }

    clearAll(): void {
        Object.keys(this.storage).forEach((key) => delete this.storage[key]);
    }
}