import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import styles from './Aboutme.module.css';
import { FaCode, FaLaptopCode, FaDatabase, FaRocket } from 'react-icons/fa';

const AboutMe: React.FC = () => {
  const [experience, setExperience] = useState(0);
  const [projects, setProjects] = useState(0);
  const [technologies, setTechnologies] = useState(0);
  const [commits, setCommits] = useState(0);

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 20; // update every 20ms
    const steps = duration / interval;

    const updateNumbers = (setter: React.Dispatch<React.SetStateAction<number>>, target: number) => {
      for (let i = 0; i <= steps; i++) {
        setTimeout(() => {
          const value = Math.floor((target * i) / steps);
          setter(value);
        }, i * interval);
      }
    };

    updateNumbers(setExperience, 2);
    updateNumbers(setProjects, 16);
    updateNumbers(setTechnologies, 8);
    updateNumbers(setCommits, 500);
  }, []);

  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <h2 className={styles.title}>About Me</h2>
        <h3 className={styles.subtitle}>Hello, I'm Mamuka Khokerashvili</h3>
        <p className={styles.description}>
          I am a passionate and results-driven full-stack developer with hands-on experience in building and optimizing web applications using modern frameworks and technologies. With a strong foundation in JavaScript, Python, PHP, and SQL, I have developed scalable backend systems, dynamic frontends, and integrated secure APIs for international clients. My work spans from freelance projects to professional roles, where I contributed to both backend and frontend solutions, ensuring efficiency, maintainability, and high-quality code. I thrive in collaborative environments, adapt quickly to new challenges, and take pride in delivering reliable solutions that meet client and business goals.
        </p>

        <div className={styles.statsContainer}>
          <div className={styles.stat}>
            <FaRocket className={styles.icon} />
            <p><strong>{experience}</strong> Years of Experience</p>
          </div>
          <div className={styles.stat}>
            <FaLaptopCode className={styles.icon} />
            <p><strong>{projects}</strong> Projects Completed</p>
          </div>
          <div className={styles.stat}>
            <FaCode className={styles.icon} />
            <p><strong>{technologies}</strong> Technologies Mastered</p>
          </div>
          <div className={styles.stat}>
            <FaDatabase className={styles.icon} />
            <p><strong>{commits}</strong> Code Commits</p>
          </div>
        </div>

        {/* Skills Section */}
        <h3 className={styles.sectionTitle}>Skills</h3>
        <ul className={styles.list}>
          {[
            'JavaScript', 'Python', 'PHP', 'React', 'Next.js', 'Tailwind CSS',
            'Laravel', 'Node.js (Express)', 'FastAPI',
            'MySQL', 'PostgreSQL', 'MongoDB', 'SQL', 'Redis',
            'Docker', 'Git', 'GitHub', 'Postman',
            'WebSocket', 'Pusher', 'Socket.io', 'Firebase',
          ].map((skill, index) => (
            <li key={index} className={styles.listItem}>
              {skill}
            </li>
          ))}
        </ul>

        {/* Interests Section */}
        <h3 className={styles.sectionTitle}>Interests</h3>
        <p className="mb-4">Turning ideas into polished UIs, real‑time user experiences, and cloud‑native tinkering.</p>

        {/* Goals Section */}
        <h3 className={styles.sectionTitle}>Goals</h3>
        <p>Build products people love, deepen my craft across the stack, and contribute to thoughtful, dependable software.</p>

        {/* Social Media Links */}
        <h3 className={styles.sectionTitle}>Connect with Me</h3>
        <div className={styles.socialLinks}>
          <a href="https://github.com/JustRascal00" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutMe;
