import { SqGrid } from '@/helpers/gridOct';
import { TriGrid } from '@/helpers/gridTrunHex';

export type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
export type Use = {
  x: number;
  y: number;
  trans: string;
  href: string;
};
export type Extent = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export enum eGridNames {
  //NulGrid = 'NulGrid',
  Triangle = 'Triangle',
  Square = 'Square',
  SqOct = 'SqOct',
  Hex = 'Hex',
  TriHex = 'TriHex',
  TruncHex = 'TruncHex',
  RhombiTriHex = 'RhombiTriHex',
  RhombiHexExt = 'RhombiHexExt',
  TruncTriHex = 'TruncTriHex',
  DoDecHex = 'DoDecHex',
  HexSq = 'HexSq',
  HexHexSq = 'HexHexSq'
}

export interface Grid {
  cellLen(): number;
  name(): eGridNames;
  base(): Array<Line>;
  plot(ext: Extent): Array<Use>;
}

export class CNullGrid implements Grid {
  cellLen(): number {
    return 0;
  }
  name(): eGridNames {
    return eGridNames.NulGrid;
  }
  base(): Array<Line> {
    return [];
  }
  plot(/*ext: Extent*/): Array<Use> {
    return [];
  }
}

export const NullGrid = new CNullGrid();

///////////////////////////////////////////////////////////////////////////////
//
//  These defs are here because i am having a problem with eGridNames.
//  probably because in external files eGridNames could be a type and a value.

export const GridSquare = new SqGrid(1, eGridNames.Square, [
  { x1: 0.0, y1: 0.5, x2: 0.0, y2: -0.5 },
  { x1: -0.5, y1: 0.0, x2: 0.5, y2: 0.0 }
]);

export const GridOct = new SqGrid(2.4142, eGridNames.SqOct, [
  { x1: -1.2071, y1: 0, x2: -0.7071, y2: 0 },
  { x1: -0.7071, y1: 0, x2: 0.0, y2: -0.7071 },
  { x1: 0.0, y1: -1.2071, x2: 0.0, y2: -0.7071 },
  { x1: 0.0, y1: -0.7071, x2: 0.7071, y2: 0.0 },
  { x1: 1.2071, y1: 0, x2: 0.7071, y2: 0 },
  { x1: 0.7071, y1: 0, x2: 0.0, y2: 0.7071 },
  { x1: 0.0, y1: 1.2071, x2: 0.0, y2: 0.7071 },
  { x1: 0.0, y1: 0.7071, x2: -0.7071, y2: 0.0 }
]);

export const GridTruncHex = new TriGrid(3.732, eGridNames.TruncHex, [
  { x1: 0.0, y1: 1.616, x2: 0, y2: 1.116 },
  { x1: 0.0, y1: 1.116, x2: 0.5, y2: 0.25 },
  { x1: 0.0, y1: 1.116, x2: -0.5, y2: 0.25 },
  { x1: -0.5, y1: 0.25, x2: 0.5, y2: 0.25 },
  { x1: -0.5, y1: 0.25, x2: -0.933, y2: 0.0 },
  { x1: 0.5, y1: 0.25, x2: 0.933, y2: 0.0 }
]);

export const GridTruncTriHex = new TriGrid(4.732, eGridNames.TruncTriHex, [
  { x1: -0.5, y1: 1.549, x2: 0.5, y2: 1.549 },
  { x1: 0.5, y1: 2.049, x2: 0.5, y2: 1.549 },
  { x1: -0.5, y1: 2.049, x2: -0.5, y2: 1.549 },
  { x1: -0.5, y1: 1.549, x2: -1, y2: 0.683 },
  { x1: 0.5, y1: 1.549, x2: 1, y2: 0.683 },
  { x1: -1, y1: 0.683, x2: -1.433, y2: 0.433 },
  { x1: 1, y1: 0.683, x2: 1.433, y2: 0.433 },
  { x1: -0.5, y1: -0.183, x2: -1, y2: 0.683 },
  { x1: 0.5, y1: -0.183, x2: 1, y2: 0.683 },
  { x1: -0.5, y1: -0.183, x2: 0.5, y2: -0.183 },
  { x1: -0.5, y1: -0.183, x2: -0.933, y2: -0.433 },
  { x1: 0.5, y1: -0.183, x2: 0.933, y2: -0.433 }
]);

