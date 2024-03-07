/**
 *  Descartes theorem:
 *  b is bend or 1/radius
 *
 *	b1^2 + b2^2 + b3^2 + b4^2 = (b1 + b2 + b3 + b4)^2/2
 *
 *	Solve for b4
 *	b4^2 + (b1^2 + b2^2 + b3^2) = (b1 + b2 + b3 + b4)(b1 + b2 + b3 + b4)/2
 *								= (b1^2 + b1b2 + b1b3 + b1b4 +
 *								   b2b1 + b2^2 + b2b3 + b2b4 +
 *								   b3b1 + b3b2 + b3^2 + b3b4 +
 *								   b4b1 + b4b2 + b4b3 + b4^2)/2
 *
 *								= ((b1^2 + b1b2 + b1b3 +
 *								   b2b1 + b2^2 + b2b3 +
 *								   b3b1 + b3b2 + b3^2) +
 *								   2(b1 + b2 + b3)b4 + b4^2)/2
 *
 *								= ((b1 + b2 + b3)^2 + 2(b1 + b2 + b3)b4 + b4^2)/2
 *								= (b1 + b2 + b3)^2/2 + (b1 + b2 + b3)b4 + b4^2/2
 *	b4^2/2 - (b1 + b2 + b3)b4 + (b1^2 + b2^2 + b3^2) - (b1 + b2 + b3)^2/2 = 0
 *
 *	coefficients:
 *		a: 1/2
 *		b: - (b1 + b2 + b3)
 *		c: (b1^2 + b2^2 + b3^2) - (b1 + b2 + b3)^2/2
 *
 *	Quadratic formula: (-b +/- sqrt(b^2 - 4ac))/2a
 *
 *	my purpose simplified: b +/- sqrt(b^2 - 2c)
 *
 *	Modified Descatres theorem:
 *	(b1z1)^2 + (b2z2)^2 + (b3z3)^2 + (b4z4)^2 = (b1z1 + b2z2 + b3z3 + b4z4)^2/2
 *  z = complex number indicating the center of the circle on the complex plane
 *
 *	coefficients:
 *    a: b4^2/2
 *    d = (b1*z1 + b2*z2 + b3*z3)
 *		b: - b4 * d
 *		c: ((b1*z1)^2 + (b2*z2)^2 + (b3*z3)^2) - d^2/2
 *
 *  Paper: Beyond the Decartes Circle Theorem
 *            Did verify this
 *  b4 + b4p = 2(b1 + b2 + b3)
 *
 *  b4z4 + b4pz4p = 2(b1z1 + b2z2 + b3z3)
 *  if i can realiable determine b4p and z4p to be a circle i already have.
 *  finding z4 should be easy and determinate (fewer calculations).
 *  I need at least 4 circles to start. b4p is the smaller of the two roots.
 *  i could find z4p if i know who has a bend of b4p AND is already tangent to z1, z2, and z3
 *
 */

//import { assert } from "chai";
import Complex from 'complex.js';

// parents are the index in the master list of cirlces
export type Circle = {
  x: number;
  y: number;
  b: number;
};

export type Work = {
  cir: number;
  depth: number;
  parents: Array<number>;
};

///////////////////////////////////////
// formatters to help with debugging
//function CtoS(c: Circle): string {
//  return `x: ${c.x} y: ${c.y} b: ${c.b}`;
//}
//function WtoS(w: Work): string {
//  return `cir: ${w.cir} parents: [${w.parents[0]},${w.parents[1]},${w.parents[2]}]`;
//}
//
//////////////////////////////////////

export function isBetween(x: number, a: number, b: number): boolean {
  //x = Math.abs(x);
  //a = Math.abs(a);
  //b = Math.abs(b);

  if (a < b) {
    return a < x && x < b;
  } else {
    return a > x && x > b;
  }
}

// make this work with Circle
export function triArea(c1: Circle, c2: Circle, c3: Circle): number {
  // i should check the proof of this one day
  return Math.abs((c1.x * (c2.y - c3.y) + c2.x * (c3.y - c1.y) + c3.x * (c1.y - c2.y)) / 2.0);
}

