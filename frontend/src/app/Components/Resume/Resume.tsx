import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Code, CheckCircle, Award } from 'lucide-react';
import styles from './Resume.module.css';

export default function Resume() {
  const handleDownload = (language: 'en' | 'ge') => {
    const fileName = language === 'en' ? 'Cv(Eng).pdf' : 'Cv.pdf';
    const filePath = `/Cvs/${fileName}`;
    
    // Create an anchor element
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Card className={`${styles.resumeCard} ${styles.scrollContainer} rounded-xl shadow-lg p-4 sm:p-6 backdrop-blur-sm overflow-auto max-h-full`}>
      <CardContent className={`${styles.scrollContainer} p-0`}>
        <h2 className={`${styles.title} text-3xl font-bold mb-6 text-center`}>Resume</h2>
        {/* Header / Contact */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-white">Mamuka Khokerashvili</h3>
          <div className="mt-2 text-sm text-gray-300 space-y-1">
            <p>
              <a className="underline hover:text-white" href="mailto:mamuka.khokerashvili00@gmail.com">mamuka.khokerashvili00@gmail.com</a>
              <span className="mx-2">|</span>
              <a className="underline hover:text-white" href="tel:+995551215557">(+995) 551-21-55-57</a>
              <span className="mx-2">|</span>
              <span>Tbilisi</span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {/* Experience Section */}
          <Card className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>
              <Briefcase className={styles.icon} />
              <span>Work Experience</span>
            </h3>
            <div className={styles.sectionContent}>
              <p className="mb-4 text-white/60">Recent roles and selected achievements.</p>
            </div>
            <ul className="space-y-3">
              <ExperienceItem
                title="Freelance Developer"
                company="Upwork/Freelancer.com"
                location="Remote"
                period="Mar 2022 - May 2023"
                bullets={[
                  'Developed full-stack solutions using React, Next.js, Python and Laravel (PHP).',
                  'Built and integrated APIs using Python and PHP, ensuring secure and efficient data exchange.',
                  'Delivered projects on time with consistent client satisfaction.',
                  'Collaborated with international clients across multiple time zones.'
                ]}
              />
              <ExperienceItem
                title="Backend Developer"
                company="Money4you.financial"
                location="Tbilisi, Georgia"
                period="Jul 2023 - Jul 2024"
                bullets={[
                  'Successful project management using Laravel methodologies.',
                  'Strong experience with SQL and MySQL databases.',
                  'Built full functionality and comprehensive software solutions with a results-oriented approach.',
                  'Experience building and integrating APIs; ability to work effectively in a team.',
                  'Contributed to both backend and frontend projects, demonstrating full-stack development expertise.',
                  'Skilled in debugging, optimizing, and maintaining existing codebases.',
                  'Managed and extended a Joomla-based CMS alongside Laravel; ensured compatibility with Joomla\'s structure and data models.'
                ]}
              />
            </ul>
          </Card>

          {/* Skills Section */}
          <Card className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>
              <Code className={styles.icon} />
              <span>Skills</span>
            </h3>
            <div className={`${styles.scrollContainer} space-y-5`}>
              <SkillCategory title="Programming Languages" items={[
                'JavaScript', 'Python', 'PHP', 'Java', 'SQL', 'HTML', 'CSS', 'C++'
              ]} />
              <SkillCategory title="Frontend Development" items={["React", "Next.js", "Tailwind CSS", "Three.js"]} />
              <SkillCategory title="Backend Development" items={["Laravel", "Node.js (Express)", "FastAPI", "WebSocket"]} />
              <SkillCategory title="Databases" items={["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Redis"]} />
              <SkillCategory title="Tools" items={["Docker", "Git", "GitHub", "Postman"]} />
              <SkillCategory title="UI/UX & Testing" items={["Figma", "PyTest"]} />
              <SkillCategory title="Real-Time & Messaging" items={["Pusher", "Socket.io"]} />
              <SkillCategory title="Cloud Platforms" items={["AWS", "Google Cloud", "Vercel"]} />
            </div>
          </Card>

          {/* Education Section */}
          <Card className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>
              <Award className={styles.icon} />
              <span>Education</span>
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium text-sm sm:text-base text-white">Informatics and Management Systems, Bachelor</span>
                  <p className="text-xs sm:text-sm text-gray-400">Georgian Technical University — Tbilisi, Georgia</p>
                  <p className="text-xs sm:text-sm text-gray-500">Sep 2020 - Jun 2024</p>
                </div>
              </li>
            </ul>
          </Card>

          {/* Certifications & Online Courses */}
          <Card className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>
              <CheckCircle className={styles.icon} />
              <span>Certifications & Online Courses</span>
            </h3>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300 list-disc ml-6">
              <li>Self-Taught Developer</li>
              <li>Completed various online courses and training programs through Coursera, Udemy, and freeCodeCamp, covering topics such as web development.</li>
              <li>Built real-world projects including portfolio websites, full-stack web apps, and interactive UI components.</li>
            </ul>
          </Card>

          {/* Languages */}
          <Card className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>
              <CheckCircle className={styles.icon} />
              <span>Languages</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Georgian</Badge>
              <Badge variant="secondary">English</Badge>
            </div>
          </Card>
        </div>
        <div className="flex gap-4 justify-center mt-6">
          <button 
            className={`${styles.downloadButton} flex items-center gap-2`}
            onClick={() => handleDownload('en')}
          >
            Download English CV
          </button>
          <button 
            className={`${styles.downloadButton} flex items-center gap-2`}
            onClick={() => handleDownload('ge')}
          >
            Download Georgian CV
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
}

function ExperienceItem({ title, company, period, location, bullets }: ExperienceItemProps) {
  return (
    <li className="flex items-start space-x-3 mb-3 last:mb-0">
      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 mt-1 flex-shrink-0" />
      <div>
        <span className="font-semibold text-sm sm:text-base text-white">{title} — {company}</span>
        <div className="text-xs sm:text-sm text-gray-500">
          <span>{period}</span>
          {location ? <span>{' '}•{' '}{location}</span> : null}
        </div>
        <ul className="text-xs sm:text-sm mt-1 text-gray-400 list-disc ml-5 space-y-1">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

interface SkillCategoryProps {
  title: string;
  items: string[];
}

function SkillCategory({ title, items }: SkillCategoryProps) {
  return (
    <div>
      <p className="text-sm sm:text-base mb-2 font-medium text-white/90">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item} variant="secondary">{item}</Badge>
        ))}
      </div>
    </div>
  );
}

// AboutItem removed in the new layout
