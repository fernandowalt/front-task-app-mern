/** @format */

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { ConfirmAccount } from "./pages/ConfirmAccount";
import { ForgetPassword } from "./pages/ForgetPassword";
import { Login } from "./pages/Login";
import { NewPassword } from "./pages/NewPassword";
import { Register } from "./pages/Register";
import { AuthProvider } from "./context/AuthProvider";
import { ProjectsProvider } from "./context/ProjectsProvider";

import { ProtectedRoute } from "./layouts/ProtectedRoute";
import { Projects } from "./pages/Projects";
import { CreateProject } from "./pages/CreateProject";
import { Project } from "./pages/Project";
import { EditProject } from "./pages/EditProject";
import { NewCollaborator } from "./pages/NewCollaborator";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<ProjectsProvider>
					<Routes>
						<Route path="/" element={<AuthLayout />}>
							<Route index element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/forget-password" element={<ForgetPassword />} />
							<Route path="/new-password/:id" element={<NewPassword />} />
							<Route path="/confirm/:id" element={<ConfirmAccount />} />
						</Route>

						<Route path="/projects" element={<ProtectedRoute />}>
							<Route index element={<Projects />} />
							<Route path="create-project" element={<CreateProject />} />
							<Route path=":id" element={<Project />} />
							<Route path="edit/:id" element={<EditProject />} />

							<Route path="collaborators/:id" element={<NewCollaborator />} />
						</Route>
					</Routes>
				</ProjectsProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
