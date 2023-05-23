require "json"

ret = []

def readFile(ret, file, locale) 
  text = open(__dir__ + "/../text/" + file).read
  text.split(/(\r|\n)+/).each do |line|
    if line.strip != ""
      ret.push({text: {locale => line.strip}})
    end
  end
end

readFile(ret, "en.txt", "en")
readFile(ret, "ja.txt", "ja")

File.open(__dir__ + "/../data/data.json","w") do |f|
  f.write(JSON.pretty_generate(ret))
end
