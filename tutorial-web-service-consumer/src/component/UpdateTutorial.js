import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const UpdateTutorial = () => {

    let navigate = useNavigate();

    /*
    Lo hook userParams serve per recuperare
    un elemento da una rotta di navigazione
    */
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [published, setPublished] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `http://localhost:8080/rest/api/tutorials/${id}`;

                const response = await fetch(apiUrl);

                if (response.ok) {
                    const jsonData = await response.json();
                    setTitle(jsonData.title);
                    setDescription(jsonData.description);
                    setPublished(jsonData.published);


                } else {
                    console.error('Errore durante la richiesta:', response.status);
                }
            } catch (error) {
                console.error('Errore durante la richiesta:', error);
            }
        };
        fetchData();
    }, []);

    const updateTutorial = async (event) => {
        event.preventDefault();

        const formData = {
            id: id,
            title: title,
            description: description,
            published: published,

        };

        try {

            const apiUrl = 'http://localhost:8080/rest/api/tutorials';

            // Esegui la richiesta PUT all'API
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Dati inviati con successo!');
                navigate('/tutorialList');

            } else {
                console.error('Errore durante l\'invio dei dati:', response.status);
            }
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={updateTutorial}>
                <div className="mb-3">
                    <input
                        type="hidden"
                        className="form-control"
                        id="name"
                        value={id}
                        disabled="disabled"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                <label htmlFor="published" className="form-label">
                        Published:
                    </label>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="published"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    );

}

export default UpdateTutorial;
