export type DateFormat =
    | 'YYYY-MM-DD'
    | 'DD/MM/YYYY'
    | 'MM/DD/YYYY'
    | 'full' // e.g., Saturday, September 27, 2025
    | 'time' // e.g., 14:30:00
    | 'datetime'; // e.g., 2025-09-27 14:30:00

export function formatDate(
    date: string | Date | null | undefined,
    format: DateFormat = 'DD/MM/YYYY'
): string {
    if (date == null) {
        return '-'; 
    }
    const d = typeof date === 'string' ? new Date(date) : date;

    if (!(d instanceof Date) || isNaN(d.getTime())) {
        return '-'; 
    }

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    switch (format) {
        case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`;
        case 'DD/MM/YYYY':
            return `${day}/${month}/${year}`;
        case 'MM/DD/YYYY':
            return `${month}/${day}/${year}`;
        case 'full':
            return d.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        case 'time':
            return `${hours}:${minutes}:${seconds}`;
        case 'datetime':
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        default:
            return `${day}/${month}/${year}`;
    }
}