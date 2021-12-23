function getCoords(element) {
  let box = element.getBoundingClientRect();

  let body = document.body;
  let documentElement = document.documentElement;

  let scrollTop = window.pageYOffset || documentElement.scrollTop || body.scrollTop;
  let scrollLeft = window.pageXOffset || documentElement.scrollLeft || body.scrollLeft;

  let clientTop = documentElement.clientTop || body.clientTop || 0;
  let clientLeft = documentElement.clientLeft || body.clientLeft || 0;

  let top = box.top + scrollTop - clientTop;
  let left = box.left + scrollLeft - clientLeft;

  return {
    top: Math.round(top),
    left: Math.round(left),
  };
};

export default getCoords;