// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'

import AppLayout from './layouts/AppLayout'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import AuthCallback from './components/Auth/AuthCallback'

const Routes = () => {
  return (
    <Router>
      <Set wrap={AppLayout} title="CTP">
        <Private unauthenticated="auth">
          <Route path="/profile" page={UserLoggedInProfilePage} name="profile" />
          <Route path="/profile/edit" page={UserEditProfilePage} name="editProfile" />
        </Private>
        <Private unauthenticated="home" roles="admin">
          <Route path="/admin" page={Admin} name="admin" />
          <Set wrap={AdminLayout} title="Practices" titleTo="practices" buttonLabel="New Practice" buttonTo="newPractice">
            <Route path="/admin/practices/new" page={PracticeNewPracticePage} name="newPractice" />
            <Route path="/admin/practices/{id:Int}/edit" page={PracticeEditPracticePage} name="editPractice" />
            <Route path="/admin/practices/{id:Int}" page={PracticePracticePage} name="practice" />
            <Route path="/admin/practices" page={PracticePracticesPage} name="practices" />
          </Set>
          <Set wrap={AdminLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
            <Route path="/admin/users/new" page={AdminUserNewUserPage} name="newUser" />
            <Route path="/admin/users/{id:Int}/edit" page={AdminUserEditUserPage} name="editUser" />
            <Route path="/admin/users/{id:Int}" page={AdminUserUserPage} name="user" />
            <Route path="/admin/users" page={AdminUserUsersPage} name="users" />
          </Set>
          <Set wrap={AdminLayout} title="Organizations" titleTo="organizations" buttonLabel="New Organization" buttonTo="newOrganization">
            <Route path="/admin/organizations/new" page={OrganizationNewOrganizationPage} name="newOrganization" />
            <Route path="/admin/organizations/{id:Int}/edit" page={OrganizationEditOrganizationPage} name="editOrganization" />
            <Route path="/admin/organizations/{id:Int}" page={OrganizationOrganizationPage} name="organization" />
            <Route path="/admin/organizations" page={OrganizationOrganizationsPage} name="organizations" />
          </Set>
        </Private>
        <Route path="/explore/users" page={ExplorerPage} name="explorer_users" />
        <Route path="/explore/initiatives" page={ExplorerPage} name="explorer_initiatives" />
        <Route path="/user/{id:Int}" page={UserProfilePage} name="showUser" />
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set>
      <Set wrap={AuthLayout} title="Authentication">
        <Route path="/auth" page={LoginPage} name="auth" />
        <Private unauthenticated="auth">
          <Route path="/auth/callback" page={AuthCallback} name="authCallback" />
          <Route path="/signup" page={SignupPage} name="signup" />
        </Private>
      </Set>
      d
    </Router>
  )
}

export default Routes
