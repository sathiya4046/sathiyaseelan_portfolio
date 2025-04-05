import React from 'react'

const Education = () => {
  return (
    <section className="h-svh py-38 lg:pt-52">
          <h1 className="text-3xl md:text-4xl text-center font-bold mb-10">Education</h1>
          <div className=' lg:w-[80%] xl:w-[60%] lg:mx-auto'>
            <div className=' overflow-x-auto'>
              <table className="table text-center">
                <thead>
                  <tr>
                    <th className="p-3 font-SansOne md:text-lg xl:text-xl">Course</th>
                    <th className="p-3 font-SansOne md:text-lg xl:text-xl">College / School</th>
                    <th className="p-3 font-SansOne md:text-lg xl:text-xl">Percentage</th>
                    <th className="p-3 font-SansOne md:text-lg xl:text-xl">Passed out</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-5">B.E</td>
                    <td className="p-5">University College Of Engineering, Thirukkuvalai, Nagappattinam</td>
                    <td className="p-5">69.4%</td>
                    <td className="p-5">2015</td>
                  </tr>
                  <tr>
                    <td className="p-5">HSC</td>
                    <td className="p-5">St. Antony’s Higher Secondary School, Thanjavur</td>
                    <td className="p-5">83%</td>
                    <td className="p-5">2011</td>
                  </tr>
                  <tr>
                    <td className="p-5">SSLC</td>
                    <td className="p-5">St. Antony’s Higher Secondary School, Thanjavur</td>
                    <td className="p-5">89%</td>
                    <td className="p-5">2009</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <dl className="space-y-2 mt-3 mx-auto text-justify p-4">
                  <dt className='text-xl md:text-2xl font-semibold font-SansOne'>Certifications</dt>
                  <hr/>
                    <dd><h5>Web Development Bootcamp - Udemy</h5></dd>
                    <dd><h5>Full Stack web Development - Kgisl, Coimbatore</h5></dd>
                    <dd>
                    </dd>
            </dl>
          </div>
        </section>
  )
}

export default Education