export const GridRhombiTriHex = new TriGrid(2.723, eGridNames.RhombiTriHex, [
  { x1: -0.5, y1: 1.183, x2: -0.5, y2: 0.683 },
  { x1: 0.5, y1: 1.183, x2: 0.5, y2: 0.683 },
  { x1: -0.5, y1: 0.683, x2: 0.5, y2: 0.683 },
  { x1: 0.933, y1: 0.433, x2: 0.5, y2: 0.683 },
  { x1: -0.933, y1: 0.433, x2: -0.5, y2: 0.683 },
  { x1: -0.5, y1: 0.683, x2: 0, y2: -0.183 },
  { x1: 0.5, y1: 0.683, x2: 0, y2: -0.183 },
  { x1: 0, y1: -0.183, x2: 0.433, y2: -0.433 },
  { x1: 0, y1: -0.183, x2: -0.433, y2: -0.433 }
]);

export const GridHex = new TriGrid(1.723, eGridNames.Hex, [
  { x1: 0, y1: -0.25, x2: 0, y2: -0.75 },
  { x1: 0, y1: -0.25, x2: 0.433, y2: 0 },
  { x1: 0, y1: -0.25, x2: -0.433, y2: 0 }
]);

export const GridTri = new TriGrid(1.723, eGridNames.Triangle, [
  { x1: 0.0, y1: 0.75, x2: 0.0, y2: -0.75 },
  { x1: -0.866, y1: -0.75, x2: 0.433, y2: 0 },
  { x1: 0.866, y1: -0.75, x2: -0.433, y2: 0 }
]);

export const GridTriHex = new TriGrid(2, eGridNames.TriHex, [
  { x1: -0.5, y1: 0, x2: 0.5, y2: 0.0 },
  { x1: -0.5, y1: 0, x2: 0, y2: 0.866 },
  { x1: 0.5, y1: 0, x2: 0, y2: 0.866 }
]);

// rhombihexext
export const GridRhombiHexExt = new TriGrid(3.723, eGridNames.RhombiHexExt, [
  { x1: 0, y1: 1.616, x2: 0, y2: 1.115 },
  { x1: 1, y1: 1.616, x2: 1, y2: 1.115 },
  { x1: -1, y1: 1.616, x2: -1, y2: 1.115 },
  { x1: -1, y1: 1.115, x2: 1, y2: 1.115 },
  { x1: 0, y1: 1.115, x2: 0.5, y2: 0.25 },
  { x1: 0, y1: 1.115, x2: -0.5, y2: 0.25 },
  { x1: 0.5, y1: 0.25, x2: -0.5, y2: 0.25 },
  { x1: 1.0, y1: 1.115, x2: 0, y2: -0.617 },
  { x1: -1, y1: 1.115, x2: 0, y2: -0.617 },
  { x1: -1.0, y1: 1.115, x2: -1.433, y2: 0.865 },
  { x1: 1.0, y1: 1.115, x2: 1.433, y2: 0.865 },
  { x1: -0.5, y1: 0.25, x2: -0.933, y2: 0.0 },
  { x1: 0.5, y1: 0.25, x2: 0.933, y2: 0.0 },
  { x1: 0, y1: -0.617, x2: -0.433, y2: -0.867 },
  { x1: 0, y1: -0.617, x2: 0.433, y2: -0.867 }
]);

export const GridDoDecHex = new TriGrid(5.464, eGridNames.DoDecHex, [
  { x1: -0.8661, y1: -2.3661, x2: -0.8661, y2: -1.8661 },
  { x1: 0.8661, y1: -2.3661, x2: 0.8661, y2: -1.8661 },
  { x1: 0.8661, y1: -1.8661, x2: 0, y2: -1.3661 },
  { x1: -0.8661, y1: -1.8661, x2: 0, y2: -1.3661 },
  { x1: -0.8661, y1: -1.8661, x2: -1.3661, y2: -1.0 },
  { x1: 0.8661, y1: -1.8661, x2: 1.3661, y2: -1.0 },
  { x1: 0, y1: -1.3661, x2: 0.5, y2: -0.5 },
  { x1: 0, y1: -1.3661, x2: -0.5, y2: -0.5 },
  { x1: 0.5, y1: -0.5, x2: -0.5, y2: -0.5 },
  { x1: 1.3661, y1: -1.0, x2: 0.5, y2: -0.5 },
  { x1: -1.3661, y1: -1.0, x2: -0.5, y2: -0.5 },
  { x1: -1.3661, y1: -1.0, x2: -1.7991, y2: -0.75 },
  { x1: 1.3661, y1: -1.0, x2: 1.7991, y2: -0.75 },
  { x1: 0.5, y1: 0.5, x2: -0.5, y2: 0.5 },
  { x1: 0.5, y1: -0.5, x2: 0.5, y2: 0.5 },
  { x1: -0.5, y1: -0.5, x2: -0.5, y2: 0.5 },
  { x1: 0.5, y1: 0.5, x2: 0.933, y2: 0.75 },
  { x1: -0.5, y1: 0.5, x2: -0.933, y2: 0.75 }
]);

