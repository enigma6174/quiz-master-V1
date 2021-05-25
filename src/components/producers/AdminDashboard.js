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


const AdminDashboard = () => {
   
   const toast = useRef(null);
   const history = useHistory();

   const { currentUser, logout } = useAuth();

   const [quizObject, setQuizObject] = useState({});
   const [resultObject, setResultObject] = useState({});

   const [showSingleType, setSingleType] = useState(false);
   const [showMultiType, setMultiType] = useState(false);
   
   const [viewItem, setViewItem] = useState('');

   const items = [
      {
         label:'Create',
         icon:'pi pi-fw pi-file',
         items:[
            {
               label:'Question',
               icon:'pi pi-fw pi-plus',
               items:[
                  {
                     label:'Single Correct',
                     icon:'pi pi-fw pi-check-circle',
                     command: () => {
                        setMultiType(false);
                        setSingleType(true);
                     }
                  },
                  {
                     label:'Multi Correct',
                     icon:'pi pi-fw pi-check-square',
                     command: () => {
                        setSingleType(false);
                        setMultiType(true);
                     }
                  },
               ]
            },
            {
               label:'Question Bank',
               icon:'pi pi-fw pi-book'
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
               label:'Left',
               icon:'pi pi-fw pi-align-left'
            },
            {
               label:'Right',
               icon:'pi pi-fw pi-align-right'
            },
            {
               label:'Center',
               icon:'pi pi-fw pi-align-center'
            },
            {
               label:'Justify',
               icon:'pi pi-fw pi-align-justify'
            },
   
         ]
      },
      {
         label:'Users',
         icon:'pi pi-fw pi-user',
         items:[
            {
               label:'New',
               icon:'pi pi-fw pi-user-plus',
   
            },
            {
               label:'Delete',
               icon:'pi pi-fw pi-user-minus',
   
            },
            {
               label:'Search',
               icon:'pi pi-fw pi-users',
               items:[
                  {
                     label:'Filter',
                     icon:'pi pi-fw pi-filter',
                     items:[
                        {
                           label:'Print',
                           icon:'pi pi-fw pi-print'
                        }
                     ]
                  },
                  {
                     icon:'pi pi-fw pi-bars',
                     label:'List'
                  }
               ]
            }
         ]
      },
      {
         label:'Events',
         icon:'pi pi-fw pi-calendar',
         items:[
            {
               label:'View',
               icon:'pi pi-fw pi-table',
               items:[
                  {
                     label:'Quiz Results',
                     icon:'pi pi-fw pi-list',
                     command: () => {
                        setViewItem('quiz_results');
                     }
                  },
                  {
                     label:'Quiz Panel',
                     icon:'pi pi-fw pi-question',
                     command: () => {
                        setViewItem('quiz_panel');
                     }
                  },
   
               ]
            }
         ]
      },
      {
         label: currentUser.email,
         icon: 'pi pi-fw pi-user',
         items: [
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
         <div className="p-grid">
               <Menubar className="p-col-6 p-offset-3" model={items} />
         </div>

         <div className="p-d-flex p-ai-center p-jc-center p-dir-col">
            <h2>Admin Dashboard</h2>
         </div>

         <Toast ref={toast} />

         {viewItem === 'quiz_panel' &&
            <div className="card">
               <Splitter style={{ height: '540px' }} className="p-mb-5">
                  <SplitterPanel className="p-d-flex p-ai-center p-jc-center">
                     {showSingleType && <SingleAnswer insertRecords={insertRecords} />}
                     {showMultiType && <MultiAnswer insertRecords={insertRecords} />}
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