import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { Briefcase, Code, CheckCircle } from 'lucide-react'; // Add icons for better visual engagement

const Resume = () => (
  <Card className="bg-gray-900 text-gray-100 rounded-xl shadow-lg p-6">
    <CardContent>
      <h2 className="text-3xl font-semibold mb-4 text-white">Resume</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Experience Section */}
        <div>
          <h3 className="text-xl font-medium flex items-center space-x-2 mb-4">
            <Briefcase className="h-6 w-6 text-blue-400" />
            <span>Experience</span>
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Senior Developer at XYZ Corp (2020 - Present)</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Junior Developer at ABC Inc. (2018 - 2020)</span>
            </li>
          </ul>
        </div>

        {/* Skills Section with Progress Bars */}
        <div>
          <h3 className="text-xl font-medium flex items-center space-x-2 mb-4">
            <Code className="h-6 w-6 text-blue-400" />
            <span>Skills</span>
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm">JavaScript</p>
              <Progress value={90} className="bg-gray-700 h-2 rounded-full">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '90%' }}></div>
              </Progress>
            </div>
            <div>
              <p className="text-sm">React</p>
              <Progress value={85} className="bg-gray-700 h-2 rounded-full">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '85%' }}></div>
              </Progress>
            </div>
            <div>
              <p className="text-sm">CSS</p>
              <Progress value={75} className="bg-gray-700 h-2 rounded-full">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '75%' }}></div>
              </Progress>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default Resume;
