import{e as b,r as c,c as n,a as o,b as p,F as f,i as y,w,p as h,g as a,o as l,h as v,k as g,t as k,j as x}from"./DXBhEGSM.js";import{_ as V}from"./Bwrd7F19.js";const C={class:"viewport"},N={class:"scene-container"},P=["aria-label","onClick"],$={class:"hotspot-label"},B={class:"relative w-full aspect-video bg-black"},F=["src"],U=b({__name:"television",setup(j){const s=c(!1),i=c(""),u=r=>{i.value=r,s.value=!0},d=[{id:1,x:35,y:78,label:"Click remote",action:()=>u("NFVXPxwkyHc")}];return(r,t)=>{const m=v,_=V;return l(),n("div",C,[o("div",N,[p(m,{src:"/images/television.jpg",alt:"Television closeup",class:"scene-image"}),(l(),n(f,null,y(d,e=>o("button",{key:e.id,class:"hotspot",style:g({left:`${e.x}%`,top:`${e.y}%`}),"aria-label":e.label,onClick:e.action},[t[1]||(t[1]=o("span",{class:"hotspot-ring"},null,-1)),t[2]||(t[2]=o("span",{class:"hotspot-dot"},null,-1)),o("span",$,k(e.label),1)],12,P)),64))]),p(_,{open:a(s),"onUpdate:open":t[0]||(t[0]=e=>h(s)?s.value=e:null),ui:{content:"sm:max-w-5xl"}},{content:w(()=>[o("div",B,[a(s)?(l(),n("iframe",{key:0,width:"100%",height:"100%",src:`https://www.youtube.com/embed/${a(i)}?autoplay=1&rel=0`,title:"Video Player",frameborder:"0",allow:`
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share;
            `,allowfullscreen:"",class:"absolute inset-0 w-full h-full"},null,8,F)):x("",!0)])]),_:1},8,["open"])])}}});export{U as default};
