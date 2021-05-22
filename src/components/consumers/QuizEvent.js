import React, { useState, useEffect, useRef } from 'react';
import { Chip } from 'primereact/chip';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ProgressBar } from 'primereact/progressbar';
import { ScrollPanel } from 'primereact/scrollpanel';
import { useHistory } from 'react-router-dom';

import firebaseDb from '../../db/Firebase';
import { useAuth } from '../../contexts/AuthContext';


import QuizPane from './QuizPane';

const QuizEvent = ({ quizObject }) => {

    const history = useHistory();
    const { currentUser, logout } = useAuth();

    const interval = useRef(null);
    const toast = useRef(null);

    const [value1, setValue1] = useState(0);
    const [score, updateScore] = useState(0);
    const [submit, setSubmit] = useState(false);
    const [timeover, setTimeOver] = useState(false);

    const showSuccess = () => {
        toast.current.show({severity: 'success', closable: false, summary: 'Success', detail: 'Your Test Results Were Saved', life: 3000});
    };
    const showError = () => {
        toast.current.show({severity: 'error', closable: false, summary: 'Error', detail: 'There Was An Error Saving Your Results', life: 3000});
    };
    const showLogoutError = () => {
        toast.current.show({severity: 'error', closable: false, summary: 'Error', detail: 'There was a logout error', life: 3000});
    };

    const handleClick = () => {

        clearInterval(interval.current);
        interval.current = null;

        var payload = {
            'user': currentUser.email,
            'score': score
        }
        insertRecords(payload);
        setSubmit(true);
    }

    const handleTimeout = () => {

        var currentScore;

        setTimeOver(true);
        
        if (!sessionStorage.getItem('score')) {
            currentScore = 0;    
        }
        else {
            currentScore = parseInt(sessionStorage.getItem('score'));
        }

        var payload = {
            'user' : currentUser.email,
            'score' : currentScore
        }
        insertRecords(payload);
    }

    async function handleLogout() {

        try {
           await logout()
           history.push('/')
        } catch {
           showLogoutError()
        }

        setSubmit(false);
    }

    const insertRecords = obj => {
        firebaseDb.child('quiz_score').push(
            obj,
            error => {
                if (error) {
                    console.error(error);
                    showError();
                }
                else {
                    showSuccess();
                }
            }
        )
    };

    useEffect(() => {
        let val = value1;
        interval.current = setInterval(() => {
            val += 1;

            if (val >= 100) {
                val = 100;
                toast.current.show({ severity: 'warning', closable: false, summary: 'Time Over', detail: 'Sorry, you ran out of time', life: 3000 });
                handleTimeout();
                clearInterval(interval.current);
            }

            setValue1(val);
        }, 2000);

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = null;
            }
        }
    }, []);

    return (
        <React.Fragment>
            <div className="p-d-flex p-ai-center p-jc-center p-flex-wrap">
                <Chip label={currentUser.email} icon="pi pi-user" className="p-mr-2 p-mb-2 p-mt-2" />
            </div>
            <div className="p-d-flex p-ai-center p-jc-center p-dir-col" style={{ marginTop: '30px' }}>
                <Toast ref={toast}></Toast>
                <Dialog header={"Congratulations " + currentUser.email + " You Have Completed The Test"} 
                    visible={submit} 
                    style={{ width: '50vw' }} 
                    onHide={handleLogout}
                >
                    <h3>You Scored {score} Points!</h3>
                    <p>Thank you for attempting the quiz. Your score has been added to the database. Please do not attempt this quiz more than once.
                        We would also appreciate it a lot if you did not share the questions with other participants. We look forward to seeing you in the
                        subsequent rounds of the quiz event. For now, you are done, grab a beer and chill!
                    </p>
                </Dialog>
                <Dialog header={"Sorry " + currentUser.email + " You Ran Out Of Time"} 
                    visible={timeover} 
                    style={{ width: '50vw' }} 
                    onHide={handleLogout}
                >
                    <h3>You Scored {parseInt(sessionStorage.getItem('score'))} Points!</h3>
                    <p>Thank you for attempting the quiz. You were not able to complete the quiz on time but rest assured, your current score has been added to the
                        database. Who knows, maybe you will win the event? For now you are done, grab a beer and chill!
                    </p>
                </Dialog>
                <ScrollPanel style={{ width: '60%', height: '400px' }} className="custom">
                {
                    Object.keys(quizObject).map(item => {
                        return (
                            <QuizPane 
                                key={item}
                                question={quizObject[item].question} 
                                answers={quizObject[item].answers} 
                                score={score}
                                updateScore={updateScore}
                            />
                        )
                    })
                }
                </ScrollPanel>
                <div className="card p-mt-2">
                    <ProgressBar value={value1}></ProgressBar>
                    <Button label="Submit Quiz" icon="pi pi-save" className="p-button-rounded p-button-success" onClick={handleClick} />
                </div>
            </div>
        </React.Fragment>
    )
};

export default QuizEvent;
