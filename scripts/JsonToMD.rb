require "json"

json = open(__dir__ + "/../data/data.json").read
dataSet = JSON.parse(json)


en = [];
ja = [];
dataSet.each do |data|
  if data["text"]["en"]
    en.push(data["text"]["en"])
  end
  if data["text"]["ja"]
    ja.push(data["text"]["ja"])
  end
end


File.open(__dir__ + "/../Questions.md","w") do |f|
  f.write("# List of questions\n")
  f.write("\n")
  f.write("## English\n")
  en.each do |line|
    f.write(" - " + line.gsub(/(\r?\n?)/, "") + "\n")
  end
  f.write("\n")
  f.write("## Japanese\n")
  ja.each do |line|
    f.write(" - " + line.gsub(/(\r?\n?)/, "") + "\n")
  end
end
