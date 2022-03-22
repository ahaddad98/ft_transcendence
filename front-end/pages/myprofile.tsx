import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import Profile from "../components/Profile";

const Myprofile = () => {
  const [myprofile, setMyprofile] = useState({})
    const fetchmyprofile = async () => {
        const response = await axios.get('http://localhost:3001/profile/me', {headers: 
        { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        return response;
    };
    useEffect (() => {
        fetchmyprofile()
        .then((res) => {
            if (res.data)
            {
                setMyprofile(res.data);
            }
        })
        .catch((err) => {
            console.log(err);    
        });
    }, [])
    useEffect(() => {
      console.log(myprofile);
    }, [myprofile])
    return (
        <Profile mydata={myprofile} me={"me"}/>
    // <div className="profile-page">

    //     {/* <HomeNavbar /> */}
    //         <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
    //       <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />
    //     <section className="relative block h-500-px">
    //         <div className="absolute top-0 w-full h-full bg-center bg-cover bg-orange-500">
    //             <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
    //         </div>
    //         <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" >
    //             <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
    //                 <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
    //             </svg>
    //         </div>
    //     </section>
    //     <section className="relative py-16 bg-blueGray-200">
    //         <div className="container mx-auto px-4">
    //           <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
    //             <div className="px-6">
    //               <div className="flex flex-wrap justify-center">
    //                 <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
    //                   <div className="relative">
    //                     <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
    //                   </div>
    //                 </div>
    //                 <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
    //                   <div className="py-6 px-3 mt-32 sm:mt-0">
    //                     <button className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
    //                       Connect
    //                     </button>
    //                   </div>
    //                 </div>
    //                 <div className="w-full lg:w-4/12 px-4 lg:order-1">
    //                   <div className="flex justify-center py-4 lg:pt-4 pt-8">
    //                     <div className="mr-4 p-3 text-center">
    //                       <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span>
    //                     </div>
    //                     <div className="mr-4 p-3 text-center">
    //                       <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Scores</span>
    //                     </div>
    //                     <div className="lg:mr-4 p-3 text-center">
    //                       <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Level</span>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="text-center mt-12">
    //                 <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
    //                   hehehe
    //                 </h3>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //     </section>
    // </div>
    )
}
export default Myprofile;