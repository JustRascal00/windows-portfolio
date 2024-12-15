import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
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
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {/* Experience Section */}
          <Card className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>
              <Briefcase className={styles.icon} />
              <span>Experience</span>
            </h3>
            <div className={styles.sectionContent}>
              <p className="mb-4 text-white/60 ">
                At Money4You, I contributed as a Backend Developer, managing projects using Laravel and working with both SQL and NoSQL databases to ensure robust and efficient software solutions.
              </p>
              <p className="mb-4 font-bold text-white/60">Key responsibilities and achievements include:</p>
              <ul className="list-disc list-inside ml-5 mb-4">
                <li className="mb-2 text-white/60">Developed comprehensive software solutions with a results-driven focus.</li>
                <li className="mb-2 text-white/60">Collaborated within a team to deliver full-stack development projects.</li>
                <li className="mb-2 text-white/60">Designed and integrated APIs to enhance functionality and performance.</li>
                <li className="mb-2 text-white/60">Debugged, optimized, and maintained existing codebases.</li>
              </ul>
              <p className="mb-4 text-white/60">
                Additionally, my freelance experience on Upwork allowed me to develop and integrate APIs, collaborate with international clients, and deliver full-stack solutions efficiently using modern frameworks.
              </p>
            </div>
            <ul className="space-y-3">
              <ExperienceItem 
                title="Backend Developer"
                company="Money4You.financial"
                period="Jul 2023 - Jul 2024"
                description="Managed projects using Laravel, built APIs, and worked with SQL/NoSQL databases."
              />
              <ExperienceItem 
                title="Freelance Developer"
                company="Upwork/Freelancer.com"
                period="Mar 2022 - May 2023"
                description="Developed full-stack solutions using React, Next.js, Python, and Laravel while collaborating with international clients."
              />
            </ul>
          </Card>

          {/* Skills Section */}
          <Card className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>
              <Code className={styles.icon} />
              <span>Skills</span>
            </h3>
            <p className="text-white/60 mb-4">
              Proficient in modern technologies for creating dynamic and efficient web applications, with expertise in both front-end and back-end development.
            </p>
            <div className={`${styles.scrollContainer} max-h-48 overflow-y-auto space-y-4 sm:space-y-5`}>
              <SkillBar skill="Laravel" percentage={80} />
              <SkillBar skill="React.js" percentage={80} />
              <SkillBar skill="Next.js" percentage={75} />
              <SkillBar skill="Python" percentage={70} />
              <SkillBar skill="PHP" percentage={90} />
              <SkillBar skill="Node.js" percentage={70} />
              <SkillBar skill="MySQL" percentage={80} />
              <SkillBar skill="MongoDB" percentage={65} />
              <SkillBar skill="Docker" percentage={70} />
              <SkillBar skill="Postman" percentage={80} />
              <SkillBar skill="Tailwind CSS" percentage={80} />
              <SkillBar skill="Firebase" percentage={50} />
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
                  <p className="text-xs sm:text-sm text-gray-400">Georgian Technical University, 2020 - 2024</p>
                </div>
              </li>
            </ul>
          </Card>

          {/* About Me Section */}
          <Card className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>
              <CheckCircle className={styles.icon} />
              <span>About Me</span>
            </h3>
            <p className="text-white/60 mb-4">
              Passionate developer with expertise in web application development and a keen interest in both front-end and back-end technologies.
            </p>
            <ul className="space-y-2">
              <AboutItem fieldName="Name" fieldValue="Mamuka Khokerashvili" />
              <AboutItem fieldName="Phone" fieldValue="(+995) 551 21 55 57" />
              <AboutItem fieldName="Email" fieldValue="mamuka.khokerashvili00@gmail.com" />
              <AboutItem fieldName="Experience" fieldValue="1 Year" />
              <AboutItem fieldName="Freelance" fieldValue="Available" />
              <AboutItem fieldName="Languages" fieldValue="Georgian, English" />
            </ul>
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
  description: string;
}

function ExperienceItem({ title, company, period, description }: ExperienceItemProps) {
  return (
    <li className="flex items-start space-x-3 mb-3 last:mb-0">
      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 mt-1 flex-shrink-0" />
      <div>
        <span className="font-semibold text-sm sm:text-base text-white">{title} at {company}</span>
        <p className="text-xs sm:text-sm text-gray-500">{period}</p>
        <p className="text-xs sm:text-sm mt-1 text-gray-400">{description}</p>
      </div>
    </li>
  );
}

interface SkillBarProps {
  skill: string;
  percentage: number;
}

function SkillBar({ skill, percentage }: SkillBarProps) {
  return (
    <div className="overflow-hidden">
      <p className="text-sm sm:text-base mb-2 flex justify-between items-center">
        <span className="font-medium text-gray-300">{skill}</span>
        <span className="text-white font-semibold">{percentage}%</span>
      </p>
      <Progress value={percentage} className="h-2 sm:h-2.5 rounded-full bg-gray-800">
        <div 
          className="bg-gradient-to-r from-gray-600 to-gray-400 h-full rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </Progress>
    </div>
  );
}

interface AboutItemProps {
  fieldName: string;
  fieldValue: string;
}

function AboutItem({ fieldName, fieldValue }: AboutItemProps) {
  return (
    <li className="flex items-start space-x-2">
      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mt-1 flex-shrink-0" />
      <div>
        <span className="font-medium text-sm sm:text-base text-white">{fieldName}:</span>
        <span className="text-xs sm:text-sm text-gray-400 ml-2">{fieldValue}</span>
      </div>
    </li>
  );
}
