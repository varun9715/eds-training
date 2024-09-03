import { createOptimizedPicture } from "../../scripts/lib-franklin.js";

export default function decorate(block) {
  /* change to ul, li */
  const div = document.createElement("div");
  [...block.children].forEach((row) => {
    const child = document.createElement("div");
    child.className = 'wrapper';
    child.innerHTML = row.innerHTML;
    [...child.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector("picture"))
        div.className = "featured-image";
      else div.className = "featured-content";
    });
    div.append(child);
  });
  div.querySelectorAll("img").forEach((img) =>
    img
      .closest("picture")
      .replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: "750" }])
      )
  );
  block.innerHTML = "";
  block.append(div);
}
