'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import styles from './Projects.module.css';
import { FaGithub } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  features: string[];
  stack: string[];
  github: string;
  image: string;
  isNew?: boolean;
}

const projects: Project[] = [
  {
    title: "Project 1: Chat Application",
    description: "This chat application is built using Next.js for the front end and MongoDB for the back end. It incorporates React for a dynamic user interface and Pusher for real-time messaging capabilities.",
    features: [
      "User Authentication: Secure login and registration system.",
      "Real-time Messaging: Instant message delivery using Pusher.",
      "Responsive Design: Optimized for both desktop and mobile use.",
      "Chat Rooms: Create and join multiple chat rooms."
    ],
    stack: ["Next.js", "MongoDB", "React", "Pusher", "Tailwind"],
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
    stack: ["PHP", "SQL", "JavaScript", "CSS"],
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
    stack: ["Next.js", "Socket.io", "Tailwind CSS", "Node.js", "Firebase"],
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
    stack: ["Laravel", "React", "Inertia.js"],
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
    stack: ["React", "Express", "MongoDB", "Google Gemini AI"],
    github: "https://github.com/JustRascal00/CHATAI",
    image: "/Projects/Website5.png",
    isNew: true
  },
  {
    title: "Project 6: 3D Portfolio",
    description: "A 3D web developer portfolio built using React, Three.js, and advanced 3D graphics for an interactive experience.",
    features: [
      "3D Models and Geometries: Stunning and customizable 3D models.",
      "Advanced Animations: Detailed object manipulation and lighting.",
      "Responsiveness and Performance: Optimized for all devices."
    ],
    stack: ["Three.js", "React Three Fiber", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/JustRascal00/Cv-Website",
    image: "/Projects/Website6.png",
    isNew: true
  }
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.stack.includes(filter));

  const uniqueTechnologies = Array.from(new Set(projects.flatMap(project => project.stack)));

  return (
    <>
      <div className={`bg-[#121212] text-gray-300 rounded-xl shadow-lg p-4 sm:p-6 backdrop-blur-sm ${styles.scrollContainer}`}>
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white text-center">Projects</h2>
      
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        <Button 
          onClick={() => setFilter('All')} 
          variant={filter === 'All' ? 'default' : 'outline'}
        >
          All
        </Button>
        {uniqueTechnologies.map((tech) => (
          <Button 
            key={tech} 
            onClick={() => setFilter(tech)}
            variant={filter === tech ? 'default' : 'outline'}
          >
            {tech}
          </Button>
        ))}
      </div>

      <AnimatePresence>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {isLoading ? (
            // Skeleton loader
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden animate-pulse border border-gray-700">
                <div className="h-48 bg-gray-700 mb-4"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-4/6"></div>
                </div>
              </div>
            ))
          ) : (
            filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${styles.projectCard} cursor-pointer`}
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-center p-4">Click to view details</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">{project.title}</h3>
                    {project.isNew && <Badge variant="destructive">New</Badge>}
                  </div>
                  <p className="mb-4 text-gray-400">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                  <a href={project.github} className="text-blue-500 hover:underline mt-4 block" title="View on GitHub">
                    <FaGithub className="inline mr-1" /> GitHub
                  </a>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>

      </div>

      {isModalOpen && selectedProject && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-[#1a1a1a] rounded-lg max-w-3xl w-full mx-4 overflow-hidden"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <Image
              src={selectedProject.image}
              alt={selectedProject.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-white">{selectedProject.title}</h2>
              <p className="mb-4 text-gray-300">{selectedProject.description}</p>
              <h3 className="text-xl font-semibold mb-2 text-white">Key Features:</h3>
              <ul className="list-disc list-inside mb-4 text-gray-300">
                {selectedProject.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <h3 className="text-xl font-semibold mb-2 text-white">Tech Stack:</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.stack.map((tech, index) => (
                  <Badge key={index} variant="outline">{tech}</Badge>
                ))}
              </div>
              <a href={selectedProject.github} className="text-blue-500 hover:underline block mb-4" target="_blank" rel="noopener noreferrer">
                <FaGithub className="inline mr-1" /> View on GitHub
              </a>
              <Button onClick={closeModal} variant="destructive">Close</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Projects;