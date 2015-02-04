var GridCell = (function () {

  var GridCell = function (grid) {
    this.grid = grid
    this.selected = false
    this.element = $('<div>').addClass(GridCell.className)
  }

  GridCell.prototype.resetHints = function () {
    this.element.removeClass('bux-hint').removeClass('best-hint').removeClass('guaranteed-hint')
  }

  GridCell.prototype.setSelected = function (sel) {
    if (sel == this.selected)
      return

    if (!sel)
      this.setAnimal(null)

    this.selected = sel

    this.element.toggleClass('selected', sel)

    $(this).trigger('change')
  }

  GridCell.prototype.setAnimal = function (animal) {
    var imagePath

    if (this.animal == animal)
      return;

    this.animal = animal

    if (animal)
      imagePath = 'images/animals/' + animal.identifier + '.png'

    if (!animal)
      this.resetHints()

    this.element.css('background-image', imagePath ? 'url(' + imagePath + ')' : '')

    $(this).trigger('change')
  }

  GridCell.className = 'cell'

  return GridCell

})()