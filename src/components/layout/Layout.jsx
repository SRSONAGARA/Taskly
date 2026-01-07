import { useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`fixed z-50 top-0 left-0 h-full bg-white md:hidden
        transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar collapsed={false} setCollapsed={() => {}} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className=" bg-white min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
