require "json"

text = open("./raw.txt").read

ret = []
text.split(/(\r|\n)+/).each do |line|
  if line.strip != ""
    ret.push({text: line.strip})
  end
end

File.open("data.json","w") do |f|
  f.write(JSON.pretty_generate(ret))
end
