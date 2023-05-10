import DashBoard from "./layouts/Layout.jsx";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";
import Blogs from "./pages/Blogs.jsx";
import Login from "./pages/Login.jsx";
import Order from "./pages/Order.jsx";
import DetailOrder from "./pages/DetailOrder.jsx";
import Chat from "./pages/Chat.jsx";
import CreateBlogs from "./pages/CreateBlogs.jsx";
import UpdateBlog from "./pages/UpdateBlogs.jsx";
import Users from "./pages/Users.jsx";

import Ratings from "./pages/Ratings.jsx";
import CommentProduct from "./pages/CommentProduct.jsx";
import CommentBlog from "./pages/CommentBlog.jsx";
import Print from "./components/Print.jsx";

function AppRouter() {
  return (
    <Switch>
      <DashBoard path="/print" Component={Print} />
      <Route path="/login" component={Login} />
      <DashBoard path="/ratings/:id" Component={Ratings} />
      <DashBoard path="/comment/product/:id" Component={CommentProduct} />
      <DashBoard path="/comment/blogs/:id" Component={CommentBlog} />
      <DashBoard path="/user" Component={Users} />
      <DashBoard path="/chat" Component={Chat} />
      <DashBoard path="/orders/:id" Component={DetailOrder} />
      <DashBoard path="/orders" Component={Order} />
      <DashBoard path="/update-product/:id" Component={UpdateProduct} />
      <DashBoard path="/create-product" Component={CreateProduct} />
      <DashBoard path="/update-blog/:id" Component={UpdateBlog} />
      <DashBoard path="/create-blog" Component={CreateBlogs} />
      <DashBoard path="/product" Component={Product} />
      <DashBoard path="/blogs" Component={Blogs} />
      <DashBoard path="/home" Component={Home} />
      <DashBoard path="/*" Component={Home} />
    </Switch>
  );
}

export default AppRouter;
