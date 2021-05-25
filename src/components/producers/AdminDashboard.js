import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Menubar } from 'primereact/menubar';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useHistory } from 'react-router-dom';


import { useAuth } from '../../contexts/AuthContext';
import firebaseDb from '../../db/Firebase';
import SingleAnswer from './SingleAnswer';
import MultiAnswer from './MultiAnswer';
import QuestionBank from './QuestionBank';
import CreateQuiz from './CreateQuiz';


const AdminDashboard = () => {
   
   const toast = useRef(null);
   const history = useHistory();

   const { currentUser, logout } = useAuth();

   const [quizObject, setQuizObject] = useState({});
   const [resultObject, setResultObject] = useState({});

   const [viewItem, setViewItem] = useState('');
   const [questionType, setQuestionType] = useState('');

   const [newQuiz, createNewQuiz] = useState(false);
   const [newPoll, createNewPoll] = useState(false);
   const [menuItemDisabled, setMenuItemDisabled] = useState(true);


   const items = [
      {
         label:'Create',
         icon:'pi pi-fw pi-plus',
         items:[
            {
               label:'Question Bank',
               icon:'pi pi-fw pi-book',
               items: [
                  {
                     label: 'Quiz',
                     icon: 'pi pi-fw pi-file',
                     command: () => {
                        createNewQuiz(true);
                     }
                  },
                  {
                     label: 'Poll',
                     icon: 'pi pi-fw pi-users',
                     command: () => {
                        createNewPoll(true);
                     }
                  }
               ]
            },
            {
               label:'Question',
               icon:'pi pi-fw pi-question',
               disabled: menuItemDisabled,
               items: [
                  {
                     label: 'Single Answer Type',
                     icon: 'pi pi-fw pi-check-circle',
                     command: () => {
                        setQuestionType('single');
                     }
                  },
                  {
                     label: 'Multi Answer Type',
                     icon: 'pi pi-fw pi-check-square',
                     command: () => {
                        setQuestionType('multiple');
                     }
                  },
                  {
                     label: 'Numeric Answer Type',
                     icon: 'pi pi-fw pi-percentage',
                     command: () => {
                        setQuestionType('integer');
                     }
                  },
                  {
                     label: 'True/False Type',
                     icon: 'pi pi-fw pi-question-circle',
                     command: () => {
                        setQuestionType('boolean');
                     }
                  }
               ]
            },
            {
               separator:true
            },
            {
               label: 'Collection',
               icon: 'pi pi-fw pi-table'
            }
         ]
      },
      {
         label:'Edit',
         icon:'pi pi-fw pi-pencil',
         items:[
            {
               label:'Quiz',
               icon:'pi pi-fw pi-file'
            },
            {
               label:'Poll',
               icon:'pi pi-fw pi-users'
            },
            {
               label:'Collection',
               icon:'pi pi-fw pi-table'
            }
         ]
      },
      {
         label:'Delete',
         icon:'pi pi-fw pi-trash',
         items:[
            {
               label:'Quiz',
               icon:'pi pi-fw pi-file',
   
            },
            {
               label:'Poll',
               icon:'pi pi-fw pi-users',
   
            },
            {
               label:'Collection',
               icon:'pi pi-fw pi-table',
            }
         ]
      },
      {
         label:'View',
         icon:'pi pi-fw pi-desktop',
         items:[
            {
               label:'Quiz Results',
               icon:'pi pi-fw pi-list',
               command: () => {
                  setViewItem('quiz_results');
               }, 
            },    
            {
               label:'Quiz Panel',
               icon:'pi pi-fw pi-question',
               command: () => {
                  setViewItem('quiz_panel');
               }
            }
         ]
      },
      {
         label: 'Events',
         icon: 'pi pi-fw pi-calendar',
         items: [
            {
               label: 'Quiz',
               icon: 'pi pi-fw pi-file',
               items: [
                  {
                     label: 'Concluded',
                     icon: 'pi pi-fw pi-calendar-minus'
                  },
                  {
                     label: 'Ongoing',
                     icon: 'pi pi-fw pi-calendar-times'
                  },
                  {
                     label: 'Upcoming',
                     icon: 'pi pi-fw pi-calendar-plus'
                  }
               ],
            },
            {
               label: 'Poll',
               icon: 'pi pi-fw pi-users',
               items: [
                  {
                     label: 'Closed',
                     icon: 'pi pi-fw pi-ban'
                  },
                  {
                     label: 'Voting',
                     icon: 'pi pi-fw pi-bell'
                  },
                  {
                     label: 'Scheduled',
                     icon: 'pi pi-fw pi-clock'
                  }
               ],
            }
         ]
      },
      {
         label: 'Admin',
         icon: 'pi pi-fw pi-user',
         items: [
            {
               label:'Settings',
               icon:'pi pi-fw pi-cog',
            },
            {
               label:'Logout',
               icon:'pi pi-fw pi-sign-out',
               command: () => {
                  handleLogout()
               }
            }
         ]
      }
   ];

   const showSuccess = () => {
      toast.current.show({severity: 'success', closable: false, summary: 'Success', detail: 'Your question was added to question bank', life: 3000});
   };

   const showError = () => {
      toast.current.show({severity: 'error', closable: false, summary: 'Error', detail: 'Your question could not be added to question bank', life: 3000});
   }

   const showLogoutError = () => {
      toast.current.show({severity: 'error', closable: false, summary: 'Error', detail: 'There was a logout error', life: 3000});
   }

   async function handleLogout() {

   try {
      await logout()
      history.push('/')
   } catch {
      showLogoutError()
   }
   }


   const insertRecords = obj => {
      firebaseDb.child('test_quiz').push(
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
      firebaseDb.child('test_quiz').on('value', snapshot => {
         if (snapshot.val() != null) {
               setQuizObject(snapshot.val());
         }
      })
      firebaseDb.child('quiz_score').on('value', snapshot => {
      if (snapshot.val() != null) {
            setResultObject(snapshot.val());
         }
      })
   }, []);


   return (
      <React.Fragment>
         <div className="p-grid p-d-flex p-ai-center p-jc-center">
               <Menubar model={items} />
         </div>

         <div className="p-d-flex p-ai-center p-jc-center p-dir-col">
            <h2>Admin Dashboard</h2>
         </div>

         <Toast ref={toast} />

         {newQuiz && <CreateQuiz displayBasic={newQuiz} setDisplayBasic={createNewQuiz} />}

         {viewItem === 'quiz_panel' &&
            <div className="card">
               <Splitter style={{ height: '540px' }} className="p-mb-5">
                  <SplitterPanel className="p-d-flex p-ai-center p-jc-center">
                     {questionType === 'single' && <SingleAnswer insertRecords={insertRecords} />}
                     {questionType === 'multiple' && <MultiAnswer insertRecords={insertRecords} />}
                  </SplitterPanel>
                  <SplitterPanel className="p-d-flex p-ai-center p-jc-center p-dir-col">
                     <ScrollPanel style={{ width: '85%', height: '500px' }} className="custom">
                     {
                           Object.keys(quizObject).map(item => {
                              return (
                                 <QuestionBank 
                                       key={item}
                                       question={quizObject[item].question} 
                                       answers={quizObject[item].answers} 
                                       qtype={quizObject[item].qtype}
                                 />
                              )
                           })
                     }
                     </ScrollPanel>
                  </SplitterPanel>
               </Splitter>
            </div>
         }

         {viewItem === 'quiz_results' && 
            <div style={{ marginTop: '100px' }}>
               <ScrollPanel style={{ width: '60%', height: '500px' }} className="custom">       
               {
                  Object.keys(resultObject).map(item => {
                     return (
                           <div>
                              <h2>USER : {resultObject[item].user}  SCORE : {resultObject[item].score}</h2>
                           </div>
                     )
                  })
               }
               </ScrollPanel>
            </div>
         }
      </React.Fragment>
   );
}

export default AdminDashboard;