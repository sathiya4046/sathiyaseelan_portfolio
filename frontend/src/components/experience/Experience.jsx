import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";

const Experience = () => {
    useEffect(() => {
      AOS.init();
      AOS.refresh();
    }, []);

  return (
      <section className="lg:w-[80%] mx-auto py-28 lg:pt-52">
            <h1 className="text-3xl md:text-4xl text-center font-bold mb-10">Experience</h1>
                  <div 
                    className="grid md:grid-cols-2 gap-10">
                <dl data-aos="fade-down-right" className="space-y-2 mt-3 p-md-4 mx-auto text-justify p-4">
                  <dt><h5 className='text-xl md:text-2xl'>Jaya info-soft Pvt ltd, Chennai</h5> </dt>
                  <dd className='font-semibold'>Frontend Developer </dd>
                  <dd><small className='font-josefin'> Apr 2023 - Present</small> </dd>
                  <hr/>
                  <dd>
                  <ul className='space-y-4 font-mono text-justify'>
                      <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Developed responsive and user-friendly interfaces that work on all devices, ensuring reusable code for future projects.   </li>
                      <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Collaborated with designers and backend developers to integrate APIs and ensure smooth data flow, validating user input before backend submission.  </li>
                      <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Implemented RESTful APIs for seamless data communication and real-time updates using Axios to handle HTTP requests and responses.</li>
                      <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Maintaining and updating websites by adding new features, improving performance, and fixing bugs.  </li>
                      <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span>	Ensured 100% mobile optimization by implementing adaptive designs for all device views. </li>
                      <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Optimized front-end code, improving application speed and reducing loading time. </li>
                      <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span>	Regularly updated websites by adding new features, improving performance, and fixing bugs.  </li>
                    </ul>
                  </dd>
                </dl>
                <dl data-aos="fade-down-left" className="space-y-2 mt-3 mx-auto text-justify p-4">
                <dt><h5 className='text-xl md:text-2xl'>City centre, Cambodia </h5> </dt>
                  <dd><h5 className='font-semibold'>Customer Support </h5></dd>
                  <dd><small className='font-josefin'>Apr 2022 – Mar 2023</small></dd>
                  <hr/>
                  <dd>
                  <ul className='space-y-4 text-justify font-mono'>
                    <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Handle inbound customer inquiries via phone, email, chat, or social media.</li>
                    <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Together with my manager and team head, we listen to their ideas and complete the work very quickly </li>
                    <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Coordinate with my team and implement new ideas for the project </li>
                    <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Effectively communicate with customers to understand their needs and resolve their issues.</li>
                    <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Follow up with customers to ensure their issues are resolved and they are satisfied with the outcome.</li>
                    <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Stay up-to-date with product knowledge and customer support best practices.</li>
                    <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Ensure high levels of customer satisfaction through excellent service.</li>
                    </ul>
                  </dd>
                </dl>
                <dl data-aos="fade-down-right" className="space-y-2 mt-3 mx-auto text-justify p-4">
                <dt><h5 className='text-xl md:text-2xl'>Pesko Engineering Pte Ltd, Singapore  </h5> </dt>
                  <dd><h5 className='font-semibold'>Electrical Fitter  </h5></dd>
                  <dd><small className='font-josefin'>Dec 2018 – Dec 2019 </small></dd>
                  <hr/>
                  <dd>
                  <ul className='space-y-4 text-justify font-mono'>
                    <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Install and Maintenance of the all electrical work and fitting works </li>
                    <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Install the control and distribution panels and calculate utility loads.</li>
                    <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Attending management meetings & work related issues </li>
                    <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Follow the preventive maintenance and update the record. </li>
                    </ul>
                  </dd>
                </dl>
                <dl data-aos="fade-down-left" className="space-y-2 mt-3 mx-auto text-justify p-4">
                <dt><h5 className='text-xl md:text-2xl'>NVH India Auto Parts Pvt Ltd, Chennai</h5> </dt>
                  <dd><h5 className='font-semibold'>Graduate Engineering Trainee</h5></dd>
                  <dd><small className='font-josefin'>Mar 2016 - Mar 2018</small></dd>
                  <hr/>
                  <dd>
                  <ul className='space-y-4 text-justify font-mono'>
                    <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> To follow the TPM process(5s&3c) </li>
                    <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> To follow the man power analysis </li>
                    <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Provide day to day guidance, management & training for the inspection team. Implement and manage documentation  </li>
                    <li><span className="bg-gradient-to-r from-red-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">==&gt;</span> Maintain team discipline in conjunction with HR legal obligations, 
                    compliance & risk management  </li>
                    </ul>
                  </dd>
                </dl>
                </div>            
        </section>
  )
}

export default Experience