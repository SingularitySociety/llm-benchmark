require "json"
require "digest/sha2"
ret = []

def readFile(ret, file, locale) 
  textData = open(__dir__ + "/../text/" + file).read
  textData.split(/(\r|\n)+/).each do |line|
    text = line.strip
    if text != ""
      ret.push({
                 text: {locale => text},
                 id: Digest::SHA256.hexdigest(text)
               })
    end
  end
end

readFile(ret, "en.txt", "en")
readFile(ret, "ja.txt", "ja")

File.open(__dir__ + "/../data/data.json","w") do |f|
  f.write(JSON.pretty_generate(ret))
end
