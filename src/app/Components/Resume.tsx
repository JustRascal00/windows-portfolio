import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { Briefcase, Code, CheckCircle, Award } from 'lucide-react';

export default function Resume() {
  return (
    <Card className="bg-gray-900/90 text-gray-100 rounded-xl shadow-lg p-4 sm:p-6 backdrop-blur-sm">
      <CardContent className="p-0">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-white text-center">Resume</h2>
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {/* Experience Section */}
          <Card className="bg-gray-800/50 rounded-xl p-3 sm:p-4 transition-all duration-300 hover:shadow-lg hover:bg-gray-800/70">
            <h3 className="text-lg sm:text-xl font-medium flex items-center space-x-2 mb-3">
              <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
              <span>Experience</span>
            </h3>
            <ul className="space-y-3">
              <ExperienceItem 
                title="Senior Developer"
                company="XYZ Corp"
                period="2020 - Present"
                description="Led key projects, mentored juniors"
              />
              <ExperienceItem 
                title="Junior Developer"
                company="ABC Inc."
                period="2018 - 2020"
                description="Frontend dev, improved UI/UX"
              />
            </ul>
          </Card>

          {/* Skills Section */}
          <Card className="bg-gray-800/50 rounded-xl p-3 sm:p-4 transition-all duration-300 hover:shadow-lg hover:bg-gray-800/70">
            <h3 className="text-lg sm:text-xl font-medium flex items-center space-x-2 mb-3">
              <Code className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
              <span>Skills</span>
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <SkillBar skill="JavaScript" percentage={90} />
              <SkillBar skill="React" percentage={85} />
              <SkillBar skill="CSS" percentage={75} />
            </div>
          </Card>

          {/* Education Section */}
          <Card className="bg-gray-800/50 rounded-xl p-3 sm:p-4 transition-all duration-300 hover:shadow-lg hover:bg-gray-800/70">
            <h3 className="text-lg sm:text-xl font-medium flex items-center space-x-2 mb-3">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
              <span>Education</span>
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium text-sm sm:text-base">BSc in Computer Science</span>
                  <p className="text-xs sm:text-sm text-gray-400">University of Technology, 2014 - 2018</p>
                </div>
              </li>
            </ul>
          </Card>
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
    <li className="flex items-start space-x-2">
      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mt-1 flex-shrink-0" />
      <div>
        <span className="font-medium text-sm sm:text-base">{title} at {company}</span>
        <p className="text-xs sm:text-sm text-gray-400">{period}</p>
        <p className="text-xs sm:text-sm mt-1">{description}</p>
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
    <div>
      <p className="text-xs sm:text-sm mb-1 flex justify-between">
        <span>{skill}</span>
        <span className="text-blue-300">{percentage}%</span>
      </p>
      <Progress value={percentage} className="h-1.5 sm:h-2 rounded-full bg-gray-700">
        <div 
          className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </Progress>
    </div>
  );
}