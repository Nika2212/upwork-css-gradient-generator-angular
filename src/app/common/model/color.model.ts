import { PercentToDegree } from '../pipe/percent-to-degree.pipe';

export class Color {
  public RGBA: number[] = [];
  public HEX: string;
  public HSL: number[] = [];

  static HSLToRGB(hsl: number[]): number[] {
    let h = hsl[0];
    let s = hsl[1];
    let l = hsl[2];
    let r;
    let g;
    let b;
    let m;
    let c;
    let x;

    if (!isFinite(h)) {
      h = 0;
    }
    if (!isFinite(s)) {
      s = 0;
    }
    if (!isFinite(l)) {
      l = 0;
    }

    h /= 60;

    if (h < 0) {
      h = 6 - (-h % 6);
    }

    h %= 6;

    s = Math.max(0, Math.min(1, s / 100));
    l = Math.max(0, Math.min(1, l / 100));

    c = (1 - Math.abs((2 * l) - 1)) * s;
    x = c * (1 - Math.abs((h % 2) - 1));

    if (h < 1) {
      r = c;
      g = x;
      b = 0;
    } else if (h < 2) {
      r = x;
      g = c;
      b = 0;
    } else if (h < 3) {
      r = 0;
      g = c;
      b = x;
    } else if (h < 4) {
      r = 0;
      g = x;
      b = c;
    } else if (h < 5) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }

    m = l - c / 2;
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r, g, b];
  }
  static HSLToHEX(hsl: number[]): string {
    const rgb = Color.HSLToRGB(hsl);
    return Color.RGBToHEX(rgb);
  }
  static RGBToHEX(rgb: number[]): string {
    let r: string | number = rgb[0];
    let g: string | number = rgb[1];
    let b: string | number = rgb[2];

    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    r = r.length === 2 ? r : r + '0';
    g = g.length === 2 ? g : g + '0';
    b = b.length === 2 ? b : b + '0';

    r = r.toUpperCase();
    g = g.toUpperCase();
    b = b.toUpperCase();

    return r + g + b;
  }
  static RGBToHSL(rgb: number[]): number[] {
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;
    let s;
    let l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    s *= 100;
    l *= 100;

    h = Math.round(h * 100);
    h = PercentToDegree.Transform(h);
    s = Math.round(s);
    l = Math.round(l);

    return [ h, s, l ];
  }
  static HEXToRGB(hex: string): number[] {
    const HEXArray = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [parseInt(HEXArray[1], 16), parseInt(HEXArray[2], 16), parseInt(HEXArray[3], 16)];
  }
  static HEXToHSL(hex: string): number[] {
    const rgb = Color.HEXToRGB(hex);
    return this.RGBToHSL(rgb);
  }
}
