const Image = require('pngjs-image')

const height = 600
const width = 600
const image = Image.createImage(height, width)

const isInMandelbrotSet = (x, y) => {
  let [r, i] = [x, y]

  for (let j = 0; j < 100; j++) {
    ;[r, i] = [(r ** 2 - i ** 2 + x), (2 * r * i + y)]
  }

  return (r * i < 5)
}

const zoom = 200
let panX = 2
let panY = 1.5

for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    if (isInMandelbrotSet(x / zoom - panX, y / zoom - panY)) {
      image.setPixel(x, y, { red: 0, green: 0, blue: 0, alpha: 255 })
    } else {
      image.setPixel(x, y, { red: 255, green: 255, blue: 255, alpha: 255 })
    }
  }
}

image.writeImage('./mandelbrot.png', (err) => {
  if (err) throw (err)
  console.log('Sucessfully create mandelbrot.png')
})
