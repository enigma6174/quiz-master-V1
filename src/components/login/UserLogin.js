import React, { useState, useRef } from 'react';

import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext';


const UserLogin = () => {

    const history = useHistory();
    const { userLogin } = useAuth();

    const toast = useRef(null);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const showError = () => {
        toast.current.show({severity: 'error', closable: false, summary: 'Error', detail: 'Unable To Login', life: 5000});
    };

    const footer = (
        <div>
            <div className="p-mb-2">
                Need an account? <Link to='/user_signup'>Register</Link>
            </div>
            <div>
                Please check out the detailed rules about the MCQ <Link to='/quiz_rules'>Here</Link>
            </div>
        </div>
    )

    async function handleSubmit() {

        try {
            setLoading(true);
            await userLogin(email, password);
            setEmail('');
            setPassword('');
            history.push('/user/dashboard');
        } 
        catch {
            showError()
        }

        setLoading(false)

    }

    return (
        <div className="p-d-flex p-ai-center p-jc-center" style={{ marginTop: '50px' }}>
            <Toast ref={toast} />
            <Card 
                title={<p className="p-mb-3 p-text-bold p-text-center">User Login</p>} 
                className="p-d-flex p-ai-center p-jc-center" 
                style={{ width: '420px' }}
                footer={footer}
            >
                <div className="p-grid p-dir-col">
                    <div className="p-col-fixed">
                        <span className="p-float-label p-mb-4">
                            <InputText style={{ width: '340px' }} id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="Email">Email</label>
                        </span>
                    </div>
                    <div className="p-col-fixed">
                        <span className="p-float-label p-mb-4">
                            <Password inputStyle={{ width: '340px' }} value={password} onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} />
                            <label htmlFor="Password">Password</label>
                        </span>
                    </div>
                    <div className="p-col-fixed">
                        <Button style={{ width: '340px' }} className="p-button-sm" label="Start Quiz" loading={loading} onClick={handleSubmit} />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default UserLogin;