import{V as p,a as g,j as e,U as v}from"./app-DQFMY0bl.js";import{T as n,I as o}from"./TextInput-C50ylYpj.js";import{I as m}from"./InputLabel-2eBRfkBf.js";import{P as j}from"./PrimaryButton-SBv1XljQ.js";import{z as y}from"./transition-QyUauKMM.js";function w({mustVerifyEmail:l,status:d,className:c=""}){const t=p().props.auth.user,{data:s,setData:r,patch:u,errors:i,processing:x,recentlySuccessful:f}=g({name:t.name,email:t.email}),h=a=>{a.preventDefault(),u(route("profile.update"))};return e.jsxs("section",{className:c,children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-gray-100",children:"Profile Information"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600 dark:text-gray-400",children:"Update your account's profile information and email address."})]}),e.jsxs("form",{onSubmit:h,className:"mt-6 space-y-6",children:[e.jsxs("div",{children:[e.jsx(m,{htmlFor:"name",value:"Name"}),e.jsx(n,{id:"name",className:"mt-1 block w-full",value:s.name,onChange:a=>r("name",a.target.value),required:!0,isFocused:!0,autoComplete:"name"}),e.jsx(o,{className:"mt-2",message:i.name})]}),e.jsxs("div",{children:[e.jsx(m,{htmlFor:"email",value:"Email"}),e.jsx(n,{id:"email",type:"email",className:"mt-1 block w-full",value:s.email,onChange:a=>r("email",a.target.value),required:!0,autoComplete:"username"}),e.jsx(o,{className:"mt-2",message:i.email})]}),l&&t.email_verified_at===null&&e.jsxs("div",{children:[e.jsxs("p",{className:"mt-2 text-sm text-gray-800 dark:text-gray-200",children:["Your email address is unverified.",e.jsx(v,{href:route("verification.send"),method:"post",as:"button",className:"rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800",children:"Click here to re-send the verification email."})]}),d==="verification-link-sent"&&e.jsx("div",{className:"mt-2 text-sm font-medium text-green-600 dark:text-green-400",children:"A new verification link has been sent to your email address."})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(j,{disabled:x,children:"Save"}),e.jsx(y,{show:f,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:e.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Saved."})})]})]})]})}export{w as default};
