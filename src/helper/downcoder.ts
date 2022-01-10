import {Keymap} from "../interfaces/keymap.interface";
import {
  ARABIC_MAP, AZERBAIJANI_MAP,
  CZECH_MAP, GEORGIAN_MAP,
  GREEK_MAP,
  LATIN_MAP,
  LATIN_SYMBOLS_MAP, LATVIAN_MAP, LITHUANIAN_MAP, POLISH_MAP,
  ROMANIAN_MAP,
  RUSSIAN_MAP, SERBIAN_MAP, SLOVAK_MAP,
  TURKISH_MAP,
  UKRAINIAN_MAP
} from "./keymaps";

export class Downcoder {
  private keymap: Keymap;
  private chars: string[];
  private regex: RegExp;

  constructor(...keymaps: Keymap[]) {
    const finalKeymap: Keymap = {};
    const chars: string[] = [];
    for (const keymap of keymaps) {
      for (const key in keymap) {
        if (!keymap.hasOwnProperty(key)) {
          continue;
        }
        finalKeymap[key] = keymap[key];
        chars.push(key);
      }
    }
    this.keymap = finalKeymap;
    this.chars = chars;
    this.regex = new RegExp('[' + this.chars.join() + ']|[^' + this.chars.join() + ']+','g');
  }

  public apply(slug: string) {
    const pieces = slug.match(this.regex);
    if (pieces == null) {
      return slug;
    }
    return pieces.map(piece => {
      if (piece.length === 1) {
        const mapped = this.keymap[piece];
        return mapped || piece;
      }
      return piece;
    }).join();
  }
}

export const DEFAULT_DOWNCODER = new Downcoder(
  LATIN_MAP,
  LATIN_SYMBOLS_MAP,
  GREEK_MAP,
  TURKISH_MAP,
  ROMANIAN_MAP,
  RUSSIAN_MAP,
  UKRAINIAN_MAP,
  CZECH_MAP,
  POLISH_MAP,
  LATVIAN_MAP,
  ARABIC_MAP,
  LITHUANIAN_MAP,
  SERBIAN_MAP,
  AZERBAIJANI_MAP,
  GEORGIAN_MAP,
  SLOVAK_MAP
);
