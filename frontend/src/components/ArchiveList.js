import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './styles.css';

function ArchiveList() {
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
        "performance testing", "php", "phpmyadmin", "pid","power bi","presentation skills", "problem-solving",
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
        'Arabic',
        'Chinese',
        'Dutch',
        'English',
        'Filipino',
        'French',
        'German',
        'Greek',
        'Hindi',
        'Indonesian',
        'Italian',
        'Japanese',
        'Korean',
        'Marathi',
        'Persian',
        'Portuguese',
        'Russian',
        'Spanish',
        'Swedish',
        'Thai',
        'Turkish',
        'Vietnamese'
    ];

    useEffect(() => {
        fetchData();
    }, [filters]);

    const fetchData = async () => {
        try {
            const skillsQueryParam = filters.skills.join(',');
            const languagesQueryParam = filters.knownLanguages.join(',');
            const response = await axios.get(`http://localhost:8080/student/archivedResumes`);
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

    const openDefaultEmailClient = (email , name) => {
        // Encode the subject and message for inclusion in the mailto URL
        const encodedSubject = encodeURIComponent('Notification of Shortlisting for [Job Title] Position');
        const encodedMessage = encodeURIComponent('Dear [Applicant\'s Name],\n' +
            '\n' +
            'I hope this email finds you well. We wanted to reach out to you regarding your recent application for the [Job Title] position at [Company Name]. We appreciate your interest in our organization and your time and effort invested in the application process.\n' +
            '\n' +
            'I am pleased to inform you that your application has been carefully reviewed, and we are impressed with your qualifications and experience. After careful consideration, we are pleased to inform you that you have been shortlisted for the next stage of the selection process.\n' +
            '\n' +'Our HR team will be in touch with you shortly to provide further instructions and schedule the upcoming steps. We encourage you to prepare for this stage and feel free to reach out if you have any questions or require additional information.\n' +
            '\n' +
            'Once again, congratulations on being shortlisted, and thank you for considering [Company Name] as your potential employer. We are eager to get to know you better and explore the possibility of you joining our team.\n' +
            '\n' +
            'We appreciate your interest in our organization and look forward to the opportunity to meet with you.\n' +
            '\n' +
            'Best regards,\n' +
            '\n' +
            '[Your Name]\n' +
            '[Your Title]\n' +
            '[Company Name]\n' +
            '[Your Contact Information]');

        // Use `window.open` to open the user's default email client with the specified subject and message
        window.open(`mailto:${email}?subject=${encodedSubject}&body=${encodedMessage}`);
    };

    const handleArchive = async (id) => {
        try {
            // Call the backend API to archive the resume with the given id
            await axios.post(`http://localhost:8080/student/${id}/unarchive`);

            // After successful archiving, update the state to reflect the change
            setData(prevData => prevData.filter(resume => resume.id !== id));
        } catch (error) {
            console.error('Error archiving resume:', error);
        }
    };
    return (
        <div className="container">

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
                        <th>Mark as Unsent</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((archived_resumes) => (
                        <tr key={archived_resumes.id}>
                            <td>{archived_resumes.id}</td>
                            <td>{archived_resumes.name}</td>
                            <td>{archived_resumes.email}</td>
                            <td>{archived_resumes.phone}</td>
                            <td>{archived_resumes.gender}</td>
                            <td>{archived_resumes.maritalStatus}</td>
                            <td>{archived_resumes.knownLanguages}</td>
                            <td>{archived_resumes.skills.replace(/\[|\]/g, '').split(', ').join(', ')}</td>

                            <td>
                                <button onClick={() => handleArchive(archived_resumes.id)}>UnArchive</button>
                            </td>
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

export default ArchiveList;
