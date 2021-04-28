import { Route, BrowserRouter } from "react-router-dom";
import {
  Home,
  Form,
  Login,
  Profile,
  AdminSeeUsers,
  AdminAddUsers,
  AdminSeeGroups,
  AdminAssignGroup,
  PostCreate,
  Forum,
  ForumCreate,
  ForumAssign,
  SeeForum,
  SeePost,
  AdminCreateGroup,
  SuperAdminCreateAdmin,
  SuperAdminAddCollege,
  SuperAdminAssignAdmin,
  SuperAdminSeeAdmin,
  SuperAdminSeeCollege,
} from "../../views";
import { NavBar } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { isAutheticated } from "../../_helpers";
import { authSuccess, authError } from "../../redux/auth/authActions";

function CustomRouter() {
  const { user } = isAutheticated();
  const dispatch = useDispatch();
  dispatch(authSuccess(user));
  return (
    <BrowserRouter>
      <Route exact path="/">
        <NavBar user={user} />
        <Home />
      </Route>
      <Route exact path="/home">
        <NavBar user={user} />
        <Home />
      </Route>
      <Route exact path="/register">
        <NavBar user={user} />
        <Form />
      </Route>
      <Route exact path="/login">
        <NavBar user={user} />
        <Login />
      </Route>
      <Route path="/profile/:username">
        <NavBar user={user} />
        <Profile />
      </Route>
      <Route exact path="/admin">
        <NavBar user={user} />
        <AdminSeeUsers />
      </Route>
      <Route exact path="/admin/see">
        <NavBar user={user} />
        <AdminSeeUsers />
      </Route>
      <Route exact path="/admin/add">
        <NavBar user={user} />
        <AdminAddUsers />
      </Route>
      <Route exact path="/admin/group/add">
        <NavBar user={user} />
        <AdminCreateGroup />
      </Route>
      <Route exact path="/admin/group/see">
        <NavBar user={user} />
        <AdminSeeGroups />
      </Route>
      <Route exact path="/admin/group/assign">
        <NavBar user={user} />
        <AdminAssignGroup />
      </Route>
      <Route exact path="/super-admin/institute/add">
        <NavBar user={user} />
        <SuperAdminAddCollege />
      </Route>
      <Route exact path="/super-admin/institute/see">
        <NavBar user={user} />
        <SuperAdminSeeCollege />
      </Route>
      <Route exact path="/super-admin">
        <NavBar user={user} />
        <SuperAdminSeeCollege />
      </Route>
      <Route exact path="/super-admin/admin/see">
        <NavBar user={user} />
        <SuperAdminSeeAdmin />
      </Route>
      <Route exact path="/super-admin/admin/create">
        <NavBar user={user} />
        <SuperAdminCreateAdmin />
      </Route>
      <Route exact path="/super-admin/admin/assign">
        <NavBar user={user} />
        <SuperAdminAssignAdmin />
      </Route>
      <Route exact path="/forum/see/:forumName">
        <NavBar user={user} />
        <Forum />
      </Route>
      <Route exact path="/forum/create">
        <NavBar user={user} />
        <ForumCreate />
      </Route>
      <Route exact path="/forum/see">
        <NavBar user={user} />
        <SeeForum />
      </Route>
      <Route exact path="/forum/assign">
        <NavBar user={user} />
        <ForumAssign />
      </Route>
      <Route path="/forum/:id/post/create" exact>
        <NavBar user={user} />
        <PostCreate />
      </Route>
      <Route path="/post/see">
        <NavBar user={user} />
        <SeePost />
      </Route>
    </BrowserRouter>
  );
}

export default CustomRouter;
