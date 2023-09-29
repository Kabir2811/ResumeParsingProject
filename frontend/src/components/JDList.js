import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './styles.css';

function JDList() {
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
        "bootstrap", "branding", "business analysis", "business development", "c++", "call center management",
        "climate change mitigation", "cloud computing", "cloud native", "cloud orchestration","communication", "computer graphics",
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
            const response = await axios.get(`http://localhost:8080/jd/show`);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <div className="container">

            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Gender</th>
                    <th>Known Languages</th>
                    <th>Skills</th>
                    {/* Add more columns for other resume fields */}
                </tr>
                </thead>
                <tbody>
                {data.map((jd) => (
                    <tr key={jd.id}>
                        <td>{jd.id}</td>
                        <td>{jd.gender}</td>
                        <td>{jd.knownLanguages}</td>
                        <td>{jd.skills.replace(/\[|\]/g, '').split(', ').join(', ')}</td>
                        {/* Add more columns for other resume fields */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default JDList;
