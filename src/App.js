import { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Users } from './users/pages/Users';
import NewRecipe from './recipes/pages/NewRecipe'
import Layout from './components/Layout';
import Public from './components/Public';
import Auth from './users/pages/Auth';
import DashLayout from './components/DashLayout';
import Welcome from './features/Welcome';
import UserRecipe from './recipes/pages/UserRecipe';
import UpdateRecipe from './recipes/pages/UpdateRecipe';
import { AuthContext } from './shared/context/auth-context';
import AllRecipes from './recipes/pages/AllRecipes';
import { useAuth } from './shared/hooks/auth-hook';
import AllCommentRecipe from './recipes/pages/AllCommentRecipe';
import { Searching } from './components/Searching';

function App() {

  const { login, logout, token, userId, name } = useAuth()

  let routes;

  if (token) {
    routes = (
      <Fragment>
        <Route path='/' element={<DashLayout />} >

          <Route index element={<Welcome />} />
          <Route path="/*" element={<Welcome />} />
          <Route path="users">
            <Route path="all" element={<Users />} />
            <Route path=":userId" element={<UserRecipe />} />

          </Route>

          <Route path="recipes">
            <Route path="new" element={<NewRecipe />} />
            <Route path=":recipeId" element={<UpdateRecipe />} />
            <Route path="all" element={<AllRecipes />} />
            <Route path="allcomments" element={<AllCommentRecipe />} />
            <Route path="searchresult" element={<Searching />} />
          </Route>

        </Route > //end dash routes
      </Fragment>
    )


  } else {
    routes = (
      <Fragment>

        <Route path='/' element={<Layout />}>

          <Route index element={<Public />} />
          <Route path='auth' element={<Auth />} />//login
          <Route path="/*" element={<Public />} />
        </Route>
      </Fragment>
    )
  }

  return (

    <AuthContext.Provider value={{
      isLoggedIn: !!token, //!!cast a variable to be true or false
      // login set to login function
      token: token,
      userId: userId,
      name: name,
      login: login,
      logout: logout
    }}>
      <Routes>
        {routes}

      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
