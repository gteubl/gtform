import { FormOption } from '../models/index';

export function nameof<T>(key: Extract<keyof T, string>): string {
  return key;
}


/*
// Create a mapping object for friendly names
const HonorarioEventFriendlyNames: Record<keyof typeof HonorarioEvent, string> = {
  ProcessoEnviado: "Processo Enviado",
  ProcessoLiberado: "Processo Liberado",
  PrazoCumprido: "Prazo Cumprido",
  AudienciaRealizada: "Audiência Realizada",
  DiligenciaRealizada: "Diligência Realizada",
  FaseProcessual: "Fase Processual"
};
* */

export function enumToChoiceOption<T extends object>(enumObj: T, friendlyNames?: Record<keyof T, string>): FormOption[] {
  const keys = Object.keys(enumObj).filter(key => isNaN(Number(key)));

  return keys.map((key): FormOption => ({
    value: enumObj[key as keyof T] as number,
    description: friendlyNames ? friendlyNames[key as keyof T] || key : key,
  }));
}

export function ChoiceOptionToEnum<T extends object>(enumObj: T, choiceOption: FormOption): T[keyof T] {
  const keys = Object.keys(enumObj).filter(key => isNaN(Number(key)));
  const key = keys.find(k => enumObj[k as keyof T] === choiceOption.value);
  return enumObj[key as keyof T];
}



