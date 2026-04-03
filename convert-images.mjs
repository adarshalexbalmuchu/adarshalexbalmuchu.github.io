import sharp from 'sharp'
import { readdirSync } from 'fs'
import { join } from 'path'

const dir = './public'
const files = readdirSync(dir).filter(f => /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(f))

for (const file of files) {
  const input = join(dir, file)
  const output = join(dir, file.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '.webp'))
  await sharp(input)
    .resize(2000, null, { withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(output)
  console.log('Converted:', file)
}
