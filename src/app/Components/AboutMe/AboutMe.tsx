import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import styles from './AboutMe.module.css';
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

    updateNumbers(setExperience, 1);
    updateNumbers(setProjects, 8);
    updateNumbers(setTechnologies, 8);
    updateNumbers(setCommits, 500);
  }, []);

  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <h2 className={styles.title}>About Me</h2>
        <h3 className={styles.subtitle}>Hello, I'm Mamuka Khokerashvili</h3>
        <p className={styles.description}>
          Motivated and forward-thinking developer with nearly one year of practical experience in backend development, 
          committed to evolving into a proficient full-stack developer. I specialize in crafting effective and sustainable 
          web solutions while striving to enhance user experiences through a comprehensive understanding of the web development spectrum.
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
          {['JavaScript', 'React', 'Node.js', 'Laravel', 'MongoDB', 'SQL'].map((skill, index) => (
            <li key={index} className={styles.listItem}>
              {skill}
            </li>
          ))}
        </ul>

        {/* Interests Section */}
        <h3 className={styles.sectionTitle}>Interests</h3>
        <p className="mb-4">I enjoy exploring new technologies</p>

        {/* Goals Section */}
        <h3 className={styles.sectionTitle}>Goals</h3>
        <p>I aim to become a full-stack developer with expertise in both frontend and backend technologies, and to work on impactful projects that enhance user experiences.</p>

        {/* Social Media Links */}
        <h3 className={styles.sectionTitle}>Connect with Me</h3>
        <div className={styles.socialLinks}>
          <a href="https://github.com/JustRascal00" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://cv-website-nextjss.vercel.app" target="_blank" rel="noopener noreferrer">Website</a>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutMe;
