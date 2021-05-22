import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { ScrollPanel } from 'primereact/scrollpanel';

import QuizPane from '../consumers/MockQuizPane';


export default function MockTest({ displayBasic, setDisplayBasic }) {

    const interval = useRef(null);

    const [value1, setValue1] = useState(0);
    const [score, updateScore] = useState(0);

    const [submit, setSubmit] = useState(false);
    const [timeover, setTimeOver] = useState(false);
    const [loading, setLoading] = useState(false);

    const questionBank = [
        {
            'question': 'Which tech company has the largest cash reserve?',
            'answers': [
                {'text': 'Google', 'isCorrect': false},
                {'text': 'Microsoft', 'isCorrect': false},
                {'text': 'Apple', 'isCorrect': true},
                {'text': 'Facebook', 'isCorrect': false}
            ]
        },
        {
            'question': 'Which was the first manned space flight to moon?',
            'answers': [
                {'text': 'Apollo 12', 'isCorrect': false},
                {'text': 'Apollo 11', 'isCorrect': true},
                {'text': 'Apollo 13', 'isCorrect': false},
                {'text': 'Apollo 10', 'isCorrect': false}
            ]
        },
        {
            'question': 'Based on a global survey of 500 couples, what is the average time for orgasm?',
            'answers': [
                {'text': "6'30 minutes", 'isCorrect': false},
                {'text': '5 minutes', 'isCorrect': false},
                {'text': "5'30 minutes", 'isCorrect': true},
                {'text': "4'30", 'isCorrect': false}
            ]
        },
        {
            'question': "Which of these players has never won the Ballon d'Or?",
            'answers': [
                {'text': 'Thiery Henry', 'isCorrect': true},
                {'text': 'Rivaldo', 'isCorrect': false},
                {'text': 'Pavel Nedved', 'isCorrect': false},
                {'text': 'Luka Modric', 'isCorrect': false}
            ]
        },
        {
            'question': 'Which club has the most number of PL titles ?',
            'answers': [
                {'text': 'Manchester United (21)', 'isCorrect': false},
                {'text': 'Liverpool (20)', 'isCorrect': false},
                {'text': 'Manchester United (20)', 'isCorrect': true},
                {'text': 'Liverpool (21)', 'isCorrect': false}
            ]
        },
        {
            'question': 'Which Indian state is the largest producer of wheat?',
            'answers': [
                {'text': 'Punjab', 'isCorrect': false},
                {'text': 'Uttar Pradesh', 'isCorrect': true},
                {'text': 'West Bengal', 'isCorrect': false},
                {'text': 'Maharashtra', 'isCorrect': false}
            ]
        },
        {
            'question': 'Which one of the following countries has the legal age of consensual sex at just 14 years old?',
            'answers': [
                {'text': 'Pakistan', 'isCorrect': false},
                {'text': 'France', 'isCorrect': false},
                {'text': 'China', 'isCorrect': true},
                {'text': 'Argentina', 'isCorrect': false}
            ]
        },
        {
            'question': 'Who is the richest man on Earth right now?',
            'answers': [
                {'text': 'Mukesh Ambani', 'isCorrect': false},
                {'text': 'Mark Zuckerberg', 'isCorrect': false},
                {'text': 'Bill Gates', 'isCorrect': false},
                {'text': 'Jeff Bezos', 'isCorrect': true}
            ]
        },
        {
            'question': 'Which of the following is the largest moon of Jupiter?',
            'answers': [
                {'text': 'GooglEuropae', 'isCorrect': false},
                {'text': 'Titan', 'isCorrect': false},
                {'text': 'Calisto', 'isCorrect': false},
                {'text': 'Ganymede', 'isCorrect': true}
            ]
        },
        {
            'question': 'Which football player has the record of the fastest hattrick in Premier League?',
            'answers': [
                {'text': 'Harry Kane', 'isCorrect': false},
                {'text': 'Sadio Mane', 'isCorrect': true},
                {'text': 'Scott McTominay', 'isCorrect': false},
                {'text': 'Frank Lampard', 'isCorrect': false}
            ]
        }  
    ];

    const handleClick = () => {
        setLoading(true);
        clearInterval(interval.current);
        interval.current = null;
        setSubmit(true);
    };

    const handleTimeout = () => {
        setLoading(true);
        setTimeOver(true);
    }

    useEffect(() => {
        let val = value1;
        interval.current = setInterval(() => {
            val += 4;

            if (val >= 100) {
                val = 100;
                handleTimeout();
                clearInterval(interval.current);
            }

            setValue1(val);
        }, 3000);

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = null;
            }
        }
    }, []);

    return (
        <div className="p-d-flex p-ai-center p-jc-center p-dir-col">
            <Dialog header="Congratulations You Have Completed The Test"
                visible={submit} 
                style={{ width: '50vw' }} 
                onHide={() => setSubmit(false)}
            >
                <h3>You Scored {score} Points!</h3>
                <p>Hope you got an idea of the quiz platform and how it works</p>
            </Dialog>
            <Dialog header="Sorry You Ran Out Of Time"
                visible={timeover} 
                style={{ width: '50vw' }} 
                onHide={() => setTimeOver(false)}
            >
                <h3>You Scored {parseInt(sessionStorage.getItem('dummyscore'))} Points!</h3>
                <p>Hope you got an idea of the quiz platform and how it works</p>
            </Dialog>
            <Dialog 
                header="Mock Test" 
                visible={displayBasic} 
                style={{ width: '80vw' }} 
                onHide={() => setDisplayBasic(false)}
            >
                <ScrollPanel style={{ width: '65vw', height: '400px' }} className="custom">
                {
                    questionBank.map((item) => {
                        return (
                            <QuizPane 
                                key={item}
                                question={item.question} 
                                answers={item.answers} 
                                score={score}
                                updateScore={updateScore}
                            />
                        )
                    })
                }
                </ScrollPanel>
                <div className="card p-mt-2">
                    <ProgressBar value={value1}></ProgressBar>
                    <Button 
                        label="Submit Quiz" 
                        icon="pi pi-save" 
                        className="p-button-rounded p-button-success" 
                        loading={loading}
                        loadingIcon={null}
                        onClick={handleClick} 
                    />
                </div>
            </Dialog>
        </div>
    )
}
