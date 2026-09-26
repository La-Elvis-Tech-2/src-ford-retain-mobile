export class HttpError extends Error {
	readonly status: number;
	readonly data: unknown;

	constructor(status: number, message: string, data: unknown) {
		super(message);
		this.name = 'HttpError';
		this.status = status;
		this.data = data;
	}

	get isUnauthorized(): boolean {
		return this.status === 401;
	}

	get isForbidden(): boolean {
		return this.status === 403;
	}
}
