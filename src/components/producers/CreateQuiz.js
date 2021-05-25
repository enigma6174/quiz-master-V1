import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Chips } from 'primereact/chips';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Slider } from 'primereact/slider';
import {Checkbox} from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { confirmDialog } from 'primereact/confirmdialog';


const CreateQuiz = ({ displayBasic, setDisplayBasic }) => {

    let validationCount = 0;

    const toast = useRef(null);

    const quizLevels = [
        { name: 'Easy', code: 'EZ' },
        { name: 'Medium', code: 'MZ' },
        { name: 'Hard', code: 'HZ' }
    ];

    const [tags, setTags] = useState([]);
    const [tagValid, validateTag] = useState(true);

    const [quizName, setQuizName] = useState('');
    const [quizNameValid, validateQuizName] = useState(true);

    const [quizDescription, setQuizDescription] = useState('');
    const [quizDescriptionValid, validateQuizDescription] = useState(true);

    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedLevelValid, validateSelectedLevel] = useState(true);

    const [sliderValue, setSliderValue] = useState(1);

    const [startDate, setStartDate] = useState(null);
    const [startDateValid, validateStartDate] = useState(true);

    const [endDate, setEndDate] = useState(null);
    const [endDateValid, validateEndDate] = useState(true);

    const [dateDisabled, setDateDisabled] = useState(true);
    const [timeEnabled, setTimeEnabled] = useState(false);

    const handleQuizName = (e) => {
        setQuizName(e.target.value);
        validateQuizName(true);
    };

    const handleQuizDescription = (e) => {
        setQuizDescription(e.target.value)
        validateQuizDescription(true);
    };

    const handleStartDate = (e) => {
        setStartDate(e.value);
        setDateDisabled(false);
        validateStartDate(true);
    };

    const handleEndDate = (e) => {
        setEndDate(e.value);
        validateEndDate(true);
    };

    const handleTags = (e) => {
        setTags(e.value);
        validateTag(true);
    };

    const handleDropdown = (e) => {
        setSelectedLevel(e.value);
        validateSelectedLevel(true);
    }

    const reject = () => {
        toast.current.show({ severity: 'info', closable: false, summary: 'Rejected', detail: 'Save Operation Cancelled', life: 3000 });
    };

    const pushData = () => {
        console.log(quizName, " -> ", quizDescription);
        console.log(startDate, " - ", endDate);
        console.log(tags);
        console.log(selectedLevel);
        console.log(timeEnabled, " : ", sliderValue);
    };

    const validateInputFields = () => {

        validationCount = 6;

        if (tags.length === 0) {
            validateTag(false);
            validationCount -= 1;
        }
        if (quizName === '') {
            validateQuizName(false);
            validationCount -= 1;
        }
        if (quizDescription === '') {
            validateQuizDescription(false);
            validationCount -= 1;
        }
        if (selectedLevel === '') {
            validateSelectedLevel(false);
            validationCount -= 1;
        }
        if (startDate === null) {
            validateStartDate(false);
            validationCount -= 1;
        }
        if (endDate === null) {
            validateEndDate(false);
            validationCount -= 1;
        }

        if (validationCount !== 6) {
            return false;
        }

        return true;
    };

    const confirm = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: handleSave,
            reject
        });
    };

    const handleSave = () => {
        let validation = validateInputFields();
        if (validation) {
            pushData();
        }
    };

    const footer = (
        <span>
            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary" onClick={() => setDisplayBasic(false)} />
            <Button label="Save" icon="pi pi-save" style={{marginRight: '.25em'}} onClick={confirm} />
        </span>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <Dialog 
                header="Quiz Configuration Panel" 
                visible={displayBasic}
                style={{ width: '50vw' }}
                footer={footer}
                onHide={() => setDisplayBasic(false)}
            >
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6 p-mb-4">
                        <label htmlFor="quizname">Quiz Name*</label>
                        <InputText 
                            id="quizname" 
                            className={!quizNameValid ? "p-invalid" : ""} 
                            value={quizName} 
                            onChange={handleQuizName} 
                            placeholder="Set A Name For Your Quiz (min. 5 characters)"
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="quizdescription">Quiz Description*</label>
                        <InputText 
                            id="quizdescription" 
                            className={!quizDescriptionValid ? "p-invalid" : ""}
                            value={quizDescription} 
                            onChange={handleQuizDescription}
                            placeholder="Describe Your Quiz In One Line (min. 20 characters)"
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="quizstartdate">Quiz Start Date*</label>
                        <Calendar 
                            id="quizstartdate" 
                            className={!startDateValid ? "p-invalid" : ""}
                            value={startDate} 
                            onChange={handleStartDate}
                            placeholder="Quiz Becomes Live On This Date"
                            maxDate={endDate}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="quizenddate">Quiz End Date*</label>
                        <Calendar 
                            id="quizenddate"
                            className={!endDateValid ? "p-invalid" : ""}
                            disabled={dateDisabled}
                            value={endDate} 
                            onChange={handleEndDate} 
                            placeholder="Stop Accepting Answers After This Date"
                            minDate={startDate}
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-12 p-mt-2">
                        <label htmlFor="quiztag">Quiz Tags* (max. 5)</label>
                        <Chips 
                            className={!tagValid ? "p-invalid" : ""}
                            value={tags} 
                            onChange={handleTags} 
                            max={5} 
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-mt-2">
                        <label htmlFor="quiztype">Quiz Type*</label>
                        <Dropdown
                            className={!selectedLevelValid ? "p-invalid" : ""}
                            value={selectedLevel} 
                            options={quizLevels}
                            optionLabel="name"
                            onChange={handleDropdown} 
                            placeholder="Select Quiz Difficulty Level"
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6 p-mt-2">
                        <div className="p-field-checkbox">
                            <Checkbox 
                                inputId="binary"
                                checked={timeEnabled}
                                onChange={(e) => setTimeEnabled(e.checked)} 
                            />
                            <label htmlFor="binary">Enable Timer</label>
                        </div>
                        <div className="card">
                            <label htmlFor="slide">Set Timer : {sliderValue} minute</label>
                            <Slider 
                                className="p-mt-3 p-ml-2"
                                disabled={!timeEnabled}
                                value={sliderValue} 
                                onChange={(e) => setSliderValue(e.value)} 
                            />
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default CreateQuiz
