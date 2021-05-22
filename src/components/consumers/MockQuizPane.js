import React, { useState } from 'react';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';


const MockQuizPane = ({ question, answers, score, updateScore }) => {

    const [loading, setLoading] = useState(false);
 
    const handleClick = (e) => {
        if (e) {

            updateScore(score + 10);

            var currentScore = score + 10;
            sessionStorage.setItem("dummyscore", currentScore);
        }
        setLoading(true);
    }

    return (
        <div>
            <div className="card p-mb-4 fieldset">
                <Fieldset legend={question} toggleable style={{ width: '85%' }}>
                    <p>
                       {answers.map((answer) => {
                            return(
                                <Button 
                                    key={answer['text']}
                                    label={answer['text']} 
                                    className={!loading ? "p-button-info p-button-sm" : "p-button-secondary p-button-sm"} 
                                    onClick={() => handleClick(answer['isCorrect'])}
                                    loading={loading}
                                    loadingIcon={null}
                                />
                            );
                        })}
                    </p>
                </Fieldset>
            </div>
        </div>
    );
}

export default MockQuizPane;