// this method is failing me....
export function inTriangle(mid: Circle, c1: Circle, c2: Circle, c3: Circle) {
  // this is not a generic function, it will be specific to this application
  // if one of the circles has a negative or zero curvature?

  // what is the most efficient way to do this?
  // basic idea: if the sum of the sub triangles with mid are greater than the main triangle, failure
  //
  // if a point is on the triangle edge (an area of zero), then failure
  // if a bend is negative, the new point needs to be away from the origin
  //    compared to the line the positive curvature points make

  const bigT = triArea(c1, c2, c3);
  const subT1 = triArea(mid, c2, c3);
  const subT2 = triArea(c1, mid, c3);
  const subT3 = triArea(c1, c2, mid);
  //console.log(`bigT: ${bigT}, subT: ${subT1} ${subT2} ${subT3}`);

  // we are dealing with floats, this could cause a problem at some point
  if (subT1 === 0 || subT2 === 0 || subT3 === 0) {
    return false;
  }

  // want outside of the triangle for outside circles
  if (c1.b < 0 || c2.b < 0 || c3.b < 0) {
    return subT1 + subT2 + subT3 > bigT;
  }
  return subT1 + subT2 + subT3 <= bigT;
}

export function quadradic(a: number, b: number, c: number): [number, number] {
  const s = Math.sqrt(b * b - 4 * a * c);
  return [(-b + s) / (2 * a), (-b - s) / (2 * a)];
}

export function quadraticRoot(a: Complex, b: Complex, c: Complex): [Complex, Complex] {
  const sqrt = b.mul(b).sub(a.mul(c).mul(4)).sqrt();
  const x1 = b.neg().add(sqrt).div(a.mul(2));
  const x2 = b.neg().sub(sqrt).div(a.mul(2));
  return [x1, x2];
}

export function newBend(b1: number, b2: number, b3: number): [number, number] {
  const b = b1 + b2 + b3;
  const c = b1 * b1 + b2 * b2 + b3 * b3 - (b * b) / 2;

  //console.log(`newBend: ${b} ${c} ${b * b - 2 * c}`);
  // on occasion b * b - 2 * c is negative and a small number
  //    i think this happens when i have symmetry on the x-axis
  //    AND because of imperfect number crunching (the nature of
  //    floating point representation in computers)
  let tmp = b * b - 2 * c;
  // making the executive decision to make tmp 0 if ist is very small and negative
  if (tmp < 0 && tmp * -500 < 1) {
    tmp = 0;
  }
  const s = Math.sqrt(tmp);
  return [b + s, b - s];
}

export function newCircles(c1: Circle, c2: Circle, c3: Circle): [Circle, Circle] {
  // will need to add some brains here for the case that circles are inside of others.
  // the radius of encompassing circles are NEGATIVE
  // one of our circles may be a line....
  // this will no longer be for general use. i intend to use this for the first pair
  //    of circles only

  //console.log(
  //  `InpCircles: ${c1.x},${c1.y} b:${c1.b};  ${c2.x},${c2.y} b:${c2.b};  ${c3.x},${c3.y} b:${c3.b};`
  //);
  const bz1 = new Complex(c1.x, c1.y).mul(c1.b);
  const bz2 = new Complex(c2.x, c2.y).mul(c2.b);
  const bz3 = new Complex(c3.x, c3.y).mul(c3.b);

  //console.log(`BZs ${bz1} ${bz2} ${bz3}`);
  //console.log(`myBends: ${c1.b} ${c2.b} ${c3.b}`);
  const newB: [number, number] = newBend(c1.b, c2.b, c3.b);
  // resulting bends that are negative are on the OUTSIDE of other circles

  //console.log(`Bends: ${newB}`);
  const b4 = newB[0];
  let a = new Complex((b4 * b4) / 2, 0);
  const d = bz1.add(bz2).add(bz3);
  let b = d.mul(-b4);
  const c = bz1.mul(bz1).add(bz2.mul(bz2)).add(bz3.mul(bz3)).sub(d.mul(d).div(2));

  //console.log(`Constants: ${a} ${b} ${c} ${d}`);
  // only [0] is useful
  const z4: [Complex, Complex] = quadraticRoot(a, b, c);
  // now for the other circle
  a = new Complex((newB[1] * newB[1]) / 2, 0);
  b = d.mul(-newB[1]);
  const z4p: [Complex, Complex] = quadraticRoot(a, b, c);

  // trial and error told me which z4, z4p combination works
  return [
    { x: z4[1].re, y: z4[1].im, b: b4 },
    { x: z4p[0].re, y: z4p[0].im, b: newB[1] }
  ];
}
export function getCircle(c1: Circle, c2: Circle, c3: Circle, c4: Circle): Circle {
  // c1, c2, c3 define a bounding region for the new circle there are two possible answers
  //    c4(prime) is one of then, i can use that to find the result in a definitive way

  // newB[1] is the small bend and shoudl match c4.b
  const newB: [number, number] = newBend(c1.b, c2.b, c3.b);

  //console.log(`newB for: ${c1.b} ${c2.b} ${c3.b} => ${newB[0]} ${newB[1]}`);
  // b4z4 + b4pz4p = 2(b1z1 + b2z2 + b3z3)
  // z4 = (2(b1z1 + b2z2 + b3z3) - b4pz4p)/b4
  const bz1 = new Complex(c1.x, c1.y).mul(c1.b);
  const bz2 = new Complex(c2.x, c2.y).mul(c2.b);
  const bz3 = new Complex(c3.x, c3.y).mul(c3.b);
  const bz4p = new Complex(c4.x, c4.y).mul(c4.b);

  //const sum = bz1.add(bz2).add(bz3);
  //const s2 = sum.mul(2, 0);
  //const sub = s2.sub(bz4p);
  //const z4t = sub.div(newB[0], 0);

  const z4 = bz1.add(bz2).add(bz3).mul(2).sub(bz4p).div(newB[0]);

  return { x: z4.re, y: z4.im, b: newB[0] };
}

