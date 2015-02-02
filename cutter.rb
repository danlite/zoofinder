require 'trollop'

opts = Trollop::options do
  opt :biome, "Biome name (images/{biome}.png)", :type => :string
end

biome = opts[:biome]

filename = "images/#{biome}.png"

Trollop::die :biome, 'must exist' unless File.exist?(filename)

cropped = "images/#{biome}-crop.png"

`convert #{filename} -chop 66x212 -gravity SouthEast -chop 66x372 #{cropped}`
`convert #{cropped} -crop 1x3\\@ +repage +adjoin -chop 0x36 -gravity South -chop 0x46 images/#{biome}-%d.png; rm #{cropped}`

bgs = [['9a9468', '88825c'], ['998e6c', '877e60'], ['a98c6b', '957c5f']]

3.times do |i|
  bg = bgs[i].map { |c| " -transparent \"\##{c}\" " }.join
  section = "images/#{biome}-#{i}.png"
  crop = ''
  if i == 0 then crop = ' -crop 3x1\@ ' end
  if i == 1 then crop = ' -crop 2x1\@ ' end
  command = "convert #{section} #{bg} #{crop} -trim -gravity South -background transparent -extent 100x100 images/animals/#{biome}-#{i}-%d.png; rm #{section}"
  `#{command}`
end