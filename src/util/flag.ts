import {Country} from "../data/country";

const emoji: Record<string, string> = {
  'A': '🇦',
  'B': '🇧',
  'C': '🇨',
  'D': '🇩',
  'E': '🇪',
  'F': '🇫',
  'G': '🇬',
  'H': '🇭',
  'I': '🇮',
  'J': '🇯',
  'K': '🇰',
  'L': '🇱',
  'M': '🇲',
  'N': '🇳',
  'O': '🇴',
  'P': '🇵',
  'Q': '🇶',
  'R': '🇷',
  'S': '🇸',
  'T': '🇹',
  'U': '🇺',
  'V': '🇻',
  'W': '🇼',
  'X': '🇽',
  'Y': '🇾',
  'Z': '🇿',
};

export default function flagForCountry(country: Country): string {
  return country.alpha2.split("")
    .map(letter => emoji[letter])
    .join("");
}
