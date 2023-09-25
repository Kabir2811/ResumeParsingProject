// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function ResumeList() {
//   const [data, setData] = useState([]);
//   const [filters, setFilters] = useState({
//     skills: [],
//     gender: '',
//     knownLanguages: '',
//   });

//   // Define the list of all skills
// const allSkills = [
//   "python", "java", "mysql", "opencv", "image processing", "pid", "ml", "dbms",
//               "html", "bootstrap", "css", "php", "phpmyadmin", "software testing", "software development",
//               "software engineering", "computer vision", "internet of things", "data analysis",
//               "machine learning", "communication", ".net",
//               "javascript", "react", "angular", "node.js", "express.js", "mongodb", "firebase",
//               "c++", "c#", "ruby", "scala", "kotlin", "swift", "android development", "ios development",
//               "git", "github", "docker", "kubernetes", "bash scripting", "linux administration",
//               "agile methodologies", "scrum", "kanban", "project management", "data structures",
//               "algorithms", "data mining", "data visualization", "big data", "cloud computing",
//               "amazon web services (AWS)", "microsoft azure", "google cloud platform (GCP)",
//               "virtualization", "networking", "cybersecurity", "web security", "penetration testing",
//               "blockchain", "smart contracts", "cryptocurrency", "natural language processing",
//               "speech recognition", "computer graphics", "game development", "virtual reality (VR)",
//               "augmented reality (AR)", "web development", "front-end development", "back-end development",
//               "full-stack development", "responsive design", "user experience (UX) design",
//               "user interface (UI) design", "mobile app design", "data modeling", "database design",
//               "sql", "nosql", "restful api", "graphql", "microservices", "serverless architecture",
//               "cloud native", "devops", "continuous integration/continuous deployment (CI/CD)",
//               "test-driven development (TDD)", "behavior-driven development (BDD)", "agile testing",
//               "performance testing", "load testing", "security testing", "automation testing",
//               "data science", "data engineering", "data warehousing", "etl", "data lakes",
//               "business intelligence", "data analytics", "data governance", "data privacy",
//               "statistical analysis", "deep learning", "neural networks", "computer science",
//               "operating systems", "databases", "data warehousing", "data lakes", "business intelligence",
//               "data analytics", "data governance", "data privacy", "statistical analysis",
//               "deep learning", "neural networks", "computer science", "operating systems", "databases",
//               "distributed systems", "cloud-native applications", "microservices architecture",
//               "containerization", "cloud orchestration", "serverless computing", "edge computing",
//               "fuzzy logic", "data engineering", "real-time processing", "stream processing",
//               "event-driven architecture", "internet protocols", "network security", "wireless networks",
//               "robotics", "automation", "mechatronics", "embedded systems", "control systems",
//               "sensors and actuators", "artificial intelligence (AI)", "robotic process automation (RPA)",
//               "human-computer interaction (HCI)", "ethics in technology", "social media marketing",
//               "search engine optimization (SEO)", "content marketing", "email marketing", "digital marketing",
//               "branding", "market research", "customer relationship management (CRM)",
//               "salesforce", "e-commerce", "online advertising", "mobile marketing", "affiliate marketing",
//               "data-driven marketing", "product management", "product lifecycle management (PLM)",
//               "supply chain management", "quality assurance", "customer support", "technical support",
//               "call center management", "data entry", "virtual assistance", "project coordination",
//               "time management", "leadership", "teamwork", "problem-solving", "critical thinking",
//               "decision-making", "creativity", "innovation", "emotional intelligence", "public speaking",
//               "presentation skills", "negotiation", "conflict resolution", "interpersonal skills",
//               "cross-cultural communication", "strategic planning", "financial management",
//               "budgeting", "risk management", "business analysis", "market analysis", "competitive analysis",
//               "business development", "sales", "accounting", "human resources", "talent acquisition",
//               "employee relations", "performance management", "workplace diversity", "workplace safety",
//               "organizational development", "change management", "strategic thinking", "data-driven decision-making",
//               "project planning", "project execution", "project monitoring", "project closure",
//               "quality management", "process improvement", "lean methodology", "six sigma",
//               "customer experience", "customer satisfaction", "customer retention", "loyalty programs",
//               "product development", "research and development", "innovation management", "intellectual property",
//               "patent law", "copyright law", "contract law", "employment law", "privacy law",
//               "regulatory compliance", "healthcare", "telemedicine", "pharmaceuticals", "biotechnology",
//               "environmental sustainability", "green technology", "renewable energy", "climate change mitigation",
//               "sustainable agriculture", "ecosystem preservation", "conservation biology", "wildlife conservation"
// ];

