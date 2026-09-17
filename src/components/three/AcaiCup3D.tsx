'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * The feature panel's açaí cup, rebuilt as real 3D geometry so it can be
 * grabbed and spun a full 360°.
 *
 * It is modelled from the photograph rather than invented. `/img/bowl-hero-b.png`
 * was measured: the cup body runs 390px from rim to base at 175px radius up top
 * and 117px just above it, and the topping mound is 232px across — every
 * constant below is that measurement scaled at 0.003974 world units per pixel.
 * The contents are a surface of revolution textured with `/img/cup-bands.png`,
 * which is the photo's own colour profile sampled row by row down the cup, so
 * the açaí / chia / mango banding is the real thing and — being revolved — has
 * no seam at any angle. The toppings are individual meshes in the photo's
 * palette, scattered on the mound by a seeded PRNG so every render places them
 * identically.
 *
 * Interaction is hand-rolled rather than OrbitControls for one reason: on a
 * phone OrbitControls claims every touch and the page stops scrolling under
 * the cup. Here the first few pixels of a touch decide — mostly sideways grabs
 * the cup, mostly vertical is left alone and scrolls the page.
 */

/* Measured off the photo ------------------------------------------------- */
const R_TOP = 0.695; //  175px rim radius
const R_BOT = 0.465; //  117px base radius
const BODY_H = 1.55; //  390px rim to base
const DOME_R = 0.9; //   232px topping mound, overhanging the rim as it does
const RIM_Y = BODY_H;

/** Sampled from the photo's topping dome. */
const C = {
  mound: '#5c3541',
  berry: '#414c6e',
  straw: '#c62a20',
  banana: '#eee2bb',
  coconut: '#f2f0e6',
  granola: '#94663a',
} as const;

const UP = new THREE.Vector3(0, 1, 0);
const MAX_TILT = 0.42;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The cup's silhouette as a lathe profile, base first. `inset` pulls it
 *  inwards so the contents can sit inside the shell. */
function profile(inset: number, topY: number) {
  const pts: THREE.Vector2[] = [];
  const baseR = R_BOT - inset;
  for (let i = 0; i <= 6; i++) {
    const a = ((i / 6) * Math.PI) / 2;
    pts.push(
      new THREE.Vector2(baseR * Math.sin(a), inset + 0.07 * (1 - Math.cos(a)))
    );
  }
  const steps = 40;
  const y0 = 0.07 + inset;
  for (let i = 1; i <= steps; i++) {
    const y = y0 + (i / steps) * (topY - y0);
    pts.push(
      new THREE.Vector2(
        THREE.MathUtils.lerp(R_BOT, R_TOP, y / BODY_H) - inset,
        y
      )
    );
  }
  return pts;
}

type Topping = {
  kind: 'berry' | 'straw' | 'banana' | 'coconut' | 'granola';
  pos: [number, number, number];
  quat: [number, number, number, number];
  scale: number;
};

function buildToppings(): Topping[] {
  const rand = mulberry32(0x0ac4a1);
  const out: Topping[] = [];
  /* kind, count, its own radius, how far down the mound it may sit */
  const spec: [Topping['kind'], number, number, number][] = [
    ['granola', 46, 0.045, 1.42],
    ['berry', 30, 0.068, 1.3],
    ['banana', 22, 0.082, 1.34],
    ['straw', 10, 0.1, 1.15],
    ['coconut', 54, 0.05, 1.4],
  ];
  for (const [kind, count, size, maxPhi] of spec) {
    for (let i = 0; i < count; i++) {
      /* Area-uniform over the cap would be "even", but the crown is heavily
         foreshortened from any viewing angle and ends up looking bare, so the
         distribution is pulled towards the top. */
      const theta = rand() * Math.PI * 2;
      const phi = maxPhi * Math.pow(rand(), 0.62);
      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta)
      );
      const p = dir
        .clone()
        .multiplyScalar(DOME_R + size * 0.45)
        .multiply(new THREE.Vector3(1, 0.78, 1));
      const q = new THREE.Quaternion()
        .setFromUnitVectors(UP, dir)
        .multiply(
          new THREE.Quaternion().setFromAxisAngle(UP, rand() * Math.PI * 2)
        );
      out.push({
        kind,
        pos: [p.x, p.y, p.z],
        quat: [q.x, q.y, q.z, q.w],
        scale: 0.82 + rand() * 0.4,
      });
    }
  }
  return out;
}

