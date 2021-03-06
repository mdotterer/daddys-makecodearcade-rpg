namespace SpriteKind {
    export const Snake = SpriteKind.create()
}
namespace ConnectionKind {
    export const EW0 = ConnectionKind.create()
    export const EW1 = ConnectionKind.create()
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
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (controller.right.isPressed() && tiles.tileIs(tiles.locationInDirection(tiles.locationOfSprite(sprite), CollisionDirection.Right), assets.tile`transparency16`)) {
        if (sceneX % 2 == 0) {
            tiles.loadConnectedMap(ConnectionKind.EW1)
        } else {
            tiles.loadConnectedMap(ConnectionKind.EW0)
        }
        sprite.x = 8
    } else {
        if (controller.left.isPressed() && tiles.tileIs(tiles.locationInDirection(tiles.locationOfSprite(sprite), CollisionDirection.Left), assets.tile`transparency16`)) {
            if (sceneX % 2 == 0) {
                tiles.loadConnectedMap(ConnectionKind.EW0)
            } else {
                tiles.loadConnectedMap(ConnectionKind.EW1)
            }
            sprite.x = 16 * tiles.tilemapColumns() - 8
        }
    }
})
function missileDy (direction: string) {
    if (direction == "U") {
        return -1
    }
    if (direction == "D") {
        return 1
    }
    return 0
}
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
function missileDx (direction: string) {
    if (direction == "R") {
        return 1
    }
    if (direction == "L") {
        return -1
    }
    return 0
}
function missileSprite (direction: string) {
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
function getScene (newSceneName: string) {
    if (newSceneName == "scene01") {
        return scene01
    }
    if (newSceneName == "scene02") {
        return scene02
    }
    if (newSceneName == "scene03") {
        return scene03
    }
    return scene01
}
tiles.onMapLoaded(function (tilemap2) {
    if (tilemap2 == scene01) {
        sceneName = "scene01"
        sceneX = 0
        scene.setBackgroundColor(7)
        spawnSnake(100, 100)
        spawnSnake(150, 200)
    }
    if (tilemap2 == scene02) {
        sceneName = "scene02"
        sceneX = 1
        scene.setBackgroundColor(7)
    }
    if (tilemap2 == scene03) {
        sceneName = "scene03"
        sceneX = -1
        scene.setBackgroundColor(7)
    }
    saveGame()
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
tiles.onMapUnloaded(function (tilemap2) {
    tiles.destroySpritesOfKind(SpriteKind.Snake)
})
function spawnSnake (x: number, y: number) {
    newSnake = sprites.create(img`
        . . . . . . c c c c c c . . . . 
        . . . . . c 6 7 7 7 7 6 c . . . 
        . . . . c 7 7 7 7 7 7 7 7 c . . 
        . . . c 6 7 7 7 7 7 7 7 7 6 c . 
        . . . c 7 7 7 c 6 6 6 6 c 7 c . 
        . . . f 7 7 7 6 f 6 6 f 6 7 f . 
        . . . f 7 7 7 7 7 7 7 7 7 7 f . 
        . . c f 6 7 7 c 6 7 7 7 7 f . . 
        . c 7 7 f 6 7 7 c c c c f . . . 
        c 7 7 7 7 f c 6 7 7 7 2 7 c . . 
        c c 6 7 7 6 c f c 7 7 2 7 7 c . 
        . . c 6 6 6 c c f 6 7 1 1 1 1 c 
        . . f 6 6 6 6 c 6 6 1 1 1 1 1 f 
        . . f c 6 6 6 6 6 1 1 1 1 1 6 f 
        . . . f 6 6 6 1 1 1 1 1 1 6 f . 
        . . . . f c c c c c c c c c . . 
        `, SpriteKind.Snake)
    newSnake.setPosition(x, y)
    newSnake.setVelocity(50, 0)
    sprites.setDataBoolean(newSnake, "spottedPlayer", false)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Snake, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 20)
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
function saveGame () {
    blockSettings.writeNumber("drpg:life", info.life())
    blockSettings.writeNumber("drpg:mana", manaBar.value)
    blockSettings.writeString("drpg:scene", sceneName)
    blockSettings.writeNumber("drpg:x", myPlayer.x)
    blockSettings.writeNumber("drpg:y", myPlayer.y)
    blockSettings.writeNumber("drpg:gameSaved", 1)
}
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
let dy = 0
let dx = 0
let snakes: Sprite[] = []
let newSnake: Sprite = null
let sceneName = ""
let sceneX = 0
let maxHealth = 0
let manaBar: StatusBarSprite = null
let scene03: tiles.WorldMap = null
let scene02: tiles.WorldMap = null
let scene01: tiles.WorldMap = null
let myPlayer : Sprite = null
let spellCombo : string[] = []
if (blockSettings.exists("drpg:gameSaved") && !(game.ask("Welcome to Daddy's RPG", "Continue?"))) {
    blockSettings.clear()
}
manaBar = statusbars.create(30, 6, StatusBarKind.Magic)
manaBar.setPosition(15, 15)
manaBar.max = 20
manaBar.setColor(10, 15)
maxHealth = 3
scene01 = tiles.createMap(tilemap`level3`)
scene02 = tiles.createMap(tilemap`level4`)
scene03 = tiles.createMap(tilemap`level2`)
tiles.connectMapById(scene01, scene02, ConnectionKind.EW1)
tiles.connectMapById(scene01, scene03, ConnectionKind.EW0)
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
if (blockSettings.exists("drpg:gameSaved")) {
    manaBar.value = blockSettings.readNumber("drpg:mana")
    info.setLife(blockSettings.readNumber("drpg:life"))
    tiles.loadMap(getScene(blockSettings.readString("drpg:scene")))
    myPlayer.setPosition(blockSettings.readNumber("drpg:x"), blockSettings.readNumber("drpg:y"))
} else {
    manaBar.value = manaBar.max
    info.setLife(maxHealth)
    tiles.loadMap(scene01)
}
game.onUpdate(function () {
    let direction: number;
snakes = sprites.allOfKind(SpriteKind.Snake)
    for (let aSnake of snakes) {
        dx = myPlayer.x - aSnake.x
        dy = myPlayer.y - aSnake.y
        if (!(sprites.readDataBoolean(aSnake, "spottedPlayer"))) {
            direction = aSnake.vx / Math.abs(aSnake.vx)
            if (dx / Math.abs(dx) == direction && Math.abs(dy / dx) < 0.667 && dy ** 2 + dx ** 2 < 7000) {
                sprites.setDataBoolean(aSnake, "spottedPlayer", true)
                aSnake.follow(myPlayer, 40)
                aSnake.setImage(img`
                    . . . . . c c c c c c c . . . . 
                    . . . . c 6 7 7 7 7 7 6 c . . . 
                    . . . c 7 c 6 6 6 6 c 7 6 c . . 
                    . . c 6 7 6 2 6 6 2 6 7 7 c . . 
                    . . c 7 7 7 7 7 7 7 7 7 7 c . . 
                    . . f 7 8 1 f f 1 6 7 7 7 f . . 
                    . . f 6 f 1 f f 1 f 7 7 7 f . . 
                    . . . f f 2 2 2 2 f 7 7 6 f . . 
                    . . c c f 2 2 2 2 7 7 6 f c . . 
                    . c 7 7 7 7 7 7 7 7 c c 7 7 c . 
                    c 7 1 1 1 7 7 7 7 f c 6 7 7 7 c 
                    f 1 1 1 1 1 7 6 f c c 6 6 6 c c 
                    f 1 1 1 1 1 1 6 6 c 6 6 6 c . . 
                    f 6 1 1 1 1 1 6 6 6 6 6 6 c . . 
                    . f 6 1 1 1 1 1 6 6 6 6 c . . . 
                    . . f f c c c c c c c c . . . . 
                    `)
                if (dx > 0) {
                    aSnake.image.flipX()
                }
            } else {
                aSnake.setVelocity(aSnake.vx - direction, 0)
                if (aSnake.vx == 0) {
                    aSnake.setVelocity((0 - direction) * 50, 0)
                    aSnake.image.flipX()
                }
            }
        } else {
            aSnake.setImage(img`
                . . . . . c c c c c c c . . . . 
                . . . . c 6 7 7 7 7 7 6 c . . . 
                . . . c 7 c 6 6 6 6 c 7 6 c . . 
                . . c 6 7 6 2 6 6 2 6 7 7 c . . 
                . . c 7 7 7 7 7 7 7 7 7 7 c . . 
                . . f 7 8 1 f f 1 6 7 7 7 f . . 
                . . f 6 f 1 f f 1 f 7 7 7 f . . 
                . . . f f 2 2 2 2 f 7 7 6 f . . 
                . . c c f 2 2 2 2 7 7 6 f c . . 
                . c 7 7 7 7 7 7 7 7 c c 7 7 c . 
                c 7 1 1 1 7 7 7 7 f c 6 7 7 7 c 
                f 1 1 1 1 1 7 6 f c c 6 6 6 c c 
                f 1 1 1 1 1 1 6 6 c 6 6 6 c . . 
                f 6 1 1 1 1 1 6 6 6 6 6 6 c . . 
                . f 6 1 1 1 1 1 6 6 6 6 c . . . 
                . . f f c c c c c c c c . . . . 
                `)
            if (dx > 0) {
                aSnake.image.flipX()
            }
        }
    }
})
