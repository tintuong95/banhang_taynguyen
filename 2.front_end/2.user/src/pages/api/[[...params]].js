import httpProxy from "http-proxy";




const proxy = httpProxy.createProxyServer({});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
try{
return new Promise((resolve, reject) => {
   proxy.web(req, res, {
     target: `${process.env.NEXT_PUBLIC_HOST}`,
     changeOrigin: true,
     selfHandleResponse: false,
   });
   proxy.once("proxyRes", () => {
     resolve(true);
   });
})

}catch(error){
    console.log(error)
}
}
