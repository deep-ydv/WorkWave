import React, { useState } from 'react'
import TaskWaveLogo from "./ui/TaskWaveLogo"
import { Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const NavBar = () => {
  const [openAccordion, setOpenAccordion] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    console.log(element);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  
  const navigate=useNavigate();
  const handleAuth=(text)=>{
    if(text=="login") navigate("/login");
    else if(text=="singup") navigate("/signup");
  }
  return (
    <>
      <div id='Top'></div>    
     <header  className="sticky top-0 z-50 w-full border-b bg-[#0b1322] text-white
  shadow-sm
 ">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <Workflow className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TaskWave
            </span> */}
            <div  className="w-[150px] sm:w-[200px] border- border-white"  onClick={() => scrollToSection("Top")}> 
              <TaskWaveLogo />
              </div>
 
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer bg-transparent border-none"
            >
              How it Works
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer bg-transparent border-none"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer bg-transparent border-none"
            >
              FAQ
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button onClick={()=>handleAuth("login")} className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-black   h-10 px-4 py-2">
              Login
            </button>
            <button onClick={()=>handleAuth("singup")} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-10 px-4 py-2" >
              Get Started
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 h-10 w-10"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-[#0b1322]">
            <div className="container px-4 py-4 space-y-4 max-w-7xl mx-auto">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="block w-full text-left text-sm font-medium hover:text-blue-600 transition-colors py-2"
              >
                How it Works
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left text-sm font-medium hover:text-blue-600 transition-colors py-2"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="block w-full text-left text-sm font-medium hover:text-blue-600 transition-colors py-2"
              >
                FAQ
              </button>
              <button onClick={()=>handleAuth("login")} className="block w-full text-left text-sm font-medium hover:text-blue-600 transition-colors py-2">
                Login
              </button>
            </div>
          </div>
        )}
      </header>
      </>

  )
}

export default NavBar