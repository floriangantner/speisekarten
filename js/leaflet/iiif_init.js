function initOpenSeadragon() {
  OpenSeadragon({
    id: "iiif-map",
    minZoomImageRatio: 1,
    prefixUrl: "js/openseadragon/images/", // OSD needs trailing slash
    tileSources: "https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json",
    crossOriginPolicy: false});
}
