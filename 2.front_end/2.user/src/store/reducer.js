import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import PopupAlert from "../utils/Swal.js";
import {
  actionCartCreate,
  actionCartGets,
  actionCartItemDelete,
  actionCartItemUpdate,
  actionCommentBlogCreate,
  actionCommentBlogGet,
  actionCommentProductCreate,
  actionCommentProductGet,
  actionNewsList,
  actionNewsListAdd,
  actionOrderCancel,
  actionOrderGetIdUser,
  actionPaymentVnpay,
  actionProductList,
  actionProductListAdd,
  actionProductListAmount,
  actionProductListSearch,
  actionRateProductCreate,
  actionUserCookie,
  actionUserLogin,
  actionUserLogout,
  actionUserSignup,
} from "./action.js";

const initialState = {
  user: null,
  carts: [],
  status: 0,
  commentBlogs: [],
  commentProducts: [],
  orders: [],
  paymentUrl: null,
  amounts: [],
  loading: true,
  products: [],
  count: 0,
  blogs: [],
  searchList: []
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setUser: (state, { meta, payload, type }) => {
      state.user = payload;
    },
    setLoading: (state, { meta, payload, type }) => {
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      actionUserLogin.fulfilled,
      (state, { meta, payload, type }) => {
        state.user = payload;
        window.location.href = "/"

      }
    );
    builder.addCase(
      actionUserLogin.rejected,
      (state, { meta, payload, type }) => {
        PopupAlert("Mật khẩu không đúng!")
      }
    );

    builder.addCase(
      actionOrderGetIdUser.fulfilled,
      (state, { meta, payload, type }) => {
        state.orders = payload.data;
      }
    );

    builder.addCase(
      actionUserSignup.fulfilled,
      (state, { meta, payload, type }) => {

        PopupAlert("Đăng ký thành công !", "/");

      }
    );
    builder.addCase(
      actionOrderCancel.fulfilled,
      (state, { meta, payload, type }) => {
        PopupAlert("Hủy bỏ thành công !");
      }
    );

    builder.addCase(
      actionOrderCancel.rejected,
      (state, { meta, payload, type }) => {
        PopupAlert("Hủy bỏ thất bại !");
      }
    );

    builder.addCase(
      actionUserSignup.rejected,
      (state, { meta, payload, type }) => {
        PopupAlert("Đăng ký thất bại !");
      }
    );

    builder.addCase(
      actionCartGets.fulfilled,
      (state, { meta, payload, type }) => {
        state.carts = payload.data;
      }
    );

    builder.addCase(
      actionUserLogout.fulfilled,
      (state, { meta, payload, type }) => {
        state.user = null;
        window.location.href = "/"
      }
    );
    builder.addCase(
      actionPaymentVnpay.fulfilled,
      (state, { meta, payload, type }) => {
        state.paymentUrl = payload.data;
      }
    );
    builder.addCase(
      actionCartCreate.fulfilled,
      (state, { meta, payload, type }) => {
        // PopupAlert("Đặt hàng thành công !");
        window.location.href="/"

      }
    );
    builder.addCase(
      actionCartCreate.rejected,
      (state, { meta, payload, type }) => {
        PopupAlert("Đặt hàng thất bại!");

      }
    );

    builder.addCase(
      actionUserCookie.fulfilled,
      (state, { meta, payload, type }) => {
        state.user = payload;
      }
    );
    builder.addCase(
      actionCartItemUpdate.fulfilled,
      (state, { meta, payload, type }) => {

        // state.user = payload;
      }
    );



    // builder.addCase(
    //   actionCommentBlogCreate.fulfilled,
    //   (state, { meta, payload, type }) => {
    //     console.log(payload); //comment
    //   }
    // );

    builder.addCase(
      actionCommentBlogGet.fulfilled,
      (state, { meta, payload, type }) => {
        state.commentBlogs = payload.data;
      }
    );

    // builder.addCase(
    //   actionCommentProductCreate.fulfilled,
    //   (state, { meta, payload, type }) => {
    //     console.log(payload); //comment
    //   }
    // );

    builder.addCase(
      actionCommentProductGet.fulfilled,
      (state, { meta, payload, type }) => {
        state.commentProducts = payload.data;
      }
    );
    builder.addCase(
      actionRateProductCreate.fulfilled,
      (state, { meta, payload, type }) => {
        PopupAlert("Cảm ơn bạn đã đánh giá !");

      }
    );
    builder.addCase(
      actionRateProductCreate.rejected,
      (state, { meta, payload, type }) => {
        PopupAlert("Đánh giá thất bại!");

      }
    );
    builder.addCase(
      actionProductListAmount.fulfilled,
      (state, { meta, payload, type }) => {
        state.amounts = payload.data
      }
    );
    builder.addCase(
      actionProductList.fulfilled, (state, { meta, payload, type }) => {
        state.count = payload.count

        state.products = payload.data
      }
    );
    builder.addCase(
      actionProductListAdd.fulfilled,
      (state, { meta, payload, type }) => {
        state.products = state.products.concat(payload.data)
      }
    );
    builder.addCase(
      actionNewsList.fulfilled, (state, { meta, payload, type }) => {
        state.blogs = payload.data
      }
    );
    builder.addCase(
      actionNewsListAdd.fulfilled, (state, { meta, payload, type }) => {
        state.blogs = state.blogs.concat(payload.data)
      }
    );
    builder.addCase(
      actionProductListSearch.fulfilled, (state, { meta, payload, type }) => {
        state.searchList = payload.data
      }
    )


  },
});

// Action creators are generated for each case reducer function
export const { setUser, setLoading } = storeSlice.actions;
export default storeSlice.reducer;
