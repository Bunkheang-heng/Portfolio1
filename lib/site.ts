export const site = {
  name: "HENG Bunkheang",
  shortName: "Bunkheang HENG",
  role: "Software Developer",
  location: "Phnom Penh",
  availability: "Available For Work",
  email: "bunkheangheng99@gmail.com",
  phone: "+855 973556059",
  phoneHref: "tel:+855973556059",
  cv: "/cv/CV.pdf",
  social: {
    telegram: "https://t.me/JPARK77",
    github: "https://github.com/Bunkheang-heng",
    linkedin: "https://www.linkedin.com/in/bunkheang-heng-200b25297/",
  },
} as const;

type Skill = {
  name: string;
  icon?: string;
  mark?: string;
};

export const skills: Skill[] = [
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "HTML", icon: "https://cdn.simpleicons.org/html5/E34F26" },
  { name: "CSS", icon: "https://cdn.simpleicons.org/css/1572B6" },
  { name: "ReactJS", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
  { name: "Nest.js", icon: "https://cdn.simpleicons.org/nestjs/E0234E" },
  { name: "Express.js", icon: "https://cdn.simpleicons.org/express/FFFFFF" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Flask", icon: "https://cdn.simpleicons.org/flask/FFFFFF" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
  { name: "SQL", mark: "SQL" },
  { name: "Postgres", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
  { name: "RESTful APIs", mark: "API" },
  { name: "AI Integration", mark: "AI" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "AWS", mark: "AWS" },
  { name: "Google Cloud", icon: "https://cdn.simpleicons.org/googlecloud/4285F4" },
];

export const certificateCategories = [
  "All",
  "Competitions",
  "Cybersecurity",
  "Cloud",
  "Programming",
  "Leadership",
] as const;

export type CertificateCategory = Exclude<(typeof certificateCategories)[number], "All">;

export const certificates: {
  title: string;
  issuer: string;
  date: string;
  category: CertificateCategory;
  file: string;
  thumb: string;
  description: string;
}[] = [
  {
    title: "Pan-Southeast Asia AI Developer Challenge",
    issuer: "AI Singapore",
    date: "2025",
    category: "Competitions",
    file: "/imgs/certificate/BUNKHEANG-HENG--rean-ff53.pdf",
    thumb: "/imgs/certificate/thumbs/BUNKHEANG-HENG--rean-ff53.png",
    description:
      "Took part in the regional AI developer challenge powered by SEA-LION, working with partners such as AWS, Google, NVIDIA, and AngelHack to build practical AI products for Southeast Asia.",
  },
  {
    title: "Clean Energy Hackathon",
    issuer: "EnergyLab Cambodia",
    date: "November 2023",
    category: "Competitions",
    file: "/imgs/certificate/certificate1.jpg",
    thumb: "/imgs/certificate/certificate1.jpg",
    description:
      "Completed EnergyLab Cambodia's Clean Energy Hackathon during Clean Energy Week, building ideas around practical energy and sustainability solutions.",
  },
  {
    title: "Ideathon Cambodia Season 2",
    issuer: "Mars Flag Corporation",
    date: "September 2023",
    category: "Competitions",
    file: "/imgs/certificate/certificate2.jpg",
    thumb: "/imgs/certificate/certificate2.jpg",
    description:
      "Received a Certificate of Appreciation for taking part in Ideathon Cambodia Season 2 at the Cambodia-Japan Cooperation Center, focused on turning ideas into workable concepts.",
  },
  {
    title: "ASEAN-China-India Youth Leadership Summit",
    issuer: "OSG Youth Alliance, UNITAR, and SDG Academy",
    date: "August 2025",
    category: "Leadership",
    file: "/imgs/certificate/certificate.pdf",
    thumb: "/imgs/certificate/thumbs/certificate.png",
    description:
      "Completed five masterclass tracks on sustainable development, climate governance, and international cooperation, including cities and development, SDG implementation, environmental governance, the Paris Agreement, and climate innovation.",
  },
  {
    title: "Web Hacking and Penetration Testing",
    issuer: "EC-Council Continuing Education",
    date: "July 2025",
    category: "Cybersecurity",
    file: "/imgs/certificate/7b4c45b8-8c95-4e11-8780-180d6ea29c36.png",
    thumb: "/imgs/certificate/7b4c45b8-8c95-4e11-8780-180d6ea29c36.png",
    description:
      "Completed EC-Council's Learn Step by Step Web Hacking and Penetration Testing course, covering how web applications are attacked and how to test them in a structured way.",
  },
  {
    title: "Kali Linux Penetration Testing",
    issuer: "EC-Council Continuing Education",
    date: "July 2025",
    category: "Cybersecurity",
    file: "/imgs/certificate/cfa26f29-542d-4775-9ea2-3668a3f8f091.png",
    thumb: "/imgs/certificate/cfa26f29-542d-4775-9ea2-3668a3f8f091.png",
    description:
      "Finished Getting Started with Kali Linux Penetration Testing, building a working foundation in Kali tooling, reconnaissance, and hands-on security testing.",
  },
  {
    title: "ASEAN Cyber Shield Certificate of Excellence",
    issuer: "ACS Online Education",
    date: "April 2025",
    category: "Cybersecurity",
    file: "/imgs/certificate/Certificate of Excellence_HENG BUNKHEANG.pdf",
    thumb: "/imgs/certificate/thumbs/Certificate_of_Excellence_HENG_BUNKHEANG.png",
    description:
      "Recognized as one of the outstanding students in the ASEAN Cyber Shield first-generation program for strong performance across web exploitation, system exploitation, digital forensics, malware analysis, and incident response.",
  },
  {
    title: "Digital Forensics",
    issuer: "ACS Online Education",
    date: "January 2025",
    category: "Cybersecurity",
    file: "/imgs/certificate/Digital_Forensic_certificate.pdf",
    thumb: "/imgs/certificate/thumbs/Digital_Forensic_certificate.png",
    description:
      "Completed the ASEAN Cyber Shield advanced Digital Forensics course, focusing on evidence collection, investigation workflow, and analysis of digital artifacts.",
  },
  {
    title: "Incident Response",
    issuer: "ACS Online Education",
    date: "January 2025",
    category: "Cybersecurity",
    file: "/imgs/certificate/Incident_Response_certificate.pdf",
    thumb: "/imgs/certificate/thumbs/Incident_Response_certificate.png",
    description:
      "Completed the advanced Incident Response track, covering how to detect, contain, and recover from security incidents in a structured response process.",
  },
  {
    title: "Malware Development and Analysis",
    issuer: "ACS Online Education",
    date: "January 2025",
    category: "Cybersecurity",
    file: "/imgs/certificate/Malware_Dev_Analysis_certificate.pdf",
    thumb: "/imgs/certificate/thumbs/Malware_Dev_Analysis_certificate.png",
    description:
      "Completed the advanced Malware Dev and Analysis course, studying how malware behaves and how to break it down through reverse engineering and analysis.",
  },
  {
    title: "Real-world System Exploitation",
    issuer: "ACS Online Education",
    date: "January 2025",
    category: "Cybersecurity",
    file: "/imgs/certificate/Real-world_System_Exploitation_certificate.pdf",
    thumb: "/imgs/certificate/thumbs/Real-world_System_Exploitation_certificate.png",
    description:
      "Completed the advanced System Exploitation course, practicing vulnerability discovery and exploitation against real operating-system targets.",
  },
  {
    title: "Real-world Web Exploitation",
    issuer: "ACS Online Education",
    date: "January 2025",
    category: "Cybersecurity",
    file: "/imgs/certificate/Real-world_Web_Exploitation_certificate.pdf",
    thumb: "/imgs/certificate/thumbs/Real-world_Web_Exploitation_certificate.png",
    description:
      "Completed the advanced Web Exploitation course, working through common web vulnerabilities and the techniques used to find and exploit them.",
  },
  {
    title: "Foundations of Project Management",
    issuer: "Google via Coursera",
    date: "December 2024",
    category: "Leadership",
    file: "/imgs/certificate/ProjectMangement.pdf",
    thumb: "/imgs/certificate/thumbs/ProjectMangement.png",
    description:
      "Completed Google's Foundations of Project Management course, covering how to plan, track, and deliver work with clear goals, stakeholders, and timelines.",
  },
  {
    title: "ASEAN Cyber Shield Basic Course",
    issuer: "ACS Online Education",
    date: "August 2024",
    category: "Cybersecurity",
    file: "/imgs/certificate/basic_certificate.pdf",
    thumb: "/imgs/certificate/thumbs/basic_certificate.png",
    description:
      "Completed the first-generation ACS basic curriculum with modules in programming, network security, web and system exploitation, pentesting, bug bounty, cryptography, and consulting.",
  },
  {
    title: "AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services",
    date: "July 2024",
    category: "Cloud",
    file: "/imgs/certificate/AWS_Academy_Graduate___AWS_Academy_Cloud_Foundations_Badge20240713-7-av9ujm.pdf",
    thumb: "/imgs/certificate/thumbs/AWS_Academy_Graduate___AWS_Academy_Cloud_Foundations_Badge20240713-7-av9ujm.png",
    description:
      "Earned the AWS Academy Cloud Foundations graduate badge after 20 hours of training on cloud concepts, core AWS services, security, architecture, and pricing.",
  },
  {
    title: "C Programming Certification Course",
    issuer: "Programming Hub",
    date: "June 2023",
    category: "Programming",
    file: "/imgs/certificate/C_Programming_Certificate.pdf",
    thumb: "/imgs/certificate/thumbs/C_Programming_Certificate.png",
    description:
      "Completed Programming Hub's C Programming certification course, covering core syntax, logic, and the fundamentals used to write structured C programs.",
  },
  {
    title: "Cybersecurity 101",
    issuer: "Snoopedu Education",
    date: "May 2023",
    category: "Cybersecurity",
    file: "/imgs/certificate/certificate-1687351461466.pdf",
    thumb: "/imgs/certificate/thumbs/certificate-1687351461466.png",
    description:
      "Completed the Cybersecurity 101 online course, building a first-principles view of threats, defensive thinking, and why security matters in everyday software work.",
  },
];