/** A hemisphere with its vertices nudged about, so the açaí under the
 *  toppings reads as a scooped mound rather than a billiard ball. */
function moundGeometry() {
  const g = new THREE.SphereGeometry(
    DOME_R,
    72,
    36,
    0,
    Math.PI * 2,
    0,
    Math.PI * 0.5
  );
  const pos = g.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n =
      Math.sin(v.x * 7.3 + v.z * 4.1) * 0.5 +
      Math.sin(v.z * 9.7 - v.y * 5.5) * 0.3 +
      Math.sin(v.x * 13.1 + v.y * 8.3) * 0.2;
    const k = 1 + n * 0.035;
    /* leave the base ring alone so it still meets the rim cleanly */
    const edge = THREE.MathUtils.smoothstep(v.y, 0, 0.22);
    pos.setXYZ(i, v.x * (1 + (k - 1) * edge), v.y * k, v.z * (1 + (k - 1) * edge));
  }
  g.computeVertexNormals();
  g.scale(1, 0.78, 1);
  return g;
}

/* ------------------------------------------------------------------ */

type Spin = { y: number; x: number };

function Cup({ step }: { step: (dt: number) => Spin }) {
  const group = useRef<THREE.Group>(null);

  /* Loaded here rather than through `useLoader` so the texture is ours to
     configure and to dispose. */
  const bands = useMemo(() => {
    const t = new THREE.TextureLoader().load('/img/cup-bands.png');
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = THREE.RepeatWrapping;
    t.anisotropy = 4;
    return t;
  }, []);

  const shellGeo = useMemo(
    () => new THREE.LatheGeometry(profile(0, BODY_H), 72),
    []
  );
  const fillGeo = useMemo(
    () => new THREE.LatheGeometry(profile(0.03, BODY_H - 0.06), 72),
    []
  );
  const toppings = useMemo(() => buildToppings(), []);
  const moundGeo = useMemo(() => moundGeometry(), []);

  useEffect(
    () => () => {
      bands.dispose();
      shellGeo.dispose();
      fillGeo.dispose();
      moundGeo.dispose();
    },
    [bands, shellGeo, fillGeo, moundGeo]
  );

  useFrame((_, dt) => {
    const s = step(dt);
    const g = group.current;
    if (!g) return;
    g.rotation.y = s.y;
    g.rotation.x = s.x;
  });

  return (
    <group ref={group} position={[0, -1.12, 0]}>
      {/* Contents — the photo's own colour profile, revolved */}
      <mesh geometry={fillGeo}>
        <meshStandardMaterial map={bands} roughness={0.72} metalness={0} />
      </mesh>

      {/* Clear plastic cup */}
      <mesh geometry={shellGeo}>
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.22}
          roughness={0.1}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.06}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Rim, and the lid tray the toppings sit on */}
      <mesh position={[0, RIM_Y, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R_TOP, 0.028, 12, 72]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.55}
          roughness={0.12}
          clearcoat={1}
        />
      </mesh>
      <mesh position={[0, RIM_Y - 0.03, 0]}>
        <cylinderGeometry
          args={[DOME_R + 0.03, R_TOP + 0.02, 0.06, 72, 1, true]}
        />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          roughness={0.1}
          clearcoat={1}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Topping mound */}
      <group position={[0, RIM_Y - 0.14, 0]}>
        <mesh geometry={moundGeo}>
          <meshStandardMaterial color={C.mound} roughness={0.88} />
        </mesh>

        {toppings.map((t, i) => (
          <mesh key={i} position={t.pos} quaternion={t.quat} scale={t.scale}>
            {t.kind === 'berry' && <sphereGeometry args={[0.068, 16, 12]} />}
            {t.kind === 'straw' && <dodecahedronGeometry args={[0.1, 1]} />}
            {t.kind === 'banana' && (
              <cylinderGeometry args={[0.082, 0.082, 0.026, 16]} />
            )}
            {t.kind === 'coconut' && <boxGeometry args={[0.105, 0.011, 0.05]} />}
            {t.kind === 'granola' && <icosahedronGeometry args={[0.045, 0]} />}
            <meshStandardMaterial
              color={C[t.kind]}
              roughness={t.kind === 'berry' ? 0.45 : 0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */

export default function AcaiCup3D({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const spin = useRef<Spin>({ y: 0.35, x: 0.06 });
  const vel = useRef(0);
  const idle = useRef(0);
  const drag = useRef<{ id: number | null; x: number; y: number; taken: boolean }>(
    { id: null, x: 0, y: 0, taken: false }
  );
  const [live, setLive] = useState(false);
  const [grabbing, setGrabbing] = useState(false);

  const calm = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  /* Render only while the panel is on screen — a WebGL canvas spinning in a
     background tab is pure waste. */
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), {
      rootMargin: '200px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Advances the spin one frame and hands the result to the scene. Momentum
     after a throw, then a slow idle turn so the cup reads as grabbable before
     anyone touches it. */
  const step = useCallback(
    (dt: number) => {
      if (drag.current.taken) return spin.current;
      if (Math.abs(vel.current) > 0.00025) {
        spin.current.y += vel.current;
        vel.current *= 0.94;
        idle.current = 0;
        return spin.current;
      }
      vel.current = 0;
      if (!calm) {
        idle.current += dt;
        if (idle.current > 1.6) spin.current.y += dt * 0.28;
      }
      return spin.current;
    },
    [calm]
  );

  const grab = useCallback(
    (el: HTMLDivElement, id: number, x: number, y: number) => {
      el.setPointerCapture(id);
      drag.current.taken = true;
      drag.current.x = x;
      drag.current.y = y;
      setGrabbing(true);
    },
    []
  );

  const onDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (drag.current.id !== null) return;
      drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, taken: false };
      idle.current = 0;
      vel.current = 0;
      /* A mouse press is a grab outright; a touch has to prove it is sideways
         first, or the page would stop scrolling under the cup. */
      if (e.pointerType !== 'touch') {
        grab(e.currentTarget, e.pointerId, e.clientX, e.clientY);
      }
    },
    [grab]
  );

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const d = drag.current;
      if (d.id !== e.pointerId) return;

      if (!d.taken) {
        const dx = e.clientX - d.x;
        const dy = e.clientY - d.y;
        if (Math.hypot(dx, dy) < 8) return;
        if (Math.abs(dx) <= Math.abs(dy) * 1.2) {
          d.id = null; // a scroll, not a grab — let the page have it
          return;
        }
        grab(e.currentTarget, e.pointerId, e.clientX, e.clientY);
        return;
      }

      const k = 0.0095;
      const dx = e.clientX - d.x;
      const dy = e.clientY - d.y;
      spin.current.y += dx * k;
      spin.current.x = THREE.MathUtils.clamp(
        spin.current.x + dy * k * 0.5,
        -MAX_TILT,
        MAX_TILT
      );
      vel.current = dx * k;
      d.x = e.clientX;
      d.y = e.clientY;
      idle.current = 0;
    },
    [grab]
  );

  const onUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (drag.current.id !== e.pointerId) return;
    drag.current.id = null;
    drag.current.taken = false;
    setGrabbing(false);
  }, []);

  return (
    <div
      ref={host}
      className={className}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      role="img"
      aria-label="Açaí bowl with strawberry, blueberry, banana and coconut. Drag to rotate."
      style={{ touchAction: 'pan-y', cursor: grabbing ? 'grabbing' : 'grab' }}
    >
      <Canvas
        frameloop={live ? 'always' : 'never'}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0.12, 5.6], fov: 32 }}
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[3.5, 5, 4]} intensity={2.1} />
        <directionalLight position={[-4, 1.5, -2.5]} intensity={0.75} />
        <pointLight position={[0, 1.5, 3]} intensity={12} distance={14} />
        <Cup step={step} />
      </Canvas>
    </div>
  );
}
