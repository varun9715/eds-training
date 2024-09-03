import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  const container = document.createElement('div');
  const allChild = [...block.children];
  allChild.forEach((row, index) => {
    const div = document.createElement("div");
    div.className = "image-with-texts-container";
    div.innerHTML = row.innerHTML;
    [...div.children].forEach((childDiv) => {
      if (childDiv.children.length === 1 && childDiv.querySelector("picture"))
        childDiv.className = "image-with-texts-card-image";
      else childDiv.className = "image-with-texts-card-body";
    });
    container.append(div);
  });
  container
    .querySelectorAll("img")
    .forEach((img) =>
      img
        .closest("picture")
        .replaceWith(
          createOptimizedPicture(img.src, img.alt, false, [{ width: "750" }])
        )
    );
  block.innerHTML= '';
  block.append(container);
}