export function nextCircles(pivot: Circle, c1: Circle, c2: Circle, c3: Circle): Array<Circle> {
  // there should be three possible results from this input
  const ret: Array<Circle> = [];
  ret.push(getCircle(pivot, c1, c2, c3));
  ret.push(getCircle(pivot, c1, c3, c2));
  ret.push(getCircle(pivot, c3, c2, c1));
  return ret;
}

export function getMoreWork(
  work: Array<Work>,
  arrCir: Array<Circle>,
  maxBend: number
): Array<Work> {
  const newWork: Array<Work> = [];
  let id = arrCir.length;
  work.forEach((ele) => {
    // three circles for each piece of work
    //console.log(`              WORK: ${WtoS(ele)}`);
    //console.log(
    //  `P: ${CtoS(arrCir[ele.cir])} C1: ${CtoS(
    //    arrCir[ele.parents[0]]
    //  )} C2: ${CtoS(arrCir[ele.parents[1]])} C3: ${CtoS(
    //    arrCir[ele.parents[2]]
    //  )}`
    //);
    let nc = getCircle(
      arrCir[ele.cir],
      arrCir[ele.parents[0]],
      arrCir[ele.parents[1]],
      arrCir[ele.parents[2]]
    );
    arrCir.push(nc);
    //console.log(
    //  `     NC: ${CtoS(nc)} P1: ${CtoS(arrCir[ele.cir])} P2: ${CtoS(
    //    arrCir[ele.parents[0]]
    //  )} P3: ${CtoS(arrCir[ele.parents[1]])}`
    //);
    if (nc.b < maxBend) {
      const nw = {
        cir: id,
        depth: ele.depth + 1,
        parents: [ele.cir, ele.parents[0], ele.parents[1]]
      };
      //console.log(`       NW: ${WtoS(nw)}`);
      newWork.push(nw);
    }
    id++; // the id of this circle is now correct, if i did it within the if, things would get off track

    //console.log(
    //  `P: ${CtoS(arrCir[ele.cir])} C1: ${CtoS(
    //    arrCir[ele.parents[0]]
    //  )} C2: ${CtoS(arrCir[ele.parents[2]])} C3: ${CtoS(
    //    arrCir[ele.parents[1]]
    //  )}`
    //);
    nc = getCircle(
      arrCir[ele.cir],
      arrCir[ele.parents[0]],
      arrCir[ele.parents[2]],
      arrCir[ele.parents[1]]
    );
    //console.log(
    //  `     NC: ${CtoS(nc)} P1: ${CtoS(arrCir[ele.cir])} P2: ${CtoS(
    //    arrCir[ele.parents[0]]
    //  )} P3: ${CtoS(arrCir[ele.parents[2]])}`
    //);
    arrCir.push(nc);
    if (nc.b < maxBend) {
      const nw = {
        cir: id,
        depth: ele.depth + 1,
        parents: [ele.cir, ele.parents[0], ele.parents[2]]
      };
      //console.log(`       NW: ${WtoS(nw)}`);
      newWork.push(nw);
    }
    id++; // the id of this circle is now correct, if i did it within the if, things would get off track

    //console.log(
    //  `P: ${CtoS(arrCir[ele.cir])} C1: ${CtoS(
    //    arrCir[ele.parents[1]]
    //  )} C2: ${CtoS(arrCir[ele.parents[2]])} C3: ${CtoS(
    //    arrCir[ele.parents[0]]
    //  )}`
    //);
    nc = getCircle(
      arrCir[ele.cir],
      arrCir[ele.parents[1]],
      arrCir[ele.parents[2]],
      arrCir[ele.parents[0]]
    );
    //console.log(
    //  `     NC: ${CtoS(nc)} P1: ${CtoS(arrCir[ele.cir])} P2: ${CtoS(
    //    arrCir[ele.parents[1]]
    //  )} P3: ${CtoS(arrCir[ele.parents[2]])}`
    //);
    arrCir.push(nc);
    if (nc.b < maxBend) {
      const nw = {
        cir: id,
        depth: ele.depth + 1,
        parents: [ele.cir, ele.parents[1], ele.parents[2]]
      };
      //console.log(`       NW: ${WtoS(nw)}`);
      newWork.push(nw);
    }
    id++; // the id of this circle is now correct, if i did it within the if, things would get off track
  });
  return newWork;
}

