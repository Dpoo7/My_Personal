from sketchpy import canvas
import turtle

obj = canvas.sketch_from_svg('shivaji_maharaj.svg',scale = 200)

obj.draw() 
turtle.done()