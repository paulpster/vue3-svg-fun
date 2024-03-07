/*import type { Grid, Line, Extent, Use } from "@/helpers/GridBasics";

export default class GridRhombiTriHex implements Grid {
  baseLen = 2.732;
  cellRhombiTriHex: Array<Line> = [
    { x1: -0.5, y1: 1.183, x2: -0.5, y2: 0.683 },
    { x1: 0.5, y1: 1.183, x2: 0.5, y2: 0.683 },
    { x1: -0.5, y1: 0.683, x2: 0.5, y2: 0.683 },
    { x1: 0.933, y1: 0.433, x2: 0.5, y2: 0.683 },
    { x1: -0.933, y1: 0.433, x2: -0.5, y2: 0.683 },
    { x1: -0.5, y1: 0.683, x2: 0, y2: -0.183 },
    { x1: 0.5, y1: 0.683, x2: 0, y2: -0.183 },
    { x1: 0, y1: -0.183, x2: 0.433, y2: -0.433 },
    { x1: 0, y1: -0.183, x2: -0.433, y2: -0.433 }
  ];
  gridName = "rhombitrihex";

  name(): string {
    return this.gridName;
  }
  base(): Array<Line> {
    return this.cellRhombiTriHex;
  }
  plot(ext: Extent): Array<Use> {
    const arr: Array<Use> = [];
    // these loops need to cover the extent
    // find the number of cells in each direction to cover the extent
    const wid = Math.ceil((2 * ext.right) / this.baseLen) + 1;
    const hgt = Math.ceil(ext.top / (this.baseLen * 0.866)) + 1;
    const lBeg = Math.ceil((2 * ext.left) / this.baseLen) - 1;
    const bBeg = Math.ceil(ext.bottom / (this.baseLen * 0.866)) - 1;
    console.log(`Loop: ${lBeg} ${bBeg} ${wid} ${hgt}`);
    // this not quite right. there should be one cell centered on 0,0
    //    and things should work out from there...
    for (let i = bBeg; i < hgt; i++) {
      for (let j = lBeg; j < wid; j++) {
        let trans = "";
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
*/
