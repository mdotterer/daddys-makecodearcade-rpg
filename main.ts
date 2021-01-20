namespace SpriteKind {
    export const Snake = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Snake, function (sprite, otherSprite) {
    music.pewPew.play()
    info.changeLifeBy(-1)
    sprite.x += otherSprite.vx * 2
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (spellCombo.length > 0) {
        spellCombo.push("U")
    }
    myPlayer.setImage(img`
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
        `)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (spellCombo.length > 0) {
        if (!(castSpell(spellCombo.join("")))) {
            if (manaBar.value > 0) {
                manaBar.value += -1
                myPlayer.startEffect(effects.rings, 500)
            }
            music.playMelody("D C - - - - - - ", 600)
        }
        spellCombo = []
    } else {
        myPlayer.setVelocity(0, 0)
        spellCombo = ["B"]
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (spellCombo.length > 0) {
        spellCombo.push("A")
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (spellCombo.length > 0) {
        spellCombo.push("L")
    }
    myPlayer.setImage(img`
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
        `)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (spellCombo.length > 0) {
        spellCombo.push("R")
    }
    myPlayer.setImage(img`
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
        `)
})
function spawnSnake (x: number, y: number) {
    newSnake = sprites.create(img`
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
        `, SpriteKind.Snake)
    newSnake.setPosition(x, y)
    newSnake.setVelocity(50, 0)
    baddies.unshift(newSnake)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Snake, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 100)
    sprite.destroy()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (spellCombo.length > 0) {
        spellCombo.push("D")
    }
    myPlayer.setImage(img`
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
        `)
})
function castSpell (combo: string) {
    if (manaBar.value >= 20 && combo == "BAAA" && info.life() < maxHealth) {
        info.changeLifeBy(1)
        music.magicWand.play()
        manaBar.value += -20
        return true
    }
    if (manaBar.value >= 3 && (combo == "BR" || combo == "BU" || combo == "BL" || combo == "BD")) {
        sprites.createProjectileFromSprite(missileSprite(combo[1]), myPlayer, missileDx(combo[1]) * 200, missileDy(combo[1]) * 200)
manaBar.value += -3
        return true
    }
    return false
}
let snakes: Sprite[] = []
let newSnake: Sprite = null
let baddies: Sprite[] = []
let maxHealth = 0
let manaBar: StatusBarSprite = null
let spellCombo : string[] = []
let myPlayer : Sprite = null
function missileDx(direction: any): number {
    if (direction == "R") {
        return 1
    }
    
    if (direction == "L") {
        return -1
    }
    
    return 0
}
function missileDy(direction: any): number {
    if (direction == "U") {
        return -1
    }
    
    if (direction == "D") {
        return 1
    }
    
    return 0
}
function missileSprite(direction: any): Image {
    if (direction == "R") {
        return img`
            . . . . . . a .
                                                . . . . 6 9 8 a
                                                6 . 6 9 9 8 8 a
                                                . . . . 6 9 8 a
                                                . . . . . . a .
        `
    }
    
    if (direction == "L") {
        return img`
            . a . . . . . .
                                                                                                                    a 8 9 6 . . . .
                                                                                                                    a 8 8 9 9 6 . 6
                                                                                                                    a 8 9 6 . . . .
                                                                                                                    . a . . . . . .
        `
    }
    
    if (direction == "U") {
        return img`
            . a a a .
                                                    a 8 8 8 a
                                                    . 9 8 9 .
                                                    . 6 9 6 .
                                                    . . 9 . .
                                                    . . 6 . .
                                                    . . . . .
                                                    . . 6 . .
        `
    }
    
    if (direction == "D") {
        return img`
            . . 6 . .
                                                                                                                    . . . . .
                                                                                                                    . . 6 . .
                                                                                                                    . . 9 . .
                                                                                                                    . 6 9 6 .
                                                                                                                    . 9 8 9 .
                                                                                                                    a 8 8 8 a
                                                                                                                    . a a a .
        `
    }
    
    return img`
        2 . . . 2
                                . 2 . 2 .
                                . . 2 . .
                                . 2 . 2 .
                                2 . . . 2
    `
}
manaBar = statusbars.create(30, 6, StatusBarKind.Magic)
manaBar.setPosition(15, 15)
manaBar.value = 20
manaBar.max = 20
manaBar.setColor(10, 15)
maxHealth = 3
info.setLife(maxHealth)
myPlayer = sprites.create(img`
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
    `, SpriteKind.Player)
controller.moveSprite(myPlayer, 100, 100)
scene.cameraFollowSprite(myPlayer)
scene.setBackgroundColor(7)
tiles.setTilemap(tiles.createTilemap(hex`1000100001010101010101010101010101010101010302030203020302030203020302010102030203020302030203020202030101030203020302030203020302030201010203020302020203020302030302010103020302030203020202030203020101020302030203020302030202020301010302030203020302030203020302010102030203020302030203020302030101030203020302030202020302030201010203020302030203020302030203010103020302030203020302030203020101020302030203020302030203020301010302030203020302030203020302010102030203020302030203020302030101010101010101010101010101010101`, img`
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
    `, [myTiles.transparency16,sprites.builtin.forestTiles0,sprites.castle.tileGrass1,sprites.castle.tileGrass3], TileScale.Sixteen))
baddies = []
spawnSnake(100, 100)
spawnSnake(150, 200)
game.onUpdate(function () {
    let direction: number;
snakes = sprites.allOfKind(SpriteKind.Snake)
    for (let aSnake of snakes) {
        direction = aSnake.vx / Math.abs(aSnake.vx)
        aSnake.setVelocity(aSnake.vx - direction, 0)
        if (aSnake.vx == 0) {
            aSnake.setVelocity((0 - direction) * 50, 0)
        }
    }
})
