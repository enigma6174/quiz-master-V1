import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { Menubar } from 'primereact/menubar';

import { useAuth } from '../../contexts/AuthContext';
import firebaseDb from '../../db/Firebase';
import QuizRules from './QuizRules';
import QuizEvent from './QuizEvent';
import MockTest from './MockTest';


const UserDashboard = () => {

    const toast = useRef(null);
    const history = useHistory();
    const { currentUser, logout } = useAuth();

    const [quizObject, setQuizObject] = useState({});
    const [currentState, setCurrentState] = useState('');
    const [knowledgeBank, setKnowledgeBank] = useState({});
    const [displayMockTest, setDisplayMockTest] = useState(false);

    const items = [
        {
            label: 'Home', 
            icon: 'pi pi-fw pi-home', 
            idf: 'home'
        },
        {
            label: 'Rules', 
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'Quiz Rules',
                    icon: 'pi pi-fw pi-book',
                    command: () => {setCurrentState('q_rules')}
                }
            ],
        },
        {
            label: 'Upcoming Events', 
            icon: 'pi pi-fw pi-calendar', 
            idf: 'ft_events'
        },
        {
            label: 'Quiz', 
            icon: 'pi pi-fw pi-pencil', 
            items: [
                {
                    label: 'Start Quiz',
                    icon: 'pi pi-fw pi-question',
                    command: () => {handleQuizStart()}
                },
                {
                    separator: true
                },
                {
                    label: 'Mock Quiz',
                    icon: 'pi pi-fw pi-question-circle',
                    command: () => {setDisplayMockTest(true)}
                }
            ]
        },
        {
            label: currentUser.email,
            icon: 'pi pi-fw pi-user', 
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-cog',
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-fw pi-sign-out',
                    command: () => {handleLogout()}
                }
            ]
        }
    ];

    const showLogoutError = () => {
        toast.current.show({severity: 'error', closable: false, summary: 'Error', detail: 'There was an error logging you out!', life: 5000});
     };

    const handleLogout = async() => {
        try {
            await logout();
            history.push('/user_login');
        }
        catch {
            showLogoutError();
        }
    };

    const handleQuizStart = () => {
        console.log(knowledgeBank);
    }

    const prepareKnowledgeBank = () => {

    //    axios.get('https://jsonplaceholder.typicode.com/posts')
    //    .then(response => {
    //        if (response.status === 200) {
    //            console.log(response.data);
    //        }
    //    })

        firebaseDb.child('test_quiz').on('value', snapshot => {
            if (snapshot.val() != null) {
              const a = snapshot.val();
              const buffer = Object.keys(a).map(item => {
                  return (
                      {
                          question: a[item].question,
                          answers: a[item].answers
                      }
                  )
              })
              console.log(buffer);
              setKnowledgeBank(buffer);
            }
        });

        // const buffer = Object.keys(quizObject).map(item => {
        //     return (
        //         {
        //             question: quizObject[item].question,
        //             answers: quizObject[item].answers
        //         }
        //     )
        // });

        // setKnowledgeBank(buffer);
    }

    useEffect(() => {
        prepareKnowledgeBank();
    }, []);

    return (
        <React.Fragment>
            <Toast ref={toast} />
            <Menubar model={items} />
            {currentState === 'q_rules' && <QuizRules />}
            {displayMockTest && <MockTest displayBasic={displayMockTest} setDisplayBasic={setDisplayMockTest} />}
            {/* <QuizEvent quizObject={quizObject} /> */}
        </React.Fragment>
    );
};

export default UserDashboard;
