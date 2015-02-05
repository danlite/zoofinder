var Biome = (function () {
  var Biome = function (name, color) {
    this.name = name
    this.color = color
    this.identifier = name.replace(/[^\w]/g, '-').toLowerCase()

    orderedBiomes.push(this)
    keyedBiomes[this.identifier] = this
  }

  var orderedBiomes = []
  var keyedBiomes = {}

  Biome.all = keyedBiomes
  Biome.ordered = orderedBiomes

  return Biome

})()

new Biome('Farm', '#4d9623')
new Biome('Outback', '#a9774b')
new Biome('Savanna', '#b79e3c')
new Biome('Northern', '#4b6f3b')
new Biome('Polar', '#5e8e94')
new Biome('Jungle', '#34753e')
new Biome('Jurassic', '#754331')
new Biome('Ice Age', '#a1b8ac')
new Biome('City', '#626668')
new Biome('Mountain', '#6e8780')
new Biome('Moon', '#726b68')
new Biome('Mars', '#c66a5a')