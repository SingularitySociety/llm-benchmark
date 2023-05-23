# LLM benchmark

According to the leaked memo from Google titled [Google "We Have No Moat, And Neither Does OpenAI"](https://www.semianalysis.com/p/google-we-have-no-moat-and-neither), it is apparent that the open source LLMs will play very important role.

It means we need a set of "standard tests" (benchmarks) to evaluate various LLMs. While there are already some efforts by other researchers (such as "[SuperGLUE: A Stickier Benchmark for General-Purpose Language Understanding Systems](https://w4ngatang.github.io/static/papers/superglue.pdf)"), this is our attempt to compile a set of questions, which help us to identify the strength and weakness of various LLMs.

## List of questions

[List](./Questions.md)

## Usage

- Update question list text file in [text direcory](./text/).
- Update JSON file.
  - `ruby scripts/ToJson.rb`
- Update Question markdown file.
  - `ruby scripts/JsonToMD.rb`

## Contribute

 - Fork repository.
 - Update text/{en,ja}.txt .
 - Create pull request.
