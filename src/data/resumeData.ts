// src/data/resumeData.ts

export const resumeData = {
    profile: {
      name: "Elijah Clark",
      title: "Full Stack Engineer",
      location: "Albany, NY 12210",
      email: "elijahclark@protonmail.com",
      phone: "+1 518 728 2461",
      bio: "Passionate and versatile Full Stack Engineer with 10+ years of experience developing and maintaining diverse applications. Skilled in frontend and backend technologies, cloud services, and database management. Proven track record in leading projects, mentoring teams, and delivering scalable, maintainable solutions."
    },

    experience: [
      {
        company: "Maximus",
        position: "Software Engineer",
        location: "Albany, NY",
        period: "February 2017 to Present",
        achievements: [
          "Designed and implemented automated provisioning tool for employee access management",
          "Developed multiple dashboards used to monitor application security, visualize agile metrics, and track releases",
          "Created internal tooling for patient documentation uploads, migrating from on-premises to cloud solutions",
          "Developed IVRs using AWS Connect, Lambda functions, and SpringBoot, integrating with backend servers for user verification and task creation",
          "Utilized ELK stack to create dashboards for application and server performance monitoring",
          "Provided technical guidance and development assistance across various teams and phases of software development",
          "Led migration of legacy systems to microservices architecture, improving scalability and reducing deployment time by 40%"
        ]
      },
      {
        company: "Conatus Intalytics",
        position: "Founder",
        period: "January 2018 to Present",
        achievements: [
          "Financial modeling services to commercial real estate professionals using Excel, Smartsheet, and Google Sheets",
          "Conduct in-depth research, lead generation, and process automation to streamline client businesses",
          "Developed custom Python scripts to automate data analysis, reducing manual work by 50%",
          "Developed financial models that assisted in the purchasing of more than $30 million worth of properties"
        ]
      },
      {
        company: "Maximus",
        position: "IT PM Senior Analyst",
        location: "Albany, NY",
        period: "Jan 2015 to Jan 2017",
        achievements: [
          "Worked with the ISSO to analyze and mitigate system vulnerabilities using Qualys",
          "Created dashboards in Power Bi that automatically pull vulnerability data from Qualys",
          "Created IT Applications Staffing Database for tracking and management of staff members",
          "Researched and recommended process improvements to mitigate operational and financial risk",
          "Created and Implemented incident reporting form for facilities security (SecTek)",
          "Served as IT Applications Project Lead on multiple key projects"
        ]
      }
    ],

    skills: {
      frontend: [
        { name: "JavaScript", experience: "6 years" },
        { name: "Angular", level: 85 },
        { name: "Node.js", level: 85 },
        { name: "Flutter", level: 80 },
        { name: "React", level: 80 }
      ],
      backend: [
        { name: "Java (8-17)", level: 90 },
        { name: "Spring Boot", level: 85 },
        { name: "Python", level: 85 },
        { name: "Node.js", level: 85 }
      ],
      cloud: [
        { name: "AWS", level: 85 },
        { name: "Azure", level: 80 },
        { name: "Docker", level: 85 },
        { name: "ELK Stack", level: 85 }
      ],
      databases: [
        { name: "DynamoDB", level: 85 },
        { name: "SQL", level: 90 },
        { name: "Oracle", level: 85 },
        { name: "MySQL", level: 85 },
        { name: "PostgreSQL", level: 85 },
        { name: "NoSQL", level: 80 }
      ],
      analytics: [
        { name: "Python", level: 90 },
        { name: "Jupyter", level: 85 },
        { name: "ML", level: 80 },
        { name: "PowerBI", level: 90 },
        { name: "ELK", level: 85 },
        { name: "Smartsheet", level: 90 },
        { name: "Excel (VBA)", level: 90 }
      ]
    },

    education: [
      {
        school: "Stony Brook University",
        location: "Stony Brook, NY",
        degree: "B.S. in Neuroscience",
        period: "August 2007 to June 2009"
      },
      {
        school: "SUNY CGCC",
        location: "Hudson, NY",
        degree: "Associate in Science (AS) in Biology",
        period: "August 2005 to June 2007"
      }
    ],

    certifications: [
      "SAFe Agile SSM",
      "AWS Associate Architect",
      "Smartsheet PM",
      "Currently Enrolled in Generative AI Nano Degree"
    ],

    additionalInfo: [
      "Passionate about continuous learning and solving complex problems",
      "Active contributor to open-source projects related to healthcare technology",
      "Mentor for junior developers, focusing on best practices and code quality"
    ]
  }