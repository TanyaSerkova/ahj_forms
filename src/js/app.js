const initPopover = () => {
  const db = new WeakMap();

  const createElement = (tagname, attrs, ...children) => {
    const element = Object.assign(document.createElement(tagname), attrs);
    element.append(...children);

    return element;
  };

  const createPopover = (element) => {
    const title = element.dataset.popoverTitle;
    const content = element.dataset.popoverContent;

    const container = createElement(
      'div',
      { className: 'popover' },
      createElement('div', { className: 'popover__title' }, title),
      createElement('div', { className: 'popover__body' }, content),
    );

    return container;
  };

  const getPopoverStyle = (element, popover) => {
    const rect = element.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const { pageXOffset, pageYOffset } = window;
    const offset = {
      left: pageXOffset + rect.left + rect.width / 2 - popoverRect.width / 2,
      top: pageYOffset + rect.top - popoverRect.height,
    };
    const style = {
      left: `${offset.left}px`,
      top: `${offset.top}px`,
    };

    return style;
  };

  const openPopover = (element) => {
    const popover = createPopover(element);
    document.body.append(popover);
    Object.assign(popover.style, getPopoverStyle(element, popover));
    db.set(element, popover);
  };

  const closePopover = (element) => {
    const popover = db.get(element);
    popover.remove();
    db.delete(element);
  };

  const togglePopover = (element) => {
    if (db.has(element)) {
      closePopover(element);
      return;
    }
    openPopover(element);
  };

  const initElement = (element) => {
    element.addEventListener('click', () => togglePopover(element));
  };

  const elements = [...document.querySelectorAll('[data-popover-content]')];

  for (const element of elements) {
    initElement(element);
  }
};

initPopover();

export default initPopover();
