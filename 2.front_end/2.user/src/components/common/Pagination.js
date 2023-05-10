import React from 'react';

const Pagination = ({ count, perPage, page, changePage }) => {
  console.log(count, perPage)


    function hanlePagination(){
      let listBtnPagination = []
      for(var i=0;i<5;i++){
        if (page==1){
          listBtnPagination.push(<button onClick={()=>{
            changePage(page + i)
          }} className={`border w-10 h-10 rounded-3xl border-dashed border-teal-500 ${i == 1 ? "bg-teal-100 " : ""}`}>
            {page+i }
          </button>)
        }else if(page==2){
          listBtnPagination.push(<button onClick={() => {
            changePage(page - 1 + i)
          }} className={`border w-10 h-10 rounded-3xl border-dashed border-teal-500 ${i == 1 ?"bg-teal-100 ":"" }`}>
            {page - 1 + i}
          </button>)
        }
        else{
          listBtnPagination.push(<button onClick={() => {
            changePage(page - 2 + i)
          }} className={`border w-10 h-10 rounded-3xl border-dashed border-teal-500 ${i == 1 ? "bg-teal-100 " : ""}`}>
            {page - 2 + i}
          </button>)
        }
      }

    
      return listBtnPagination
    }
    return (
      <div className="flex gap-2 items-center">
        <div className="mr-5">Tổng {count} sản phẩm</div>
        <button className="">Đầu tiên</button>
        <button className="border w-10 h-10 rounded-3xl border-dashed border-teal-500">
          &lt;
        </button>
        {}
        {hanlePagination()}
        <button className="border w-10 h-10 rounded-3xl border-dashed border-teal-500">
          &gt;
        </button>
        <button className="">Cuối cùng</button>
      </div>
    );
}

export default Pagination;
