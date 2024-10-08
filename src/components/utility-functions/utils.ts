// Get elements from the DOM by classname
export const getElemByClass = (className: string) => {
  const elems = document.querySelectorAll(`.${className}`);
  const elem = document.querySelector(`.${className}`);
  if (elems.length > 1) {
    return elems;
  }
  return elem;
};

// Remove classist from elem
export const removeClass = (className: string) => {
  const elem = getElemByClass(className) as HTMLElement;
  if (elem instanceof HTMLElement) {
    elem.classList.remove(className);
  }
};

// Add Class to Elem
export const addClass = (elem: HTMLElement, className: string) => {
  if (!elem) return;
  elem.classList.add(className);
  console.log(elem);
};
