import React, { useState, useRef } from 'react';

import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';


const Signup = () => {

    const { signup } = useAuth();
    const history = useHistory();
    const toast = useRef(null);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const showSuccess = () => {
        toast.current.show({severity: 'success', closable: false, summary: 'Success', detail: 'User Created Successfully', life: 3000});
    };

    const showError = () => {
        toast.current.show({severity: 'error', closable: false, summary: 'Error', detail: 'Failed To Create User', life: 5000});
    };

    const footer = (
        <div className="p-mb-2">
            Already have an account? <Link to='/user_login'>Login</Link>
        </div>
    );

    async function handleSubmit() {

        if (password !== passwordConfirm) {
            return setError(true);
        }

        try {
            setError(false);
            setLoading(true);
            await signup(email, password);
            showSuccess();
            setEmail('');
            setPassword('');
            setPasswordConfirm('');
            history.push('/user_login');
        } 
        catch {
            showError();
        }
        setLoading(false);
    }

    return (
        <div className="p-d-flex p-ai-center p-jc-center" style={{ marginTop: '50px' }}>
            <Toast ref={toast} />
            <Card 
                title={<p className="p-text-bold p-text-center">User Registration</p>} 
                className="p-d-flex p-ai-center p-jc-center" 
                style={{ width: '420px' }}
                footer={footer}
            >
                <div className="p-grid p-dir-col">
                    {error && <div className="p-col-fixed p-mb-4"><Message style={{ width: '340px' }} severity="error" text="Passwords Do Not Match" /></div>}
                    <div className="p-col-fixed">
                        <span className="p-float-label p-mb-4">
                            <InputText style={{ width: '340px' }} id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="Email">Email</label>
                        </span>
                    </div>
                    <div className="p-col-fixed">
                        <span className="p-float-label p-mb-4">
                            <Password inputStyle={{ width: '340px' }} value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
                            <label htmlFor="Password">Password</label>
                        </span>
                    </div>
                    <div className="p-col-fixed">
                        <span className="p-float-label p-mb-4">
                            <Password 
                                inputStyle={{ width: '340px' }} 
                                value={passwordConfirm} 
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                toggleMask 
                                feedback={false}
                            />
                            <label htmlFor="Password">Confirm Password</label>
                        </span>
                    </div>
                    <div className="p-col-fixed">
                        <Button style={{ width: '340px' }} className="p-button-sm" label="Sign Up" loading={loading} onClick={handleSubmit} />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Signup;