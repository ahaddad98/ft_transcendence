import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import ListUseres from "../components/Listuseres";

const UsersList = () => {
    const [data, setData] = useState()
    
    const fetchData = async () => {
        const response = await axios.get('http://localhost:3001/users/me/all', {headers: 
        { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        return response;
    };
    useEffect (() => {
        fetchData()
        .then((res) => {
            if (res.data)
            setData(res.data);
        })
        .catch((err) => {
            console.log(err);    
        });
    }, [])
    const [mydata, setmyData] = useState({})
    
    const fetchmyData = async () => {
        const response = await axios.get('http://localhost:3001/users/me', {headers: 
        { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        return response;
    };
    useEffect (() => {
        fetchmyData()
        .then((res) => {
            if (res.data)
            setmyData(res.data);
        })
        .catch((err) => {
            console.log(err);    
        });
    }, [])
    return (
        <div>
            {
                data && mydata && (
                <ListUseres data={data} mydata={mydata}/>
                )
            }
        </div>
        // <div>
        //     <HomeNavbar data={props}/>
        //     <div className="mb-16">
        //         <div className="container flex justify-center mx-auto pt-16">
        //             <div>
        //                 <h1 className="xl:text-4xl text-3xl text-center text-gray-800 font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto">USERS LIST</h1>
        //             </div>
        //         </div>
        //         <div className="w-full bg-gray-100 px-10 pt-10">
        //             <div className="container mx-auto">
        //                 <div role="list" aria-label="Behind the scenes People " className="space-x-px lg:flex md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around">
        //                     <div role="listitem" className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
        //                         <div className="rounded overflow-hidden shadow-md bg-white">
        //                             <div className="absolute -mt-20 w-full flex justify-center">
        //                                 <div className="h-32 w-32">
        //                                     <img src="https://cdn.tuk.dev/assets/photo-1564061170517-d3907caa96ea.jfif" alt="Display Picture of Andres Berlin" role="img" className="rounded-full object-cover h-full w-full shadow-md" />
        //                                 </div>
        //                             </div>
        //                             <div className="px-6 mt-16">
        //                                 <h1 className="font-bold text-3xl text-center mb-1">BADBOY</h1>
        //                                 <p className="text-gray-800 text-sm text-center">LEVEL 1</p>
        //                                 <div className="w-full flex justify-center pt-5 pb-5">
        //                                 </div>
        //                                 <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
		// 		                            <div role="button" aria-label="MAIN BUTTON"  className="inline-flex mt-2 xs:mt-0 bg-orange-500	">
		// 		                            	<button
        //                                             className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r">
        //                                             ADD
        //                                         </button>
		// 		                            </div>
		// 	                            </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div role="listitem" className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
        //                         <div className="rounded overflow-hidden shadow-md bg-white">
        //                             <div className="absolute -mt-20 w-full flex justify-center">
        //                                 <div className="h-32 w-32">
        //                                     <img src="https://cdn.tuk.dev/assets/photo-1564061170517-d3907caa96ea.jfif" alt="Display Picture of Andres Berlin" role="img" className="rounded-full object-cover h-full w-full shadow-md" />
        //                                 </div>
        //                             </div>
        //                             <div className="px-6 mt-16">
        //                                 <h1 className="font-bold text-3xl text-center mb-1">BADBOY</h1>
        //                                 <p className="text-gray-800 text-sm text-center">LEVEL 1</p>
        //                                 <div className="w-full flex justify-center pt-5 pb-5">
        //                                 </div>
        //                                 <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
		// 		                            <div role="button" aria-label="MAIN BUTTON"  className="inline-flex mt-2 xs:mt-0 bg-orange-500	">
		// 		                            	<button
        //                                             className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r">
        //                                             ADD
        //                                         </button>
		// 		                            </div>
		// 	                            </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div role="listitem" className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
        //                         <div className="rounded overflow-hidden shadow-md bg-white">
        //                             <div className="absolute -mt-20 w-full flex justify-center">
        //                                 <div className="h-32 w-32">
        //                                     <img src="https://cdn.tuk.dev/assets/photo-1564061170517-d3907caa96ea.jfif" alt="Display Picture of Andres Berlin" role="img" className="rounded-full object-cover h-full w-full shadow-md" />
        //                                 </div>
        //                             </div>
        //                             <div className="px-6 mt-16">
        //                                 <h1 className="font-bold text-3xl text-center mb-1">BADBOY</h1>
        //                                 <p className="text-gray-800 text-sm text-center">LEVEL 1</p>
        //                                 <div className="w-full flex justify-center pt-5 pb-5">
        //                                 </div>
        //                                 <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
		// 		                            <div role="button" aria-label="MAIN BUTTON"  className="inline-flex mt-2 xs:mt-0 bg-orange-500	">
		// 		                            	<button
        //                                             className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r">
        //                                             ADD
        //                                         </button>
		// 		                            </div>
		// 	                            </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div role="listitem" className="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
        //                         <div className="rounded overflow-hidden shadow-md bg-white">
        //                             <div className="absolute -mt-20 w-full flex justify-center">
        //                                 <div className="h-32 w-32">
        //                                     <img src="https://cdn.tuk.dev/assets/photo-1564061170517-d3907caa96ea.jfif" alt="Display Picture of Andres Berlin" role="img" className="rounded-full object-cover h-full w-full shadow-md" />
        //                                 </div>
        //                             </div>
        //                             <div className="px-6 mt-16">
        //                                 <h1 className="font-bold text-3xl text-center mb-1">BADBOY</h1>
        //                                 <p className="text-gray-800 text-sm text-center">LEVEL 1</p>
        //                                 <div className="w-full flex justify-center pt-5 pb-5">
        //                                 </div>
        //                                 <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
		// 		                            <div role="button" aria-label="MAIN BUTTON"  className="inline-flex mt-2 xs:mt-0 bg-orange-500	">
		// 		                            	<button
        //                                             className="text-sm text-indigo-50 transition duration-150 hover:bg-orange-400 font-semibold py-2 px-4 rounded-r">
        //                                             ADD
        //                                         </button>
		// 		                            </div>
		// 	                            </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        // </div>
        // </div>
    )
}

export default UsersList;