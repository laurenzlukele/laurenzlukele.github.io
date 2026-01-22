import{e as y,i as p,c as s,a as t,b as a,F as w,r as h,w as v,j as g,k as l,o as i,f as x,n as k,t as V,v as C}from"./CvCsRBP3.js";import{_ as N}from"./B0NQAFUX.js";import{_ as B}from"./BnCwyxqX.js";const P={class:"viewport"},$={class:"scene-container"},F=["aria-label","onClick"],j={class:"hotspot-label"},I={class:"relative w-full aspect-video bg-black"},R=["src"],E=y({__name:"television",setup(S){const n=p(!1),r=p(""),m=c=>{r.value=c,n.value=!0},u=[{id:1,x:35,y:78,label:"Click remote",action:()=>m("NFVXPxwkyHc")}],d=[{name:"Bedroom",path:"/bedroom"}];return(c,o)=>{const _=x,f=N,b=B;return i(),s("div",P,[t("div",$,[a(_,{src:"/images/television.jpg",alt:"Television closeup",class:"scene-image"}),(i(),s(w,null,h(u,e=>t("button",{key:e.id,class:"hotspot",style:k({left:`${e.x}%`,top:`${e.y}%`}),"aria-label":e.label,onClick:e.action},[o[1]||(o[1]=t("span",{class:"hotspot-ring"},null,-1)),o[2]||(o[2]=t("span",{class:"hotspot-dot"},null,-1)),t("span",j,V(e.label),1)],12,F)),64))]),a(f,{rooms:d}),a(b,{open:l(n),"onUpdate:open":o[0]||(o[0]=e=>g(n)?n.value=e:null),ui:{content:"sm:max-w-5xl"}},{content:v(()=>[t("div",I,[l(n)?(i(),s("iframe",{key:0,width:"100%",height:"100%",src:`https://www.youtube.com/embed/${l(r)}?autoplay=1&rel=0`,title:"Video Player",frameborder:"0",allow:`
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share;
            `,allowfullscreen:"",class:"absolute inset-0 w-full h-full"},null,8,R)):C("",!0)])]),_:1},8,["open"])])}}});export{E as default};
