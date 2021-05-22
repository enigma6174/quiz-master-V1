import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';


const SingleAnswer = ({ insertRecords }) => {

    var payload = {};

    const [question, setQuestion] = useState('');

    const [answer1, setAnswer1] = useState(undefined);
    const [answer2, setAnswer2] = useState(undefined);
    const [answer3, setAnswer3] = useState(undefined);
    const [answer4, setAnswer4] = useState(undefined);

    const [option1, setOption1] = useState(false);
    const [option2, setOption2] = useState(false);
    const [option3, setOption3] = useState(false);
    const [option4, setOption4] = useState(false);

    const preparePayload = () => {

        payload = {
            "question": question,
            "answers": [answer1, answer2, answer3, answer4],
            "qtype": "S"
        };
    };

    const handleSave = () => {

        preparePayload();
        insertRecords(payload);

        setQuestion('');

        setAnswer1(undefined);
        setAnswer2(undefined);
        setAnswer3(undefined);
        setAnswer4(undefined);

        setOption1(false);
        setOption2(false);
        setOption3(false);
        setOption4(false);
    };

    return (
        <div className="p-grid p-dir-col p-ml-4 p-mt-4">
            <h3>Single Option MCQ</h3>

            <div className="p-grid">
                <div className="p-col-10 p-mb-2">
                <div className="p-text-bold" style={{ color: '#e60000', fontSize: '9pt' }}>* check ONLY ONE correct answer</div>
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
                            value={answer1 === undefined ? '' : answer1['text']} 
                            onChange={(e) => setAnswer1({'text': e.target.value, 'isCorrect': option1})}
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
                            value={answer2 === undefined ? '' : answer2['text']} 
                            onChange={(e) => setAnswer2({'text': e.target.value, 'isCorrect': option2})} 
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
                            value={answer3 === undefined ? '' : answer3['text']} 
                            onChange={(e) => setAnswer3({'text': e.target.value, 'isCorrect': option3})} 
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
                            {/* <RadioButton 
                                // inputId="id1" 
                                // value={3} 
                                // onChange={(e) => setOption(e.value)} 
                                // checked={option === 3} 
                            /> */}
                        </span>
                        <InputText 
                            placeholder="Option 4" 
                            value={answer4 === undefined ? '' : answer4['text']} 
                            onChange={(e) => setAnswer4({'text': e.target.value, 'isCorrect': option4})} 
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

export default SingleAnswer;