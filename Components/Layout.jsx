import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <div className="flex h-screen items-start justify-center" id="layout">
      <Sidebar />
      <main className="h-full w-full overflow-auto mx-auto bg-slate-50">
        <Header/>
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