//   useEffect(() => {
//     fetchData();
//   }, [filters]);

//   const fetchData = async () => {
//     try {
//       const skillsQueryParam = filters.skills.join(',');
//       const response = await axios.get(`http://localhost:8080/student/filter?skills=${skillsQueryParam}&gender=${filters.gender}&knownLanguages=${filters.knownLanguages}`);
//       setData(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   const handleSkillsChange = (e) => {
//     const selectedSkills = Array.from(e.target.selectedOptions, (option) => option.value);
//     setFilters({ ...filters, skills: selectedSkills });
//   };

//   return (
//     <div>
//       <select name="skills" multiple onChange={handleSkillsChange}>
//         {allSkills.map((skill) => (
//           <option key={skill} value={skill}>
//             {skill}
//           </option>
//         ))}
//       </select>

//         <label>Gender:</label>
//         <select name="gender" onChange={handleFilterChange}>
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//         </select>

//       <input type="text" name="knownLanguages" placeholder="Known Languages" onChange={handleFilterChange} />
//       <table className="table table-striped table-bordered">
//         <thead className="thead-dark">
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Gender</th>
//             <th>Marital Status</th>
//             <th>Known Languages</th>
//             <th>Skills</th>
//             {/* Add more columns for other resume fields */}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((resume) => (
//             <tr key={resume.id}>
//               <td>{resume.id}</td>
//               <td>{resume.name}</td>
//               <td>{resume.email}</td>
//               <td>{resume.phone}</td>
//               <td>{resume.gender}</td>
//               <td>{resume.maritalStatus}</td>
//               <td>{resume.knownLanguages}</td>
//               <td>{resume.skills.replace(/\[|\]/g, '').split(', ').join(', ')}</td>
//               {/* Add more columns for other resume fields */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ResumeList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ResumeList() {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        skills: [],
        gender: '',
        knownLanguages: '',
    });
    const [searchSkills, setSearchSkills] = useState('');
    const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);

    // Define the list of all skills
    const allSkills = [
        ".net", "agile methodologies", "agile testing", "ai (artificial intelligence)", "algorithms", "android development",
        "angular", "apache kafka", "apache spark", "api design", "artificial intelligence (AI)", "automation",
        "automation testing", "aws (amazon web services)", "azure", "backend development", "big data", "blockchain",
        "bootstrap", "branding", "business analysis", "business development", "c#", "c++", "call center management",
        "climate change mitigation", "cloud computing", "cloud native", "cloud orchestration", "computer graphics",
        "computer science", "content marketing", "continuous integration/continuous deployment (CI/CD)",
        "control systems", "cpp", "creativity", "critical thinking", "cryptocurrency", "customer experience",
        "customer relationship management (CRM)", "customer retention","css", "cybersecurity", "data analysis",
        "data analytics", "data engineering", "data governance", "data lakes", "data mining", "data modeling",
        "data privacy", "data science", "data visualization", "databases", "deep learning", "decision-making",
        "digital marketing", "docker", "e-commerce", "edge computing", "email marketing", "embedded systems",
        "emotional intelligence", "environmental sustainability", "etl", "event-driven architecture",
        "express.js", "fuzzy logic", "front-end development", "full-stack development", "game development",
        "git", "github", "google cloud platform (GCP)", "green technology", "healthcare", "html",
        "human-computer interaction (HCI)", "human resources", "image processing", "innovation",
        "innovation management", "intellectual property", "internet of things", "internet protocols",
        "ios development", "java", "javascript", "kanban", "kotlin", "leadership", "lean methodology",
        "linux administration", "load testing", "loyalty programs", "machine learning", "market analysis",
        "market research", "marital status", "microsoft azure", "microservices", "microservices architecture",
        "mongodb", "mysql", "natural language processing", "neural networks", "node.js", "nosql",
        "operating systems", "opencv", "organizational development", "patent law", "performance management",
        "performance testing", "php", "phpmyadmin", "pid", "presentation skills", "problem-solving",
        "product development", "product lifecycle management (PLM)", "project closure", "project coordination",
        "project execution", "project management", "project monitoring", "project planning", "public speaking",
        "python", "quality assurance", "quality management", "real-time processing", "regulatory compliance",
        "research and development", "responsive design", "restful api", "robotic process automation (RPA)",
        "robotics", "ruby", "sales", "salesforce", "scala", "search engine optimization (SEO)",
        "sensors and actuators", "serverless architecture", "serverless computing", "shell scripting",
        "six sigma", "smart contracts", "social media marketing", "software development",
        "software engineering", "software testing", "speech recognition", "sql", "statistical analysis",
        "stream processing", "supply chain management", "swift", "sustainable agriculture",
        "telemedicine", "test-driven development (TDD)", "time management", "ui/ux design", "user experience (UX) design",
        "user interface (UI) design", "virtual assistance", "virtualization", "virtual reality (VR)",
        "web development", "web security", "wildlife conservation", "wireless networks"
    ];



    useEffect(() => {
        fetchData();
    }, [filters]);

    const fetchData = async () => {
        try {
            const skillsQueryParam = filters.skills.join(',');
            const response = await axios.get(`http://localhost:8080/student/filter?skills=${skillsQueryParam}&gender=${filters.gender}&knownLanguages=${filters.knownLanguages}`);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSearchSkillsChange = (e) => {
        setSearchSkills(e.target.value);
    };

    const toggleSkillsDropdown = () => {
        setShowSkillsDropdown(!showSkillsDropdown);
    };

    return (
        <div>
            <div>


                <label onClick={toggleSkillsDropdown}>
                    Skills <span className="arrow-icon">{showSkillsDropdown ? '▲' : '▼'}</span>
                </label>
                {showSkillsDropdown && (
                    <select
                        multiple
                        size="10"
                        className="skills-dropdown"
                        onChange={(e) => setFilters({ ...filters, skills: Array.from(e.target.selectedOptions, (option) => option.value) })}
                    >
                        {allSkills.map((skill) => (
                            <option key={skill} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select>
                )}

                <label>Gender:</label>
                <select name="gender" onChange={handleFilterChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <input type="text" name="knownLanguages" placeholder="Known Languages" onChange={handleFilterChange} />
            </div>
            <table className="table table-striped table-bordered">

                <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Marital Status</th>
                    <th>Known Languages</th>
                    <th>Skills</th>
                    {/* Add more columns for other resume fields */}
                </tr>
                </thead>
                <tbody>
                {data.map((resume) => (
                    <tr key={resume.id}>
                        <td>{resume.id}</td>
                        <td>{resume.name}</td>
                        <td>{resume.email}</td>
                        <td>{resume.phone}</td>
                        <td>{resume.gender}</td>
                        <td>{resume.maritalStatus}</td>
                        <td>{resume.knownLanguages}</td>
                        <td>{resume.skills.replace(/\[|\]/g, '').split(', ').join(', ')}</td>
                        {/* Add more columns for other resume fields */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ResumeList;
