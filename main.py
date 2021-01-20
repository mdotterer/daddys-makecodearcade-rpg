@namespace
class SpriteKind:
    Snake = SpriteKind.create()

def on_on_overlap(sprite, otherSprite):
    music.pew_pew.play()
    info.change_life_by(-1)
    sprite.x += otherSprite.vx * 2
sprites.on_overlap(SpriteKind.player, SpriteKind.Snake, on_on_overlap)

def on_up_pressed():
    if len(spellCombo) > 0:
        spellCombo.append("U")
    myPlayer.set_image(img("""
        . . . . . . f f f f . . . . . . 
                . . . . f f e e e e f f . . . . 
                . . . f e e e f f e e e f . . . 
                . . f f f f f 2 2 f f f f f . . 
                . . f f e 2 e 2 2 e 2 e f f . . 
                . . f e 2 f 2 f f 2 f 2 e f . . 
                . . f f f 2 2 e e 2 2 f f f . . 
                . f f e f 2 f e e f 2 f e f f . 
                . f e e f f e e e e f e e e f . 
                . . f e e e e e e e e e e f . . 
                . . . f e e e e e e e e f . . . 
                . . e 4 f f f f f f f f 4 e . . 
                . . 4 d f 2 2 2 2 2 2 f d 4 . . 
                . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
                . . . . . f f f f f f . . . . . 
                . . . . . f f . . f f . . . . .
    """))
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_b_pressed():
    global spellCombo
    if len(spellCombo) > 0:
        if not (castSpell(spellCombo.join(""))):
            music.play_melody("D C - - - - - - ", 600)
        spellCombo = []
    else:
        myPlayer.set_velocity(0, 0)
        spellCombo = ["B"]
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_a_pressed():
    if len(spellCombo) > 0:
        spellCombo.append("A")
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_left_pressed():
    if len(spellCombo) > 0:
        spellCombo.append("L")
    myPlayer.set_image(img("""
        . . . . . f f f f f f . . . . . 
                . . . . f 2 f e e e e f f . . . 
                . . . f 2 2 2 f e e e e f f . . 
                . . . f e e e e f f e e e f . . 
                . . f e 2 2 2 2 e e f f f f . . 
                . . f 2 e f f f f 2 2 2 e f . . 
                . . f f f e e e f f f f f f f . 
                . . f e e 4 4 f b e 4 4 e f f . 
                . . f f e d d f 1 4 d 4 e e f . 
                . f d d f d d d d 4 e e e f . . 
                . f b b f e e e 4 e e f f . . . 
                . f b b e d d 4 2 2 2 f . . . . 
                . . f b e d d e 2 2 2 e . . . . 
                . . . f f e e f 4 4 4 f . . . . 
                . . . . . f f f f f f . . . . . 
                . . . . . . . f f f . . . . . .
    """))
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_right_pressed():
    if len(spellCombo) > 0:
        spellCombo.append("R")
    myPlayer.set_image(img("""
        . . . . . . . . . . . . . . . . 
                . . . . . f f f f f f . . . . . 
                . . . f f e e e e f 2 f . . . . 
                . . f f e e e e f 2 2 2 f . . . 
                . . f e e e f f e e e e f . . . 
                . . f f f f e e 2 2 2 2 e f . . 
                . . f e 2 2 2 f f f f e 2 f . . 
                . f f f f f f f e e e f f f . . 
                . f f e 4 4 e b f 4 4 e e f . . 
                . f e e 4 d 4 1 f d d e f f . . 
                . . f e e e 4 d d d d f d d f . 
                . . . . f e e 4 e e e f b b f . 
                . . . . f 2 2 2 4 d d e b b f . 
                . . . f f 4 4 4 e d d e b f . . 
                . . . f f f f f f e e f f . . . 
                . . . . f f . . . f f f . . . .
    """))
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def spawnSnake(x: number, y: number):
    global newSnake
    newSnake = sprites.create(img("""
            . . . . c c c c c c . . . . . . 
                    . . . c 6 7 7 7 7 6 c . . . . . 
                    . . c 7 7 7 7 7 7 7 7 c . . . . 
                    . c 6 7 7 7 7 7 7 7 7 6 c . . . 
                    . c 7 c 6 6 6 6 c 7 7 7 c . . . 
                    . f 7 6 f 6 6 f 6 7 7 7 f . . . 
                    . f 7 7 7 7 7 7 7 7 7 7 f . . . 
                    . . f 7 7 7 7 6 c 7 7 6 f c . . 
                    . . . f c c c c 7 7 6 f 7 7 c . 
                    . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
                    . c 7 7 2 7 7 c f c 6 7 7 6 c c 
                    c 1 1 1 1 7 6 f c c 6 6 6 c . . 
                    f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
                    f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
                    . f 6 1 1 1 1 1 1 6 6 6 f . . . 
                    . . c c c c c c c c c f . . . .
        """),
        SpriteKind.Snake)
    newSnake.set_position(x, y)
    newSnake.set_velocity(50, 0)
    baddies.unshift(newSnake)

def on_on_overlap2(sprite, otherSprite):
    otherSprite.destroy(effects.disintegrate, 100)
    sprite.destroy()
sprites.on_overlap(SpriteKind.projectile, SpriteKind.Snake, on_on_overlap2)

