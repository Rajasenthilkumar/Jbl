import{cM as c,j as e,cN as o,cO as m,cA as x,cP as d,B as t,x as y,q as u,b4 as h}from"./index-BD9lYu5U.js";const f=({email:i,onClickGotIt:s})=>{const{resendEmail:a,loading:r}=c(),l=async()=>{try{await a({email:i}),u.success("Email sent successfully")}catch(n){h(n)}};return e.jsx(o,{spinning:r,indicator:e.jsx(m,{spin:!0}),children:e.jsx(x,{children:e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("img",{src:d,alt:"verify-image"}),e.jsx("h2",{className:"mb-5 text-3xl font-bold text-PrimaryText",children:"Verify Your Email"}),e.jsxs("p",{className:"mb-4 text-base font-medium text-PrimaryText",children:["Thank you for joining"," ",e.jsx("span",{className:"text-primary",children:"Just Be Lekker! "})]}),e.jsxs("p",{className:"mb-4 text-base text-center text-Grey",children:["We just sent a verification link to your email.",e.jsx("br",{}),"Click the link in the email to verify your account"]}),s!==void 0?e.jsx(t,{type:"primary",size:"large",className:"w-full py-6 my-5 font-bold ",onClick:s,children:"Got it"}):e.jsx(y,{to:"/login",className:"w-full",children:e.jsx(t,{type:"primary",size:"large",className:"w-full py-6 my-5 font-bold ",children:"Got it"})}),e.jsxs("p",{className:"text-center text-PrimaryText",children:["Don’t see the email?"," ",e.jsx("span",{className:"ml-1 font-bold cursor-pointer text-primary",onClick:l,children:"Click here to resend it."})]})]})})})};export{f as E};
