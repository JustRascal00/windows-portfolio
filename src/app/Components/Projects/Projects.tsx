import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Code } from 'lucide-react';
import Image from 'next/image';
import styles from './Projects.module.css';

const projects = [
  {
    title: "Project 1: Chat Application",
    description: "This chat application is built using Next.js for the front end and MongoDB for the back end. It incorporates React for a dynamic user interface and Pusher for real-time messaging capabilities.",
    features: [
      "User Authentication: Secure login and registration system.",
      "Real-time Messaging: Instant message delivery using Pusher.",
      "Responsive Design: Optimized for both desktop and mobile use.",
      "Chat Rooms: Create and join multiple chat rooms."
    ],
    stack: "Next.js, MongoDB, React, Pusher for real-time messages, Tailwind",
    github: "https://github.com/JustRascal00/chatapp",
    image: "/Projects/Website1.png"
  },
  {
    title: "Project 2: Chat Room Application",
    description: "This project is a simple chat room application utilizing PHP for the backend and SQL for database management. Users can join chat rooms, send messages, and view message history.",
    features: [
      "Chat Rooms: Users can join and create chat rooms.",
      "Message History: View and store chat history.",
      "Real-time Messaging: Instant message updates using JavaScript.",
      "Responsive Design: Accessible on both desktop and mobile devices."
    ],
    stack: "PHP, SQL, JavaScript, CSS",
    github: "https://github.com/JustRascal00/chatroom",
    image: "/Projects/Website2.png"
  },
  {
    title: "Project 3: WhatsApp Clone",
    description: "A WhatsApp clone developed using Next.js for the frontend and PostgreSQL for database management. Features Socket.io for real-time communication, supporting voice and video calls.",
    features: [
      "Voice Messages: Record and send voice messages.",
      "Search Messages: Efficiently search through chat history.",
      "Voice and Video Calls: High-quality communication using Socket.io.",
      "Real-time Messaging: Instant messaging using Socket.io."
    ],
    stack: "Next.js, Socket.io, Tailwind CSS, Node.js, Firebase",
    github: "https://github.com/JustRascal00/rasapp",
    image: "/Projects/Website3.png"
  },
  {
    title: "Project 4: Project Management App",
    description: "Full-stack project management application using Laravel (backend) and React (frontend). Includes features like task management and team collaboration.",
    features: [
      "Task Management: Create and track tasks with customizable priorities.",
      "Team Collaboration: Manage team members and assign roles.",
      "Project Tracking: Detailed project progress tracking and reports.",
      "Notifications: Receive real-time updates for task changes."
    ],
    stack: "Laravel, React, Inertia.js",
    github: "https://github.com/JustRascal00/laravel-ProjectManagement-App",
    image: "/Projects/Website4.png"
  },
  {
    title: "Project 5: Chat Application with AI",
    description: "Full-stack chat application integrating Google Gemini AI for advanced conversational capabilities with real-time messaging.",
    features: [
      "AI-Powered Chat: Integrated Google Gemini AI for smart responses.",
      "Real-time Messaging: Instant messaging using Express and MongoDB.",
      "Responsive Design: Optimized for mobile and desktop."
    ],
    stack: "React, Express, MongoDB, Google Gemini AI",
    github: "https://github.com/JustRascal00/CHATAI",
    image: "/Projects/Website5.png"
  },
  {
    title: "Project 6: 3D Portfolio",
    description: "A 3D web developer portfolio built using React, Three.js, and advanced 3D graphics for an interactive experience.",
    features: [
      "3D Models and Geometries: Stunning and customizable 3D models.",
      "Advanced Animations: Detailed object manipulation and lighting.",
      "Responsiveness and Performance: Optimized for all devices."
    ],
    stack: "Three.js, React Three Fiber, Tailwind CSS, Framer Motion",
    github: "https://github.com/JustRascal00/Cv-Website",
    image: "/Projects/Website6.png"
  }
];

const Projects = () => (
  <Card className={`bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-gray-200 rounded-xl shadow-lg p-4 sm:p-6 backdrop-blur-sm overflow-auto max-h-full ${styles.scrollContainer}`}>
    <CardContent className="p-0">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white text-center">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="bg-gray-900/80 rounded-xl p-4 sm:p-5 transition-all duration-300 hover:shadow-2xl hover:bg-gray-800/90">
            <Image
              src={project.image}
              alt={project.title}
              className="rounded-t-lg mb-4 object-cover transition-transform duration-300 hover:scale-105"
              width={400}
              height={250}
            />
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white">{project.title}</h3>
            <p className="text-white/60 mb-4">{project.description}</p>
            <p className="font-bold text-white/80 mb-3">Key Features:</p>
            <ul className="list-disc list-inside text-white/60 space-y-2 ml-5 mb-4">
              {project.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>
            <p className="font-semibold text-white/80">Stack: <span className="text-white/60" title={project.stack}>{project.stack}</span></p>
            <a href={project.github} className="text-blue-400 hover:underline mt-4 block">GitHub: {project.github}</a>
          </Card>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default Projects;
