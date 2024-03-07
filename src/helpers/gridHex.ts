/*import type { Grid, Line, Extent, Use } from "@/helpers/GridBasics";

export default class GridHex implements Grid {
  baseLen = 1;
  cellHex: Array<Line> = [
    { x1: 0.0, y1: 0, x2: 0.0, y2: -0.5 },
    { x1: 0.0, y1: 0.0, x2: 0.433, y2: 0.25 },
    { x1: 0.0, y1: 0.0, x2: -0.433, y2: 0.25 }
  ];
  gridName = "hex";

  name(): string {
    return this.gridName;
  }
  base(): Array<Line> {
    return this.cellHex;
  }
  plot(ext: Extent): Array<Use> {
    const arr: Array<Use> = [];
    // these loops need to cover the extent
    // find the number of cells in each direction to cover the extent
    const wid = Math.ceil(ext.right / 0.866) + 1;
    const hgt = Math.ceil(ext.top / 0.75) + 1;
    const lBeg = Math.ceil(ext.left / 0.866) - 1;
    const bBeg = Math.ceil(ext.bottom / 1) - 1;
    console.log(`Loop: ${lBeg} ${bBeg} ${wid} ${hgt}`);
    // this not quite right. there should be one cell centered on 0,0
    //    and things should work out from there...
    for (let i = bBeg; i < hgt; i++) {
      for (let j = lBeg; j < wid; j++) {
        let x = j * 0.866;
        const y = i * 0.75;
        if (i % 2 === 1 || i % 2 === -1) {
          x += 0.433;
        }
        arr.push({ x: x, y: y, trans: "", href: `#${this.gridName}` });
      }
    }
    return arr;
  }
}
*/
