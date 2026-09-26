const PLATE_PATTERN = /^[A-Z]{3}\d[A-Z0-9]\d{2}$/;

export function normalizePlate(value: string): string {
	return value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
}

export function isValidPlate(value: string): boolean {
	return PLATE_PATTERN.test(normalizePlate(value));
}

export function formatPlateInput(value: string): string {
	const plate = normalizePlate(value).slice(0, 7);
	return plate.length > 3 ? `${plate.slice(0, 3)}-${plate.slice(3)}` : plate;
}
