// import { createCanvas, loadImage, registerFont } from 'canvas'
// import { NextApiRequest, NextApiResponse } from 'next'
// import path from 'path'
// import fs from 'fs'
// import { getH } from '@utils/ lineSpacingAdjustment'

// const current = process.cwd()

// const createOgp = async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ): Promise<void> => {
//   const { id } = req.query
//   const WIDTH = 1200 as const
//   const HEIGHT = 630 as const
//   const font = path.resolve(
//     current,
//     'src/lib/canvas/assets/NotoSansJP-Black.otf'
//   )
//   registerFont(font, { family: 'NotoSansJP' })
//   const canvas = createCanvas(WIDTH, HEIGHT)
//   const ctx = canvas.getContext('2d')

//   ctx.font = '100px NotoSansJP'
//   ctx.fillStyle = '#FFFFFF'
//   ctx.textAlign = 'center'
//   ctx.textBaseline = 'middle'
//   // 元になる画像を読み込む
//   const src = path.resolve(current, 'src/lib/canvas/assets/blog_ogp.png')
//   const image = await loadImage(fs.readFileSync(src))

//   // 元の画像を canvas にセットする
//   ctx.drawImage(image, 0, 0, WIDTH, HEIGHT)

//   const lines = String(id).replace('\\n', '\n').split('\n')
//   const maxWidth = 1000
//   const w = WIDTH / 2
//   const sum = lines.length
//   const write = (text: string, h: number) => {
//     ctx.fillText(text, w, h, maxWidth)
//   }

//   if (sum === 0 || sum > 3) {
//     throw new Error(`Invalid lines: ${sum}`)
//   }

//   for (const [i, line] of Object.entries(lines)) {
//     const currentLineNumber = Number(i) + 1
//     const h = getH(sum, currentLineNumber)
//     write(line, h)
//   }

//   const buffer = canvas.toBuffer('image/png')

//   res.end(buffer, 'binary')
// }

// export default createOgp
