import{Z as i,a0 as p,a1 as m,r as w,j as s,cA as h,a2 as l,a5 as g,a7 as x,cB as P,B as j,cC as f,cD as y,v as F,q as u,b4 as b,cQ as v,cK as A}from"./index-BD9lYu5U.js";const U=i.object({password:i.string().min(1,{message:"Password is required"}).min(5,{message:"Password must be at least 5 characters long"}).regex(/[A-Z]/,{message:"Password must contain at least one uppercase letter"}).regex(/[a-z]/,{message:"Password must contain at least one lowercase letter"}).regex(/\d/,{message:"Password must contain at least one number"}).regex(/[\W_]/,{message:"Password must contain at least one special character"})}),z=({onFinish:a,isSubmitting:e,mode:t})=>{const{control:o,handleSubmit:n,setValue:r}=p({defaultValues:{password:"",mode:t},resolver:m(U)});return w.useEffect(()=>{r("mode",t)},[t,r]),s.jsx(h,{title:"Update Password",children:s.jsx(l,{id:"update-password-form",onFinish:n(c=>{a(c)}),children:s.jsxs("div",{className:"flex flex-col gap-1",children:[s.jsx(g,{control:o,name:"password",children:s.jsx(x.Password,{placeholder:"Password",size:"large",variant:"filled",className:"py-3",prefix:s.jsx(P,{})})}),s.jsx(l.Item,{children:s.jsx(j,{type:"primary",htmlType:"submit",size:"large",className:"w-full py-6 mt-2 font-bold",loading:e,id:"update-password-button",children:"Update Password"})})]})})})},E=()=>{const{loading:a,error:e,success:t,handleRequest:o}=f(y.post);return{loading:a,error:e,success:t,updatePassword:async r=>await o("/api/host/update-password",r)}},I=({token:a,mode:e})=>{const{updatePassword:t,loading:o}=E(),n=F(),r=async c=>{try{if(a===null){u.error("Token is null");return}const d={password:c.password,token:a,mode:e};await t(d),u.success("Password reset is successful"),n("/login")}catch(d){b(d)}};return s.jsx("div",{children:s.jsx(z,{onFinish:r,isSubmitting:o,mode:e})})},k=()=>{const[a]=v(),e=a.get("token");return s.jsx(A,{children:s.jsx(I,{token:e,mode:"Host"})})};export{k as default};
