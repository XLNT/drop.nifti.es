import { useCallback, useEffect, useRef } from 'react';

interface Particle {
  element: HTMLElement;
  size: number;
  speedHorz: number;
  speedUp: number;
  spinVal: number;
  spinSpeed: number;
  top: number;
  left: number;
  direction: number;
}

function isTouchEvent(e: TouchEvent | MouseEvent): e is TouchEvent {
  return window.TouchEvent && e instanceof TouchEvent;
}

export function useDrops(
  container: HTMLElement,
  options: { variants: string[]; limit?: number; sizes?: number[]; tick?: number },
) {
  const limit = useRef<number>(35);
  if (options.limit) limit.current = options.limit;

  const variants = useRef<string[]>([]);
  if (options.variants) variants.current = options.variants;

  const sizes = useRef<number[]>([15, 20, 25, 35, 45]);
  if (options.sizes) sizes.current = options.sizes;

  const tick = useRef(100);
  if (options.tick) tick.current = options.tick;

  const add = useRef(false);
  const particles = useRef<Particle[]>([]);
  const pointer = useRef<{ x: number; y: number }>();
  const lastTime = useRef<number>();

  const create = useCallback(() => {
    const size = sizes.current[Math.floor(Math.random() * sizes.current.length)];
    const speedHorz = Math.random() * 10;
    const speedUp = Math.random() * 0;
    const spinVal = Math.random() * 360;
    const spinSpeed = Math.random() * 35 * (Math.random() <= 0.5 ? -1 : 1);
    const top = 0 - size;
    const left = Math.random() * container.clientWidth;
    const direction = Math.random() <= 0.5 ? -1 : 1;

    const particle = document.createElement('span');
    particle.classList.add('particle');
    particle.innerHTML = variants.current[Math.floor(Math.random() * variants.current.length)];

    container.appendChild(particle);

    particles.current.push({
      element: particle,
      size,
      speedHorz: 0,
      speedUp,
      spinVal,
      spinSpeed,
      top,
      left,
      direction,
    });
  }, [container]);

  const update = useCallback(() => {
    particles.current.forEach((p) => {
      p.left = p.left - p.speedHorz * p.direction;
      p.top = p.top - p.speedUp;
      p.speedUp = Math.min(p.size, p.speedUp - 0.1);
      p.spinVal = p.spinVal + p.spinSpeed;

      if (p.top >= container.clientHeight + p.size) {
        particles.current = particles.current.filter((o) => o !== p);
        p.element.remove();
      }

      p.element.setAttribute(
        'style',
        `
        top: ${p.top}px;
        left: ${p.left}px;
        font-size: ${p.size}px;
        transform:rotate(${p.spinVal}deg);
      `,
      );
    });
  }, [container]);

  const loop: FrameRequestCallback = useCallback(
    (now) => {
      if (!lastTime.current || now - lastTime.current >= tick.current) {
        lastTime.current = now;

        if (add.current && particles.current.length < limit.current) {
          create();
        }
      }

      update();

      requestAnimationFrame(loop);
    },
    [create, update],
  );

  useEffect(() => {
    if (!container) return;
    loop(0);
  }, [container, loop]);

  useEffect(() => {
    const isTouchInteraction = 'ontouchstart' in window || (navigator as any).msMaxTouchPoints;

    const pointerStart = isTouchInteraction ? 'touchstart' : 'mousedown';
    const pointerEnd = isTouchInteraction ? 'touchend' : 'mouseup';
    const pointerMove = isTouchInteraction ? 'touchmove' : 'mousemove';

    const setPointer = (e: TouchEvent | MouseEvent) => {
      pointer.current = {
        x: isTouchEvent(e) ? e.touches[0].pageX : e.pageX,
        y: isTouchEvent(e) ? e.touches[0].pageY : e.pageY,
      };
    };

    const onStart = (e: TouchEvent | MouseEvent) => {
      setPointer(e);
      add.current = true;
    };

    const onMove = setPointer;

    const onEnd = () => {
      add.current = false;
    };

    document.addEventListener(pointerStart, onStart, { passive: true });
    document.addEventListener(pointerMove, onMove, { passive: true });
    document.addEventListener(pointerEnd, onEnd, { passive: true });
    document.addEventListener('mouseleave', onEnd, { passive: true });

    return () => {
      document.removeEventListener(pointerStart, onStart);
      document.removeEventListener(pointerMove, onMove);
      document.removeEventListener(pointerEnd, onEnd);
      document.removeEventListener('mouseleave', onEnd);
    };
  }, []);
}
