import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './styles.css';

function ResumeList() {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        skills: [],
        gender: '',
        knownLanguages: [],
    });
    const [searchSkills, setSearchSkills] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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

    const knownLanguages = [
        'English',
        'French',
        'German',
        'Hindi',
        'Marathi',
        // Add more languages as needed
    ];

    useEffect(() => {
        fetchData();
    }, [filters]);

    const fetchData = async () => {
        try {
            const skillsQueryParam = filters.skills.join(',');
            const languagesQueryParam = filters.knownLanguages.join(',');
            const response = await axios.get(`http://localhost:8080/student/filter?skills=${skillsQueryParam}&gender=${filters.gender}&knownLanguages=${languagesQueryParam}`);
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
        const searchQuery = e.target.value.toLowerCase();
        setSearchSkills(searchQuery);
    };

    const handleSkillCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setFilters({ ...filters, skills: [...filters.skills, value] });
        } else {
            setFilters({ ...filters, skills: filters.skills.filter((skill) => skill !== value) });
        }
    };
    const handleKnownLanguagesChange = (e) => {
        const selectedLanguages = Array.from(e.target.selectedOptions, (option) => option.value);
        setFilters({ ...filters, knownLanguages: selectedLanguages });
    };

    const handleClearFilters = () => {
        setFilters({
            skills: [],
            gender: '',
            knownLanguages: [],
        });
        setSearchSkills('');
    };

    const openFilterModal = () => {
        setIsFilterModalOpen(true);
    };

    const closeFilterModal = () => {
        setIsFilterModalOpen(false);
    };

    const filteredSkillsList = allSkills.filter((skill) =>
        skill.toLowerCase().includes(searchSkills)
    );

    return (
        <div className="container">
            <button onClick={openFilterModal} className="filter-toggle-button">
                Filters
            </button>
            <div className="table-container">
                <h2>Filtered Resumes</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Marital Status</th>
                        <th>Known Languages</th>
                        <th>Skills</th>
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
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {isFilterModalOpen && (
                <div className="filter-modal">
                    <div className="filter-modal-content">
                        <button onClick={handleClearFilters} className="clear-filters-button">
                            Clear All Filters
                        </button>
                        <div className="filter-section">
                            <label>Skills:</label>
                            <input
                                type="search"
                                placeholder="Search Skills"
                                value={searchSkills}
                                onChange={handleSearchSkillsChange}
                            />
                            <div className="skills-box">
                                <ul>
                                    {filteredSkillsList.map((skill) => (
                                        <li key={skill}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={skill}
                                                    checked={filters.skills.includes(skill)}
                                                    onChange={handleSkillCheckboxChange}
                                                />
                                                {skill}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="filter-section">
                            <label>Gender:</label>
                            <select name="gender" onChange={handleFilterChange}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <label>Known Languages:</label>
                            <select
                                name="knownLanguages"
                                multiple
                                onChange={handleKnownLanguagesChange}
                            >
                                {knownLanguages.map((language) => (
                                    <option key={language} value={language}>
                                        {language}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={closeFilterModal} className="close-filter-button">
                            Close
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}

export default ResumeList;