export function normalizeString(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export function compareStringsAccentInsensitive(str1: string, str2: string): boolean {
  return normalizeString(str1) === normalizeString(str2);
}

export function startsWithAccentInsensitive(mainStr: string, searchStr: string): boolean {
  return normalizeString(mainStr).startsWith(normalizeString(searchStr));
}

export function includesAccentInsensitive(mainStr: string, searchStr: string): boolean {
  return normalizeString(mainStr).includes(normalizeString(searchStr));
}
export function endsWithAccentInsensitive(mainStr: string, searchStr: string): boolean {
  return normalizeString(mainStr).endsWith(normalizeString(searchStr));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mergeWithNonEmptyStringOverrides(source: any, updates: any): any {
  const result = { ...source };

  Object.keys(updates).forEach(key => {
    const updateValue = updates[key];
    if (updateValue !== '') {
      result[key] = updateValue;
    }
  });

  return result;
}

export function  formatDateToBRLocaleString(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based, add 1
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function  formatDateTimeToBRLocaleString(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based, add 1
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function  levenshteinDistance(source: string, target: string): number {
  if (!source) return target?.length ?? 0;
  if (!target) return source.length;

  const sourceLength: number = source.length;
  const targetLength: number = target.length;
  const matrix: number[][] = [];

  // Initialize the matrix
  for (let i = 0; i <= sourceLength; i++) {
    matrix[i] = [];
    matrix[i][0] = i;
  }
  for (let j = 0; j <= targetLength; j++) {
    matrix[0][j] = j;
  }

  // Compute the distances
  for (let i = 1; i <= sourceLength; i++) {
    for (let j = 1; j <= targetLength; j++) {
      const cost = (target[j - 1] === source[i - 1]) ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,         // Deletion
        matrix[i][j - 1] + 1,         // Insertion
        matrix[i - 1][j - 1] + cost   // Substitution
      );
    }
  }
  return matrix[sourceLength][targetLength];
}

export function findBestMatchThreshold<T>(items: T[], searchValue: string, propertyName: keyof T, threshold: number): T | null {
  // Map each item to an object containing the item itself and its distance to the searchValue
  const itemsWithDistance = items.map(item => ({
    item,
    distance: levenshteinDistance(searchValue, item[propertyName] as unknown as string)
  }));

  // Sort these objects by the computed distance
  itemsWithDistance.sort((a, b) => a.distance - b.distance);

  // Check if the closest match is within the threshold
  if (itemsWithDistance[0].distance <= threshold) {
    return itemsWithDistance[0].item;
  } else {
    return null; // Return null if no item is within the threshold
  }
}

export function findBestMatch<T>(items: T[], searchValue: string, propertyName: keyof T): T {
  // Map each item to an object containing the item and its distance to the searchValue
  const itemsWithDistance = items.map(item => ({
    item,
    distance: levenshteinDistance(searchValue, item[propertyName] as unknown as string)
  }));

  // Sort these objects by the computed distance
  itemsWithDistance.sort((a, b) => a.distance - b.distance);

  // Return the item with the smallest distance
  return itemsWithDistance[0].item;
}


export function findBestSegmentMatch<T>(items: T[], searchValue: string, propertyName: keyof T, threshold: number): T | null {
  // Normalize the search value by converting it to lowercase and removing non-alphanumeric characters
  const normalizedSearchValue = searchValue.toLowerCase().replace(/[^\w]/g, '');

  // Split the search value into segments
  const searchSegments = normalizedSearchValue.split('/');

  const itemsWithDistance = items.map(item => {
    const itemValue = item[propertyName] as unknown as string; // Extract the value of the property
    const normalizedItemValue = itemValue.toLowerCase().replace(/[^\w]/g, ''); // Normalize the item value

    // Split the item value into segments
    const itemSegments = normalizedItemValue.split('/');

    // Calculate the minimum Levenshtein distance between any segment pair
    const minDistance = searchSegments.reduce((minDist, seg) => {
      const distances = itemSegments.map(itemSeg => levenshteinDistance(seg, itemSeg));
      return Math.min(minDist, ...distances);
    }, Number.MAX_VALUE);

    return {
      item,
      distance: minDistance
    };
  });

  // Sort these objects by the computed distance
  itemsWithDistance.sort((a, b) => a.distance - b.distance);

  // Check if the closest match is within the threshold
  if (itemsWithDistance.length > 0 && itemsWithDistance[0].distance <= threshold) {
    return itemsWithDistance[0].item;
  } else {
    return null; // Return null if no item is within the threshold or the list is empty
  }
}




export function findBestMatchStrings(items: string[], searchValue: string, threshold: number): string | null {
  // Map each string to an object containing the string and its distance to the searchValue
  const itemsWithDistance = items.map(item => ({
    item,
    distance: levenshteinDistance(searchValue, item)
  }));

  // Sort these objects by the computed distance
  itemsWithDistance.sort((a, b) => a.distance - b.distance);

  // Check if the closest match is within the threshold
  if (itemsWithDistance[0].distance <= threshold) {
    return itemsWithDistance[0].item;
  } else {
    return null; // or return a default value if no acceptable match is found
  }
}

export function findBestSubstringMatch(items: string[], searchValue: string, threshold: number): string | null {
  const normalizedSearchValue = searchValue.toLowerCase().replace(/[^\w]/g, '');

  const itemsWithDistance = items.map(item => {
    const normalizedItem = item.toLowerCase().replace(/[^\w]/g, '');
    return {
      item,
      distance: levenshteinDistance(normalizedSearchValue, normalizedItem)
    };
  });

  itemsWithDistance.sort((a, b) => a.distance - b.distance);

  if (itemsWithDistance[0].distance <= threshold) {
    return itemsWithDistance[0].item;
  } else {
    return null;
  }
}

export function matchDocument<T>(candidates: T[], title: string, propertyName: keyof T): T | null {
  // Normalize the title for comparison
  const normalizedTitle = title.toLowerCase().replace(/[^\w]/g, '');
  const titleTokens = normalizedTitle.split('/');

  const matches = candidates.map(candidate => {
    // Access the property of the candidate, assumed to be a string
    const candidateTitle = String(candidate[propertyName]).toLowerCase().replace(/[^\w]/g, '');
    const candidateTokens = candidateTitle.split('/');
    // Calculate match score based on token overlap
    const matchScore = titleTokens.filter(t => candidateTokens.includes(t)).length;
    return { candidate, matchScore };
  });

  // Sort matches by score and return the top match if it meets a certain threshold
  matches.sort((a, b) => b.matchScore - a.matchScore);
  if (matches.length > 0 && matches[0].matchScore > 0) {
    return matches[0].candidate;
  }

  return null;
}








