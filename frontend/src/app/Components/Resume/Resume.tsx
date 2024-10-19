import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { Briefcase, Code, CheckCircle, Award } from 'lucide-react';
import styles from './Resume.module.css';

export default function Resume() {
  return (
    <Card className={`${styles.resumeCard} ${styles.scrollContainer} rounded-xl shadow-lg p-4 sm:p-6 backdrop-blur-sm overflow-auto max-h-full`}>
      <CardContent className={`${styles.scrollContainer} p-0`}> {/* Apply scrollContainer class here */}
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
                At Money4You, I contribute as a Backend Developer where my responsibilities encompass managing successful projects using Laravel.
                My role involves leveraging both SQL and NoSQL databases to ensure the software operates with full functionality and efficiency.
              </p>
              <p className="mb-4 font-bold text-white/60 ">Key achievements and tasks include:</p>
              <ul className="list-disc list-inside ml-5 mb-4">
                <li className="mb-2 text-white/60">Overseeing comprehensive project development with a focus on results-driven methodologies.</li>
                <li className="mb-2 text-white/60">Collaborating effectively within team settings to deliver seamless project outcomes.</li>
                <li className="mb-2 text-white/60">Engaging in both backend and frontend development tasks to ensure robust and responsive solutions.</li>
                <li className="mb-2 text-white/60">Designing and integrating APIs to enhance system capabilities.</li>
              </ul>
              <p className="mb-4 text-white/60">
                My experience at Money4You has honed my skills in backend technologies while providing opportunities to expand my proficiency in frontend development, aligning with my goal to become a well-rounded full-stack developer.
              </p>
            </div>
            <ul className="space-y-3">
              <ExperienceItem 
                title="BackEnd Developer"
                company="Money4you.financial"
                period="2023 - 2024"
                description="Managed projects using Laravel, worked with SQL and NoSQL databases"
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
              Proficient in a range of modern technologies for building dynamic and responsive web applications. 
              Skilled in both front-end and back-end development.
            </p>
            <div className={`${styles.scrollContainer} max-h-48 overflow-y-auto space-y-4 sm:space-y-5`}>
              <SkillBar skill="HTML5" percentage={90} />
              <SkillBar skill="CSS" percentage={85} />
              <SkillBar skill="JavaScript" percentage={85} />
              <SkillBar skill="React.js" percentage={80} />
              <SkillBar skill="Next.js" percentage={75} />
              <SkillBar skill="Tailwind CSS" percentage={80} />
              <SkillBar skill="Node.js" percentage={70} />
              <SkillBar skill="MongoDB" percentage={65} />
              <SkillBar skill="SQL" percentage={75} />
              <SkillBar skill="Python" percentage={60} />
              <SkillBar skill="Docker" percentage={55} />
              <SkillBar skill="Postman" percentage={70} />
              <SkillBar skill="Firebase" percentage={65} />
              <SkillBar skill="Laravel" percentage={80} />
              <SkillBar skill="PHP" percentage={75} />
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
                  <span className="font-medium text-sm sm:text-base text-white">Faculty of Informatics and Management Systems</span>
                  <p className="text-xs sm:text-sm text-gray-400">Georgian Technical University, 2020 - Present</p>
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
              Developer passionate about creating web applications. Skilled in both front-end and back-end technologies.
            </p>
            <ul className="space-y-2">
              <AboutItem fieldName="Name" fieldValue="Mamuka Khokerashvili" />
              <AboutItem fieldName="Phone" fieldValue="(+995) 551 21 55 57" />
              <AboutItem fieldName="Experience" fieldValue="1 Year" />
              <AboutItem fieldName="Email" fieldValue="mamuka.khokerashvili00@gmail.com" />
              <AboutItem fieldName="Freelance" fieldValue="Available" />
              <AboutItem fieldName="Languages" fieldValue="Georgia, English" />
            </ul>
          </Card>
        </div>
        <button className={styles.downloadButton}>Download Resume</button>
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
