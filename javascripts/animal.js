var Animal = (function () {

  var Animal = function (name, biomeIdentifier, rarity, tiles) {
    var width = height = 0
    var x = y = Infinity

    this.name = this.shortName = name
    this.biome = Biome.all[biomeIdentifier]
    this.identifier = name.replace(/[^\w]/g, '-').toLowerCase()
    this.rarity = rarity

    _.each(tiles, function (tile) {
      x = Math.min(x, tile[0])
      y = Math.min(y, tile[1])
    })

    tiles = _.map(tiles, function (tile) {
      var relativeX = tile[0] - x
      var relativeY = tile[1] - y
      var newTile = [ relativeX, relativeY ]

      width = Math.max(width, relativeX + 1)
      height = Math.max(height, relativeY + 1)

      return newTile
    })

    this.tiles = tiles

    this.width = width
    this.height = height

    keyedAnimals[this.identifier] = this
    orderedAnimals.push(this)
  }

  Animal.prototype.tilesAtPosition = function (x, y) {
    return _.map(this.tiles, function (tile) {
      return [tile[0] + x, tile[1] + y]
    })
  }

  Animal.prototype.imagePath = function () {
    return 'images/animals/' + this.identifier + '.png'
  }

  Animal.fromShape = function (name, matrix) {
    var tiles = []
    _.each(matrix, function (row, rowIndex) {
      _.each(row, function (value, columnIndex) {
        if (value) {
          tiles.push([ columnIndex, rowIndex ])
        }
      })
    })

    return new Animal(name, undefined, undefined, tiles)
  }

  var keyedAnimals = {}
  var orderedAnimals = []

  Animal.all = keyedAnimals
  Animal.ordered = orderedAnimals

  Animal.inBiome = function (biome) {
    return _.select(Animal.ordered, function (animal) {
      return animal.biome == biome
    })
  }

  return Animal

})()

new Animal('Discobux', null, 'bux', [[0,0]])

new Animal('Sheep', 'farm', 'common', [[0,0],[1,0],[2,0],[3,0]])
new Animal('Rabbit', 'farm', 'common', [[0,0],[0,1],[0,2],[0,3]])
new Animal('Pig', 'farm', 'common', [[0,0],[1,0],[0,1],[1,1]])
new Animal('Horse', 'farm', 'rare', [[0,0],[0,1],[0,2]])
new Animal('Cow', 'farm', 'rare', [[0,0],[1,0],[2,0]])
new Animal('Unicorn', 'farm', 'mythical', [[0,0],[1,1],[2,1]])

new Animal('Kangaroo', 'outback', 'common', [[0,0],[1,1],[2,2],[3,3]])
new Animal('Platypus', 'outback', 'common', [[0,0],[1,0],[1,1],[2,1]])
new Animal('Crocodile', 'outback', 'common', [[0,0],[1,0],[2,0],[3,0]])
new Animal('Koala', 'outback', 'rare', [[0,0],[1,0],[1,1]])
new Animal('Cockatoo', 'outback', 'rare', [[0,0],[1,1],[1,2]])
new Animal('Tiddalik', 'outback', 'mythical', [[1,0],[0,1],[2,1]])

new Animal('Zebra', 'savanna', 'common', [[1,0],[0,1],[2,1],[1,2]])
new Animal('Hippo', 'savanna', 'common', [[0,0],[2,0],[0,2],[2,2]])
new Animal('Giraffe', 'savanna', 'common', [[0,0],[0,1],[0,2],[0,3]])
new Animal('Lion', 'savanna', 'rare', [[0,0],[1,0],[2,0]])
new Animal('Elephant', 'savanna', 'rare', [[0,0],[1,0],[0,1]])
new Animal('Gryphon', 'savanna', 'mythical', [[0,0],[2,0],[1,1]])

new Animal('Bear', 'northern', 'common', [[0,0],[1,0],[1,1],[1,2]])
new Animal('Skunk', 'northern', 'common', [[1,0],[2,0],[0,1],[1,1]])
new Animal('Beaver', 'northern', 'common', [[2,0],[0,1],[1,1],[2,2]])
new Animal('Moose', 'northern', 'rare', [[0,0],[2,0],[1,1]])
new Animal('Fox', 'northern', 'rare', [[0,0],[1,0],[2,1]])
new Animal('Sasquatch', 'northern', 'mythical', [[0,0],[0,1]])

new Animal('Penguin', 'polar', 'common', [[1,0],[1,1],[0,2],[2,2]])
new Animal('Seal', 'polar', 'common', [[0,0],[1,1],[3,1],[2,2]])
new Animal('Muskox', 'polar', 'common', [[0,0],[1,0],[0,1],[2,1]])
new Animal('Polar Bear', 'polar', 'rare', [[0,0],[2,0],[2,1]])
new Animal('Walrus', 'polar', 'rare', [[0,0],[1,1],[2,1]])
new Animal('Yeti', 'polar', 'mythical', [[0,0],[0,2]])

