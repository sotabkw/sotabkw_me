'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useRef, useSyncExternalStore } from 'react'
import * as THREE from 'three'

const emptySubscribe = () => () => {}
const getTrue = () => true
const getFalse = () => false

// ─── Background Shader (0xjj.dev style gentle flowing gradient) ──────────────

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec3 uBase;
  uniform float uWaveStrength;
  uniform vec3 uResolution;
  uniform vec2 uMouse;
  uniform float uMouseIntensity;
  uniform float uSpeed;

  varying vec2 vUv;

  void main() {
    float mr = min(uResolution.x, uResolution.y);
    vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;
    vec2 mouseUv = (uMouse * 2.0 - 1.0) * uResolution.xy / mr;

    // Soft bulge warp around cursor
    vec2 diff = uv - mouseUv;
    float dist = length(diff);
    float warp = exp(-dist * dist * 1.5) * uMouseIntensity * 0.35;
    uv += diff * warp;

    float d = -uTime * 0.5 * uSpeed;
    float a = 0.0;
    for (float i = 0.0; i < 8.0; ++i) {
      a += cos(i - d - a * uv.x);
      d += sin(uv.y * i + a);
    }
    d += uTime * 0.5 * uSpeed;
    vec3 wave = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
    wave = cos(wave * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);

    // Mix base color with wave pattern by strength
    vec3 col = mix(uBase, wave, uWaveStrength);
    gl_FragColor = vec4(col, 1.0);
  }
`

function GradientMesh({ mouseRef }: { mouseRef: MouseRef }) {
  const { resolvedTheme } = useTheme()
  const { size } = useThree()
  const mounted = useSyncExternalStore(emptySubscribe, getTrue, getFalse)
  const smoothMouse = useRef(new THREE.Vector2(0.5, 0.5))

  const targetBase = useRef(new THREE.Vector3(0.04, 0.04, 0.06))
  const targetStrength = useRef(0.15)

  const smoothIntensity = useRef(0)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBase: { value: new THREE.Vector3(0.04, 0.04, 0.06) },
      uWaveStrength: { value: 0.15 },
      uResolution: { value: new THREE.Vector3(size.width, size.height, Math.min(size.width, size.height)) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseIntensity: { value: 0 },
      uSpeed: { value: 0.4 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (!mounted) return
    if (resolvedTheme === 'dark') {
      // Near-black base + subtle wave
      targetBase.current.set(0.04, 0.04, 0.06)
      targetStrength.current = 0.15
    } else {
      // White base + faint wave
      targetBase.current.set(0.96, 0.96, 0.97)
      targetStrength.current = 0.08
    }
  }, [resolvedTheme, mounted])

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height, Math.min(size.width, size.height))
  }, [size, uniforms])

  useFrame((_, delta) => {
    uniforms.uTime.value += delta

    // Smooth base color lerp
    const b = uniforms.uBase.value
    const tb = targetBase.current
    b.x += (tb.x - b.x) * 0.03
    b.y += (tb.y - b.y) * 0.03
    b.z += (tb.z - b.z) * 0.03

    // Smooth wave strength lerp
    uniforms.uWaveStrength.value += (targetStrength.current - uniforms.uWaveStrength.value) * 0.03

    // Smooth mouse position
    const mouse = mouseRef.current
    if (mouse) {
      smoothMouse.current.x += (mouse.x - smoothMouse.current.x) * 0.03
      smoothMouse.current.y += (mouse.y - smoothMouse.current.y) * 0.03
      uniforms.uMouse.value.copy(smoothMouse.current)

      const target = mouse.active ? 1 : 0
      smoothIntensity.current += (target - smoothIntensity.current) * 0.04
      uniforms.uMouseIntensity.value = smoothIntensity.current
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

// ─── Jellyfish Cursor ────────────────────────────────────────────────────────

const jellyfishVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const jellyfishFragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform float uAlpha;
  uniform float uSaturation;
  uniform float uHueSpeed;

  varying vec2 vUv;

  // Simple noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
           + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float t = uTime * 0.8;

    // Dome shape: upper half is wider, lower tapers
    float dome = uv.y * 0.3 + 0.1;
    vec2 shaped = vec2(uv.x / (1.0 + dome), uv.y);
    float dist = length(shaped);

    // Organic wobble with noise
    float wobble = snoise(uv * 2.0 + t) * 0.08;
    dist += wobble;

    // Breathing pulse
    float pulse = sin(t * 1.2) * 0.04 + 1.0;
    dist *= pulse;

    // Soft glow falloff
    float body = 1.0 - smoothstep(0.0, 0.6, dist);
    body = pow(body, 1.8);

    // Iridescent color shift (speed controlled by theme)
    float hueShift = t * uHueSpeed + dist * 2.0;
    vec3 col = vec3(
      sin(hueShift) * 0.5 + 0.5,
      sin(hueShift + 2.094) * 0.5 + 0.5,
      sin(hueShift + 4.189) * 0.5 + 0.5
    );
    // Saturation controlled by theme (light=vivid, dark=pastel)
    col = mix(vec3(1.0), col, uSaturation);

    // Inner glow (brighter center)
    float inner = exp(-dist * dist * 8.0) * 0.3;
    col += inner;

    float alpha = body * uAlpha;
    gl_FragColor = vec4(col, alpha);
  }
`

