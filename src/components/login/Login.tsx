import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";


const Login = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    const handleLoginUser = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const data = {
            email,
            senha
        }

        try {

            await api.post('/users/login', data)
                .then(response => {
                    console.log(response.data)

                    const { token, header, email } = response.data;

                    console.log(email)

                    window.localStorage.setItem('token', token);
                    window.localStorage.setItem('header', header);
                    window.localStorage.setItem('email', email);

                    console.log(response.data);
                    navigate('/usuario');
                    window.location.reload()

                })
                .catch(error => {
                    console.log(error);
                });

        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div className="App">
            <p className="texto_subtit">
                LOGIN PAGE
            </p>
            

                <div className="fundo-div-principal" style={{ gridRow: '3', padding: '25px 20px 30px 30px' }}>


                    <p> <input type="email" placeholder="Email" name="email" className="texto_busca"
                        required style={{ width: '40%' }} onChange={e => setEmail(e.target.value)} /></p>
                    <p><input type="password" placeholder="Password" name="senha" className="texto_busca"
                        required style={{ width: '40%' }} onChange={e => setSenha(e.target.value)} /></p>

                    <div style={{ marginTop: '10%', gridColumn: '4', textAlign: 'start' }}>
                        Not registered yet? Click <a href="/signup" style={{ color: 'var(--vermlar_escuro)' }}>here</a> to do it.
                    </div>

                </div>
                <form onSubmit={handleLoginUser} style={{gridColumn: '8/10', gridRow: '4'}}>
                    <input type="submit" name="acao" value="Login" className="bot-buscar-home"/>
                </form>
            </div>
        
    )
}

export default Login