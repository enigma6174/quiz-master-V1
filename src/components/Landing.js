import React from 'react'
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';


function Landing() {

    const history = useHistory();

    const handleUserCard = () => {
        history.push('/user_signup')
    }

    const handleAdminCard = () => {
        history.push('/admin_login')
    };

    return (
        <div>
            <div className="card p-d-flex p-ai-center p-jc-center p-dir-col" style={{ marginTop: '150px'}}>
                <h1>Welcome To Quiz Portal</h1>
                <Splitter style={{ height: '320px', width: '50%' }} className="p-mb-5">
                    <SplitterPanel className="p-d-flex p-ai-center p-jc-center p-dir-col">
                        <i 
                            className="pi pi-user p-d-flex p-ai-center p-jc-center p-dir-col" 
                            style={{'fontSize': '3em' }} 
                            onClick={handleUserCard}
                        >
                            <p>User Panel</p>
                        </i>
                    </SplitterPanel>
                    <SplitterPanel className="p-d-flex p-ai-center p-jc-center">
                        <i 
                            className="pi pi-cog p-d-flex p-ai-center p-jc-center p-dir-col" 
                            style={{'fontSize': '3em' }} 
                            onClick={handleAdminCard}
                        >
                            <p>Admin Panel</p>
                        </i>
                    </SplitterPanel>
                </Splitter>
            </div>
        </div>
    )
}

export default Landing
