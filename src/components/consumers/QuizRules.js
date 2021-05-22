import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const QuizRules = () => {

    const footer = (<Link to='/user_login'>Back To Login</Link>);

    return (
        <div className="p-d-flex p-ai-center p-jc-center" style={{ marginTop: '100px' }}>
            <Card 
                title="Quiz Rules And Regulations"
                subTitle="Please Go Through The Rules Thoroughly Before You Attempt The Quiz"
                footer={footer}
                style={{ width: '60%' }}
            >
                <div className="p-grid p-dir-col">
                    <div className="p--fixed">Rule 1</div>
                    <div className="p--fixed">Rule 2</div>
                    <div className="p--fixed">Rule 3</div>
                    <div className="p--fixed">Rule 4</div>
                    <div className="p--fixed">Rule 5</div>
                    <div className="p--fixed">Rule 6</div>
                </div>
            </Card>
        </div>
    )
}

export default QuizRules;
