const sheetBlocks = document.querySelectorAll('.sheet');

sheetBlocks.forEach(block=>{
    const url = block.querySelector('div>div').innerText;
    block.innerHTML = 'loading';

    fetch(`${url.trim()}.json`).then(response => response.json()).then(({response}) => {
        let list = '';
        response.data.forEach((row, index)=>{
            list+=`<li class="${index>20? 'hidden':''}">${row.name}:${row.age}</li>`
        })
        const ul = `<ul class='list'>${list}</ul>`;
block.innerHTML = ul;
        const next = document.createElement('button');
        if(response.data.length>20){
            next.innerHTML = 'next';
            next.addEventListener('click', ()=>{
                const list = block.querySelector('.list');
                const hiddenList = list.querySelectorAll('.hidden');
                if(hiddenList){
                    hiddenList.forEach(hl=>hl.classList.remove('hidden'));
                }
            });
            block.appendChild(next);
        }


    });

});