new Animal('Monkey', 'jungle', 'common', [[0,0],[2,0],[1,1],[3,1]])
new Animal('Toucan', 'jungle', 'common', [[1,0],[0,1],[1,2],[1,3]])
new Animal('Gorilla', 'jungle', 'common', [[0,0],[2,0],[0,1],[2,1]])
new Animal('Panda', 'jungle', 'rare', [[2,0],[0,1],[2,2]])
new Animal('Tiger', 'jungle', 'rare', [[0,0],[2,0],[3,0]])
new Animal('Phoenix', 'jungle', 'mythical', [[0,0],[2,2]])

new Animal('Diplodocus', 'jurassic', 'common', [[0,0],[1,1],[2,1],[1,2]])
new Animal('Stegosaurus', 'jurassic', 'common', [[1,0],[2,0],[0,1],[3,1]])
new Animal('Raptor', 'jurassic', 'common', [[0,0],[1,0],[1,1],[2,2]])
new Animal('T-Rex', 'jurassic', 'rare', [[0,0],[0,2],[1,2]])
new Animal('Triceratops', 'jurassic', 'rare', [[0,0],[2,1],[0,2]])
new Animal('Dragon', 'jurassic', 'mythical', [[0,0],[2,1]])

new Animal('Wooly Rhino', 'ice-age', 'common', [[2,0],[0,1],[3,1],[1,2]])
new Animal('Giant Sloth', 'ice-age', 'common', [[0,0],[2,1],[0,2],[2,2]])
new Animal('Dire Wolf', 'ice-age', 'common', [[1,0],[0,1],[3,1],[1,2]])
new Animal('Saber Tooth', 'ice-age', 'rare', [[0,0],[2,1],[1,2]])
new Animal('Mammoth', 'ice-age', 'rare', [[1,0],[0,1],[2,2]])
new Animal('Akhlut', 'ice-age', 'mythical', [[2,0],[0,1],[2,2]])

new Animal('Raccoon', 'city', 'common', [[0,0],[2,0],[0,1],[3,1]])
new Animal('Pigeon', 'city', 'common', [[0,0],[1,1],[1,2],[2,2]])
new Animal('Rat', 'city', 'common', [[0,0],[1,0],[1,1],[3,1]])
new Animal('Squirrel', 'city', 'rare', [[2,0],[0,1],[1,2]])
new Animal('Opossum', 'city', 'rare', [[0,0],[0,1],[2,1]])
new Animal('Sewer Turtle', 'city', 'mythical', [[0,0],[1,0]])

new Animal('Goat', 'mountain', 'common', [[0,0],[0,1],[1,1],[2,1]])
new Animal('Cougar', 'mountain', 'common', [[0,0],[1,1],[0,2],[2,2]])
new Animal('Elk', 'mountain', 'common', [[0,0],[2,0],[1,1],[2,1]])
new Animal('Eagle', 'mountain', 'rare', [[0,0],[0,1],[1,2]])
new Animal('Coyote', 'mountain', 'rare', [[0,0],[1,0],[2,1]])
new Animal('Aatxe', 'mountain', 'mythical', [[2,0],[0,1]])

new Animal('Moonkey', 'moon', 'common', [[0,0],[0,1],[2,1],[2,2]])
new Animal('Lunar Tick', 'moon', 'common', [[1,0],[1,2],[0,3],[2,3]])
new Animal('Tribble', 'moon', 'common', [[1,0],[0,1],[1,1],[2,1]])
new Animal('Moonicorn', 'moon', 'rare', [[0,0],[0,1],[1,1]])
new Animal('Luna Moth', 'moon', 'rare', [[0,0],[2,0],[1,2]])
new Animal('Jade Rabbit', 'moon', 'mythical', [[0,0],[1,2]])

new Animal('Rock', 'mars', 'common', [[0,0],[1,0],[0,1],[1,1]])
new Animal('Marsmot', 'mars', 'common', [[1,0],[1,1],[0,2],[1,2]])
new Animal('Marsmoset', 'mars', 'common', [[0,0],[2,0],[2,1],[1,2]])
new Animal('Rover', 'mars', 'rare', [[1,0],[0,1],[2,1]])
new Animal('Martian', 'mars', 'rare', [[0,0],[2,0],[1,1]])
new Animal('Marsmallow', 'mars', 'mythical', [[0,0],[0,2]])

Animal.all['diplodocus'].shortName = 'Diplo'
Animal.all['stegosaurus'].shortName = 'Stego'
Animal.all['triceratops'].shortName = 'Tricera'
Animal.all['wooly-rhino'].shortName = 'Rhino'
Animal.all['giant-sloth'].shortName = 'Sloth'
Animal.all['saber-tooth'].shortName = 'Saber'
Animal.all['sewer-turtle'].shortName = 'S. Turtle'
Animal.all['jade-rabbit'].shortName = 'J. Rabbit'
Animal.all['marsmallow'].shortName = 'Mallow'