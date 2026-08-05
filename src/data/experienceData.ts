export type ExperienceItem = {
  company: string;
  role: string;
  duration: string;
  points: string[];
  tags: string[];
  /** Desktop timeline side */
  direction: "left" | "right";
};

export const experienceData: ExperienceItem[] = [
  {
    company: "Vimix Technologies LLP, Coimbatore",
    role: "Full stack web developer & Trainer",
    duration: "July 2025 - Present",
    points: [
      "Developed responsive and user-friendly interfaces that work on all devices, ensuring reusable code for future projects.",
      "Collaborated with designers and backend developers to integrate APIs and ensure smooth data flow, validating user input before backend submission.",
      "Implemented RESTful APIs for seamless data communication and real-time updates using Axios to handle HTTP requests and responses.",
      "Maintaining and updating websites by adding new features, improving performance, and fixing bugs.",
      "Ensured 100% mobile optimization by implementing adaptive designs for all device views.",
      "Optimized front-end code, improving application speed and reducing loading time.",
      "Regularly updated websites by adding new features, improving performance, and fixing bugs.",
    ],
    tags: ["React", "REST APIs", "Axios", "Responsive UI", "Performance"],
    direction: "right",
  },
  {
    company: "Jaya info-soft Pvt ltd, Chennai",
    role: "Web Developer",
    duration: "Feb 2024 - June 2025",
    points: [
      "Implemented RESTful APIs for seamless data communication and real-time updates using Axios to handle HTTP requests and responses.",
      "Maintaining and updating websites by adding new features, improving performance, and fixing bugs.",
      "Ensured 100% mobile optimization by implementing adaptive designs for all device views.",
      "Optimized front-end code, improving application speed and reducing loading time.",
      "Regularly updated websites by adding new features, improving performance, and fixing bugs.",
    ],
    tags: ["REST APIs", "Axios", "Mobile First", "Performance"],
    direction: "left",
  },
];
