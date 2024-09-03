export default {
  transformDOM: ({ document }) => {
    const main = document.querySelector("main");
    main
      .querySelectorAll(
        "header, footer, .cmp-carousel__indicators, .cmp-carousel__actions"
      )
      .forEach((el) => el.remove());

    // Image with text
    const teasers = document.querySelectorAll(".cmp-teaser--hero");
    teasers.forEach((teaser) => {
      const content = teaser.querySelector(".cmp-teaser__content");
      const img = teaser.querySelector("img");
      const cells = [["Image with text"], [img, content]];
      const table = WebImporter.DOMUtils.createTable(cells, document);
      main.prepend(table);
    });

    //articles
    main.querySelectorAll(".image-list").forEach((article) => {
      const cells = [["Articles"]];
      cells.push([article.previousElementSibling]);
      const bla = article.querySelectorAll(".cmp-image-list__item-content");
      bla.forEach((tile) => {
        const childNode = tile.children;
        const links = tile.querySelectorAll("a");
        const img = links[0].querySelector('img');
        const content = document.createElement("div");
        if (links[1]) {
          content.appendChild(links[1]);
          content.appendChild(document.createElement("br"));
        }
        //const content = childNode[1];
        console.log("childNode", childNode);
        content.appendChild(
          tile.querySelector(".cmp-image-list__item-description")
        );

        cells.push([img, content]);
      });
      cells.push([article.nextElementSibling]);
      const table = WebImporter.DOMUtils.createTable(cells, document);
      main.prepend(table);
    });

    //featured
    main.querySelectorAll(".cmp-teaser--featured").forEach((featured) => {
      const cells = [["featured"]];
      const content = featured.querySelector(".cmp-teaser__content");
      const image = featured.querySelector("img");
      cells.push([content, image]);
      const table = WebImporter.DOMUtils.createTable(cells, document);
      main.prepend(table);
    });

    return main;
  },
};
