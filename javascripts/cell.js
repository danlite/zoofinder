var GridCell = (function () {

  var GridCell = function (grid) {
    this.grid = grid
    this.selected = false
    this.element = $('<div>').addClass(GridCell.className)
    this.textElement = $('<span>').addClass('text').appendTo(this.element)
    this.imageElement = $('<img>').appendTo(this.element)
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
    if (this.animal == animal)
      return;

    this.setPotentialAnimal(null)

    this.animal = animal

    if (!animal)
      this.resetHints()

    this.imageElement.attr('src', animal ? animal.imagePath() : '').toggle(animal ? true : false)

    $(this).trigger('change')
  }

  GridCell.prototype.setPotentialAnimal = function (animal) {
    var imagePath

    if (this.animal)
      return

    if (this.potentialAnimal == animal)
      return

    this.potentialAnimal = animal

    this.imageElement.attr('src', animal ? animal.imagePath() : '')
      .toggle(animal ? true : false)
      .toggleClass('potential', animal ? true : false)
  }

  GridCell.prototype.setText = function (text) {
    if (text)
      this.textElement.text(text)
    else
      this.textElement.text('')
  }

  GridCell.className = 'cell'

  return GridCell

})()