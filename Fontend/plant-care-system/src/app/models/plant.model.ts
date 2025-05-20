export interface PlantDto {
    plantId: number;
    userId: number;
    plantName: string;
    species: string;
    wateringFrequency: number;
    fertilizingFrequency: number;
    lastWatered: string;
    lastFertilized: string;
    careInstructions: string;
}