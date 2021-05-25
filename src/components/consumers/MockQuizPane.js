import React, { useState } from 'react';
import { Card } from 'primereact/card';
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
        console.log(e.id);
    }

    return (
        <div>
            <div className="card p-mb-4 fieldset">
                <Card title={question}>
                    <p>
                       {answers.map((answer) => {
                            return(
                                <Button 
                                    key={answer['text']}
                                    id={answer['text']}
                                    label={answer['text']}
                                    className={!loading ? "p-button-outlined p-button-sm" : "p-button-sm"} 
                                    onClick={() => handleClick(answer['isCorrect'])}
                                    loading={loading}
                                    loadingIcon={null}
                                />
                            );
                        })}
                    </p>
                </Card>
            </div>
        </div>
    );
}

export default MockQuizPane;