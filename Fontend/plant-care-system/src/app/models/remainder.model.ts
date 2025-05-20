export interface RemainderDto {
    reminder_id: number;
    plant_id: number;
    user_id: number;
    reminder_date: string;
    reminder_type: string; // 'W' for watering, 'F' for fertilizing
}