// Trail points shader
const trailVertexShader = `
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3 aColor;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    vAlpha = aAlpha;
    vColor = aColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (50.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const trailFragmentShader = `
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float strength = 1.0 - smoothstep(0.0, 0.5, dist);
    strength = pow(strength, 1.5);
    gl_FragColor = vec4(vColor, strength * vAlpha);
  }
`

const TRAIL_COUNT = 40

type MouseState = { x: number; y: number; active: boolean; moving: boolean; clickBurst: number }
type MouseRef = React.RefObject<MouseState | null>

function JellyfishCursor({ mouseRef }: { mouseRef: MouseRef }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { resolvedTheme } = useTheme()
  const { viewport } = useThree()
  const smoothPos = useRef(new THREE.Vector2(0, 0))
  const smoothAlpha = useRef(0)
  const smoothScale = useRef(1)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAlpha: { value: 0 },
      uSaturation: { value: 0.5 },
      uHueSpeed: { value: 0.3 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/immutability
    []
  )

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      uniforms.uSaturation.value = 0.5
      uniforms.uHueSpeed.value = 0.3
    } else {
      uniforms.uSaturation.value = 0.9
      uniforms.uHueSpeed.value = 0.8
    }
  }, [resolvedTheme, uniforms])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    uniforms.uTime.value += delta

    const mouse = mouseRef.current
    const targetX = mouse ? (mouse.x - 0.5) * viewport.width : 0
    const targetY = mouse ? (mouse.y - 0.5) * viewport.height : 0

    // Only show when moving or click burst
    const isVisible = mouse && (mouse.moving || mouse.clickBurst > 0)
    const targetAlpha = isVisible ? 0.4 : 0

    // Click burst: scale up and extra alpha
    const clickScale = 1 + (mouse?.clickBurst || 0) * 0.6
    const targetScale = isVisible ? clickScale : 1

    // Decay click burst
    if (mouse && mouse.clickBurst > 0) {
      mouse.clickBurst *= 0.92
      if (mouse.clickBurst < 0.01) mouse.clickBurst = 0
    }

    // Smooth follow with slight lag (jellyfish float)
    smoothPos.current.x += (targetX - smoothPos.current.x) * 0.06
    smoothPos.current.y += (targetY - smoothPos.current.y) * 0.06
    smoothAlpha.current += (targetAlpha - smoothAlpha.current) * 0.08
    smoothScale.current += (targetScale - smoothScale.current) * 0.1

    meshRef.current.position.set(smoothPos.current.x, smoothPos.current.y, 0)
    meshRef.current.scale.setScalar(smoothScale.current)
    uniforms.uAlpha.value = smoothAlpha.current
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1.2, 1.2]} />
      <shaderMaterial
        vertexShader={jellyfishVertexShader}
        fragmentShader={jellyfishFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

function JellyfishTrail({ mouseRef }: { mouseRef: MouseRef }) {
  const pointsRef = useRef<THREE.Points>(null)
  const { resolvedTheme } = useTheme()
  const { viewport } = useThree()
  const trailIndex = useRef(0)
  const prevPos = useRef(new THREE.Vector2(0, 0))
  const smoothPos = useRef(new THREE.Vector2(0, 0))
  const lastClickBurst = useRef(0)
  const isDark = useRef(true)

  useEffect(() => {
    isDark.current = resolvedTheme === 'dark'
  }, [resolvedTheme])

  const { positions, sizes, alphas, colors } = useMemo(() => {
    const pos = new Float32Array(TRAIL_COUNT * 3)
    const sz = new Float32Array(TRAIL_COUNT)
    const al = new Float32Array(TRAIL_COUNT)
    const col = new Float32Array(TRAIL_COUNT * 3)
    return { positions: pos, sizes: sz, alphas: al, colors: col }
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return

    const mouse = mouseRef.current
    const geo = pointsRef.current.geometry
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute
    const sizeAttr = geo.getAttribute('aSize') as THREE.BufferAttribute
    const alphaAttr = geo.getAttribute('aAlpha') as THREE.BufferAttribute
    const colorAttr = geo.getAttribute('aColor') as THREE.BufferAttribute

    // Always fade/drift existing particles
    for (let i = 0; i < TRAIL_COUNT; i++) {
      alphaAttr.setX(i, alphaAttr.getX(i) * 0.95)
      sizeAttr.setX(i, sizeAttr.getX(i) * 0.98)
      posAttr.setY(i, posAttr.getY(i) - delta * 0.18)
      const sway = Math.sin(performance.now() * 0.002 + i * 0.5) * delta * 0.03
      posAttr.setX(i, posAttr.getX(i) + sway)
    }

    if (!mouse || !mouse.active) {
      posAttr.needsUpdate = true
      sizeAttr.needsUpdate = true
      alphaAttr.needsUpdate = true
      return
    }

    const targetX = (mouse.x - 0.5) * viewport.width
    const targetY = (mouse.y - 0.5) * viewport.height
    smoothPos.current.x += (targetX - smoothPos.current.x) * 0.06
    smoothPos.current.y += (targetY - smoothPos.current.y) * 0.06

    // Click burst: spawn a ring of colorful particles
    if (mouse.clickBurst > 0.9 && lastClickBurst.current < 0.5) {
      const burstCount = 10
      for (let j = 0; j < burstCount; j++) {
        const angle = (j / burstCount) * Math.PI * 2
        const idx = trailIndex.current % TRAIL_COUNT
        const radius = 0.25
        posAttr.setXYZ(
          idx,
          smoothPos.current.x + Math.cos(angle) * radius,
          smoothPos.current.y + Math.sin(angle) * radius,
          0
        )
        sizeAttr.setX(idx, isDark.current ? 3.5 : 4.5)
        alphaAttr.setX(idx, isDark.current ? 0.5 : 0.7)
        // Rainbow ring: each particle gets a different hue
        const hue = (j / burstCount) * Math.PI * 2
        const sat = isDark.current ? 0.3 : 0.5
        colorAttr.setXYZ(idx,
          Math.sin(hue) * sat + (1 - sat),
          Math.sin(hue + 2.094) * sat + (1 - sat),
          Math.sin(hue + 4.189) * sat + (1 - sat)
        )
        trailIndex.current++
      }
    }
    lastClickBurst.current = mouse.clickBurst

    // Only spawn trail particles when mouse is moving
    if (mouse.moving) {
      const dx = smoothPos.current.x - prevPos.current.x
      const dy = smoothPos.current.y - prevPos.current.y
      const moved = Math.sqrt(dx * dx + dy * dy) > 0.005

      if (moved) {
        const idx = trailIndex.current % TRAIL_COUNT
        posAttr.setXYZ(idx, smoothPos.current.x, smoothPos.current.y - 0.15, 0)
        sizeAttr.setX(idx, isDark.current ? 2.5 : 3.0)
        alphaAttr.setX(idx, isDark.current ? 0.35 : 0.5)

        // Cycling colors: more vivid in light mode
        const time = performance.now() * 0.001
        const speed = isDark.current ? 0.4 : 1.0
        const sat = isDark.current ? 0.3 : 0.45
        const hue = time * speed + trailIndex.current * 0.3
        colorAttr.setXYZ(idx,
          Math.sin(hue) * sat + (1 - sat),
          Math.sin(hue + 2.094) * sat + (1 - sat),
          Math.sin(hue + 4.189) * sat + (1 - sat)
        )

        trailIndex.current++
        prevPos.current.set(smoothPos.current.x, smoothPos.current.y)
      }
    }

    posAttr.needsUpdate = true
    sizeAttr.needsUpdate = true
    alphaAttr.needsUpdate = true
    colorAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aAlpha" args={[alphas, 1]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={trailVertexShader}
        fragmentShader={trailFragmentShader}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function GradientBackground() {
  const mounted = useSyncExternalStore(emptySubscribe, getTrue, getFalse)
  const mouseRef = useRef<MouseState>({ x: 0.5, y: 0.5, active: false, moving: false, clickBurst: 0 })
  const lastMoveTime = useRef(0)

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth
      mouseRef.current.y = 1 - e.clientY / window.innerHeight
      mouseRef.current.active = true
      mouseRef.current.moving = true
      lastMoveTime.current = performance.now()
    }
    const handleLeave = () => {
      mouseRef.current.active = false
      mouseRef.current.moving = false
    }
    const handleClick = () => {
      mouseRef.current.clickBurst = 1
    }
    const checkIdle = setInterval(() => {
      if (performance.now() - lastMoveTime.current > 150) {
        mouseRef.current.moving = false
      }
    }, 50)
    window.addEventListener('pointermove', handleMove)
    document.addEventListener('pointerleave', handleLeave)
    window.addEventListener('pointerdown', handleClick)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerleave', handleLeave)
      window.removeEventListener('pointerdown', handleClick)
      clearInterval(checkIdle)
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        dpr={[1, typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 1.5 : 2]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5] }}
      >
        <GradientMesh mouseRef={mouseRef} />
        <JellyfishCursor mouseRef={mouseRef} />
        <JellyfishTrail mouseRef={mouseRef} />
      </Canvas>
    </div>
  )
}
