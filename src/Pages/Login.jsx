import React from 'react'
import { Banner, Button, Form, FormLayout, Heading, Spinner, TextField, } from '@shopify/polaris';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'



const Login = () => {

    const navigate = useNavigate();

    // State for form data 
    const [formData, setFormData] = useState({ username: "", password: "" });
    // State for spinner
    const [loading, setLoading] = useState(false)
    // State for toast
    const [toast, setToast] = useState({ open: false, msg: "" })

    // Form Handling function
    const formHandle = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch('https://fbapi.sellernext.com/user/login?', {
            method: 'POST',
            headers: {
                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA'
            },
            body: new FormData(e.target)
        })
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                if (json.success) {
                    sessionStorage.setItem('userToken', json.data.token);
                    navigate('/dashboard');
                } else {
                    setToast({ open: true, msg: json.message })
                }
            })
            .catch(error => {
                setToast({ open: true, msg: error.message })
            })
        setTimeout(() => {
            setToast({ ...toast, open: false })
        }, 2500)
    }

    return (
        <div className="loginContainer">
            <Heading > Login </Heading>
            <Form onSubmit={formHandle}>
                <FormLayout>
                    <TextField label="Username" name='username' autoComplete="off" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e })} helpText={
                        <span>
                            We’ll use this email address to inform you on future changes to
                            Polaris.
                        </span>
                    } />
                    <TextField type="password" name='password' label="password" autoComplete="off" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e })} helpText={
                        <span>
                            We’ll use this email address to inform you on future changes to
                            Polaris.
                        </span>
                    } />
                    <Button submit outline> {loading ? <Spinner accessibilityLabel="Spinner example" size="small" /> : 'Login'} </Button>
                </FormLayout>
            </Form>

           <div className="toast">
           {toast.open && <Banner onDismiss={() => setToast({ ...toast, open: false })} status={"critical"} title={toast.msg}  />}
           </div>
        </div>
    )
}

export default Login