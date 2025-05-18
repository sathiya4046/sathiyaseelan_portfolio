import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const experienceData = [
  {
    company: 'Jaya info-soft Pvt ltd, Chennai',
    role: 'Web Developer',
    duration: 'Aug 2023 - Present',
    points: [
        'Developed responsive and user-friendly interfaces that work on all devices, ensuring reusable code for future projects.',
        'Collaborated with designers and backend developers to integrate APIs and ensure smooth data flow, validating user input before backend submission.',
        'Implemented RESTful APIs for seamless data communication and real-time updates using Axios to handle HTTP requests and responses.',
        'Maintaining and updating websites by adding new features, improving performance, and fixing bugs.',
        'Ensured 100% mobile optimization by implementing adaptive designs for all device views.',
        'Optimized front-end code, improving application speed and reducing loading time.',
        'Regularly updated websites by adding new features, improving performance, and fixing bugs.'
      
    ],
    direction: 'right'
  },
  {
    company: 'City centre, Cambodia',
    role: 'Customer Support',
    duration: 'Apr 2022 – Jul 2023',
    points: [
      'Handle inbound customer inquiries via phone, email, chat, or social media.',
      'Together with my manager and team head, we listen to their ideas and complete the work very quickly',
      'Coordinate with my team and implement new ideas for the project',
      'Effectively communicate with customers to understand their needs and resolve their issues.',
      'Follow up with customers to ensure their issues are resolved and they are satisfied with the outcome.',
      'Stay up-to-date with product knowledge and customer support best practices.',
      'Ensure high levels of customer satisfaction through excellent service.'
    ],
    direction: 'left'
  },
  {
    company: 'Pesko Engineering pte Ltd, Singapore',
    role: 'Electrical Fitter',
    duration: 'Dec 2018 – Dec 2019',
    points: [
      'Install and Maintenance of the all electrical work and fitting works',
      'Install the control and distribution panels and calculate utility loads.',
      'Follow the preventive maintenance and update the record.',
      'Attending management meetings & work related issues'
    ],
    direction: 'right'
  },
   {
    company: 'NVH India Auto Parts Pvt Ltd, Chennai',
    role: 'Graduate Engineering Trainee',
    duration: 'Mar 2016 - Mar 2018',
    points: [
      ' To follow the TPM process(5s&3c)',
      'To follow the man power analysis',
      'Provide day to day guidance, management & training for the inspection team. Implement and manage documentation',
      'Maintain team discipline in conjunction with HR legal obligations, compliance & risk management'
    ],
    direction: 'left'
  }
];

const Row = ({ exp, innerRef }) => {
  const [expanded, setExpanded] = useState(false);           // ⬅ local toggle
  const extraRef = useRef([]);                               // refs for animating extras

  const visiblePoints = expanded ? exp.points : exp.points.slice(0, 2);

  // animate extra items when we flip to “expanded”
  useLayoutEffect(() => {
    if (expanded && extraRef.current.length) {
      gsap.fromTo(
        extraRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [expanded]);

  return (
    <section
      ref={innerRef}
      className="container mx-10 md:mx-auto flex flex-col md:flex-row justify-center items-start gap-8 h-fit py-16"
    >
      <div className="shadow shadow-cyan-300 rounded-full cursor-pointer hover:-translate-y-1.5 transform transition duration-500 hover:shadow-xl w-full md:w-1/2 xl:w-1/4 p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-2">{exp.company}</h3>
        <p className="text-lg text-gray-500">{exp.duration}</p>
      </div>

      <div className="shadow shadow-cyan-300 rounded-full cursor-pointer hover:-translate-y-1.5 transform transition duration-500 hover:shadow-xl md:w-1/2 xl:w-1/2 p-8 rounded-xl shadow-lg">
        <h4 className="text-2xl font-bold mb-6 opacity-0 translate-y-4">
          {exp.role}
        </h4>

        <ul className="space-y-4 list-none">
          {visiblePoints.map((pt, i) => (
            <li
              key={i}
              ref={
                i > 1
                  ? (el) => (extraRef.current[i - 2] = el) // store refs only for the “extra” ones
                  : null
              }
              className="opacity-0 translate-y-3 text-gray-600"
            >
              <span className="mr-2 text-pink-700">▹</span>
              {pt}
            </li>
          ))}
        </ul>

        {/* toggle button */}
        {exp.points.length > 2 && (
          <button
            onClick={() => setExpanded((p) => !p)}
            className="mt-6 inline-block text-sm font-medium text-pink-700 hover:underline focus:outline-none"
          >
            {expanded ? "Show less ▲" : "Read more ▼"}
          </button>
        )}
      </div>
    </section>
  );
};

export default function Experiences() {
  const rowsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row, i) => {
        // initial off‑screen state
        gsap.set(row, {
          opacity: 0,
          y: 80,
          zIndex: experienceData.length - i,
        });
        gsap.set(row.querySelectorAll("li, h4"), { opacity: 0, y: 20 });

        // scroll‑trigger reveal
        ScrollTrigger.create({
          trigger: row,
          start: "top 70%",
          end: "bottom 20%",
          scrub: 0.8,
          onEnter: () => {
            gsap.to(row, {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power4.out",
            });
            gsap.to(row.querySelectorAll("h4, li"), {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.6,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(row, { opacity: 0, y: 80, duration: 0.6 });
            gsap.to(row.querySelectorAll("li, h4"), {
              opacity: 0,
              y: 20,
              duration: 0.3,
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="overflow-x-hidden flex flex-col justify-center items-center py-20 scrollbar-hidden h-vh">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-semibold">
          Professional Journey
        </h1>
      </header>

      {experienceData.map((exp, i) => (
        <Row key={i} exp={exp} innerRef={(el) => (rowsRef.current[i] = el)} />
      ))}
    </main>
  );
}