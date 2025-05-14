import{G as l,j as e,H as f,r as u}from"./index-CGaq9yTi.js";import{G as g}from"./Gifs-B3XvIfyj.js";const i=[{title:"GIFs",value:"gifs",background:"bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500"},{title:"Stickers",value:"stickers",background:"bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500"},{title:"Text",value:"text",background:"bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500"}],m=({showTrendingIcon:r=!1})=>{const{filter:t,setFilter:a}=l();return e.jsx(e.Fragment,{children:e.jsxs("div",{className:`flex my-3 gap-3 ${r?"flex-col sm:flex-row sm:items-center justify-between":""}`,children:[r&&e.jsxs("span",{className:"flex gap-2 items-center text-sky-400 font-bold text-md",children:[e.jsx(f,{size:25,className:"text-teal-400"}),e.jsx("p",{className:"text-sky-400 font-semibold text-md",children:"Trending"})]}),e.jsxs("div",{className:"flex min-w-80 rounded-full bg-gray-800 relative overflow-hidden",children:[e.jsx("div",{className:`
                            absolute 
                            inset-y-0 
                            w-1/3 
                            rounded-full 
                            transition-transform 
                            duration-300 
                            ease-in-out 
                            ${t==="gifs"?"translate-x-0":t==="stickers"?"translate-x-full":"translate-x-[200%]"}
                            ${t==="gifs"?i[0].background:t==="stickers"?i[1].background:i[2].background}
                        `}),i.map(s=>e.jsx("span",{onClick:()=>a(s.value),className:"relative z-10 font-semibold py-2 w-1/3 text-center rounded-full cursor-pointer transition-all duration-300",children:s.title},s.title))]})]})})};function j(){const{gifApiKey:r,filter:t,gifs:a,setGifs:s,loading:o,setLoading:c}=l(),d=async()=>{const n=await(await fetch(`https://api.giphy.com/v1/${t}/trending?api_key=${r}&limit=20&rating=g`)).json();return s(n),c(!1),n};return u.useEffect(()=>{d()},[t]),e.jsxs(e.Fragment,{children:[e.jsx(m,{showTrendingIcon:!0}),e.jsx(g,{gifs:a,loading:o})]})}export{j as default};
