import sharp from 'sharp'
import { readFileSync, copyFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const svg = readFileSync(resolve(root, 'public/logo.svg'))

// 512×512 app icon
await sharp(svg).resize(512, 512).png().toFile(resolve(root, 'public/logo.png'))
console.log('✓ public/logo.png (512×512)')

// 192×192 (PWA / Android)
await sharp(svg).resize(192, 192).png().toFile(resolve(root, 'public/logo-192.png'))
console.log('✓ public/logo-192.png (192×192)')

// 32×32 — used as app/icon.png (Next.js App Router favicon)
await sharp(svg).resize(32, 32).png().toFile(resolve(root, 'app/icon.png'))
console.log('✓ app/icon.png (32×32) — Next.js favicon')

// Also keep a copy in public
copyFileSync(resolve(root, 'app/icon.png'), resolve(root, 'public/favicon.png'))
console.log('✓ public/favicon.png (32×32)')
