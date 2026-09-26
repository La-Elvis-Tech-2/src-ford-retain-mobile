function channels(hex: string): [number, number, number] {
	const value = Number.parseInt(hex.slice(1), 16);
	return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function toHex(value: number): string {
	return Math.round(value).toString(16).padStart(2, '0');
}

export function mixHex(from: string, to: string, t: number): string {
	const a = channels(from);
	const b = channels(to);
	return `#${a.map((channel, index) => toHex(channel + ((b[index] ?? 0) - channel) * t)).join('')}`;
}

export function colorAt(stops: readonly { at: number; color: string }[], t: number): string {
	const first = stops[0];
	const last = stops[stops.length - 1];

	if (!(first && last)) {
		return '#000000';
	}
	if (t <= first.at) {
		return first.color;
	}

	for (let index = 1; index < stops.length; index += 1) {
		const right = stops[index];
		const left = stops[index - 1];

		if (right && left && t <= right.at) {
			return mixHex(left.color, right.color, (t - left.at) / (right.at - left.at));
		}
	}

	return last.color;
}