def on_down_pressed():
    if len(spellCombo) > 0:
        spellCombo.append("D")
    myPlayer.set_image(img("""
        . . . . . . f f f f . . . . . . 
                . . . . f f f 2 2 f f f . . . . 
                . . . f f f 2 2 2 2 f f f . . . 
                . . f f f e e e e e e f f f . . 
                . . f f e 2 2 2 2 2 2 e e f . . 
                . . f e 2 f f f f f f 2 e f . . 
                . . f f f f e e e e f f f f . . 
                . f f e f b f 4 4 f b f e f f . 
                . f e e 4 1 f d d f 1 4 e e f . 
                . . f f f f d d d d d e e f . . 
                . f d d d d f 4 4 4 e e f . . . 
                . f b b b b f 2 2 2 2 f 4 e . . 
                . f b b b b f 2 2 2 2 f d 4 . . 
                . . f c c f 4 5 5 4 4 f 4 4 . . 
                . . . f f f f f f f f . . . . . 
                . . . . . f f . . f f . . . . .
    """))
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def castSpell(combo: str):
    if manaBar.value >= 20 and combo == "BAAA" and info.life() < maxHealth:
        info.change_life_by(1)
        music.magic_wand.play()
        manaBar.value += -20
        return True
    if manaBar.value >= 3 and (combo == "BR" or combo == "BU" or combo == "BL" or combo == "BD"):
        sprites.create_projectile_from_sprite(missileSprite(combo[1]),
            myPlayer,
            missileDx(combo[1]) * 200,
            missileDy(combo[1]) * 200)
        manaBar.value += -3
        return True
    return False
snakes: List[Sprite] = []
newSnake: Sprite = None
baddies: List[Sprite] = []
maxHealth = 0
manaBar: StatusBarSprite = None
myPlayer: Sprite = None
spellCombo: List[str] = []
def missileDx(direction: any):
    if direction == "R":
        return 1
    if direction == "L":
        return -1
    return 0
def missileDy(direction: any):
    if direction == "U":
        return -1
    if direction == "D":
        return 1
    return 0
def missileSprite(direction: any):
    if direction == "R":
        return img("""
            . . . . . . a .
                                                . . . . 6 9 8 a
                                                6 . 6 9 9 8 8 a
                                                . . . . 6 9 8 a
                                                . . . . . . a .
        """)
    if direction == "L":
        return img("""
            . a . . . . . .
                                                                                                                    a 8 9 6 . . . .
                                                                                                                    a 8 8 9 9 6 . 6
                                                                                                                    a 8 9 6 . . . .
                                                                                                                    . a . . . . . .
        """)
    if direction == "U":
        return img("""
            . a a a .
                                                    a 8 8 8 a
                                                    . 9 8 9 .
                                                    . 6 9 6 .
                                                    . . 9 . .
                                                    . . 6 . .
                                                    . . . . .
                                                    . . 6 . .
        """)
    if direction == "D":
        return img("""
            . . 6 . .
                                                                                                                    . . . . .
                                                                                                                    . . 6 . .
                                                                                                                    . . 9 . .
                                                                                                                    . 6 9 6 .
                                                                                                                    . 9 8 9 .
                                                                                                                    a 8 8 8 a
                                                                                                                    . a a a .
        """)
    return img("""
        2 . . . 2
                                . 2 . 2 .
                                . . 2 . .
                                . 2 . 2 .
                                2 . . . 2
    """)
manaBar = statusbars.create(30, 6, StatusBarKind.magic)
manaBar.set_position(15, 15)
manaBar.value = 20
manaBar.max = 20
manaBar.set_color(10, 15)
maxHealth = 3
info.set_life(maxHealth)
myPlayer = sprites.create(img("""
        . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f f f f d d d d d e e f . . 
            . f d d d d f 4 4 4 e e f . . . 
            . f b b b b f 2 2 2 2 f 4 e . . 
            . f b b b b f 2 2 2 2 f d 4 . . 
            . . f c c f 4 5 5 4 4 f 4 4 . . 
            . . . f f f f f f f f . . . . . 
            . . . . . f f . . f f . . . . .
    """),
    SpriteKind.player)
controller.move_sprite(myPlayer, 100, 100)
scene.camera_follow_sprite(myPlayer)
scene.set_background_color(7)
tiles.set_tilemap(tiles.create_tilemap(hex("""
            1000100001010101010101010101010101010101010302030203020302030203020302010102030203020302030203020202030101030203020302030203020302030201010203020302020203020302030302010103020302030203020202030203020101020302030203020302030202020301010302030203020302030203020302010102030203020302030203020302030101030203020302030202020302030201010203020302030203020302030203010103020302030203020302030203020101020302030203020302030203020301010302030203020302030203020302010102030203020302030203020302030101010101010101010101010101010101
        """),
        img("""
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
                2 . . . . . . . . . . . . . . 2 
                2 . . . . . . . . . . . . . . 2 
                2 . . . . . . . . . . . . . . 2 
                2 . . . . . . . . . . . . . . 2 
                2 . . . . . . . . . . . . . . 2 
                2 . . . . . . . . . . . . . . 2 
                2 . . . . . . . . . . . . . . 2 
                2 . . . . . . . . . . . . . . 2 
                2 . . . . . . . . . . . . . . 2 
                2 . . . . . . . . . . . . . . 2 
                2 . . . . . . . . . . . . . . 2 
                2 . . . . . . . . . . . . . . 2 
                2 . . . . . . . . . . . . . . 2 
                2 . . . . . . . . . . . . . . 2 
                2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
        """),
        [myTiles.transparency16,
            sprites.builtin.forest_tiles0,
            sprites.castle.tile_grass1,
            sprites.castle.tile_grass3],
        TileScale.SIXTEEN))
baddies = []
spawnSnake(100, 100)
spawnSnake(150, 200)

def on_on_update():
    global snakes
    snakes = sprites.all_of_kind(SpriteKind.Snake)
    for aSnake in snakes:
        direction = aSnake.vx / abs(aSnake.vx)
        aSnake.set_velocity(aSnake.vx - direction, 0)
        if aSnake.vx == 0:
            aSnake.set_velocity((0 - direction) * 50, 0)
game.on_update(on_on_update)
