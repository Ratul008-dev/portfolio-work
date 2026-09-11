/**
 * Computes the next index position, wrapping around to zero at the end.
 * @param {number} current - Current active image index.
 * @param {number} total - Total images inside the container.
 * @returns {number} The next index.
 */
export const nextIndex = (current, total) => {
  if (total <= 0) return 0;
  return (current + 1) % total;
};

/**
 * Computes the previous index position, wrapping to the last element at zero.
 * @param {number} current - Current active image index.
 * @param {number} total - Total images inside the container.
 * @returns {number} The previous index.
 */
export const prevIndex = (current, total) => {
  if (total <= 0) return 0;
  return (current - 1 + total) % total;
};

/**
 * Updates visible image visibility states across an array of DOM image nodes.
 * @param {NodeList|HTMLImageElement[]} imgElements - Result of querySelectorAll('img')
 * @param {number} activeIndex - The index that should be visible.
 */
export const updateSliderDOM = (imgElements, activeIndex) => {
  if (!imgElements || imgElements.length === 0) return;
  
  imgElements.forEach((img, idx) => {
    if (idx === activeIndex) {
      img.style.display = "block";
      img.style.opacity = "1";
    } else {
      img.style.display = "none";
      img.style.opacity = "0";
    }
  });
};
