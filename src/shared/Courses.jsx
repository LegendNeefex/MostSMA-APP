import React from 'react'
import { useContext } from 'react'
import MostSmaContext from '../context/Most-smaContext'

function Courses() {
    const {courseClick} = useContext(MostSmaContext)

    return (
        <div className='options-school'>
            <input list="course" type="text" name="nigerian-courses" id="nigerian-courses"  placeholder='Enter or select your course' onChange={courseClick} />
            <datalist id='course'>
                <option value="Agricultural Science">Agricultural Science</option>
                <option value="Animal Science">Animal Science</option>
                <option value="Applied Chemistry">Applied Chemistry</option>
                <option value="Applied Physics">Applied Physics</option>
                <option value="Architecture">Architecture</option>
                <option value="Biochemistry">Biochemistry</option>
                <option value="Biology">Biology</option>
                <option value="Biomedical Engineering">Biomedical Engineering</option>
                <option value="Biotechnology">Biotechnology</option>
                <option value="Botany">Botany</option>
                <option value="Building Technology">Building Technology</option>
                <option value="Chemical Engineering">Chemical Engineering</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Data Science">Data Science</option>
                <option value="Dentistry">Dentistry</option>
                <option value="Ecology">Ecology</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Electronics Engineering">Electronics Engineering</option>
                <option value="Environmental Science">Environmental Science</option>
                <option value="Fisheries and Aquaculture">Fisheries and Aquaculture</option>
                <option value="Food Science and Technology">Food Science and Technology</option>
                <option value="Forestry">Forestry</option>
                <option value="Geography">Geography</option>
                <option value="Geology">Geology</option>
                <option value="Industrial Chemistry">Industrial Chemistry</option>
                <option value="Industrial Mathematics">Industrial Mathematics</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Marine Biology">Marine Biology</option>
                <option value="Material Science">Material Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Mechatronics Engineering">Mechatronics Engineering</option>
                <option value="Medical Laboratory Science">Medical Laboratory Science</option>
                <option value="Microbiology">Microbiology</option>
                <option value="Mining Engineering">Mining Engineering</option>
                <option value="Molecular Biology">Molecular Biology</option>
                <option value="Nursing">Nursing</option>
                <option value="Petroleum Engineering">Petroleum Engineering</option>
                <option value="Pharmaceutical Science">Pharmaceutical Science</option>
                <option value="Physics">Physics</option>
                <option value="Physiology">Physiology</option>
                <option value="Radiography">Radiography</option>
                <option value="Robotics Engineering">Robotics Engineering</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Statistics">Statistics</option>
                <option value="Structural Engineering">Structural Engineering</option>
                <option value="Surveying and Geoinformatics">Surveying and Geoinformatics</option>
                <option value="Telecommunications Engineering">Telecommunications Engineering</option>
                <option value="Veterinary Medicine">Veterinary Medicine</option>
                <option value="Zoology">Zoology</option>

            </datalist>
        </div>
    )
}

export default Courses