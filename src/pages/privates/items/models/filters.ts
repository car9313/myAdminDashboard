export interface Filters {
  name?: string;
  language?: string;
  languages?: Array<string>;
  date?: Date | null;
  isActive?: boolean;
  description?: string;
  rangeDate?: { from: Date | null; to: Date | null };
  priceRange?: { min: number | null; max: number | null }; // Nuevo campo
  categories?: string[]; // Nuevo campo
  isPublished?: boolean; // Nuevo campo
  advancedSearch?: string; // Nuevo campo
  keywords?: string[]; // Nuevo campo
  relatedItems?: {
    label: string;
    value: string;
  }[];
}
