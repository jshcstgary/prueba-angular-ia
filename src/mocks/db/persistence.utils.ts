export const saveToStorage = (key: string, data: any): void => {
	localStorage.setItem(`msw_db_${key}`, JSON.stringify(data));
};

export const loadFromStorage = <T>(key: string, initialData: T): T => {
	const stored = localStorage.getItem(`msw_db_${key}`);
	if (!stored) return initialData;
	
	try {
		// Handle Dates if necessary, but for now simple JSON parse
		return JSON.parse(stored);
	} catch {
		return initialData;
	}
};
