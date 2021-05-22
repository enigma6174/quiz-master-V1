import React, { useState, useEffect } from 'react';

import firebaseDb from '../../db/Firebase';
import QuizEvent from './QuizEvent';

const UserDashboard = () => {

    const [quizObject, setQuizObject] = useState({});

    useEffect(() => {
        firebaseDb.child('test_quiz').on('value', snapshot => {
            if (snapshot.val() != null) {
                setQuizObject(snapshot.val());
            }
        })
    }, []);

    return (
        <QuizEvent quizObject={quizObject} />
    );
};

export default UserDashboard;
