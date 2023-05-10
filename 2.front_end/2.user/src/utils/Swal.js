import Swal from "sweetalert2";


export default function PopupAlert (string,href){
    Swal.fire({
      title: "THÔNG BÁO",
      text: string,
      imageUrl: "https://i.imgur.com/GX3Swno.png",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
      confirmButtonText: "Xác nhận",
      
    }).then((result)=>{
      if(href && result.isConfirmed){
        window.location.href=href
      }
    });
}