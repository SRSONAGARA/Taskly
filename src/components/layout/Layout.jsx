import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { motion } from "framer-motion";
import { pageContainer, slideLeft, fadeIn } from "../../utils/animations";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.div variants={pageContainer} initial="hidden" animate="show" className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <motion.div variants={slideLeft} className="hidden md:block">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </motion.div>

      {/* Mobile Sidebar */}
      {mobileOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)} />}

      <motion.div
        variants={slideLeft}
        className={`fixed z-50 top-0 left-0 h-full bg-white md:hidden
        transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar collapsed={false} setCollapsed={() => {}} />
      </motion.div>

      {/* Content */}
      <motion.div variants={fadeIn} className="flex-1">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className=" bg-white min-h-screen">{children}</main>
      </motion.div>
    </motion.div>
  );
};

export default Layout;
