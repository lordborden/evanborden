/* =============================================================
   Evan Borden — Liquid Glass
   Pointer-reactive shine + subtle 3D parallax.
   ============================================================= */

(() => {
  const root = document.documentElement;
  const tilt = document.querySelector('[data-tilt]');
  if (!tilt) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Smoothed targets so movement feels like glass (heavy, with momentum)
  let tx = 0, ty = 0, cx = 0, cy = 0;
  let sx = 50, sy = 50, csx = 50, csy = 50;
  let shineAngle = 135;
  let raf = 0;

  const loop = () => {
    cx  += (tx  - cx)  * 0.08;
    cy  += (ty  - cy)  * 0.08;
    csx += (sx  - csx) * 0.10;
    csy += (sy  - csy) * 0.10;

    root.style.setProperty('--tilt-x', cx.toFixed(2) + 'deg');
    root.style.setProperty('--tilt-y', cy.toFixed(2) + 'deg');
    root.style.setProperty('--px', csx.toFixed(1) + '%');
    root.style.setProperty('--py', csy.toFixed(1) + '%');
    root.style.setProperty('--shine-angle', shineAngle.toFixed(1) + 'deg');

    const settled =
      Math.abs(tx - cx)  < 0.01 &&
      Math.abs(ty - cy)  < 0.01 &&
      Math.abs(sx - csx) < 0.05 &&
      Math.abs(sy - csy) < 0.05;

    raf = settled ? 0 : requestAnimationFrame(loop);
  };

  const onPointer = (e) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const nx = (e.clientX / w) - 0.5;
    const ny = (e.clientY / h) - 0.5;

    if (!reduceMotion) {
      tx =  nx * 7;
      ty = -ny * 5;
    }

    sx = (e.clientX / w) * 100;
    sy = (e.clientY / h) * 100;
    shineAngle = 90 + Math.atan2(ny, nx) * (180 / Math.PI);

    if (!raf) raf = requestAnimationFrame(loop);
  };

  window.addEventListener('pointermove', onPointer, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!e.touches || !e.touches[0]) return;
    onPointer(e.touches[0]);
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    tx = ty = 0;
    sx = sy = 50;
    shineAngle = 135;
    if (!raf) raf = requestAnimationFrame(loop);
  });
})();
