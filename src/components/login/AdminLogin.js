import React, { useState, useRef } from 'react';

import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { useHistory } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext';


const AdminLogin = () => {

    const history = useHistory()
    const { adminLogin } = useAuth()

    const toast = useRef(null);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const showError = () => {
        toast.current.show({severity: 'error', closable: false, summary: 'Error', detail: 'Unable To Login', life: 5000});
    };

    async function handleSubmit() {

        if (email !== 'admin@admin.com') {
            return setError(true)
        }

        if (password !== 'admxPSJD123#') {
            return setError(true)
        }

        try {
            setError(false)
            setLoading(true)
            await adminLogin(email, password)
            setEmail('');
            setPassword('');
            history.push('/admin/dashboard')
        } 
        catch {
            showError()
        }

        setLoading(false)

    }

    return (
        <div className="p-d-flex p-ai-center p-jc-center" style={{ marginTop: '120px' }}>
            <Toast ref={toast} />
            <Card 
                title={<p className="p-mb-3 p-text-bold p-text-center">Admin Login</p>} 
                className="p-d-flex p-ai-center p-jc-center" 
                style={{ width: '420px' }}
            >
                <div className="p-grid p-dir-col">
                    {error && <div className="p-col-fixed p-mb-4"><Message style={{ width: '340px' }} severity="error" text="Invalid Login Credentials" /></div>}
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
                        <Button style={{ width: '340px' }} className="p-button-sm" label="Login" loading={loading} onClick={handleSubmit} />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default AdminLogin;