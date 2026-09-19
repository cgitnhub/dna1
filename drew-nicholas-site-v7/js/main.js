document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu-toggle');
  const mobile=document.querySelector('.mobile-nav');
  if(menu&&mobile){
    menu.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
    mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');menu.setAttribute('aria-expanded','false');}));
  }

  const hero=document.querySelector('.hero');
  const image=document.querySelector('.hero-image');
  if(hero&&image&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    let ticking=false;
    addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{image.style.transform=`translate3d(0,${Math.min(scrollY,hero.offsetHeight)*.055}px,0) scale(1.07)`;ticking=false;});ticking=true;}},{passive:true});
  }

  const box=document.querySelector('.lightbox');
  if(box){
    const img=box.querySelector('img');
    const close=()=>{box.classList.remove('open');box.setAttribute('aria-hidden','true');img.src='';};
    document.querySelectorAll('.tile[data-lightbox]').forEach(tile=>tile.addEventListener('click',()=>{
      if(tile.classList.contains('placeholder')) return;
      img.src=tile.dataset.lightbox;
      img.alt=tile.querySelector('img')?.alt||'';
      box.classList.add('open');box.setAttribute('aria-hidden','false');
    }));
    box.querySelector('.lightbox-close').addEventListener('click',close);
    box.addEventListener('click',e=>{if(e.target===box)close();});
    addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  }
});
