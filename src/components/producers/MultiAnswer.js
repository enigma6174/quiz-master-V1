import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';


const MultiAnswer = ({ insertRecords }) => {

    var payload = {};

    const [question, setQuestion] = useState('');

    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');

    const [option1, setOption1] = useState(false);
    const [option2, setOption2] = useState(false);
    const [option3, setOption3] = useState(false);
    const [option4, setOption4] = useState(false);

    const preparePayload = () => {

        payload = {
            "question": question,
            "answers": [answer1, answer2, answer3, answer4],
            "correct": [option1, option2, option3, option4],
            "qtype": "M"
        };
    };

    const handleSave = () => {

        preparePayload();
        insertRecords(payload);

        setQuestion('');
        setAnswer1('');
        setAnswer2('');
        setAnswer3('');
        setAnswer4('');
        
        setOption1(false);
        setOption2(false);
        setOption3(false);
        setOption4(false);

    };

    return (
        <div className="p-grid p-dir-col p-ml-4 p-mt-4">
            <h3>Multiple Option MCQ</h3>

            <div className="p-grid">
                <div className="p-col-10 p-mb-2">
                <div className="p-text-bold" style={{ color: '#e60000', fontSize: '9pt' }}>* check MULTIPLE correct answer(s)</div>
                    <div className="p-inputgroup">
                        <InputText 
                            placeholder="Enter Your Question" 
                            value={question} 
                            onChange={(e) => setQuestion(e.target.value)} 
                        />
                    </div>
                </div>

                <div className="p-col-5">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <Checkbox 
                               checked={option1}
                               onChange={() => setOption1(!option1)}
                            />
                        </span>
                        <InputText 
                            placeholder="Option 1" 
                            value={answer1} 
                            onChange={(e) => setAnswer1(e.target.value)}
                        />
                    </div>
                </div>

                <div className="p-col-5">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <Checkbox 
                               checked={option2}
                               onChange={() => setOption2(!option2)}
                            />
                        </span>
                        <InputText 
                            placeholder="Option 2" 
                            value={answer2} 
                            onChange={(e) => setAnswer2(e.target.value)} 
                        />
                    </div>
                </div>

                <div className="p-col-5">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <Checkbox 
                               checked={option3}
                               onChange={() => setOption3(!option3)}
                            />
                        </span>
                        <InputText 
                            placeholder="Option 3" 
                            value={answer3} 
                            onChange={(e) => setAnswer3(e.target.value)} 
                        />
                    </div>
                </div>
 
                <div className="p-col-5">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <Checkbox 
                               checked={option4}
                               onChange={() => setOption4(!option4)}
                            />
                        </span>
                        <InputText 
                            placeholder="Option 4" 
                            value={answer4} 
                            onChange={(e) => setAnswer4(e.target.value)} 
                        />
                    </div>
                </div>

            </div>
            
            <div className="p-col-10 p-ml-2 p-mt-2 p-d-flex p-jc-end">
                <Button label="Save" icon="pi pi-save" onClick={handleSave} />
            </div>
        </div>
    );
}

export default MultiAnswer;