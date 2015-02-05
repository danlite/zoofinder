var ZooGrid = (function () {

  var containerElement

  var addCell = function (row, col) {
    var self = this
    var cell = new GridCell(this)
    cell.row = row
    cell.column = col

    this.cellRows[row].push(cell)

    containerElement.append(cell.element)
    cell.element.on('click', function (event) {
      cell.setSelected(!cell.selected)
    })

    cell.element.data('x', col).data('y', row)

    $(cell).on('change', function () {
      $(self).trigger('cell:change')
    })
  }

  var ZooGrid = function (element) {
    this.cellRows = []
    this.rows = 5
    this.columns = 5

    this.element = $(element).addClass('zoo-grid')

    containerElement = $('<div>').addClass('cell-container').appendTo(this.element)

    for (var row = 0; row < this.rows; row++) {
      this.cellRows.push([])
      for (var col = 0; col < this.columns; col++) {
        addCell.call(this, row, col)
      }
    }
    $('<div>').addClass('clearfix').appendTo(containerElement)
  }

  ZooGrid.prototype.setError = function (err) {
    if (this.error == err)
      return;

    this.error = err;

    this.element.toggleClass('animated shake', this.error)
  }

  ZooGrid.prototype.setBiome = function (biome) {
    if (!biome)
      return

    if (this.biome)
      this.element.removeClass('biome-' + this.biome.identifier)

    this.biome = biome

    this.element.addClass('biome-' + this.biome.identifier)
  }

  ZooGrid.prototype.at = function (x, y) {
    return this.cellRows[y][x]
  }

  ZooGrid.prototype.each = function (iterator) {
    _.each(this.cellRows, function (row, rowIndex) {
      _.each(row, function (cell, colIndex) {
        iterator(cell, colIndex, rowIndex)
      })
    })
  }

  ZooGrid.prototype.reset = function () {
    this.each(function (cell) {
      cell.setSelected(false)
      cell.setAnimal(undefined)
      cell.setPotentialAnimal(undefined)
      cell.resetHints()
    })
  }

  ZooGrid.prototype.findArrangementsForAnimals = function (animals, knownTiles, uncoveredTiles) {
    if (!knownTiles)
      knownTiles = {}

    uncoveredTiles = _.map(uncoveredTiles, function (tile) { return tile.join(',') })

    return findArrangementsForAnimal.call(this, animals[0], animals.slice(1), knownTiles, uncoveredTiles)
  }

  var findArrangementsForAnimal = function (animal, nextAnimals, knownTiles, uncoveredTiles, arrangement) {
    var destinationCoordinate
    var childArrangements = []
    var newArrangements
    var currentPartialArrangement

    if (!animal)
      return childArrangements

    if (_.isUndefined(arrangement))
      arrangement = []

    var knownAnimalTiles = _.map(knownTiles[animal.identifier], function (tile) { return tile.join(',') })

    for (var row = 0; row < this.rows - animal.height + 1; row++) {
      for (var col = 0; col < this.columns - animal.width + 1; col++) {
        var animalTiles = _.map(animal.tilesAtPosition(col, row), function (tile) { return tile.join(',') })
        var noCollisions = _.intersection(animalTiles, uncoveredTiles).length == 0
        var matchesKnown = _.intersection(knownAnimalTiles, animalTiles).length == knownAnimalTiles.length

        if (noCollisions && matchesKnown) {
          destinationCoordinate = [col, row]

          currentPartialArrangement = _.clone(arrangement)
          currentPartialArrangement.push({
            animal: animal,
            coordinate: destinationCoordinate
          })

          if (nextAnimals.length == 0) {
            childArrangements.push(currentPartialArrangement)
          } else if (newArrangements = findArrangementsForAnimal.call(this, nextAnimals[0], nextAnimals.slice(1), knownTiles, uncoveredTiles.concat(animalTiles), currentPartialArrangement)) {
            childArrangements = childArrangements.concat(newArrangements)
          }
        }
      }
    }

    return childArrangements
  }

  ZooGrid.prototype.arrangeAnimals = function (animals) {
    this.reset()

    var arrangement = []
    _.times(this.rows, function () { arrangement.push([]) })
  }

  return ZooGrid

})()