import{e as y,r as p,c as n,a as t,b as a,F as h,i as w,w as v,p as g,g as l,o as i,h as x,k,t as V,j as C}from"./NS5dQeNN.js";import{_ as N}from"./XZu_e8vq.js";import{_ as B}from"./R6xLV5l_.js";const P={class:"viewport"},$={class:"scene-container"},F=["aria-label","onClick"],j={class:"hotspot-label"},I={class:"relative w-full aspect-video bg-black"},R=["src"],E=y({__name:"television",setup(S){const s=p(!1),r=p(""),m=c=>{r.value=c,s.value=!0},u=[{id:1,x:35,y:78,label:"Click remote",action:()=>m("NFVXPxwkyHc")}],d=[{name:"Bedroom",path:"/bedroom"}];return(c,o)=>{const _=x,b=N,f=B;return i(),n("div",P,[t("div",$,[a(_,{src:"/images/television.jpg",alt:"Television closeup",class:"scene-image"}),(i(),n(h,null,w(u,e=>t("button",{key:e.id,class:"hotspot",style:k({left:`${e.x}%`,top:`${e.y}%`}),"aria-label":e.label,onClick:e.action},[o[1]||(o[1]=t("span",{class:"hotspot-ring"},null,-1)),o[2]||(o[2]=t("span",{class:"hotspot-dot"},null,-1)),t("span",j,V(e.label),1)],12,F)),64))]),a(b,{rooms:d}),a(f,{open:l(s),"onUpdate:open":o[0]||(o[0]=e=>g(s)?s.value=e:null),ui:{content:"sm:max-w-5xl"}},{content:v(()=>[t("div",I,[l(s)?(i(),n("iframe",{key:0,width:"100%",height:"100%",src:`https://www.youtube.com/embed/${l(r)}?autoplay=1&rel=0`,title:"Video Player",frameborder:"0",allow:`
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share;
            `,allowfullscreen:"",class:"absolute inset-0 w-full h-full"},null,8,R)):C("",!0)])]),_:1},8,["open"])])}}});export{E as default};
