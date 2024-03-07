import type { Line, Grid, Use, Extent } from '@/helpers/GridBasics.js';
import { eGridNames } from '@/helpers/GridBasics.js';

export class TriGrid implements Grid {
  constructor(
    private baseLen: number,
    private gridName: eGridNames,
    private cell: Array<Line>
  ) {}

  cellLen(): number {
    return this.baseLen;
  }
  name(): eGridNames {
    return this.gridName;
  }
  base(): Array<Line> {
    return this.cell;
  }
  plot(ext: Extent): Array<Use> {
    const arr: Array<Use> = [];
    // these loops need to cover the extent
    // find the number of cells in each direction to cover the extent
    const wid = Math.ceil((2 * ext.right) / this.baseLen) + 1;
    const hgt = Math.ceil(ext.top / (this.baseLen * 0.866)) + 1;
    const lBeg = Math.ceil((2 * ext.left) / this.baseLen) - 1;
    const bBeg = Math.ceil(ext.bottom / (this.baseLen * 0.866)) - 1;
    //console.log(`Loop: ${lBeg} ${bBeg} ${wid} ${hgt}`);
    // this not quite right. there should be one cell centered on 0,0
    //    and things should work out from there...
    for (let i = bBeg; i < hgt; i++) {
      for (let j = lBeg; j < wid; j++) {
        let trans = '';
        const x = (j * this.baseLen) / 2;
        const y = i * this.baseLen * 0.866;
        if ((i + j) % 2 === 1 || (i + j) % 2 === -1) {
          trans = `rotate(180,${x},${y})`;
        }
        arr.push({ x: x, y: y, trans: trans, href: `#${this.gridName}` });
      }
    }
    return arr;
  }
}

/*  { x1: -0.8661, y1: 0, x2: -0.8661, y2: 0.5 },
  { x1: 0.8661, y1: 0, x2: 0.8661, y2: 0.5 },
  { x1: 0.8661, y1: 0.5, x2: 0, y2: 1.0 },
  { x1: -0.8661, y1: 0.5, x2: 0, y2: 1.0 },
  { x1: -0.8661, y1: 0.5, x2: -1.3661, y2: 1.3661 },
  { x1: 0.8661, y1: 0.5, x2: 1.3661, y2: 1.3661 },
  { x1: 0, y1: 1.0, x2: 0.5, y2: 1.8661 },
  { x1: 0, y1: 1.0, x2: -0.5, y2: 1.8661 },
  { x1: 0.5, y1: 1.8661, x2: -0.5, y2: 1.8661 },
  { x1: 1.3661, y1: 1.3661, x2: 0.5, y2: 1.8661 },
  { x1: -1.3661, y1: 1.3661, x2: -0.5, y2: 1.8661 },
  { x1: -1.3661, y1: 1.3661, x2: -1.7991, y2: 1.6161 },
  { x1: 1.3661, y1: 1.3661, x2: 1.7991, y2: 1.6161 },
  { x1: 0.5, y1: 2.8661, x2: -0.5, y2: 2.8661 },
  { x1: 0.5, y1: 1.8661, x2: 0.5, y2: 2.8661 },
  { x1: -0.5, y1: 1.8661, x2: -0.5, y2: 2.8661 },
  { x1: 0.5, y1: 2.8661, x2: 0.933, y2: 3.1161 },
  { x1: -0.5, y1: 2.8661, x2: -0.933, y2: 3.1161 }
*/

// rhombitrihexbase, rhombitrihex w/ sub divided hex
/*  cellDHex3: Array<Line> = [
    { x1: -0.5, y1: 1.183, x2: -0.5, y2: 0.683 },
    { x1: 0.5, y1: 1.183, x2: 0.5, y2: 0.683 },
    { x1: -0.5, y1: 0.683, x2: 0.5, y2: 0.683 },
    { x1: 0.5, y1: 0.683, x2: 1.366, y2: 1.183 },
    { x1: -0.5, y1: 0.683, x2: -1.366, y2: 1.183 },
    { x1: 0, y1: -0.183, x2: 0, y2: -1.183 },
    { x1: 0.933, y1: 0.433, x2: 0.5, y2: 0.683 },
    { x1: -0.933, y1: 0.433, x2: -0.5, y2: 0.683 },
    { x1: -0.5, y1: 0.683, x2: 0, y2: -0.183 },
    { x1: 0.5, y1: 0.683, x2: 0, y2: -0.183 },
    { x1: 0, y1: -0.183, x2: 0.433, y2: -0.433 },
    { x1: 0, y1: -0.183, x2: -0.433, y2: -0.433 }
  ];*/

// rhombihexextbase, rhombihexext w/ sub divided hex
/*  cellTHex4: Array<Line> = [
    { x1: 0, y1: 0.808, x2: 0.0, y2: 0.308 },
    { x1: 1, y1: 0.808, x2: 1, y2: 0.308 },
    { x1: -1, y1: 0.808, x2: -1, y2: 0.308 },
    { x1: -1, y1: 0.308, x2: 1, y2: 0.308 },
    { x1: 0, y1: 0.308, x2: 0.5, y2: -0.558 },
    { x1: 0, y1: 0.308, x2: -0.5, y2: -0.558 },
    { x1: 0.5, y1: -0.558, x2: -0.5, y2: -0.558 },
    { x1: 1.0, y1: 0.308, x2: 0, y2: -1.424 },
    { x1: -1, y1: 0.308, x2: 0, y2: -1.424 },
    { x1: -1, y1: 0.308, x2: -1.433, y2: 0.058 },
    { x1: 1, y1: 0.308, x2: 1.433, y2: 0.058 },
    { x1: -0.5, y1: -0.558, x2: -0.933, y2: -0.808 },
    { x1: 0.5, y1: -0.558, x2: 0.933, y2: -0.808 },
    { x1: 0, y1: -1.424, x2: -0.433, y2: -1.674 },
    { x1: 0, y1: -1.424, x2: 0.433, y2: -1.674 },
    { x1: 1.8661, y1: 0.808, x2: 1.0, y2: 0.308 },
    { x1: -1.8661, y1: 0.808, x2: -1.0, y2: 0.308 },
    { x1: 0, y1: -1.424, x2: 0, y2: -2.424 }
  ];*/
