require "json"

text = open(__dir__ + "/../text/en.txt").read

ret = []
text.split(/(\r|\n)+/).each do |line|
  if line.strip != ""
    ret.push({text: {en: line.strip}})
  end
end

File.open(__dir__ + "/../data/data.json","w") do |f|
  f.write(JSON.pretty_generate(ret))
end
