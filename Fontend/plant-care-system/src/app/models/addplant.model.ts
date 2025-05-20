export interface AddPlantDto {
    user_id: number;
    plant_name: string;
    species: string;
    watering_frequency: number;
    fertilizing_frequency: number;
    care_instructions: string;
}