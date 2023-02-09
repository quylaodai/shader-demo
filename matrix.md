
# scale
| scX  0    0 |   | x |   | x * scX |
| 0    scY  0 | * | y | = | y * scY |
| 0    0    1 |   | 1 |   |   1     |   

# rotation
| cos -sin  0 |   | x |   | x.cos - y.sin |
| sin  cos  0 | * | y | = | x.sin + y.cos |
| 0    0    1 |   | 1 |   |       1       |

# translation
| 1    0    tx |   | x |   | x + tx |
| 0    1    ty | * | y | = | y + ty |
| 0    0    1  |   | 1 |   |   1    |


# rotate
x' = r * cos(a + b) 
   = r * cos(a)cos(b) - r * sin(a)sin(b)
   = x * cos(b) - y * sin(b)
   = x * rotate.x - y.rotate.y

y' = r * sin(a + b) 
   = r*sin(a)cos(b) + r*cos(a)sin(b)
   = y.cos(b) + x*sin(b)
   = y.rotateX + x*rotateY