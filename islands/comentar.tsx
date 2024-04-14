import { useState } from "preact/hooks";

const Comentar = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newComment, setNewComment] = useState('');
    const [name, setName] = useState('');

    const handleUsernameChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        setUsername(target.value);
    };

    const handlePasswordChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        setPassword(target.value);
    };

    const handleCommentChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        setNewComment(target.value);
    };

    const handleNameChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        setName(target.value);
    };

    const handleCommentSubmit = async (event: Event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `https://lovers.deno.dev/${name}/comment`, {
                method: 'POST',
                mode: 'no-cors', // Añade el modo 'no-cors'
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: username,
                    password: password,
                    comment: newComment
                })
            });

            if (!response.ok) {
                throw new Error("Error al enviar el comentario");
            }
            setUsername('');
            setPassword('');
            setNewComment('');
            setName('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleCommentSubmit}>
            <label>
                Nombre del usuario a comentar:
                <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <br />
            <label>
                Usuario:
                <input type="text" value={username} onChange={handleUsernameChange} />
            </label>
            <br />
            <label>
                Contraseña:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <br />
            <label>
                Comentario:
                <input type="text" value={newComment} onChange={handleCommentChange} />
            </label>
            <br />
            <input type="submit" value="Enviar" />
        </form>
    );
};

export default Comentar;
