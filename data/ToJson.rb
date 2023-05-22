require "json"

text = open(__dir__ + "/raw.txt").read

ret = []
text.split(/(\r|\n)+/).each do |line|
  if line.strip != ""
    ret.push({text: line.strip})
  end
end

File.open(__dir__ + "/data.json","w") do |f|
  f.write(JSON.pretty_generate(ret))
end
