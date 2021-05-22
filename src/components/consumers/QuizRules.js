import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import { Paginator } from 'primereact/paginator';
import { ScrollPanel } from "primereact/scrollpanel";

import MockTest from './MockTest';


const QuizRules = () => {

    const [index, updateIndex] = useState(0);
    const [rows, updateRows] = useState(1);

    const [displayBasic, setDisplayBasic] = useState(false);

    const rules = [
        {
            "title": "User Registration",
            "subtitle": "A Quick Guide To Setting Up Your Account",
            "body": "Registration is MANDATORY to take the online quiz. Please use ONLY the email provided to you by the quizmaster during registration." +
            " This email will be used to identify your responses and keep a track of the score. Any quiz attempted with a non-authorized email will be rejected." +
            " The password field is pretty straightforward. But PLEASE ENSURE PASSWORD LENGTH IS AT LEAST 6 CHARACTERS and the password string must not be" + 
            " 'PASSWORD' or 'password' as these passwords will be rejected by the database.\n" + 
            "If your registration was successful, you will see a GREEN popup message on the top right corner." + 
            " In all other cases, appropriate error message will be displayed." 
        },
        {
            "title": "User Login",
            "subtitle": "A Quick Guide To The Login Process",
            "body": "Once you have registered successfully, you can click on the 'LOGIN' link on the bottom of the signup page to access the Login portal." + 
            " Please note that the login portal is actually to start the quiz. Once you enter your registered email and password, and click on 'START QUIZ' " +
            " you will end up starting the quiz. This means, the timer will start and you will have the alloted time to finish the quiz." + 
            " Please proceed with this step carefully as there is NO GOING BACK. Start the quiz ONLY WHEN YOU FEEL you are ready to do so."
        },
        {
            "title": "The Quiz",
            "subtitle": "A Brief Summary Of The Quiz Rules",
            "body": (
                <ul>
                    <li>
                        The quiz is time based. There are 15 questions in all and you have a total of 200 seconds to attempt them. That's 3 minutes and 20 seconds
                        for a 15 question quiz.
                    </li>
                    <li>
                        Each question has only one correct answer. You only have to click the answer of your choice and proceed to other questions. Please note that 
                        once you answer a question, all the options in that question get disabled and you cannot modify your response to this question anymore. We 
                        suggest you exercise caution while attempting the each and every question as you will not be able to modify them once attempted.
                    </li>
                    <li>
                        You will be provided access to all the questions in the question bank and you can attempt them in any order as you please.
                    </li>
                </ul>
            )
        },
        {
            "title": "Scoring",
            "subtitle" : "A Quick Look At The Scoring Scheme",
            "body": "All questions have 10 points for correct answer. There is no negative marking. Also, there is only ONE correct answer per question." +
            " You can also choose to not attempt a question if you want and only answer a subset of the question bank." + 
            " You are free to use Google or any other medium of your choice to find your answers but do so keeping the remaining time at hand." + 
            " Also, each person can attempt a quiz as many times as they want but only their first attempt will be taken into consideration."
        },
        {
            "title": "Ending The Quiz",
            "subtitle": "An Explanation On How To End The Quiz",
            "body": (
                <ul>
                    <li>
                        You can end the quiz before the schedule time of 200 seconds by clicking on the submit buton. Please note that once you click on SUBMIT
                        button, your score is immediately added to the database. There is no bonus marking if you finish ahead of time.
                    </li>
                    <li>
                        If you are unable to finish the quiz by the designated time slot of 200 seconds, the quiz will automatically end and whatever was your
                        current score at that point of time, will be added to the database. There is no penalty if you cannot finish on time.
                    </li>
                    <li>
                        Please DO NOT logout of your account or hit the back button on the browser in the middle of the quiz as your response will NOT GET 
                        RECORDED and also any further attempts will be rejected by the database.
                    </li>
                </ul>
            )
        },
        {
            "title": "Disabled Buttons",
            "subtitle": "What Are Disabled Buttons",
            "body": (
                <ul>
                    <li>
                        This is a regular button for the quiz which has not been clicked <Button className="p-button-info p-button-sm" label="Unpressed" />
                    </li>
                    <li>
                        This is a diabled button for the quiz when it has been clicked 
                        <Button className="p-button-secondary p-button-sm" loading={true} loadingIcon={null} label="Pressed" />
                    </li>
                    <li>
                        Buttons in a question will get disabled when that question has been attempted. Exercise caution before answering a question as you will
                        not get the opportunity to modify your selection.
                    </li>
                </ul>
            )
        },
        {
            "title": "Mock Test",
            "subtitle": "A Quick Look At The Provided Mock Test",
            "body": "To ensure all our participants have a seamless experience with the quiz, we have provided a sample mock test that mimicks the quiz conditions." +
            " There will be 10 questions in this mock test and you will have 30 seconds to answer them. Please make sure you attempt the mock test" + 
            " before you go to the actual quiz so that you are familiar with the platform.\n" +
            "There will be no scoring for the mock test and its purely for familiarity with platform and therefore, optional by nature."
        }
    ];

    const onPageChange = (event) => {
        updateIndex(event.first);
        updateRows(event.rows);
    }

    const footer = (
        <div>
            <Paginator first={index} rows={rows} totalRecords={7} onPageChange={(onPageChange)}></Paginator>
            <Button className="p-button-help p-button-text"><Link to='/user_login'>Back To Login</Link></Button>
            <Button label="Click Here To Attempt Mock Quiz" className="p-button-info p-button-text" onClick={() => setDisplayBasic(true)} />
        </div>
    )

    return (
        <React.Fragment>
            <div className="p-d-flex p-ai-center p-jc-center p-flex-wrap p-dir-col" style={{ marginTop: '80px' }}>
                <Card 
                    title={rules[index].title}
                    subTitle={rules[index].subtitle}
                    style={{ width: '65%', height: '400px' }}
                    footer={footer}
                >
                    <ScrollPanel style={{ height: '320px' }}>
                    <p>{rules[index].body}</p>
                    </ScrollPanel>
                </Card>
                {displayBasic && <MockTest displayBasic={displayBasic} setDisplayBasic={setDisplayBasic} /> }
            </div>
            
        </React.Fragment>
    )
}

export default QuizRules;
