// Vietnamese uses precomposed accented letters as well as combining marks.
module.exports = function registerVietnamese(lunr) {
  lunr.vi = function vietnamese() {
    this.pipeline.reset();
    this.pipeline.add(lunr.vi.trimmer);
    this.searchPipeline.reset();
    this.searchPipeline.add(lunr.vi.trimmer);
  };
  lunr.vi.trimmer = function trimVietnamese(token) {
    return token.update((text) => text.normalize("NFC").replace(/^[^\p{L}\p{M}\p{N}]+|[^\p{L}\p{M}\p{N}]+$/gu, ""));
  };
  lunr.Pipeline.registerFunction(lunr.vi.trimmer, "trimmer-vi-unicode");
};
