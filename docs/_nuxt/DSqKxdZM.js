import{_ as s}from"./DUbtjrsi.js";import{e as r,aD as c,s as d,w as i,aH as m,o as a,a as p,c as u,m as _}from"./CedZsQLv.js";const w={class:"aspect-video w-full max-h-[90vh] max-w-[142vh] mx-auto"},y=["src"],f=r({__name:"VideoPlayerModal",props:m({youtubeId:{},title:{}},{open:{type:Boolean,default:!1},openModifiers:{}}),emits:["update:open"],setup(e){const o=c(e,"open");return(b,t)=>{const n=s;return a(),d(n,{open:o.value,"onUpdate:open":t[0]||(t[0]=l=>o.value=l),ui:{content:"max-w-5xl bg-transparent shadow-none ring-0",overlay:"backdrop-blur-md"},title:e.title},{content:i(()=>[p("div",w,[o.value?(a(),u("iframe",{key:0,width:"100%",height:"100%",src:`https://www.youtube.com/embed/${e.youtubeId}?autoplay=1&rel=0`,title:"Video Player",frameborder:"0",allow:`
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
          `,allowfullscreen:""},null,8,y)):_("",!0)])]),_:1},8,["open","title"])}}}),v=Object.assign(f,{__name:"VideoPlayerModal"});export{v as _};
