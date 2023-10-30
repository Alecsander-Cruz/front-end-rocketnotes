import { Container, Links, Content } from './styles.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { api } from '../../services/api.js';

import { Header } from '../../components/Header/index.jsx';
import { Button } from '../../components/Button/index.jsx';
import { Section } from '../../components/Section/index.jsx';
import { Tag } from '../../components/Tag/index.jsx';
import { ButtonText } from '../../components/ButtonText/index.jsx';

export function Details() {
    const [data, setData] = useState(null);

    const params = useParams();
    const navigate = useNavigate();

    function handleBack() {
        navigate(-1);
    }

    async function handleRemove() {
        const confirm = window.confirm('Deseja realmente remover esta nota?');

        if (confirm) {
            await api.delete(`/notes/${params.id}`);
        }

        handleBack();
    }

    useEffect(() => {
        async function fetchNote() {
            const response = await api.get(`/notes/${params.id}`);
            setData(response.data);
        }
        fetchNote();
    });

    return (
        <Container>
            <Header />
            {data && (
                <main>
                    <Content>
                        <ButtonText
                            title="Excluir nota"
                            isActive
                            onClick={handleRemove}
                        />
                        <h1>{data.title}</h1>
                        <p>{data.description}</p>

                        {data.links && (
                            <Section title="Links úteis">
                                <Links>
                                    {data.links.map(link => {
                                        return (
                                            <li key={String(link.id)}>
                                                <a
                                                    href={link.url}
                                                    rel="noreferrer"
                                                    target="_blank"
                                                >
                                                    {link.url}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </Links>
                            </Section>
                        )}

                        {data.tags && (
                            <Section title="Marcadores">
                                {data.tags.map(tag => {
                                    return (
                                        <Tag
                                            key={String(tag.id)}
                                            title={tag.name}
                                        />
                                    );
                                })}
                            </Section>
                        )}

                        <Button title="Voltar" onClick={handleBack} />
                    </Content>
                </main>
            )}
        </Container>
    );
}