/*
  And now for my next trick: 
    up til now i have started with two circles on the x-axis with total diameters of 1 (the outer circle: O)
    I want to have one circle on the x-axis (I) and one off axis (C) on some line that goes thru the circle on 
      the x-axis. 
    The line that the center of the off axis circle is on:
        y-yi = m(x-xi) where m = (yi-yp)/(xi-xp) where P is some point indicated by a mouse perhaps....

    for a given possible radius for C, the center must be on (xc-xi)^2 + (yc-yi)^2 = (ri+rc)^2
    when you solve this (by shifting I to the origin, do substitution, and shift back again)
      there are two solutions (for xc) for where the line crosses the circle, I want the positive solution
        xc = xi + (ri+rc)/sqrt((1+m^2))
        yc = xi + m*(ri+rc)/sqrt((1+m^2))

    circle C is tangent to I, this is what we solved for.
    now let us find out where the outer circle O crosses C
        (x-xc)^2 + (y-yc)^2 = rc^2
        x^2      + y^2      = 1

    subtract those and solve for y
        y = -x*xc/yc + (xc^2 + yc^2 + 1 - rc^2)/2*yc

    define G = (xc^2 + yc^2 + 1 + rc^2)/2*yc

    substitute y into x^2 + y^2 = 1 and solve for x
        (1+xc^2/yc^2)*x^2 -(2*G*xc/yc)*x + G^2 -1 = 0

    the quadratic formula can give us:
        two real solutions b^2-4ac > 0
        two imaginary solutions b^2-4ac < 0
        one real solution b^2-4ac = 0
  
    ultimately we want the one solution (tangency). analytically, this is possible substitute xc and yc for
      terms we know and rc. we could then solve for rc and get the exact solution. someday I will do that, 
      but it will be quite a bit of work. 

  There may be a better way to do the analysis, but I do not know right now.
  I can do some guessing and bracket a solution down to an error of less than .000001 or something

      b^2-4ac = (2*G*xc/yc)^2 - 4*(1+xc^2/yc^2)*(G^2 -1)
              = 4*xc^2 - 2*xc^2*G^2 - 4*yc^2G^2 + 4*yc^2

  this helped me think on how to simplify the problem...
    https://www.xarg.org/2016/07/calculate-the-intersection-points-of-two-circles/
*/

export function getCenterCbyR(inner: Circle, poss: Circle, rc: number): Circle {
  const m = (inner.y - poss.y) / (inner.x - poss.x);
  const tmpx = (1 / inner.b + rc) / Math.sqrt(1 + m * m);
  const xc = tmpx + inner.x;
  const yc = m * tmpx + inner.y;

  return { x: xc, y: yc, b: 1 / rc };
}
export function midCalcs(inner: Circle, poss: Circle, rc: number): [Circle, number] {
  const tmp1 = getCenterCbyR(inner, poss, rc);
  const dist = Math.sqrt(tmp1.x * tmp1.x + tmp1.y * tmp1.y);

  // this will approach 1 on tangency
  const xp = (1 + dist * dist - rc * rc) / (2 * dist);

  //console.log(`returned center: ${CtoS(tmp1)} xp: ${xp}`);
  return [tmp1, 1 - xp];
}
export function getOffAxisCircle(inner: Circle, poss: Circle): Circle {
  let minR = 0.1;
  let maxR = 0.8;
  let currR = maxR;
  const maxErr = 0.00001;

  let [circC, currRet] = midCalcs(inner, poss, maxR);
  let i = 20;
  while (Math.abs(currRet) > maxErr && i > 0) {
    if (currRet > 0) {
      // circle needs to be smaller
      maxR = currR;
    } else {
      // circle needs to be bigger
      minR = currR;
    }
    currR = (minR + maxR) / 2;
    [circC, currRet] = midCalcs(inner, poss, currR);
    i--;
  }
  return circC;
}