export const GridHexSq = new TriGrid(3.7322, eGridNames.HexSq, [
  { x1: 0.0, y1: -1.6161, x2: 0.0, y2: -1.1161 },
  { x1: 0.0, y1: -1.1161, x2: -0.8661, y2: -1.6161 },
  { x1: 0.0, y1: -1.1161, x2: 0.8661, y2: -1.6161 },
  { x1: -0.8661, y1: -1.6161, x2: -1.3661, y2: -0.75 },
  { x1: 0.8661, y1: -1.6161, x2: 1.3661, y2: -0.75 },
  { x1: 0.0, y1: -1.1161, x2: 0.5, y2: -0.25 },
  { x1: 0.0, y1: -1.1161, x2: -0.5, y2: -0.25 },
  { x1: -0.5, y1: -0.25, x2: 0.5, y2: -0.25 },
  { x1: -1.3661, y1: -0.75, x2: -0.5, y2: -0.25 },
  { x1: 1.3661, y1: -0.75, x2: 0.5, y2: -0.25 },
  { x1: -0.5, y1: -0.25, x2: -0.5, y2: 0.75 },
  { x1: 0.5, y1: -0.25, x2: 0.5, y2: 0.75 },
  { x1: -0.5, y1: 0.75, x2: 0.5, y2: 0.75 },
  { x1: -0.5, y1: -0.25, x2: -0.933, y2: 0 },
  { x1: 0.5, y1: -0.25, x2: 0.933, y2: 0 }
]);

export const GridHexHexSq = new TriGrid(4.7322, eGridNames.HexHexSq, [
  { x1: -0.5, y1: -2.0492, x2: -0.5, y2: -1.5492 },
  { x1: -1.5, y1: -2.0492, x2: -1.5, y2: -1.5492 },
  { x1: 0.5, y1: -2.0492, x2: 0.5, y2: -1.5492 },
  { x1: 1.5, y1: -2.0492, x2: 1.5, y2: -1.5492 },
  { x1: -1.5, y1: -1.5492, x2: 1.5, y2: -1.5492 },
  { x1: -1.5, y1: -1.5492, x2: 0, y2: 1.0489 },
  { x1: 1.5, y1: -1.5492, x2: 0, y2: 1.0489 },
  { x1: 0.5, y1: -1.5492, x2: 1, y2: -0.6831 },
  { x1: -0.5, y1: -1.5492, x2: -1, y2: -0.6831 },
  { x1: -0.5, y1: 0.183, x2: 0.5, y2: 0.183 },
  { x1: -1.5, y1: -1.5492, x2: -1.933, y2: -1.2992 },
  { x1: -1, y1: -0.6831, x2: -1.433, y2: -0.4331 },
  { x1: -0.5, y1: 0.183, x2: -0.933, y2: 0.433 },
  { x1: 0, y1: 1.0489, x2: -0.433, y2: 1.2989 },
  { x1: 1.5, y1: -1.5492, x2: 1.933, y2: -1.2992 },
  { x1: 1, y1: -0.6831, x2: 1.433, y2: -0.4331 },
  { x1: 0.5, y1: 0.183, x2: 0.933, y2: 0.433 },
  { x1: 0, y1: 1.0489, x2: 0.433, y2: 1.2989 }
]);

//
///////////////////////////////////////////////////////////////////////////////

export type dictGrids = {
  [key in eGridNames]: Grid;
};
export const gridList: dictGrids = {
  //NulGrid: NullGrid,
  Triangle: GridTri,
  Square: GridSquare,
  SqOct: GridOct,
  Hex: GridHex,
  TriHex: GridTriHex,
  TruncHex: GridTruncHex,
  RhombiTriHex: GridRhombiTriHex,
  RhombiHexExt: GridRhombiHexExt,
  TruncTriHex: GridTruncTriHex,
  DoDecHex: GridDoDecHex,
  HexSq: GridHexSq,
  HexHexSq: GridHexHexSq
} as const;

// the last 'as const' allows me to do this: keyof typeof gridList.
// and THAT gives up a type safe list of keys.
export type tGridNames = keyof typeof gridList;

/*export const agridList: Grid = [
  //NulGrid: NullGrid,
  GridTri,
  GridSquare,
  GridOct,
  GridHex,
  GridTriHex,
  GridTruncHex,
  GridRhombiTriHex,
  GridRhombiHexExt,
  GridTruncTriHex,
  GridDoDecHex,
  GridHexSq,
  GridHexHexSq
] as const;*/
