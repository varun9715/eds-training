import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  const allChild = [...block.children];
  const title = document.createElement('h2');
  const footer = document.createElement("div");
  allChild.forEach((row, index) => {
    if(index === 0){
      title.className="article-title";
      title.innerHTML = row.innerHTML;
      return;
    }
    if(index===allChild.length-1){
      footer.innerHTML=row.innerHTML;
      return;
    }
    const li = document.createElement("li");
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector("picture"))
        div.className = "articles-card-image";
      else div.className = "articles-card-body";
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.innerHTML= '';
  block.append(title);
  block.append(ul);
  block.append(footer);
}
