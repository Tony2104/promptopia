import "@styles/globals.css";

import { Nav, Provider } from "@components";

export const metadata = {
	title: "Promptopia",
	description: "Discover & share AI Prompts",
};

function Layout({ children }) {
	return (
		<html lang="en">
			<body>
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>
					<main className="app">
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
}

export default Layout;
