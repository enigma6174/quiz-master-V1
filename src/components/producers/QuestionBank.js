import React from 'react';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';


const QuestionBank = ({ question, answers, qtype }) => {

    const correctAnswer = "p-button-success p-button-sm p-button";
    const wrongAnswer = "p-button-danger p-button-sm p-button";

    return (
        <div>
            <div className="card p-mb-4 fieldset">
                <Fieldset legend={question} toggleable style={{ width: '85%' }}>
                    <p>
                       {qtype === "S" &&
                           (answers.map((answer) => {
                                return(
                                    <Button
                                        key={answer} 
                                        label={answer['text']} 
                                        className={answer['isCorrect'] ? correctAnswer : wrongAnswer} 
                                    />
                                );
                            })
                        )}
                        {qtype === "M" &&
                           (answers.map((answer) => {
                                return(
                                    <Button
                                        key={answer} 
                                        label={answer} 
                                        // className={correct[answers.indexOf(answer)] ? correctAnswer : wrongAnswer}
                                        className="p-button-success p-button-sm p-button" 
                                    />
                                );
                            })
                        )}
                    </p>
                </Fieldset>
            </div>
        </div>
    );
}

export default QuestionBank;