import React from 'react'

function Footer() {
  return (
    <footer className="bg-white py-4 border-t border-slate-200 mt-8">
      <div className="container">
        <div className="sm:flex sm:flex-wrap md:py-4">
          <div className="text-center sm:text-left sm:w-1/2 md:w-1/4 xl:w-1/6">
            <h5 className="text-xl font-bold mb-4">Features</h5>
            <ul className="list-none footer-links">
              <li className="mb-2">
                <a href="/" className="border-b border-solid border-transparent hover:border-purple-800">Cool stuff</a>
              </li>
              <li className="mb-2">
                <a href="/" className="border-b border-solid border-transparent hover:border-purple-800">Random feature</a>
              </li>
              <li className="mb-2">
                <a href="/" className="border-b border-solid border-transparent hover:border-purple-800">Team feature</a>
              </li>
              <li className="mb-2">
                <a href="/" className="border-b border-solid border-transparent hover:border-purple-800">Stuff for developers</a>
              </li>
              <li className="mb-2">
                <a href="/" className="border-b border-solid border-transparent hover:border-purple-800">Another one</a>
              </li>
              <li className="mb-2">
                <a href="/" className="border-b border-solid border-transparent hover:border-purple-800">Last time</a>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left sm:w-1/2 md:w-1/4 xl:w-1/6 sm:mt-0">
            <h5 className="text-xl font-bold mb-6">Resources</h5>
            <ul className="list-none footer-links">
              <li className="mb-2">
                <a href="/" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Resource</a>
              </li>
              <li className="mb-2">
                <a href="/" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Resource name</a>
              </li>
              <li className="mb-2">
                <a href="/" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Another resource</a>
              </li>
              <li className="mb-2">
                <a href="/" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Final resource</a>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left sm:w-1/2 md:w-1/4 xl:w-1/6 md:mt-0">
            <h5 className="text-xl font-bold mb-6">About</h5>
            <ul className="list-none footer-links">
              <li className="mb-2">
                <a href="/" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Team</a>
              </li>
              <li className="mb-2">
                <a href="/" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Locations</a>
              </li>
              <li className="mb-2">
                <a href="/" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Privacy</a>
              </li>
              <li className="mb-2">
                <a href="/" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Terms</a>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left sm:w-1/2 md:w-1/4 xl:w-1/6 mt-4 md:mt-0">
            <h5 className="text-xl font-bold mb-6">Help</h5>
            <ul className="list-none footer-links">
              <li className="mb-2">
                <a href="/" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Support</a>
              </li>
              <li className="mb-2">
                <a href="/" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Help Center</a>
              </li>
              <li className="mb-2">
                <a href="/" className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left mt-4 sm:w-1/3 xl:w-1/6 sm:mx-auto xl:mt-0 xl:ml-auto flex flex-col items-center">
            <h5 className="text-xl font-bold mb-6 sm:text-center xl:text-left">Stay connected</h5>
            <div className="flex justify-center sm:justify-center xl:justify-start">
              <a href='/' className="w-8 h-8 border border-slate-400 rounded-full text-center py-1 text-gray-600 hover:text-white hover:bg-blue-600 hover:border-blue-600">
                <i className="fab fa-facebook" />
              </a>
              <a href='/' className="w-8 h-8 border border-slate-400 rounded-full text-center py-1 ml-2 text-gray-600 hover:text-white hover:bg-blue-400 hover:border-blue-400">
                <i className="fab fa-twitter" />
              </a>
              <a href='/' className="w-8 h-8 border border-slate-400 rounded-full text-center py-1 ml-2 text-gray-600 hover:text-white hover:bg-red-600 hover:border-red-600">
                <i className="fab fa-google-plus-g" />
              </a>
            </div>
          </div>
        </div>
        {/* <div className="text-center sm:text-left sm:flex sm:flex-wrap sm:-mx-4 mt-4 pt-4 border-t">
          <div className="sm:w-full px-4 md:w-1/6">
            <strong>FWR</strong>
          </div>
          <div className="sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
            <h6 className="font-bold mb-2">Address</h6>
            <address className="not-italic mb-4 text-sm">
              123 6th St.<br />
              Melbourne, FL 32904
            </address>
          </div>
          <div className="sm:w-1/2 md:w-1/4 mt-4 md:mt-0">
            <h6 className="font-bold mb-2">Free Resources</h6>
            <p className="mb-4 text-sm">Use our HTML blocks for <strong>FREE</strong>.<br />
              <em>All are MIT License</em></p>
          </div>
          <div className="md:w-1/4 md:ml-auto mt-6 sm:mt-4 md:mt-0">
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white">Get Started</button>
          </div>
        </div> */}
      </div>
    </footer>
  )
}

export default Footer