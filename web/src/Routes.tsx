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
      <Route path="/initiatives" page={InitiativesPage} name="initiatives" />
      <Set wrap={AppLayout} title="CTP">
        <Private unauthenticated="auth">
          <Route path="/profile" page={UserLoggedInProfilePage} name="profile" />
          <Route path="/profile/edit" page={UserEditProfilePage} name="editProfile" />
        </Private>
        <Private unauthenticated="home" roles="admin">
          <Route path="/admin" page={Admin} name="admin" />
          <Set wrap={AdminLayout} title="Practices" titleTo="practices" buttonLabel="New Practice" buttonTo="newPractice">
            <Route path="/admin/practices/new" page={AdminPracticeNewPracticePage} name="newPractice" />
            <Route path="/admin/practices/{id:Int}/edit" page={AdminPracticeEditPracticePage} name="editPractice" />
            <Route path="/admin/practices/{id:Int}" page={AdminPracticePracticePage} name="practice" />
            <Route path="/admin/practices" page={AdminPracticePracticesPage} name="practices" />
          </Set>
          <Set wrap={AdminLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
            <Route path="/admin/users/new" page={AdminUserNewUserPage} name="newUser" />
            <Route path="/admin/users/{id:Int}/edit" page={AdminUserEditUserPage} name="editUser" />
            <Route path="/admin/users/{id:Int}" page={AdminUserUserPage} name="user" />
            <Route path="/admin/users" page={AdminUserUsersPage} name="users" />
          </Set>
          <Set wrap={AdminLayout} title="Organizations" titleTo="organizations" buttonLabel="New Organization" buttonTo="newOrganization">
            <Route path="/admin/organizations/new" page={AdminOrganizationNewOrganizationPage} name="newOrganization" />
            <Route path="/admin/organizations/{id:Int}/edit" page={AdminOrganizationEditOrganizationPage} name="editOrganization" />
            <Route path="/admin/organizations/{id:Int}" page={AdminOrganizationOrganizationPage} name="organization" />
            <Route path="/admin/organizations" page={AdminOrganizationOrganizationsPage} name="organizations" />
          </Set>
          <Set wrap={AdminLayout} title="Networks" titleTo="adminNetworks" buttonLabel="New Network" buttonTo="adminNewNetwork">
            <Route path="/admin/networks/new" page={AdminNetworkNewNetworkPage} name="adminNewNetwork" />
            <Route path="/admin/networks/{id:Int}/edit" page={AdminNetworkEditNetworkPage} name="adminEditNetwork" />
            <Route path="/admin/networks/{id:Int}" page={AdminNetworkNetworkPage} name="adminNetwork" />
            <Route path="/admin/networks" page={AdminNetworkNetworksPage} name="adminNetworks" />
          </Set>
          <Set wrap={AdminLayout} title="Competences" titleTo="adminCompetences" buttonLabel="New Competence" buttonTo="adminNewCompetence">
            <Route path="/admin/competences/new" page={AdminCompetenceNewCompetencePage} name="adminNewCompetence" />
            <Route path="/admin/competences/{id:Int}/edit" page={AdminCompetenceEditCompetencePage} name="adminEditCompetence" />
            <Route path="/admin/competences/{id:Int}" page={AdminCompetenceCompetencePage} name="adminCompetence" />
            <Route path="/admin/competences" page={AdminCompetenceCompetencesPage} name="adminCompetences" />
          </Set>
          <Set wrap={AdminLayout} title="Resources" titleTo="adminResources" buttonLabel="New Resource" buttonTo="adminNewResource">
            <Route path="/admin/resources/new" page={AdminResourceNewResourcePage} name="adminNewResource" />
            <Route path="/admin/resources/{id:Int}/edit" page={AdminResourceEditResourcePage} name="adminEditResource" />
            <Route path="/admin/resources/{id:Int}" page={AdminResourceResourcePage} name="adminResource" />
            <Route path="/admin/resources" page={AdminResourceResourcesPage} name="adminResources" />
          </Set>
          <Set wrap={AdminLayout} title="Sponsors" titleTo="adminSponsors" buttonLabel="New Sponsor" buttonTo="adminNewSponsor">
            <Route path="/admin/sponsors/new" page={AdminSponsorNewSponsorPage} name="adminNewSponsor" />
            <Route path="/admin/sponsors/{id:Int}/edit" page={AdminSponsorEditSponsorPage} name="adminEditSponsor" />
            <Route path="/admin/sponsors/{id:Int}" page={AdminSponsorSponsorPage} name="adminSponsor" />
            <Route path="/admin/sponsors" page={AdminSponsorSponsorsPage} name="adminSponsors" />
          </Set>
          <Set wrap={AdminLayout} title="Subjects" titleTo="adminSubjects" buttonLabel="New Subject" buttonTo="adminNewSubject">
            <Route path="/admin/subjects/new" page={AdminSubjectNewSubjectPage} name="adminNewSubject" />
            <Route path="/admin/subjects/{id:Int}/edit" page={AdminSubjectEditSubjectPage} name="adminEditSubject" />
            <Route path="/admin/subjects/{id:Int}" page={AdminSubjectSubjectPage} name="adminSubject" />
            <Route path="/admin/subjects" page={AdminSubjectSubjectsPage} name="adminSubjects" />
          </Set>
          <Set wrap={AdminLayout} title="Initiatives" titleTo="adminInitiatives" buttonLabel="New Initiative" buttonTo="adminNewInitiative">
            <Route path="/admin/initiatives/new" page={AdminInitiativeNewInitiativePage} name="adminNewInitiative" />
            <Route path="/admin/initiatives/{id:Int}/edit" page={AdminInitiativeEditInitiativePage} name="adminEditInitiative" />
            <Route path="/admin/initiatives/{id:Int}" page={AdminInitiativeInitiativePage} name="adminInitiative" />
            <Route path="/admin/initiatives" page={AdminInitiativeInitiativesPage} name="adminInitiatives" />
          </Set>
          <Set wrap={AdminLayout} title="Levels" titleTo="adminLevels" buttonLabel="New Level" buttonTo="adminNewLevel">
            <Route path="/admin/levels/new" page={AdminLevelNewLevelPage} name="adminNewLevel" />
            <Route path="/admin/levels/{id:Int}/edit" page={AdminLevelEditLevelPage} name="adminEditLevel" />
            <Route path="/admin/levels/{id:Int}" page={AdminLevelLevelPage} name="adminLevel" />
            <Route path="/admin/levels" page={AdminLevelLevelsPage} name="adminLevels" />
          </Set>
          <Set wrap={AdminLayout} title="Tags" titleTo="adminTags" buttonLabel="New Tag" buttonTo="adminNewTag">
            <Route path="/admin/tags/new" page={AdminTagNewTagPage} name="adminNewTag" />
            <Route path="/admin/tags/{id:Int}/edit" page={AdminTagEditTagPage} name="adminEditTag" />
            <Route path="/admin/tags/{id:Int}" page={AdminTagTagPage} name="adminTag" />
            <Route path="/admin/tags" page={AdminTagTagsPage} name="adminTags" />
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
